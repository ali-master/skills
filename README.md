<div align="center">

<img src="assets/logo-liquid-glass.svg" alt="Skills" width="120" />

# UseStrict Skills

**Documentation, distilled into agent-loadable skills.**

[![skills.sh](https://skills.sh/b/ali-master/skills)](https://skills.sh/ali-master/skills)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A curated catalog of `SKILL.md` packages
for [Claude](https://claude.com/claude-code), [Codex](https://github.com/openai/codex), [Copilot](https://github.com/features/copilot),
and any agent that understands the [skills.sh](https://skills.sh) format.

</div>

---

## ✨ Install

```sh
npx skills add ali-master/skills      # npm
pnpm dlx skills add ali-master/skills # pnpm
bunx skills add ali-master/skills     # bun
```

Your agent discovers each skill on demand and only loads the matching `SKILL.md` when the task requires it.

## 🚀 Start here

| Want to…                      | Open                                                                           |
|-------------------------------|--------------------------------------------------------------------------------|
| Build a typed RPC API         | [`orpc-getting-started`](skills/orpc-getting-started/SKILL.md)                 |
| Ship an OpenAPI-first service | [`orpc-openapi-getting-started`](skills/orpc-openapi-getting-started/SKILL.md) |
| Send typed notifications      | [`better-notify`](skills/better-notify/SKILL.md)                               |
| Migrate from tRPC             | [`orpc-migrate-from-trpc`](skills/orpc-migrate-from-trpc/SKILL.md)             |

## 📚 Catalog

<!-- skills:start -->

> 119 skills available. Run `bun run scripts/generate-skills-table.ts` to regenerate.

| Skill | Name | Description |
| ----- | ---- | ----------- |
| [`better-notify`](skills/better-notify/SKILL.md) | better-notify | Context and API guidance for Better Notify — end-to-end typed notification infrastructure for Node.js |
| [`better-notify/best-practices`](skills/better-notify/best-practices/SKILL.md) | better-notify/best-practices | Quick reference for Better Notify configuration, patterns, and common gotchas |
| [`better-notify/setup`](skills/better-notify/setup/SKILL.md) | better-notify/setup | Interactive setup wizard for adding Better Notify to a TypeScript/JavaScript project |
| [`orpc-ai-sdk`](skills/orpc-ai-sdk/SKILL.md) | oRPC AI SDK Integration | Seamlessly use AI SDK inside your oRPC projects without any extra overhead. |
| [`orpc-astro`](skills/orpc-astro/SKILL.md) | oRPC Astro Adapter | Use oRPC inside an Astro project. |
| [`orpc-base64url`](skills/orpc-base64url/SKILL.md) | oRPC Base64Url Helpers | Functions to encode and decode base64url strings (URL-safe variant of base64). |
| [`orpc-batch-requests`](skills/orpc-batch-requests/SKILL.md) | oRPC Batch Requests Plugin | A plugin for oRPC to batch requests and responses to reduce overhead. |
| [`orpc-better-auth`](skills/orpc-better-auth/SKILL.md) | oRPC Better Auth Integration | Use Better Auth inside your oRPC projects without any extra overhead. |
| [`orpc-body-limit`](skills/orpc-body-limit/SKILL.md) | oRPC Body Limit Plugin | A plugin for oRPC to limit the request body size. |
| [`orpc-bracket-notation`](skills/orpc-bracket-notation/SKILL.md) | oRPC Bracket Notation | Represent structured data in limited formats such as URL queries and form data. |
| [`orpc-browser-adapter`](skills/orpc-browser-adapter/SKILL.md) | oRPC Browser Adapter | Type-safe communication between browser scripts using Message Port Adapter. |
| [`orpc-building-custom-plugins`](skills/orpc-building-custom-plugins/SKILL.md) | oRPC Building Custom Plugins | Create powerful custom plugins to extend oRPC handlers and links with interceptors. |
| [`orpc-client-error-handling`](skills/orpc-client-error-handling/SKILL.md) | oRPC Client Error Handling | Handle errors in a type-safe way in oRPC clients. |
| [`orpc-client-event-iterator`](skills/orpc-client-event-iterator/SKILL.md) | oRPC Client Event Iterator | Use event iterators in oRPC clients. |
| [`orpc-client-retry`](skills/orpc-client-retry/SKILL.md) | oRPC Client Retry Plugin | A plugin for oRPC that enables retrying client calls when errors occur. |
| [`orpc-client-side`](skills/orpc-client-side/SKILL.md) | oRPC Client-Side Clients | Call your oRPC procedures remotely as if they were local functions. |
| [`orpc-comparison`](skills/orpc-comparison/SKILL.md) | oRPC Comparison | How oRPC differs from tRPC, ts-rest, and Hono. |
| [`orpc-compression`](skills/orpc-compression/SKILL.md) | oRPC Compression Plugin | A plugin for oRPC that compresses response bodies to reduce bandwidth usage. |
| [`orpc-context`](skills/orpc-context/SKILL.md) | oRPC Context | Type-safe dependency injection pattern in oRPC. |
| [`orpc-cookie`](skills/orpc-cookie/SKILL.md) | oRPC Cookie Helpers | Functions for managing HTTP cookies in web applications. |
| [`orpc-cors`](skills/orpc-cors/SKILL.md) | oRPC CORS Plugin | CORS Plugin for oRPC. |
| [`orpc-customizing-error-response`](skills/orpc-customizing-error-response/SKILL.md) | oRPC Customizing Error Response | Customize the error response format in oRPC OpenAPI. |
| [`orpc-dedupe-middleware`](skills/orpc-dedupe-middleware/SKILL.md) | oRPC Dedupe Middleware | Enhance oRPC middleware performance by avoiding redundant executions. |
| [`orpc-dedupe-requests`](skills/orpc-dedupe-requests/SKILL.md) | oRPC Dedupe Requests Plugin | Prevents duplicate requests by deduplicating similar ones to reduce server load. |
| [`orpc-define-contract`](skills/orpc-define-contract/SKILL.md) | oRPC Define Contract | Define a contract for contract-first development in oRPC. |
| [`orpc-disabling-output-validation`](skills/orpc-disabling-output-validation/SKILL.md) | oRPC Disabling Output Validation | Disable output validation for improved performance while keeping OpenAPI spec generation. |
| [`orpc-durable-iterator`](skills/orpc-durable-iterator/SKILL.md) | oRPC Durable Iterator Integration | Extends Event Iterator with durable event streams, automatic reconnections, and event recovery. |
| [`orpc-dynamic-link`](skills/orpc-dynamic-link/SKILL.md) | oRPC DynamicLink | Dynamically switch between multiple oRPC's links. |
| [`orpc-ecosystem`](skills/orpc-ecosystem/SKILL.md) | oRPC Ecosystem | Community resources, starter kits, tools, and libraries for oRPC. |
| [`orpc-electron`](skills/orpc-electron/SKILL.md) | oRPC Electron Adapter | Use oRPC inside an Electron project via Message Port Adapter. |
| [`orpc-elysia`](skills/orpc-elysia/SKILL.md) | oRPC Elysia Adapter | Use oRPC inside an Elysia project. |
| [`orpc-encryption`](skills/orpc-encryption/SKILL.md) | oRPC Encryption Helpers | Functions to encrypt and decrypt sensitive data using AES-GCM. |
| [`orpc-error-handling`](skills/orpc-error-handling/SKILL.md) | oRPC Error Handling | Manage errors in oRPC using both traditional and type-safe strategies. |
| [`orpc-event-iterator`](skills/orpc-event-iterator/SKILL.md) | oRPC Event Iterator (SSE) | Streaming responses, real-time updates, and server-sent events using oRPC. |
| [`orpc-expand-openapi-types`](skills/orpc-expand-openapi-types/SKILL.md) | oRPC Expanding OpenAPI Link Types | Extend OpenAPILink to support additional data types beyond JSON's native capabilities. |
| [`orpc-express`](skills/orpc-express/SKILL.md) | oRPC Express.js Adapter | Use oRPC inside an Express.js project. |
| [`orpc-extend-body-parser`](skills/orpc-extend-body-parser/SKILL.md) | oRPC Extend Body Parser | Extend the body parser for larger payloads or additional data types. |
| [`orpc-fastify`](skills/orpc-fastify/SKILL.md) | oRPC Fastify Adapter | Use oRPC inside a Fastify project. |
| [`orpc-file-upload-download`](skills/orpc-file-upload-download/SKILL.md) | oRPC File Upload/Download | Upload and download files using oRPC with standard File and Blob objects. |
| [`orpc-form-data`](skills/orpc-form-data/SKILL.md) | oRPC Form Data Helpers | Utilities for parsing form data and handling validation errors with bracket notation support. |
| [`orpc-getting-started`](skills/orpc-getting-started/SKILL.md) | oRPC Getting Started | Quick guide to oRPC — define procedures, handle errors, integrate with popular frameworks. |
| [`orpc-h3`](skills/orpc-h3/SKILL.md) | oRPC H3 Adapter | Use oRPC inside an H3 project. |
| [`orpc-hey-api`](skills/orpc-hey-api/SKILL.md) | oRPC Hey API Integration | Generate oRPC contracts from OpenAPI with Hey API or adapt a Hey API client. |
| [`orpc-hibernation`](skills/orpc-hibernation/SKILL.md) | oRPC Hibernation Plugin | Plugin to fully leverage Hibernation APIs in oRPC server (Cloudflare Websocket Hibernation, etc). |
| [`orpc-hono`](skills/orpc-hono/SKILL.md) | oRPC Hono Adapter | Use oRPC inside a Hono project. |
| [`orpc-http`](skills/orpc-http/SKILL.md) | oRPC HTTP Adapter | How to use oRPC over HTTP with various server and client adapters. |
| [`orpc-implement-contract`](skills/orpc-implement-contract/SKILL.md) | oRPC Implement Contract | Implement a contract for contract-first development in oRPC. |
| [`orpc-input-output-structure`](skills/orpc-input-output-structure/SKILL.md) | oRPC Input/Output Structure | Control how input and output data is structured in oRPC. |
| [`orpc-max-length-problem`](skills/orpc-max-length-problem/SKILL.md) | oRPC Exceeds Maximum Length Problem | How to address the Exceeds the Maximum Length Problem in oRPC. |
| [`orpc-message-port`](skills/orpc-message-port/SKILL.md) | oRPC Message Port | Using oRPC with Message Ports for internal communication between processes. |
| [`orpc-metadata`](skills/orpc-metadata/SKILL.md) | oRPC Metadata | Enhance your procedures with metadata. |
| [`orpc-middleware`](skills/orpc-middleware/SKILL.md) | oRPC Middleware | Middleware enables reusable and extensible procedures in oRPC. |
| [`orpc-migrate-from-trpc`](skills/orpc-migrate-from-trpc/SKILL.md) | oRPC Migrate from tRPC | A comprehensive guide to migrate your tRPC application to oRPC. |
| [`orpc-mini-beyond-basics`](skills/orpc-mini-beyond-basics/SKILL.md) | Mini oRPC Beyond the Basics | Advanced features you can implement in Mini oRPC. |
| [`orpc-mini-client-side-client`](skills/orpc-mini-client-side-client/SKILL.md) | Mini oRPC Client-side Client | How to implement client-side RPC calls in Mini oRPC. |
| [`orpc-mini-overview`](skills/orpc-mini-overview/SKILL.md) | Mini oRPC Overview | A simplified version of oRPC designed for learning purposes. |
| [`orpc-mini-procedure-builder`](skills/orpc-mini-procedure-builder/SKILL.md) | Mini oRPC Procedure Builder | Mini oRPC's procedure builder for defining type-safe procedures. |
| [`orpc-mini-server-side-client`](skills/orpc-mini-server-side-client/SKILL.md) | Mini oRPC Server-side Client | How to turn a procedure into a callable function in Mini oRPC. |
| [`orpc-monorepo-setup`](skills/orpc-monorepo-setup/SKILL.md) | oRPC Monorepo Setup | The most efficient way to set up a monorepo with oRPC. |
| [`orpc-nestjs-implement-contract`](skills/orpc-nestjs-implement-contract/SKILL.md) | oRPC NestJS Implement Contract | Implement oRPC contracts in your NestJS projects with @orpc/nest. |
| [`orpc-nextjs`](skills/orpc-nextjs/SKILL.md) | oRPC Next.js Adapter | Use oRPC inside a Next.js project (App Router and Pages Router). |
| [`orpc-no-throw-literal`](skills/orpc-no-throw-literal/SKILL.md) | oRPC No Throw Literal | Always throw Error instances instead of literal values. |
| [`orpc-nuxt`](skills/orpc-nuxt/SKILL.md) | oRPC Nuxt.js Adapter | Use oRPC inside a Nuxt.js project. |
| [`orpc-openai-streaming`](skills/orpc-openai-streaming/SKILL.md) | oRPC OpenAI Streaming Example | Combine oRPC with the OpenAI Streaming API to build a chatbot. |
| [`orpc-openapi-error-handling`](skills/orpc-openapi-error-handling/SKILL.md) | oRPC OpenAPI Error Handling | Handle errors in your OpenAPI-compliant oRPC APIs. |
| [`orpc-openapi-getting-started`](skills/orpc-openapi-getting-started/SKILL.md) | oRPC OpenAPI Getting Started | Quick guide to OpenAPI in oRPC. |
| [`orpc-openapi-handler`](skills/orpc-openapi-handler/SKILL.md) | oRPC OpenAPI Handler | Comprehensive Guide to the OpenAPIHandler in oRPC. |
| [`orpc-openapi-json-serializer`](skills/orpc-openapi-json-serializer/SKILL.md) | oRPC OpenAPI JSON Serializer | Extend or override the standard OpenAPI JSON serializer. |
| [`orpc-openapi-link`](skills/orpc-openapi-link/SKILL.md) | oRPC OpenAPILink | Use OpenAPILink in oRPC clients to communicate with OpenAPI-compliant APIs. |
| [`orpc-openapi-reference`](skills/orpc-openapi-reference/SKILL.md) | oRPC OpenAPI Reference Plugin | Plugin that serves API reference documentation (Scalar/Swagger) and the OpenAPI specification. |
| [`orpc-openapi-routing`](skills/orpc-openapi-routing/SKILL.md) | oRPC OpenAPI Routing | Configure procedure routing with HTTP methods, paths, and response statuses. |
| [`orpc-openapi-specification`](skills/orpc-openapi-specification/SKILL.md) | oRPC OpenAPI Specification | Generate OpenAPI specifications for oRPC with ease. |
| [`orpc-openapi-to-contract`](skills/orpc-openapi-to-contract/SKILL.md) | oRPC OpenAPI to Contract | Generate an oRPC contract from an existing OpenAPI specification with Hey API. |
| [`orpc-opentelemetry`](skills/orpc-opentelemetry/SKILL.md) | oRPC OpenTelemetry Integration | Integrate oRPC with OpenTelemetry for distributed tracing. |
| [`orpc-optimize-ssr`](skills/orpc-optimize-ssr/SKILL.md) | oRPC Optimize SSR | Optimize SSR for fullstack frameworks by avoiding unnecessary HTTP self-calls. |
| [`orpc-pinia-colada`](skills/orpc-pinia-colada/SKILL.md) | oRPC Pinia Colada Integration | Seamlessly integrate oRPC with Pinia Colada for Vue. |
| [`orpc-pino`](skills/orpc-pino/SKILL.md) | oRPC Pino Integration | Integrate oRPC with Pino for structured logging and request tracking. |
| [`orpc-playgrounds`](skills/orpc-playgrounds/SKILL.md) | oRPC Playgrounds | Interactive development environments for exploring and testing oRPC functionality. |
| [`orpc-procedure`](skills/orpc-procedure/SKILL.md) | oRPC Procedure | Understanding procedures in oRPC — standard functions with validation, middleware, and DI. |
| [`orpc-publish-to-npm`](skills/orpc-publish-to-npm/SKILL.md) | oRPC Publish Client to NPM | How to publish your oRPC client to NPM as an SDK. |
| [`orpc-publisher`](skills/orpc-publisher/SKILL.md) | oRPC Publisher | Listen and publish events with resuming support in oRPC. |
| [`orpc-ratelimit`](skills/orpc-ratelimit/SKILL.md) | oRPC Rate Limit | Rate limiting for oRPC with multiple storage backend support. |
| [`orpc-react-native`](skills/orpc-react-native/SKILL.md) | oRPC React Native Adapter | Use oRPC inside a React Native project. |
| [`orpc-react-swr`](skills/orpc-react-swr/SKILL.md) | oRPC React SWR Integration | Integrate oRPC with React SWR for efficient data fetching and caching. |
| [`orpc-redirect-response`](skills/orpc-redirect-response/SKILL.md) | oRPC Redirect Response | Standard HTTP redirect response in oRPC OpenAPI. |
| [`orpc-remix`](skills/orpc-remix/SKILL.md) | oRPC Remix Adapter | Use oRPC inside a Remix project. |
| [`orpc-request-headers`](skills/orpc-request-headers/SKILL.md) | oRPC Request Headers Plugin | Access request headers in oRPC. |
| [`orpc-request-validation`](skills/orpc-request-validation/SKILL.md) | oRPC Request Validation Plugin | A plugin that blocks invalid requests before they reach your server. |
| [`orpc-response-headers`](skills/orpc-response-headers/SKILL.md) | oRPC Response Headers Plugin | Set response headers in oRPC. |
| [`orpc-response-validation`](skills/orpc-response-validation/SKILL.md) | oRPC Response Validation Plugin | Validate server responses against the contract schema. |
| [`orpc-rethrow-handler`](skills/orpc-rethrow-handler/SKILL.md) | oRPC Rethrow Handler Plugin | Catch and rethrow specific errors during request handling. |
| [`orpc-retry-after`](skills/orpc-retry-after/SKILL.md) | oRPC Retry After Plugin | Automatically retries requests based on server Retry-After headers. |
| [`orpc-router`](skills/orpc-router/SKILL.md) | oRPC Router | Understanding routers in oRPC — nestable objects composed of procedures. |
| [`orpc-router-to-contract`](skills/orpc-router-to-contract/SKILL.md) | oRPC Router to Contract | Convert a router into a contract, export it safely, and prevent internal exposure. |
| [`orpc-rpc-handler`](skills/orpc-rpc-handler/SKILL.md) | oRPC RPC Handler | Comprehensive Guide to the RPCHandler in oRPC. |
| [`orpc-rpc-json-serializer`](skills/orpc-rpc-json-serializer/SKILL.md) | oRPC RPC JSON Serializer | Extend or override the standard RPC JSON serializer. |
| [`orpc-rpc-link`](skills/orpc-rpc-link/SKILL.md) | oRPC RPCLink | Use RPCLink in oRPC clients to communicate with RPCHandler. |
| [`orpc-rpc-protocol`](skills/orpc-rpc-protocol/SKILL.md) | oRPC RPC Protocol | Learn about the RPC protocol used by RPCHandler. |
| [`orpc-scalar`](skills/orpc-scalar/SKILL.md) | oRPC Scalar (Swagger) | Create a beautiful API client for your oRPC with Scalar. |
| [`orpc-sentry`](skills/orpc-sentry/SKILL.md) | oRPC Sentry Integration | Integrate oRPC with Sentry for error tracking and performance monitoring. |
| [`orpc-server-action`](skills/orpc-server-action/SKILL.md) | oRPC Server Action | Integrate oRPC procedures with React Server Actions. |
| [`orpc-server-side`](skills/orpc-server-side/SKILL.md) | oRPC Server-Side Clients | Call your oRPC procedures in the same environment as your server like native functions. |
| [`orpc-signing`](skills/orpc-signing/SKILL.md) | oRPC Signing Helpers | Cryptographically sign and verify data using HMAC-SHA256. |
| [`orpc-simple-csrf-protection`](skills/orpc-simple-csrf-protection/SKILL.md) | oRPC Simple CSRF Protection Plugin | Add basic CSRF protection to your oRPC application. |
| [`orpc-smart-coercion`](skills/orpc-smart-coercion/SKILL.md) | oRPC Smart Coercion Plugin | Automatically converts input values to match schema types without manual coercion logic. |
| [`orpc-solid-start`](skills/orpc-solid-start/SKILL.md) | oRPC Solid Start Adapter | Use oRPC inside a Solid Start project. |
| [`orpc-strict-get-method`](skills/orpc-strict-get-method/SKILL.md) | oRPC Strict GET Method Plugin | Only procedures explicitly accepting GET can be called via HTTP GET (CSRF protection). |
| [`orpc-superjson`](skills/orpc-superjson/SKILL.md) | oRPC SuperJson | Replace the default oRPC RPC serializer with SuperJson. |
| [`orpc-svelte-kit`](skills/orpc-svelte-kit/SKILL.md) | oRPC Svelte Kit Adapter | Use oRPC inside a Svelte Kit project. |
| [`orpc-tanstack-query`](skills/orpc-tanstack-query/SKILL.md) | oRPC TanStack Query Integration | Seamlessly integrate oRPC with TanStack Query (React, Vue, Solid, Svelte, Angular). |
| [`orpc-tanstack-query-basic`](skills/orpc-tanstack-query-basic/SKILL.md) | oRPC TanStack Query Basic | Basic guide to integrating oRPC with TanStack Query (legacy). |
| [`orpc-tanstack-start`](skills/orpc-tanstack-start/SKILL.md) | oRPC TanStack Start Adapter | Use oRPC inside a TanStack Start project with server routes, isomorphic links, and SSR optimization. |
| [`orpc-testing-mocking`](skills/orpc-testing-mocking/SKILL.md) | oRPC Testing & Mocking | Test oRPC procedures using server-side clients, and mock implementations for frontend testing. |
| [`orpc-trpc`](skills/orpc-trpc/SKILL.md) | oRPC tRPC Integration | Use oRPC features (OpenAPI specs, OpenAPIHandler) inside existing tRPC applications via @orpc/trpc. |
| [`orpc-validation-errors`](skills/orpc-validation-errors/SKILL.md) | oRPC Validation Errors | Customize built-in input/output validation errors using client interceptors or middleware, with type-safe error mapping. |
| [`orpc-web-workers`](skills/orpc-web-workers/SKILL.md) | oRPC Web Workers Adapter | Type-safe oRPC communication between the main thread and Web Workers via the Message Port adapter. |
| [`orpc-websocket`](skills/orpc-websocket/SKILL.md) | oRPC WebSocket Adapter | Use oRPC over WebSocket for low-latency, bidirectional RPC across browser, Node, Bun, Deno, Cloudflare, and CrossWS. |
| [`orpc-worker-threads`](skills/orpc-worker-threads/SKILL.md) | oRPC Worker Threads Adapter | Type-safe oRPC communication between Node.js worker threads via the Message Port adapter. |
| [`orpc-zod-smart-coercion`](skills/orpc-zod-smart-coercion/SKILL.md) | oRPC Zod Smart Coercion | Refined alternative to z.coerce — automatically coerces inputs to the expected type without modifying the schema. |

<!-- skills:end -->

> The table above is generated. Run `bun run scripts/generate-skills-table.ts` to refresh after adding or editing a
> skill.

## 🛠 Authoring

Each skill is a folder under [`skills/`](./skills/) containing a `SKILL.md` with YAML frontmatter:

````md
---
name: My Skill
description: One-line summary the agent uses to decide when to load this skill.
metadata:
  author: Ali Torki
  homepage: https://github.com/ali-master
---

# My Skill

Practical, focused guidance the agent can act on.
````

### Frontmatter fields

| Field                 | Required | Purpose                                                                                |
| --------------------- | -------- | -------------------------------------------------------------------------------------- |
| `name`                | ✅       | Display label shown to the agent. Must be ≤ 64 characters.                             |
| `description`         | ✅       | One-line summary the agent uses to decide whether to load the skill.                   |
| `metadata.author`     | ✅       | Skill author (defaults to `Ali Torki` for skills in this repo).                        |
| `metadata.homepage`   | ✅       | Author homepage (defaults to `https://github.com/ali-master`).                         |

### Nested skills

Skills can ship sub-skills. Drop additional `SKILL.md` files inside the parent folder — both the generator and the metadata script recurse into them:

```text
skills/
├── better-notify/
│   ├── SKILL.md                    # parent: index + overview
│   ├── setup/SKILL.md              # sub-skill: setup wizard
│   └── best-practices/SKILL.md     # sub-skill: best practices
```

The catalog renders nested slugs as `parent/child` so they sort next to their parent.

### Helper scripts

```sh
bun run skills:metadata   # backfill the standard metadata block on every SKILL.md (idempotent)
bun run skills:table      # regenerate the catalog table in README.md
```

Keep skills tight — agents pull them into the context window, so brevity wins. See [`docs/authoring.md`](docs/authoring.md) for the full checklist.

## 🤝 Contributing

1. Fork & branch.
2. Add a new directory under `skills/` with a `SKILL.md` (top-level **or** nested under an existing skill).
3. Run `bun run skills:metadata` to apply the standard `metadata` block.
4. Run `bun run skills:table` so the catalog stays in sync.
5. Open a PR.

The skill `name` in frontmatter must be ≤ 64 characters.

---

<div align="center">

**[⬆ Back to Top](#usestrict-skills)**

Made with ❤️ by [Ali Torki](https://github.com/ali-master)

</div>

