---
title: Access PgBouncer statistics
---

import ConsoleIcon from "@site/src/components/non-swizzled/ConsoleIcons"
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

PgBouncer is used at Aiven as a [connection pooler](/docs/products/postgresql/concepts/pg-connection-pooling) to lower the performance impact of opening new connections to Aiven for PostgreSQL®.

After connecting to PgBouncer, you can display statistics available from PgBouncer, such as:

- `total_xact_count`
- `total_query_count`
- `total_received`
- `total_sent`
- `total_xact_time`
- `total_query_time`
- `total_wait_time`
- `avg_xact_count`
- `avg_query_count`
- `avg_recv`
- `avg_sent`
- `avg_xact_time`
- `avg_query_time`
- `avg_wait_time`

:::note
You have the read-only access to PgBouncer statistics since PgBouncer pools are
automatically managed by Aiven.
:::

## Get PgBouncer URI{#extract-pgbouncer-uri}

To get the PgBouncer URI, you can use either the
[Aiven Console](https://console.aiven.io/) or the [Aiven CLI client](/docs/tools/cli).

### PgBouncer URI in the console

1. Log in to the [Aiven Console](https://console.aiven.io/), and go to a desired
   organization, project, and service.
1. Click <ConsoleLabel name="pools"/>, and find a desired pool.
1. Click <ConsoleIcon name="actions"/> > **Info** > **Primary Connection URI**.

### PgBouncer URI with the Aiven CLI

Use [jq](https://stedolan.github.io/jq/) to parse the JSON response. Execute the following
command replacing `SERVICE_NAME` and `PROJECT_NAME` as needed:

```bash
avn service get SERVICE_NAME --project PROJECT_NAME --json | jq -r '.connection_info.pgbouncer'
```

Expect to receive an output similar to the following:

```text
postgres://avnadmin:xxxxxxxxxxx@demo-pg-dev-advocates.aivencloud.com:13040/pgbouncer?sslmode=require
```

## Connect to PgBouncer

To connect to PgBouncer, use the [extracted URI](#extract-pgbouncer-uri):

```sql
psql 'EXTRACTED_PGBOUNCER_URI'
```

## Access statistics

1. Enable the expanded display by running:

   ```sql
   pgbouncer=# \x
   ```

1. Show the statistics by running:

   ```sql
   pgbouncer=# SHOW STATS;
   ```

Depending on the load of your database, expect an output similar to the following:

```text
database  | total_xact_count | total_query_count | total_received | total_sent | total_xact_time | total_query_time | total_wait_time | avg_xact_count | avg_query_count | avg_recv | avg_sent | avg_xact_time | avg_query_time | avg_wait_time
----------+------------------+-------------------+----------------+------------+-----------------+------------------+-----------------+----------------+-----------------+----------+----------+---------------+----------------+---------------
pgbouncer |                1 |                 1 |              0 |          0 |               0 |                0 |               0 |              0 |               0 |        0 |        0 |             0 |              0 |             0
(1 row)
```

:::tip
Run `SHOW HELP` to see all `pgbouncer` commands.
:::
