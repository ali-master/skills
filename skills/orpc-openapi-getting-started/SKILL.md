---
name: oRPC OpenAPI Getting Started
description: Quick guide to OpenAPI in oRPC.
metadata:
  author: Ali Torki
  homepage: https://github.com/ali-master
---

# OpenAPI Getting Started

oRPC is inherently compatible with OpenAPI, but you may need additional configurations such as path prefixes, custom routing, etc.

## Installation

```sh
npm install @orpc/server@latest @orpc/client@latest @orpc/openapi@latest
```

## Defining Routes

```ts
import { ORPCError, os } from '@orpc/server'
import * as z from 'zod'

const PlanetSchema = z.object({
  id: z.number().int().min(1),
  name: z.string(),
  description: z.string().optional(),
})

export const listPlanet = os
  .route({ method: 'GET', path: '/planets' })
  .input(z.object({
    limit: z.number().int().min(1).max(100).optional(),
    cursor: z.number().int().min(0).default(0),
  }))
  .output(z.array(PlanetSchema))
  .handler(async () => [{ id: 1, name: 'name' }])

export const findPlanet = os
  .route({ method: 'GET', path: '/planets/{id}' })
  .input(z.object({ id: z.coerce.number().int().min(1) }))
  .output(PlanetSchema)
  .handler(async () => ({ id: 1, name: 'name' }))

export const createPlanet = os
  .$context<{ headers: IncomingHttpHeaders }>()
  .use(({ context, next }) => {
    const user = parseJWT(context.headers.authorization?.split(' ')[1])
    if (user) return next({ context: { user } })
    throw new ORPCError('UNAUTHORIZED')
  })
  .route({ method: 'POST', path: '/planets' })
  .input(PlanetSchema.omit({ id: true }))
  .output(PlanetSchema)
  .handler(async () => ({ id: 1, name: 'name' }))

export const router = {
  planet: { list: listPlanet, find: findPlanet, create: createPlanet }
}
```

### Key Enhancements

* `.route` defines HTTP methods and paths
* `.output` enables automatic OpenAPI spec generation
* `z.coerce` ensures correct parameter parsing

## Creating a Server

```ts
import { createServer } from 'node:http'
import { OpenAPIHandler } from '@orpc/openapi/node'
import { CORSPlugin } from '@orpc/server/plugins'

const handler = new OpenAPIHandler(router, {
  plugins: [new CORSPlugin()],
  interceptors: [onError(e => console.error(e))],
})

const server = createServer(async (req, res) => {
  const result = await handler.handle(req, res, {
    context: { headers: req.headers }
  })

  if (!result.matched) {
    res.statusCode = 404
    res.end('No procedure matched')
  }
})

server.listen(3000)
```

## Accessing APIs

```bash
curl -X GET http://127.0.0.1:3000/planets
curl -X GET http://127.0.0.1:3000/planets/1
curl -X POST http://127.0.0.1:3000/planets \
  -H 'Authorization: Bearer token' \
  -H 'Content-Type: application/json' \
  -d '{"name": "name"}'
```

## Generating OpenAPI Spec

```ts
import { OpenAPIGenerator } from '@orpc/openapi'
import { ZodToJsonSchemaConverter } from '@orpc/zod/zod4'

const generator = new OpenAPIGenerator({
  schemaConverters: [new ZodToJsonSchemaConverter()]
})

const spec = await generator.generate(router, {
  info: { title: 'Planet API', version: '1.0.0' }
})

console.log(JSON.stringify(spec, null, 2))
```
