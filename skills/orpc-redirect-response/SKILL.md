---
name: oRPC Redirect Response
description: Standard HTTP redirect response in oRPC OpenAPI.
metadata:
  author: Ali Tokir
  homepage: https://github.com/ali-master
---

# Redirect Response

Return a standard HTTP redirect response in oRPC OpenAPI.

## Basic Usage

Combine `successStatus` and `outputStructure`:

```ts
const redirect = os
  .route({
    method: 'GET',
    path: '/redirect',
    successStatus: 307,
    outputStructure: 'detailed'
  })
  .handler(async () => {
    return {
      headers: {
        location: 'https://orpc.dev',
      },
    }
  })
```

## Limitations

When using [OpenAPILink](/docs/openapi/client/openapi-link), oRPC treats the redirect as a normal response. Some environments like browsers may restrict access to the redirect response, **potentially causing errors**. Server environments like Node.js handle this without issue.
