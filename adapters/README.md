# Adapter Layer

Adapters translate external protocols into normalized LM references while
preserving native semantics.

Planned adapters:

- c2pa/
- intoto/
- rekor/
- scitt/
- eas/
- erc8004/
- mcp/
- a2a/
- opentelemetry/
- langfuse/
- x402/
- ap2/

## Rule

Adapters are boundaries, not authorities.

An adapter may verify or transport an external proof. It must not silently
reinterpret that proof as semantic authority.
