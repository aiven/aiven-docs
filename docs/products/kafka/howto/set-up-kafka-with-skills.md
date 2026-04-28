---
title: Set up Aiven for Apache Kafka® using Skills
sidebar_label: Set up using Skills
keywords: [kafka, skills, automation, cli, developer tier]
---

import RelatedPages from "@site/src/components/RelatedPages";

Use [Skills to automate Kafka workflows](/docs/products/kafka/dev-tier/kafka-dev-tier#automate-workflows-with-skills) to create and configure an Aiven for Apache Kafka® service from the command line.
A Skill can create a service and configure topics, access control lists (ACLs), and
Karapace Schema Registry.

:::note
If you use the [Free tier](/docs/products/kafka/free-tier/kafka-free-tier), create
services in the [Aiven Console](https://console.aiven.io). Skills are available only on
**Developer** and **Professional** tiers.
:::

## Prerequisites

- An Aiven account and a project where you can create services.
- [Aiven CLI](/docs/tools/cli) installed and authenticated.
- [Node.js](https://nodejs.org/) installed so `npm` provides `npx`.

## Install the Skills bundle

Install the Aiven Skills bundle:

```bash
npx skills add Aiven-Open/aiven-skills-bundle
```

## Run the Kafka service Skill

Start the Kafka service creation Skill:

```bash
npx skills run kafka-create-service
```

Follow the prompts to choose your project, cloud, and region from the options the Skill
shows, and your service tier: **Developer** or **Professional**.

:::note
If you select **Developer** tier, the **Aiven Console** only asks for a **region** when
you create the service there. The Skill may still prompt for **cloud** and **region** so
the CLI can create the service—pick the options the Skill offers for Developer tier.
:::

When the run finishes, your service is configured and ready to use. For more about what
Skills can automate, see
[Use Skills to automate workflows](/docs/products/kafka/dev-tier/kafka-dev-tier#automate-workflows-with-skills).

## Use an AI agent

If your editor or automation exposes Skills, trigger the same shell commands through that
integration. Local `npx`, an authenticated Aiven CLI session, or an equivalent documented
setup is still required.

## Next steps

- [Connect to Aiven for Apache Kafka®](/docs/products/kafka/howto/list-code-samples)
- [Generate sample data for Aiven for Apache Kafka®](/docs/products/kafka/howto/generate-sample-data)
- [Create a Kafka topic](/docs/products/kafka/howto/create-topic)

<RelatedPages />

- [Aiven for Apache Kafka® Developer tier](/docs/products/kafka/dev-tier/kafka-dev-tier)
