---
title: Create an Inkless Kafka service
sidebar_label: Create Inkless Kafka service
keywords: [create, kafka, cluster, inkless, byoc]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Create an Inkless Apache Kafka® service on Aiven Cloud or using Bring Your Own Cloud (BYOC).

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io)
- An Aiven project where you can create Kafka services

## Create an Inkless service on Aiven Cloud

Inkless services are available on the **Professional** tier. On Aiven Cloud,
configure the service by selecting ingress capacity and retention.

<Tabs groupId="inkless-aiven-cloud">
<TabItem value="console" label="Console" default>

1. In the [Aiven Console](https://console.aiven.io), open the project and
   select <ConsoleLabel name="services" />.
1. Click **Create service**.
1. Select **Apache Kafka®**.
1. In **Service tier**, select **Professional**.
1. In **Cluster type**, select **Inkless**.
1. In **Deployment mode**, select **Aiven cloud**.
1. Select a cloud provider and region.
1. Select the **Ingress capacity** for the service.
1. Optional: Enable **Diskless topics**. You can enable diskless topics later in
   <ConsoleLabel name="service settings" /> > **Advanced configuration**.
1. Select a **Retention** period.
1. In **Service basics**, enter:
   - **Name:** Enter a name for the service. You cannot change the service name after
     creation.
   - **Tags:** Optional. Add [resource tags](/docs/platform/howto/tag-resources) to
     organize your services.
1. Review the **Service summary**, and click **Create service**.

</TabItem>
<TabItem value="cli" label="CLI">

:::note
Inkless on Aiven Cloud uses throughput-based offerings rather than fixed plans.
The Aiven CLI does not list these offerings.
Create Inkless services on Aiven Cloud using the [Aiven Console](https://console.aiven.io).
:::

</TabItem>
</Tabs>

## Create an Inkless service on Bring Your Own Cloud (BYOC)

You can run Inkless Kafka clusters in your own cloud account using
Bring Your Own Cloud (BYOC). Inkless on BYOC supports classic and diskless topics.

Before creating services on BYOC, configure a BYOC environment.
For instructions, see [Create a custom cloud (BYOC)](/docs/platform/howto/byoc/create-cloud/create-custom-cloud).

<Tabs groupId="inkless-byoc">
<TabItem value="console" label="Console" default>

1. In the [Aiven Console](https://console.aiven.io), open the project and select <ConsoleLabel name="services" />.
1. Click **Create service**.
1. Select **Apache Kafka®**.
1. In **Service tier**, select **Professional**.
1. In **Cluster type**, select **Inkless**.
1. In **Deployment mode**, select **Bring your own cloud (BYOC)**.
1. In **Cloud**, select your BYOC environment and region.
1. Select a **plan**.
1. In **Service basics**, enter:
   - **Name:** Enter a name for the service. You cannot change the name after creation.
   - **Tags:** Optional. Add [resource tags](/docs/platform/howto/tag-resources) to
     organize your services.
1. Review the **Service summary**, and click **Create service**.

</TabItem>
<TabItem value="cli" label="CLI">

Create an Inkless Kafka service in a BYOC environment:

1. List available Kafka plans for your BYOC cloud and region. Plans that support Inkless
   end with `-inkless`.

   ```bash
   avn service plans --service-type kafka --cloud CUSTOM_CLOUD_REGION
   ```

1. Create the service using an Inkless-capable plan:

   ```bash
   avn service create SERVICE_NAME \
    --project PROJECT_NAME \
    --service-type kafka \
    --cloud CUSTOM_CLOUD_REGION \
    --plan INKLESS_PLAN \
    -c kafka_version=4.0 \
    -c tiered_storage.enabled=true \
    -c kafka_diskless.enabled=true
   ```

   :::note
   Set both `tiered_storage.enabled=true` and `kafka_diskless.enabled=true`.
   :::

Parameters:

- `SERVICE_NAME`: Name of the Kafka service.
- `PROJECT_NAME`: Aiven project name.
- `CUSTOM_CLOUD_REGION`: BYOC region, such as `custom-aws-eu-central-1`.
- `INKLESS_PLAN`: Inkless-capable plan for the selected BYOC environment.


</TabItem>
</Tabs>

After creating the service, create topics to store data streams. To create topics,
see [Create Kafka topics](/docs/products/kafka/howto/create-topic).


<RelatedPages />

- [Create a Kafka topic](/docs/products/kafka/howto/create-topic)
- [Diskless topics overview](/docs/products/kafka/diskless/concepts/diskless-topic-overview)
- [Generate sample data](/docs/products/kafka/howto/generate-sample-data)
