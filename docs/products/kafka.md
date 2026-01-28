---
title: Aiven for Apache Kafka®
---

Aiven for Apache Kafka® is a fully managed Apache Kafka service for building event-driven applications, data pipelines, and stream processing systems.

You can create Kafka services using **Inkless Kafka** or **Classic Kafka**, depending on
your workload and operational requirements.

## Inkless Kafka

Inkless Kafka is a Kafka service that supports storing topic data in cloud object storage
through diskless topics. Diskless topics are optional and must be explicitly enabled.

This enables elastic scaling and long-term data retention without managing disk capacity.

Inkless Kafka supports two topic types:

- **Diskless topics**, which store data directly in object storage
- **Classic topics**, which use local disks

Diskless topics are intended for high-throughput workloads where storage elasticity and
cost efficiency are important.

## Classic Kafka

Classic Aiven for Apache Kafka uses local disk storage and can optionally offload older
data to object storage using tiered storage.

Classic Kafka is suitable for workloads that rely on local disk storage and plan-based
broker sizing. It continues to support backups and existing performance defaults.

Classic Kafka services can run alongside Inkless Kafka services within the same project.

## Service tiers and deployment models

Aiven for Apache Kafka offers multiple service tiers and deployment models.

Service tiers include:

- **Free** is intended for evaluation and experimentation, with limited throughput and
  storage.
- **Professional** supports production workloads and Kafka Connect.

You can deploy Aiven for Apache Kafka on **Aiven Cloud** or **Bring Your Own Cloud (BYOC)**.

Availability of tiers and features varies by service type and deployment model.

## Replication with MirrorMaker 2

Aiven for Apache Kafka® MirrorMaker 2 provides managed cross-cluster replication.

You can replicate data between Kafka clusters, regions, or cloud providers, including
between Inkless Kafka and classic Kafka services. This supports migration, disaster
recovery, and multi-region architectures.

## Data integration with Kafka Connect

Apache Kafka Connect is the standard framework for moving data between Kafka and external
systems.

Aiven for Apache Kafka® Connect provides managed source and sink connectors for common
databases, storage systems, and data platforms. Kafka Connect is available on the
Professional tier for both Inkless and classic Kafka services.

## Get started

If you are new to Aiven for Apache Kafka®, start with the following topics:

- [Kafka free tier overview](/docs/products/kafka/free-tier/kafka-free-tier)
- [Generate sample data](/docs/products/kafka/howto/generate-sample-data)
- [Create a Kafka service](/docs/products/kafka/create-kafka-service)
- [Create Kafka topics](/docs/products/kafka/howto/create-topic)
- [Diskless topics overview](/docs/products/kafka/diskless/concepts/diskless-overview)
