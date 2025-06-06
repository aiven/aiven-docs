---
title: Manage Aiven for ClickHouse® databases and tables
sidebar_label: Manage databases and tables
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import {ConsoleIcon} from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Create and work with databases and tables in Aiven for ClickHouse®.

:::tip
Additionally to regular databases, you can also create
[integration databases](/docs/products/clickhouse/howto/integration-databases#create-integration-databases).
:::

## Create a database {#create-a-clickhouse-database}

You can create a database either in the [Aiven Console](https://console.aiven.io/) or
using an SQL client such as the
[ClickHouse client](/docs/products/clickhouse/howto/connect-with-clickhouse-cli).

:::note
Your Aiven for ClickHouse service can support up to 400 databases simultaneously.
:::

<Tabs groupId="group1">
<TabItem value="console" label="Aiven Console" default>
1.  Log in to the [Aiven Console](https://console.aiven.io/), and select
    your service from the <ConsoleLabel name="Services"/> page.

1.  In the sidebar, click <ConsoleLabel name="databasesandtables"/>.

1.  Click **Create database** > **ClickHouse database**.

1.  In the **Create ClickHouse database** window, enter a name for your
    database and select **Create database**.

    The name of the database appears in the list of databases
    in the <ConsoleLabel name="databasesandtables"/> page. On our side, we enable
    necessary customizations and run secondary queries to grant access
    to the admin user.

</TabItem>
<TabItem value="cli" label="SQL">

**Limitations**

- Only the `avnadmin` user can create databases in SQL.
- You can create a database in SQL with the `Replicated` database engine only.

To create a database in SQL, run the following SQL command:

```sql
CREATE DATABASE DATABASE_NAME
ENGINE = Replicated
```

For example:

```sql
CREATE DATABASE transactions
ENGINE = Replicated;
```

</TabItem>
</Tabs>

## Delete a database

:::important
Deleting a database is irreversible and permanently removes the database along
with all its tables and data.
:::

You can delete a database either in the [Aiven Console](https://console.aiven.io/) or
using an SQL client such as the
[ClickHouse client](/docs/products/clickhouse/howto/connect-with-clickhouse-cli):

<Tabs groupId="group1">
<TabItem value="console" label="Aiven Console" default>
1.  Log in to the [Aiven Console](https://console.aiven.io/), and select
    your service from the <ConsoleLabel name="Services"/> page.
1. In the sidebar, click <ConsoleLabel name="databasesandtables"/>.
1. In the **Databases and tables** list, find your database and click
    <ConsoleLabel name="actions"/> > <ConsoleLabel name="deletedatabase"/>.
</TabItem>
<TabItem value="cli" label="SQL">

**Limitation**: By default, only the `aiven` user can delete a database. The `aiven` user
can grant the permission to delete a database to another user.

To delete a database in SQL, run the following SQL command:

```sql
DROP DATABASE DATABASE_NAME
```

For example:

```sql
DROP DATABASE transactions;
```

</TabItem>
</Tabs>

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

:::note
A non-replicated table, such as `system.query_log`, can be
[queried using `clusterAllReplicas`](/docs/products/clickhouse/howto/query-databases#query-a-non-replicated-table).
:::

## Delete a table

You can remove a table of any size if you have the `DROP` permission
since parameters `max_table_size_to_drop` and
`max_partition_size_to_drop` are disabled for Aiven services. Consider
[granting](/docs/products/clickhouse/howto/manage-users-roles) only necessary
permissions to your database users.

<Tabs groupId="group1">
<TabItem value="CLI" label="CLI" default>

Run the following SQL command to remove your table:

```bash
DROP TABLE NAME_OF_YOUR_DATABASE.NAME_OF_YOUR_TABLE;
```

</TabItem>
<TabItem value="Console" label="Console">

To remove your table in the [Aiven Console](https://console.aiven.io/):

1.  Log in to the [Aiven Console](https://console.aiven.io/).
1.  Go to the table to be removed: organization > project >
    service > <ConsoleLabel name="databasesandtables"/>.
1.  In the **Databases and tables** view, go to the table and
    select <ConsoleLabel name="actions"/> > <ConsoleLabel name="deletetable"/>.

</TabItem>
</Tabs>

<RelatedPages/>

[Create Aiven for ClickHouse integration databases](/docs/products/clickhouse/howto/integration-databases#create-integration-databases)
