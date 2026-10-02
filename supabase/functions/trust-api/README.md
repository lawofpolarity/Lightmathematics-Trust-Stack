# trust-api

Server-side Trust Stack HTTP service for .ai and .io.

The function uses privileged server-side database access only inside the Edge
Function. No secret/service credential is returned to clients.

The private `trust` schema must remain unavailable to browser Data API roles.
Public read views should call this API rather than exposing the schema.

## Routes
GET /v1/capabilities
POST /v1/vra/verify
POST /v1/reliance/qualify
POST /v1/transitions/verify
GET /v1/artifacts/{id}/status
GET /v1/artifacts/{id}/history
GET /v1/receipts/{id}
