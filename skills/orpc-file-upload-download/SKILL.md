---
name: oRPC File Upload/Download
description: Upload and download files using oRPC with standard File and Blob objects.
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/ali-master
  version: "1.0.0"
---

# File Operations in oRPC

oRPC natively supports standard [File](https://developer.mozilla.org/en-US/docs/Web/API/File) and [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) objects. Combine files with arrays and objects for upload/download.

> **File Uploads**: For files >100 MB, use a dedicated upload solution or [extend the body parser](/docs/advanced/extend-body-parser). oRPC does not support chunked/resumable uploads.
>
> **File Downloads**: Use lazy file libraries like [@mjackson/lazy-file](https://www.npmjs.com/package/@mjackson/lazy-file) or [Bun.file](https://bun.com/docs/api/file-io#reading-files-bun-file) to reduce memory usage.

## Example

```ts
import { os } from '@orpc/server'
import * as z from 'zod'

const example = os
  .input(z.file())
  .output(z.object({ anyFieldName: z.instanceof(File) }))
  .handler(async ({ input }) => {
    const file = input
    console.log(file.name)

    return {
      anyFieldName: new File(['Hello World'], 'hello.txt', { type: 'text/plain' }),
    }
  })
```
