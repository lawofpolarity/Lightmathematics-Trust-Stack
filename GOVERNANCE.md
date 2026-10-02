# Governance

## Purpose

The Lightmathematics Trust Stack is an interoperability and experimental
protocol surface. It is not itself the canonical source of every underlying
LightMathematics research claim.

## Authority boundaries

- Canonical Sigma admission belongs to the relevant LightMathematics research
  authority, not to a payment network, identity registry, attestation registry,
  transparency log, telemetry backend, or website.
- An adapter may transport or prove a claim without determining the claim's
  semantic correctness.
- External systems must not silently mutate LM semantic authority fields.
- Production sites should consume immutable tested releases, tags, or pinned
  commits rather than mutable branch state.

## Protocol changes

Material changes to core schemas should:

1. identify backward-compatibility impact;
2. state whether semantics changed or only transport representation changed;
3. preserve unknown/unresolved states rather than coercing them to success;
4. provide migration notes;
5. add or update fixtures and benchmarks.

## Claim discipline

Every proposed LM-specific advantage should be tested against established
comparators under equal information and equal capabilities.

Null results are retained.

Comparator parity is a valid outcome.
