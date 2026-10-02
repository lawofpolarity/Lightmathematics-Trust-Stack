# LM-TRUST-STACK-001

Status: **Planned / not executed**

## Objective

Compare the LM Trust Stack against a conventional stack with equal information
and equal capabilities.

## Comparator stack

At minimum:

- signed statements / attestations;
- SCITT-style registration receipts;
- in-toto production metadata;
- conventional dependency graph;
- conventional policy engine;
- runtime trace data;
- identity and authorization state.

## Intervention sequence

1. establish an initially eligible derived artifact;
2. change a source;
3. change authority/evidence state;
4. transform/combine the artifact;
5. hand it between agents;
6. project away selected metadata;
7. introduce partial information loss;
8. test stale conclusions and selective reopening.

## Measure

For each architecture, measure whether it can determine:

- what remains eligible;
- what becomes stale or invalid;
- why;
- for which operation;
- which downstream artifacts are affected;
- what must reopen;
- what can remain closed.

## Claim discipline

A parity result is a valid result.

No LM-specific advantage is established until a residual difference survives
equal-information and equal-capability testing.
