# TUF-Inspired Threat Model

Status: **Draft**

This document adopts threat categories from secure update-system thinking and
applies them to governed semantic state.

It does not claim that LM implements The Update Framework.

## Rollback

A consumer is presented with an older governed state as though it were current.

Required test family: `LM-SEC-ROLLBACK-001`.

## Freeze

A previously valid state remains served after the system should have detected
newer authority, evidence, or dependency state.

Required test family: `LM-SEC-FREEZE-001`.

## Mix-and-match

Components from incompatible governed snapshots are combined into a state that
never existed as one authorized version.

Required test family: `LM-SEC-MIXMATCH-001`.

## Key compromise

A signing or authorization credential is compromised or superseded.

Required test family: `LM-SEC-KEYCOMPROMISE-001`.

## Partial synchronization

Different system surfaces expose different versions or proof states.

Required test family: `LM-SEC-PARTIAL-SYNC-001`.

## Semantic non-escalation

External payment, identity, reputation, signature or attestation must not
silently increase semantic authority.

Required test family: `LM-SEC-NONESCALATION-001`.
