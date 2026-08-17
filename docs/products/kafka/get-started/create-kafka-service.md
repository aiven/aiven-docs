---
title: Create an Aiven for Apache Kafka® service on Aiven Cloud
sidebar_label: Create on Aiven Cloud
keywords: [create, kafka, service, aiven cloud, standard, classic]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";
import TerraformApply from "@site/static/includes/terraform-apply-changes.md";
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';

Create an Aiven for Apache Kafka® service on Aiven Cloud.
Choose the service tier, deployment location, and configuration for your workload.

To create a Free or Developer tier service, see:

- [Create a free tier Aiven for Apache Kafka® service](/docs/products/kafka/free-tier/create-free-tier-kafka-service)
- [Create an Aiven for Apache Kafka® Developer tier service](/docs/products/kafka/dev-tier/create-dev-tier-kafka-service)

To run Kafka in your own cloud account, see
[Create an Apache Kafka® service with BYOC](/docs/products/kafka/get-started/create-kafka-service-byoc).

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io)
- An Aiven project where you can create Kafka services

## Create a service on Aiven Cloud {#create-the-service}

1. In the [Aiven Console](https://console.aiven.io), open the project and
   click <ConsoleLabel name="services" />.
1. Click **Create service**.
1. Click **Apache Kafka®**.
1. In **Service tier**, click **Professional**.
1. In **Deployment mode**, click **Aiven cloud**.
1. If **Service type** appears, click **Standard** or **Classic**:

   - **Standard**: Usage-based pricing, with classic and diskless topics.
   - **Classic**: A predefined service plan and classic topics.

   You cannot change the service type after you create the service.

1. In **Cloud**, click a cloud provider and region.

<Tabs groupId="kafka-service-type">
<TabItem value="standard" label="Standard" default>

8. In **Stream load**, click the expected average ingress.

   Aiven estimates egress at 3x ingress. If you click **Custom**, enter the maximum
   ingress.

1. If **Cost optimization** appears, set the estimated share of traffic in
   diskless topics.

   This section appears when you click **10 MB/s** or **Custom**. The slider previews
   the estimated network cost for different shares of diskless topic traffic. It does
   not change the service configuration.

1. In **Retention**, click a default topic retention period.

   Aiven uses this value for the storage estimate. If you click **Custom**, enter a
   period between 1 and 30 days.

1. In **Service basics**, enter a **Name**. You cannot change the name after you create
   the service.
1. Optional: Click **Add tag to this service** to add
   [resource tags](/docs/platform/howto/tag-resources).
1. In **Service summary**, review the estimated monthly cost.
1. Click **Create service**.
1. Wait until the service status is **Running**.

### Review the cost estimate

The estimate includes compute, storage, and network usage. It is based on the selected
cloud, region, expected traffic, and retention.

The estimated monthly cost is based on your selected configuration. Your invoice
reflects actual usage during the billing period.

After the service is **Running**, open **Overview** > **Service usage** to view
ingress, egress, and storage usage.

For more information, see
[Pricing for Aiven for Apache Kafka®](/docs/products/kafka/concepts/kafka-pricing).

</TabItem>
<TabItem value="classic" label="Classic">

8. In **Plan**, click a plan.
1. Optional: If **Additional disk storage** is available, adjust the disk size.
1. Optional: If **Enable tiered storage** is available, click it to enable
   [tiered storage](/docs/products/kafka/concepts/kafka-tiered-storage).
1. In **Service basics**, enter:

   - **Name**: Enter a name for the service. You cannot change the name after you
     create the service.
   - **Version**: Click a Kafka version. The default version is preselected.
   - **Tags**: Optional. Add
     [resource tags](/docs/platform/howto/tag-resources) to organize your services.

1. In **Service summary**, review the estimated monthly price.
1. Click **Create service**.
1. Wait until the service status is **Running**.

For information about Classic Kafka plans and capabilities, see
[Classic Kafka overview](/docs/products/kafka/classic-kafka-overview).

</TabItem>
</Tabs>

## Create a service with the Aiven CLI

<Tabs groupId="kafka-service-type">
<TabItem value="standard" label="Standard" default>

In the Aiven CLI and advanced configuration, Standard Kafka is identified as
`inkless`.

1. List the Standard Kafka offerings available for the project:

   ```bash
   avn inkless offering list \
     --organization-id ORGANIZATION_ID \
     --project PROJECT_NAME
   ```

   The command returns the available offerings and their maximum ingress and egress
   throughput.

1. Optional: Filter offerings by required ingress throughput:

   ```bash
   avn inkless offering list \
     --organization-id ORGANIZATION_ID \
     --project PROJECT_NAME \
     --ingress REQUIRED_MBPS
   ```

1. View pricing rates for the available offerings:

   ```bash
   avn inkless offering rates \
     --organization-id ORGANIZATION_ID \
     --project PROJECT_NAME \
     --cloud-provider CLOUD_PROVIDER
   ```

   Optional: Filter rates by offering with `--offering-name OFFERING_NAME` or by
   region with `--cloud-name CLOUD_NAME`.

1. Create the service using an offering as the plan:

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

1. Optional: To enable diskless topics when you create the service, also set:

   ```bash
   -c kafka_diskless.enabled=true
   ```

   You can also enable diskless topics later in the service configuration.

Replace the following:

- `ORGANIZATION_ID`: organization ID that owns the project
- `PROJECT_NAME`: Aiven project name
- `REQUIRED_MBPS`: minimum ingress throughput in megabits per second
- `CLOUD_PROVIDER`: cloud provider for rate listings: `aws`, `google`, or `azure`
- `CLOUD_NAME`: cloud or region identifier returned by the rates listing
- `CLOUD_REGION`: cloud region for the service, such as `aws-us-east-1`
- `OFFERING_NAME`: Standard Kafka offering returned by `avn inkless offering list`
- `SERVICE_NAME`: name of the Kafka service

</TabItem>
<TabItem value="classic" label="Classic">

Create a Classic Kafka service:

```bash
avn service create SERVICE_NAME \
  --project PROJECT_NAME \
  --service-type kafka \
  --cloud CLOUD_REGION \
  --plan PLAN_NAME
```

Replace the following:

- `SERVICE_NAME`: name of the Kafka service
- `PROJECT_NAME`: Aiven project name
- `CLOUD_REGION`: cloud provider and region
- `PLAN_NAME`: Classic Kafka plan

</TabItem>
</Tabs>

## Create a Classic Kafka service with Terraform

Terraform examples apply to Classic Kafka services.

1. Create a file named `provider.tf` and add the following:

   <TerraformSample filename='kafka/kafka_connect/provider.tf' />

1. Create a file named `service.tf` and add the following:

   <TerraformSample filename='kafka/kafka_connect/kafka_service.tf' />

1. Create a file named `variables.tf` and add the following:

   <TerraformSample filename='kafka/kafka_connect/variables.tf' />

1. Create a `terraform.tfvars` file and add the values for your token and project
   name.

1. Optional: To output connection details, create a file named `output.tf` and add the
   following:

   <TerraformSample filename='kafka/kafka_connect/output.tf' />

<TerraformApply />

## Next steps

- [Create a Kafka topic](/docs/products/kafka/howto/create-topic)
- [Pricing for Aiven for Apache Kafka®](/docs/products/kafka/concepts/kafka-pricing)
- [Generate sample data in the console](/docs/products/kafka/howto/generate-sample-data)

<RelatedPages />

- [Standard Kafka overview](/docs/products/kafka/standard-kafka-overview)
- [Classic Kafka overview](/docs/products/kafka/classic-kafka-overview)
