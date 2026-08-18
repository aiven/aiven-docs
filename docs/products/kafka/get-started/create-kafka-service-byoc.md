---
title: Create an Apache Kafka® service with bring your own cloud (BYOC)
sidebar_label: Create with BYOC
keywords: [create, kafka, service, byoc, classic, diskless]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Create an Aiven for Apache Kafka® service in your own cloud account with Bring Your Own Cloud (BYOC).
The service runs in your cloud account while Aiven manages the Kafka infrastructure
and operations.

BYOC uses Classic Kafka with fixed plans. Classic topics are available by default.
You can optionally enable diskless topics on supported custom clouds.

To create a Kafka service on Aiven Cloud, see
[Create an Aiven for Apache Kafka® Professional tier service](/docs/products/kafka/get-started/create-kafka-service).

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io)
- An Aiven project where you can create Kafka services

## Create a Kafka service with BYOC

BYOC Kafka services are available on the Professional service tier.

<Tabs groupId="kafka-byoc">
<TabItem value="console" label="Console" default>

1. In the [Aiven Console](https://console.aiven.io), open the project and
   click <ConsoleLabel name="services" />.
1. Click **Create service**.
1. Click **Apache Kafka®**.
1. In **Service tier**, click **Professional**.
1. In **Deployment mode**, click **Bring your own cloud (BYOC)**.

   If **No custom clouds available** appears,
   [request BYOC access](#request-byoc-access).

   If **Set up your custom cloud first** appears,
   [set up a custom cloud](#set-up-a-custom-cloud).

1. Optional: Click **Enable diskless topics**.

   If **Diskless topics with BYOC aren't enabled for your account yet** appears,
   [request diskless topics for a custom cloud](#request-diskless-topics-for-a-custom-cloud).

1. In **Cloud**, click a cloud provider and a custom cloud.
1. In **Plan**, click a plan.
1. Optional: If **Additional disk storage** is available, adjust the disk size.
1. Optional: If **Enable tiered storage** appears, click it to enable
   [tiered storage](/docs/products/kafka/concepts/kafka-tiered-storage).

   :::note
   Enabling diskless topics also enables tiered storage for classic
   topics on the service.
   :::

1. In **Service basics**, enter:

   - **Name**: Enter a name for the service. You cannot change the name after you
     create the service.
   - **Version**: Click a Kafka version. The default version is preselected.
   - **Tags**: Optional. Add
     [resource tags](/docs/platform/howto/tag-resources) to organize your services.

1. Review the **Service summary**, then click **Create service**.
1. Wait until the service status is **Running**.

</TabItem>
<TabItem value="cli" label="CLI">

Create a BYOC Kafka service using the Aiven CLI:

```bash
avn service create SERVICE_NAME \
  --project PROJECT_NAME \
  --service-type kafka \
  --cloud CUSTOM_CLOUD_REGION \
  --plan PLAN_NAME
```

Replace the following:

- `SERVICE_NAME`: name of the Kafka service
- `PROJECT_NAME`: Aiven project name
- `CUSTOM_CLOUD_REGION`: custom cloud region, such as `custom-aws-eu-central-1`
- `PLAN_NAME`: Kafka plan available in the custom cloud, such as `business-4`

Optional: Enable diskless topics when you create the service.
Use a Business or Premium `-inkless` plan and a custom cloud that supports
diskless topics:

```bash
avn service create SERVICE_NAME \
  --project PROJECT_NAME \
  --service-type kafka \
  --cloud CUSTOM_CLOUD_REGION \
  --plan INKLESS_PLAN_NAME \
  -c kafka_version=4.1 \
  -c tiered_storage.enabled=true \
  -c kafka_diskless.enabled=true
```

Replace `INKLESS_PLAN_NAME` with a plan such as `business-8-inkless`.

</TabItem>
</Tabs>

For more information about diskless topics, see
[Diskless topics for Apache Kafka®](/docs/products/kafka/diskless/concepts/diskless-topic-overview).

## Request BYOC access {#request-byoc-access}

If **No custom clouds available** appears after you click
**Bring your own cloud (BYOC)**:

- Click **Request access**.

Aiven reviews the request and contacts you about enabling BYOC for your organization.
After BYOC is enabled, set up a custom cloud and return to create the service.

For eligibility and the organization-admin process, see
[Enable BYOC](/docs/platform/howto/byoc/enable-byoc).

## Set up a custom cloud {#set-up-a-custom-cloud}

If **Set up your custom cloud first** appears:

1. Click **Go to Admin**.
1. Create a custom cloud and assign it to the project.
   For more information, see
   [Create a custom cloud](/docs/platform/howto/byoc/create-cloud/create-custom-cloud).
1. Return to create the service after the custom cloud is ready.

## Request diskless topics for a custom cloud {#request-diskless-topics-for-a-custom-cloud}

If **Diskless topics with BYOC aren't enabled for your account yet** appears after
you click **Enable diskless topics**:

1. Click **Request access**.
1. In **Select a cloud to enable diskless topics**, click one or more custom clouds.
1. Click **Send request**.

Aiven reviews the request and contacts you with the next steps.

After diskless topics are enabled for those custom clouds, return to create the service
and click **Enable diskless topics**.

<RelatedPages />

- [Create an Aiven for Apache Kafka® Professional tier service](/docs/products/kafka/get-started/create-kafka-service)
- [Bring your own cloud (BYOC)](/docs/platform/concepts/byoc)
- [Enable BYOC](/docs/platform/howto/byoc/enable-byoc)
- [Create a custom cloud](/docs/platform/howto/byoc/create-cloud/create-custom-cloud)
- [Diskless topics for Apache Kafka®](/docs/products/kafka/diskless/concepts/diskless-topic-overview)
- [Create a Kafka topic](/docs/products/kafka/howto/create-topic)
