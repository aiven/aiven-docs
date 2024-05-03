---
title: Manage ClickHouse® databases and tables
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"

Create and work with databases and tables in Aiven for ClickHouse®.

## Create a database {#create-a-clickhouse-database}

Creating databases in an Aiven for ClickHouse service can only be done
via the Aiven platform; the `admin` user is not allowed to create
databases directly for security and reliability reasons. However, you
can create a database through the web interface of [Aiven
console](https://console.aiven.io/):

1.  Log in to the [Aiven Console](https://console.aiven.io/), and select
    your service from the **Services** page.

2.  In your service's page, select **Databases and tables** from the
    sidebar.

3.  In the **Databases and tables** page, select **Create database** >
    **ClickHouse database**.

4.  In the **Create ClickHouse database** window, enter a name for your
    database and select **Create database**.

    The name of the database appears in the list of databases
    in the **Databases and tables** page. On our side, we enable
    necessary customizations and run secondary queries to grant access
    to the admin user.

## Remove a database

Similar to creating the database, removal should also be done through
the Aiven platform. In the web interface of [Aiven
console](https://console.aiven.io/) you'll find a delete button next to
the database you created in the list of databases in the **Databases and
tables** page.

:::note
If you try adding or removing a database in for your Aiven for
ClickHouse service through the command line, you'll encounter an
exception `Not enough privileges.(ACCESS_DENIED)`. Use the Aiven
web interface to add or remove a database.
:::

## Create a table

Tables can be added with an SQL query, either with the help of the web
query editor or with CLI. In both cases, the SQL query looks the same.
The example below shows a query to add new table `expenses` to
`transactions` database. To keep it simple, this example has an
unrealistically small amount of columns:

```sql
CREATE TABLE transactions.expenses (
    Title String,
    Date DateTime,
    UserID UInt64,
    Amount UInt32
)
ENGINE = ReplicatedMergeTree ORDER BY Date;
```

### Select a table engine

Part of the table definition includes a targeted table engine. See the full
[list of supported table engines](/docs/products/clickhouse/reference/supported-table-engines)
in Aiven for ClickHouse.

Aiven for ClickHouse uses `replicated` variants of table
engines to ensure high availability. Even if you select `MergeTree`
engine, we will automatically use the replicated variant on our side.

## Remove a table

A table can be removed using either CLI or [Aiven
Console](https://console.aiven.io/).

:::note
You can remove a table of any size if you have the `DROP` permission
since parameters `max_table_size_to_drop` and
`max_partition_size_to_drop` are disabled for Aiven services. Consider
[granting](/docs/products/clickhouse/howto/manage-users-roles) only necessary permissions to your database users.
:::

### Remove a table with CLI

Run the following SQL command to remove your table:

```bash
DROP TABLE NAME_OF_YOUR_DATABASE.NAME_OF_YOUR_TABLE;
```

### Remove a table in the console

To remove your table in [Aiven Console](https://console.aiven.io/):

1.  Log in to the [Aiven Console](https://console.aiven.io/).
2.  Go to the table to remove: organization > project >
    service > **Databases and tables**.
3.  In the **Databases and tables** view, go to the table and
    select <ConsoleLabel name="actions"/>  > **Remove** > **Delete table**.
