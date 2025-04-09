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

1.  In the [Aiven Console](https://console.aiven.io/),
    [create the 3 services](create_new_service): Aiven for Apache Kafka®, Aiven for
    PostgreSQL®, and Aiven for Grafana®.

1.  On the **Services** page, open the PostgreSQL service.

1.  Click **Integrations**.

1.  Under **Aiven services**, click **Grafana Metrics Dashboard**.

1.  Select **Existing service** and choose the Grafana service you created.

1.  Click **Enable**.

1.  To send metrics from the Apache Kafka service, under **Aiven services**
    select **Receive Metrics**.

1.  Select **Existing service** and choose the Apache Kafka service you created.

1.  Click **Enable**.

1.  To view the Apache Kafka metrics data in Grafana, go to your Grafana service.

1.  In the **Connection information** section, click the **Service URI** to open Grafana.

1.  Log in using the **User** and **Password** provided in the **Connection information**
    section.

1.  On the dashboards page, click the dashboard name to view it.

</TabItem>
<TabItem value="terraform" label="Terraform" default>



</TabItem>
</Tabs>

:::note
If you don't see a dashboard after logging in, search for
`Aiven Kafka - <YOUR_KAFKA_SERVICE_NAME> - Resources` in the Grafana console.
This is a predefined dashboard automatically maintained by Aiven.
:::

:::note
Data may take a minute to appear on the dashboard if you've just
enabled the integrations. Refresh the view by reloading the page.
You can create custom dashboards either from scratch in Grafana or by saving a copy
of the predefined dashboard under a different name that does not start with `Aiven`.
:::

:::warning
Any modifications to the predefined dashboard will be automatically
overwritten by the system in time.
:::
