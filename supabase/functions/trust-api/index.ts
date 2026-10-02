import { withSupabase } from "npm:@supabase/server@^1";
import postgres from "npm:postgres@3.4.7";

const VERSION={trust_stack_version:"0.1.0",schema_version:"1.0.0",environment:"production"};
const json=(body:unknown,status=200)=>Response.json(body,{status});
const pathOf=(req:Request)=>new URL(req.url).pathname.replace(/^\/functions\/v1\/trust-api/,"");
const sql=postgres(Deno.env.get("SUPABASE_DB_URL")!,{prepare:false,max:1});

export default {
  fetch: withSupabase({auth:"none"}, async (req)=>{
    const path=pathOf(req);
    if(req.method==="GET"&&path==="/v1/capabilities") return json({...VERSION,capabilities:{vra_verify:"ACTIVE",reliance_qualify:"ACTIVE",transition_verify:"ACTIVE",artifact_status:"ACTIVE",artifact_history:"ACTIVE",receipts:"ACTIVE",mcp:"READY",a2a:"READY",x402:"TESTNET_EXTERNAL",ap2:"ADAPTER_READY",eas:"NOT_CONFIGURED",rekor:"NOT_CONFIGURED",scitt:"COMPARATOR",c2pa:"ADAPTER_READY",erc8004:"NOT_CONFIGURED"}});
    if(req.method==="POST"&&path==="/v1/vra/verify"){const v=await req.json();const required=["artifact_id","version","artifact_type","subject","canonical_digest","semantic_reliance","proof_bundle"];const missing=required.filter(k=>v?.[k]===undefined);return json({valid:missing.length===0,errors:missing.map(k=>"missing "+k),artifact_id:v?.artifact_id??null,reliance_status:v?.semantic_reliance?.reliance_status??"NOT_EVALUATED",runtime:VERSION},missing.length?400:200);}
    if(req.method==="POST"&&path==="/v1/reliance/qualify"){const b=await req.json();if(!b?.artifact_id||!b?.operation_scope)return json({error:"artifact_id and operation_scope required"},400);const rows=await sql`select * from trust.reliance_states where artifact_id=${b.artifact_id} and operation_scope=${b.operation_scope} limit 1`;return json(rows[0]?{...rows[0],runtime:VERSION}:{artifact_id:b.artifact_id,operation_scope:b.operation_scope,reliance_status:"NOT_EVALUATED",runtime:VERSION});}
    if(req.method==="POST"&&path==="/v1/transitions/verify"){const t=await req.json();const errors=[];for(const k of ["receipt_id","artifact_id","to_version","transition_type","successor_digest","disposition"])if(t?.[k]===undefined)errors.push("missing "+k);const before=new Set(t?.unresolved_before??[]),after=new Set(t?.unresolved_after??[]),discharged=new Set(t?.discharged_obligations??[]);for(const x of before)if(!after.has(x)&&!discharged.has(x))errors.push("unresolved obligation disappeared without discharge: "+x);return json({valid:errors.length===0,errors,runtime:VERSION},errors.length?400:200);}
    const status=path.match(/^\/v1\/artifacts\/(.+)\/status$/);if(req.method==="GET"&&status){const id=decodeURIComponent(status[1]);const a=await sql`select * from trust.artifacts where artifact_id=${id} limit 1`;if(!a[0])return json({error:"not found"},404);const states=await sql`select * from trust.reliance_states where artifact_id=${id} order by operation_scope`;return json({...a[0],reliance_states:states,runtime:VERSION});}
    const hist=path.match(/^\/v1\/artifacts\/(.+)\/history$/);if(req.method==="GET"&&hist){const id=decodeURIComponent(hist[1]);const rows=await sql`select * from trust.transitions where artifact_id=${id} order by created_at asc`;return json({artifact_id:id,transitions:rows,runtime:VERSION});}
    const receipt=path.match(/^\/v1\/receipts\/(.+)$/);if(req.method==="GET"&&receipt){const id=decodeURIComponent(receipt[1]);const rows=await sql`select * from trust.transitions where receipt_id=${id} limit 1`;return rows[0]?json({...rows[0],runtime:VERSION}):json({error:"not found"},404);}
    return json({error:"route not found"},404);
  })
};