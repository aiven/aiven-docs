---
title: System tables in Aiven for ClickHouse®
sidebar_label: System tables
---

Aiven for ClickHouse® supports multiple types of system tables, which store metadata and system-level information. Querying system tables allows you to check the configuration, performance, and state of your database.

## Supported system tables

Aiven for ClickHouse supports all
[system tables available with the open-source ClickHouse](https://clickhouse.com/docs/en/operations/system-tables),
except the following:

- `certificates`
- `build_options`
- `models`
- `stack_trace`
- `user_directories`
- `warnings`
- `zookeeper`
- `dns_cache`
- `symbols`

## System tables TTL

In Aiven for ClickHouse, time-to-live (TTL) for system tables is fixed to 1 hour. This
means data in system tables is kept for 1 hour before being automatically deleted.

## Persist data with materialized views

You can work around the TTL of 1 hour by creating a
[materialized view](/docs/products/clickhouse/howto/materialized-views)
to save system table data so that you can retrieve and use it later. To achieve this,
create a materialized view similar to the following:

```sql
CREATE MATERIALIZED VIEW query_log
ENGINE = MergeTree
PARTITION BY event_date
ORDER BY event_time
AS SELECT * FROM system.query_log;
```
