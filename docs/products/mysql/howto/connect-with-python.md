---
title: Connect to Aiven for MySQL® with Python
---

import CodeBlock from '@theme/CodeBlock';
import MyComponentSource1 from '!!raw-loader!/code/products/mysql/connect.py';

This example connects your Python application to an Aiven for MySQL®
service, using the [PyMySQL](https://github.com/PyMySQL/PyMySQL)
library.

## Variables

These are the placeholders to replace in the code sample:

|     Variable     |                                                      Description                                                      |
|------------------|-----------------------------------------------------------------------------------------------------------------------|
| `MYSQL_HOST`     | Host name for the connection, from [Aiven Console](https://console.aiven.io/) > the **Overview** page of your service |
| `MYSQL_PORT`     | Port number to use, from [Aiven Console](https://console.aiven.io/) > the **Overview** page of your service           |
| `MYSQL_USERNAME` | User to connect with                                                                                                  |
| `MYSQL_PASSWORD` | Password for this user                                                                                                |

## Prerequisites

For this example you will need:

-   Python 3.7 or later

-   The Python `PyMySQL` library. You can install this with `pip`:

    ```
    pip install pymysql
    ```

-   Install the `cryptography` package:

    ```
    pip install cryptography
    ```

## Code

Add the following to `main.py` and replace the placeholders with values
for your project:

<CodeBlock language='python'>{MyComponentSource1}</CodeBlock>

This code creates a MySQL client and connects to the database. It
creates a table, inserts some values, fetches them and prints the
output.

To run the code:

```
python main.py
```

If the script runs successfully, the output will be the values that were
inserted into the table:

```
[{'id': 1}, {'id': 2}]
```

Now that your application is connected, you are all set to use Python
with Aiven for MySQL.

:::warning
Make sure to create a table with a unique name. If you try to create a
table that already exists, an exception will be raised.
:::
