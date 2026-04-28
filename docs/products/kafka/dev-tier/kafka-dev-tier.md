---
title: Aiven for Apache Kafka® Developer tier
sidebar_label: Developer tier overview
keywords: [kafka developer tier, kafka dev tier, kafka paid development, kafka prototype]
---

import RelatedPages from "@site/src/components/RelatedPages";

Aiven for Apache Kafka® **Developer tier** is a paid **Classic Kafka** plan that sits between the [Free tier](/docs/products/kafka/free-tier/kafka-free-tier) and Professional tier.
Use it for development, prototyping, or test workloads that need more throughput, more
topics, longer retention, more storage, or
[service integrations](/docs/platform/concepts/service-integration) than the Free tier
provides, without committing to a Professional plan.
[Aiven for Apache Kafka® Connect](/docs/products/kafka/kafka-connect/get-started) is
available as a separately billed add-on.

For capacity, pricing, and service limits, see
[Limits and specifications](#limits-and-specifications).

## When to use the Developer tier

Use the Developer tier when:

- You need higher throughput, more topics, longer retention, or more storage than the
  [Free tier](/docs/products/kafka/free-tier/kafka-free-tier) offers.
- You need a paid Aiven for Apache Kafka® Connect service or
  [service integrations](/docs/platform/concepts/service-integration), neither of which
  is available on the Free tier.
- You want a paid environment for development or testing without committing to a
  Professional plan.

## What the Developer tier includes

A Developer tier service includes:

- Apache Kafka® on two nodes with fixed compute and storage.
- Karapace Schema Registry and REST Proxy.
- A sample data generator in the console for testing producers and consumers.
- Quick connect from the Kafka service overview page in the Aiven Console using
  **Set up your Stream** or **Connection information** to get connection parameters and
  sample client code. For details,
  see [Connect to Aiven for Apache Kafka®](/docs/products/kafka/howto/list-code-samples).
- Prometheus-compatible metrics through a
  [Prometheus integration](/docs/platform/howto/integrations/prometheus-metrics). For
  the available metrics, see
  [Aiven for Apache Kafka® metrics available via Prometheus](/docs/products/kafka/reference/kafka-metrics-prometheus).
- Optional [Aiven for Apache Kafka® Connect](/docs/products/kafka/kafka-connect/get-started),
  available as a standalone service that integrates with your cluster and is billed
  separately.
- [Service integrations](/docs/platform/concepts/service-integration), where this tier
  supports them.

### Automate workflows with Skills

**Skills** are ready-to-run workflows that automate common Kafka tasks, such as:

- Creating a Kafka service and configuring it end-to-end.
- Creating topics, users, and permissions.
- Generating sample data and validating the deployment.
- Configuring connectors and integrations.

Skills are available on Developer tier and Professional tier services. You run them
through the Aiven CLI, or with `npx` if you use Node.js. For details, see
[Set up Aiven for Apache Kafka® using Skills](/docs/products/kafka/howto/set-up-kafka-with-skills).

Manage Developer tier services from the [Aiven Console](https://console.aiven.io), the
[Aiven CLI](/docs/tools/cli), or the [Aiven API](/docs/tools/api).

## Limits and specifications

The following specifications apply to Developer tier services.

| Specification                   | Developer tier                                            |
|---------------------------------|-----------------------------------------------------------|
| Price                           | $29 per month, includes 2 nodes and 1 day of retention    |
| Throughput                      | 1 MB/s ingress, 2 MB/s egress                             |
| Topics                          | Up to 20                                                  |
| Partitions                      | Up to 100 total across topics                             |
| Retention                       | 1 to 7 days; 1 day included, +$10 per additional 2 days   |
| Storage                         | Fixed local storage per node                              |
| Kafka services per organization | Up to 5                                                   |
| Kafka Connect                   | Optional add-on, billed separately                        |
| Cloud provider                  | Region selection in the console                           |
| Service integrations            | Yes, with limitations                                     |
| Upgrade                         | To a Professional plan from the Aiven Console             |
| Downgrade to Free tier          | Not supported                                             |

For higher throughput, storage, retention, or connector limits, upgrade your service to
a Professional plan in the [Aiven Console](https://console.aiven.io).

## Compare service tiers

| Feature              | Free                              | Developer                     | Professional                 |
|----------------------|-----------------------------------|-------------------------------|------------------------------|
| Price                | $0                                | $29 per month                 | Varies by plan               |
| Throughput           | Up to 250 KB/s ingress and egress | 1 MB/s ingress, 2 MB/s egress | Higher, plan-dependent       |
| Topics               | Up to 5                           | Up to 20                      | Plan-dependent               |
| Partitions           | 1 per topic                       | Up to 100 total               | Plan-dependent               |
| Retention            | Fixed                             | 1 to 7 days                   | Plan-dependent               |
| Storage              | Fixed                             | Fixed local storage per node  | Plan-dependent               |
| SLA                  | None                              | 99%                           | Up to 99.99%, plan-dependent |
| Kafka Connect        | Not supported                     | Optional, billed separately   | Full support, plan-dependent |
| Service integrations | Not supported                     | Yes, with limitations         | Yes, plan-dependent          |
| Cloud selection      | Fixed                             | Region only                   | Cloud and region selectable  |

## Upgrade path

You can upgrade from Free tier to Developer tier, or from Developer tier to Professional
tier. Upgrade to Developer tier for higher limits, Kafka Connect support, and
integrations. Upgrade to Professional tier for higher throughput, storage, topic limits,
and SLA.

Your service configuration is preserved when you upgrade. The cloud, region, and plan
options available to you can differ by tier.

### Kafka and Kafka Connect tier compatibility

Aiven for Apache Kafka® and Aiven for Apache Kafka® Connect services that are
integrated with each other must run on the same service tier. Both services must
be on the Developer tier, or both must be on the Professional tier. A Kafka
service and its integrated Kafka Connect service cannot run on different tiers.

Within a tier, the two services do not need to use the same plan. For example, a
Professional tier Kafka service on `business-8` can be integrated with a
Professional tier Kafka Connect service on `startup-4`.

This compatibility requirement affects how you upgrade integrated services:

- Upgrade the Kafka service first. Kafka Connect cannot move to Professional
  until Kafka is also on Professional.
- Power off Kafka Connect before changing the Kafka service tier. Powering off
  Kafka Connect preserves the service and its configuration.
- After Kafka is upgraded, upgrade Kafka Connect to the same tier before
  powering it on again.

For the steps to perform an upgrade, see
[Upgrade the service](/docs/products/kafka/dev-tier/create-dev-tier-kafka-service#upgrade-the-service).

:::note
Developer tier services cannot be downgraded to Free tier. Professional tier
downgrade options depend on the current plan and the changes available in the
[Aiven Console](https://console.aiven.io).
:::

<RelatedPages/>

- [Create an Aiven for Apache Kafka® Developer tier service](/docs/products/kafka/dev-tier/create-dev-tier-kafka-service)
- [Manage Apache Kafka® parameters](/docs/products/kafka/howto/set-kafka-parameters)
- [Apache Kafka® upgrade procedure](/docs/products/kafka/concepts/upgrade-procedure)
