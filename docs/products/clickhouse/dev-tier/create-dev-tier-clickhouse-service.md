---
title: Create an Aiven for ClickHouse® Developer tier service
sidebar_label: Create a Developer tier service
description: Create an Aiven for ClickHouse Developer tier service using the Aiven Console.
keywords: [create, clickhouse, developer tier]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Create an Aiven for ClickHouse® Developer tier service in the [Aiven Console](https://console.aiven.io).

For features, specifications, and limitations, see
[Aiven for ClickHouse® Developer tier](/docs/products/clickhouse/dev-tier/clickhouse-dev-tier).

## Prerequisites

- An Aiven account. Sign up or sign in using the [Aiven Console](https://console.aiven.io).
- A project where you can create paid services.
- Billing set up for your organization. See
  [Billing and payment](/docs/platform/concepts/billing-and-payment).

## Create a Developer tier service using the Aiven Console

1. In your project, click <ConsoleLabel name="services" />.
1. Click **Create service**.
1. Select **ClickHouse®**.
1. In **Service tier**, select **Developer**.
1. In **Cloud**, select a geographical area, such as **Europe**.

   The Developer tier runs on DigitalOcean. You select an area, not a specific region.

1. In **Plan**, select **Developer-4**.
1. In **Service basics**, enter a service name.

   You can't change the service name after you create the service.

1. Review the **Service summary** and the estimated monthly price.
1. Click **Create service**.

The Aiven Console selects the ClickHouse version automatically. You can't change it during
service creation.

When the status is **Running**, your service is ready.

## Connect to your Developer tier service

1. Open your service.
1. On the <ConsoleLabel name="overview" /> page, click **Quick connect**.
1. Follow the connection instructions.

You can also find connection details in the **Connection information** section. For
more options, see
[Connect to Aiven for ClickHouse®](/docs/products/clickhouse/howto/list-connect-to-service).

## Upgrade your Developer tier service

1. Open your Developer tier service.
1. On the <ConsoleLabel name="overview" /> page, in **Service plan usage**, click
   **Change plan**.
1. In the **Quick upgrade** dialog, do one of the following:
   - Review the recommended Startup plan, and click **Upgrade**.
   - Click **Customize instead** to choose another configuration.
1. Follow the instructions in the Aiven Console.

You can also click **Change plan** in <ConsoleLabel name="servicesettings" /> >
**Service summary**.

The Developer tier runs on DigitalOcean, and the Startup plan isn't available on
DigitalOcean. When you upgrade, your service migrates to another cloud provider. Your
credentials and Aiven DNS records don't change, so your connection details stay the same.

:::note
You can't downgrade to the Developer tier after you upgrade.
:::

For more information, see
[Change the plan for your Aiven for ClickHouse® service](/docs/products/clickhouse/howto/change-service-plan).

<RelatedPages />

- [Aiven for ClickHouse® Developer tier](/docs/products/clickhouse/dev-tier/clickhouse-dev-tier)
- [Get started with Aiven for ClickHouse®](/docs/products/clickhouse/get-started)
- [Change the plan for your Aiven for ClickHouse® service](/docs/products/clickhouse/howto/change-service-plan)
