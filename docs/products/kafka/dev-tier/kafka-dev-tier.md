---
title: Aiven for Apache Kafka® Developer tier
sidebar_label: Developer tier overview
keywords: [kafka developer tier, kafka dev tier, kafka paid development, kafka prototype]
---

import RelatedPages from "@site/src/components/RelatedPages";

Aiven for Apache Kafka® **Developer tier** is a paid **Classic** plan that sits between the [Free tier](/docs/products/kafka/free-tier/kafka-free-tier) and Professional tier plans.
It provides higher throughput, topic limits, and retention than the Free tier. Each
service includes Karapace Schema Registry and the REST Proxy.

[Service integrations](/docs/platform/concepts/service-integration) are supported where the Developer tier allows them. [Aiven for Apache Kafka® Connect](/docs/products/kafka/kafka-connect/get-started) is available as a separate service.

Capacity, pricing, and limits are listed in [Limits and specifications](#limits-and-specifications).

The service uses the same managed Kafka implementation as other Classic plans, so configuration and connection patterns remain consistent across tiers.

Manage the service using the [Aiven Console](https://console.aiven.io), the [Aiven CLI](/docs/tools/cli), or the API. You can also use Skills on Developer and Professional tier services.


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

- Create a Kafka service and configure it end to end.
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
| Cloud provider | Console: region only, Professional: full cloud/region |
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

- From Free tier to Developer tier in place.
- From Developer tier to **Professional** tier in the Aiven Console.

Upgrade from Free tier to increase capacity and enable connectors and integrations.
Upgrade to Professional tier for higher throughput, storage, topic limits, and SLA.

Developer tier uses the same managed Kafka implementation as Professional tier services, so
configuration remains consistent when you upgrade. Available options such as cloud, region,
and plan size can differ by tier.

### Upgrade Kafka with Kafka Connect

When your Developer tier Kafka project includes an
[Aiven for Apache Kafka® Connect](/docs/products/kafka/kafka-connect/get-started) service
integrated with your Kafka service, the two services must stay on compatible plans. Follow
this order when upgrading:

1. **Upgrade the Kafka service before Kafka Connect.** Kafka Connect cannot move to a
   higher plan while Kafka is still on Developer tier.
1. **Power off Kafka Connect before you change the Kafka plan.** Kafka Connect must be
   off before you can upgrade the Kafka service plan.
1. **After Kafka is on the new plan, upgrade Kafka Connect, then power it on.** If Kafka
   is on a higher plan but Kafka Connect is not, you cannot power it on.

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
