# LM-TRUST-STACK-001 Result

Date: 2026-10-02

Status: **EXECUTED_LOCAL_REFERENCE**

## Result

| Measure | Result |
|---|---:|
| Cases | 100 |
| LM correct | 100/100 |
| Equal-information conventional comparator correct | 100/100 |
| LM/comparator parity | 100/100 |
| Parity rate | 1.000 |
| Residual difference | 0 |

## Case families

- 25 rollback cases
- 25 mix-and-match snapshot cases
- 25 external-trust semantic non-escalation cases
- 25 unresolved-obligation loss cases

## Interpretation

This is a **null result for LM-specific advantage** on these four properties.

The test supports the usefulness of the requirements themselves, but a
conventional deterministic implementation with the same information and rules
reproduced the decisions exactly.

Therefore this benchmark does not support a claim that rollback detection,
mix-and-match detection, semantic non-escalation, or unresolved-obligation
preservation are uniquely LightMathematics mechanisms.

## What remains untested

This execution did not perform live:

- SCITT registration;
- Rekor logging;
- EAS attestation;
- ERC-8004 chain lookup/write;
- C2PA signing/validation;
- AP2 payment;
- x402 payment;
- MCP OAuth exchange;
- A2A network exchange;
- Langfuse export;
- OpenTelemetry collector export.

The current adapters normalize/reference those systems and fail closed where
external execution is not configured.

## Next benchmark

The next benchmark should test the harder residual question:

Can LM and an equally instrumented conventional stack preserve and selectively
recompute operation-relative semantic eligibility after composition, agent
handoff, projection/loss, authority/evidence change, and dependency mutation?

That benchmark should use deployed external infrastructure where practical,
while keeping semantic decision rules equal between arms.
