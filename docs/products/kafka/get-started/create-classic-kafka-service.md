---
title: Create a Classic Kafka service
sidebar_label: Create Classic Kafka service
keywords: [create, kafka, cluster, classic, byoc]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";
import TerraformApply from "@site/static/includes/terraform-apply-changes.md";
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';

Create a Classic Apache Kafka® service on Aiven. Classic Kafka uses predefined service sizes and stores data on local broker disks.
Optional tiered storage is available when supported by the selected plan and cloud.

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io)
- An Aiven project where you can create Kafka services

## Create a Classic Kafka service on Aiven Cloud

Classic Kafka services are available on the Free and Professional service tiers.
By default, data is stored on local broker disks. You can enable
[tiered storage](/docs/products/kafka/concepts/kafka-tiered-storage) when it is
supported by the selected plan and cloud.

<Tabs groupId="classic-aiven-cloud">
<TabItem value="console" label="Console" default>

1. In the [Aiven Console](https://console.aiven.io), open the project and
   select <ConsoleLabel name="services" />.
1. Click **Create service**.
1. Select **Apache Kafka®**.
1. In **Service tier**, select a supported tier.
1. In **Cluster type**, select **Classic Kafka**.
1. In **Deployment mode**, select **Aiven cloud**.
1. Select a cloud provider and region.
1. Select a **plan**.
1. Optional: Adjust **Additional disk storage** or enable **Tiered storage**, if supported
   for the selected plan and region.
1. In **Service basics**, enter:
   - **Name:** Name of the service. You cannot change the service name after creation.
   - **Version:** Select the Kafka version. The latest supported version appears by
     default.
   - **Tags:** Optional. Add [resource tags](/docs/platform/howto/tag-resources) to
     organize your services.
1. Review the **Service summary**, then click **Create service**.

</TabItem>
<TabItem value="cli" label="CLI">

Use the Aiven CLI to create a Classic Kafka service.

```bash
avn service create SERVICE_NAME \
  --project PROJECT_NAME \
  --service-type kafka \
  --cloud CLOUD_REGION \
  --plan PLAN_NAME
```

Parameters:

- `SERVICE_NAME`: Name of the Kafka service
- `PROJECT_NAME`: Project that contains the service
- `CLOUD_REGION`: Cloud provider and region
- `PLAN_NAME`: Classic Kafka plan

</TabItem>
<TabItem value="terraform" label="Terraform">

Use Terraform to create a Classic Kafka service in your Aiven project.

1. Create a file named `provider.tf` and add the following:

    <TerraformSample filename='kafka/kafka_connect/provider.tf' />

1. Create a file named `service.tf` and add the following:

    <TerraformSample filename='kafka/kafka_connect/kafka_service.tf' />

1. Create a file named `variables.tf` and add the following:

    <TerraformSample filename='kafka/kafka_connect/variables.tf' />

1. Create the `terraform.tfvars` file and add the values for your token and project name.

1. Optional: To output connection details, create a file named `output.tf` and add the
   following:

    <TerraformSample filename='kafka/kafka_connect/output.tf' />

<TerraformApply />

</TabItem>
</Tabs>

## Create a Classic Kafka service on Bring your own cloud (BYOC)

Classic Kafka services on BYOC are available on the Professional service tier. The
service runs in your own cloud account while Aiven manages the Kafka infrastructure and
operations.

Before you can create services on BYOC, you must set up a BYOC environment. See
[Create a custom cloud (BYOC)](/docs/platform/howto/byoc/create-cloud/create-custom-cloud).

<Tabs groupId="classic-byoc">
<TabItem value="console" label="Console" default>

1. In the [Aiven Console](https://console.aiven.io), open the project and
   select <ConsoleLabel name="services" />.
1. Click **Create service**.
1. Select **Apache Kafka®**.
1. In **Service tier**, select a supported tier.
1. In **Cluster type**, select **Classic Kafka**.
1. In **Deployment mode**, select **Bring your own cloud (BYOC)**.
1. In the **Cloud** section:
   - Select your **BYOC environment**.
   - Select a **region**.
1. In the **Plan** section, choose a plan from the available plan groups.
1. In **Service basics**, enter:
   - **Name:** Name of the service. You cannot change the service name after creation.
   - **Version:** Select the Kafka version. The latest supported version appears by
     default.
   - **Tags:** Optional. Add [resource tags](/docs/platform/howto/tag-resources) to
     organize your services.
1. Review the **Service summary**, then click **Create service**.

</TabItem>
<TabItem value="cli" label="CLI">

Use the Aiven CLI to create a Classic Kafka BYOC service.

```bash
avn service create SERVICE_NAME \
  --project PROJECT_NAME \
  --service-type kafka \
  --cloud CUSTOM_CLOUD_REGION \
  --plan PLAN_NAME
```

Parameters:

- `SERVICE_NAME`: Name of the Kafka service
- `PROJECT_NAME`: Aiven project name
- `CUSTOM_CLOUD_REGION`: BYOC region, such as `custom-aws-eu-central-1`
- `PLAN_NAME`: Classic Kafka BYOC plan

</TabItem>
</Tabs>

<RelatedPages />

- [Create a Kafka topic](/docs/products/kafka/howto/create-topic)
- [Free tier overview](/docs/products/kafka/free-tier/kafka-free-tier)
- [Generate sample data in the console](/docs/products/kafka/howto/generate-sample-data)
