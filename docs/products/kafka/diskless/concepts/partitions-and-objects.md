---
title: Partitions and objects in Diskless Topics
sidebar_label: Partitions and objects
---
import RelatedPages from "@site/src/components/RelatedPages";

Diskless topics use the standard Kafka partitioning model but store data in cloud object storage instead of broker-local disks.
Brokers batch messages and upload them as objects to the storage layer.

## Partitions

Partitions in diskless topics behave the same as in classic Kafka topics. Each partition
is an ordered append-only log of messages that supports message ordering, parallelism, and
horizontal scalability.

- Producers write to partitions based on a key or round-robin logic.
- Consumers read from partitions independently, enabling concurrent processing.
- The number of partitions controls how many producers or consumers can operate in
  parallel.

## Objects in diskless topics

In classic Kafka, partitioned data is stored in ordered segment files on broker disks.
Diskless topics replace these segments with cloud-stored objects.

Each object is a batch of messages that a broker uploads to cloud object storage. Unlike
classic Kafka segments, an object is not limited to a single partition. It can include
messages from multiple partitions. Messages within an object are not ordered across
partitions.

| Storage detail     | Classic Kafka segment            | Diskless topics object                     |
|--------------------|----------------------------------|-------------------------------------------------|
| Location           | Local disk on broker             | Cloud object storage                            |
| Structure          | Ordered messages per partition   | Batches containing messages from one or more partitions  |
| Management         | Via broker                       | Via internal Batch Coordinator metadata         |
| Replication        | Kafka-based                      |  Storage-provider-based                  |

Message ordering is preserved at the partition level using metadata. When a broker
uploads a batch, it registers the offset range and object reference with
the internal **Batch Coordinator**. Consumers use this metadata to fetch messages in the
correct order, even when data spans multiple objects.

To reduce latency, each broker may cache frequently accessed objects in memory or on
ephemeral disk, typically within the same availability zone.

<RelatedPages/>

[Batching and delivery in diskless topics](/docs/products/kafka/diskless/concepts/batching-and-delivery)
