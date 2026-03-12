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
| `MergeTree` (remapped) | `ReplicatedMergeTree` | 25.3, 25.8 |
| `AggregatingMergeTree` (remapped) | `ReplicatedAggregatingMergeTree` | 25.3, 25.8 |
| `CoalescingMergeTree` (remapped) | `ReplicatedCoalescingMergeTree` | 25.8 |
| `CollapsingMergeTree` (remapped) | `ReplicatedCollapsingMergeTree` | 25.3, 25.8 |
| `GraphiteMergeTree` (remapped) | `ReplicatedGraphiteMergeTree` | 25.3, 25.8 |
| `ReplacingMergeTree` (remapped) | `ReplicatedReplacingMergeTree` | 25.3, 25.8 |
| `SummingMergeTree` (remapped) | `ReplicatedSummingMergeTree` | 25.3, 25.8 |
| `VersionedCollapsingMergeTree` (remapped) | `ReplicatedVersionedCollapsingMergeTree` | 25.3, 25.8 |

## Integration engines

| Engine | Supported in |
| ------ | ------------ |
| `AzureBlobStorage` | 25.3, 25.8 |
| `AzureQueue` | 25.3, 25.8 |
| `COSN` | 25.3, 25.8 |
| `GCS` | 25.8 |
| `Kafka` (via [integration](/docs/products/clickhouse/howto/integrate-kafka) only, not via SQL) | 25.3, 25.8 |
| `MaterializedPostgreSQL` | 25.3, 25.8 |
| `MySQL` | 25.3, 25.8 |
| `OSS` | 25.3, 25.8 |
| `PostgreSQL` (via SQL or [integration](/docs/products/clickhouse/howto/integrate-postgresql)) | 25.3, 25.8 |
| `S3` | 25.3, 25.8 |
| `S3Queue` | 25.3, 25.8 |
| `URL` | 25.3, 25.8 |

## Data lake engines

| Engine | Supported in |
| ------ | ------------ |
| `DeltaLake` | 25.3, 25.8 |
| `DeltaLakeAzure` | 25.8 |
| `DeltaLakeS3` | 25.8 |
| `Hudi` | 25.3, 25.8 |
| `Iceberg` | 25.3, 25.8 |
| `IcebergAzure` | 25.3, 25.8 |
| `IcebergS3` | 25.3, 25.8 |

## View engines

| Engine | Supported in |
| ------ | ------------ |
| `LiveView` | 25.3, 25.8 |
| `MaterializedView` | 25.3, 25.8 |
| `View` | 25.3, 25.8 |
| `WindowView` | 25.3, 25.8 |

## Special-purpose engines

| Engine | Supported in |
| ------ | ------------ |
| `Buffer` | 25.3, 25.8 |
| `Dictionary` | 25.3, 25.8 |
| `Distributed` | 25.3, 25.8 |
| `Join` | 25.3, 25.8 |
| `KeeperMap` | 25.3, 25.8 |
| `Memory` | 25.3, 25.8 |
| `Merge` | 25.3, 25.8 |
| `Null` | 25.3, 25.8 |
| `Set` | 25.3, 25.8 |
| `YTsaurus` | 25.8 |

## Testing and utility engines

| Engine | Supported in |
| ------ | ------------ |
| `FuzzJSON` | 25.3, 25.8 |
| `FuzzQuery` | 25.3, 25.8 |
| `GenerateRandom` | 25.3, 25.8 |
| `Loop` | 25.3, 25.8 |

:::tip
[Managed credentials integrations](/docs/products/clickhouse/concepts/data-integration-overview#managed-credentials-integration)
simplify authentication for integration engines and dictionaries that access
remote sources. Enable them when using these engines.
[Learn how to enable managed credentials](/docs/products/clickhouse/howto/data-service-integration#create-managed-credentials-integrations).
:::
