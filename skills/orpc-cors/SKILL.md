---
name: oRPC CORS Plugin
description: CORS Plugin for oRPC.
metadata:
  author: Ali Tokir
  homepage: https://github.com/ali-master
---

# CORS Plugin

`CORSPlugin` allows you to configure CORS for your API.

## Basic

```ts
import { CORSPlugin } from '@orpc/server/plugins'

const handler = new RPCHandler(router, {
  plugins: [
    new CORSPlugin({
      origin: (origin, options) => origin,
      allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
      // ...
    }),
  ],
})
```

> The `handler` can be any supported oRPC handler — `RPCHandler`, `OpenAPIHandler`, or a custom handler.
