---
title: Connect with Go
---
import CodeBlock from '@theme/CodeBlock';
import MyComponentSource1 from '!!raw-loader!/code/products/redis/connect.go';

Learn how to establish a connection to an Aiven for Caching service using Go.
This example demonstrates how to establish a connection to an Aiven for Caching service
from Go using the `go-redis/redis` library, which is compatible with the Redis protocol.

## Variables

Replace the following placeholders in the code sample with actual values
from your service overview page:

| Variable    | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| `SERVICE_URI` | URI for the Aiven for Caching service connection |

## Prerequisites

Install the `go-redis/redis` library with the following command:

```shell
go get github.com/go-redis/redis/v8
```

## Code

Create a file named `main.go` and insert the code below, substituting the placeholder
with your Aiven for Caching URI:

<CodeBlock language='go'>{MyComponentSource1}</CodeBlock>

This code creates a key named `key` with the value `hello world` without an expiration.
It then retrieves this key from the caching service and outputs its value.

Execute the script with:

```shell
go run main.go
```

Successful execution results in the following output:

```plaintext
The value of key is: hello world
```
