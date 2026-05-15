---
name: oRPC TanStack Query Basic
description: Basic guide to integrating oRPC with TanStack Query (legacy).
metadata:
  author: Ali Tokir
  homepage: https://github.com/ali-master
---

# TanStack Query Integration (Basic)

Lightweight integration with [TanStack Query](https://tanstack.com/query/latest).

| Library | Tanstack Query | oRPC Integration          |
| ------- | -------------- | ------------------------- |
| React   | ✅             | ✅                        |
| Vue     | ✅             | ✅                        |
| Angular | ✅             | ✅ (New only)             |
| Solid   | ✅             | ✅                        |
| Svelte  | ✅             | ✅                        |

## Query Options

```ts
const query = useQuery(orpc.planet.find.queryOptions({
  input: { id: 123 },
  context: { cache: true },
}))
```

## Infinite Query Options

```ts
const query = useInfiniteQuery(orpc.planet.list.infiniteOptions({
  input: (pageParam: number | undefined) => ({ limit: 10, offset: pageParam }),
  context: { cache: true },
  initialPageParam: undefined,
  getNextPageParam: lastPage => lastPage.nextPageParam,
}))
```

## Mutation Options

```ts
const mutation = useMutation(orpc.planet.create.mutationOptions({
  context: { cache: true },
}))

mutation.mutate({ name: 'Earth' })
```

## Query/Mutation Key

```ts
const queryClient = useQueryClient()

queryClient.invalidateQueries({ queryKey: orpc.planet.key() })
queryClient.invalidateQueries({ queryKey: orpc.planet.key({ type: 'query' }) })
queryClient.invalidateQueries({ queryKey: orpc.planet.find.key({ input: { id: 123 } }) })
```

## Calling Procedure Clients

```ts
const result = orpc.planet.find.call({ id: 123 })
```

## Error Handling

```ts
import { isDefinedError } from '@orpc/client'

const mutation = useMutation(orpc.planet.create.mutationOptions({
  onError: (error) => {
    if (isDefinedError(error)) {
      // Handle the error
    }
  }
}))
```

## `skipToken` for Disabling Queries

```ts
const query = useQuery(
  orpc.planet.list.queryOptions({
    input: search ? { search } : skipToken,
  })
)
```
