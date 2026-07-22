---
title: Aiven for Apache Kafka®
---

Aiven for Apache Kafka® is a fully managed Apache Kafka service for building event-driven applications, data pipelines, and stream processing systems.

:::tip
Use an AI assistant connected to [Aiven MCP](/docs/tools/mcp-server) to create
Kafka services, manage topics, and view cluster details from clients such as
Cursor and Claude Code.
:::

You create Kafka services using one of two **service types**: **Standard Kafka** or
**Classic Kafka**.

## Standard Kafka

Standard Kafka is a service type that supports storing topic data in cloud object
storage through diskless topics.

This enables elastic scaling and long-term data retention without managing disk capacity.

Standard Kafka supports:

- **Diskless topics**, which store data in object storage
- **Classic topics**, which use managed remote storage by default

Standard Kafka is intended for high-throughput workloads where storage elasticity and
cost efficiency are important, including Bring Your Own Cloud (BYOC) deployments. For
details on how Standard Kafka works, its storage model, and when to use it, see
[Standard Kafka overview](/docs/products/kafka/standard-kafka-overview).

## Classic Kafka

Classic Kafka is a service type that uses fixed plans with local broker storage and can
optionally move older data to object storage using tiered storage.

It is suitable for workloads that rely on predictable capacity, low-latency access to
local storage, and plan-based broker sizing. Classic Kafka continues to support existing
performance defaults and backups.

Classic Kafka and Standard Kafka services can run alongside each other within the same
project.

## Service tiers and deployment models

Aiven for Apache Kafka is available on multiple service tiers and deployment models.

- **Free** supports evaluation and experimentation with limited throughput and storage.
- **Developer** is a paid tier for Classic Kafka that sits between Free and
  Professional. It offers higher throughput, more topics and storage, and longer
  retention than Free, and supports service integrations and optional Kafka Connect
  billed separately.
- **Professional** supports production workloads and full Kafka Connect support on both
  Standard and Classic Kafka services (plan-dependent).

Kafka services can run on **Aiven Cloud** or **Bring Your Own Cloud (BYOC)**.
Availability of tiers and features varies by service type and deployment model.

## Replication with MirrorMaker 2

Aiven for Apache Kafka® MirrorMaker 2 provides managed cross-cluster replication.

You can replicate data between Kafka clusters, regions, or cloud providers, including
between Standard Kafka and Classic Kafka services. This supports migration, disaster
recovery, and multi-region architectures.

## Data integration with Kafka Connect

Apache Kafka Connect is the standard framework for moving data between Kafka and external
systems.

Aiven for Apache Kafka® Connect provides managed source and sink connectors for common
databases, storage systems, and data platforms. On Classic Kafka, Kafka Connect is
optional on the Developer tier (billed separately) and supported on the Professional
tier. On Standard Kafka, Kafka Connect is available on the Professional tier.

## Get started

If you are new to Aiven for Apache Kafka®, start with the following topics:

- [Kafka free tier overview](/docs/products/kafka/free-tier/kafka-free-tier)
- [Kafka Developer tier overview](/docs/products/kafka/dev-tier/kafka-dev-tier)
- [Create a Standard Kafka service](/docs/products/kafka/get-started/create-standard-kafka-service)
- [Create a Classic Kafka service](/docs/products/kafka/get-started/create-classic-kafka-service)
- [Create Kafka topics](/docs/products/kafka/howto/create-topic)
- [Generate sample data](/docs/products/kafka/howto/generate-sample-data)
- [Diskless topics overview](/docs/products/kafka/diskless/concepts/diskless-topic-overview)
