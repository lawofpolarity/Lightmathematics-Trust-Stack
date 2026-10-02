# Site Wiring

## lightmathematics.ai
The browser calls the Trust API, never the private trust schema.

Route:
`/verify/[artifact_id]`

Fetch:
`GET {TRUST_API_BASE}/v1/artifacts/{artifact_id}/status`
and
`GET {TRUST_API_BASE}/v1/artifacts/{artifact_id}/history`.

Render proof state independently from semantic reliance state.

## lightmathematics.io
Expose the Trust API routes through the machine-facing domain. MCP and A2A
adapters call the same qualification/verification functions.

## DNS / routing
Preferred public service origin:
`https://trust.lightmathematics.io`

Until the custom domain is routed, the Supabase Edge Function URL may be used
server-to-server as the deployment origin.

Never place Supabase secret/service-role credentials in either browser bundle.
