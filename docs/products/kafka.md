---
title: Aiven for Apache Kafka®
---

Aiven for Apache Kafka® is a fully managed Apache Kafka service for building event-driven applications, data pipelines, and stream processing systems.

You create Kafka services using one of two **cluster types**: **Inkless Kafka** or
**Classic Kafka**.

## Inkless Kafka

Inkless Kafka is a cluster type that supports storing topic data in cloud object storage
through diskless topics. Diskless topics are optional and must be explicitly enabled.

This enables elastic scaling and long-term data retention without managing disk capacity.

Inkless Kafka supports:

- **Diskless topics**, which store data in object storage
- **Classic topics**, which use local disks with tiered storage enabled by default

Inkless Kafka is intended for high-throughput workloads where storage elasticity and
cost efficiency are important, including Bring Your Own Cloud (BYOC) deployments.

## Classic Kafka

Classic Kafka is a cluster type that uses fixed plans with local broker storage and can
optionally offload older data to object storage using tiered storage.

It is suitable for workloads that rely on predictable capacity, low-latency access to
local storage, and plan-based broker sizing. Classic Kafka continues to support existing
performance defaults and backups.

Classic Kafka and Inkless Kafka services can run alongside each other within the same
project.

## Service tiers and deployment models

Aiven for Apache Kafka is available on multiple service tiers and deployment models.

- **Free** supports evaluation and experimentation with limited throughput and storage.
- **Professional** supports production workloads and Kafka Connect.

Kafka services can run on **Aiven Cloud** or **Bring Your Own Cloud (BYOC)**.
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
- [Create an Inkless Kafka cluster](/docs/products/kafka/get-started/create-inkless-service)
- [Create a Classic Kafka cluster](/docs/products/kafka/get-started/create-classic-kafka-service)
- [Create Kafka topics](/docs/products/kafka/howto/create-topic)
- [Generate sample data](/docs/products/kafka/howto/generate-sample-data)
- [Diskless topics overview](/docs/products/kafka/diskless/concepts/diskless-overview)
