---
title: Create a Standard Kafka service
sidebar_label: Create Standard Kafka service
keywords: [create, kafka, service, standard, inkless, google cloud]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Create a Standard Apache Kafka® service on Aiven Cloud. For capabilities and when to
use Standard Kafka, see the
[Standard Kafka overview](/docs/products/kafka/standard-kafka-overview).

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io)
- An Aiven project where you can create Kafka services

## Create a Standard service on Aiven Cloud

Standard services are available on the Professional tier. Configure the service by
selecting stream load and retention. Standard Kafka runs on AWS, Google Cloud, and
Microsoft Azure.

<Tabs groupId="inkless-aiven-cloud">
<TabItem value="console" label="Console" default>

1. In the [Aiven Console](https://console.aiven.io), open the project and
   click <ConsoleLabel name="services" />.
1. Click **Create service**.
1. Click **Apache Kafka®**.
1. In **Service tier**, click **Professional**.
1. If a choice of **Service type** is available, click **Standard**.
1. In **Deployment mode**, click **Aiven cloud**.
1. Under **Cloud**, click **AWS**, **Google**, or **Azure**, then choose a region.
1. In **Stream load**, click the expected traffic for the service.
   If you select **Custom**, set the maximum ingress. Egress is estimated at 3x
   ingress.

   :::note
   The **Cost optimization** section appears below **Stream load** when you select
   **10 MB/s** or **Custom**. Use the slider to preview estimated network cost
   savings at different shares of Diskless topic traffic. This does not change
   your service configuration.
   :::

1. Click a **Retention** period.
   For a custom period, enter a value between 1 and 30 days.
1. In **Service basics**, enter:
   - **Name:** Enter a name for the service. You cannot change the service name after
     you create the service.
   - **Tags:** Optional. Add [resource tags](/docs/platform/howto/tag-resources) to
     organize your services.
1. Review the cost estimate in the **Service summary** panel, then click
   **Create service**.

</TabItem>
<TabItem value="cli" label="CLI">

Create a Standard Kafka service on Aiven Cloud using the Aiven CLI.

:::note
In the Aiven CLI and advanced configuration, Standard Kafka is still identified with
`inkless`.
:::

1. List available Standard Kafka offerings for the project:

   ```bash
   avn inkless offering list \
     --organization-id ORGANIZATION_ID \
     --project PROJECT_NAME
   ```

   The command returns available offerings with their maximum ingress and
   egress throughput.

1. Optional: Filter offerings by required ingress throughput:

   ```bash
   avn inkless offering list \
     --organization-id ORGANIZATION_ID \
     --project PROJECT_NAME \
     --ingress REQUIRED_MBPS
   ```

1. View pricing rates for the offerings:

   ```bash
   avn inkless offering rates \
     --organization-id ORGANIZATION_ID \
     --project PROJECT_NAME \
     --cloud-provider CLOUD_PROVIDER
   ```

   Optional: Filter rates by offering with `--offering-name OFFERING_NAME` or by
   region with `--cloud-name CLOUD_NAME`.

1. Create the Standard Kafka service using an offering as the plan:

   ```bash
   avn service create SERVICE_NAME \
     --project PROJECT_NAME \
     --service-type kafka \
     --cloud CLOUD_REGION \
     --plan OFFERING_NAME \
     -c kafka_version=4.1 \
     -c tiered_storage.enabled=true \
     -c inkless.enabled=true
   ```

Parameters:

- `ORGANIZATION_ID`: Organization ID that owns the project.
- `PROJECT_NAME`: Aiven project name.
- `REQUIRED_MBPS`: Minimum ingress throughput in megabits per second. Use with
  `--ingress` to list only offerings that meet this requirement.
- `CLOUD_PROVIDER`: Cloud provider for rate listings: `aws`, `google` (Google Cloud),
  or `azure`.
- `CLOUD_NAME`: Cloud or region identifier for filtering rate output. Use with
  `--cloud-name` on `avn inkless offering rates`, such as a value shown in the rates
  listing for your provider.
- `CLOUD_REGION`: Cloud region for the service, such as `aws-us-east-1`.
- `OFFERING_NAME`: Standard Kafka offering returned by `avn inkless offering list`.
- `SERVICE_NAME`: Name of the Kafka service.

Optional: To enable diskless topics when creating the service, run `avn service create`
with `kafka_diskless.enabled` set to `true` (in addition to the options in the previous
step):

```bash
-c kafka_diskless.enabled=true
```

You can also enable diskless topics later in the service configuration.

</TabItem>
</Tabs>

### Review the cost estimate

Before you create a Standard Kafka service, review the estimated monthly cost in the
**Service summary** panel.

The estimate is based on your selected plan, cloud, region, expected traffic, and
retention.

For Standard Kafka services with
[network pricing](/docs/products/kafka/concepts/network-pricing), the estimate includes
compute, storage, and network usage. Network usage is estimated from expected data
produced to and consumed from Kafka topics.

:::note
The estimated monthly cost is based on your selected configuration and 730 hours of
usage per month. Your final cost depends on actual usage during the billing period.
For a breakdown of network usage by topic type and direction, go to **Billing** >
**Reports**. The invoice shows a single total line item.
:::

After you create a service with usage-based pricing, view usage in
**Overview** > **Service usage**.

<RelatedPages />

- [Standard Kafka overview](/docs/products/kafka/standard-kafka-overview)
- [Create a Kafka topic](/docs/products/kafka/howto/create-topic)
- [Network pricing for Aiven for Apache Kafka®](/docs/products/kafka/concepts/network-pricing)
- [Generate sample data in the console](/docs/products/kafka/howto/generate-sample-data)