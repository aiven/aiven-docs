---
title: Connect with Go
---

import CodeBlock from '@theme/CodeBlock';
import MyComponentSource1 from '!!raw-loader!/code/products/redis/connect.go';

This example connects to Redis® service from Go, making use of the
`go-redis/redis` library.

## Variables

These are the placeholders you will need to replace in the code sample:

| Variable    | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| `REDIS_URI` | URL for the Redis connection, from the service overview page |

## Prerequisites

Get the `go-redis/redis` library:

```
go get github.com/go-redis/redis/v8
```

## Code

Create a new file named `main.go`, add the following content and replace
the placeholder with the Redis URI:

<CodeBlock language='go'>{MyComponentSource1}</CodeBlock>

This code creates a key named `key` with the value `hello world` and no
expiration time. Then, it gets the key back from Redis and prints its
value.

Run the code:

```
go run main.go
```

If the script runs successfully, the outputs should be:

```
The value of key is: hello world
```
