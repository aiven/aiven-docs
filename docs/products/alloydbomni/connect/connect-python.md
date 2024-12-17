---
title: Connect with Python
early: true
---

import CodeBlock from '@theme/CodeBlock';
import MyComponentSource1 from '!!raw-loader!/code/products/postgresql/connect.py';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";

Connect to an Aiven for AlloyDB Omni database using Python 3 and the [psycopg2](https://pypi.org/project/psycopg2/) library.

## Prerequisites

-   Aiven for AlloyDB Omni service running
-   Python 3.6 or later
-   Python `psycopg2` library, which you can install with the following commands:

    ```bash
    pip install psycopg2
    ```

    or

    ```bash
    python3 -m pip install psycopg2
    ```

## Connect to a service

1. Create a file named `main.py` with the following content:

   <CodeBlock language='python'>{MyComponentSource1}</CodeBlock>

   Replace `SERVICE_URI` with the service URI available on the
   <ConsoleLabel name="overview"/> page in the Aiven Console.

   This code opens a connection to the database, runs a query checking the database version,
   and prints the response.

   :::note
   By default, the connection string (`SERVICE_URI`) specifies `sslmode=require`, which
   doesn't verify the CA certificate. For production environments, it's recommended to
   change it to `sslmode=verify-ca` and include the certificate.
   :::

1. Run the code:

   ```bash
   python3 main.py
   ```

Expect output like:

```text
PostgreSQL 15.5 on x86_64-pc-linux-gnu, compiled by [...]
```
