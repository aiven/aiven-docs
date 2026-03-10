---
title: Run queries on Aiven for ClickHouse®
sidebar_label: Run queries
keywords: [query log, query_log, log table]
---

Run queries against an Aiven for ClickHouse® database using the query editor, the Play UI, or the [ClickHouse® client](/docs/products/clickhouse/howto/connect-with-clickhouse-cli).

Aiven for ClickHouse runs queries in distributed mode across the entire cluster. In
standard ClickHouse, queries such as `CREATE`, `ALTER`, `RENAME`, and `DROP` affect only
the server where they run unless you explicitly add the `ON CLUSTER` clause. In
Aiven for ClickHouse, these queries are automatically distributed across the cluster.
You do not need to include `ON CLUSTER` in your queries.

:::important
Aiven for ClickHouse limits concurrent queries and connections:

- `max_concurrent_queries`: `25` to `400`
- `max_concurrent_connections`: `1000` to `4000`

See [Aiven for ClickHouse® limits and limitations](/docs/products/clickhouse/reference/limitations)
for details.
:::

## Query a database with a selected tool

### Query editor {#use-query-editor}

Aiven for ClickHouse® includes a web-based query editor. In
[Aiven Console](https://console.aiven.io/), open your service and click **Query editor**
in the sidebar.

#### When to use the query editor

Use the query editor to run queries directly from the console as the default user.
Queries run with the permissions assigned to this user.

#### Examples of queries

Retrieve a list of current databases:

```sql
SHOW DATABASES
```

Count rows:

```sql
SELECT COUNT(*) FROM transactions.accounts
```

Create a role:

```sql
CREATE ROLE accountant
```

### Play UI {#play-ui}

ClickHouse provides a built-in web interface called the Play UI for running SQL queries.

#### When to use the Play UI

Use the Play UI when you need to:

- Run queries as a non-default user
- Work with large query results

#### Use the Play UI

1. Log in to [Aiven Console](https://console.aiven.io/), choose the
   right project, and select your Aiven for ClickHouse service.
1. In the **Overview** page of your service, find the **Connection
   information** section and select **ClickHouse HTTPS & JDBC**.
1. Copy **Service URI** and go to `YOUR_SERVICE_URI/play` from a
   web browser.
1. Set the name and the password of the user on whose behalf you want
   to run the queries.
1. Enter the body of the query.
1. Select **Run**.

:::note
The Play UI works only when your browser can reach ClickHouse directly. If you
[restrict access by IP](/docs/platform/howto/restrict-access) or the service is in a
[VPC without public access](/docs/platform/howto/public-access-in-vpc), use the
[query editor](/docs/products/clickhouse/howto/query-databases#use-query-editor) in the
console to run queries as the default user.
:::

## Query a non-replicated table

Your Aiven for ClickHouse® service has multiple nodes behind one DNS name. For
non-replicated tables, for example log tables, each request goes to one node. You get a
row only if the `SELECT` hits the node that wrote that row.

To read from a non-replicated table across all nodes, use `clusterAllReplicas`:

```sql
SELECT *
FROM clusterAllReplicas(default, system.query_log)
WHERE query_id = '1a2b3c4d5e6f7g8h9i0j1a2b3c4d5e6f7g8'
```
