---
title: Get started with Aiven for AlloyDB Omni
sidebar_label: Get started
keywords: [quick start]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import CreateService from "@site/static/includes/create-service-console.md";
import Help from "@site/static/includes/cli-help.md";
import TerraformPrereqs from "@site/static/includes/terraform-get-started-prerequisites.md";
import TerraformApply from "@site/static/includes/terraform-apply-changes.md";
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';

import EoaNotice from "@site/static/includes/service-end-of-availability-notice.md"

<EoaNotice/>

Start using Aiven for AlloyDB Omni by setting up a service and connecting to your new default database with a programming language of your choice.

## Prerequisites

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

- Access to the [Aiven Console](https://console.aiven.io)
- [psql](https://www.postgresql.org/download/) command line tool installed

</TabItem>
<TabItem value="cli" label="CLI">

- [Aiven CLI](https://github.com/aiven/aiven-client) installed
- [psql](https://www.postgresql.org/download/) command line tool installed

</TabItem>
<TabItem value="terraform" label="Terraform">

- [Terraform installed](https://www.terraform.io/downloads)
- A [personal token](https://docs.aiven.io/docs/platform/howto/create_authentication_token.html)
- [psql](https://www.postgresql.org/download/) command line tool installed

</TabItem>
<TabItem value="k8s" label="Kubernetes">

- [Aiven Operator for Kubernetes®](https://aiven.github.io/aiven-operator/installation/helm.html)
  installed
- Admin access to a Kubernetes cluster where you can run the operator
- A [personal token](/docs/platform/howto/create_authentication_token)
- [A Kubernetes Secret](https://aiven.github.io/aiven-operator/authentication.html)

</TabItem>

</Tabs>

## Create an Aiven for AlloyDB Omni service

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

<CreateService serviceType="AlloyDB Omni"/>

</TabItem>
<TabItem value="cli" label="CLI">

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
<TabItem value="terraform" label="Terraform">

The following example files are also available in the
[Aiven Terraform Provider repository](https://github.com/aiven/terraform-provider-aiven/tree/main/examples/alloydbomni) on GitHub.

1. Create a file named `provider.tf` and add the following:

    <TerraformSample filename='alloydbomni/provider.tf' />

1. Create a file named `service.tf` and add the following:

    <TerraformSample filename='alloydbomni/service.tf' />

1. To output connection details, create a file named `output.tf` and add the following:

    <TerraformSample filename='alloydbomni/output.tf' />

1. Create a file named `variables.tf` and add the following:

    <TerraformSample filename='alloydbomni/variables.tf' />

1. Create the `terraform.tfvars` file and add the values for your token and project name.

<TerraformApply />

</TabItem>
<TabItem value="k8s" label="Kubernetes">

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
<TabItem value="console" label="Console" default>
1. Select the new service from the list of services on
   the <ConsoleLabel name="Services"/> page.
1. On the <ConsoleLabel name="overview"/> page, select <ConsoleLabel name="service settings"/>
   from the sidebar.
1. In the **Advanced configuration** section, make changes to the service configuration.
</TabItem>
<TabItem value="cli" label="CLI">
Use the [avn service update](/docs/tools/cli/service-cli#avn-cli-service-update) command
to change basic service settings, such as service version, IP filtering, cloud region,
termination protection, or service plan.

:::tip
Use [other avn service commands](/docs/tools/cli/service-cli) for advanced settings and
operations on your service.
:::

</TabItem>
<TabItem value="terraform" label="Terraform">

See
[the `aiven_alloydbomni` resource documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/alloydbomni)
for the full schema.

</TabItem>
<TabItem value="k8s" label="Kubernetes">

Update your [AlloyDBOmni](https://aiven.github.io/aiven-operator/resources/alloydbomni.html)
resource.

</TabItem>
</Tabs>

## Connect to the service

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>
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
<TabItem value="terraform" label="Terraform">

Access your service with [the psql client](/docs/products/postgresql/howto/connect-psql)
using the `alloydb_service_uri` Terraform output.

```bash
psql "$(terraform output -raw alloydb_service_uri)"
```

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
