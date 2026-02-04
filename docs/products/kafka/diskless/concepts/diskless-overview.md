---
title: Diskless topics for Apache Kafka®
---

import RelatedPages from "@site/src/components/RelatedPages";

Diskless topics are a feature of Aiven for Apache Kafka® that store Kafka topic data in cloud object storage.

Diskless topics are available in Inkless Kafka services on Aiven Cloud and
Bring Your Own Cloud (BYOC). In Bring Your Own Cloud (BYOC)
deployments, Aiven manages the Kafka service in your cloud account, while you retain
control over your infrastructure and data.

:::note
Diskless topics are **limited availability** on Aiven Cloud.
:::

## About diskless topics

Diskless topics store topic data in cloud object storage, such as Amazon S3 or Google
Cloud Storage (GCS), instead of on broker disks. This design simplifies operations,
reduces cross-availability zone (AZ) traffic, and supports cost-effective scaling.

Data is batched and written to object storage. Partition metadata and message ordering
are managed by an internal coordination layer that Aiven deploys and operates to support
diskless topics. For details, see [Batching and delivery](/docs/products/kafka/diskless/concepts/batching-and-delivery).

Diskless topics work with standard Kafka APIs and clients, and most applications do not
require any changes to use them. For architectural details, see
[Diskless topics architecture](/docs/products/kafka/diskless/concepts/diskless-topics-architecture).

## Benefits of using diskless topics

Diskless topics are well suited for workloads that require performance, scalability,
and simplified operations. They provide:

- **Elastic scaling**: Supports high throughput and scales in seconds.
- **No disk overruns**: Shifting to object storage removes broker disk capacity limits.
- **Lower storage and network costs**: Reduces cross-availability zone traffic by
  offloading data to cloud object storage.
- **Lower latency for hot data**: Frequently accessed data is cached on brokers to
  improve fetch performance.
- **Simplified operations**: No need to manage broker disks, rebalance partitions, or
  manually provision storage.
- **Reduced operational overhead**: Services with only diskless topics require less
  manual effort to maintain and can be scaled down without rebalancing partitions.
- **Compliance and security**: In BYOC deployments, the service runs entirely within
  your own cloud account.

## Diskless vs. classic Kafka topics

Diskless topics store data in cloud object storage and do not rely on broker-managed
replication or partition leadership. Classic Kafka topics store data on broker-local
disks and use standard Kafka replication.

You can use both diskless and classic Kafka topics in the same Inkless Kafka service.
This allows you to:

- Adopt diskless topics gradually.
- Continue running workloads that require features not yet supported by diskless topics.
- Maintain flexibility in your deployment strategy.

For a detailed comparison, see [Compare diskless and classic topics](/docs/products/kafka/diskless/concepts/topics-vs-classic).


<RelatedPages/>

- [Create an Inkless Kafka cluster](/docs/products/kafka/get-started/create-inkless-service)
- [Diskless topics architecture](/docs/products/kafka/diskless/concepts/diskless-topics-architecture)
- [Diskless topics limitations](/docs/products/kafka/diskless/concepts/limitations)
- [Create Apache Kafka® topics](/docs/products/kafka/howto/create-topic)
