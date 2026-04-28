---
title: Aiven for Apache Kafka® Developer tier
sidebar_label: Developer tier overview
keywords: [kafka developer tier, kafka dev tier, kafka paid development, kafka prototype]
---

import RelatedPages from "@site/src/components/RelatedPages";

Aiven for Apache Kafka® **Developer tier** is a paid **Classic** plan between the [Free tier](/docs/products/kafka/free-tier/kafka-free-tier) and Professional tier plans.
It provides higher throughput, topic limits, and retention than the Free tier. Each
service includes Karapace Schema Registry and the REST Proxy.

[Service integrations](/docs/platform/concepts/service-integration) are supported where
the Developer tier supports them.
[Aiven for Apache Kafka® Connect](/docs/products/kafka/kafka-connect/get-started) is
available from Developer tier onward as a separate service.

For capacity, pricing, and service limits, see
[Limits and specifications](#limits-and-specifications).

Manage the service using the [Aiven Console](https://console.aiven.io), the
[Aiven CLI](/docs/tools/cli), or the API. Skills are supported on Developer and
Professional tier services.

## When to use the Developer tier

Use the Developer tier when:

- Throughput, topic limits, retention, or storage exceed
  [Free tier](/docs/products/kafka/free-tier/kafka-free-tier) limits.
- You need a paid Aiven for Apache Kafka® Connect service (integrated with your cluster)
  or [service integrations](/docs/platform/concepts/service-integration), which are not
  available on the Free tier.
- You want to move beyond the Free tier for development or testing without using a
  production-grade Professional plan.

## What the Developer tier includes

The Developer tier includes:

- Apache Kafka® on two nodes with fixed compute and storage resources.
- Karapace Schema Registry.
- REST Proxy.
- Optional, separately billed
  [Aiven for Apache Kafka® Connect](/docs/products/kafka/kafka-connect/get-started) as a
  standalone service integrated with your cluster.
- [Service integrations](/docs/platform/concepts/service-integration) where this tier
  supports them.
- Prometheus-compatible metrics through a [Prometheus integration](/docs/platform/howto/integrations/prometheus-metrics).
  See [Aiven for Apache Kafka® metrics available via Prometheus](/docs/products/kafka/reference/kafka-metrics-prometheus).
- **Quick connect** on the Kafka service using **Set up your stream** or **Connection information**
  for connection parameters and sample client code. See
  [Connect to Aiven for Apache Kafka®](/docs/products/kafka/howto/list-code-samples).
- A sample data generator in the console for produce and consume tests.

## Use Skills to automate workflows

**Skills** are ready-to-run workflows that automate common Kafka tasks. Run them with the
Aiven CLI and `npx`, or through integrations that invoke the same commands.

With Skills, you can:

- Create a Kafka service and configure it end-to-end.
- Create topics, users, and permissions.
- Generate sample data and validate the deployment.
- Configure connectors and integrations.

Create Free tier Kafka services in the console. Skills are available on Developer and
Professional tier services. See
[Set up Aiven for Apache Kafka® using Skills](/docs/products/kafka/howto/set-up-kafka-with-skills).

## Limits and specifications

The following applies to Developer tier services.

| Specification | Developer tier |
|-------------------------------|----------------|
| Price | $29 USD/month, includes 2 nodes and 1 day retention |
| Throughput | 1 MB/s ingress / 2 MB/s egress |
| Topics | Up to 20 |
| Partitions | Up to 100 total across topics |
| Retention | 1-7 days, 1 day included, +$10 USD per 2 days |
| Storage | Fixed local storage per node |
| SLA | 99% |
| Kafka services per organization | Up to 5 |
| Kafka Connect | Optional add-on (paid) |
| Cloud provider | Region selection in the console |
| Service integrations | Yes, with limitations |
| Upgrade | To a Professional plan in the Console |
| Downgrade to free tier | Not supported |

For higher throughput, storage, retention, or connector limits, upgrade the service to a
**Professional** plan in the [Aiven Console](https://console.aiven.io).

## Compare service tiers

| Feature | Free | Developer | Professional |
|--------|------|-----------|--------------|
| Price | $0 | $29/month | Varies by plan |
| Throughput | Up to 250 KiB/s ingress and egress | 1 MB/s ingress, 2 MB/s egress | Higher, plan-dependent |
| Topics | Up to 5 | Up to 20 | Plan-dependent |
| Partitions | 1 per topic | Up to 100 total | Plan-dependent |
| Retention | Fixed | 1—7 days | Plan-dependent |
| Storage | Fixed | Fixed local storage per node | Plan-dependent |
| SLA | None | 99% | Up to 99.99%, plan-dependent |
| Kafka Connect | Not supported | Optional (paid) | Full support, plan-dependent |
| Service integrations | No | Yes, with limitations | Yes, plan-dependent |
| Cloud selection | Fixed | Region only | Cloud and region selectable |

## Upgrade path

Upgrade paths:

- Upgrade from Free tier to Developer tier
- Upgrade from Developer tier to Professional tier

Upgrade from Free tier to increase capacity and enable connectors and integrations.
Upgrade to Professional tier for higher throughput, storage, topic limits, and SLA.

Your service configuration remains consistent as you upgrade. Available cloud, region, and
plan options can differ by tier.

### Upgrade Kafka with Kafka Connect

When your Developer tier Kafka service includes an
[Aiven for Apache Kafka® Connect](/docs/products/kafka/kafka-connect/get-started) service
integrated with it, the two services must stay on compatible plans. Follow this order
when upgrading:

1. Upgrade the Kafka service before the Kafka Connect service. The Kafka Connect
   service cannot move to a higher plan while the Kafka service is still on Developer tier.
1. Power off the Kafka Connect service before you change the Kafka service plan.
   The Kafka Connect service must be powered off before you can upgrade the Kafka
   service plan.
1. After the Kafka service is on the new plan, upgrade the Kafka Connect service, then
   power it on.** If the Kafka service is on a higher plan but the Kafka Connect service
   is not, you cannot power it on.

Powering off Kafka Connect preserves the service and configuration. Make sure both
services use the same plan before powering Kafka Connect on again.

:::note
You cannot move a Developer tier service back to the Free tier. After you upgrade to
Professional tier, whether you can move back to Developer tier depends on the service plan.
Use the [Aiven Console](https://console.aiven.io) to view allowed changes for your service.
:::

<RelatedPages/>

- [Create an Aiven for Apache Kafka® Developer tier service](/docs/products/kafka/dev-tier/create-dev-tier-kafka-service)
- [Manage Apache Kafka® parameters](/docs/products/kafka/howto/set-kafka-parameters)
- [Apache Kafka® upgrade procedure](/docs/products/kafka/concepts/upgrade-procedure)
