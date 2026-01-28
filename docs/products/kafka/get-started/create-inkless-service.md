---
title: Create an Inkless Kafka service
sidebar_label: Create Inkless Kafka service
keywords: [create, kafka, service, inkless, byoc]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Create an Inkless Apache Kafka® service on Aiven. Inkless sizes capacity based on stream load and retention.
It supports classic topics and, when enabled, diskless topics on Aiven cloud and
Bring Your Own Cloud (BYOC).

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io)
- An Aiven project where you can create services

## Create an Inkless service on Aiven cloud

Inkless services are available on the **Professional** tier. On Aiven cloud, Inkless
sizes compute capacity based on stream load instead of fixed hardware plans.

The service runs Kafka 4.x and enables tiered storage by default. Diskless topics are
available when supported by the selected stream load.

Stream load determines whether diskless topics are available:

- **Up to 5 MB/s** supports **classic topics only**.
- **10 MB/s or higher** allows you to enable **diskless topics**.

<Tabs groupId="inkless-aiven-cloud">
<TabItem value="console" label="Console" default>

1. In the [Aiven Console](https://console.aiven.io), open the project and
   select <ConsoleLabel name="services" />.
1. Click **Create service**.
1. Select **Apache Kafka®**.
1. Select **Professional** as the service tier.
1. Select **Inkless** as the cluster type.
1. Select **Aiven cloud** as the deployment mode.
1. Choose a cloud provider and region.
1. Set the expected **Produce rate** for the service:
   - Choose **Up to 5 MB/s** to create a service with **classic topics only**.
   - Choose **10 MB/s or higher** to allow **diskless topics**.
   - Select **Custom** to define custom ingress and egress limits.
1. For stream loads of **10 MB/s or higher**, turn on **Diskless topics**.
1. Select a **Retention** period.
1. In **Service basics**, enter:
   - **Name:** Enter a name for the service. You cannot change the service name after
     creation.
   - **Tags:** Optional. Add [resource tags](/docs/platform/howto/tag-resources) to
     organize your services.
1. Review the **Service summary**, and click **Create service**.

</TabItem>
<TabItem value="cli" label="CLI">

Use the Aiven CLI to create an Inkless Kafka service. Inkless runs Kafka 4.0 and
requires tiered storage to be enabled.

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
- `INKLESS_PLAN`: Inkless-capable plan that represents the required stream-load tier

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

Inkless services can run in your own cloud account through BYOC. Tiered storage is
enabled by default. Diskless topics are available when enabled for the service and
supported by the selected plan.

Before you can create services on BYOC, you must set up a BYOC environment.
See [Create a custom cloud (BYOC)](/docs/platform/howto/byoc/create-cloud/create-custom-cloud).

<Tabs groupId="inkless-byoc">
<TabItem value="console" label="Console" default>

1. In the Aiven Console, open the project and select <ConsoleLabel name="services" />.
1. Click **Create service**.
1. Select **Apache Kafka®**.
1. Select **Professional** as the service tier.
1. Select **Inkless** as the cluster type.
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

Diskless topics are available only when they are enabled for the service and the
selected stream load supports them.

- Create classic topics to use standard Kafka topics.
- Create diskless topics to store data in object storage when diskless topics are
  enabled.

<RelatedPages />

- [Create a Kafka topic](/docs/products/kafka/howto/create-topic)
- [Diskless topics overview](/docs/products/kafka/diskless/concepts/diskless-overview)
- [Generate sample data](/docs/products/kafka/howto/generate-sample-data)
