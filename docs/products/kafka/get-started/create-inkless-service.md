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
Inkless runs Kafka 4.x and supports both classic and diskless topics.

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io)
- An Aiven project where you can create Kafka services

## Create an Inkless service on Aiven Cloud

Inkless services are available on the **Professional** service tier. On Aiven Cloud,
you configure the cluster by selecting the ingress capacity and retention.

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
1. Optional: Enable **Diskless topics**, if available.
1. Select a **Retention** period.
1. In **Service basics**, enter:
   - **Name:** Enter a name for the service. You cannot change the service name after
     creation.
   - **Tags:** Optional. Add [resource tags](/docs/platform/howto/tag-resources) to
     organize your services.
1. Review the **Service summary**, and click **Create service**.

</TabItem>
<TabItem value="cli" label="CLI">

Create an Inkless Kafka service using the Aiven CLI:

```bash
avn service create SERVICE_NAME \
  --project PROJECT_NAME \
  --service-type kafka \
  --cloud CLOUD_REGION \
  --plan INKLESS_PLAN \
  -c kafka_version=4.0 \
  -c inkless.enabled=true
```

Parameters:

- `SERVICE_NAME`: Name of the Kafka service.
- `PROJECT_NAME`: Project that contains the service.
- `CLOUD_REGION`: Cloud region, for example `aws-eu-north-1` or `google-europe-west1`.
- `INKLESS_PLAN`: Inkless-capable plan for the selected cloud.

To list available Inkless-capable plans for a specific cloud:

```bash
avn service plans --service-type kafka --cloud CLOUD_REGION
```

### Enable diskless topics

To create diskless topics, add `-c kafka_diskless.enabled=true` to the
service creation command:

```bash
avn service create SERVICE_NAME \
  --project PROJECT_NAME \
  --service-type kafka \
  --cloud CLOUD_REGION \
  --plan INKLESS_PLAN \
  -c kafka_version=4.0 \
  -c inkless.enabled=true \
  -c kafka_diskless.enabled=true
```

</TabItem>
</Tabs>

## Create an Inkless service on Bring Your Own Cloud (BYOC)

You can run Inkless Kafka clusters in your own cloud account using
Bring Your Own Cloud (BYOC). Inkless clusters support classic and diskless topics.

Before creating services on BYOC, configure a BYOC environment.
For instructions, see [Create a custom cloud (BYOC)](/docs/platform/howto/byoc/create-cloud/create-custom-cloud).

<Tabs groupId="inkless-byoc">
<TabItem value="console" label="Console" default>

1. In the Aiven Console, open the project and select <ConsoleLabel name="services" />.
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

```bash
avn service create SERVICE_NAME \
  --project PROJECT_NAME \
  --service-type kafka \
  --cloud CUSTOM_CLOUD_REGION \
  --plan INKLESS_PLAN \
  -c kafka_version=4.0 \
  -c inkless.enabled=true \
  -c kafka_diskless.enabled=true
```

Parameters:

- `SERVICE_NAME`: Name of the Kafka service.
- `PROJECT_NAME`: Aiven project name.
- `CUSTOM_CLOUD_REGION`: BYOC region, such as `custom-aws-eu-central-1`.
- `INKLESS_PLAN`: Inkless-capable plan for the selected BYOC environment.

:::note
To enable diskless topics, set `kafka_diskless.enabled=true`. The selected plan must
support diskless topics.
:::

</TabItem>
</Tabs>

## Topic defaults

- **Classic topics:**
  - Remote storage is enabled automatically when you create a classic topic.
  - Local retention settings are enforced by the service and cannot be changed.
- **Diskless topics:** Diskless topics are available only if enabled when creating the service.

<RelatedPages />

- [Create a Kafka topic](/docs/products/kafka/howto/create-topic)
- [Diskless topics overview](/docs/products/kafka/diskless/concepts/diskless-topic-overview)
- [Generate sample data](/docs/products/kafka/howto/generate-sample-data)
