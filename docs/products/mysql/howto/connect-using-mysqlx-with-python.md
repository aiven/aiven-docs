---
title: Connect to Aiven for MySQL® using MySQLx with Python
---

import CodeBlock from '@theme/CodeBlock';
import MyComponentSource1 from '!!raw-loader!/code/products/mysql/connect-using-mysqlx.py';

Enabling the MySQLx protocol support allows you to use your MySQL
instance as a document store. This example shows how to connect to your
Aiven for MySQL® instance using MySQLx protocol.

:::note
MySQL initially provided support for X-DevAPI (MySQLx) in v5.7.12 as an
optional extension that you can install. On the MySQL v8.0+, the
X-DevAPI is supported by default.
:::

## Variables

  |     Variable      |                                                                             Description                                                                             |
  |-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
  | `SERVICE_URI`     | Service URI from [Aiven Console](https://console.aiven.io/) > the **Overview** page of your service >  the **Connection information** section >  the **MySQLx** tab |
  | `MYSQLX_USER`     | User from [Aiven Console](https://console.aiven.io/) >  the **Overview** page of your service >  the **Connection information** section >  the **MySQLx** tab       |
  | `MYSQLX_PASSWORD` | Password from [Aiven Console](https://console.aiven.io/) >  the **Overview** page of your service >  the **Connection information** section >  the **MySQLx** tab   |

## Prerequisites

-   Python 3.7 or later
-   A `mysqlx` python library installed:

    ```
    pip install mysql-connector-python
    ```

-   An Aiven account with an Aiven for MySQL service running

-   Set environment variable
    `PROTOCOL_BUFFERS_PYTHON_IMPLEMENTATION=python` to avoid issues
    described on [Protocol buffers
    docs](https://developers.google.com/protocol-buffers/docs/news/2022-05-06).
    If you are running Python from the command line, you can set this in
    your terminal:

    ```shell
    export PROTOCOL_BUFFERS_PYTHON_IMPLEMENTATION=python
    ```

## Code

Add the following to `main.py` and replace the placeholders with values
for your project:

<CodeBlock language='python'>{MyComponentSource1}</CodeBlock>

This code creates a MySQL client and connects to the database via the
MySQLx protocol. It creates a schema, a collection, inserts some
entries, fetches them, and prints the output.

If the script runs successfully, the output will be the values that were
inserted into the document:

```
Found document: {"_id": "000062c55a6b0000000000000001", "type": "pizza", "price": "10e"}
Found document: {"_id": "000062c55a6b0000000000000002", "type": "burger", "price": "5e"}
```

Now that your application is connected, you are all set to use Python
with Aiven for MySQL using the MySQLx protocol.
