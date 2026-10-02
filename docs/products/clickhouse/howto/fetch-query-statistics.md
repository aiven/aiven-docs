---
title: Fetch query statistics for Aiven for ClickHouse®
sidebar_label: Fetch query statistics
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

In ClickHouse®, the `system.query_log` table stores statistics of each executed query,
including memory usage and duration. This table is available in Aiven for ClickHouse.

You can fetch query statistics in Aiven for ClickHouse using any of the following:

- [`system.query_log` table](#use-systemquery_log): Run SQL queries to filter and analyze
  per-query data.
- [Aiven Console](#use-aiven-console): View a dashboard of query statistics.
- [Aiven API](#use-aiven-api): Retrieve query statistics programmatically.

## Use `system.query_log`

Query the `system.query_log` table with SQL, for example in the query editor in the
Aiven Console or using a client of your choice.

:::note
Data in system log tables, including `system.query_log`, is kept for 1 hour. To keep it
longer, see
[Persist data with materialized views](/docs/products/clickhouse/reference/clickhouse-system-tables#persist-data-with-materialized-views).
:::

`system.query_log` is a non-replicated table, so each node holds only its own queries. To
get statistics from all the service nodes, use `clusterAllReplicas`. The following query
returns the 10 most recently finished queries across all nodes, including their duration,
memory usage, and the amount of data read:

```sql
SELECT
    query_id,
    query,
    query_duration_ms,
    memory_usage,
    read_rows,
    read_bytes
FROM clusterAllReplicas(default, system.query_log)
WHERE type = 'QueryFinish'
ORDER BY event_time DESC
LIMIT 10
```

## Use Aiven Console

1.  Log in to the [Aiven Console](https://console.aiven.io/) and choose your Aiven for
    ClickHouse service.
1.  In the service sidebar, click <ConsoleLabel name="observe"/> > **Query statistics**.
1.  View the query statistics in the dashboard.

## Use Aiven API

To access query statistics in Aiven for ClickHouse with Aiven API, use
the [ServiceClickHouseQueryStats
endpoint](https://api.aiven.io/doc/#tag/Service:_ClickHouse/operation/ServiceClickHouseQueryStats).

```bash
GET /project/<project>/service/<service_name>/clickhouse/query/stats
```

<RelatedPages/>

- [Query a non-replicated table](/docs/products/clickhouse/howto/query-databases#query-a-non-replicated-table)
- [Supported system log tables](/docs/products/clickhouse/reference/clickhouse-system-tables#supported-system-log-tables)
- [Aiven API overview](/docs/tools/api)
