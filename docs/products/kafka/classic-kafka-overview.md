---
title: Classic Kafka overview
---

import RelatedPages from "@site/src/components/RelatedPages";

Classic Kafka is an Aiven for Apache Kafka® service type that uses fixed plans with local broker storage.
You can optionally move older data to object storage with tiered storage when the
selected plan and cloud support it.

Classic Kafka is compatible with Apache Kafka APIs and clients. It remains available
for existing customers. New customers create
[Standard Kafka](/docs/products/kafka/standard-kafka-overview) services. Free and
Developer tier services use Classic Kafka.

## Key characteristics

Classic Kafka services:

- Use **fixed plans** that define compute, memory, and local disk capacity.
- Store **classic topics** on local broker disks by default.
- Support optional **tiered storage** to offload older data to object storage.
- Run on **Aiven Cloud** or **Bring Your Own Cloud (BYOC)**.
- Support Free, Developer, and Professional service tiers (availability depends on
  the deployment model).

## When to use Classic Kafka

Use Classic Kafka when you need:

- Predictable plan-based capacity and pricing.
- Low-latency access to data on local broker storage.
- Control over broker size, disk capacity, and scaling.
- BYOC deployment, including optional diskless topics as an add-on on supported plans.
- Free or Developer tier Kafka services.

## Existing Classic Kafka services

Existing Classic Kafka services continue to run unchanged. You cannot upgrade or
migrate a Classic Kafka service to Standard Kafka. To use Standard Kafka, create a
Standard Kafka service.

Classic Kafka and Standard Kafka can run in the same project. To replicate data
between them, use
[Apache Kafka MirrorMaker 2](/docs/products/kafka/kafka-mirrormaker).

<RelatedPages />

- [Create an Aiven for Apache Kafka® Professional tier service](/docs/products/kafka/get-started/create-kafka-service)
- [Create an Apache Kafka® service with BYOC](/docs/products/kafka/get-started/create-kafka-service-byoc)
- [Tiered storage for Classic Kafka](/docs/products/kafka/howto/kafka-tiered-storage-get-started)
- [Standard Kafka overview](/docs/products/kafka/standard-kafka-overview)
