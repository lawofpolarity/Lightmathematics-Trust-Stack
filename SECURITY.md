# Security Policy

## Current status

This repository is a research and interoperability specification. Do not treat
example code, schemas, fixtures, or adapter notes as production-hardened
security controls unless explicitly marked as such.

## Never commit

- private keys or seed phrases;
- wallet signing material;
- Supabase service-role credentials;
- OAuth client secrets;
- MCP bearer tokens;
- AP2 or x402 payer credentials;
- production webhook secrets;
- private customer evidence;
- private prompts, traces, or model inputs;
- unredacted access tokens;
- production signing certificates.

## Required security properties

Implementations should fail closed where identity, authorization, payment,
attestation, semantic reliance, or transition validity cannot be established.

The Trust Stack distinguishes:

- transport authorization;
- economic authorization;
- semantic reliance;
- provenance;
- public attestation;
- transparency inclusion;
- runtime observation.

Compromise in one layer must not silently elevate authority in another.

## Threat classes

The baseline threat model includes:

- rollback;
- freeze/staleness;
- mix-and-match state assembly;
- key compromise and key rotation;
- replay;
- forked histories;
- database rollback;
- stale cache;
- partial synchronization;
- payment replay;
- forged or detached receipts;
- semantic receipt tampering;
- private-data leakage into telemetry;
- authority escalation through external reputation or payment;
- unverified transition substitution.

See `security/TUF-THREAT-MODEL.md`.

## Reporting

For now, open a GitHub issue for non-sensitive security design questions.
Do not disclose active credentials or exploitable production secrets in public
issues.
