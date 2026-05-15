---
name: oRPC Client Error Handling
description: Handle errors in a type-safe way in oRPC clients.
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/ali-master
  version: "1.0.0"
---

# Error Handling in oRPC Clients

Handle type-safe errors in oRPC clients using [type-safe error handling](/docs/error-handling#type‐safe-error-handling).

## Using `safe` and `isDefinedError`

```ts
import { isDefinedError, safe } from '@orpc/client'

const doSomething = os
  .input(z.object({ id: z.string() }))
  .errors({
    RATE_LIMIT_EXCEEDED: {
      data: z.object({ retryAfter: z.number() })
    }
  })
  .handler(async ({ input, errors }) => {
    throw errors.RATE_LIMIT_EXCEEDED({ data: { retryAfter: 1000 } })
  })
  .callable()

const [error, data, isDefined] = await safe(doSomething({ id: '123' }))
// or { error, data, isDefined } = await safe(...)

if (isDefinedError(error)) { // or `isDefined`
  // handle known error
  console.log(error.data.retryAfter)
} else if (error) {
  // handle unknown error
} else {
  // handle success
  console.log(data)
}
```

- `safe` works like try/catch but infers error types
- `isDefinedError` checks if an error came from `.errors`
- `isDefined` can replace `isDefinedError`

## Safe Client

`createSafeClient` wraps all procedure calls with `safe`:

```ts
import { createSafeClient } from '@orpc/client'

const safeClient = createSafeClient(client)

const [error, data] = await safeClient.doSomething({ id: '123' })
```
