---
title: Query ClickHouse® databases
---

There are a few tools that enable querying ClickHouse databases. Find
out which of them are supported in Aiven and how to use them.

:::note
To ensure data security, stability, and its proper replication, we equip
our managed Aiven for ClickHouse® service with specific features, some
of them missing from the standard ClickHouse offer. Aiven for
ClickHouse® takes care of running queries in the distributed mode over
the entire cluster. In the standard ClickHouse, the queries `CREATE`,
`ALTER`, `RENAME` and `DROP` only affect the server where they are run.
In contrast, we ensure the proper distribution across all cluster
machines behind the scenes. You don't need to remember using
`ON CLUSTER` for every query.
:::

For querying your ClickHouse® databases, you can choose between our
query editor, the Play UI, and
[the ClickHouse® client](/docs/products/clickhouse/howto/connect-with-clickhouse-cli).

## Use the query editor {#use-query-editor}

Aiven for ClickHouse® includes a web-based query editor, which you can
find in [Aiven Console](https://console.aiven.io/) by selecting **Query
editor** from the sidebar of your service's page.

### When to use the query editor

The query editor is convenient if you want to run queries directly from
the console on behalf of the default user. The requests that you run
through the query editor rely on the permissions granted to this user.

### Examples of queries

Retrieve a list of current databases:

```
SHOW DATABASES
```

Count rows:

```
SELECT COUNT(*) FROM transactions.accounts
```

Create a role:

```
CREATE ROLE accountant
```

## Play UI {#play-iu}

ClickHouse® includes a built-in user interface for running SQL queries.
You can access it from a web browser over the HTTPS protocol.

### When to use the play UI

Use the play UI if you want to run requests using a non-default user or
if you expect a large size of the response.

### Use the play UI

1.  Log in to [Aiven Console](https://console.aiven.io/), choose the
    right project, and select your Aiven for ClickHouse service.
2.  In the **Overview** page of your service, find the **Connection
    information** section and select **ClickHouse HTTPS & JDBC**.
3.  Copy **Service URI** and go to `YOUR_SERVICE_URI/play` from a
    web browser.
4.  Set the name and the password of the user on whose behalf you want
    to run the queries.
5.  Enter the body of the query.
6.  Select **Run**.

:::note
The play interface is only available if you can connect directly to
ClickHouse from your browser. If the service is
[restricted by IP addresses](/docs/platform/howto/restrict-access) or in a
[VPC without public access](/docs/platform/howto/public-access-in-vpc), you can use the
[query editor](/docs/products/clickhouse/howto/query-databases#use-query-editor) instead.
The query editor can be accessed directly from the console to run
requests on behalf of the default user.
:::
