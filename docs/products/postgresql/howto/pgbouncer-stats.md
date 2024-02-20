---
title: Access PgBouncer statistics
---

PgBouncer is used at Aiven for
[Connection pooling](/docs/products/postgresql/concepts/pg-connection-pooling).

## Get PgBouncer URL

PgBouncer URL can be checked under **Pools** in [Aiven
Console](https://console.aiven.io/) > your Aiven for PostgreSQL®
service's page > **Pools** view (available from the sidebar).
Alternatively, it can be extracted via
[Aiven Command Line interface](/docs/tools/cli), using `jq` ([https://stedolan.github.io/jq/](https://stedolan.github.io/jq/)) to parse the
JSON response.

Execute the following command replacing the `INSTANCE_NAME` parameter
with the name of your instance:

```
avn service get INSTANCE_NAME --project PROJECT_NAME --json | jq -r '.connection_info.pgbouncer'
```

The output will be similar to the below:

```
postgres://avnadmin:xxxxxxxxxxx@demo-pg-dev-advocates.aivencloud.com:13040/pgbouncer?sslmode=require
```

## Connect to PgBouncer

Connect to PgBouncer using the URL extracted above and show the
statistics with:

```
pgbouncer=# SHOW STATS;
```

Depending on the load of your database, the output will be similar to:

```
database  | total_xact_count | total_query_count | total_received | total_sent | total_xact_time | total_query_time | total_wait_time | avg_xact_count | avg_query_count | avg_recv | avg_sent | avg_xact_time | avg_query_time | avg_wait_time
----------+------------------+-------------------+----------------+------------+-----------------+------------------+-----------------+----------------+-----------------+----------+----------+---------------+----------------+---------------
pgbouncer |                1 |                 1 |              0 |          0 |               0 |                0 |               0 |              0 |               0 |        0 |        0 |             0 |              0 |             0
(1 row)
```

:::tip
Run `SHOW HELP` to see all available commands. Only read-only access is
available, as PgBouncer pools are automatically managed by Aiven.
:::
