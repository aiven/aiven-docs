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

| Engine                                      | Engine family  |
| ------------------------------------------- | -------------- |
| `AggregatingMergeTree` (remapped)           | MergeTree      |
| `Buffer`                                    | Special engine |
| `CollapsingMergeTree` (remapped)            | MergeTree      |
| `Dictionary`                                | Special engine |
| `Distributed`                               | Special engine |
| `GenerateRandom`                            | Special engine |
| `GraphiteMergeTree` (remapped)              | MergeTree      |
| `KafkaEngine` (via [integration](/docs/products/clickhouse/howto/integrate-kafka) only, not via SQL) | Special engine |
| `MaterializedView`                          | Special engine |
| `Memory`                                    | Special engine |
| `Merge`                                     | Special engine |
| `MergeTree` (remapped)                      | MergeTree      |
| `Null`                                      | Special engine |
| `ReplacingMergeTree` (remapped)             | MergeTree      |
| `ReplicatedAggregatingMergeTree` (remapped) | MergeTree      |
| `ReplicatedCollapsingMergeTree`             | MergeTree      |
| `ReplicatedGraphiteMergeTree`               | MergeTree      |
| `ReplicatedMergeTree`                       | MergeTree      |
| `ReplicatedReplacingMergeTree`              | MergeTree      |
| `ReplicatedSummingMergeTree`                | MergeTree      |
| `ReplicatedVersionedCollapsingMergeTree`    | MergeTree      |
| `Set`                                       | Special engine |
| `SummingMergeTree` (remapped)               | MergeTree      |
| `VersionedCollapsingMergeTree` (remapped)   | MergeTree      |
| `View`                                      | Special engine |
