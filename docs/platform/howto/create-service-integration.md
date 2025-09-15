---
title: Create service integrations
---

import TerraformPrereqs from "@site/static/includes/terraform-get-started-prerequisites.md";
import TerraformApply from "@site/static/includes/terraform-apply-changes.md";
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Create [service integrations](/docs/platform/concepts/service-integration) between different Aiven services and move telemetry data using these integrations.

:::tip
For help with setting up a service integration or to request an integration type or
endpoint not yet available, contact the [support team](mailto:support@aiven.io)
:::

The following example shows you how to create and integrate these services:

-   An Aiven for Apache Kafka® service that produces the telemetry data.
-   An Aiven for PostgreSQL® service where the telemetry data is stored and can be queried.
-   An Aiven for Grafana® service for the telemetry data.

## Prerequisites

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

- Access to the [Aiven Console](https://console.aiven.io)

</TabItem>
<TabItem value="terraform" label="Terraform">

<TerraformPrereqs />

</TabItem>
</Tabs>

## Create the integrations

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1.  In the Aiven Console,
    [create the 3 services](create_new_service): Aiven for Apache Kafka®, Aiven for
    PostgreSQL®, and Aiven for Grafana®.

1.  On the **Services** page, open the PostgreSQL service.

1.  Click **Integrations**.

1.  Under **Aiven services**, click **Grafana Metrics Dashboard**.

1.  Select the Grafana service you created.

1.  Click **Enable**.

1.  To send metrics from the Apache Kafka service, under **Aiven services**
    select **Receive Metrics**.

1.  Select the Apache Kafka service you created.

1.  Click **Enable**.

</TabItem>
<TabItem value="terraform" label="Terraform">

1. Create a file named `provider.tf` and add the following:

    <TerraformSample filename='integrations/kafka_pg_grafana/provider.tf' />

1. For the services, create a file named `services.tf` and add the following:

    <TerraformSample filename='integrations/kafka_pg_grafana/services.tf' />

1. To integrate the services, create a file named `integrations.tf` and add
   the following:

    <TerraformSample filename='integrations/kafka_pg_grafana/integrations.tf' />

1. Create a file named `variables.tf` and add the following:

    <TerraformSample filename='integrations/kafka_pg_grafana/variables.tf' />

1. Create a file named `terraform.tfvars` and add values for your token and Aiven project.

<TerraformApply />

</TabItem>
</Tabs>

To view the Apache Kafka metrics data in Grafana:

1.  In the [Aiven Console](https://console.aiven.io/), go to your Grafana service.

1.  In the **Connection information** section, click the **Service URI** to open Grafana.

1.  Log in using the **User** and **Password** provided in the **Connection information**
    section.

1.  On the dashboards page in Grafana, click the dashboard name to view it.

If you don't see a dashboard after logging in, search for
`Aiven Kafka - <KAFKA_SERVICE_NAME> - Resources` in the Grafana console.
This is a predefined dashboard automatically maintained by Aiven. Data can take a minute
to appear on the dashboard after enabling the integrations. Refresh the view by reloading
the page.

:::warning
Any modifications you make to the predefined dashboard are automatically
overwritten by the system during updates.
:::

You can create your own custom dashboards, or make a copy of this predefined dashboard
to customize it. Don't use `Aiven` at the start of your dashboard names.
