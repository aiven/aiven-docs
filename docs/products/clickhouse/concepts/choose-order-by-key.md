---
title: Choose ORDER BY and partitioning keys for MergeTree tables
sidebar_label: Choose ORDER BY and partitioning keys
---

import RelatedPages from "@site/src/components/RelatedPages";

In Aiven for ClickHouse®, the `ORDER BY`, `PRIMARY KEY`, and `PARTITION BY` for a MergeTree table work together to control how data is sorted, indexed, and grouped on disk.
ClickHouse uses this layout to skip irrelevant
data during queries and store similar values together for better compression.

Use this guidance when you
[create MergeTree tables manually](/docs/products/clickhouse/howto/manage-databases-tables)
or review table definitions before loading data. For background on how the
sparse primary index uses the sort order, see
[Indexing and data processing](indexing).

:::warning
You cannot directly change the `ORDER BY` key after table creation. To use a different key,
create a table with the new key and reload the data.
:::

## Choose columns for the ORDER BY key

Choose columns based on your most common query filters. A good `ORDER BY` key usually has
three to five columns. Columns that appear first in the key benefit most from data skipping
because ClickHouse uses a [sparse primary index](indexing#clickhouse-primary-index).

Use these guidelines:

1. **Start with common filter columns.** Include columns that appear often in `WHERE`
   clauses and remove large amounts of data from queries.
1. **Put lower-cardinality filter columns first.** Good candidates include tenant,
   organization, region, environment, service name, event type, status, or category.
1. **Add higher-cardinality columns later.** Add columns such as site ID, source ID, device
   ID, or timestamp only when they help with filtering, grouping, compression, or
   deduplication.
1. **Include a timestamp for time-series data.** Put the timestamp after the main filtering
   dimensions, for example `ORDER BY (tenant_id, event_type, event_time)`.
1. **Avoid mostly unique IDs as the first column.** Columns such as event IDs, request IDs,
   trace IDs, or UUIDs usually do not group related rows together.

Do not choose an `ORDER BY` key only because a column is unique. In ClickHouse, the key is
used for sorting and data skipping, not for enforcing uniqueness.

If you often filter on columns that are not in the `ORDER BY` key, consider adding a
[data skipping index](indexing#clickhouse-data-skipping-indexes).

## Example: Event analytics table

The following table stores event data from multiple tenants:

```sql
CREATE TABLE events
(
    tenant_id  String,
    event_type String,
    event_time DateTime,
    event_id   UUID,
    payload    String
)
ENGINE = MergeTree
ORDER BY (tenant_id, event_type, event_time);
```

:::note
In Aiven for ClickHouse®, tables created with `MergeTree` are automatically remapped to
`ReplicatedMergeTree` to support high availability. Write `CREATE TABLE` statements using
`MergeTree`; Aiven applies the required table engine. For details, see
[Service architecture](/docs/products/clickhouse/concepts/service-architecture).
:::

This key works well for queries that filter by tenant, event type, and time range:

```sql
SELECT count()
FROM events
WHERE tenant_id = 'tenant-a'
  AND event_type = 'purchase'
  AND event_time >= now() - INTERVAL 7 DAY;
```

ClickHouse can use the sort order to skip data ranges that do not match the tenant, event
type, or time range.

The following key is less effective for this query pattern because `event_id` is almost
always unique:

```sql
ORDER BY (event_id, tenant_id, event_time)
```

## Separate ORDER BY and PRIMARY KEY

By default, the `PRIMARY KEY` is the same as `ORDER BY`. You can define a shorter
`PRIMARY KEY` to keep the sparse index compact while still sorting data by additional
columns using `ORDER BY`.

The `PRIMARY KEY` must be a prefix of the `ORDER BY` expression. In other words, the
`PRIMARY KEY` columns must appear at the start of `ORDER BY` in the same order.

For example:

```sql
ORDER BY    (service_name, log_level, timestamp, request_id)
PRIMARY KEY (service_name, log_level, timestamp)
```

In this example, ClickHouse sorts data by all four columns, but builds the sparse index from
the first three columns.

Use a separate `PRIMARY KEY` only when later columns help with compression or deduplication
but are not common query filters.

For `ReplacingMergeTree` tables, put the unique row identifier at the end of `ORDER BY` and
exclude it from `PRIMARY KEY` if it is not used as a filter:

```sql
ORDER BY    (tenant_id, site_id, event_id)
PRIMARY KEY (tenant_id, site_id)
```

## Choose PARTITION BY separately

Partitioning complements the `ORDER BY` key. Use `PARTITION BY` for retention, cleanup, and
data management. Do not use it as a replacement for `ORDER BY`.

For time-series data, start with monthly or weekly partitions:

```sql
PARTITION BY toYYYYMM(event_time)
ORDER BY (tenant_id, event_type, event_time)
```

Avoid high-cardinality partition keys, such as user IDs, request IDs, trace IDs, or event
IDs. They can create too many partitions and make table operations slower. Aim for dozens
or hundreds of partitions, not thousands.

For small tables or tables without a clear retention pattern, you can omit `PARTITION BY`.

## ORDER BY patterns by use case

| Use case | Recommended `ORDER BY` pattern |
| --- | --- |
| Multi-tenant analytics | `(tenant_id, site_id, event_time)` |
| Event analytics | `(tenant_id, event_type, event_time)` |
| Application logs | `(service_name, log_level, timestamp)` |
| Clickstream or session data | `(session_id, event_type, timestamp)` |
| Hierarchical data | `(continent, country, city)` |
| Deduplication with `ReplacingMergeTree` | `(..., unique_row_id)`; prefix `PRIMARY KEY` |

For clickstream data, `session_id` can lead the key when queries filter by session rather
than across all sessions.

<RelatedPages/>

- [Manage databases and tables](/docs/products/clickhouse/howto/manage-databases-tables)
- [Indexing and data processing](/docs/products/clickhouse/concepts/indexing)
