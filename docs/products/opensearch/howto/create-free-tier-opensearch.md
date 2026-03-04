---
title: Create a free tier Aiven for OpenSearch® service
sidebar_label: Create free tier service
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

You can create a free tier Aiven for OpenSearch® service to learn OpenSearch, test indexing and queries, or run small proof-of-concept workloads.

For details about throughput, capacity, and feature restrictions, see
[Free tier service limitations](/docs/products/opensearch/concepts/opensearch-free-tier).

## Prerequisites

- Signup or signin using the [Aiven Console](https://console.aiven.io)
- Aiven project

:::note
Each organization can have only one free tier Aiven for OpenSearch service.
:::

## Create a free tier service

1. In your project, click <ConsoleLabel name="services" />.
1. Click **Create service**.
1. Select **Aiven for Apache OpenSearch®**.
1. In **Service tier**, select **Free**.
   The free tier includes:
   - Up to 250 KiB/s total throughput
  - Fixed storage and performance limits
  - Basic monitoring for metrics and logs
  - A default OpenSearch version selected automatically
1. Review the **Cloud** section.
   The cloud provider is managed automatically for the free tier. You can select only a
   region group.
1. In **Service basics**, enter a **Service name**.
1. Review the **Service summary**.
1. Click **Create service**.

When the status changes to **Running**, your free tier OpenSearch service is ready to use.

To add sample data, use the sample data tools in the Aiven Console.

To connect your application, use **Quick connect** to get setup steps and sample code for
common programming languages.

## What's next

### Index or query data

Use your new Aiven for OpenSearch service so that data is indexed or queried within 24
hours from the service creation.

:::warning
Your new free tier Aiven for OpenSearch service is powered off automatically after 24
hours if you don't start using it or index or query any data. You receive a notification
before shutdown, and you can power on the service from the Aiven Console.
:::

### Upgrade the free tier service

You can upgrade the service at any time to

- Enable the following capabilities:

  - Cloud and region selection
  - Higher throughput and storage
  - Advanced OpenSearch features and service integrations
  - Support for tiered storage

- Remove limits and limitations on the following:

  - Throughput
  - Storage
  - Features

To upgrade in the [Aiven Console](https://console.aiven.io) from the service overview:

1. Open your service’s <ConsoleLabel name="overview" /> page.
1. In **Service usage**, click **Upgrade**.

To upgrade in the [Aiven Console](https://console.aiven.io) from service settings:

1. In your service, click <ConsoleLabel name="servicesettings" />.
1. In the **Service summary** section, click **Upgrade**.
1. Select a plan and click **Upgrade service**.

Upgrades apply immediately. Paid services cannot be downgraded to the free tier.

<RelatedPages />

- [OpenSearch free tier overview](/docs/products/opensearch/concepts/opensearch-free-tier)
