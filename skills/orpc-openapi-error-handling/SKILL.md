---
name: oRPC OpenAPI Error Handling
description: Handle errors in your OpenAPI-compliant oRPC APIs.
license: MIT
metadata:
  author: Ali Torki
  homepage: https://github.com/ali-master
  version: "1.0.0"
---

# OpenAPI Error Handling

Aligns error responses with OpenAPI standards.

## Default Error Mappings

| Error Code             | HTTP Status | Message                |
| ---------------------- | ----------: | ---------------------- |
| BAD_REQUEST            |         400 | Bad Request            |
| UNAUTHORIZED           |         401 | Unauthorized           |
| FORBIDDEN              |         403 | Forbidden              |
| NOT_FOUND              |         404 | Not Found              |
| METHOD_NOT_SUPPORTED   |         405 | Method Not Supported   |
| NOT_ACCEPTABLE         |         406 | Not Acceptable         |
| TIMEOUT                |         408 | Request Timeout        |
| CONFLICT               |         409 | Conflict               |
| PRECONDITION_FAILED    |         412 | Precondition Failed    |
| PAYLOAD_TOO_LARGE      |         413 | Payload Too Large      |
| UNSUPPORTED_MEDIA_TYPE |         415 | Unsupported Media Type |
| UNPROCESSABLE_CONTENT  |         422 | Unprocessable Content  |
| TOO_MANY_REQUESTS      |         429 | Too Many Requests      |
| CLIENT_CLOSED_REQUEST  |         499 | Client Closed Request  |
| INTERNAL_SERVER_ERROR  |         500 | Internal Server Error  |
| NOT_IMPLEMENTED        |         501 | Not Implemented        |
| BAD_GATEWAY            |         502 | Bad Gateway            |
| SERVICE_UNAVAILABLE    |         503 | Service Unavailable    |
| GATEWAY_TIMEOUT        |         504 | Gateway Timeout        |

Other errors default to HTTP `500` with the error code as message.

## Customizing Errors

```ts
const example = os
  .errors({
    RANDOM_ERROR: {
      status: 503,
      message: 'Default error message',
    },
  })
  .handler(() => {
    throw new ORPCError('ANOTHER_RANDOM_ERROR', {
      status: 502,
      message: 'Custom error message',
    })
  })
```
