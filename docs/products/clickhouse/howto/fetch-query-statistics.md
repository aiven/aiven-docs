---
title: Fetch query statistics for Aiven for ClickHouse®
sidebar_label: Fetch query statistics
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

In ClickHouse®, the `system.query_log` table stores statistics for each executed query, including memory usage and duration.
This table is available in Aiven for ClickHouse.

You can fetch query statistics in Aiven for ClickHouse in the following ways:

- [`system.query_log` table](#use-systemquery_log): Run SQL queries in the Aiven Console
  query editor or a ClickHouse client to filter and analyze per-query data.
- [Aiven Console dashboard](#use-the-aiven-console-dashboard): View query statistics
  without writing SQL.
- [Aiven API](#use-the-aiven-api): Retrieve query statistics programmatically.

## Use `system.query_log`

`system.query_log` is non-replicated, so each node contains only queries executed on
that node. To get statistics from all service nodes, use `clusterAllReplicas`.

Run the following query in the query editor in the Aiven Console or using a ClickHouse
client. It returns the 10 most recently finished queries across all nodes, including
their duration, memory usage, and amount of data read:

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

## Use the Aiven Console dashboard

1. Log in to the [Aiven Console](https://console.aiven.io/) and choose your Aiven for
   ClickHouse service.
1. In the service sidebar, click <ConsoleLabel name="observe"/> > **Query statistics**.
1. View and analyze query statistics in the dashboard.

## Use the Aiven API

To retrieve query statistics programmatically, use the
[ServiceClickHouseQueryStats endpoint](https://api.aiven.io/doc/#tag/Service:_ClickHouse/operation/ServiceClickHouseQueryStats)
in the Aiven API.

```bash
GET /project/PROJECT/service/SERVICE_NAME/clickhouse/query/stats
```

Replace the following:

- `PROJECT`: the name of your project.
- `SERVICE_NAME`: the name of your Aiven for ClickHouse service.

<RelatedPages/>

- [Query a non-replicated table](/docs/products/clickhouse/howto/query-databases#query-a-non-replicated-table)
- [Supported system log tables](/docs/products/clickhouse/reference/clickhouse-system-tables#supported-system-log-tables)
- [Aiven API overview](/docs/tools/api)
