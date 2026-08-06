---
title: Supported database engines in Aiven for ClickHouse®
sidebar_label: Database engines
---

A database engine controls how a database manages tables and metadata.
It determines what happens when you list, create, or delete tables and can
restrict a database to specific table engines or manage replication.

This differs from [table engines](/docs/products/clickhouse/reference/supported-table-engines),
which determine how data is stored on disk or read from external sources and
exposed as virtual tables.

Aiven for ClickHouse® supports different database engines depending on the
service version. Engine availability can differ from upstream depending on
features enabled in Aiven for ClickHouse®.

For details about each engine, see the
[ClickHouse database engines documentation](https://clickhouse.com/docs/en/engines/database-engines/).

## Supported database engines

| Engine | Supported in |
| ------ | ------------ |
| `Atomic` | 25.3, 25.8, 26.3 |
| `Lazy` | 25.3, 25.8 |
| `MaterializedMySQL` | 25.3, 25.8, 26.3 |
| `Memory` | 25.3, 25.8, 26.3 |
| `MySQL` | 25.3, 25.8, 26.3 |
| `Ordinary` | 25.3, 25.8, 26.3 |
| `PostgreSQL` | 25.3, 25.8, 26.3 |
| `Replicated` | 25.3, 25.8, 26.3 |

:::note
The `Lazy` database engine is not available in 26.3. It was removed upstream in
26.2. Move tables to a supported database engine and drop `Lazy` databases
before upgrading.
:::

:::note
On Aiven, new databases can be created in SQL only with the `Replicated` engine.
See [Limits and limitations](/docs/products/clickhouse/reference/limitations).
:::
