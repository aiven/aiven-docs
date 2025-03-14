---
title: Get started with Aiven for AlloyDB Omni
sidebar_label: Get started
keywords: [quick start]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"
import CreateService from "@site/static/includes/create-service-console.md"
import Help from "@site/static/includes/cli-help.md"

Start using Aiven for AlloyDB Omni by setting up a service and connecting to your new default database with a programming language of your choice.

## Prerequisites

Depending on a dev tool to use for working with Aiven for AlloyDB Omni:

- Access to the [Aiven Console](https://console.aiven.io)
- [Aiven CLI](/docs/tools/cli)
- [Aiven Provider for Terraform](/docs/tools/terraform)
- [Aiven Operator for Kubernetes®](/docs/tools/kubernetes)

## Create an Aiven for AlloyDB Omni service

<Tabs groupId="group1">
<TabItem value="gui" label="Aiven Console" default>

<CreateService serviceType="AlloyDB Omni"/>

</TabItem>
<TabItem value="cli" label="Aiven CLI">

1. Determine the service specifications, including plan, cloud provider, region,
   and project name.

1. Run the following command to create an Aiven for AlloyDB Omni service named
   `demo-alloydbomni`:

   ```bash
    avn service create demo-alloydbomni      \
    --service-type alloydbomni               \
    --cloud CLOUD_AND_REGION                 \
    --plan PLAN                              \
    --project PROJECT_NAME
   ```

   Parameters:

    - `avn service create demo-alloydbomni`: Command to create new Aiven service
      named `demo-alloydbomni`.
    - `--service-type alloydbomni`: Specifies the service type as Aiven for AlloyDB Omni.
    - `--cloud CLOUD_AND_REGION`: Specifies the cloud provider and region for deployment.
    - `--plan PLAN`: Specifies the service plan or tier.
    - `--project PROJECT_NAME`: Specifies the project where the service will be created.

<Help/>

</TabItem>
<TabItem value="tf" label="Aiven Provider for Terraform">

Use the
[aiven_alloydbomni](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/alloydbomni)
resource.

</TabItem>
<TabItem value="k8" label="Aiven Operator for Kubernetes®">

Use the [AlloyDBOmni](https://aiven.github.io/aiven-operator/resources/alloydbomni.html)
resource.

</TabItem>
</Tabs>

## Configure the service

You can change your service settings by updating the service configuration.

:::tip
See configuration options in
[Advanced parameters for Aiven for AlloyDB Omni](/docs/products/alloydbomni/reference/advanced-params).
:::

<Tabs groupId="group1">
<TabItem value="gui" label="Aiven Console" default>
1. Select the new service from the list of services on
   the <ConsoleLabel name="Services"/> page.
1. On the <ConsoleLabel name="overview"/> page, select <ConsoleLabel name="service settings"/>
   from the sidebar.
1. In the **Advanced configuration** section, make changes to the service configuration.
</TabItem>
<TabItem value="cli" label="Aiven CLI">
Use the [avn service update](/docs/tools/cli/service-cli#avn-cli-service-update) command
to change basic service settings, such as service version, IP filtering, cloud region,
termination protection, or service plan.

:::tip
Use [other avn service commands](/docs/tools/cli/service-cli) for advanced settings and
operations on your service.
:::

</TabItem>
<TabItem value="tf" label="Aiven Provider for Terraform">

Update your
[aiven_alloydbomni](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/alloydbomni)
resource.

</TabItem>
<TabItem value="k8" label="Aiven Operator for Kubernetes®">

Update your [AlloyDBOmni](https://aiven.github.io/aiven-operator/resources/alloydbomni.html)
resource.

</TabItem>
</Tabs>

## Connect to the service

<Tabs groupId="group1">
<TabItem value="gui" label="Aiven Console" default>
1. Log in to the [Aiven Console](https://console.aiven.io/), and go to your
   organization > project > Aiven for AlloyDB Omni service.
1. On the <ConsoleLabel name="overview"/> page of your service, click
   **Quick connect**.
1. In the **Connect** window, select a tool or language to connect to your service, follow
   the connection instructions, and click **Done**.

</TabItem>
<TabItem value="cli" label="CLI">
[Connect to your new service](/docs/products/alloydbomni/connect/connect-psql) with
[psql](https://www.postgresql.org/download/) CLI tool.
</TabItem>
</Tabs>

:::tip
Discover more tools for connecting to Aiven for AlloyDB Omni in
[Connect to Aiven for AlloyDB Omni](/docs/products/alloydbomni/connect/connect-services).
:::

## Connect a Google service account

[Upload your Google service account key](/docs/products/alloydbomni/manage-credentials)
to the Aiven for AlloyDB Omni service so that you can use generative AI capabilities to
build applications.

## Build AI applications

[Access and use AI models](/docs/products/alloydbomni/access-ai-models) to
[build generative AI applications using AlloyDB AI](https://cloud.google.com/alloydb/docs/ai).
