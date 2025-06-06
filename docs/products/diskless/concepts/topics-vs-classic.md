---
title: Compare diskless and classic Apache Kafka® topics
sidebar_label: Diskless vs. classic topics
---

Diskless topics are Apache Kafka®-compatible topics that store data in cloud object storage instead of broker-managed local disks.
Classic and diskless topics can coexist within the same cluster. You can create
either type if diskless topics are enabled for the service.

## Compare classic and diskless topics

The table below highlights the key differences between classic Kafka topics and
diskless topics.

| Feature                  | Classic topic              | Diskless topic                                       |
|--------------------------|----------------------------------|-----------------------------------------------------|
| Storage                  | Broker-managed local disks       | Cloud object storage                                |
| Replication              | Managed by Kafka brokers         | Handled by the storage provider                     |
| Partition leadership     | Required                         | Not required (leaderless data path)                 |
| Data path                | Brokers write and serve data     | Brokers batch and upload to storage                 |
| Rebalancing              | Required when scaling brokers    | Not required                                        |
| Segment format           | Ordered files per partition      | Unordered objects tracked via metadata              |
| Retention policies       | Supported                        | Limited support                |
| Compacted topics         | Supported                        | Not supported                                   |
| Transactions             | Supported                        | Not supported                                    |
| Topic creation           | Auto-creation           | Manual or API-based only                            |

## When to use classic or diskless topics

Use **classic Kafka topics** when:

- Your application requires transactions, compaction, or low-latency delivery.
- You need compatibility with tooling that depends on classic Kafka features.
- You rely on time- or size-based retention policies that are not yet available for
  diskless topics.

Use **diskless topics** when:

- High throughput and cost-efficient durable storage are required.
- Workload tolerates batching and slightly higher latency.
- Simplified broker operations and reduced infrastructure costs are priorities,
  especially for storage and cross-availability zone (AZ) traffic.

## Use classic and diskless topics in the same cluster

Apache Kafka clients can produce to and consume from diskless topics using the same APIs
as for classic topics. No client-side changes are needed.

A single Kafka cluster can contain both diskless and classic topics. This enables:

- Gradual adoption of diskless topics by migrating workloads incrementally
- Using classic topics for workloads that depend on unsupported features
- Consolidating streaming pipelines while optimizing for cost, durability, or
  throughput where needed
