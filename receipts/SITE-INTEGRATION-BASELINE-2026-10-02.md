# Site Integration Baseline Receipt

Date: 2026-10-02

Status: **CONTRACTS_COMMITTED / PRIVATE_TRUST_SCHEMA_CREATED**

## GitHub

Committed:
- Site Integration Contract v1
- lightmathematics.ai Verification View v1
- lightmathematics.io Service Contract v1
- OpenAPI v0.1.0 surface
- additive private Trust schema definition
- deployment version manifest

## Supabase

Connected project region: ca-central-1.

Created private schema `trust` with seven empty operational tables:
- artifacts
- reliance_states
- dependencies
- transitions
- proofs
- runtime_events
- payment_receipts

The schema revokes access from `public`, `anon`, and `authenticated` by
default. No existing Sigma population table was modified.

## Existing security finding

Supabase security advisors report RLS disabled on:
- public.sigma_p200_record
- public.sigma_p200_node
- public.sigma_p200_diameter

This predates the Trust Stack site-integration change. It was deliberately not
changed automatically because enabling RLS without matching policies could
break existing consumers.

The existing `public.lmi_benchmark_result` table has RLS enabled but currently
has no policies.

## Next deployment step

Implement the Trust Stack API service against the private schema, then wire:
- .ai -> read-only verification view through the API;
- .io -> authenticated machine operations through the same API.

Do not expose the private `trust` schema directly to browser clients.
