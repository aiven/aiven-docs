---
title: Batching and delivery in diskless topics
sidebar_label: Batching and delivery
---

Diskless topics use a batching-based delivery model designed for cloud-native environments.
Instead of writing messages to local disks, brokers batch messages in memory and upload
them to object storage. This approach improves scalability, reduces cost, and simplifies
the Kafka architecture while preserving ordering and delivery guarantees.

## Batching behavior

Diskless topics create batches based on time or size thresholds:

- **Batch interval**: The broker flushes a batch after a configurable delay
  (typically 250 milliseconds).
- **Batch size**: The broker flushes a batch once it reaches a specified size
  (commonly 8 MB).

These defaults are optimized for throughput and cost-efficiency. You can adjust them
based on your message rate, latency tolerance, and resource constraints.

:::tip
Low batch sizes or short flush intervals may increase object storage costs and degrade
performance. Test custom configurations with realistic workloads before using them in
production.
:::

## Benefits of batching

Writing individual messages is costly and inefficient. Object storage is optimized for
large, infrequent writes. Batching enables diskless topics to:

- Reduce the number of storage write operations
- Minimize per-message storage overhead
- Improve throughput
- Lower total cost of ownership (TCO)

## Upload process

After a batch is finalized:

1. The broker uploads the batch to cloud storage as an object.
1. The broker registers the object's offset ranges and metadata with the Batch
   Coordinator.
1. The Batch Coordinator tracks partition ordering and ensures metadata consistency.

Objects may contain messages from multiple partitions. They are not ordered internally.
The Batch Coordinator manages total ordering at the partition level.

This separation of storage and coordination allows brokers to continue accepting new
messages while finalizing storage operations in the background.

## Consumer delivery

Consumers use the standard Kafka fetch protocol to retrieve data from diskless topics:

1. The consumer requests data from a partition.
1. The broker uses metadata from the Batch Coordinator to locate the object containing the
   requested offset range.
1. The broker retrieves the object from the local object cache or fetches it from storage.
1. The broker extracts and returns the offset range to the consumer.

Each object is cached by one broker per availability zone (AZ). Other brokers in the
same AZ can access this cached data through inter-broker communication, enabling any
broker to serve consumer requests efficiently.

This caching and distribution model allows brokers to cooperate when serving consumers,
which helps balance the load across the cluster. As the number of producers and
consumers increases, the system continues to scale by distributing object fetches and
cache usage across brokers.

## Delivery guarantees

Diskless topics provide the same delivery guarantees as classic Kafka topics configured
with `acks=all`:

- **Ordering**: Messages are delivered in the order they are produced within a partition.
- **Durability**: Messages are stored in object storage, which provides built-in
  replication and durability.
- **Integrity**: Messages are validated before being delivered to consumers.
- **Consistency**: The Batch Coordinator manages total ordering and ensures metadata
  consistency.

Regardless of the producer `acks` setting, diskless topics always
acknowledge writes only after the data is successfully stored in object storage.

## Performance and tuning

You can tune batching behavior to suit your workload:

- Increase the batch size to reduce write frequency and storage API calls.
- Decrease the batch interval to reduce end-to-end latency.
- Monitor cache hit rates and consumer lag to optimize read performance.

Tuning for very low latency (for example, under 10 milliseconds) or small object sizes
(under 100 KB) can significantly increase costs and reduce performance benefits.

## Components involved in batching and delivery

Diskless topics use several internal components to manage batching and delivery
efficiently:

- **Batch Coordinator**: Manages partition-level metadata and total ordering.
    It tracks which messages are in which objects and monitors their offset ranges.
    Currently backed by PostgreSQL, the Batch Coordinator may evolve into a
    topic-based coordinator.
- **Object cache**: Caches recently accessed objects in memory or ephemeral disk to
  improve consumer fetch performance.
- **Compaction jobs**: Merges smaller or older objects into larger ones. This improves
  trailing read efficiency and reduces the number of required storage operations.
