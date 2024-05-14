---
title: Connect to Aiven for MySQL® with PHP
---

import CodeBlock from '@theme/CodeBlock';
import MyComponentSource1 from '!!raw-loader!/code/products/mysql/connect.php';

This example connects to an Aiven for MySQL® service from PHP, making
use of the built-in PDO module.

## Variables

These are the placeholders you need to replace in the code sample:

|  Variable   |                                                        Description                                                        |
|-------------|---------------------------------------------------------------------------------------------------------------------------|
| `MYSQL_URI` | Service URI for MySQL connection, from [Aiven Console](https://console.aiven.io/) > the **Overview** page of your service |

## Prerequisites

-   [Download CA certificates](/docs/platform/concepts/tls-ssl-certificates#download-ca-certificates) from [Aiven Console](https://console.aiven.io/) > the
    **Overview** page of your service. This example assumes it is in a
    local file called `ca.pem`.

-   Make sure you have read/write permissions to the
    `ca.pem` file and you add an absolute path to this file
    into [the code](/docs/products/mysql/howto/connect-with-php#connect-mysql-php-code):

    ```bash
    $conn .= ";sslmode=verify-ca;sslrootcert='D:/absolute/path/to/ssl/certs/ca.pem'"
    ```

:::note
Your PHP installation needs to include the [MySQL
functions](https://www.php.net/manual/en/ref.pdo-pgsql.php) (most
installations have this already).
:::

## Code {#connect-mysql-php-code}

Add the following to `index.php` and replace the placeholder with the
MySQL URI:

<CodeBlock language='php'>{MyComponentSource1}</CodeBlock>

This code creates a MySQL client and opens a connection to the database.
It then runs a query checking the database version and prints the
response.

:::note
This example replaces the query string parameter to specify
`sslmode=verify-ca` to make sure that the SSL certificate is verified,
and adds the location of the cert.
:::

Run the following code:

```
php index.php
```

If the script runs successfully, the output is the MySQL version running
in your service like:

```
8.0.28
```
