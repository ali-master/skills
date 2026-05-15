---
name: Mini oRPC Server-side Client
description: How to turn a procedure into a callable function in Mini oRPC.
metadata:
  author: Ali Torki
  homepage: https://github.com/ali-master
---

# Server-side Client in Mini oRPC

The server-side client transforms procedures into callable functions, enabling direct server-side invocation.

> The complete Mini oRPC implementation is in the [Mini oRPC Repository](https://github.com/middleapi/mini-orpc).

## Implementation

**`server/src/procedure-client.ts`:**

```ts
import { ORPCError } from '@mini-orpc/client'
import { ValidationError } from './error'

export function createProcedureClient<TInitialContext, TInputSchema, TOutputSchema>(
  procedure: Procedure<TInitialContext, any, TInputSchema, TOutputSchema>,
  ...rest: MaybeOptionalOptions<CreateProcedureClientOptions<TInitialContext>>
): ProcedureClient<TInputSchema, TOutputSchema> {
  const options = resolveMaybeOptionalOptions(rest)

  return (...[input, callerOptions]) => {
    return executeProcedureInternal(procedure, {
      context: options.context ?? {},
      input,
      path: options.path ?? [],
      procedure,
      signal: callerOptions?.signal,
    })
  }
}

async function validateInput(procedure, input) {
  const schema = procedure['~orpc'].inputSchema
  if (!schema) return input

  const result = await schema['~standard'].validate(input)
  if (result.issues) {
    throw new ORPCError('BAD_REQUEST', {
      message: 'Input validation failed',
      data: { issues: result.issues },
      cause: new ValidationError({
        message: 'Input validation failed',
        issues: result.issues,
      }),
    })
  }

  return result.value
}

async function validateOutput(procedure, output) {
  const schema = procedure['~orpc'].outputSchema
  if (!schema) return output

  const result = await schema['~standard'].validate(output)
  if (result.issues) {
    throw new ORPCError('INTERNAL_SERVER_ERROR', {
      message: 'Output validation failed',
      cause: new ValidationError({
        message: 'Output validation failed',
        issues: result.issues,
      }),
    })
  }

  return result.value
}

function executeProcedureInternal(procedure, options) {
  const middlewares = procedure['~orpc'].middlewares
  const inputValidationIndex = 0
  const outputValidationIndex = 0

  const next = async (index, context, input) => {
    let currentInput = input

    if (index === inputValidationIndex) {
      currentInput = await validateInput(procedure, currentInput)
    }

    const mid = middlewares[index]
    const output = mid
      ? (await mid({
          ...options,
          context,
          next: async (...[nextOptions]) => {
            const nextContext = nextOptions?.context ?? {}
            return {
              output: await next(index + 1, { ...context, ...nextContext }, currentInput),
              context: nextContext,
            }
          },
        })).output
      : await procedure['~orpc'].handler({
          ...options,
          context,
          input: currentInput,
        })

    if (index === outputValidationIndex) {
      return await validateOutput(procedure, output)
    }

    return output
  }

  return next(0, options.context, options.input)
}
```

## Router Client

```ts
export function createRouterClient<T extends AnyRouter>(
  router: T,
  ...rest: MaybeOptionalOptions<CreateProcedureClientOptions<InferRouterInitialContexts<T>>>
): RouterClient<T> {
  const options = resolveMaybeOptionalOptions(rest)

  if (isProcedure(router)) {
    return createProcedureClient(router, options) as RouterClient<T>
  }

  const recursive = new Proxy(router, {
    get(target, key) {
      if (typeof key !== 'string') return Reflect.get(target, key)
      const next = get(router, [key]) as AnyRouter | undefined
      if (!next) return Reflect.get(target, key)

      return createRouterClient(next, {
        ...options,
        path: [...toArray(options.path), key],
      })
    },
  })

  return recursive as unknown as RouterClient<T>
}
```

## Usage

```ts
const procedureClient = createProcedureClient(myProcedure, {
  context: { userId: '123' },
})

const result = await procedureClient({ input: 'example' })

const routerClient = createRouterClient(myRouter, {
  context: { userId: '123' },
})

const result2 = await routerClient.someProcedure({ input: 'example' })
```
