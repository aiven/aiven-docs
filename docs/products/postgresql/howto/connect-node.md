---
title: Connect with NodeJS
---

import CodeBlock from '@theme/CodeBlock';
import MyComponentSource1 from '!!raw-loader!/code/products/postgresql/connect.js';

This example connects to PostgreSQL® service from NodeJS, making use of the `pg` package.

## Variables

These are the placeholders you will need to replace in the code sample:

| Variable   | Description                                                             |
| ---------- | ----------------------------------------------------------------------- |
| `USER`     | PostgreSQL username, from the service overview page                     |
| `PASSWORD` | PostgreSQL password, from the service overview page                     |
| `HOST`     | Hostname for PostgreSQL connection, from the service overview page      |
| `PORT`     | Port for PostgreSQL connection, from the service overview page          |
| `DATABASE` | Database Name for PostgreSQL connection, from the service overview page |

## Prerequisites

For this example you will need:

-   The npm `pg` package:

    ```bash
    npm install pg --save
    ```

-   [Download CA certificates](/docs/platform/concepts/tls-ssl-certificates#download-ca-certificates) from the service overview page, this example assumes it
    is in a local file called `ca.pem`.

## Code

Add the following to `index.js` and replace the connection parameters
with the ones from the service overview page:

<CodeBlock language='javascript'>{MyComponentSource1}</CodeBlock>

This code creates a PostgreSQL client and opens a connection to the
database. Then runs a query checking the database version and prints the
response.

To run the code:

```bash
node index.js
```

If the script runs successfully, the outputs should be the PostgreSQL
version running in your service like:

```text
PostgreSQL 13.3 on x86_64-pc-linux-gnu, compiled by gcc, a 68c5366192 p 6520304dc1, 64-bit
```
