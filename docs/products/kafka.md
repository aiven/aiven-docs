---
title: Aiven for Apache Kafka®
---

import DocCardList from '@theme/DocCardList';
import RelatedPages from "@site/src/components/RelatedPages";


Aiven for Apache Kafka® is a fully managed **distributed data streaming platform**, deployable in the cloud of your choice. Apache Kafka is an open source data streaming platform, ideal for event-driven applications, near-real-time data transfer and pipelines, stream analytics, and many more applications where a lot of data needs to move between applications in a speedy manner.

Kafka stores a potentially large number of records, each contains a
small amount of data, usually for a limited period of time. The storage
is organised into _topics_ and _partitions_ so that many data
streams can be handled at once, regardless of how much data is flowing
into or out of your Aiven for Apache Kafka service.

## Aiven for Apache Kafka® MirrorMaker 2

By adding Aiven for Apache Kafka MirrorMaker 2 to your setup, you gain
replication superpowers. Whether you need data replication across
clusters, availability zones or clouds, MirrorMaker 2 is the answer.

## Aiven for Apache Kafka® Connect

Apache Kafka moves data between systems, and Apache Kafka Connect is how
to interface between Apache Kafka and the rest of your data
architecture. Connectors are available for many databases, storage
platforms and other common integrations.


<RelatedPages/>

If you are new to Aiven for Apache Kafka®, explore these topics to get started:

- [Free tier overview](/docs/products/kafka/free-tier/free-tier-overview): Learn about
  the no-cost Kafka option for testing and early development.
- [Create a Kafka service](/docs/products/kafka/create-kafka-service): Set up and
  configure your first Kafka service in Aiven.
- [Create Kafka topics](/docs/products/kafka/howto/create-topic): Learn how to create
  both classic and diskless topics.
- [Generate sample data](/docs/products/kafka/howto/generate-sample-data): Produce
  example data to test your Kafka setup.
- [Enable tiered storage](/docs/products/kafka/howto/enable-kafka-tiered-storage):
  Optimize data storage by offloading older messages to object storage.
- [Diskless topics overview](/docs/products/kafka/diskless/concepts/diskless-overview):
  Understand how diskless topics store data in object storage for cost-efficient scaling.
