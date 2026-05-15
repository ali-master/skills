---
name: oRPC Customizing Error Response
description: Customize the error response format in oRPC OpenAPI.
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/ali-master
  version: "1.0.0"
---

# Customizing Error Response Format

By default, [OpenAPIHandler](/docs/openapi/openapi-handler), [OpenAPIGenerator](/docs/openapi/openapi-specification), and [OpenAPILink](/docs/openapi/client/openapi-link) share the same error response format. You can customize one, some, or all of them.

## `OpenAPIHandler`

Use `customErrorResponseBodyEncoder`:

```ts
const handler = new OpenAPIHandler(router, {
  customErrorResponseBodyEncoder(error) {
    return error.toJSON()
  },
})
```

> Return `null` or `undefined` to fallback to the default behavior.

## `OpenAPIGenerator`

Customize the error response format with `customErrorResponseBodySchema`:

```ts
const generator = new OpenAPIGenerator()

const spec = await generator.generate(router, {
  customErrorResponseBodySchema: (definedErrorDefinitions, status) => {
    const result: Record<any, any> = {
      oneOf: [
        {
          type: 'object',
          properties: {
            defined: { const: false },
            code: { type: 'string' },
            status: { type: 'number' },
            message: { type: 'string' },
            data: {},
          },
          required: ['defined', 'code', 'status', 'message'],
        },
      ],
    }

    for (const [code, defaultMessage, dataRequired, dataSchema] of definedErrorDefinitions) {
      result.oneOf.push({
        type: 'object',
        properties: {
          defined: { const: true },
          code: { const: code },
          status: { const: status },
          message: { type: 'string', default: defaultMessage },
          data: dataSchema,
        },
        required: dataRequired
          ? ['defined', 'code', 'status', 'message', 'data']
          : ['defined', 'code', 'status', 'message'],
      })
    }

    return result
  }
})
```

## `OpenAPILink`

When your backend uses a custom error format, parse it to an `ORPCError`:

```ts
const link = OpenAPILink(contract, {
  customErrorResponseBodyDecoder: (body, response) => {
    if (isORPCErrorJson(body)) {
      return createORPCErrorFromJson(body)
    }
    return null // default behavior
  }
})
```
