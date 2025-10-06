---
title: Create an Aiven for Apache Kafka® service
sidebar_label: Create service
keywords: [create, kafka, service, byoc, diskless]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"
import CreateService from "@site/static/includes/create-service-console.md"
import LimitedBadge from "@site/src/components/Badges/LimitedBadge";
import EarlyBadge from "@site/src/components/Badges/EarlyBadge";
import RelatedPages from "@site/src/components/RelatedPages";
import TerraformPrereqs from "@site/static/includes/terraform-get-started-prerequisites.md";
import TerraformApply from "@site/static/includes/terraform-apply-changes.md";
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';

Create an Aiven for Apache Kafka® service by using the Aiven Console, CLI, or Terraform.
During creation, choose between a **classic Kafka service** or a **Kafka service with
diskless topics** enabled for Bring Your Own Cloud (BYOC) deployments.

## Prerequisites

Ensure you have the following:

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

- Access to the [Aiven Console](https://console.aiven.io)
- An Aiven project to create the service

</TabItem>
<TabItem value="terraform" label="Terraform">

<TerraformPrereqs />

</TabItem>
<TabItem value="cli" label="CLI">

- [Aiven CLI](https://github.com/aiven/aiven-client#installation) installed
- [A personal token](/docs/platform/howto/create_authentication_token)

</TabItem>
</Tabs>

### Additional requirements for diskless topics

To create a Kafka service with diskless topics enabled, ensure that:

- You have a [BYOC environment](/docs/platform/howto/byoc/create-cloud/create-custom-cloud)
  set up in your cloud account on AWS or Google Cloud
- Diskless topics are enabled for your organization by Aiven. If the option does not
  appear in the Aiven Console, [contact Aiven support](https://aiven.io/contact)

## Compare classic and diskless Kafka services

Use the following table to compare classic Kafka services and
Kafka services with diskless topics enabled.

| Feature | Classic Kafka service | Kafka service with diskless topics |
|----------|----------------------|------------------------------------|
| **Storage** | Local disks within the service | Cloud object storage |
| **Availability** | Available in all Aiven clouds | Available only in BYOC deployments on AWS and Google Cloud |
| **Typical use case** | Low-latency or transactional workloads | High-throughput, cost-optimized streaming workloads |
| **Service plans** | All standard Kafka plans | Plans designed for diskless topics (visible when BYOC is selected) |

Choose diskless topics to reduce cross-zone network costs and store topic data
directly in your cloud object storage.
Otherwise, create a **classic Kafka service** for standard deployments.

## Create a classic Kafka service

Create a Kafka service that stores topic data on local disks by default.

<Tabs groupId="classic-kafka">
<TabItem value="console" label="Console" default>

1. In your project, click <ConsoleLabel name="services" />.
1. Click **Create service**.
1. Select **Aiven for Apache Kafka®**.
1. Under **Optimize cost**, keep **diskless topics** turned off to create a classic
   Kafka service.

   :::tip
   To create a Kafka service with diskless topics instead, see
   [Create a Kafka service with diskless topics enabled (BYOC)](#create-a-kafka-service-with-diskless-topics-enabled-byoc).
   :::

1. Under **Add service metadata**, set the following:
   - **Version:** Select the Kafka version. The latest supported version appears by default.
   - **Service name:** Enter a name for the service.
     :::important
     You cannot change the name after creation.
     :::
   - **Tags:** Optional. Add [resource tags](/docs/platform/howto/tag-resources) to
     organize your services.

1. Select the **cloud provider**, **region**, and **plan**.

   :::note
   Available plans and pricing vary between cloud providers and regions.
   :::

1. Optional: Add [disk storage](/docs/platform/howto/add-storage-space).
   You can also enable [Tiered storage](/docs/products/kafka/howto/enable-kafka-tiered-storage)
   to offload older data automatically to object storage.

1. Review the **Service summary**.
   Confirm the version, region, plan, and estimated price.

1. Click **Create service**.

The service status changes to **Rebuilding** during creation.
When it changes to **Running**, your Kafka service is ready.

</TabItem>
<TabItem value="cli" label="CLI">

Create a Kafka service using the Aiven CLI.

```bash
avn service create kafka-demo \
  --service-type kafka \
  --cloud google-europe-west3 \
  --plan business-4
```

Parameters:

- `kafka-demo`: The name of your Kafka service.
- `google-europe-west3`: The cloud and region.
- `business-4`: The plan name.

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

## Create a Kafka service with diskless topics enabled (BYOC)

Enable [diskless topics](/docs/products/kafka/diskless/concepts/diskless-overview) to
store Kafka data directly in your cloud object storage instead of local disks.
Diskless and classic topics can coexist in the same Kafka cluster, but diskless topics
are available only in Bring Your Own Cloud (BYOC) deployments on AWS and Google Cloud.
To create and configure a BYOC environment, see
[Create a custom cloud (BYOC)](/docs/platform/howto/byoc/create-cloud/create-custom-cloud).


<Tabs groupId="diskless-kafka">
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
avn service create kafka-demo \
  --project my-byoc-project \
  --service-type kafka \
  --cloud custom-aws-eu-central-1 \
  --plan business-8-inkless \
  -c kafka_version=4.0 \
  -c kafka_diskless.enabled=true
```

Parameters:

- `SERVICE_NAME`: Name of your Kafka service.
- `PROJECT_NAME`: Your Aiven project name.
- `CLOUD_NAME`: Custom BYOC cloud region, for example `custom-aws-eu-central-1`.
- `PLAN_NAME`: Diskless-compatible plan, such as `business-8-inkless`.
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

### After the Diskless Kafka service is created

Aiven deploys the Kafka service directly in your BYOC environment using your
connected cloud account. The service runs entirely within your AWS or Google Cloud account.

Aiven automatically provisions:

- Cloud object storage access for storing Kafka topic data
- A PostgreSQL-based Diskless Coordinator, managed as a service integration with Kafka

After creation, the **Kafka Diskless PostgreSQL** integration appears on the
**Service integrations** tab in the Aiven Console. This integration is managed
automatically and cannot be modified or deleted.

To learn more about how diskless topics work, see
[Diskless topics overview](/docs/products/kafka/diskless/concepts/diskless-overview).


<RelatedPages/>

- [Diskless topics overview](/docs/products/kafka/diskless/concepts/diskless-overview)
- [Diskless topics architecture](/docs/products/kafka/diskless/concepts/architecture)
- [Batching and delivery in diskless topics](/docs/products/kafka/diskless/concepts/batching-and-delivery)
- [Create a classic kafka topic](/docs/products/kafka/howto/create-topic)
- [Create a diskless topic](/docs/products/kafka/diskless/howto/create-diskless-topic)
