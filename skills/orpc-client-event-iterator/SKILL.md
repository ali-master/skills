---
name: oRPC Client Event Iterator
description: Use event iterators in oRPC clients.
metadata:
  author: Ali Tokir
  homepage: https://github.com/ali-master
---

# Event Iterator in oRPC Clients

An [Event Iterator](/docs/event-iterator) in oRPC behaves like an [AsyncGenerator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator).

## Basic Usage

```ts
const iterator = await client.streaming()

for await (const event of iterator) {
  console.log(event.message)
}
```

## Stopping the Stream Manually

```ts
const controller = new AbortController()
const iterator = await client.streaming(undefined, { signal: controller.signal })

setTimeout(async () => {
  controller.abort()
  // or
  await iterator.return()
}, 1000)

for await (const event of iterator) {
  console.log(event.message)
}
```

## Error Handling

> Unlike traditional SSE, the Event Iterator does not auto-retry. Use the [Client Retry Plugin](/docs/plugins/client-retry).

```ts
const iterator = await client.streaming()

try {
  for await (const event of iterator) {
    console.log(event.message)
  }
} catch (error) {
  if (error instanceof ORPCError) {
    // Handle the error
  }
}
```

## Using `consumeEventIterator`

```ts
import { consumeEventIterator } from '@orpc/client'

const cancel = consumeEventIterator(client.streaming(), {
  onEvent: (event) => console.log(event.message),
  onError: (error) => console.error(error),
  onSuccess: (value) => console.log(value),
  onFinish: (state) => console.log(state),
})

setTimeout(async () => {
  await cancel()
}, 1000)
```

> This utility accepts both promises and event iterators. Passing a promise lets it infer the correct error type.
