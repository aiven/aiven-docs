---
title: System tables in Aiven for ClickHouse®
sidebar_label: System tables
---

Aiven for ClickHouse® supports multiple types of system tables, which store metadata and system-level information. Querying system tables allows you to check the configuration, performance, and state of your database.

## Supported system tables

Aiven for ClickHouse supports
[system tables available with the open-source ClickHouse](https://clickhouse.com/docs/en/operations/system-tables),
except a few
[system log tables](/docs/products/clickhouse/reference/clickhouse-system-tables#supported-system-log-tables)
and the following:

- `certificates`
- `build_options`
- `models`
- `stack_trace`
- `user_directories`
- `warnings`
- `zookeeper`
- `dns_cache`
- `symbols`

## Supported system log tables

System log tables store data related to traces, queries, performance metrics, errors, and
more. By recording logs and events, they allow you to monitor, debug, and audit your
database.

Aiven for ClickHouse supports
[system log tables available with the open-source ClickHouse](https://clickhouse.com/docs/en/operations/system-tables),
except the following:

- `asynchronous_metric_log`
- `backup_log`
- `blob_storage_log`
- `crash_log`
- `error_log`
- `metric_log`
- `opentelemetry_span_log`
- `processors_profile_log`
- `query_metric_log`
- `query_thread_log`
- `session_log`
- `trace_log`
- `text_log`
- `zookeeper_log`

### System log tables TTL

In Aiven for ClickHouse, time-to-live (TTL) for system log tables is fixed to 1 hour. This
means data in system log tables is kept for 1 hour before being automatically deleted.

### Persist data with materialized views

You can work around the TTL of 1 hour by creating a
[materialized view](/docs/products/clickhouse/howto/materialized-views)
to save system log table data so that you can retrieve and use it later. To achieve this,
create a materialized view similar to the following:

```sql
CREATE MATERIALIZED VIEW query_log
ENGINE = MergeTree
PARTITION BY event_date
ORDER BY event_time
AS SELECT * FROM system.query_log;
```
