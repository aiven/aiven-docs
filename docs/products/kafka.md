---
title: Aiven for Apache Kafka®
---

Aiven for Apache Kafka® is a fully managed Apache Kafka service for building event-driven applications, data pipelines, and stream processing systems.

:::tip
Use an AI assistant connected to [Aiven MCP](/docs/tools/mcp-server) to create
Kafka services, manage topics, and view cluster details from clients such as
Cursor and Claude Code.
:::

You create Kafka services as **Standard Kafka** or **Classic Kafka**. New customers
create Standard Kafka services. Classic Kafka remains available for existing
customers. Free and Developer tier services use Classic Kafka.

- [Standard Kafka overview](/docs/products/kafka/standard-kafka-overview): diskless
  topics, object storage, and usage-based sizing on Aiven Cloud
- [Classic Kafka overview](/docs/products/kafka/classic-kafka-overview): fixed plans,
  local broker storage, optional tiered storage, and BYOC

## Service tiers and deployment models

Compare limits and features in
[Aiven for Apache Kafka® service tiers](/docs/products/kafka/get-started/service-tiers).

- **Free**: Evaluate and experiment with limited throughput and storage.
- **Developer**: A paid Classic Kafka tier between Free and Professional, with higher
  limits than Free and optional Kafka Connect billed separately.
- **Professional**: Production workloads, with Kafka Connect on Standard and Classic
  Kafka services (plan-dependent).

Kafka services run on **Aiven Cloud** or **Bring Your Own Cloud (BYOC)**. Standard
Kafka is available on Aiven Cloud only. On BYOC, Classic Kafka is available, with
diskless topics as an optional add-on.

## Replication with MirrorMaker 2

Aiven for Apache Kafka® MirrorMaker 2 provides managed replication between Kafka
clusters, regions, or cloud providers, including between Standard Kafka and Classic
Kafka services. Use it for migration, disaster recovery, and multi-region
architectures.

## Data integration with Kafka Connect

Aiven for Apache Kafka® Connect provides managed source and sink connectors. On
Classic Kafka, Kafka Connect is optional on the Developer tier (billed separately)
and supported on the Professional tier. On Standard Kafka, Kafka Connect is available
on the Professional tier.

## Get started

- [Get started with Aiven for Apache Kafka®](/docs/products/kafka/get-started/get-started-kafka)
- [Aiven for Apache Kafka® service tiers](/docs/products/kafka/get-started/service-tiers)
- [Create an Aiven for Apache Kafka® Professional tier service](/docs/products/kafka/get-started/create-kafka-service)
- [Create an Apache Kafka® service with BYOC](/docs/products/kafka/get-started/create-kafka-service-byoc)
- [Create Kafka topics](/docs/products/kafka/howto/create-topic)
- [Generate sample data](/docs/products/kafka/howto/generate-sample-data)
- [Diskless topics overview](/docs/products/kafka/diskless/concepts/diskless-topic-overview)
