---
title: Connect with Go
early: true
---

import CodeBlock from '@theme/CodeBlock';
import MyComponentSource1 from '!!raw-loader!/code/products/postgresql/connect.go';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";

Connect to an Aiven for AlloyDB Omni database from Go, making use of the `pg` library.

## Prerequisites

- Aiven for AlloyDB Omni service running

- Go `pq` library, which you can get by running:

  ```bash
  go get github.com/lib/pq
  ```

- [CA certificate (a file named `ca.pem`) downloaded](/docs/platform/concepts/tls-ssl-certificates#download-ca-certificates)
  from the service's <ConsoleLabel name="overview"/> page

## Connect to a service

1. Create a file named `main.go` with the following content:

   <CodeBlock language='go'>{MyComponentSource1}</CodeBlock>

   Replace `SERVICE_URI` with the service URI available on the
   <ConsoleLabel name="overview"/> page in the Aiven Console.

   This code opens a connection to the database, runs a query checking the database version,
   and prints the response.

   :::note
   To verify the SSL certificate, this code specifies `sslmode` as `verify-ca` and adds
   the location of the certificate.
   :::

1. Run the code:

   ```bash
   go run main.go
   ```

Expect output like:

```text
PostgreSQL 15.5 on x86_64-pc-linux-gnu, compiled by [...]
```
