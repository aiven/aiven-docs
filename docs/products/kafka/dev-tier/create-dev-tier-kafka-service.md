---
title: Create an Aiven for Apache Kafka® Developer tier service
sidebar_label: Create Developer tier service
keywords: [create, kafka, developer tier]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Create an Aiven for Apache Kafka® Developer tier Classic Kafka service when throughput, topic limits, retention, or storage exceed the [Free tier](/docs/products/kafka/free-tier/kafka-free-tier).
Use it to run Kafka Connect or integrations that are not available on the Free tier. For
quotas, pricing, and features, see
[Aiven for Apache Kafka® Developer tier](/docs/products/kafka/dev-tier/kafka-dev-tier).

## Prerequisites

- An Aiven account. Sign up or sign in using the [Aiven Console](https://console.aiven.io).
- A project where you can create paid services.
- If you use paid services, set up billing for your organization. See
  [Billing and payment](/docs/platform/concepts/billing-and-payment).
- To create the service with Skills, install the [Aiven CLI](/docs/tools/cli) and
  authenticate. You also need [Node.js](https://nodejs.org/) to run `npx` commands.

## Choose how to create the service

Use one of the following:

- **Aiven Console**: guided setup in the browser.
- **Skills**: command-line setup with `npx` and the Aiven CLI.

## Create a Developer tier service using the Aiven Console

1. In your project, click <ConsoleLabel name="services" />.
1. Click **Create service**.
1. Select **Aiven for Apache Kafka®**.
1. In **Service tier**, select **Developer**.
1. Choose your **Region**.

   :::note
   On the Developer tier, you can select a region only. To choose a specific cloud
   provider, you need the Professional tier.
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
   When you create a Developer tier service in the Aiven Console, you only choose a
   **region**. On **Professional** tier plans, you can also choose the cloud provider. The
   Skill can still ask for **cloud** and **region** so the CLI can create the service.
   Select the options the Skill lists for Developer tier.
   :::

The Skill creates and configures the service. When the run completes, the Kafka service is
ready to use.

For the full Skills workflow, see
[Set up Aiven for Apache Kafka® using Skills](/docs/products/kafka/howto/set-up-kafka-with-skills).

## After you create the service

When the service status is **Running**, you can:

- **Connect a client**: On your service's <ConsoleLabel name="overview" /> page, open
  **Quick connect** for connection details and sample code. See
  [Connect to Aiven for Apache Kafka®](/docs/products/kafka/howto/list-code-samples).
- **Run a sample workload**: Use the sample data generator to test produce and consume
  operations. See
  [Generate sample data for Aiven for Apache Kafka®](/docs/products/kafka/howto/generate-sample-data).
- **Create topics**: Keep topic and partition counts within the
  [Developer tier limits](/docs/products/kafka/dev-tier/kafka-dev-tier#limits-and-specifications).
  See [Create a Kafka topic](/docs/products/kafka/howto/create-topic).
- **Run connectors**: Add an [Aiven for Apache Kafka Connect](/docs/products/kafka/kafka-connect/get-started)
  service and integrate it with your Kafka service. See the
  [list of available connectors](/docs/products/kafka/kafka-connect/concepts/list-of-connector-plugins).

## Upgrade the service

Upgrade to a Professional tier plan when Developer tier limits no longer meet
your needs. For upgrade paths between Free, Developer, and Professional tiers,
see [Upgrade path](/docs/products/kafka/dev-tier/kafka-dev-tier#upgrade-path).

You can upgrade from the service overview or from service settings.

### Before you upgrade

If your Kafka service is integrated with a Kafka Connect service, power off the
Kafka Connect service before you upgrade the Kafka service. You cannot upgrade the
Kafka service while an integrated Kafka Connect service is powered on.

After you upgrade the Kafka service, upgrade the Kafka Connect service to the
same tier before you power it back on. Both services must stay on the same
tier.

For details, see
[Kafka and Kafka Connect tier compatibility](/docs/products/kafka/dev-tier/kafka-dev-tier#kafka-and-kafka-connect-tier-compatibility).

### Upgrade from the service overview

1. Open your service's <ConsoleLabel name="overview" /> page.
1. In **Service usage**, click **Upgrade**.
1. Select **Professional**, choose a cloud provider, region, and plan, and then
   click **Upgrade service**.

### Upgrade from service settings

1. In your service, click <ConsoleLabel name="servicesettings" />.
1. In **Service summary**, click **Upgrade**.
1. Select **Professional**, choose a cloud provider, region, and plan, and then
   click **Upgrade service**.

### Limitations

- Downgrading from Developer tier to Free tier is not supported.
- After you upgrade to Professional tier, the downgrade options available to
  you depend on the plan you chose. To review supported plan changes, use the
  [Aiven Console](https://console.aiven.io).

For more information, see
[Aiven for Apache Kafka® Developer tier](/docs/products/kafka/dev-tier/kafka-dev-tier).

<RelatedPages />

- [Developer tier overview](/docs/products/kafka/dev-tier/kafka-dev-tier)
- [Connect to Aiven for Apache Kafka®](/docs/products/kafka/howto/list-code-samples)
- [Generate sample data for Aiven for Apache Kafka®](/docs/products/kafka/howto/generate-sample-data)
- [Create a Kafka topic](/docs/products/kafka/howto/create-topic)
