# Deployment Version Manifest

Every production deployment should expose:

```json
{
  "trust_stack_version": "0.1.0",
  "trust_stack_commit": "<immutable-git-sha>",
  "schema_version": "1.0.0",
  "environment": "production"
}
```

The commit MUST correspond to a tested release. Both .ai and .io should display
or expose the same manifest for any shared production release.
