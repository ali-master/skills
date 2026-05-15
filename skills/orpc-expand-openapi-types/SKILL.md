---
name: oRPC Expanding OpenAPI Link Types
description: Extend OpenAPILink to support additional data types beyond JSON's native capabilities.
metadata:
  author: Ali Tokir
  homepage: https://github.com/ali-master
---

# Expanding Type Support for OpenAPI Link

Extend [OpenAPILink](/docs/openapi/client/openapi-link) to support additional data types using the [Response Validation Plugin](/docs/plugins/response-validation).

## How It Works

Extend your [output](/docs/procedure#input-output-validation) and [error](/docs/error-handling#type%E2%80%90safe-error-handling) schemas with coercion logic.

> Outputs containing `Blob` or `File` outside the root level also face [Bracket Notation](/docs/openapi/bracket-notation#limitations) limitations.

```ts
const contract = oc.output(z.object({
  date: z.coerce.date<Date>(),
  bigint: z.coerce.bigint<bigint>(),
}))

const procedure = implement(contract).handler(() => ({
  date: new Date(),
  bigint: 123n,
}))
```

The client receives:

```ts
const beforeValidation = {
  date: '2025-09-01T07:24:39.000Z',
  bigint: '123'
}
```

After validation (via Response Validation Plugin):

```ts
const afterValidation = {
  date: new Date('2025-09-01T07:24:39.000Z'),
  bigint: 123n
}
```

> To support more types than [OpenAPI Handler](/docs/openapi/openapi-handler#supported-data-types), first extend the [OpenAPI JSON Serializer](/docs/openapi/advanced/openapi-json-serializer).

## Setup

Set up the [Response Validation Plugin](/docs/plugins/response-validation) and remove the `JsonifiedClient` wrapper:

```diff
 import type { ContractRouterClient } from '@orpc/contract'
 import { createORPCClient } from '@orpc/client'
 import { OpenAPILink } from '@orpc/openapi-client/fetch'
 import { ResponseValidationPlugin } from '@orpc/contract/plugins'

 const link = new OpenAPILink(contract, {
   url: 'http://localhost:3000/api',
   plugins: [
+    new ResponseValidationPlugin(contract),
   ]
 })

-const client: JsonifiedClient<ContractRouterClient<typeof contract>> = createORPCClient(link)
+const client: ContractRouterClient<typeof contract> = createORPCClient(link)
```
