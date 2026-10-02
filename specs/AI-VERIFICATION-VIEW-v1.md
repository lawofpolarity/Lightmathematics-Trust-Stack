# lightmathematics.ai Verification View v1

The .ai site is a read/inspect surface.

## View model

The page receives one normalized object:
- artifact
- semantic_reliance
- dependency_summary
- transition_summary
- proof_bundle
- verification_manifest
- runtime_version

## Proof states

Each proof family renders one of:
PRESENT_VERIFIED, PRESENT_UNVERIFIED, ABSENT, INVALID, REVOKED, NOT_EVALUATED.

Proof presence does not alter semantic reliance unless an explicit LM rule
references that proof as evidence.

## Safety

The browser MUST NOT receive service-role credentials, signing keys, payer
credentials, private evidence payloads or unrestricted runtime traces.
