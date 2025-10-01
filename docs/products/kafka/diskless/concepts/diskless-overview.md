---
title: Diskless for Apache Kafka® (BYOC)
limited: true
---

import RelatedPages from "@site/src/components/RelatedPages";

Diskless Topics is a feature of Aiven for Apache Kafka®, available in Bring Your Own Cloud (BYOC) deployments.
It stores Kafka topic data in cloud object storage instead of on broker disks. Aiven
manages the service in your cloud account, and you retain full control over your
infrastructure and data.


:::note
Diskless Topics is in limited availability. To request access,
[contact Aiven](https://aiven.io/contact).
:::

## About Diskless Topics

Diskless Topics is a Kafka feature that stores topic data in cloud object storage,
such as Amazon S3, Google Cloud Storage, or Azure Blob Storage, instead of on broker
disks. This design simplifies operations, reduces cross-availability zone (AZ) traffic,
and supports cost-effective scaling.

Data is batched and written to object storage. Partition metadata and message ordering
are managed by a coordination layer designed for high throughput and durability. For
details, see
[Batching and delivery](/docs/products/diskless/concepts/batching-and-delivery).

Diskless topics work with standard Kafka APIs and clients, and most applications do not
require any changes to use them.

Diskless Topics is available as a managed feature in Aiven for Apache Kafka® BYOC. The
service runs inside your Virtual Private Cloud (VPC), and all data stays within your
cloud account. For architectural details, see
[Diskless Topics architecture](/docs/products/diskless/concepts/architecture).

## Benefits of using diskless topics

Diskless topics are well suited for workloads that require performance, scalability,
 and simplified operations. It provides:

- **Elastic scaling**: Supports gigabytes per second of throughput and scales in seconds.
- **No disk overruns**: Object storage removes broker disk capacity limits.
- **Lower storage and network costs**: Reduces cross-availability zone traffic by
  offloading data to cloud object storage.
- **Lower latency for hot data**: Frequently accessed data is cached on brokers to
  improve fetch performance.
- **Simplified operations**: No need to manage broker disks, rebalance partitions, or
  manually provision storage.
- **Reduced operational overhead**: Clusters with only diskless topics require less
  manual effort to maintain and can be scaled down without rebalancing partitions.
- **Compliance and security**: The service runs entirely within your own cloud account.

## Diskless vs. classic Kafka topics

Diskless topics use cloud object storage and do not require partition leadership or
broker-managed replication. In contrast, classic Kafka topics rely on broker-local
disks and standard Kafka replication.

You can use both diskless and classic Kafka topics in the same Kafka cluster. This allows
you to:

- Adopt diskless topics gradually.
- Continue running workloads that require features not yet supported by diskless topics.
- Maintain flexibility in your deployment strategy.

For a detailed comparison, see [Compare diskless and classic topics](/docs/products/diskless/concepts/topics-vs-classic).

## Limitations

Diskless topics are compatible with Kafka APIs and clients, with some limitations:

- Transactions are not supported for produce or consume operations.
- Retention policies based on time or size are not fully implemented.
- Diskless topics must be created manually or via API. Automatic topic creation is not
  supported.
- Compacted topics are not supported.
- Kafka Streams state stores are not supported. Stream processing can read from diskless
  topics but must write to classic topics.
- Classic and tiered Kafka topics cannot be converted to diskless topics.


<RelatedPages/>

- [Get started with Diskless Topics](/docs/products/diskless/get-started)
- [Diskless Topics architecture](/docs/products/diskless/concepts/architecture)
