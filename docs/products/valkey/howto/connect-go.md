---
title: Connect with Go
---
import CodeBlock from '@theme/CodeBlock';
import MyComponentSource1 from '!!raw-loader!/code/products/valkey/connect.go';

Establish a connection to the Aiven for Valkey™ service using Go. This example demonstrates how to connect to Aiven for Valkey from Go using the `go-valkey/valkey` library, designed to interact with the Valkey protocol.

## Variables

Replace placeholders in the code sample with values from your service overview page:

| Variable    | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| `SERVICE_URI` | URI for the Aiven for Valkey service connection |

## Prerequisites

Install the `valkey-go` library using the following command:

```shell
go get github.com/valkey-io/valkey-go
```

## Set up and run

1. Create a file named `main.go` and insert the code below, substituting the placeholder
   with your Aiven for Valkey URI:

   <CodeBlock language='go'>{MyComponentSource1}</CodeBlock>

   This code creates a key named `key` with the value `hello world` without an expiration.
   It then retrieves this key from the Valkey service and outputs its value.

1. Run the script using the following command:

   ```shell
   go run main.go
   ```

   A successful connection displays:

   ```plaintext
   The value of key is: hello world
   ```

## Related pages

- For additional information, see [valkey-go github repository](https://github.com/valkey-io/valkey-go).
