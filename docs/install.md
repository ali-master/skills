# Install Guide

This repository is published as a [skills.sh](https://skills.sh) catalog at [`ali-master/skills`](https://github.com/ali-master/skills). Use the `skills` CLI to install the whole catalog or a single skill into your project so your agent (Claude, Codex, Copilot, or any tool that reads `SKILL.md`) can load it on demand.

## Prerequisites

- Node.js 18 or newer (so `npx`/`pnpm dlx`/`bunx` can fetch the `skills` CLI).
- A project directory where the agent looks for skills. The CLI installs into `.claude/skills/` by default, but the target is configurable per agent.

## Install the whole catalog

Pulls every skill in the repository (currently 119).

```sh
npx skills add ali-master/skills        # npm
pnpm dlx skills add ali-master/skills   # pnpm
bunx skills add ali-master/skills       # bun
```

Use this when you want everything available — the agent only loads a skill when its description matches a task, so a large catalog has near-zero context cost until something is actually used.

## Install a single skill

Pass `--skill <slug>` to install one skill without pulling the rest of the catalog.

```sh
npx skills add https://github.com/ali-master/skills --skill orpc-getting-started
```

The same command works with the shorthand owner/repo form:

```sh
npx skills add ali-master/skills --skill orpc-getting-started
```

`pnpm` and `bun` variants:

```sh
pnpm dlx skills add ali-master/skills --skill orpc-getting-started
bunx skills add ali-master/skills --skill orpc-getting-started
```

### What goes in `--skill`

The slug is the folder name under [`skills/`](../skills/) in this repo. Examples:

| Slug                          | What it gives the agent                                              |
| ----------------------------- | -------------------------------------------------------------------- |
| `orpc-getting-started`        | Define procedures, build handlers, wire up clients.                  |
| `orpc-openapi-getting-started`| Ship an OpenAPI-first oRPC service.                                  |
| `orpc-nextjs`                 | Next.js adapter (App Router and Pages Router).                       |
| `orpc-tanstack-query`         | TanStack Query integration for React, Vue, Solid, Svelte, Angular.   |
| `orpc-migrate-from-trpc`      | Step-by-step migration playbook from tRPC.                           |
| `better-notify`               | Typed notification catalogs, channels, templates.                    |

The full list lives in the catalog table in [`../README.md`](../README.md).

### Nested (sub-) skills

Skills can ship sub-skills under a parent folder. Use the `parent/child` slug — exactly as it appears in the catalog table:

```sh
npx skills add ali-master/skills --skill better-notify/setup
npx skills add ali-master/skills --skill better-notify/best-practices
```

## Install several skills at once

Repeat `--skill` for each one — they install in a single pass without re-cloning the repo:

```sh
npx skills add ali-master/skills \
  --skill orpc-getting-started \
  --skill orpc-nextjs \
  --skill orpc-tanstack-query \
  --skill orpc-sentry
```

## Picking the right skill

A few quick paths:

- **Building a typed RPC API** → `orpc-getting-started`, then add procedure/middleware/router skills as the implementation asks for them.
- **Publishing an OpenAPI service** → `orpc-openapi-getting-started`, plus `orpc-define-contract` and `orpc-openapi-routing`.
- **Adopting a framework adapter** → `orpc-nextjs`, `orpc-nuxt`, `orpc-svelte-kit`, `orpc-remix`, `orpc-solid-start`, `orpc-astro`, `orpc-tanstack-start`, `orpc-electron`, `orpc-react-native`, etc.
- **Adding production behavior** → security (`orpc-cors`, `orpc-simple-csrf-protection`), reliability (`orpc-client-retry`, `orpc-ratelimit`), observability (`orpc-pino`, `orpc-sentry`, `orpc-opentelemetry`).
- **Typed notifications** → `better-notify`, then `better-notify/setup` and `better-notify/best-practices`.

See [`usage.md`](usage.md) for fuller workflow recipes.

## Where skills land on disk

After running `skills add`, each installed skill appears as a directory containing a `SKILL.md`:

```text
.claude/skills/
└── orpc-getting-started/
    └── SKILL.md
```

Agents discover skills by scanning that directory, reading the frontmatter `name` and `description`, and loading the `SKILL.md` body only when the task matches.

## Updating and removing

Re-running `skills add` upgrades to the latest version from the repo:

```sh
npx skills add ali-master/skills --skill orpc-getting-started
```

To remove a skill, delete its folder from your skills directory:

```sh
rm -rf .claude/skills/orpc-getting-started
```

## Verifying the install

A skill is installed correctly if:

1. Its folder exists under your agent's skills directory.
2. The folder contains a `SKILL.md` with `name` and `description` frontmatter.
3. The agent can list it when you ask (e.g. "what skills do you have available?").

If the agent doesn't pick a skill up, check that the skills directory matches the path your agent reads from, and that the frontmatter is intact.
