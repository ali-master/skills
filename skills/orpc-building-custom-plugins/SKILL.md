---
name: oRPC Building Custom Plugins
description: Create powerful custom plugins to extend oRPC handlers and links with interceptors.
metadata:
  author: Ali Torki
  homepage: https://github.com/ali-master
---

# Building Custom Plugins

This guide explains how to create custom oRPC plugins for handlers and links.

## What is a Plugin?

In oRPC, a plugin is a collection of `interceptors` that can work together or independently.

```ts
export class ResponseHeadersPlugin<T extends ResponseHeadersPluginContext> implements StandardHandlerPlugin<T> {
  init(options: StandardHandlerOptions<T>): void {
    options.rootInterceptors ??= []

    options.rootInterceptors.push(async (interceptorOptions) => {
      const resHeaders = interceptorOptions.context.resHeaders ?? new Headers()

      const result = await interceptorOptions.next({
        ...interceptorOptions,
        context: { ...interceptorOptions.context, resHeaders },
      })

      if (!result.matched) return result

      const responseHeaders = clone(result.response.headers)

      for (const [key, value] of resHeaders) {
        // merge headers
        responseHeaders[key] = value
      }

      return { ...result, response: { ...result.response, headers: responseHeaders } }
    })
  }
}
```

### Handler Plugins

Extend server-side handlers (RPCHandler, OpenAPIHandler). Work with interceptors from the [Handler Lifecycle](/docs/rpc-handler#lifecycle).

### Link Plugins

Enhance client-side communication (RPCLink, OpenAPILink). Use interceptors from the [Link Lifecycle](/docs/client/rpc-link#lifecycle).

## Communication Between Interceptors

Use a unique symbol to inject context shared between interceptors. The [Strict Get Method Plugin](/docs/plugins/strict-get-method) demonstrates this — it uses `rootInterceptors` to collect HTTP methods and combines them with procedure info in `clientInterceptors`.

## Plugin Order

```ts
export class ExamplePlugin<T extends Context> implements StandardHandlerPlugin<T> {
  order = 10

  init(options: StandardHandlerOptions<T>): void {
    options.rootInterceptors ??= []
    options.clientInterceptors ??= []

    options.rootInterceptors.push(async ({ next }) => next())
    options.clientInterceptors.push(async ({ next }) => next())
  }
}
```

`order` controls plugin loading order, not interceptor execution order. Higher order with `.unshift` to run earlier, or `.push` to run later.

> Avoid setting `order` unless necessary. Keep it below `1_000_000` to avoid conflicts with built-in plugins.
