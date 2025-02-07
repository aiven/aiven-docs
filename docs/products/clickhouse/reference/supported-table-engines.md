---
title: Supported table engines in Aiven for ClickHouse®
sidebar_label: Table engines
---

Aiven for ClickHouse® supports several table engines that define the storage
parameters, supported queries, and other aspects of the data tables. For
details on each table engine, see the [ClickHouse
documentation](https://clickhouse.com/docs/en/engines/table-engines/).

:::note
To support node recycling for backup and restore procedures and high
availability in the Aiven platform, some of the table engines are
remapped. This means that in replicated databases, `MergeTree` engines
are automatically replaced with `ReplicatedMergeTree` variants of the
same engine.
:::

Aiven for ClickHouse supports the following table engines:

| Engine                                                                                                                | Engine family      |
|-----------------------------------------------------------------------------------------------------------------------|--------------------|
| `AggregatingMergeTree` (remapped)                                                                                     | MergeTree          |
| `AzureBlobStorage`                                                                                                    | Integration engine |
| `Buffer`                                                                                                              | Special engine     |
| `CollapsingMergeTree` (remapped)                                                                                      | MergeTree          |
| `COSN`                                                                                                                | Integration engine |
| `DeltaLake`                                                                                                           | Integration engine |
| `Dictionary`                                                                                                          | Special engine     |
| `Distributed`                                                                                                         | Special engine     |
| `GenerateRandom`                                                                                                      | Special engine     |
| `GraphiteMergeTree` (remapped)                                                                                        | MergeTree          |
| `Hudi`                                                                                                                | Integration engine |
| `Iceberg`                                                                                                             | Integration engine |
| `Join`                                                                                                                | Special engine     |
| `Kafka` (via [integration](/docs/products/clickhouse/howto/integrate-kafka) only, not via SQL)                        | Integration engine |
| `MaterializedView`                                                                                                    | Special engine     |
| `Memory`                                                                                                              | Special engine     |
| `Merge`                                                                                                               | Special engine     |
| `MergeTree` (remapped)                                                                                                | MergeTree          |
| `MySQL`                                                                                                               | Integration engine |
| `Null`                                                                                                                | Special engine     |
| `OSS`                                                                                                                 | Integration engine |
| `PostgreSQL` (either via SQL or via [integration](/docs/products/clickhouse/howto/integrate-postgresql))              | Integration engine |
| `ReplacingMergeTree` (remapped)                                                                                       | MergeTree          |
| `ReplicatedAggregatingMergeTree`                                                                                      | MergeTree          |
| `ReplicatedCollapsingMergeTree`                                                                                       | MergeTree          |
| `ReplicatedGraphiteMergeTree`                                                                                         | MergeTree          |
| `ReplicatedMergeTree`                                                                                                 | MergeTree          |
| `ReplicatedReplacingMergeTree`                                                                                        | MergeTree          |
| `ReplicatedSummingMergeTree`                                                                                          | MergeTree          |
| `ReplicatedVersionedCollapsingMergeTree`                                                                              | MergeTree          |
| `S3`                                                                                                                  | Integration engine |
| `Set`                                                                                                                 | Special engine     |
| `SummingMergeTree` (remapped)                                                                                         | MergeTree          |
| `URL`                                                                                                                 | URL                |
| `VersionedCollapsingMergeTree` (remapped)                                                                             | MergeTree          |
| `View`                                                                                                                | Special engine     |

:::tip
[Managed credentials integrations](/docs/products/clickhouse/concepts/data-integration-overview#managed-credentials-integration)
simplify authentication when using integration engines and dictionaries to access remote
sources.
Learn how to [enable the managed credentials integration](/docs/products/clickhouse/howto/data-service-integration#integrate-with-external-data-sources).
:::
