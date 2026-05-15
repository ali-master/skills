---
name: oRPC Rate Limit
description: Rate limiting for oRPC with multiple storage backend support.
metadata:
  author: Ali Tokir
  homepage: https://github.com/ali-master
---

# Rate Limit

Flexible rate limiting with multiple storage backends — memory, Redis, Upstash.

## Installation

```sh
npm install @orpc/experimental-ratelimit@latest
```

## Adapters

### Memory

```ts
import { MemoryRatelimiter } from '@orpc/experimental-ratelimit/memory'

const limiter = new MemoryRatelimiter({
  maxRequests: 10,
  window: 60000, // 60 seconds
})
```

### Redis

Uses atomic Lua scripts for distributed rate limiting.

```ts
import { RedisRatelimiter } from '@orpc/experimental-ratelimit/redis'
import { Redis } from 'ioredis'

const redis = new Redis('redis://localhost:6379')

const limiter = new RedisRatelimiter({
  // Provide a Redis Lua script runner
  exec: async (script, numKeys, ...rest) => redis.eval(script, numKeys, ...rest),
  maxRequests: 100,
  window: 60000,
  prefix: 'orpc:ratelimit:',
})
```

> Any Redis client that supports Lua scripts works.

### Upstash Ratelimit

```ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { UpstashRatelimiter } from '@orpc/experimental-ratelimit/upstash-ratelimit'

const redis = Redis.fromEnv()
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '60 s'),
  prefix: 'my-app:',
})

const limiter = new UpstashRatelimiter(ratelimit)

// Edge runtime — pass waitUntil:
const edgeLimiter = new UpstashRatelimiter(ratelimit, {
  waitUntil: ctx.waitUntil.bind(ctx),
})
```

### Cloudflare Ratelimit

```ts
import { CloudflareRatelimiter } from '@orpc/experimental-ratelimit/cloudflare-ratelimit'

export default {
  async fetch(request, env) {
    const limiter = new CloudflareRatelimiter(env.MY_RATE_LIMITER)
    return new Response(`Hello World!`)
  }
}
```

## Blocking Mode

```ts
const limiter = new MemoryRatelimiter({
  maxRequests: 10,
  window: 60000,
  blockingUntilReady: {
    enabled: true,
    timeout: 5000,
  },
})
```

## Manual Usage

```ts
import { ORPCError } from '@orpc/server'

const result = await limiter.limit('user:123')

if (!result.success) {
  throw new ORPCError('TOO_MANY_REQUESTS', {
    data: {
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
    },
  })
}
```

## `createRatelimitMiddleware`

```ts
import { createRatelimitMiddleware, Ratelimiter } from '@orpc/experimental-ratelimit'

const loginProcedure = os
  .$context<{ ratelimiter: Ratelimiter }>()
  .input(z.object({ email: z.email() }))
  .use(
    createRatelimitMiddleware({
      limiter: ({ context }) => context.ratelimiter,
      key: ({ context }, input) => `login:${input.email}`,
    }),
  )
  .handler(({ input }) => ({ success: true }))
```

> Automatically deduplicates rate limit checks. Disable with `dedupe: false`.

## Handler Plugin

```ts
import { RatelimitHandlerPlugin } from '@orpc/experimental-ratelimit'

const handler = new RPCHandler(router, {
  plugins: [new RatelimitHandlerPlugin()],
})
```

Adds `RateLimit-*` and `Retry-After` headers. Combine with [Retry After Plugin](/docs/plugins/retry-after) for automatic retries.
