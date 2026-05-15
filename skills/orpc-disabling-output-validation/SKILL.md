---
name: oRPC Disabling Output Validation
description: Disable output validation for improved performance while keeping OpenAPI spec generation.
metadata:
  author: Ali Torki
  homepage: https://github.com/ali-master
---

# Disabling Output Validation

By default, oRPC validates procedure outputs against their defined schemas. If you only define output schemas for [OpenAPI specification generation](/docs/openapi/openapi-specification), you can disable output validation to improve performance.

## Configuration

Set `initialOutputValidationIndex` to `NaN`:

```ts
import { os } from '@orpc/server'

const base = os
  .$config({
    initialOutputValidationIndex: Number.NaN,
  })
```

All procedures built from `base` will have output validation disabled.

## Limitation

This approach will not work if your schema transforms data into a different type during validation.

```ts
const procedure = base
  .output(z.object({ value: z.number().transform(val => String(val)) }))
  .handler(() => ({ value: 123 }))
  .callable()

const { value } = await procedure()
```

The client expects `value` as a `string`, but since validation is skipped, it receives a `number`.
