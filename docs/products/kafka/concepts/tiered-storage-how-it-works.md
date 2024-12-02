---
title: How tiered storage works in Aiven for Apache Kafka®
sidebar_label: How it works
---

import DataRetention from "@site/static/images/content/figma/data-retention.png";

Aiven for Apache Kafka® tiered storage optimizes data management across two distinct storage tiers:

- **Local tier**: Uses faster, typically more expensive storage solutions
  like solid-state drives (SSDs).
- **Remote tier**: Uses slower, cost-effective options like cloud object storage.

In Aiven for Apache Kafka's tiered storage architecture, **remote storage** refers to
storage options external to the Apache Kafka broker's
local disk. This typically includes cloud-based or self-hosted object
storage solutions like AWS S3 and Google Cloud Storage. Although
network-attached block storage solutions like AWS EBS are technically
external to the Apache Kafka broker, Apache Kafka considers them local storage
within its tiered storage architecture.

Tiered storage operates seamlessly for both Apache Kafka producers and consumers,
meaning they interact with Apache Kafka the same way, whether tiered storage is
enabled or not.

Administrators can configure tiered storage per topic by defining the
retention period and retention bytes to specify how much data is retained on the local
disk instead of remote storage.

## Local vs. remote data retention

When tiered storage is enabled, data produced to a topic is initially stored on the
local disk of the Apache Kafka broker. All but the active (open) segment is then
asynchronously and orderly transferred to remote storage, regardless of the
local retention settings.
During periods of high data ingestion or transient errors, such as network connectivity
issues, local storage might temporarily hold more data than specified by the local
retention threshold. This continues until the remote tier is back online, at which
point the excess local data is transferred to remote storage, and local segments
exceeding the retention threshold are removed.

<img src={DataRetention} className="centered" alt="Diagram depicting the concept of local vs. remote data retention in a tiered storage system" width="60%" />

## Segment management

Data is organized into segments, which are uploaded to remote storage
individually. The active (newest) segment remains in local storage,
so the segment size can also influence local data
retention. For example, if the local retention threshold is 1 GB, but the segment size
is 2 GB, the local storage exceeds the 1 GB limit until the active segment is rolled
over and uploaded to remote storage.

## Asynchronous uploads and replication

Data is transferred to remote storage asynchronously and does not
interfere with the producer activity. While the Apache Kafka broker aims to
move data as swiftly as possible, certain conditions, such as high
ingestion rate or connectivity issues can temporarily cause local storage to
exceed the limits set by the local retention policy.

The log cleaner does not purge any data exceeding the local retention threshold until
it is successfully uploaded to remote storage. The replication factor is not considered
during the upload process, and only one copy of each segment is uploaded to the remote
storage. Most remote storage options have their own measures, including data
replication to ensure data durability.

## Data retrieval

When consumers fetch records stored in remote storage, the Apache Kafka broker
downloads and caches these records locally. This allows for quicker
access in subsequent retrieval operations.

Aiven allocates a small amount of disk space, ranging from 2 GB to 16 GB,
equivalent to 5% of the Apache Kafka broker's total available disk for the
temporary storage of fetched records.

## Security

Segments are encrypted with 256-bit AES encryption before being uploaded
to the remote storage. The encryption keys are not shared with the cloud
storage provider and generally do not leave Aiven management machines
and the Kafka brokers.

## Related pages

-   [Tiered storage in Aiven for Apache Kafka® overview](/docs/products/kafka/concepts/kafka-tiered-storage)
-   [Guarantees](/docs/products/kafka/concepts/tiered-storage-guarantees)
-   [Limitations](/docs/products/kafka/concepts/tiered-storage-limitations)
-   [Enabled tiered storage for Aiven for Apache Kafka® service](/docs/products/kafka/howto/enable-kafka-tiered-storage)
