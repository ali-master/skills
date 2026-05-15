# Usage Guide

This repository packages product and framework documentation as agent skills. Each skill is a directory containing a `SKILL.md` file with frontmatter metadata and concise task guidance.

## Install with skills.sh

```sh
npx skills add ali-master/skills
```

```sh
pnpm dlx skills add ali-master/skills
```

```sh
bunx skills add ali-master/skills
```

## How agents should use the repository

1. Discover the relevant skill by matching the user request to a skill name, description, or folder name.
2. Load only that skill's `SKILL.md` first.
3. Follow any local links in the skill if deeper context is needed.
4. Prefer the skill's examples and conventions over generic framework knowledge.

This keeps context small and makes the output more accurate for the package or integration being used.

## Primary entry points

Use these when a request is broad:

- [`oRPC Getting Started`](../skills/orpc-getting-started/SKILL.md): define procedures, create handlers, create clients, and call procedures.
- [`oRPC Procedure`](../skills/orpc-procedure/SKILL.md): understand validation, middleware, handlers, and dependency injection.
- [`oRPC Router`](../skills/orpc-router/SKILL.md): compose nested procedure objects into API surfaces.
- [`oRPC OpenAPI Getting Started`](../skills/orpc-openapi-getting-started/SKILL.md): publish OpenAPI-compliant APIs from oRPC.
- [`better-notify`](../skills/better-notify/SKILL.md): understand typed notification catalogs, clients, channels, transports, and templates.

## Typical workflows

### Build an oRPC API

Start with `orpc-getting-started`, then load focused skills as the implementation asks for them:

- `orpc-procedure` for validation and handlers.
- `orpc-context` for dependency injection and request context.
- `orpc-middleware` for reusable behavior.
- `orpc-router` for nested API organization.
- `orpc-rpc-handler` or `orpc-openapi-handler` for server exposure.

### Connect a frontend or full-stack framework

Pick the matching adapter skill:

- `orpc-nextjs`, `orpc-nuxt`, `orpc-svelte-kit`, `orpc-remix`, `orpc-solid-start`, or `orpc-astro`.
- `orpc-tanstack-query`, `orpc-react-swr`, or `orpc-pinia-colada` for data fetching integrations.
- `orpc-optimize-ssr` when server-rendered apps should avoid unnecessary HTTP self-calls.

### Publish an OpenAPI-compatible API

Use:

- `orpc-define-contract` and `orpc-implement-contract` for contract-first design.
- `orpc-openapi-routing` for methods, paths, status codes, and route metadata.
- `orpc-openapi-specification` for spec generation.
- `orpc-openapi-reference`, `orpc-scalar`, and `orpc-playgrounds` for interactive docs.

### Add production behavior

Use focused plugin and integration skills:

- Security: `orpc-simple-csrf-protection`, `orpc-strict-get-method`, `orpc-encryption`, `orpc-signing`, `orpc-cors`.
- Reliability: `orpc-client-retry`, `orpc-retry-after`, `orpc-dedupe-requests`, `orpc-dedupe-middleware`, `orpc-ratelimit`.
- Observability: `orpc-pino`, `orpc-sentry`, `orpc-opentelemetry`.
- Performance: `orpc-compression`, `orpc-batch-requests`, `orpc-body-limit`, `orpc-disabling-output-validation`.

### Add typed notifications

Start with `better-notify`, then load:

- `better-notify/setup` for project setup.
- `better-notify/best-practices` for channel slots, subpath imports, middleware, hooks, and common mistakes.

## Local validation

Useful checks while editing:

```sh
find skills -name SKILL.md | wc -l
```

```sh
node - <<'NODE'
const fs = require('fs')
const path = require('path')
const files = []
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (entry.name === 'SKILL.md') files.push(full)
  }
}
walk('skills')
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8')
  const name = text.match(/^name:\s*(.+)$/m)?.[1]?.trim() ?? ''
  if (!name) console.error(`Missing name: ${file}`)
  if (name.length > 64) console.error(`Name too long (${name.length}): ${file}`)
}
NODE
```
