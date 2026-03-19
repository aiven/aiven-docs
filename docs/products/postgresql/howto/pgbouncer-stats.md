---
title: Access PgBouncer statistics for Aiven for PostgreSQL®
sidebar_label: PgBouncer statistics
---

import ConsoleIcon from "@site/src/components/ConsoleIcons";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import VerifyPasswordEncryption from "@site/static/includes/pg-password-encryption.md";

PgBouncer is used at Aiven as a [connection pooler](/docs/products/postgresql/concepts/pg-connection-pooling) to lower the performance impact of opening new connections to Aiven for PostgreSQL®.

<VerifyPasswordEncryption/>

You can access PgBouncer statistics in two ways:

- **Through metrics integrations** (recommended): PgBouncer statistics are automatically
  exported as standard metrics, available through any
  [metrics integration](/docs/integrations) Aiven supports, such as Datadog, Grafana,
  Prometheus, or CloudWatch.
- **Direct database connection**: Connect to PgBouncer and run the `SHOW STATS` command to
  view statistics directly.

## Access statistics through metrics integrations

Aiven exports PgBouncer `SHOW STATS` results as standard metrics, making them available
through any metrics integration without connecting to the database.

The following statistics are available:

- `total_xact_count` - Total number of SQL transactions pooled
- `total_query_count` - Total number of SQL queries pooled
- `total_received` - Total volume in bytes of network traffic received
- `total_sent` - Total volume in bytes of network traffic sent
- `total_xact_time` - Total transaction time in microseconds
- `total_query_time` - Total query time in microseconds
- `total_wait_time` - Total time in microseconds clients waited for a connection
- `total_bind_count` - Total number of bind operations
- `total_client_parse_count` - Total number of client-side parse operations
- `total_server_assignment_count` - Total number of server assignment operations
- `total_server_parse_count` - Total number of server-side parse operations
- `avg_xact_count` - Average transactions per second
- `avg_query_count` - Average queries per second
- `avg_recv` - Average received bytes
- `avg_sent` - Average sent bytes
- `avg_xact_time` - Average transaction time in microseconds
- `avg_query_time` - Average query time in microseconds
- `avg_wait_time` - Average wait time in microseconds
- `avg_bind_count` - Average bind operations per second
- `avg_client_parse_count` - Average client parse operations per second
- `avg_server_assignment_count` - Average server assignments per second
- `avg_server_parse_count` - Average server parse operations per second

### Metric format

Metrics are exported in InfluxDB line protocol format and include tags for cloud, database,
host, instance, project, service, and service type. Example:

```text
pgbouncer,cloud=google-europe-west1,db=pool1,host=ae-pg-1,instance=pgbouncer_1,project=testproject,service=ae-pg,service_type=pg avg_query_time=383i,total_query_count=33i,total_wait_time=43703i,avg_wait_time=0i 1773830989000000000
```

### Enable metrics integrations

To access PgBouncer metrics through integrations:

- **Datadog**: Follow
  [Monitor PgBouncer with Datadog](/docs/products/postgresql/howto/monitor-pgbouncer-with-datadog)
  to enable PgBouncer monitoring.
- **Other integrations**: Set up any [metrics integration](/docs/integrations) (Grafana,
  Prometheus, CloudWatch) for your PostgreSQL service. PgBouncer metrics are automatically
  included.

## Access statistics through direct connection

You can also connect directly to PgBouncer and run the `SHOW STATS` command to view statistics.

:::note
You have read-only access to PgBouncer statistics since PgBouncer pools are
automatically managed by Aiven.
:::

### Get PgBouncer URI{#extract-pgbouncer-uri}

To get the PgBouncer URI, you can use either the
[Aiven Console](https://console.aiven.io/) or the [Aiven CLI client](/docs/tools/cli).

#### PgBouncer URI in the console

1. Log in to the [Aiven Console](https://console.aiven.io/), and go to a desired
   organization, project, and service.
1. Click <ConsoleLabel name="pools"/>, and find a desired pool.
1. Click <ConsoleIcon name="actions"/> > **Info** > **Primary Connection URI**.

#### PgBouncer URI with the Aiven CLI

Use [jq](https://stedolan.github.io/jq/) to parse the JSON response. Execute the following
command replacing `SERVICE_NAME` and `PROJECT_NAME` as needed:

```bash
avn service get SERVICE_NAME --project PROJECT_NAME --json | jq -r '.connection_info.pgbouncer'
```

Expect to receive an output similar to the following:

```text
postgres://avnadmin:xxxxxxxxxxx@demo-pg-dev-advocates.aivencloud.com:13040/pgbouncer?sslmode=require
```

### Connect to PgBouncer

To connect to PgBouncer, use the [extracted URI](#extract-pgbouncer-uri):

```sql
psql 'EXTRACTED_PGBOUNCER_URI'
```

### View statistics

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
