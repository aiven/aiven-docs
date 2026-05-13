---
title: Get started with Aiven for Apache Kafka®
sidebar_label: Get started
---

import LimitedBadge from "@site/src/components/Badges/LimitedBadge";

Create a managed Apache Kafka® service on Aiven.
Choose the tier and deployment model that fit your workload, then send sample data
to verify end-to-end streaming.

## Prerequisites

- Create an Aiven account and sign in to the [Aiven Console](https://console.aiven.io).
- Create or select an Aiven project with permission to create services.

## Choose your path

Choose one of the following paths based on your workload and platform
needs:

- Start with [Free tier](#free-tier) for no-cost, low-throughput Kafka
  workloads.
- Use [Developer tier](#developer-tier) for paid development and smaller
  production workloads.
- Create [Inkless Kafka](#create-an-inkless-kafka-service) for
  cloud-object-storage-backed topics.
- Create [Classic Kafka](#create-a-classic-kafka-service) for fixed plans
  with local broker storage.
- Use [Skills](#set-up-a-kafka-service-using-skills) for command-line
  setup and configuration.

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

The Developer tier is a paid service tier for Classic Kafka.
It sits between the [Free tier](/docs/products/kafka/free-tier/kafka-free-tier) and
Professional tier.
Use it for development, prototyping, testing, or production workloads.
It provides more capacity and paid-only features than the Free tier.

For limits, pricing, Karapace, Connect, integrations, and upgrades, see
[Aiven for Apache Kafka® Developer tier](/docs/products/kafka/dev-tier/kafka-dev-tier).
Manage the service in the console, CLI, API, or with
[Skills](/docs/products/kafka/howto/set-up-kafka-with-skills).

**Continue with:** [Create a Kafka service using the Developer tier](/docs/products/kafka/dev-tier/create-dev-tier-kafka-service).

## Create an Inkless Kafka service

Inkless runs Apache Kafka 4.x and supports diskless topics that store data in cloud object
storage rather than on local disks. Compute capacity is sized based on stream load instead
of fixed hardware plans.

- Select **Inkless** as the service type.
- Select **Aiven cloud** or **Bring your own cloud (BYOC)** as the deployment mode.
- On Aiven cloud, select **AWS**, **Google**, or **Azure** and a region;
  then provide expected ingress, egress, and retention to estimate capacity and cost.
- On BYOC, select the BYOC environment, region, and an Inkless plan.

**Continue with:** [Create an Inkless Kafka service](/docs/products/kafka/get-started/create-inkless-service).

## Create a Classic Kafka service

Classic Kafka uses fixed plans with local broker storage. Tiered storage is available on
supported plans and cloud providers.

- Select **Classic Kafka** as the service type.
- Select **Aiven cloud** or **BYOC** as the deployment mode.
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

:::note
The Aiven MCP server is in <LimitedBadge/>. Request access during the authentication
flow when you first connect.
:::

Use the [Aiven MCP server](/docs/tools/mcp-server) to create Kafka services, manage
topics, produce and consume messages, and configure connectors from MCP-compatible
clients such as Cursor, Claude Code, VS Code, and Gemini CLI.

- Configure the Aiven MCP server in your AI assistant.
- Describe the service or operation you want in natural language.
- The assistant creates and manages Kafka resources through the Aiven API.

**Continue with:** [Set up the Aiven MCP server](/docs/tools/mcp-server).
