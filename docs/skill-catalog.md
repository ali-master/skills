# Skill Catalog

The repository currently contains 111 skills. This catalog groups them by what an agent is trying to do, rather than by folder name alone.

## Better Notify

- [`better-notify`](../skills/better-notify/SKILL.md): typed notification infrastructure for Node.js.
- [`better-notify/setup`](../skills/better-notify/setup/SKILL.md): interactive setup guidance for adding Better Notify to a JavaScript or TypeScript project.
- [`better-notify/best-practices`](../skills/better-notify/best-practices/SKILL.md): configuration, channel slots, subpath imports, middleware, hooks, and common gotchas.

## oRPC fundamentals

- [`orpc-getting-started`](../skills/orpc-getting-started/SKILL.md): define procedures, handle errors, create servers, and create clients.
- [`orpc-procedure`](../skills/orpc-procedure/SKILL.md): validation, middleware, handlers, and dependency injection.
- [`orpc-router`](../skills/orpc-router/SKILL.md): nestable router objects composed of procedures.
- [`orpc-context`](../skills/orpc-context/SKILL.md): type-safe dependency injection.
- [`orpc-middleware`](../skills/orpc-middleware/SKILL.md): reusable and extensible procedure behavior.
- [`orpc-metadata`](../skills/orpc-metadata/SKILL.md): procedure metadata.
- [`orpc-error-handling`](../skills/orpc-error-handling/SKILL.md): traditional and type-safe error strategies.
- [`orpc-input-output-structure`](../skills/orpc-input-output-structure/SKILL.md): input and output shaping.
- [`orpc-comparison`](../skills/orpc-comparison/SKILL.md): oRPC compared with tRPC, ts-rest, and Hono.
- [`orpc-ecosystem`](../skills/orpc-ecosystem/SKILL.md): community resources, starter kits, tools, and libraries.
- [`orpc-migrate-from-trpc`](../skills/orpc-migrate-from-trpc/SKILL.md): migration guidance from tRPC.

## Clients and links

- [`orpc-client-side`](../skills/orpc-client-side/SKILL.md): remote calls that feel like local functions.
- [`orpc-server-side`](../skills/orpc-server-side/SKILL.md): call procedures in the same environment as the server.
- [`orpc-rpc-link`](../skills/orpc-rpc-link/SKILL.md): communicate with `RPCHandler`.
- [`orpc-openapi-link`](../skills/orpc-openapi-link/SKILL.md): communicate with OpenAPI-compliant APIs.
- [`orpc-dynamic-link`](../skills/orpc-dynamic-link/SKILL.md): switch between multiple links.
- [`orpc-client-error-handling`](../skills/orpc-client-error-handling/SKILL.md): type-safe client errors.
- [`orpc-client-event-iterator`](../skills/orpc-client-event-iterator/SKILL.md): event iterators in clients.
- [`orpc-client-retry`](../skills/orpc-client-retry/SKILL.md): retry client calls after errors.
- [`orpc-retry-after`](../skills/orpc-retry-after/SKILL.md): retry based on server `Retry-After` headers.
- [`orpc-dedupe-requests`](../skills/orpc-dedupe-requests/SKILL.md): deduplicate similar client requests.

## Server handlers and protocols

- [`orpc-rpc-handler`](../skills/orpc-rpc-handler/SKILL.md): `RPCHandler` setup and behavior.
- [`orpc-openapi-handler`](../skills/orpc-openapi-handler/SKILL.md): `OpenAPIHandler` setup and behavior.
- [`orpc-rpc-protocol`](../skills/orpc-rpc-protocol/SKILL.md): RPC protocol details.
- [`orpc-http`](../skills/orpc-http/SKILL.md): HTTP adapters for server and client use.
- [`orpc-message-port`](../skills/orpc-message-port/SKILL.md): internal process communication with message ports.
- [`orpc-browser-adapter`](../skills/orpc-browser-adapter/SKILL.md): browser script communication with message ports.
- [`orpc-electron`](../skills/orpc-electron/SKILL.md): Electron integration through message ports.

## Framework adapters

- [`orpc-nextjs`](../skills/orpc-nextjs/SKILL.md): Next.js App Router and Pages Router.
- [`orpc-nuxt`](../skills/orpc-nuxt/SKILL.md): Nuxt.js.
- [`orpc-svelte-kit`](../skills/orpc-svelte-kit/SKILL.md): SvelteKit.
- [`orpc-remix`](../skills/orpc-remix/SKILL.md): Remix.
- [`orpc-solid-start`](../skills/orpc-solid-start/SKILL.md): SolidStart.
- [`orpc-astro`](../skills/orpc-astro/SKILL.md): Astro.
- [`orpc-hono`](../skills/orpc-hono/SKILL.md): Hono.
- [`orpc-express`](../skills/orpc-express/SKILL.md): Express.js.
- [`orpc-fastify`](../skills/orpc-fastify/SKILL.md): Fastify.
- [`orpc-elysia`](../skills/orpc-elysia/SKILL.md): Elysia.
- [`orpc-h3`](../skills/orpc-h3/SKILL.md): H3.
- [`orpc-react-native`](../skills/orpc-react-native/SKILL.md): React Native.
- [`orpc-nestjs-implement-contract`](../skills/orpc-nestjs-implement-contract/SKILL.md): NestJS contract implementation.

## Frontend data integrations

- [`orpc-tanstack-query`](../skills/orpc-tanstack-query/SKILL.md): TanStack Query across React, Vue, Solid, Svelte, and Angular.
- [`orpc-tanstack-query-basic`](../skills/orpc-tanstack-query-basic/SKILL.md): legacy/basic TanStack Query integration.
- [`orpc-react-swr`](../skills/orpc-react-swr/SKILL.md): React SWR.
- [`orpc-pinia-colada`](../skills/orpc-pinia-colada/SKILL.md): Pinia Colada for Vue.
- [`orpc-server-action`](../skills/orpc-server-action/SKILL.md): React Server Actions.
- [`orpc-optimize-ssr`](../skills/orpc-optimize-ssr/SKILL.md): avoid unnecessary HTTP self-calls in SSR.

## OpenAPI and contracts

- [`orpc-openapi-getting-started`](../skills/orpc-openapi-getting-started/SKILL.md): quick start for OpenAPI in oRPC.
- [`orpc-define-contract`](../skills/orpc-define-contract/SKILL.md): contract-first API definition.
- [`orpc-implement-contract`](../skills/orpc-implement-contract/SKILL.md): implement contracts.
- [`orpc-router-to-contract`](../skills/orpc-router-to-contract/SKILL.md): convert routers into contracts and avoid internal exposure.
- [`orpc-openapi-routing`](../skills/orpc-openapi-routing/SKILL.md): HTTP methods, paths, statuses, and routing metadata.
- [`orpc-openapi-specification`](../skills/orpc-openapi-specification/SKILL.md): generate OpenAPI specifications.
- [`orpc-openapi-reference`](../skills/orpc-openapi-reference/SKILL.md): serve API reference documentation and specs.
- [`orpc-openapi-error-handling`](../skills/orpc-openapi-error-handling/SKILL.md): OpenAPI-compliant errors.
- [`orpc-openapi-json-serializer`](../skills/orpc-openapi-json-serializer/SKILL.md): OpenAPI JSON serialization.
- [`orpc-openapi-to-contract`](../skills/orpc-openapi-to-contract/SKILL.md): generate contracts from OpenAPI with Hey API.
- [`orpc-expand-openapi-types`](../skills/orpc-expand-openapi-types/SKILL.md): support additional OpenAPILink data types.
- [`orpc-hey-api`](../skills/orpc-hey-api/SKILL.md): Hey API contract and client workflows.
- [`orpc-scalar`](../skills/orpc-scalar/SKILL.md): Scalar API client/docs.
- [`orpc-playgrounds`](../skills/orpc-playgrounds/SKILL.md): interactive API exploration.
- [`orpc-redirect-response`](../skills/orpc-redirect-response/SKILL.md): standard HTTP redirects.
- [`orpc-customizing-error-response`](../skills/orpc-customizing-error-response/SKILL.md): customize OpenAPI error response format.

## Plugins and production behavior

- [`orpc-building-custom-plugins`](../skills/orpc-building-custom-plugins/SKILL.md): create custom plugins with interceptors.
- [`orpc-batch-requests`](../skills/orpc-batch-requests/SKILL.md): batch requests and responses.
- [`orpc-body-limit`](../skills/orpc-body-limit/SKILL.md): limit request body size.
- [`orpc-compression`](../skills/orpc-compression/SKILL.md): compress response bodies.
- [`orpc-cors`](../skills/orpc-cors/SKILL.md): CORS behavior.
- [`orpc-dedupe-middleware`](../skills/orpc-dedupe-middleware/SKILL.md): avoid redundant middleware execution.
- [`orpc-request-headers`](../skills/orpc-request-headers/SKILL.md): access request headers.
- [`orpc-response-headers`](../skills/orpc-response-headers/SKILL.md): set response headers.
- [`orpc-request-validation`](../skills/orpc-request-validation/SKILL.md): block invalid requests before handlers.
- [`orpc-response-validation`](../skills/orpc-response-validation/SKILL.md): validate responses against contracts.
- [`orpc-rethrow-handler`](../skills/orpc-rethrow-handler/SKILL.md): catch and rethrow specific errors.
- [`orpc-strict-get-method`](../skills/orpc-strict-get-method/SKILL.md): require explicit GET support.
- [`orpc-simple-csrf-protection`](../skills/orpc-simple-csrf-protection/SKILL.md): basic CSRF protection.
- [`orpc-smart-coercion`](../skills/orpc-smart-coercion/SKILL.md): coerce input values to schema types.
- [`orpc-hibernation`](../skills/orpc-hibernation/SKILL.md): Cloudflare WebSocket hibernation and related APIs.
- [`orpc-ratelimit`](../skills/orpc-ratelimit/SKILL.md): rate limiting with multiple storage backends.
- [`orpc-disabling-output-validation`](../skills/orpc-disabling-output-validation/SKILL.md): trade output validation for performance.
- [`orpc-extend-body-parser`](../skills/orpc-extend-body-parser/SKILL.md): support larger payloads or more data types.

## Serialization, data, and utilities

- [`orpc-rpc-json-serializer`](../skills/orpc-rpc-json-serializer/SKILL.md): RPC JSON serialization.
- [`orpc-superjson`](../skills/orpc-superjson/SKILL.md): replace the RPC serializer with SuperJson.
- [`orpc-bracket-notation`](../skills/orpc-bracket-notation/SKILL.md): structured data in query strings and form data.
- [`orpc-form-data`](../skills/orpc-form-data/SKILL.md): form data parsing and validation helpers.
- [`orpc-file-upload-download`](../skills/orpc-file-upload-download/SKILL.md): upload and download files with `File` and `Blob`.
- [`orpc-base64url`](../skills/orpc-base64url/SKILL.md): URL-safe base64 helpers.
- [`orpc-cookie`](../skills/orpc-cookie/SKILL.md): HTTP cookie helpers.
- [`orpc-encryption`](../skills/orpc-encryption/SKILL.md): AES-GCM encryption and decryption helpers.
- [`orpc-signing`](../skills/orpc-signing/SKILL.md): HMAC-SHA256 signing and verification.
- [`orpc-no-throw-literal`](../skills/orpc-no-throw-literal/SKILL.md): throw `Error` instances instead of literals.
- [`orpc-max-length-problem`](../skills/orpc-max-length-problem/SKILL.md): address maximum length issues.

## Streaming and events

- [`orpc-event-iterator`](../skills/orpc-event-iterator/SKILL.md): streaming responses, real-time updates, and server-sent events.
- [`orpc-durable-iterator`](../skills/orpc-durable-iterator/SKILL.md): durable event streams, reconnections, and recovery.
- [`orpc-publisher`](../skills/orpc-publisher/SKILL.md): publish and listen to events with resume support.
- [`orpc-openai-streaming`](../skills/orpc-openai-streaming/SKILL.md): OpenAI streaming chatbot example.

## Observability and integrations

- [`orpc-pino`](../skills/orpc-pino/SKILL.md): structured logging and request tracking.
- [`orpc-sentry`](../skills/orpc-sentry/SKILL.md): error tracking and performance monitoring.
- [`orpc-opentelemetry`](../skills/orpc-opentelemetry/SKILL.md): distributed tracing.
- [`orpc-ai-sdk`](../skills/orpc-ai-sdk/SKILL.md): AI SDK integration.
- [`orpc-better-auth`](../skills/orpc-better-auth/SKILL.md): Better Auth integration.
- [`orpc-monorepo-setup`](../skills/orpc-monorepo-setup/SKILL.md): efficient monorepo setup.
- [`orpc-publish-to-npm`](../skills/orpc-publish-to-npm/SKILL.md): publish an oRPC client as an SDK.

## Mini oRPC

- [`orpc-mini-overview`](../skills/orpc-mini-overview/SKILL.md): simplified oRPC for learning.
- [`orpc-mini-procedure-builder`](../skills/orpc-mini-procedure-builder/SKILL.md): mini procedure builder.
- [`orpc-mini-client-side-client`](../skills/orpc-mini-client-side-client/SKILL.md): mini client-side RPC calls.
- [`orpc-mini-server-side-client`](../skills/orpc-mini-server-side-client/SKILL.md): turn a procedure into a callable function.
- [`orpc-mini-beyond-basics`](../skills/orpc-mini-beyond-basics/SKILL.md): advanced mini oRPC features.
