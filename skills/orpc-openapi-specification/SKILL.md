---
name: oRPC OpenAPI Specification
description: Generate OpenAPI specifications for oRPC with ease.
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/ali-master
  version: "1.0.0"
---

# OpenAPI Specification

Generate OpenAPI 3.1.1 specs from your [Router](/docs/router) or [Contract](/docs/contract-first/define-contract).

## Installation

```sh
npm install @orpc/openapi@latest
```

## Generating Specifications

Integrates with [Zod](https://zod.dev/), [Valibot](https://valibot.dev), and [ArkType](https://arktype.io/).

```ts
import { OpenAPIGenerator } from '@orpc/openapi'
import { ZodToJsonSchemaConverter } from '@orpc/zod' // zod v3
import { ZodToJsonSchemaConverter } from '@orpc/zod/zod4' // zod v4
import { experimental_ValibotToJsonSchemaConverter as ValibotToJsonSchemaConverter } from '@orpc/valibot'
import { experimental_ArkTypeToJsonSchemaConverter as ArkTypeToJsonSchemaConverter } from '@orpc/arktype'

const openAPIGenerator = new OpenAPIGenerator({
  schemaConverters: [
    new ZodToJsonSchemaConverter(),
    new ValibotToJsonSchemaConverter(),
    new ArkTypeToJsonSchemaConverter(),
  ],
})

const spec = await openAPIGenerator.generate(router, {
  info: { title: 'My App', version: '0.0.0' },
  servers: [{ url: 'https://api.example.com/v1' }],
})
```

## Common Schemas

```ts
const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
})

const spec = await generator.generate(router, {
  commonSchemas: {
    User: { schema: UserSchema },
    InputPet: { strategy: 'input', schema: PetSchema },
    OutputPet: { strategy: 'output', schema: PetSchema },
    UndefinedError: { error: 'UndefinedError' }
  },
})
```

## Filtering Procedures

```ts
const spec = await generator.generate(router, {
  filter: ({ contract, path }) => !contract['~orpc'].route.tags?.includes('internal'),
})
```

## Operation Metadata

```ts
const ping = os
  .route({
    operationId: 'ping',
    summary: 'the summary',
    description: 'the description',
    deprecated: false,
    tags: ['tag'],
    successDescription: 'the success description',
    spec: {
      operationId: 'customOperationId',
      tags: ['tag'],
      summary: 'the summary',
      requestBody: {
        required: true,
        content: { 'application/json': {} }
      },
      responses: {
        200: {
          description: 'customSuccessDescription',
          content: { 'application/json': {} },
        }
      },
    }
  })
  .handler(() => {})

// Tag an entire router
const router = os.tag('planets').router({})
```

## Customizing Operation Objects

```ts
import { oo } from '@orpc/openapi'

const procedure = os
  .route({
    spec: spec => ({
      ...spec,
      security: [{ 'api-key': [] }],
    }),
  })
  .handler(() => 'Hello, World!')

// With errors
const base = os.errors({
  UNAUTHORIZED: oo.spec({ data: z.any() }, { security: [{ 'api-key': [] }] })
})

// With middleware
const requireAuth = oo.spec(
  os.middleware(async ({ next, errors }) => {
    throw new ORPCError('UNAUTHORIZED')
  }),
  { security: [{ 'api-key': [] }] }
)
```

## `@orpc/zod`

### Zod v4

Zod v4 includes native `File` schema:

```ts
const InputSchema = z.object({
  file: z.file(),
  image: z.file().mime(['image/png', 'image/jpeg']),
})
```

Use `JSON_SCHEMA_REGISTRY` for customization:

```ts
import { JSON_SCHEMA_REGISTRY } from '@orpc/zod/zod4'

JSON_SCHEMA_REGISTRY.add(InputSchema, {
  description: 'User schema',
  examples: [{ name: 'John' }],
})
```

### Zod v3

```ts
import { oz } from '@orpc/zod'

const InputSchema = z.object({
  file: oz.file(),
  image: oz.file().type('image/*'),
  blob: oz.blob()
})

const InputSchemaWithMeta = oz.openapi(
  z.object({ name: z.string() }),
  { examples: [{ name: 'Earth' }] }
)
```
