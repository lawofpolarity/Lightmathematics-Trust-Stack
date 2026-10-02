# Verified Research Artifact v1

Status: **Draft**

## Definition

A Verified Research Artifact (VRA) is an identified research artifact plus
typed governance metadata and optional external proofs.

"Verified" means that declared verification steps and proofs are inspectable.
It does not mean universally true, scientifically accepted, or canonically
admitted.

## Required fields

- `artifact_id`
- `version`
- `artifact_type`
- `subject`
- `canonical_digest`
- `created_at`
- `semantic_reliance`
- `proof_bundle`

## Optional proof families

- C2PA content credentials
- in-toto attestations
- OpenTelemetry trace references
- Langfuse trace references
- ERC-8004 identity/validation references
- MCP authorization references
- A2A task/artifact references
- x402 receipts
- AP2 mandate/payment references
- EAS attestations
- Rekor inclusion proofs
- SCITT receipts
- LM transition receipts

## Verification rule

Verifiers MUST evaluate each proof according to its own semantics.

A successful proof MUST NOT be promoted into semantic authority merely because
it is cryptographically or publicly verifiable.
