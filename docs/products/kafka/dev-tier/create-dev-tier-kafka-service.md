---
title: Create an Aiven for Apache Kafka® Developer tier service
sidebar_label: Create Developer tier service
keywords: [create, kafka, developer tier]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Create an Aiven for Apache Kafka® Developer tier service in the [Aiven Console](https://console.aiven.io) or with Skills.
Use it when the
[Free tier](/docs/products/kafka/free-tier/kafka-free-tier) no longer meets your needs,
or when you require capabilities not available on the Free tier, such as
[service integrations](/docs/platform/concepts/service-integration) or
[Aiven for Apache Kafka® Connect](/docs/products/kafka/kafka-connect/get-started).

For quotas, pricing, and features, see
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

- **Aiven Console**: Guided setup in the browser.
- **Skills**: Command-line setup using `npx` and the Aiven CLI.

## Create a Developer tier service using the Aiven Console

1. In your project, click <ConsoleLabel name="services" />.
1. Click **Create service**.
1. Select **Aiven for Apache Kafka®**.
1. In **Service tier**, select **Developer**.
1. In **Cloud**, select your geographical region from the broad areas shown, such as North
   America or Europe. The **Service summary** shows this under **Cloud**.

   :::note
   On the Developer tier, **Cloud** lists broad geographical areas only. To select a
   specific cloud provider and region, use the **Professional** tier. For details, see the
   message in the **Cloud** section of the Aiven Console.
   :::

1. In **Retention**, select a retention period between **1 day** and **3 days**.

   :::note
   Your estimated monthly cost depends on **retention**, **Cloud**, and geographical
   region. Check the **Service summary** for the price that applies to your selections.

   Retention options are 1 day, 2 days, or 3 days, with pricing adjusted
   accordingly.
   :::

1. In **Service basics**, enter a **Service name**.
1. Review the **Service summary** and estimated monthly cost.
1. Click **Create service**.

When the status is **Running**, your Kafka service is ready.

## Create a Developer tier service using Skills

Use Skills to create and configure the Kafka service from the command line.

1. Install the Skills bundle:

   ```bash
   npx skills add Aiven-Open/aiven-skills-bundle
   ```

   If your environment supports Skills, you can invoke them from compatible tools,
   such as AI-assisted editors or agents, by describing the task, for example:
   `Create a test Kafka service in Aiven`.

1. Run the Kafka service creation Skill:

   ```bash
   npx skills run kafka-create-service
   ```

1. Follow the prompts to select your project, **Developer** tier, and **Cloud**. The Skill
   might ask for cloud values that the Aiven CLI needs. Select the values that the Skill
   lists for the Developer tier.

The Skill creates and configures the service. When the run completes, the Kafka service is
ready to use.

For the full Skills workflow, see
[Set up Aiven for Apache Kafka® using Skills](/docs/products/kafka/howto/set-up-kafka-with-skills).

## After you create the service

When the service status is **Running**, you can:

- **Connect a client**: On your service's <ConsoleLabel name="overview" /> page, open
  **Quick connect** for connection details and sample code. See
  [Connect to Aiven for Apache Kafka®](/docs/products/kafka/howto/list-code-samples).
- **Run a sample workload**: Use the sample data generator to test producing and consuming
  messages. See
  [Generate sample data for Aiven for Apache Kafka®](/docs/products/kafka/howto/generate-sample-data).
- **Create topics**: Keep topic and partition counts within the
  [Developer tier limits](/docs/products/kafka/dev-tier/kafka-dev-tier#limits-and-specifications).
  See [Create a Kafka topic](/docs/products/kafka/howto/create-topic).
- **Run connectors**: Add an [Aiven for Apache Kafka® Connect](/docs/products/kafka/kafka-connect/get-started)
  service and integrate it with your Kafka service. See the
  [list of available connectors](/docs/products/kafka/kafka-connect/concepts/list-of-connector-plugins).

## Upgrade the service

Upgrade to the Professional tier when the Developer tier no longer meets your
throughput, storage, or scaling needs. For upgrade considerations, including Kafka
Connect compatibility, see
[Upgrade path](/docs/products/kafka/dev-tier/kafka-dev-tier#upgrade-path).

You can upgrade from the service overview or from service settings.

### Before you upgrade

If your Kafka service is integrated with a Kafka Connect service:

- Power off the Kafka Connect service before upgrading Kafka. You cannot upgrade
  Kafka while an integrated Kafka Connect service is running.
- After upgrading Kafka, upgrade the Kafka Connect service to the same tier
  before powering it on again.

Run both services on the same tier.

For details, see
[Kafka and Kafka Connect tier compatibility](/docs/products/kafka/dev-tier/kafka-dev-tier#kafka-and-kafka-connect-tier-compatibility).

### Upgrade from the service overview

1. Open your service's <ConsoleLabel name="overview" /> page.
1. In **Service usage**, click **Upgrade**.
1. Select **Professional** tier.
1. In **Cloud**, select a cloud provider, geographical region, and plan.
1. Click **Upgrade service**.

### Upgrade from service settings

1. In your service, click <ConsoleLabel name="servicesettings" />.
1. In **Service summary**, click **Upgrade**.
1. Select **Professional** tier.
1. In **Cloud**, select a cloud provider, geographical region, and plan.
1. Click **Upgrade service**.

### Limitations

- Downgrading from Developer tier to the Free tier is not supported.
- After upgrading to the Professional tier, available downgrade options depend on
  the selected plan. Review supported changes in the
  [Aiven Console](https://console.aiven.io).

<RelatedPages />

- [Developer tier overview](/docs/products/kafka/dev-tier/kafka-dev-tier)
- [Connect to Aiven for Apache Kafka®](/docs/products/kafka/howto/list-code-samples)
- [Generate sample data for Aiven for Apache Kafka®](/docs/products/kafka/howto/generate-sample-data)
- [Create a Kafka topic](/docs/products/kafka/howto/create-topic)
