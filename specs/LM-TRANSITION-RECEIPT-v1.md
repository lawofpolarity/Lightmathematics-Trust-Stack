# LM Transition Receipt v1

Status: **Draft**

## Principle

**No governed state change without a verifiable transition receipt.**

A state digest can detect change. It cannot, by itself, determine whether the
change was legitimate.

## Core transition object

```text
TransitionReceipt {
  receipt_id
  artifact_id
  from_version
  to_version
  transition_type
  predecessor_digest
  successor_digest
  authority_event
  evidence_event
  order
  disposition
  unresolved_obligations_before
  unresolved_obligations_after
  recoverable_history
  created_at
}
```

## Required checks

A verifier should check:

1. predecessor identity;
2. successor identity;
3. digest continuity;
4. allowed transition type;
5. authority/evidence event references where required;
6. monotonic order;
7. unresolved-obligation preservation or explicit discharge;
8. history recoverability policy.

A valid cryptographic transition does not prove the substantive correctness of
the authority decision that permitted it.
