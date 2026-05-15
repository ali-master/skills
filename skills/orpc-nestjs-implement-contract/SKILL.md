---
name: oRPC NestJS Implement Contract
description: Implement oRPC contracts in your NestJS projects with @orpc/nest.
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/ali-master
  version: "1.0.0"
---

# Implement Contract in NestJS

Implement [oRPC contracts](/docs/contract-first/define-contract) in [NestJS](https://nestjs.com/) using `@orpc/nest`.

## Installation

```sh
npm install @orpc/nest@latest
```

## Requirements

oRPC is ESM-only. Configure your NestJS app to support ESM:

```json
{
  "compilerOptions": {
    "module": "NodeNext",
    "strict": true
  }
}
```

- **Node.js 22+**: Recommended — supports `require()` of ESM modules natively.
- **Older versions**: Use a bundler to compile ESM modules to CommonJS.

> NestJS bundler (Webpack/SWC) may not compile `node_modules`. Adjust bundler config to compile `@orpc/nest`.

## Define Your Contract

Each contract **must** define a `path` in `.route` for NestJS implementation. Use `populateContractRouterPaths` to auto-fill paths.

```ts
import { oc, populateContractRouterPaths } from '@orpc/contract'
import * as z from 'zod'

export const PlanetSchema = z.object({
  id: z.number().int().min(1),
  name: z.string(),
  description: z.string().optional(),
})

export const listPlanetContract = oc
  .route({ method: 'GET', path: '/planets' })
  .input(z.object({
    limit: z.number().int().min(1).max(100).optional(),
    cursor: z.number().int().min(0).default(0),
  }))
  .output(z.array(PlanetSchema))

export const contract = populateContractRouterPaths({
  planet: {
    list: listPlanetContract,
    // find, create...
  },
})
```

## Implement Your Contract

```ts
import { Implement, implement, ORPCError } from '@orpc/nest'

@Controller()
export class PlanetController {
  // Standalone procedure
  @Implement(contract.planet.list)
  list() {
    return implement(contract.planet.list).handler(({ input }) => {
      return []
    })
  }

  // Entire contract
  @Implement(contract.planet)
  planet() {
    return {
      list: implement(contract.planet.list).handler(({ input }) => []),
      find: implement(contract.planet.find).handler(({ input }) => ({
        id: 1, name: 'Earth', description: 'The planet Earth',
      })),
      create: implement(contract.planet.create).handler(({ input }) => ({
        id: 1, name: 'Earth', description: 'The planet Earth',
      })),
    }
  }
}
```

## Body Parser

NestJS `urlencoded` parser doesn't support [Bracket Notation](/docs/openapi/bracket-notation). Disable the NestJS body parser:

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  })
  await app.listen(process.env.PORT ?? 3000)
}
```

## Configuration

```ts
import { Module } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { onError, ORPCError, ORPCModule } from '@orpc/nest'
import { experimental_RethrowHandlerPlugin as RethrowHandlerPlugin } from '@orpc/server/plugins'

declare module '@orpc/nest' {
  interface ORPCGlobalContext {
    request: Request
  }
}

@Module({
  imports: [
    ORPCModule.forRootAsync({
      useFactory: (request: Request) => ({
        interceptors: [onError(e => console.error(e))],
        context: { request },
        eventIteratorKeepAliveInterval: 5000,
        customJsonSerializers: [],
        plugins: [
          new RethrowHandlerPlugin({
            filter: (error) => !(error instanceof ORPCError),
          })
        ],
      }),
      inject: [REQUEST],
    }),
  ],
})
export class AppModule {}
```

## Type-Safe Client

```ts
import { createORPCClient } from '@orpc/client'
import { OpenAPILink } from '@orpc/openapi-client/fetch'

const link = new OpenAPILink(contract, {
  url: 'http://localhost:3000',
  headers: () => ({ 'x-api-key': 'my-api-key' }),
})

const client: JsonifiedClient<ContractRouterClient<typeof contract>> = createORPCClient(link)
```
