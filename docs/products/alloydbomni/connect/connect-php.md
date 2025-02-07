---
title: Connect with PHP
early: true
---

import CodeBlock from '@theme/CodeBlock';
import MyComponentSource1 from '!!raw-loader!/code/products/postgresql/connect.php';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";

Connect to an Aiven for AlloyDB Omni database from PHP, using the built-in PDO module.

## Prerequisites

- Aiven for AlloyDB Omni service running
- [CA certificate (a file named `ca.pem`) downloaded](/docs/platform/concepts/tls-ssl-certificates#download-ca-certificates)
  from the service's <ConsoleLabel name="overview"/> page
- [PostgreSQL functions](https://www.php.net/manual/en/ref.pdo-pgsql.php) included in your
  PHP installation (most installations include them)

## Connect to a service

1. Create a file named `index.php` with the following content:

   <CodeBlock language='php'>{MyComponentSource1}</CodeBlock>

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
   php index.php
   ```

Expect output like:

```text
PostgreSQL 15.5 on x86_64-pc-linux-gnu, compiled by [...]
```
