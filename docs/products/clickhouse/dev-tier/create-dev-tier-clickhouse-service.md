---
title: Create an Aiven for ClickHouse® Developer tier service
sidebar_label: Create a Developer tier service
description: Create an Aiven for ClickHouse Developer tier service using the Aiven Console, CLI, or Terraform.
keywords: [create, clickhouse, developer tier]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";
import TerraformApply from "@site/static/includes/terraform-apply-changes.md";

Create an Aiven for ClickHouse® Developer tier service using the [Aiven Console](https://console.aiven.io), the [Aiven CLI](/docs/tools/cli), or Terraform.

For features, specifications, and limitations, see
[Aiven for ClickHouse® Developer tier](/docs/products/clickhouse/dev-tier/clickhouse-dev-tier).

## Prerequisites

- An Aiven account. Sign up or sign in using the [Aiven Console](https://console.aiven.io).
- A project where you can create paid services.
- Billing set up for your organization. See
  [Billing and payment](/docs/platform/concepts/billing-and-payment).
- To use the Aiven CLI, the [Aiven CLI](/docs/tools/cli) installed and authenticated.
- To use Terraform, [Terraform](https://www.terraform.io/downloads) installed and a
  [personal token](/docs/platform/howto/create_authentication_token).

## Create a Developer tier service

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. In your project, click <ConsoleLabel name="services" />.
1. Click **Create service**.
1. Select **Aiven for ClickHouse®**.
1. In **Service tier**, select **Developer**.
1. In **Cloud**, select a geographical area, such as **Europe**.

   :::note
   On the Developer tier, **Cloud** lists broad geographical areas only. You can't choose
   a specific cloud provider or region.
   :::

1. In **Plan**, select **Developer-4**.
1. In **Service basics**, enter a service name.

   You can't change the service name after you create the service.

1. Review the **Service summary** and the estimated monthly price.
1. Click **Create service**.

The Aiven Console selects the ClickHouse version automatically. You can't change it during
service creation.

When the status is **Running**, your service is ready.

</TabItem>
<TabItem value="cli" label="CLI">

Run the following command:

```bash
avn service create SERVICE_NAME \
  --project PROJECT_NAME \
  --service-type clickhouse \
  --cloud CLOUD_NAME \
  --plan developer-4
```

Replace the following:

- `SERVICE_NAME`: A name for your service. You can't change it later.
- `PROJECT_NAME`: The name of your project.
- `CLOUD_NAME`: The cloud for your geographical area, such as `do-fra` for Europe.

</TabItem>
<TabItem value="terraform" label="Terraform">

Add the following resource to your configuration. For provider setup, see
[Aiven Provider for Terraform](/docs/tools/terraform).

```hcl
resource "aiven_clickhouse" "dev" {
  project      = var.aiven_project_name
  cloud_name   = "do-fra"
  plan         = "developer-4"
  service_name = "my-clickhouse-dev"
}
```

<TerraformApply />

For the full resource schema, see the
[`aiven_clickhouse` resource documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/clickhouse).

When you change `plan` to a Startup plan, also set `cloud_name` to a cloud that supports
it.

</TabItem>
</Tabs>

## After you create the service

When the service status is **Running**, you can:

- **Connect a client**: On the <ConsoleLabel name="overview" /> page, click
  **Quick connect** and follow the instructions. See
  [Connect to Aiven for ClickHouse®](/docs/products/clickhouse/howto/list-connect-to-service).
- **Create databases and tables**: See
  [Manage Aiven for ClickHouse® databases and tables](/docs/products/clickhouse/howto/manage-databases-tables).
- **Integrate other services**: Connect data sources and Aiven services. See
  [Aiven for ClickHouse® service integrations](/docs/products/clickhouse/concepts/data-integration-overview).

## Upgrade your Developer tier service

Upgrade to the Startup plan or higher when the Developer tier no longer meets your
compute, storage, or availability needs. For upgrade considerations, see
[Upgrade to a higher service tier](/docs/products/clickhouse/dev-tier/clickhouse-dev-tier#upgrade-to-a-higher-service-tier).

1. Open your Developer tier service.
1. On the <ConsoleLabel name="overview" /> page, in **Service plan usage**, click
   **Change plan**.
1. In the **Quick upgrade** dialog, do one of the following:
   - Review the recommended Startup plan, and click **Upgrade**.
   - Click **Customize instead** to choose another configuration.
1. Follow the instructions in the Aiven Console.

You can also click **Change plan** in <ConsoleLabel name="servicesettings" /> >
**Service summary**.

When you upgrade, your service migrates to another cloud provider. Your credentials and
Aiven DNS records stay the same, so your connection details don't change.

:::note[Note]
You can't downgrade to the Developer tier after you upgrade.
:::

For more information, see
[Change the plan for your Aiven for ClickHouse® service](/docs/products/clickhouse/howto/change-service-plan).

<RelatedPages />

- [Aiven for ClickHouse® Developer tier](/docs/products/clickhouse/dev-tier/clickhouse-dev-tier)
- [Get started with Aiven for ClickHouse®](/docs/products/clickhouse/get-started)
- [Change the plan for your Aiven for ClickHouse® service](/docs/products/clickhouse/howto/change-service-plan)
