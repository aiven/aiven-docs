---
title: Create an Inkless Kafka service
sidebar_label: Create Inkless Kafka service
keywords: [create, kafka, cluster, inkless, byoc]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Create an Inkless Apache Kafka® service on Aiven, either on Aiven cloud or using Bring Your Own Cloud (BYOC).
Inkless runs Kafka 4.x and supports both classic topics and diskless topics, depending
on the service configuration. Classic topics store data in managed remote storage,
while diskless topics store data directly in cloud object storage.

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io)
- An Aiven project where you can create Kafka services

## Create an Inkless service on Aiven Cloud

Inkless services are available on the **Professional** service tier. On Aiven Cloud,
the cluster is configured based on the selected produce rate and retention.

<Tabs groupId="inkless-aiven-cloud">
<TabItem value="console" label="Console" default>

1. In the [Aiven Console](https://console.aiven.io), open the project and
   select <ConsoleLabel name="services" />.
1. Click **Create service**.
1. Select **Inkless** as the cluster type.
1. Select **Professional** as the service tier.
1. Select the deployment mode:
   - **Aiven Cloud**, or
   - **Bring your own cloud (BYOC)**.
1. Choose a cloud provider and region.
1. Select the expected **Produce rate** for the service.
1. If available, enable **Diskless topics**.
1. Select a **Retention** period.
1. In **Service basics**, enter:
   - **Name:** Enter a name for the service. You cannot change the service name after
     creation.
   - **Tags:** Optional. Add [resource tags](/docs/platform/howto/tag-resources) to
     organize your services.
1. Review the **Service summary**, and click **Create service**.

</TabItem>
<TabItem value="cli" label="CLI">

Use the Aiven CLI to create an Apache Kafka® service using the Inkless cluster type.

```bash
avn service create SERVICE_NAME \
  --project PROJECT_NAME \
  --service-type kafka \
  --cloud CLOUD_REGION \
  --plan INKLESS_PLAN \
  -c kafka_version=4.0 \
  -c tiered_storage.enabled=true \
  -c inkless.enabled=true
```

Parameters:

- `SERVICE_NAME`: Name of the Kafka service
- `PROJECT_NAME`: Project that contains the service
- `CLOUD_REGION`: Cloud region, for example aws-eu-north-1 or google-europe-west1
- `INKLESS_PLAN`: Inkless-capable plan that represents the selected produce rate

Optional configuration:

Use `kafka_diskless.enabled=true` to enable diskless topics. Set this only if you plan
to create diskless topics.

Example with diskless topics enabled:

```bash
avn service create SERVICE_NAME \
  --project PROJECT_NAME \
  --service-type kafka \
  --cloud CLOUD_REGION \
  --plan INKLESS_PLAN \
  -c kafka_version=4.0 \
  -c tiered_storage.enabled=true \
  -c inkless.enabled=true \
  -c kafka_diskless.enabled=true
```

Plan names may change over time. Run `avn service plan-list --service-type kafka` to
list the current Inkless-capable plans.

</TabItem>
</Tabs>

## Create an Inkless service on Bring your own cloud (BYOC)

You can run Inkless Kafka clusters in your own cloud account using Bring Your Own Cloud (BYOC). Inkless clusters support classic topics and, when supported by the service configuration, diskless topics.

Before you can create services on BYOC, you must set up a BYOC environment.
See [Create a custom cloud (BYOC)](/docs/platform/howto/byoc/create-cloud/create-custom-cloud).

<Tabs groupId="inkless-byoc">
<TabItem value="console" label="Console" default>

1. In the Aiven Console, open the project and select <ConsoleLabel name="services" />.
1. Click **Create service**.
1. Select **Apache Kafka®**.
1. Select **Inkless** as the cluster type.
1. Select **Professional** as the service tier.
1. Select **Bring your own cloud (BYOC)** as the deployment mode.
1. In the **Cloud** section, choose your BYOC environment and region.
1. Select an **Inkless plan**.
1. In **Service basics**, enter:
   - **Name:** Enter a name for the service. You cannot change the name after creation.
   - **Tags:** Optional. Add [resource tags](/docs/platform/howto/tag-resources) to
     organize your services.
1. Review the **Service summary**, and click **Create service**.

</TabItem>
<TabItem value="cli" label="CLI">

Use the Aiven CLI to create an Inkless BYOC Kafka service.

```bash
avn service create SERVICE_NAME \
  --project PROJECT_NAME \
  --service-type kafka \
  --cloud CUSTOM_CLOUD_REGION \
  --plan INKLESS_PLAN
```

Parameters:

- `SERVICE_NAME`: Name of the Kafka service
- `PROJECT_NAME`: Aiven project name
- `CUSTOM_CLOUD_REGION`: BYOC region, such as `custom-aws-eu-central-1`
- `INKLESS_PLAN`: Inkless-capable plan for the selected BYOC environment

</TabItem>
</Tabs>

## After service creation

After the service is running, Kafka is available with classic topics by default.

Diskless topics are available only when they are enabled for the service and supported
by the service configuration.

- Create classic topics to use standard Kafka topics.
- Create diskless topics to store data in object storage when diskless topics are
  enabled.

<RelatedPages />

- [Create a Kafka topic](/docs/products/kafka/howto/create-topic)
- [Diskless topics overview](/docs/products/kafka/diskless/concepts/diskless-overview)
- [Generate sample data](/docs/products/kafka/howto/generate-sample-data)
