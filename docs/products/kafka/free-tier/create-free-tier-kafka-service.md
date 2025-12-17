---
title: Create a free tier Aiven for Apache Kafka® service
sidebar_label: Create free tier service
keywords: [create, kafka, free tier]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import LimitedBadge from "@site/src/components/Badges/LimitedBadge";
import RelatedPages from "@site/src/components/RelatedPages";

You can create a free tier Aiven for Apache Kafka® service to learn Kafka, test producers and consumers, or run small proof-of-concept workloads.

For details about throughput, topic limits, and feature restrictions, see
[Free tier service restrictions](/docs/products/kafka/free-tier/kafka-free-tier).

## Prerequisites

- An Aiven account (sign up or sign in at https://console.aiven.io)
- An Aiven project

:::note
Each organization can have only one free tier Kafka service
:::

## Create a free tier Kafka service

1. In your project, click <ConsoleLabel name="services" />.
1. Click **Create service**.
1. Select **Aiven for Apache Kafka®**.
1. In **Service tier**, select **Free**.
   The free tier includes:
   - Up to 250 KiB/s total throughput
   - Up to 5 topics, each with two partitions
   - Karapace Schema Registry and REST Proxy
1. Review the **Cloud** section.
   The cloud provider is managed automatically for the free tier. You can select only a
   region group.
1. In **Service basics**, enter a **Service name**.
1. Review the **Service summary**.
1. Click **Create service**.

When the status changes to **Running**, your free tier Kafka service is ready to use.

To stream sample data, use the sample data generator in the Aiven Console. It produces
test messages to your Kafka service. For details, see
[Generate sample data for Aiven for Apache Kafka®](/docs/products/kafka/howto/generate-sample-data).

To connect your application, use **Quick connect** to get setup steps and sample code for
common programming languages.

## After service creation

- If no data is produced or consumed for 24 hours, the service is powered off
  automatically. You receive a notification before shutdown, and you can power on the
  service from the
  Aiven Console.
- You can upgrade the service at any time to enable:
  - Cloud and region selection
  - Higher throughput and storage
  - Kafka Connect and service integrations
  - Support for tiered storage

## Upgrade the free tier service

You can upgrade from the free tier at any time to remove throughput, storage, and feature
limits.

To upgrade from the service overview:

1. Open your service’s <ConsoleLabel name="overview" /> page.
1. In **Service usage**, click **Upgrade**.

Or upgrade from service settings:

1. In your service, click <ConsoleLabel name="servicesettings" />.
1. In the **Service summary** section, click **Upgrade**.
1. Select a plan and click **Upgrade service**.

Upgrades apply immediately. Paid services cannot be downgraded to the free tier.

<RelatedPages />

- [Kafka free tier overview](/docs/products/kafka/free-tier/kafka-free-tier)
- [Create a Kafka topic](/docs/products/kafka/howto/create-topic)
