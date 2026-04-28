---
title: Create an Aiven for Apache Kafka® Developer tier service
sidebar_label: Create Developer tier service
keywords: [create, kafka, developer tier]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Create an Aiven for Apache Kafka® Developer tier **Classic** service when throughput, topic limits, retention, or storage exceed the [Free tier](/docs/products/kafka/free-tier/kafka-free-tier).
Use it to run Kafka Connect or integrations that are not available on the Free tier. For
quotas, pricing, and features, see
[Aiven for Apache Kafka® Developer tier](/docs/products/kafka/dev-tier/kafka-dev-tier).

## Prerequisites

- An Aiven account. Sign up or sign in using the [Aiven Console](https://console.aiven.io).
- A project where you can create paid services.
- For paid charges, billing set up for your organization if you use billing groups or
  payment methods on file. See [Billing and payment](/docs/platform/concepts/billing-and-payment).

## Choose how to create the service

Create a Developer tier service using one of the following:

- **Aiven Console**: guided setup.
- **Skills**: CLI-driven setup with `npx` and the Aiven CLI.

## Create a Developer tier service using the Aiven Console

1. In your project, click <ConsoleLabel name="services" />.
1. Click **Create service**.
1. Select **Aiven for Apache Kafka®**.
1. In **Service tier**, select **Developer**.
1. Choose your **Region**.

   :::note
   On Developer tier, you select a region only. The Console indicates that you can choose
   a specific cloud provider on the **Professional** tier.
   :::

1. In **Retention**, select a retention period between **1 day** and **7 days**.

   :::note
   The base price includes 1 day of data retention.

   You can increase retention to 3, 5, or 7 days. Each additional 2 days adds
   $10 USD per month.
   :::

1. In **Service basics**, enter a **Service name**.
1. Review the **Service summary** and estimated monthly cost.
1. Click **Create service**.

When the status changes to **Running**, your Kafka service is ready to use.

## Create a Developer tier service using Skills

Use Skills to create and configure the Kafka service from the command line.

1. Install the Skills bundle:

   ```bash
   npx skills add Aiven-Open/aiven-skills-bundle
   ```

   If your tool supports Skills, you can also invoke them through AI-enabled tools such as
   Claude Code, Cursor, or Copilot Chat by describing the task, for example:
   `Create a test Kafka service in Aiven`.

1. Run the Kafka service creation Skill:

   ```bash
   npx skills run kafka-create-service
   ```

1. Follow the prompts to select your project, **Developer** tier, and **region** options.

   :::note
   On **Developer** tier, the console collects a **region** only. Cloud selection is
   available on **Professional** tier plans. The Skill can still prompt for cloud and region
   so the CLI can place the service. Select the options the Skill lists for Developer tier.
   :::

The Skill creates and configures the service. When the run completes, the Kafka service is
ready to use.

For the full Skills workflow, see
[Set up Aiven for Apache Kafka® using Skills](/docs/products/kafka/howto/set-up-kafka-with-skills).

## After service creation

After the service status is **Running**:

- **Connect a client**: Open **Quick connect** on the service for connection parameters and
  sample code. See [Connect to Aiven for Apache Kafka®](/docs/products/kafka/howto/list-code-samples).
- **Run sample workload**: Use the sample data generator for produce and consume checks. See
  [Generate sample data for Aiven for Apache Kafka®](/docs/products/kafka/howto/generate-sample-data).
- **Define topics**: Stay within
  [Developer tier limits](/docs/products/kafka/dev-tier/kafka-dev-tier#limits-and-specifications).
  See [Create a Kafka topic](/docs/products/kafka/howto/create-topic).
- **Run connectors**: Add an [Aiven for Apache Kafka Connect](/docs/products/kafka/kafka-connect/get-started)
  service and integrate it with this Kafka service. See
  [list of available connectors](/docs/products/kafka/kafka-connect/concepts/list-of-connector-plugins).

## Upgrade the service

Upgrade to a higher **Professional** tier plan when quotas or features exceed Developer
tier limits.

For upgrade paths between Free, Developer, and **Professional** tiers, see
[Upgrade path](/docs/products/kafka/dev-tier/kafka-dev-tier#upgrade-path).

If you use a **Kafka Connect** service integrated with this Kafka service, upgrade Kafka
and Connect in the order described in
[Upgrade Kafka with Kafka Connect](/docs/products/kafka/dev-tier/kafka-dev-tier#upgrade-kafka-with-kafka-connect).

:::note
Before you upgrade this Kafka service, power off any connected **Kafka Connect** service
on **Professional** tier. A **Professional** Kafka Connect service cannot run with a
**Developer** tier Kafka service during the upgrade transition.
:::

To upgrade from the service overview:

1. Open your service's <ConsoleLabel name="overview" /> page.
1. In **Service usage**, click **Upgrade**.

Or upgrade from service settings:

1. In your service, click <ConsoleLabel name="servicesettings" />.
1. In **Service summary**, click **Upgrade**.
1. Select **Professional**, choose a cloud provider, region, and plan, then click
   **Upgrade service**.

Upgrades from Free tier to Developer tier stay on the same service. Upgrades to
Professional tier follow the console steps for cloud, region, and plan.

:::note
Downgrading from Developer tier to Free tier is not supported. After you upgrade to
**Professional** tier, returning to Developer tier depends on the plan. Use the
[Aiven Console](https://console.aiven.io) to review allowed plan changes. See
[Aiven for Apache Kafka® Developer tier](/docs/products/kafka/dev-tier/kafka-dev-tier).
:::

<RelatedPages />

- [Developer tier overview](/docs/products/kafka/dev-tier/kafka-dev-tier)
- [Connect to Aiven for Apache Kafka®](/docs/products/kafka/howto/list-code-samples)
- [Generate sample data for Aiven for Apache Kafka®](/docs/products/kafka/howto/generate-sample-data)
- [Create a Kafka topic](/docs/products/kafka/howto/create-topic)
