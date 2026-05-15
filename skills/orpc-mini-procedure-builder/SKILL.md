---
name: Mini oRPC Procedure Builder
description: Mini oRPC's procedure builder for defining type-safe procedures.
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/ali-master
  version: "1.0.0"
---

# Procedure Builder in Mini oRPC

The procedure builder is Mini oRPC's core component that enables you to define type-safe procedures with an intuitive, fluent API.

> Complete implementation: [Mini oRPC Repository](https://github.com/middleapi/mini-orpc).

## Implementation

**`server/src/builder.ts`:**

```ts
import { Procedure } from './procedure'

export class Builder<
  TInitialContext extends Context,
  TCurrentContext extends Context,
  TInputSchema extends AnySchema,
  TOutputSchema extends AnySchema,
> {
  '~orpc': BuilderDef<TInitialContext, TCurrentContext, TInputSchema, TOutputSchema>

  constructor(def: BuilderDef<TInitialContext, TCurrentContext, TInputSchema, TOutputSchema>) {
    this['~orpc'] = def
  }

  $context<U extends Context>() {
    return new Builder({ ...this['~orpc'], middlewares: [] })
  }

  middleware<UOutContext extends IntersectPick<TCurrentContext, UOutContext>>(
    middleware: Middleware<TInitialContext, UOutContext>
  ) {
    return middleware
  }

  use<UOutContext extends IntersectPick<TCurrentContext, UOutContext>>(
    middleware: Middleware<TCurrentContext, UOutContext>
  ) {
    return new Builder({
      ...this['~orpc'],
      middlewares: [...this['~orpc'].middlewares, middleware],
    })
  }

  input<USchema extends AnySchema>(schema: USchema) {
    return new Builder({ ...this['~orpc'], inputSchema: schema })
  }

  output<USchema extends AnySchema>(schema: USchema) {
    return new Builder({ ...this['~orpc'], outputSchema: schema })
  }

  handler<UFuncOutput extends InferSchemaInput<TOutputSchema>>(
    handler: ProcedureHandler<TCurrentContext, InferSchemaOutput<TInputSchema>, UFuncOutput>
  ) {
    return new Procedure({ ...this['~orpc'], handler })
  }
}

export const os = new Builder({ middlewares: [] })
```

## Router System

```ts
export type Router<T extends Context>
  = | Procedure<T, any, any, any>
    | { [k: string]: Router<T> }

export type AnyRouter = Router<any>

export type InferRouterInitialContexts<T extends AnyRouter>
  = T extends Procedure<infer UInitialContext, any, any, any>
    ? UInitialContext
    : {
        [K in keyof T]: T[K] extends AnyRouter
          ? InferRouterInitialContexts<T[K]>
          : never;
      }
```

## Usage

```ts
const authMiddleware = os
  .$context<{ user?: { id: string, name: string } }>()
  .middleware(async ({ context, next }) => {
    if (!context.user) {
      throw new Error('Unauthorized')
    }
    return next({ context: { user: context.user } })
  })

export const listPlanet = os
  .input(z.object({
    limit: z.number().int().min(1).max(100).optional(),
    cursor: z.number().int().min(0).default(0),
  }))
  .handler(async ({ input }) => {
    return [{ id: 1, name: 'Earth' }]
  })

export const createPlanet = os
  .$context<{ user?: { id: string, name: string } }>()
  .use(authMiddleware)
  .input(PlanetSchema.omit({ id: true }))
  .handler(async ({ input, context }) => {
    return { id: 2, name: input.name }
  })

export const router = { listPlanet, createPlanet }
```
