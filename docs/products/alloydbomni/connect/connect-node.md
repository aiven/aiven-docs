---
title: Connect with NodeJS
early: true
---

import CodeBlock from '@theme/CodeBlock';
import MyComponentSource1 from '!!raw-loader!/code/products/postgresql/connect.js';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";

Connect to an Aiven for AlloyDB Omni database from NodeJS, using the `pg` package.

## Prerequisites

- Aiven for AlloyDB Omni service running

- npm `pg` package, which you can get by running:

  ```bash
  npm install pg --save
  ```

- [CA certificate (a file named `ca.pem`) downloaded](/docs/platform/concepts/tls-ssl-certificates#download-ca-certificates)
  from the service's <ConsoleLabel name="overview"/> page

## Connect to a service

1. Create a file named `index.js` with the following content:

   <CodeBlock language='javascript'>{MyComponentSource1}</CodeBlock>

   Replace the connection parameters with the values available on the
   <ConsoleLabel name="overview"/> page in the Aiven Console:

   | Variable   | Description                                                 |
   | ---------- | ----------------------------------------------------------- |
   | `USER`     | Aiven for AlloyDB Omni service username                     |
   | `PASSWORD` | Aiven for AlloyDB Omni service password                     |
   | `HOST`     | Hostname for Aiven for AlloyDB Omni service connection      |
   | `PORT`     | Port for Aiven for AlloyDB Omni service connection          |
   | `DATABASE` | Database name for Aiven for AlloyDB Omni service connection |

   This code opens a connection to the database, runs a query checking the database version,
   and prints the response.

1. Run the code:

   ```bash
   node index.js
   ```

Expect output like:

```text
PostgreSQL 15.5 on x86_64-pc-linux-gnu, compiled by [...]
```
