# in-toto Comparator and Integration Note

The Trust Stack adopts the in-toto design principle of separating:

- predicate;
- statement;
- authenticated envelope;
- bundle.

LM should prefer interoperable typed predicates over a monolithic proprietary
receipt format.

The comparator question is whether authenticated production metadata plus a
conventional policy/dependency engine can reproduce LM semantic-reliance
behavior under equal information and capability.
