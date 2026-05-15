---
name: oRPC Signing Helpers
description: Cryptographically sign and verify data using HMAC-SHA256.
metadata:
  author: Ali Tokir
  homepage: https://github.com/ali-master
---

# Signing Helpers

Cryptographically sign and verify data using HMAC-SHA256.

> Signing is faster than [encryption](/docs/helpers/encryption) but users can view the original data.

```ts
import { getSignedValue, sign, unsign } from '@orpc/server/helpers'

const secret = 'your-secret-key'
const userData = 'user123'

const signedValue = await sign(userData, secret)
// 'user123.oneQsU0r5dvwQFHFEjjV1uOI_IR3gZfkYHij3TRauVA'
// ↑ Original data is visible to users

const verifiedValue = await unsign(signedValue, secret) // 'user123'

// Extract value without verification
const extractedValue = getSignedValue(signedValue) // 'user123'
```

> `unsign` and `getSignedValue` accept `undefined`/`null` and return `undefined` for invalid inputs.
