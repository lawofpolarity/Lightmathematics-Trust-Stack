# Site Integration Contract v1

Status: Draft implementation contract

## Roles

- lightmathematics.ai: human research, inspection and verification surface.
- lightmathematics.io: machine/API, agent and commerce surface.
- Trust Stack API: shared semantic verification boundary.
- Supabase/Postgres: operational state.
- GitHub releases: versioned specification/reference implementation.

Neither website is semantic authority.

## Required invariant

Both sites MUST consume the same versioned Trust Stack contract and MUST expose
the Trust Stack version, schema version and deployment commit used for a result.

## Human surface (.ai)

Required route:
- /verify/{artifact_id}

Required panels:
- artifact identity/version/digest
- semantic reliance disposition
- operation scope
- currentness
- evidence and authority summaries
- dependencies
- unresolved obligations and known losses
- transition history
- proof bundle with PRESENT / ABSENT / INVALID / NOT_EVALUATED states

ABSENT MUST NOT be rendered as FAILED.

## Machine surface (.io)

Required v1 endpoints:
- GET /v1/capabilities
- POST /v1/vra/verify
- POST /v1/reliance/qualify
- POST /v1/transitions/verify
- GET /v1/artifacts/{id}/status
- GET /v1/artifacts/{id}/history
- GET /v1/receipts/{id}

MCP/A2A integrations SHOULD call the same service functions rather than fork
semantic logic.

## Deployment pinning

Production deployments MUST pin a tested tag or commit SHA. Mutable main MUST
NOT be treated as a production protocol version.
