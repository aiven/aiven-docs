---
title: Create an Apache Kafka service on Aiven
sidebar_label: Create Kafka service
keywords: [create, kafka, service, standard, inkless, classic, byoc]
---

import RelatedPages from "@site/src/components/RelatedPages";

Create an Apache Kafka® service on Aiven by choosing a **service type** that defines how the service is sized and where data is stored: **Standard** or **Classic**.

## Choose a service type

### Standard Kafka

Standard Kafka uses usage-based pricing, unlimited storage at $0.10 per GB-month, and
supports both classic topics and diskless topics.

Choose Standard Kafka if you need:

- Throughput-based sizing on Aiven Cloud instead of fixed plans
- Faster cluster scaling, version upgrades, and node recovery
- Higher throughput per broker
- Mixed workloads with classic topics for low latency and diskless topics for
  lower-cost storage

In the Aiven CLI and advanced configuration, Standard Kafka is still identified with
`inkless`.

[Create Standard service](/docs/products/kafka/get-started/create-standard-kafka-service)

### Classic Kafka

Classic Kafka uses a fixed monthly price and stores classic topics on local broker
storage. Tiered storage is available when the selected plan and cloud support it.

Choose Classic Kafka if you need:

- Control over the broker size and number in the cluster deployment
- Very large local retention
- Complete control over the local disk size, and scaling
- Free tier or specific cloud deployments
- All retained data stored on local disks

[Create Classic service](/docs/products/kafka/get-started/create-classic-kafka-service)

<RelatedPages />

- [Create Kafka topics](/docs/products/kafka/howto/create-topic)
- [Diskless topics overview](/docs/products/kafka/diskless/concepts/diskless-topic-overview)
