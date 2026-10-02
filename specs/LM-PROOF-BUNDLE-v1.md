# LM Proof Bundle v1

Status: **Draft**

A proof bundle groups independently meaningful proofs without collapsing them
into one undifferentiated trust score.

## Proof families

- semantic_reliance
- transition_receipts
- content_credentials
- production_attestations
- public_attestations
- transparency_proofs
- agent_identity
- authorization_refs
- runtime_trace_refs
- payment_receipts
- verification_manifest

## Governing rule

```text
proofs_present != truth
```

Each proof entry must declare:

- proof_type
- issuer/system
- subject reference
- verification status
- verification time where applicable
- external reference or embedded proof
- limitations
