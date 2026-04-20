---
title: Aiven for Apache Kafka® Developer tier
sidebar_label: Developer tier overview
keywords: [kafka developer tier, kafka dev tier, kafka paid development, kafka prototype]
---

import RelatedPages from "@site/src/components/RelatedPages";

Aiven for Apache Kafka® **Developer tier** is a paid **Classic** Apache Kafka® plan for building, testing, and early stage application development.
It sits between the [Free tier](/docs/products/kafka/free-tier/kafka-free-tier) and
Professional tier plans.

The service uses the same managed Kafka implementation as other Classic plans, so
configuration and connection patterns remain consistent across tiers.

Each service includes Karapace Schema Registry, the REST Proxy, and Aiven for Apache Kafka®
Connect. Capacity, pricing, and limits are listed in
[Limits and specifications](#limits-and-specifications).

Manage the service using the [Aiven Console](https://console.aiven.io), the
[Aiven CLI](/docs/tools/cli), or the API. You can also use Skills on Developer
and Professional tier services.

## When to use the Developer tier

Use the Developer tier when:

- Throughput, topic count, retention, or storage exceed
  [Free tier](/docs/products/kafka/free-tier/kafka-free-tier) limits.
- You need Apache Kafka® Connect or [service integrations](/docs/platform/concepts/service-integration),
  which are not available on the Free tier.
- You want to move beyond the Free tier for development or testing without using a
  production-grade Professional plan.

## What the Developer tier includes

The Developer tier includes:

- Apache Kafka® on three nodes (1 CPU, 4 GB RAM per node).
- Karapace Schema Registry.
- REST Proxy.
- Aiven for Apache Kafka® Connect on a dedicated node with up to two connectors per
  service.
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
| Price | $49 USD/month; includes 3 nodes and 1 day retention |
| Throughput | 1 MB/s ingress / 2 MB/s egress |
| Topics | Up to 20 |
| Partitions | Up to 100 total across topics |
| Retention | 1-7 days; 1 day included; +$10 USD per 2 days |
| Storage | 50 GB |
| SLA | 99% |
| Kafka services per organization | Up to 5 |
| Kafka Connect | Yes; max 2 connectors on a dedicated node |
| Cloud provider | Region only in the Console; cloud selection available on Professional plans |
| Service integrations | Yes |
| Upgrade | To a Professional plan in the Console |
| Downgrade to free tier | Not supported |

For higher throughput, storage, retention, or connector limits, upgrade the service to a
**Professional** plan in the [Aiven Console](https://console.aiven.io).

## Compare service tiers

| Feature | Free | Developer | Professional |
|--------|------|-----------|--------------|
| Price | $0 | $49/month | Varies by plan |
| Throughput | Up to 250 KiB/s ingress/egress | 1 MB/s ingress / 2 MB/s egress | Higher, plan-dependent |
| Topics | Up to 5 | Up to 20 | Plan-dependent |
| Partitions | 1 per topic | Up to 100 total | Plan-dependent |
| Retention | Fixed | 1—7 days | Plan-dependent |
| Storage | Fixed | 50 GB | Plan-dependent |
| SLA | None | 99% | Up to 99.99%, plan-dependent |
| Kafka Connect | Not supported | Up to 2 connectors | Full support, plan-dependent |
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

:::note
You cannot move a Developer tier service back to the Free tier. After you upgrade to
Professional tier, whether you can move back to Developer tier depends on the service plan.
Use the [Aiven Console](https://console.aiven.io) to view allowed changes for your service.
:::

<RelatedPages/>

- [Create an Aiven for Apache Kafka® Developer tier service](/docs/products/kafka/dev-tier/create-dev-tier-kafka-service)
- [Manage Apache Kafka® parameters](/docs/products/kafka/howto/set-kafka-parameters)
- [Apache Kafka® upgrade procedure](/docs/products/kafka/concepts/upgrade-procedure)
