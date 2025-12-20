---
title: Get started with Apache Kafka® MirrorMaker 2
sidebar_label: Get started
keywords: [create, mirrormaker2, replication, kafka]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";

import RelatedPages from "@site/src/components/RelatedPages";

Create an Apache Kafka® MirrorMaker 2 service and connect it to your Aiven for Apache Kafka® service.

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io).
- An Aiven project with at least one running Aiven for Apache Kafka® service. To create
  one, see [Create an Aiven for Apache Kafka service](/docs/products/kafka/create-kafka-service).

## Create an Apache Kafka® MirrorMaker 2 service

You can create the service from the Kafka service's integrations page.

1. In the [Aiven Console](https://console.aiven.io), open your project.
1. Open the Aiven for Apache Kafka® service to replicate.
1. Click <ConsoleLabel name="integrations" />.
1. Under **Aiven services**, select **Apache Kafka MirrorMaker**.
1. Choose one of the following:
   - **Existing service** to connect to a MirrorMaker 2 service that is already running
   - **New service** to create a dedicated MirrorMaker 2 service
1. If you select **New service**, click **Create service** to open the service creation
   page in a new browser tab.

### Create new MirrorMaker 2 service

1. On the **Create service** page, select a **Cloud** and region.
1. Select a **Plan**.
1. In **Service basics**, enter a **service name**.

   :::important
   You cannot change the service name after creation.
   :::

1. Review the **Service summary** for the region, plan, and estimated price.
1. Click **Create service**.

The service status changes to **Rebuilding**.
When it changes to **Running**, the service is ready.

### Connect the Kafka service to MirrorMaker 2

After creating the MirrorMaker 2 service:

1. Return to the browser tab with the integration screen.
1. Select **Existing service**.
1. Choose the MirrorMaker 2 service you created.
1. Click **Continue**.
1. Enter a **Cluster alias**.

   The alias identifies the Kafka cluster within MirrorMaker 2.
   You cannot modify it after the integration is created.

1. Click **Enable**.

You are redirected to the MirrorMaker 2 service overview page.
Use the **Replication flows** view to define source and target clusters.

<RelatedPages/>

- Browse the [Aiven examples repository](https://github.com/aiven/aiven-examples) for
  sample code.
- Generate sample events with the
  [Python fake data producer](https://github.com/aiven/python-fake-data-producer-for-apache-kafka).
