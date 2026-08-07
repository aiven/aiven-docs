---
title: System tables in Aiven for ClickHouse®
sidebar_label: System tables
---

Aiven for ClickHouse® supports multiple types of system tables, which store metadata and system-level information. Querying system tables allows you to check the configuration, performance, and state of your database.

## Supported system tables

Aiven for ClickHouse supports the
[system tables available with the open-source ClickHouse](https://clickhouse.com/docs/en/operations/system-tables),
with the exceptions below.

The following system tables are not accessible in 26.3 (all columns are
restricted):

- `background_schedule_pool`
- `build_options`
- `certificates`
- `database_replicas`
- `dns_cache`
- `fail_points`
- `histogram_metrics`
- `instrumentation`
- `jemalloc_profile_text`
- `jemalloc_stats`
- `models`
- `primes`
- `stack_trace`
- `symbols`
- `tokenizers`
- `unicode`
- `user_defined_functions`
- `user_directories`
- `zookeeper`
- `zookeeper_info`

A few system tables are accessible but hide specific columns:
`asynchronous_inserts`, `azure_queue_metadata_cache`, `distributed_ddl_queue`,
`remote_data_paths`, and `s3queue_metadata_cache`.

Most open-source system log tables are also not enabled. See
[Supported system log tables](/docs/products/clickhouse/reference/clickhouse-system-tables#supported-system-log-tables).

## Supported system log tables

System log tables store data related to traces, queries, performance metrics, errors, and
more. By recording logs and events, they allow you to monitor, debug, and audit your
database.

Aiven for ClickHouse enables the following system log tables:

- `asynchronous_insert_log`
- `part_log`
- `query_log`
- `query_views_log`
- `text_log`
- `trace_log`

Other open-source ClickHouse system log tables (for example `metric_log`,
`asynchronous_metric_log`, `query_thread_log`, `session_log`, `blob_storage_log`,
`processors_profile_log`, `crash_log`, and `backup_log`) are not enabled.

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
