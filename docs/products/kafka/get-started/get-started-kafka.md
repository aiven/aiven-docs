---
title: Get started with Aiven for Apache Kafka®
sidebar_label: Get started
---

Create a managed Apache Kafka® service on Aiven, explore the Free tier, and send sample data to validate end-to-end streaming in minutes.

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

**Next step:** [Create a Kafka service using the Free tier](/docs/products/kafka/free-tier/create-free-tier-kafka-service).

## Create an Inkless Kafka service

Inkless runs Apache Kafka 4.x and supports diskless topics that store data in cloud object
storage rather than on local disks. Compute capacity is sized based on stream load instead
of fixed hardware plans.

- Select **Inkless** as the service type.
- Choose **Aiven cloud** or **Bring your own cloud (BYOC)** as the deployment mode.
- On Aiven cloud, provide expected ingress, egress, and retention to estimate capacity
  and cost.
- On BYOC, select the BYOC environment, region, and an Inkless plan.

**Next step:** [Create an Inkless Kafka service](/docs/products/kafka/get-started/create-inkless-service).

## Create a Classic Kafka service

Classic Kafka uses fixed plans with local broker storage. Tiered storage is available on
supported plans and cloud providers.

- Select **Classic Kafka** as the service type.
- Choose **Aiven cloud** or **BYOC** as the deployment mode.
- Select a plan that defines compute, memory, and storage.
- Optionally adjust disk capacity, enable tiered storage, and select the Kafka version.

**Next step:** [Create a Classic Kafka service](/docs/products/kafka/get-started/create-classic-kafka-service).

## Generate sample data using the console

Use the built-in sample data generator to send events to a Kafka topic and confirm that
the service is working.

- Start the generator from the Kafka service overview in the console.
- Consume messages from the topic to verify connectivity.
- Validate access control, networking, and client configuration.

**Next step:** [Generate sample data in the console](/docs/products/kafka/howto/generate-sample-data).

## Generate data manually (optional)

Produce data manually to test application integrations or custom workloads.

- Create topics and configure Kafka clients.
- Produce and consume messages using client libraries, command-line tools, or
  container-based utilities.
- Use this approach for development, automation, or advanced testing scenarios.

**Next step:** [Generate sample data manually with Docker](/docs/products/kafka/howto/generate-sample-data-manually).
