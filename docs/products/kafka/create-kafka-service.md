---
title: Create an Aiven for Apache Kafka® service
sidebar_label: Create Kafka service
keywords: [create, kafka, service, byoc, diskless]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"
import LimitedBadge from "@site/src/components/Badges/LimitedBadge";
import EarlyBadge from "@site/src/components/Badges/EarlyBadge";
import RelatedPages from "@site/src/components/RelatedPages";
import TerraformPrereqs from "@site/static/includes/terraform-get-started-prerequisites.md";
import TerraformApply from "@site/static/includes/terraform-apply-changes.md";
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';

You can create an Aiven for Apache Kafka® service using the Aiven Console, CLI, or Terraform.
During creation, you can enable **diskless topics** for Bring Your Own Cloud (BYOC)
deployments. If you do not enable diskless topics, the service stores topic data on
local disks by default.

### Decide whether to enable diskless topics

Choose the configuration that fits your workload:

- **Standard Kafka service:** Uses local disk storage for lower latency and all-region
  availability.
- **Kafka service with diskless topics:** Stores data in cloud object storage for
  cost-optimized scaling in Bring Your Own Cloud (BYOC) environments.

Diskless topics are currently supported only for BYOC deployments on AWS.

:::note
You cannot enable diskless topics on an existing Kafka service that was created with
local storage only.
To use diskless topics, create a Kafka service with diskless support enabled.
Once enabled, you can create both diskless and classic topics within that service.
:::

For details on the differences between topic types, see
[Classic vs. diskless topics](/docs/products/kafka/diskless/concepts/topics-vs-classic).

## Prerequisites

Make sure you have the following:

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

- Access to the [Aiven Console](https://console.aiven.io)
- An Aiven project to create the service in

</TabItem>
<TabItem value="cli" label="CLI">

- [Aiven CLI](https://github.com/aiven/aiven-client#installation) installed
- [A personal token](/docs/platform/howto/create_authentication_token)

</TabItem>
<TabItem value="terraform" label="Terraform">

<TerraformPrereqs />

</TabItem>
</Tabs>

### Additional requirements for diskless topics

To create a Kafka service with diskless topics, make sure that:

- You have a [BYOC environment](/docs/platform/howto/byoc/create-cloud/create-custom-cloud)
  set up in your cloud account on AWS.
- Diskless topics are enabled for your organization by Aiven. If the option does not
  appear in the Aiven Console, [contact Aiven support](https://aiven.io/contact).

## Create a Kafka service

Create a Kafka service that stores topic data on local disks by default.

<Tabs groupId="create-kafka-service">
<TabItem value="console" label="Console" default>

1. In your project, click <ConsoleLabel name="services" />.
1. Click **Create service**.
1. Select **Aiven for Apache Kafka®**.
1. In the **Optimize cost** section, keep diskless topics turned off to create a standard
   Kafka service.

   :::tip
   To create a Kafka service with diskless topics instead, see
   [Create a Kafka service with diskless topics (BYOC)](#create-a-kafka-service-with-diskless-topics-byoc).
   :::

1. Select a **Cloud**.

   :::note
   Available plans and pricing vary between cloud providers and regions.
   :::

1. Select a **Plan**.

1. Optional: Add [disk storage](/docs/platform/howto/add-storage-space).
   You can also enable [Tiered storage](/docs/products/kafka/howto/enable-kafka-tiered-storage)
   to offload older data automatically to object storage.

1. In the **Service basics** section, set the following:
   - **Service name:** Enter a name for the service.
     :::important
     You cannot change the name after creation.
     :::
   - **Version:** Select the Kafka version. The latest supported version appears by default.
   - **Tags:** Optional. Add [resource tags](/docs/platform/howto/tag-resources) to
     organize your services.

1. Review the **Service summary**.
   Confirm the version, region, plan, and estimated price.

1. Click **Create service**.

The service status changes to **Rebuilding** during creation.
When it changes to **Running**, your Kafka service is ready.

</TabItem>
<TabItem value="cli" label="CLI">

Create a Kafka service using the Aiven CLI.

```bash
avn service create SERVICE_NAME \
  --service-type kafka \
  --cloud CLOUD_REGION \
  --plan PLAN_NAME
```

Parameters:

- `SERVICE_NAME`: The name of the Kafka service
- `CLOUD_REGION`: The cloud and region
- `PLAN_NAME`: The plan name

Wait until the service status changes to **RUNNING**.

</TabItem>
<TabItem value="terraform" label="Terraform">

Use Terraform to create a Kafka service in your Aiven project.

1. Create a file named `provider.tf` and add the following:

    <TerraformSample filename='kafka/kafka_connect/provider.tf' />

1. Create a file named `service.tf` and add the following:

    <TerraformSample filename='kafka/kafka_connect/kafka_service.tf' />

1. Create a file named `variables.tf` and add the following:

    <TerraformSample filename='kafka/kafka_connect/variables.tf' />

1. Create the `terraform.tfvars` file and add the values for your token and project name.

1. Optional: To output connection details, create a file named `output.tf` and add the following:

    <TerraformSample filename='kafka/kafka_connect/output.tf' />

<TerraformApply />

</TabItem>
</Tabs>

## Create a Kafka service with diskless topics (BYOC)

Use [diskless topics](/docs/products/kafka/diskless/concepts/diskless-overview) to
store Kafka data in cloud object storage instead of local disks.
You can use both diskless and classic topics in the same Kafka cluster.

For instructions on setting up a BYOC environment, see
[Create a custom cloud (BYOC)](/docs/platform/howto/byoc/create-cloud/create-custom-cloud).

<Tabs groupId="create-kafka-service">
<TabItem value="console" label="Console" default>

1. In your project, click <ConsoleLabel name="services" />.
1. Click **Create service**.
1. Select **Aiven for Apache Kafka®**.
1. Under **Optimize cost**, turn on **Enable diskless topics**.
1. Under **Add service metadata**, set the following:
   - **Version:** Select the Kafka version. The latest supported version appears by
     default.
     :::note
     Diskless topics require Apache Kafka® version 4.0 or later.
     :::
   - **Service name:** Enter a name for your service.
     :::important
     You cannot change the name after creation.
     :::
   - **Tags:** Optional. Add [resource tags](/docs/platform/howto/tag-resources) to
     organize your services.
1. Select the **cloud provider**, **BYOC region**, and **plan**.
1. Under **Select plan**, choose one of the plans available for diskless topics.
1. Review the **Service summary** on the right.
   Confirm the version, region, plan, and estimated price.
1. Click **Create service**.

</TabItem>
<TabItem value="cli" label="CLI">

You can create a Kafka service with diskless topics enabled using the Aiven CLI.

```bash
avn service create SERVICE_NAME \
  --project PROJECT_NAME \
  --service-type kafka \
  --cloud CLOUD_NAME \
  --plan PLAN_NAME \
  -c kafka_version=4.0 \
  -c kafka_diskless.enabled=true
```

Parameters:

- `SERVICE_NAME`: Name of your Kafka service.
- `PROJECT_NAME`: Your Aiven project name.
- `CLOUD_NAME`: Custom BYOC cloud region, for example `custom-aws-eu-central-1`.
- `PLAN_NAME`: Diskless-compatible plan, such as `business-8-inkless`. Plans that support
  diskless topics include `-inkless` in the plan name.
- `kafka_diskless.enabled`: Enables diskless topics. Must be set to `true`.

</TabItem>
<TabItem value="terraform" label="Terraform">

You can create a Kafka service with diskless topics enabled using Terraform.

1. Create a file named `main.tf` and add the following:

   ```hcl
   terraform {
     required_providers {
       aiven = {
         source  = "aiven/aiven"
         version = ">=4.0.0, <5.0.0"
       }
     }
   }

   provider "aiven" {
     api_token = var.aiven_token
   }

   resource "aiven_kafka" "diskless_kafka" {
     project      = var.aiven_project_name
     service_name = "kafka-diskless"
     cloud_name   = "custom-aws-eu-central-1"
     plan         = "business-8-inkless"

     kafka_user_config = {
       kafka_version         = "4.0"
       kafka_diskless = {
         enabled = true
       }
     }
   }
   ```

1. Create a `variables.tf` file:

   ```hcl
   variable "aiven_token" {
     description = "Aiven API token"
     type        = string
   }

   variable "aiven_project_name" {
     description = "Your Aiven project name"
     type        = string
   }
   ```

1. Initialize and apply your configuration:

   ```hcl
   terraform init
   terraform apply --auto-approve
   ```

</TabItem>
</Tabs>

### After service creation

When you create a Kafka service with diskless topics, Aiven deploys it directly in your
BYOC environment using your connected cloud account. The service runs entirely within
your cloud account.

Aiven configures the following:

- **Access to object storage** for storing Kafka topic data, either through an
  Aiven-managed or a customer-provided bucket, depending on your BYOC configuration.
- **A PostgreSQL-based coordinator** managed as a service integration with Kafka.
  This coordinator maintains message ordering and metadata consistency for diskless topics.
  It is required for the current implementation of diskless topics. For details about
  how the coordinator is upgraded, see
  [PostgreSQL service upgrades](/docs/products/kafka/diskless/concepts/limitations#automatic-postgresql-service-upgrades).

After creation, the **Kafka Diskless PostgreSQL** integration appears on the
 <ConsoleLabel name="integrations"/> page in the Aiven Console. This integration is managed
by Aiven and cannot be modified or deleted.

To learn more about how diskless topics work, see
[Diskless topics overview](/docs/products/kafka/diskless/concepts/diskless-overview).


<RelatedPages/>

- [Diskless topics overview](/docs/products/kafka/diskless/concepts/diskless-overview)
- [Diskless topics architecture](/docs/products/kafka/diskless/concepts/architecture)
- [Batching and delivery in diskless topics](/docs/products/kafka/diskless/concepts/batching-and-delivery)
- [Create a Kafka topic](/docs/products/kafka/howto/create-topic)
