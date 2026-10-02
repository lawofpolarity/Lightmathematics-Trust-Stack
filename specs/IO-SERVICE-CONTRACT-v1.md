# lightmathematics.io Service Contract v1

The .io site is the machine-facing gateway.

## Flow

identity -> authorization -> optional economic authorization -> semantic
operation -> result -> proof bundle.

These stages remain independently inspectable.

## Semantic dispositions

ALLOW, REVIEW, REFUSE, STALE, UNRESOLVED, NOT_EVALUATED.

## Commerce

x402 and AP2 normalize into PaymentAuthorization. A successful payment may
authorize execution but MUST NOT change semantic authority or force ALLOW.

## Agents

MCP authorization and A2A transport are adapter layers. ERC-8004 references may
identify/describe an agent but MUST NOT elevate artifact authority.
