import postgres from "npm:postgres@3.4.7";
import { assertEquals, assert } from "jsr:@std/assert@1";
const admin=postgres(Deno.env.get("ADMIN_DATABASE_URL")!,{prepare:false});
const base="http://127.0.0.1:8787";
const bytes=(b:Uint8Array)=>btoa(String.fromCharCode(...b)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_");
const generated=await crypto.subtle.generateKey("Ed25519",true,["sign","verify"]);
if (!("publicKey" in generated) || !("privateKey" in generated)) throw new Error("Expected Ed25519 CryptoKeyPair");
const kp=generated;
const jwk=await crypto.subtle.exportKey("jwk",kp.publicKey);
await admin`INSERT INTO lm_rehearsal.issuers(issuer_id,public_jwk) VALUES ('test-issuer',${JSON.stringify(jwk)}::jsonb)`;
for(const n of ["same","revoked","persist"]) await admin`INSERT INTO lm_rehearsal.nonces(issuer_id,nonce) VALUES ('test-issuer',${n})`;
async function payload(nonce:string,request_id:string) {
  const b={issuer_id:"test-issuer",nonce,request_id,operation_scope:"demo:inspect",artifact_id:"synthetic-001"};
  const data=JSON.stringify([b.issuer_id,b.nonce,b.request_id,b.operation_scope,b.artifact_id]);
  return {...b,signature:bytes(new Uint8Array(await crypto.subtle.sign("Ed25519",kp.privateKey,new TextEncoder().encode(data))))};
}
async function post(b:unknown) {return fetch(base+"/v1/inspect",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(b)});}
Deno.test("48 concurrent signed requests consume one nonce",async()=>{
  const b=await payload("same","same-request");
  await Deno.writeTextFile("/tmp/lm-replay-payload.json",JSON.stringify(b));
  const results=await Promise.all(Array.from({length:48},()=>post(b)));
  console.log("CONCURRENCY_EVIDENCE",JSON.stringify({accepted:results.filter(r=>r.status===200).length,rejected:results.filter(r=>r.status===409).length}));
  assertEquals(results.filter(r=>r.status===200).length,1);
  assertEquals(results.filter(r=>r.status===409).length,47);
  const rows=await admin`SELECT * FROM lm_rehearsal.receipts WHERE request_id='same-request'`;
  assertEquals(rows.length,1);assertEquals(rows[0].payment_state,"NO_FUNDS");
  assertEquals(rows[0].decision,"UNRESOLVED");
  console.log("RECEIPT_EVIDENCE",JSON.stringify({receipts:rows.length,payment_state:rows[0].payment_state,decision:rows[0].decision}));
});
Deno.test("revocation rejects valid signed requests",async()=>{
  await admin`UPDATE lm_rehearsal.issuers SET revoked=true WHERE issuer_id='test-issuer'`;
  assertEquals((await post(await payload("revoked","revoked-request"))).status,403);
  await admin`UPDATE lm_rehearsal.issuers SET revoked=false WHERE issuer_id='test-issuer'`;
});
Deno.test("consumed nonce persists in database",async()=>{
  assertEquals((await post(await payload("same","same-request"))).status,409);
  const rows=await admin`SELECT consumed_at FROM lm_rehearsal.nonces WHERE issuer_id='test-issuer' AND nonce='same'`;
  assert(rows[0].consumed_at!==null);
});
Deno.test("untrusted role has no table access",async()=>{
  const untrusted=postgres(Deno.env.get("UNTRUSTED_DATABASE_URL")!,{prepare:false});
  let rejected=false;
  try {await untrusted`SELECT * FROM lm_rehearsal.issuers`;}catch {rejected=true;}
  assert(rejected);
  rejected=false;
  try {await untrusted`UPDATE lm_rehearsal.nonces SET consumed_at=now()`;}catch {rejected=true;}
  assert(rejected);await untrusted.end();
});
Deno.test("invalid signature does not consume nonce",async()=>{
  const b=await payload("persist","tampered");
  b.operation_scope="changed-after-signing";
  assertEquals((await post(b)).status,403);
  const rows=await admin`SELECT consumed_at FROM lm_rehearsal.nonces WHERE nonce='persist'`;
  assertEquals(rows[0].consumed_at,null);
});

Deno.test("receipt insertion failure rolls back nonce consumption",async()=>{
  await admin`INSERT INTO lm_rehearsal.nonces(issuer_id,nonce) VALUES ('test-issuer','rollback')`;
  // A request-id collision must fail receipt insertion after claiming a fresh nonce.
  const b=await payload("rollback","same-request");
  assertEquals((await post(b)).status,503);
  const rows=await admin`SELECT consumed_at FROM lm_rehearsal.nonces WHERE nonce='rollback'`;
  assertEquals(rows[0].consumed_at,null);
});
