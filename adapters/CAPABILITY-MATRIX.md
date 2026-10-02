# Adapter Capability Matrix

| Adapter | Phase | Local normalization | External verification | Network write |
|---|---:|---|---|---|
| OpenTelemetry | 2 | IMPLEMENTED | host-dependent | none |
| Langfuse | 2 | IMPLEMENTED | not configured | none |
| in-toto | 3 | IMPLEMENTED | signature envelope pending | none |
| Rekor | 3 | IMPLEMENTED | not configured | disabled |
| SCITT | 3 | IMPLEMENTED | comparator only | disabled |
| MCP auth | 4 | IMPLEMENTED | deployment-dependent | none |
| A2A envelope | 4 | IMPLEMENTED | transport-dependent | none |
| ERC-8004 | 4 | IMPLEMENTED | chain client not configured | disabled |
| x402 | 5 | IMPLEMENTED via normalized payment contract | Agent Service owns live experiment | disabled here |
| AP2 | 5 | IMPLEMENTED via normalized payment contract | SDK/network not configured | disabled |
| C2PA | 6 | IMPLEMENTED | signer/validator not configured | none |
| EAS | 6 | IMPLEMENTED | chain client not configured | disabled |
| TUF-derived controls | 7 | IMPLEMENTED | local deterministic tests | none |

IMPLEMENTED means the Trust Stack contract/normalizer exists. It does not mean an external service, chain transaction, signature, payment, or attestation has occurred.
