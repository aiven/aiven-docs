---
title: Create a Kafka service
sidebar_label: Create service
keywords: [create, kafka, service, inkless, classic, byoc]
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

Learn how to create an Apache Kafka® service on Aiven. You can choose between two Kafka
modes and deploy to either Aiven cloud or your own cloud infrastructure.

## Choose your Kafka mode

Aiven offers two ways to run Apache Kafka:

- **Inkless**: Runs Apache Kafka 4.x with diskless topics and tiered storage enabled by
  default.
  - On **Aiven cloud**, compute is usage-based and measured in Aiven Kafka Units (AKUs).
  - On **Bring Your Own Cloud (BYOC)**, pricing is plan-based.
  Inkless availability depends on the selected cloud provider.

- **Classic Kafka**: Uses fixed plans with local broker storage. Stores topic data on
  local disks by default, with optional tiered storage.

## Prerequisites

<Tabs groupId="prereqs">
<TabItem value="console" label="Console" default>

- Access to the [Aiven Console](https://console.aiven.io)
- An Aiven project where you can create services

</TabItem>
<TabItem value="cli" label="CLI">

- Install the [Aiven CLI](https://github.com/aiven/aiven-client#installation)
- Create an [API token](/docs/platform/howto/create_authentication_token)

</TabItem>
<TabItem value="terraform" label="Terraform">

<TerraformPrereqs />

</TabItem>
</Tabs>

## Create an Inkless service on Aiven cloud

Inkless on Aiven cloud uses Aiven Kafka Units (AKUs) to size compute capacity. It runs
Kafka 4.x and enables diskless topics and tiered storage by default.

<Tabs groupId="inkless-aiven">
<TabItem value="console" label="Console" default>

1. In the [Aiven Console](https://console.aiven.io), open your project and
   click <ConsoleLabel name="services" />.
1. Click **Create service**.
1. Select **Apache Kafka®**.
1. Select **Inkless** as the service type.
1. Select **Aiven cloud** as the deployment mode.

   :::note
   Inkless on Aiven cloud is available only on selected cloud providers.
   If Inkless is not supported in the selected cloud or region, Classic Kafka is used instead.
   :::

1. Select a **cloud provider** and **region**.
1. In **Stream load**, estimate the expected ingress and egress throughput.
   This estimate is used to determine the initial number of AKUs and estimate costs, and
   it can be adjusted later.
1. In **Retention**, enter the data retention period.
   Retention is used to estimate storage costs and can be adjusted after service creation.
1. In **Service basics**, enter:
   - **Name:** Enter a name for the service.
     :::important
     You cannot change the name after creation.
     :::
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
  --plan INKLESS_PLAN
```

Parameters:

- `SERVICE_NAME`: Name of the Kafka service.
- `PROJECT_NAME`: Project that contains the service.
- `CLOUD_REGION`: Cloud region to deploy the service in.
- `INKLES_PLAN`: An Inkless Kafka plan available for the selected cloud and account. Plan
  availability depends on the selected cloud provider and account.

</TabItem>
</Tabs>

## Create an Inkless service on Bring your own cloud (BYOC)

Inkless services can run in your cloud account through BYOC. Inkless on BYOC uses Kafka
4.x and enables diskless topics and tiered storage by default.

<Tabs groupId="inkless-aiven">
<TabItem value="console" label="Console" default>

1. In the [Aiven Console](https://console.aiven.io), open your project and
   click <ConsoleLabel name="services" />.
1. Click **Create service**.
1. Select **Apache Kafka®**.
1. Select **Inkless** as the service type.
1. Select **Bring your own cloud (BYOC)** as the deployment mode.
1. In the Cloud section, choose your BYOC environment and region.
1. Choose a **plan**.
1. In **Service basics**, enter:
   - **Name:** Enter a name for the service.
     :::important
     You cannot change the name after creation.
     :::
   - **Tags:** Optional. Add [resource tags](/docs/platform/howto/tag-resources) to
     organize your services.
1. Review the **Service summary**, and click **Create service**.

</TabItem>
<TabItem value="cli" label="CLI">

Use the Aiven CLI to create the service.

```bash
avn service create SERVICE_NAME \
  --project PROJECT_NAME \
  --service-type kafka \
  --cloud CUSTOM_CLOUD_REGION \
  --plan INKLESS_PLAN
```

Parameters:

- `SERVICE_NAME`: Name of the Kafka service.
- `PROJECT_NAME`: Aiven project name.
- `CUSTOM_CLOUD_REGION`: BYOC cloud region, such as `custom-aws-eu-central-1`.
- `INKLESS_PLAN`: Inkless plan, for example `business-8-inkless`.

</TabItem>
</Tabs>

## Create a Classic Kafka service on Aiven cloud

Classic Kafka uses fixed plans and local broker storage. It stores topic data on local
disks by default, with optional tiered storage.

<Tabs groupId="classic-aiven">
<TabItem value="console" label="Console" default>

1. In the [Aiven Console](https://console.aiven.io), open your project and
   click <ConsoleLabel name="services" />.
1. Click **Create service**.
1. Select **Apache Kafka®**.
1. Select **Classic Kafka** as the service type.
1. Select **Aiven cloud** as the deployment mode.
1. In the **Cloud** section:

   - Choose a **cloud provider**.
   - Select a **region**.
1. In the **Plan** section, choose a plan from the available plan groups.
1. Optional:

   - Add [disk storage](/docs/platform/howto/add-storage-space).
   - Enable [Tiered storage](/docs/products/kafka/howto/enable-kafka-tiered-storage) if
     supported for your plan and region.
1. In **Service basics**, enter:

   - **Name:** Name of the service.
   - **Version:** Select the Kafka version. The latest supported version appears by
     default.
   - **Tags:** Optional. Add [resource tags](/docs/platform/howto/tag-resources) to
     organize your services.
1. Review the **Service summary**, then click **Create service**.

</TabItem>
<TabItem value="cli" label="CLI">

Create a classic Kafka service using the Aiven CLI.

```bash
avn service create SERVICE_NAME \
  --service-type kafka \
  --cloud CLOUD_REGION \
  --plan PLAN_NAME
```

Parameters:

- `SERVICE_NAME`: Name of the Kafka service.
- `CLOUD_REGION`: Cloud provider and region.
- `PLAN_NAME`: Classic Kafka plan.


</TabItem>
<TabItem value="terraform" label="Terraform">

Use Terraform to create a classic Kafka service in your Aiven project.

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

You can run Classic Kafka in your own cloud account using BYOC.

<Tabs groupId="classic-byoc">
<TabItem value="console" label="Console" default>

1. In the [Aiven Console](https://console.aiven.io), open your project and
   click <ConsoleLabel name="services" />.
1. Click **Create service**.
1. Select **Apache Kafka®**.
1. Select **Classic Kafka** as the service type.
1. Select **Bring your own cloud (BYOC)** as the deployment mode.
1. In the **Cloud** section:
   - Select your **BYOC environment**.
   - Select a **region**.
1. In the **Plan** section, choose a plan from the available plan groups.
1. Optional:
   - Adjust **Additional disk storage**.
   - Enable **Tiered storage** if supported for your plan and region.
1. In **Service basics**, enter:
   - **Name:** Name of the service.
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

- `CUSTOM_CLOUD_REGION`: Your BYOC region.
- `PLAN_NAME`: Classic Kafka BYOC plan.

</TabItem>
</Tabs>

## After service creation

Inkless services require a metadata coordinator and object storage. Aiven provisions
these components automatically.

Aiven configures:

- **Object storage access** for storing diskless topic data. Inkless uses an
  Aiven-managed object storage bucket, which is created and managed for you.
- **A PostgreSQL-based coordinator** that stores metadata for diskless topics. The
  coordinator is provisioned automatically and linked to the Kafka service through a
  managed integration. It maintains metadata such as batch offsets and storage locations.

After creation, the **Kafka Inkless PostgreSQL** integration appears on
the <ConsoleLabel name="integrations" /> page in the Aiven Console. This integration
is managed by Aiven and cannot be modified or removed.

<RelatedPages/>

- [Diskless topics overview](/docs/products/kafka/diskless/concepts/diskless-overview)
- [Diskless topics architecture](/docs/products/kafka/diskless/concepts/architecture)
- [Batching and delivery in diskless topics](/docs/products/kafka/diskless/concepts/batching-and-delivery)
- [Create a Kafka topic](/docs/products/kafka/howto/create-topic)
