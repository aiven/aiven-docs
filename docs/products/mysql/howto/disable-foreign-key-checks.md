---
title: Disable foreign key checks
---

All Aiven for MySQL® services have foreign key checks enabled by default
helping in keeping referential integrity across tables. However, you
might want to disable it for a particular session. For example, when
migrating to an Aiven for MySQL you may face errors related to foreign
key violations similar to:

```
ERROR 3780 (HY000) at line 11596: Referencing column 'g_id' and referenced column 'g_id' in foreign key constraint 'FK_33b11dcfac6148578da087b07c2f388f' are incompatible.
```

The following explains how to temporarily disable Aiven for MySQL
foreign key checking for the duration of a session.

## Prerequisites

-   The `mysqlsh` client installed. You can install this by following
    the MySQL shell installation
    [documentation](https://dev.mysql.com/doc/mysql-shell/8.0/en/mysql-shell-install.html).
-   An Aiven account with an Aiven for MySQL service running.

## Variables

There are a few variables you need to substitute when running the
commands. To find the values for the substitution, go to [Aiven
Console](https://console.aiven.io/) \> your Aiven for MySQL service \>
**Overview** \> the **Connection information** section \> the **MySQL**
tab.

| Variable   | Description                                      |
| ---------- | ------------------------------------------------ |
| `HOST`     | Hostname for MySQL connection                    |
| `PORT`     | Port for MySQL connection                        |
| `PASSWORD` | Password of your Aiven for MySQL connection      |
| `DB_NAME`  | Database Name of your Aiven for MySQL connection |

## Check the foreign key check flag

To check the foreign key check flag you need to take the following
steps:

-   Connect to your Aiven for MySQL service with the following command:

    ``` shell
    mysql --user avnadmin --password=PASSWORD --host HOST --port PORT DB_NAME
    ```

-   Run the following command to check the default configuration for
    your foreign key checks.

    ``` shell
    SHOW VARIABLES LIKE 'foreign_key_checks';
    ```

-   Verify that the foreign keys are enabled by default. You can expect
    to receive the following output:

    ``` shell
    +--------------------+-------+
    | Variable_name      | Value |
    +--------------------+-------+
    | foreign_key_checks | ON    |
    +--------------------+-------+
    1 row in set (0.05 sec)
    ```

## Disable foreign key checks

To disable the foreign key checks for the session, you give an
additional parameter when you connect to your Aiven for MySQL using the
`mysqlsh`:

``` shell
mysql                   \
  --user avnadmin       \
  --password=PASSWORD   \
  --host HOST           \
  --port PORT DB_NAME   \
  --init-command="SET @@SESSION.foreign_key_checks = 0;"
```

Once again, we can check the current status of the foreign key checks by
running the following:

``` shell
SHOW VARIABLES LIKE 'foreign_key_checks';
```

As result, we can see that the foreign key checks are disabled for this
session:

``` shell
+--------------------+-------+
| Variable_name      | Value |
+--------------------+-------+
| foreign_key_checks | OFF   |
+--------------------+-------+
1 row in set (0.04 sec)
```

The same flag works when running a set of commands saved in a file with
extension `.sql`.

| Variable   | Description                                               |
| ---------- | --------------------------------------------------------- |
| `FILENAME` | File which the extension is `.sql`, for for example, filename.sql |

You can paste the following command on your `FILENAME`:

``` shell
SHOW VARIABLES LIKE 'foreign_key_checks';
```

Now you can set the `init-command` flag to disable the foreign key
checks, and run the commands in this file.

``` shell
mysql                   \
  --user avnadmin       \
  --password=PASSWORD   \
  --host HOST           \
  --port PORT DB_NAME   \
  --init-command="SET @@SESSION.foreign_key_checks = 0;" < FILENAME
```

## More resources

Read the official documentation to understand possible implications that
can happen when disabling foreign key checks in your service.

-   [Foreign Key
    Checks](https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html#foreign-key-checks).
-   [Server System
    Variables](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_foreign_key_checks).
