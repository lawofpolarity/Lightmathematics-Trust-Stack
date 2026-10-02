# LM Reliance Envelope v1

Status: **Draft**

The LM Reliance Envelope is a portable description of the semantic conditions
under which an artifact may or may not be relied upon for an intended
operation.

## Core fields

- artifact_id
- artifact_version
- operation_scope
- reliance_status
- dependencies
- evidence
- provenance
- authority
- qualifiers
- temporal_state
- unresolved_conditions
- losses
- discharge_witnesses
- currentness
- contract_version

## Transport

The envelope is transport-neutral. It may be attached to:

- an A2A artifact;
- an MCP result;
- an HTTP API result;
- a VRA;
- an in-toto predicate;
- an internal LM event.

## Non-escalation

Transport success, identity, payment, signature validity, attestation, or
transparency inclusion MUST NOT automatically alter `reliance_status`.
