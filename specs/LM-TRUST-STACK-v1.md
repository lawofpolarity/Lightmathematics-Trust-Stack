# LM Trust Stack v1

Status: **Draft / research specification**

## 1. Objective

Define a small interoperability contract that allows LightMathematics
semantic-reliance state to coexist with established systems for provenance,
identity, authorization, payment, attestation, transparency, runtime
observation, and software/content supply-chain metadata.

## 2. Layer separation

The following claims MUST remain independently representable:

1. artifact identity;
2. actor/agent identity;
3. transport authorization;
4. economic/service authorization;
5. provenance;
6. runtime observation;
7. semantic reliance;
8. public attestation;
9. transparency inclusion;
10. state-transition validity.

No layer may infer success in another layer without an explicit rule.

## 3. Canonical flow

```text
client/agent
   |
identity + transport authorization
   |
optional quote/payment authorization
   |
LM governed semantic operation
   |
reliance / transition result
   |
typed proof bundle
   |
optional transparency / public attestation
```

## 4. Status vocabulary

Initial semantic dispositions:

- ALLOW
- REVIEW
- REFUSE
- STALE
- UNRESOLVED
- NOT_EVALUATED

These values describe LM semantic-reliance state only.

## 5. Proof composition

A proof bundle MAY contain external proofs. Their presence MUST preserve their
native semantics. For example:

- a Rekor inclusion proof proves log inclusion, not scientific correctness;
- an EAS attestation proves an attestation was made under a schema, not that its
  content is true;
- an x402/AP2 receipt proves an economic/service event, not semantic authority;
- an ERC-8004 identity or validation reference identifies or reports on an
  agent, but does not elevate an artifact's evidence state.

## 6. External integrations

Initial integration targets:

- C2PA
- in-toto
- Sigstore/Rekor
- SCITT
- TUF-derived threat controls
- EAS
- ERC-8004
- MCP authorization
- A2A
- OpenTelemetry
- Langfuse
- x402
- AP2

Each integration should be implemented behind an adapter boundary.

## 7. Operational storage

Operational semantic state MAY be stored in PostgreSQL/Supabase.

GitHub MAY preserve research authority, protocol history, fixtures and
reproducible test evidence.

Blockchains and transparency logs SHOULD NOT be used as the primary store for
the full semantic population.

## 8. Compatibility

Schemas are versioned independently. Unknown fields should be retained where
possible. Breaking semantic changes require a new major schema version.
