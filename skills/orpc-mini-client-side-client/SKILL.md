---
name: Mini oRPC Client-side Client
description: How to implement client-side RPC calls in Mini oRPC.
metadata:
  author: Ali Tokir
  homepage: https://github.com/ali-master
---

# Client-side Client in Mini oRPC

In Mini oRPC, the client-side client initiates remote procedure calls to the server. Both client and server must follow shared conventions to communicate effectively.

The complete Mini oRPC implementation is available at the [Mini oRPC Repository](https://github.com/middleapi/mini-orpc).

## Implementation

**Handler (`server/src/fetch/handler.ts`):**

```ts
import { ORPCError } from '@mini-orpc/client'
import { get, parseEmptyableJSON } from '@orpc/shared'
import { isProcedure } from '../procedure'
import { createProcedureClient } from '../procedure-client'

export class RPCHandler<T extends Context> {
  private readonly router: Router<T>

  constructor(router: Router<T>) {
    this.router = router
  }

  async handle(request: Request, options: JSONHandlerHandleOptions<T>) {
    const prefix = options.prefix
    const url = new URL(request.url)

    if (prefix && !url.pathname.startsWith(`${prefix}/`) && url.pathname !== prefix) {
      return { matched: false }
    }

    const pathname = prefix ? url.pathname.replace(prefix, '') : url.pathname
    const path = pathname.replace(/^\/|\/$/g, '').split('/').map(decodeURIComponent)

    const procedure = get(this.router, path)
    if (!isProcedure(procedure)) return { matched: false }

    const client = createProcedureClient(procedure, { context: options.context, path })

    try {
      const input = parseEmptyableJSON(await request.text())
      const output = await client(input, { signal: request.signal })
      return { matched: true, response: Response.json(output) }
    } catch (e) {
      const error = e instanceof ORPCError ? e : new ORPCError('INTERNAL_ERROR', { cause: e })
      return {
        matched: true,
        response: new Response(JSON.stringify(error.toJSON()), {
          status: error.status,
          headers: { 'Content-Type': 'application/json' },
        }),
      }
    }
  }
}
```

**Link (`client/src/fetch/link.ts`):**

```ts
import { parseEmptyableJSON } from '@orpc/shared'
import { isORPCErrorJson, isORPCErrorStatus, ORPCError } from '../error'

export class RPCLink {
  constructor(private readonly options: { url: string | URL }) {}

  async call(path: readonly string[], input: any, options: ClientOptions) {
    const url = new URL(this.options.url)
    url.pathname = `${url.pathname.replace(/\/$/, '')}/${path.join('/')}`

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
      signal: options.signal,
    })

    const body = await parseEmptyableJSON(await response.text())

    if (isORPCErrorStatus(response.status) && isORPCErrorJson(body)) {
      throw new ORPCError(body.code, body)
    }

    if (!response.ok) throw new Error(`[ORPC] Request failed: ${response.status}`)

    return body
  }
}
```

## Type-Safe Wrapper (`client/src/client.ts`)

```ts
export function createORPCClient<T extends NestedClient>(link: RPCLink, options: createORPCClientOptions = {}): T {
  const path = options.path ?? []

  const procedureClient: Client<unknown, unknown> = async (...[input, clientOptions = {}]) => {
    return await link.call(path, input, clientOptions)
  }

  const recursive = new Proxy(procedureClient, {
    get(target, key) {
      if (typeof key !== 'string') return Reflect.get(target, key)
      return createORPCClient(link, { ...options, path: [...path, key] })
    },
  })

  return recursive as any
}
```

## Usage

```ts
const link = new RPCLink({ url: `${window.location.origin}/rpc` })
export const orpc: RouterClient<typeof router> = createORPCClient(link)

const result = await orpc.someProcedure({ input: 'example' })
```
