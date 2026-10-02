# LM-TRUST-STACK-002 Result

Date: 2026-10-02

Status: **EXECUTED_LOCAL_EQUAL_INFORMATION**

## Result

| Family | Cases | Parity |
|---|---:|---:|
| Mutation + selective reopening | 50 | 50/50 |
| Agent handoff + projection/loss | 50 | 50/50 |
| **Total** | **100** | **100/100** |

Parity rate: **1.000**

Residual difference: **0**

Claim disposition: **NULL_FOR_LM_SPECIFIC_ADVANTAGE**

## Interpretation

Under equal information and equal deterministic capabilities, a conventional
dependency graph and policy runtime reproduced the LM reference decisions for:

- operation-relative eligibility;
- authority/evidence mutation propagation;
- downstream invalidation;
- minimal reopening;
- preservation of unaffected branches;
- decision-relevant handoff loss;
- projection-loss detection.

This result narrows the research frontier.

The existence of LM fields such as authority, evidence, currentness,
dependencies, unresolved conditions, losses and operation scope is not itself
evidence of an LM-specific computational advantage when the comparator receives
the same fields.

## Residual frontier

The next experiment should stop giving both arms already-formed semantic
dependencies and obligations.

The prospective question is whether LM has a reproducible method for forming
or preserving decision-relevant dependency/obligation structure from a
transformation history that a conventional baseline, given the same raw
observations but not LM-derived labels, does not recover.

Candidate targets:

1. semantic dependency formation;
2. unresolved-obligation formation and transfer;
3. negative/frontier dependencies in a bounded universe;
4. authority/evidence interaction under transformation;
5. selective retraction and re-derivation from raw transformation events;
6. projection after composition where the lost field was not pre-labelled as
   decision-relevant.

Any next test must avoid hiding information from the comparator merely because
LM encoded it earlier.
