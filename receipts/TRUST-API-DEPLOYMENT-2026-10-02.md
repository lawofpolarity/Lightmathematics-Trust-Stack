# Trust API Deployment Receipt

Date: 2026-10-02

Status: **ACTIVE / VERSION 2**

## Deployment

Supabase Edge Function: `trust-api`
Deployment version: 2
JWT gateway verification: enabled
Private database access: direct server-side Postgres connection
Private `trust` schema exposed to Data API: **no**

The initial deployment used the Supabase Data API client for the private schema.
That approach was corrected before site wiring because custom Data API schemas
must be explicitly exposed. Version 2 instead uses the Edge Function's
server-only Postgres connection, preserving the private-schema boundary.

## First hydrated VRA

Artifact: `urn:lm:sigma:Σ152`
Source Sigma: `Σ152` — Rayleigh Quotient & Min–Max Principle
Source lifecycle: `HYDRATED`
Canonical admission: false
Trust operation: `research.reference`
Reliance status: `NOT_EVALUATED`
Currentness evaluated: false
Unresolved condition: `semantic_reliance_not_yet_evaluated`

Subject digest:
`364f2957c57abf3c69929c59459444abf1cefcfc28d1c634bfb19c0b342e2e78`

Hydration deliberately does not confer semantic authority, verification,
canonical admission, or an ALLOW disposition.

## Next wiring

1. Route a server-side .ai verification page to artifact status/history.
2. Route .io v1 machine endpoints to this function.
3. Add custom-domain routing for trust.lightmathematics.io.
4. Test authenticated end-to-end requests.
5. Only then scale VRA hydration beyond the first artifact.
