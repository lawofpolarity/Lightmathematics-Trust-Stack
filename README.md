# Lightmathematics Trust Stack

Open interoperability layer for verifiable AI research artifacts, semantic reliance, provenance, agent identity, authorization, payments, attestations, transparency proofs, and runtime observability.

## Status

**Research / interoperability specification. Not yet a production trust service.**

This repository defines a public protocol surface for connecting LightMathematics semantic-governance research with established external infrastructure rather than reimplementing identity, authorization, payment, provenance, transparency, or observability systems.

## Core invariant

Identity, authorization, payment, attestation, provenance, transparency, and semantic reliance are distinct claims.

```text
identity
  != authorization
  != payment
  != attestation
  != provenance
  != semantic reliance
```

No external proof automatically elevates semantic authority.

## Trust Stack v1

The initial interoperability targets are:

- **C2PA** — content provenance and Content Credentials.
- **LightMathematics DRSC / SRI** — operation-relative semantic reliance, currentness, handoff, loss and reopening.
- **Ethereum Attestation Service (EAS)** — public or off-chain attestations.
- **Sigstore / Rekor** — transparency logging and inclusion evidence.
- **SCITT** — signed statement registration and transparency-receipt comparator.
- **in-toto Attestation Framework** — authenticated production and transformation metadata.
- **The Update Framework (TUF)** — rollback, freeze, mix-and-match and key-compromise threat-model concepts.
- **ERC-8004** — agent identity, reputation and validation interoperability.
- **MCP authorization** — protected tool/service authorization.
- **A2A** — agent transport with an optional LM reliance envelope.
- **OpenTelemetry** — runtime traces, metrics and events.
- **Langfuse** — optional observability/evaluation adapter.
- **x402** — machine-payment authorization and settlement references.
- **AP2** — agent-commerce authorization and payment interoperability.
- **Base / Ethereum** — optional public commitment or settlement layer; not the LM semantic database.

## Primary object: Verified Research Artifact

A **Verified Research Artifact (VRA)** is a research object—such as a report, diagram, PDF, benchmark result, code-derived output, Sigma object, or agent-produced artifact—paired with typed proofs and governance metadata.

A VRA may carry:

1. content provenance;
2. an LM semantic reliance certificate;
3. production/transformation attestations;
4. agent identity references;
5. authorization references;
6. runtime trace references;
7. payment receipt references;
8. public attestations;
9. transparency proofs;
10. transition history.

Presence of a proof is not equivalent to truth.

## Repository layout

```text
specs/        protocol specifications
schemas/      machine-readable JSON Schemas
security/     threat model and security requirements
comparators/  prior-art and parity comparators
examples/     non-production example objects
adapters/     adapter contracts and implementation notes
benchmarks/   parity and residual-difference experiments
```

## Initial specifications

- `specs/LM-TRUST-STACK-v1.md`
- `specs/VERIFIED-RESEARCH-ARTIFACT-v1.md`
- `specs/LM-RELIANCE-ENVELOPE-v1.md`
- `specs/LM-TRANSITION-RECEIPT-v1.md`
- `specs/LM-PROOF-BUNDLE-v1.md`
- `specs/LM-PAYMENT-ABSTRACTION-v1.md`

## Relationship to the LightMathematics ecosystem

- **Wordwheel-library** remains research/canonical authority for admitted Sigma material.
- **Lightmathematics-DRSC** remains the research/reference implementation for currentness and selective reopening.
- **Lightmathematics-Sigma-Explorer** can consume VRA and receipt schemas for human-facing inspection.
- **Lightmathematics-Agent-Service** can implement MCP/A2A/identity/payment adapters.
- **lightmathematics.ai** is intended as the human-facing research and verification surface.
- **lightmathematics.io** is intended as the machine-facing service and interoperability surface.

The websites are consumers and presentation layers, not semantic authorities.

## Claim discipline

This repository must not claim that LightMathematics invented:

- append-only logs;
- provenance;
- signatures;
- attestations;
- agent identity;
- OAuth authorization;
- observability;
- payment protocols;
- software supply-chain attestations;
- content credentials.

LM-specific claims must survive equal-information and equal-capability comparison against established systems.

## License

Apache License 2.0. See `LICENSE`.

## Security

See `SECURITY.md` and `security/TUF-THREAT-MODEL.md`.
