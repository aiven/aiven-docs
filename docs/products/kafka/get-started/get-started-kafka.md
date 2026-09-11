---
title: Get started with Aiven for Apache Kafka®
sidebar_label: Get started
---

Create a managed Apache Kafka® service on Aiven.
Choose the tier and deployment model that fit your workload, then send sample data
to verify end-to-end streaming.

## Prerequisites

- Create an Aiven account and sign in to the [Aiven Console](https://console.aiven.io).
- Create or select an Aiven project with permission to create services.

## Choose your path

Choose a path based on your workload and deployment needs:

- Start with [Free tier](/docs/products/kafka/free-tier/kafka-free-tier) for no-cost,
  low-throughput Kafka workloads.
- Use [Developer tier](/docs/products/kafka/dev-tier/kafka-dev-tier) for paid
  development and smaller production workloads.
- Use [Professional tier](/docs/products/kafka/get-started/professional-tier) for
  production workloads on Aiven Cloud or Bring Your Own Cloud.
- Use [Skills](#set-up-a-kafka-service-using-skills) for command-line
  setup and configuration.

To compare limits and features, see
[Aiven for Apache Kafka® service tiers](/docs/products/kafka/get-started/service-tiers).

## Create a service

After you choose a tier, create the service:

- [Create a free tier Aiven for Apache Kafka® service](/docs/products/kafka/free-tier/create-free-tier-kafka-service)
- [Create an Aiven for Apache Kafka® Developer tier service](/docs/products/kafka/dev-tier/create-dev-tier-kafka-service)
- [Create an Aiven for Apache Kafka® Professional tier service](/docs/products/kafka/get-started/create-kafka-service)
- [Create an Apache Kafka® service with BYOC](/docs/products/kafka/get-started/create-kafka-service-byoc)

## Set up a Kafka service using Skills

Use Skills to create and configure a Kafka service from the command line.

Install the Aiven Skills bundle:

```bash
npx skills add Aiven-Open/aiven-skills-bundle
```

To run this command, make sure you have the following:

- [Aiven CLI](/docs/tools/cli) installed and authenticated.
- Node.js installed so `npm` provides `npx`.

:::note
Skills operate on **Developer** and **Professional** tier services.
Create [Free tier](/docs/products/kafka/free-tier/kafka-free-tier) Kafka services in
the console.
:::

**Continue with:** [Set up Kafka using Skills](/docs/products/kafka/howto/set-up-kafka-with-skills).

## Generate sample data using the console

Use the built-in sample data generator to send events to a Kafka topic and confirm that
the service is working.

- Start the generator from the Kafka service overview in the console.
- Consume messages from the topic to verify connectivity.
- Validate access control, networking, and client configuration.

**After your service is running, continue with:** [Generate sample data in the console](/docs/products/kafka/howto/generate-sample-data).

## Generate data manually (optional)

Produce data manually to test application integrations or custom workloads.

- Create topics and configure Kafka clients.
- Produce and consume messages using client libraries, command-line tools, or
  container-based utilities.
- Use this approach for development, automation, or advanced testing scenarios.

**After your service is running, continue with:** [Generate sample data manually with Docker](/docs/products/kafka/howto/generate-sample-data-manually).

## Create and manage Kafka using AI assistants

Use the [Aiven MCP server](/docs/tools/mcp-server) to create Kafka services, manage
topics, produce and consume messages, and configure connectors from MCP-compatible
clients such as Cursor, Claude Code, VS Code, and Gemini CLI.

- Configure the Aiven MCP server in your AI assistant.
- Describe the service or operation you want in natural language.
- The assistant creates and manages Kafka resources through the Aiven API.

**Continue with:** [Set up the Aiven MCP server](/docs/tools/mcp-server).
