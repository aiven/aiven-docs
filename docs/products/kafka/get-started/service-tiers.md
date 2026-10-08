---
title: Aiven for Apache Kafka® service tiers
sidebar_label: Service tiers
keywords:
  [
    kafka service tiers,
    kafka free tier,
    kafka developer tier,
    kafka professional tier,
  ]
---

import RelatedPages from "@site/src/components/RelatedPages";

Compare Aiven for Apache Kafka® Free, Developer, and Professional service tiers.

Each tier has different throughput, features, and deployment options.
Use the following tables to choose a tier, then open the tier page for limits
and next steps.

## Compare capacity and limits

The following table compares capacity, pricing, and limits across the three tiers.

| Feature              | Free                                  | Developer                                           | Professional                 |
| -------------------- | ------------------------------------- | --------------------------------------------------- | ---------------------------- |
| Price                | $0                                    | Starts at $35 per month                             | Varies by plan               |
| Throughput           | Up to 250 KiB/s ingress and egress    | 1 MB/s ingress, 2 MB/s egress                       | Higher, plan-dependent       |
| Topics               | Up to 5                               | Up to 20                                            | Plan-dependent               |
| Partitions           | 2 per topic                           | Up to 100 per topic                                 | Plan-dependent               |
| Nodes                | 1                                     | 2                                                   | Plan-dependent               |
| Replication factor   | 1                                     | 1                                                   | Plan-dependent               |
| Metadata mode        | KRaft                                 | KRaft                                               | KRaft                        |
| Retention            | Fixed                                 | 1, 2, or 3 days                                     | Plan-dependent               |
| Storage              | Fixed                                 | Fixed local storage per node                        | Plan-dependent               |
| SLA                  | None                                  | 99%                                                 | Up to 99.99%, plan-dependent |

Developer tier pricing depends on retention, cloud, and geographical region.
Review pricing during service creation in the
[Aiven Console](https://console.aiven.io) and on
[Aiven for Apache Kafka® pricing](https://aiven.io/pricing?product=kafka).

## Compare features and deployment

The following table compares features and deployment options across the three tiers.

| Feature                    | Free                         | Developer                         | Professional                          |
| -------------------------- | ---------------------------- | --------------------------------- | ------------------------------------- |
| Service type               | Classic Kafka                | Classic Kafka                     | Standard Kafka or Classic Kafka       |
| Deployment                 | Aiven Cloud                  | Aiven Cloud                       | Aiven Cloud or BYOC                   |
| Cloud and region           | Fixed                        | Geographical region only          | Cloud and region selectable           |
| Kafka Connect              | Not supported                | Optional, billed separately       | Full support, plan-dependent          |
| Service integrations       | Not supported                | Kafka Connect, Prometheus         | Yes, plan-dependent                   |
| Skills                     | Not supported                | Supported                         | Supported                             |
| Idle shutdown              | Yes                          | No                                | No                                    |
| Create from                | Aiven Console only           | Console, CLI, API, or Skills      | Console, CLI, API, or Skills          |
| Upgrade                    | To a paid tier               | To Professional tier              | Plan-dependent                        |
| Downgrade to Free tier     | Not applicable               | Not supported                     | Not supported                         |

For replication factor 3 or similar production redundancy, use a Professional plan.
Starting with Apache Kafka 3.9, new services use
[KRaft](/docs/products/kafka/concepts/kraft-mode) for metadata instead of ZooKeeper.

## When to use each tier

### Free tier

Use the Free tier for no-cost evaluation and low-throughput workloads.
You do not need a payment method.
The Free tier is Classic Kafka with fixed capacity and no SLA.

For limits and service behavior, see
[Aiven for Apache Kafka® free tier](/docs/products/kafka/free-tier/kafka-free-tier).

**Continue with:** [Create a free tier Aiven for Apache Kafka® service](/docs/products/kafka/free-tier/create-free-tier-kafka-service)

### Developer tier

Use the Developer tier for paid development and smaller production workloads.
The Developer tier is Classic Kafka with higher limits than the Free tier.
It supports Skills, service integrations, and optional Kafka Connect.

For limits, pricing, and upgrades, see
[Aiven for Apache Kafka® Developer tier](/docs/products/kafka/dev-tier/kafka-dev-tier).

**Continue with:** [Create an Aiven for Apache Kafka® Developer tier service](/docs/products/kafka/dev-tier/create-dev-tier-kafka-service)

### Professional tier

Use the Professional tier for production and workload-heavy environments.
You can deploy on Aiven Cloud or Bring Your Own Cloud.
Professional services can use Standard Kafka or Classic Kafka on Aiven Cloud.

For deployment options and service types, see
[Aiven for Apache Kafka® Professional tier](/docs/products/kafka/get-started/professional-tier).

**Continue with:**

- [Create an Aiven for Apache Kafka® Professional tier service](/docs/products/kafka/get-started/create-kafka-service)
- [Create an Apache Kafka® service with BYOC](/docs/products/kafka/get-started/create-kafka-service-byoc)

<RelatedPages />

- [Get started with Aiven for Apache Kafka®](/docs/products/kafka/get-started/get-started-kafka)
- [Aiven for Apache Kafka® free tier](/docs/products/kafka/free-tier/kafka-free-tier)
- [Aiven for Apache Kafka® Developer tier](/docs/products/kafka/dev-tier/kafka-dev-tier)
- [Aiven for Apache Kafka® Professional tier](/docs/products/kafka/get-started/professional-tier)
- [Pricing for Aiven for Apache Kafka®](/docs/products/kafka/concepts/kafka-pricing)
