---
name: oRPC Simple CSRF Protection Plugin
description: Add basic CSRF protection to your oRPC application.
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/ali-master
  version: "1.0.0"
---

# Simple CSRF Protection Plugin

Helps ensure requests originate from JavaScript code, not from HTML forms or direct browser navigation.

## When to Use

Beneficial if you store sensitive data (session/auth tokens) in cookies with `SameSite=Lax` (default) or `SameSite=None`.

## Server

```ts
import { SimpleCsrfProtectionHandlerPlugin } from '@orpc/server/plugins'

const handler = new RPCHandler(router, {
  strictGetMethodPluginEnabled: false, // Replace Strict Get Method Plugin
  plugins: [
    new SimpleCsrfProtectionHandlerPlugin()
  ],
})
```

## Client

```ts
import { SimpleCsrfProtectionLinkPlugin } from '@orpc/client/plugins'

const link = new RPCLink({
  url: 'https://api.example.com/rpc',
  plugins: [
    new SimpleCsrfProtectionLinkPlugin(),
  ],
})
```
