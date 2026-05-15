---
name: oRPC Input/Output Structure
description: Control how input and output data is structured in oRPC.
metadata:
  author: Ali Tokir
  homepage: https://github.com/ali-master
---

# Input/Output Structure

Control the organization of request inputs and response outputs using `inputStructure` and `outputStructure` options.

## Input Structure

### Compact Mode (default)

Combines path parameters with query/body data into a single object.

```ts
const compactMode = os.route({
  path: '/ping/{name}',
  method: 'POST',
})
  .input(z.object({
    name: z.string(),
    description: z.string().optional(),
  }))
```

### Detailed Mode

Provide an object with fields per request part:

* `params`: Path parameters
* `query`: Query string data
* `headers`: Headers
* `body`: Body data

```ts
const detailedMode = os.route({
  path: '/ping/{name}',
  method: 'POST',
  inputStructure: 'detailed',
})
  .input(z.object({
    params: z.object({ name: z.string() }),
    query: z.object({ search: z.string() }),
    body: z.object({ description: z.string() }).optional(),
    headers: z.object({ 'x-custom-header': z.string() }),
  }))
```

## Output Structure

### Compact Mode (default)

```ts
const compactMode = os.handler(async ({ input }) => {
  return { message: 'Hello, world!' }
})
```

### Detailed Mode

Returns an object with:

* `status`: Response status (200-399), defaults to `successStatus`
* `headers`: Custom headers
* `body`: Response body

```ts
const detailedMode = os
  .route({ outputStructure: 'detailed' })
  .handler(async ({ input }) => {
    return {
      headers: { 'x-custom-header': 'value' },
      body: { message: 'Hello, world!' },
    }
  })

const multipleStatus = os
  .route({ outputStructure: 'detailed' })
  .output(z.union([
    z.object({ status: z.literal(201), body: z.string() }),
    z.object({ status: z.literal(200), body: z.string() }),
  ]))
  .handler(async ({ input }) => {
    if (something) return { status: 201, body: 'created' }
    return { status: 200, body: 'updated' }
  })
```

## Initial Configuration

```ts
const base = os.$route({ inputStructure: 'detailed' })
```
