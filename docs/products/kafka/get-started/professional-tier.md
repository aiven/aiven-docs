---
title: Aiven for Apache Kafka® Professional tier
sidebar_label: Professional tier
keywords: [kafka professional tier, kafka production, kafka byoc]
---

import RelatedPages from "@site/src/components/RelatedPages";

The Professional tier is for production and workload-heavy Aiven for Apache Kafka® services.
Create the service on Aiven Cloud or in your own cloud account with Bring Your Own Cloud
(BYOC).

## When to use the Professional tier

Use the Professional tier when you need:

- Higher throughput, storage, topic limits, or SLA than the
  [Developer tier](/docs/products/kafka/dev-tier/kafka-dev-tier)
- Aiven Cloud or BYOC deployment
- [Standard Kafka](/docs/products/kafka/standard-kafka-overview) or
  [Classic Kafka](/docs/products/kafka/classic-kafka-overview) on Aiven Cloud
- Kafka Connect on the same service tier

Free and Developer tier services use Classic Kafka.

## Deployment

- **Aiven Cloud**: Default path. New customers create Standard Kafka. If **Service type**
  appears, click **Standard** or **Classic**. You cannot change the service type after
  you create the service.
- **BYOC**: Classic Kafka with fixed plans. You can optionally enable diskless topics
  on supported custom clouds.

Standard Kafka is available on Aiven Cloud only.

## Create a service

- [Create an Aiven for Apache Kafka® Professional tier service](/docs/products/kafka/get-started/create-kafka-service)
- [Create an Apache Kafka® service with BYOC](/docs/products/kafka/get-started/create-kafka-service-byoc)

For compute, storage, and network billing, see
[Pricing for Aiven for Apache Kafka®](/docs/products/kafka/concepts/kafka-pricing).

<RelatedPages />

- [Get started with Aiven for Apache Kafka®](/docs/products/kafka/get-started/get-started-kafka)
- [Aiven for Apache Kafka® service tiers](/docs/products/kafka/get-started/service-tiers)
- [Standard Kafka overview](/docs/products/kafka/standard-kafka-overview)
- [Classic Kafka overview](/docs/products/kafka/classic-kafka-overview)
- [Create an Aiven for Apache Kafka® Professional tier service](/docs/products/kafka/get-started/create-kafka-service)
- [Create an Apache Kafka® service with BYOC](/docs/products/kafka/get-started/create-kafka-service-byoc)
