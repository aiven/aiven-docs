---
title: Aiven for Apache Kafka® Developer tier
sidebar_label: Developer tier overview
keywords: [kafka developer tier, kafka dev tier, kafka paid development, kafka prototype]
---

import RelatedPages from "@site/src/components/RelatedPages";

Aiven for Apache Kafka® Developer tier is a paid service tier for Classic Kafka that sits between the [Free tier](/docs/products/kafka/free-tier/kafka-free-tier) and Professional tier.
Use it for development, prototyping, testing, or production workloads that need more
throughput, more topics, longer retention, more storage, or
[service integrations](/docs/platform/concepts/service-integration) than the Free tier
provides, without committing to a Professional plan.
[Aiven for Apache Kafka® Connect](/docs/products/kafka/kafka-connect/get-started) is
available as a separately billed service.

For capacity, pricing, and service limits, see
[Limits and specifications](#limits-and-specifications).

## When to use the Developer tier

Use the Developer tier when:

- You need higher throughput, more topics, longer retention, or more storage than the
  [Free tier](/docs/products/kafka/free-tier/kafka-free-tier) offers.
- You need a paid Aiven for Apache Kafka® Connect service or
  [service integrations](/docs/platform/concepts/service-integration), neither of which
  is available on the Free tier.
- You need a paid environment for development, prototyping, testing, or smaller-scale
  production workloads without committing to a Professional plan.

## What the Developer tier includes

A Developer tier service includes:

- Apache Kafka® on two nodes with fixed compute and storage.
- Karapace Schema Registry and REST Proxy.
- A [sample data generator](/docs/products/kafka/howto/generate-sample-data) in the
  console for testing producers, consumers, and Karapace Schema Registry.
- Quick connect from the Kafka service overview page in the Aiven Console using
  **Set up your Stream** or **Connection information** to get connection parameters and
  sample client code. For details,
  see [Connect to Aiven for Apache Kafka®](/docs/products/kafka/howto/list-code-samples).
- Supported [service integrations](/docs/platform/concepts/service-integration),
  including Aiven for Apache Kafka® Connect and Prometheus.

### Automate workflows with Skills

Skills are ready-to-run workflows that automate common Kafka tasks, such as:

- Creating a Kafka service and configuring it end-to-end.
- Creating topics, users, and permissions.
- Generating sample data and validating the deployment.
- Configuring connectors and integrations.

Skills are available on Developer tier and Professional tier services.
Run them with
[`npx skills`](/docs/products/kafka/howto/set-up-kafka-with-skills) or in another
environment that supports Skills, such as an editor or AI assistant.
Skills use [Aiven CLI](/docs/tools/cli) internally and require an authenticated CLI
session. For details, see
[Set up Aiven for Apache Kafka® using Skills](/docs/products/kafka/howto/set-up-kafka-with-skills).

Manage Developer tier services from the [Aiven Console](https://console.aiven.io), the
[Aiven CLI](/docs/tools/cli), or the [Aiven API](/docs/tools/api).

## Limits and specifications

The following specifications apply to Developer tier services.

| Specification                   | Developer tier                                            |
|---------------------------------|-----------------------------------------------------------|
| Price                           | Starts at $35 per month for 1 day retention; pricing varies by cloud and geographical region |
| Nodes                           | 2                                                         |
| Throughput                      | 1 MB/s ingress, 2 MB/s egress                             |
| Topics                          | Up to 20                                                  |
| Partitions                      | Up to 100 per topic and 2000 max across the service      |
| Replication factor              | 1                                                         |
| Metadata mode                   | KRaft                                                     |
| Retention                       | 1, 2, or 3 days. Pricing varies by option and is shown in the Aiven Console |
| Storage                         | Fixed local storage per node                              |
| Kafka Connect                   | Optional service, billed separately                        |
| Cloud                           | Geographical region in the Aiven Console. Pricing varies by cloud |
| Service integrations            | Kafka Connect and Prometheus                              |
| Upgrade                         | To a Professional tier from the Aiven Console             |
| Downgrade to Free tier          | Not supported                                             |

Developer tier pricing depends on retention, cloud, and geographical region. Review
current pricing during service creation in the [Aiven Console](https://console.aiven.io)
and on [Aiven for Apache Kafka® pricing](https://aiven.io/pricing?product=kafka).

For higher throughput, storage, retention, or connector limits, upgrade your service to
a Professional plan in the [Aiven Console](https://console.aiven.io).

## Compare service tiers

| Feature                         | Free                              | Developer                     | Professional                 |
|---------------------------------|-----------------------------------|-------------------------------|------------------------------|
| Price                           | $0                                | Starts at $35 per month       | Varies by plan               |
| Throughput                      | Up to 250 KB/s ingress and egress | 1 MB/s ingress, 2 MB/s egress | Higher, plan-dependent       |
| Topics                          | Up to 5                           | Up to 20                      | Plan-dependent               |
| Partitions                      | 1 per topic                       | Up to 100 per topic           | Plan-dependent               |
| Nodes                           | 1                                 | 2                             | Plan-dependent               |
| Replication factor              | 1                                 | 1                             | Plan-dependent               |
| Metadata mode                   | KRaft                             | KRaft                         | KRaft                        |
| Retention                       | Fixed                             | 1, 2, or 3 days               | Plan-dependent               |
| Storage                         | Fixed                             | Fixed local storage per node  | Plan-dependent               |
| SLA                             | None                              | 99%                           | Up to 99.99%, plan-dependent |
| Kafka Connect                   | Not supported                     | Optional, billed separately   | Full support, plan-dependent |
| Service integrations            | Not supported                     | Kafka Connect, Prometheus     | Yes, plan-dependent          |
| Cloud and geographical region   | Fixed                             | Geographical region only      | Cloud and geographical region selectable |

For replication factor 3 or similar production redundancy, use a Professional plan.
Starting with Apache Kafka 3.9, new services use [KRaft](/docs/products/kafka/concepts/kraft-mode)
for metadata instead of ZooKeeper.

## Upgrade path

Upgrade to the Professional tier when the Developer tier no longer meets your
throughput, storage, or scaling needs. Professional tier supports higher throughput,
storage, topic limits, and SLA.

### Kafka and Kafka Connect tier compatibility

Aiven for Apache Kafka® and Aiven for Apache Kafka® Connect services that are
integrated with each other must run on the same service tier. Both services must
be on the Developer tier or both on the Professional tier.

This requirement affects how you upgrade integrated services.

To upgrade a Developer tier Kafka service with an integrated Kafka Connect service to
the Professional tier:

1. Power off the Kafka Connect service. This preserves the service and its configuration.
2. Upgrade the Kafka service to the Professional tier.
3. Upgrade the Kafka Connect service to the same tier.
4. Power on the Kafka Connect service.

For step-by-step instructions, see
[Upgrade the service](/docs/products/kafka/dev-tier/create-dev-tier-kafka-service#upgrade-the-service).

:::note
Developer tier services cannot be downgraded to the Free tier. Professional tier
downgrade options depend on the selected plan. Review supported changes in the
[Aiven Console](https://console.aiven.io).
:::

<RelatedPages/>

- [Create an Aiven for Apache Kafka® Developer tier service](/docs/products/kafka/dev-tier/create-dev-tier-kafka-service)
- [Manage Apache Kafka® parameters](/docs/products/kafka/howto/set-kafka-parameters)
- [Apache Kafka® upgrade procedure](/docs/products/kafka/concepts/upgrade-procedure)
