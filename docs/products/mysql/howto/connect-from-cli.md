---
title: Connect to Aiven for MySQL® from the command line
sidebar_label: Connect with the CLI
---

Connect to your Aiven for MySQL® service via the command line with the following tools:

-   [mysqlsh shell](/docs/products/mysql/howto/connect-from-cli#connect-mysqlsh)
-   [mysql client](/docs/products/mysql/howto/connect-from-cli#connect-mysql)

## Using `mysqlsh` {#connect-mysqlsh}

### Variables

These are the placeholders to replace in the code sample:

| Variable      | Description                                                                                                           |
| ------------- | --------------------------------------------------------------------------------------------------------------------- |
| `SERVICE_URI` | URL for the MySQL connection, from [Aiven Console](https://console.aiven.io/) > the **Overview** page of your service |

### Prerequisites

For this example you need the `mysqlsh` client installed. You can
install this by following the [MySQL shell installation
documentation](https://dev.mysql.com/doc/mysql-shell/8.0/en/mysql-shell-install.html).

### Code

From a terminal window to connect to the MySQL database, run:

```bash
mysqlsh --sql SERVICE_URI
```

Test your setup with a query:

```text
MySQL ssl defaultdb SQL> select 1 + 2 as three;

+-------+
| three |
+-------+
|     3 |
+-------+
1 row in set (0.0539 sec)
```

## Using `mysql`

### Variables

These are the placeholders to replace in the code sample:

| Variable        | Description                                      |
| --------------- | ------------------------------------------------ |
| `USER_HOST`     | Hostname for MySQL connection                    |
| `USER_PORT`     | Port for MySQL connection                        |
| `USER_PASSWORD` | Password of your Aiven for MySQL connection      |
| `DB_NAME`       | Database Name of your Aiven for MySQL connection |

### Prerequisites {#connect-mysql}

For this example you need the `mysql` client installed. You can install
it by following the [MySQL client installation
documentation](https://dev.mysql.com/doc/refman/8.0/en/mysql.html).

### Code

This step requires to manually specify individual parameters. You can
find those parameters in [Aiven Console](https://console.aiven.io) >
the **Overview** page of your service.

Once you have these parameters, execute the following from a terminal
window to connect to the MySQL database:

```bash
mysql --user avnadmin --password=USER_PASSWORD --host USER_HOST --port USER_PORT DB_NAME
```

:::warning
If you are providing the password via the command line, you must pass it
as shown; putting a space between the parameter name and value will
cause the password to be parsed incorrectly.
:::
