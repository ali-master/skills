---
name: oRPC OpenAPI JSON Serializer
description: Extend or override the standard OpenAPI JSON serializer.
metadata:
  author: Ali Torki
  homepage: https://github.com/ali-master
---

# OpenAPI JSON Serializer

Processes JSON payloads for [OpenAPIHandler](/docs/openapi/openapi-handler) and supports [native data types](/docs/openapi/openapi-handler#supported-data-types).

## Extending Native Data Types

1. **Define Your Custom Serializer:**

```ts
import type { StandardOpenAPICustomJsonSerializer } from '@orpc/openapi-client/standard'

export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly age: number,
  ) {}

  toJSON() {
    return { id: this.id, name: this.name, email: this.email, age: this.age }
  }
}

export const userSerializer: StandardOpenAPICustomJsonSerializer = {
  condition: data => data instanceof User,
  serialize: data => data.toJSON(),
}
```

2. **Use Your Custom Serializer:**

```ts
import { OpenAPIHandler } from '@orpc/openapi/fetch'
import { OpenAPIGenerator } from '@orpc/openapi'

const handler = new OpenAPIHandler(router, {
  customJsonSerializers: [userSerializer],
})

const generator = new OpenAPIGenerator({
  customJsonSerializers: [userSerializer],
})
```

> Add custom serializers to `OpenAPIGenerator` for consistent serialization in the OpenAPI document.
