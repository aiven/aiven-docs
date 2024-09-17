---
title: Use the PostgreSQL® pg_repack extension
sidebar_label: Use the pg_repack extension
---

[`pg_repack`](https://reorg.github.io/pg_repack/) is a PostgreSQL® extension that allows you to efficiently reorganize tables to remove any excess bloat the tables have accumulated.
Reorganizing a table may take some time, but `pg_repack` tries to minimize the locks required to continue online operations.

:::note
Before you install the `pg_repack` extension, verify the version of the
extension is supported on the PostgreSQL version you are using. See the [supported versions](https://reorg.github.io/pg_repack/).
:::

## Variables

The following variables need to be substituted when running the
commands.

|    Variable    |                      Description                      |
|----------------|-------------------------------------------------------|
| `HOSTNAME`     | Hostname for PostgreSQL connection                    |
| `PORT`         | Port for PostgreSQL connection                        |
| `DATABASENAME` | Database Name of your Aiven for PostgreSQL connection |
| `TABLENAME`    | Name of the table to reorganize                       |

## Use `pg_repack` extension

To use the `pg_repack` extension:

1.  Connect to the database as `avnadmin` user, and run the following
    command to create the extension:

    ```sql
    CREATE EXTENSION pg_repack;
    ```

1.  Run the `pg_repack` command on the table to reorganize it.

    ```bas
    pg_repack -k -U avnadmin -h <HOSTNAME> -p <PORT> -d <DATABASENAME> -t <TABLENAME>
    ```

:::note
- Using `-k` skips the superuser checks in the client. This setting is
  useful when using `pg_repack` on platforms that support running it as non-superusers.
- The target table must have a PRIMARY KEY, or at least a UNIQUE total index on a NOT NULL column.
:::

## Related pages

- [`pg_repack` documentation](https://reorg.github.io/pg_repack/)
- [Install or update extension](/docs/products/postgresql/howto/manage-extensions)
