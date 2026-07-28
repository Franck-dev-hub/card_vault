# CVE Management

## Quick reference

### Commands

```bash
cd frontend

# Check for vulnerabilities
pnpm run audit

# Fix a CVE via override (when a patch exists)
pnpm audit --fix override
pnpm install

# Re-resolve after adding/removing an override
pnpm install
```

### Manage CVEs

```yaml
allowBuilds:
  esbuild: true

auditConfig:
  ignoreGhsas:
    - GHSA-xxxx-xxxx-xxxx     # CVEs with no fix in our range

overrides:
  package-name: ">=5.0.0"     # CVEs fixed by version pin
```

## How it works

CVEs are managed in `frontend/pnpm-workspace.yaml`:

- **`auditConfig.ignoreGhsas`**: false positive or no fix in our range. CVE is silenced in audit output.
- **`overrides`**: actual fix via version pin. CVE is resolved in the dependency tree.

`pnpm audit --audit-level=low` checks all severities. Unknown CVEs (not ignored, not overridden) fail CI.

## When a new CVE appears

### 1. Try to fix

```bash
pnpm audit --fix override
pnpm install
```

This adds an `overrides` entry in `pnpm-workspace.yaml` automatically.

### 2. If no patch exists, add to ignoreGhsas

Add the advisory ID under `auditConfig.ignoreGhsas` in `pnpm-workspace.yaml`:

```yaml
auditConfig:
  ignoreGhsas:
    - GHSA-xxxx-xxxx-xxxx
```

### 3. Verify

```bash
cd frontend && pnpm run audit
```

Must exit with code 0.