---
title: Create an Apache Kafka service on Aiven
sidebar_label: Create Kafka service
keywords: [create, kafka, service, cluster, inkless, classic, byoc]
---

import RelatedPages from "@site/src/components/RelatedPages";

Create an Apache Kafka service on Aiven by choosing a **cluster type** that defines how
the service is sized and where data is stored: **Inkless** or **Classic**.

## Choose a cluster type

### Inkless Kafka

Inkless Kafka uses throughput-based sizing and supports both classic topics and
diskless topics, which store data in object storage.

Choose Inkless Kafka if you need:

- Throughput-based sizing instead of fixed plans
- Faster cluster scaling, version upgrades, and node recovery
- Higher throughput per broker
- Mixed workloads, with classic topics for low latency and diskless topics for
  lower-cost storage
- Bring Your Own Cloud (BYOC) deployments

[Create an Inkless Kafka service](/docs/products/kafka/get-started/create-inkless-service)

### Classic Kafka

Classic Kafka uses fixed plans with local broker storage. Tiered storage is available
when supported by the selected plan and cloud.

Choose Classic Kafka if you need:

- Predictable capacity
- Low-latency access to local storage
- Configurable disk scalability, including disk autoscaling
- Free tier or standard cloud deployments

[Create a Classic Kafka service](/docs/products/kafka/get-started/create-classic-kafka-service)

<RelatedPages />

- [Create Kafka topics](/docs/products/kafka/howto/create-topic)
- [Diskless topics overview](/docs/products/kafka/diskless/concepts/diskless-overview)
