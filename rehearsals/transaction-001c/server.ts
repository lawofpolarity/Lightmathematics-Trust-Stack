// Localhost-only no-funds verifier. Experimental; never deploy to production.
import postgres from "npm:postgres@3.4.7";
const db=postgres(Deno.env.get("DATABASE_URL")!,{prepare:false,max:20});
const reply=(body:unknown,status=200)=>Response.json(body,{status});
const bytes=(s:string)=>Uint8Array.from(atob(s.replace(/-/g,"+").replace(/_/g,"/").padEnd(Math.ceil(s.length/4)*4,"=")),c=>c.charCodeAt(0));
Deno.serve({hostname:"127.0.0.1",port:8787},async req=>{
  if(req.method==="GET" && new URL(req.url).pathname==="/health")return reply({ok:true,no_funds:true});
  if(req.method!=="POST"||new URL(req.url).pathname!=="/v1/inspect")return reply({error:"not found"},404);
  let b;
  try {b=await req.json();}catch{return reply({error:"invalid JSON"},400);}
  for(const k of ["issuer_id","nonce","request_id","operation_scope","artifact_id","signature"]){
    if(typeof b?.[k]!=="string"||!b[k])return reply({error:"missing field"},400);
  }
  try{
    const issuers=await db`SELECT public_jwk,revoked FROM lm_rehearsal.issuers WHERE issuer_id=${b.issuer_id}`;
    if(issuers.length!==1||issuers[0].revoked)return reply({error:"issuer not active"},403);
    const key=await crypto.subtle.importKey("jwk",issuers[0].public_jwk,{name:"Ed25519"},false,["verify"]);
    const message=JSON.stringify([b.issuer_id,b.nonce,b.request_id,b.operation_scope,b.artifact_id]);
    if(!await crypto.subtle.verify("Ed25519",key,bytes(b.signature),new TextEncoder().encode(message)))return reply({error:"invalid signature"},403);
    // Lock issuer inside the same transaction as nonce claim and receipt creation.
    // A concurrent revocation must serialize with this lock.
    const outcome=await db.begin(async tx=>{
      const active=await tx`SELECT issuer_id FROM lm_rehearsal.issuers
        WHERE issuer_id=${b.issuer_id} AND revoked=false FOR UPDATE`;
      if(active.length!==1)return "revoked";
      const claimed=await tx`UPDATE lm_rehearsal.nonces SET consumed_at=now()
        WHERE issuer_id=${b.issuer_id} AND nonce=${b.nonce}
        AND consumed_at IS NULL RETURNING nonce`;
      if(claimed.length!==1)return "replay";
      await tx`INSERT INTO lm_rehearsal.receipts(request_id,issuer_id,nonce,decision,payment_state)
        VALUES (${b.request_id},${b.issuer_id},${b.nonce},'UNRESOLVED','NO_FUNDS')`;
      return "accepted";
    });
    if(outcome==="revoked")return reply({error:"issuer revoked"},403);
    if(outcome==="replay")return reply({error:"replay"},409);
    return reply({authenticated:true,receipt:{request_id:b.request_id,decision:"UNRESOLVED",payment_state:"NO_FUNDS"}});
  }catch{return reply({error:"unavailable"},503);}
});
