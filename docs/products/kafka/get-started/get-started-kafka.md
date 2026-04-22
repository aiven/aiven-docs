---
title: Get started with Aiven for Apache Kafka®
sidebar_label: Get started
---

Create a managed Apache Kafka® service on Aiven, use the Free tier where it fits your workload,
and send sample data to verify end-to-end streaming.

## Prerequisites

- Create an Aiven account and sign in to the [Aiven Console](https://console.aiven.io).
- Create or select an Aiven project with permission to create services.

## Free tier

The Free tier provides a fully managed Kafka service with limited resources.
For limits, regions, and supported features, see the
[Free tier overview](/docs/products/kafka/free-tier/kafka-free-tier).

- No payment method is required.
- Fixed resource limits support low-throughput workloads.
- Basic Kafka workflows are supported, including service creation and sample data
  generation.

**Continue with:** [Create a Kafka service using the Free tier](/docs/products/kafka/free-tier/create-free-tier-kafka-service).

## Developer tier

The Developer tier is a paid **Classic** plan with higher throughput, topic limits, and
retention than the
[Free tier](/docs/products/kafka/free-tier/kafka-free-tier). Each service includes
Karapace Schema Registry and the REST Proxy.
[Service integrations](/docs/platform/concepts/service-integration) are supported where
the Developer tier allows them. [Aiven for Apache Kafka® Connect](/docs/products/kafka/kafka-connect/get-started)
is available as a separate service.

Manage the service in the console, CLI, API, or with
[Skills](/docs/products/kafka/howto/set-up-kafka-with-skills). See
[Aiven for Apache Kafka® Developer tier](/docs/products/kafka/dev-tier/kafka-dev-tier)
for quotas, pricing, metrics export, and upgrades.

**Continue with:** [Create an Aiven for Apache Kafka® Developer tier service](/docs/products/kafka/dev-tier/create-dev-tier-kafka-service).

## Create an Inkless Kafka service

Inkless runs Apache Kafka 4.x and supports diskless topics that store data in cloud object
storage rather than on local disks. Compute capacity is sized based on stream load instead
of fixed hardware plans.

- Select **Inkless** as the service type.
- Choose **Aiven cloud** or **Bring your own cloud (BYOC)** as the deployment mode.
- On Aiven cloud, provide expected ingress, egress, and retention to estimate capacity
  and cost.
- On BYOC, select the BYOC environment, region, and an Inkless plan.

**Continue with:** [Create an Inkless Kafka service](/docs/products/kafka/get-started/create-inkless-service).

## Create a Classic Kafka service

Classic Kafka uses fixed plans with local broker storage. Tiered storage is available on
supported plans and cloud providers.

- Select **Classic Kafka** as the service type.
- Choose **Aiven cloud** or **BYOC** as the deployment mode.
- Select a plan that defines compute, memory, and storage.
- Optionally adjust disk capacity, enable tiered storage, and select the Kafka version.

**Continue with:** [Create a Classic Kafka service](/docs/products/kafka/get-started/create-classic-kafka-service).

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
Create [Free tier](/docs/products/kafka/free-tier/kafka-free-tier) Kafka services in the
console.
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
clients such as Cursor, Claude Code, and VS Code.

- Configure the Aiven MCP server in your AI assistant.
- Describe the service or operation you want in natural language.
- The assistant creates and manages Kafka resources through the Aiven API.

**Continue with:** [Set up the Aiven MCP server](/docs/tools/mcp-server).
