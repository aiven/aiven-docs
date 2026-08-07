---
title: Supported table engines in Aiven for ClickHouse®
sidebar_label: Table engines
---

Table engines define how data is stored and which queries a table supports.
Aiven for ClickHouse® supports different table engines depending on the service
version. Engine availability can differ from upstream depending on features
enabled in Aiven for ClickHouse®.

For details about each engine, see the
[ClickHouse documentation](https://clickhouse.com/docs/en/engines/table-engines/).
For database engines, see [Supported database engines](/docs/products/clickhouse/reference/supported-database-engines).

:::note
To support high availability and node replacement operations on the Aiven
platform, some table engines are automatically remapped. In replicated
databases, `MergeTree` engines are replaced with their corresponding
`ReplicatedMergeTree` variants.
:::

## MergeTree family

| Engine | Replicated variant | Supported in |
| ------ | ------------------- | ------------ |
| `MergeTree` (remapped) | `ReplicatedMergeTree` | 25.3, 25.8, 26.3 |
| `AggregatingMergeTree` (remapped) | `ReplicatedAggregatingMergeTree` | 25.3, 25.8, 26.3 |
| `CoalescingMergeTree` (remapped) | `ReplicatedCoalescingMergeTree` | 25.8, 26.3 |
| `CollapsingMergeTree` (remapped) | `ReplicatedCollapsingMergeTree` | 25.3, 25.8, 26.3 |
| `GraphiteMergeTree` (remapped) | `ReplicatedGraphiteMergeTree` | 25.3, 25.8, 26.3 |
| `ReplacingMergeTree` (remapped) | `ReplicatedReplacingMergeTree` | 25.3, 25.8, 26.3 |
| `SummingMergeTree` (remapped) | `ReplicatedSummingMergeTree` | 25.3, 25.8, 26.3 |
| `VersionedCollapsingMergeTree` (remapped) | `ReplicatedVersionedCollapsingMergeTree` | 25.3, 25.8, 26.3 |

## Integration engines

| Engine | Supported in |
| ------ | ------------ |
| `AzureBlobStorage` | 25.3, 25.8, 26.3 |
| `AzureQueue` | 25.3, 25.8, 26.3 |
| `COSN` | 25.3, 25.8, 26.3 |
| `GCS` | 25.8, 26.3 |
| `Kafka` (via [integration](/docs/products/clickhouse/howto/integrate-kafka) only, not via SQL) | 25.3, 25.8, 26.3 |
| `MaterializedPostgreSQL` | 25.3, 25.8, 26.3 |
| `MySQL` | 25.3, 25.8, 26.3 |
| `OSS` | 25.3, 25.8, 26.3 |
| `PostgreSQL` (via SQL or [integration](/docs/products/clickhouse/howto/integrate-postgresql)) | 25.3, 25.8, 26.3 |
| `S3` | 25.3, 25.8, 26.3 |
| `S3Queue` | 25.3, 25.8, 26.3 |
| `URL` | 25.3, 25.8, 26.3 |

## Data lake engines

| Engine | Supported in |
| ------ | ------------ |
| `DeltaLake` | 25.3, 25.8, 26.3 |
| `DeltaLakeAzure` | 25.8, 26.3 |
| `DeltaLakeS3` | 25.8, 26.3 |
| `Hudi` | 25.3, 25.8, 26.3 |
| `Iceberg` | 25.3, 25.8, 26.3 |
| `IcebergAzure` | 25.3, 25.8, 26.3 |
| `IcebergS3` | 25.3, 25.8, 26.3 |

## View engines

| Engine | Supported in |
| ------ | ------------ |
| `LiveView` | 25.3, 25.8 |
| `MaterializedView` | 25.3, 25.8, 26.3 |
| `View` | 25.3, 25.8, 26.3 |
| `WindowView` | 25.3, 25.8, 26.3 |

:::note
`LiveView` was removed upstream and is not available in 26.3. Replace live views
before upgrading, for example with refreshable materialized views.
:::

## Special-purpose engines

| Engine | Supported in |
| ------ | ------------ |
| `Alias` | 26.3 |
| `Buffer` | 25.3, 25.8, 26.3 |
| `Dictionary` | 25.3, 25.8, 26.3 |
| `Distributed` | 25.3, 25.8, 26.3 |
| `Join` | 25.3, 25.8, 26.3 |
| `KeeperMap` | 25.3, 25.8, 26.3 |
| `Memory` | 25.3, 25.8, 26.3 |
| `Merge` | 25.3, 25.8, 26.3 |
| `Null` | 25.3, 25.8, 26.3 |
| `Set` | 25.3, 25.8, 26.3 |
| `TimeSeries` | 25.8, 26.3 |

## Testing and utility engines

| Engine | Supported in |
| ------ | ------------ |
| `FuzzJSON` | 25.3, 25.8, 26.3 |
| `FuzzQuery` | 25.3, 25.8, 26.3 |
| `GenerateRandom` | 25.3, 25.8, 26.3 |
| `Loop` | 25.3, 25.8, 26.3 |

:::tip
[Managed credentials integrations](/docs/products/clickhouse/concepts/data-integration-overview#managed-credentials-integration)
simplify authentication for integration engines and dictionaries that access
remote sources. Enable them when using these engines.
[Learn how to enable managed credentials](/docs/products/clickhouse/howto/data-service-integration#create-managed-credentials-integrations).
:::
