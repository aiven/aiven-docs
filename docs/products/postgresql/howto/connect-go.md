---
title: Connect with Go
---

import CodeBlock from '@theme/CodeBlock';
import MyComponentSource1 from '!!raw-loader!/code/products/postgresql/connect.go';

This example connects to PostgreSQL® service from Go, making use of the
`pg` library.

## Variables

These are the placeholders you will need to replace in the code sample:

 | Variable         | Description                                                   |
 | ---------------- | ------------------------------------------------------------- |
 | `POSTGRESQL_URI` | URL for PostgreSQL connection, from the service overview page |

## Prerequisites

For this example you will need:

-   The Go `pq` library:

    ```
    go get github.com/lib/pq
    ```

-   [Download CA certificates](/docs/platform/concepts/tls-ssl-certificates#download-ca-certificates) from the service overview page, this example assumes it
    is in a local file called `ca.pem`.

## Code

Add the following to `main.go` and replace the placeholder with the
PostgreSQL URI:

<CodeBlock language='go'>{MyComponentSource1}</CodeBlock>

This code creates a PostgreSQL client and opens a connection to the
database. Then runs a query checking the database version and prints the
response

:::note
This example replaces the query string parameter to specify
`sslmode=verify-ca` to make sure that the SSL certificate is verified,
and adds the location of the cert.
:::

To run the code:

```
go run main.go
```

If the script runs successfully, the outputs should be the PostgreSQL
version running in your service like:

```
Version: PostgreSQL 13.3 on x86_64-pc-linux-gnu, compiled by gcc, a 68c5366192 p 6520304dc1, 64-bit
```
