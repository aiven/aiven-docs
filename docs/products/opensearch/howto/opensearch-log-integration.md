---
title: Manage OpenSearch® log integration
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

Aiven provides a service integration that allows you to send your logs from several services, such as Aiven for Apache Kafka®, PostgreSQL®, Apache Cassandra®, OpenSearch®, Caching, and Grafana®, to Aiven for OpenSearch®, allowing you to use OpenSearch to gain more insight and control over your logs.

:::tip
See this [video tutorial](https://www.youtube.com/watch?v=f4y9nPadO-M) for an end-to-end
example of how to enable your Aiven for OpenSearch® log integration.
:::

## Enable log integration

Enable logs integration to send your service's logs to your Aiven for
OpenSearch® from another Aiven service:

1.  Log in to the [Aiven Console](https://console.aiven.io/), and select
    the Aiven for OpenSearch service for which to enable log
    integration.

1.  Select **Logs** from the left sidebar, and select **Enable logs
    integration**.

1.  Select an existing OpenSearch instance or create one, then select **Continue**.

    -   When creating a new service you will need to select the
        cloud, region and plan to use. You should also give your
        service a name. The service overview page shows the nodes
        rebuilding, and indicates when they are ready.
    -   If you're already using OpenSearch on Aiven, you can use
        your running OpenSearch service as a destination for your
        metrics data. If you are a member of more than one Aiven
        project with *operator* or *admin* access rights, you need
        to choose the project first then your target OpenSearch
        service.

1.  Configure your `index prefix` and `index retention limit`
    parameters, then select **Enable**.

:::note
To effectively disable the `index retention limit`, you can
set it to the maximum value which is 10000 days.
:::

Your Aiven service is now sending logs to your OpenSearch service which
you can explore further.

## Configure log integration

There are two parameters that you can adjust when integrating logs to
your OpenSearch service:

-   `index prefix`, specifies the prefix part of the index name
-   `index retention limit`, number of days to preserve the daily
    indexes

:::warning
The service's logs are sent from the selected service to your
OpenSearch cluster. When the `index retention limit` is reached, those
indexes are deleted from the OpenSearch cluster.
:::

You can change the configuration of the `index prefix` and
`index retention limit` after the integration is enabled.

1.  Log in to the [Aiven Console](https://console.aiven.io/), and select
    the Aiven for OpenSearch service.
1.  Click **Integrations** on the sidebar.
1.  Identify the service to configure in the Integrations page.
1.  Click <ConsoleLabel name="actions"/> > **Edit**.
1.  After making the changes, click **Edit** again to save them.

## Disable logs integration

To stop sending logs from your service to OpenSearch, disable the integration:

1.  In your Aiven for OpenSearch service, go to the
    **Integrations** screen and locate the
    service to modify.
1.  Click <ConsoleLabel name="actions"/> > **Disconnect**.
1.  In the confirmation window, click **Disconnect** again to confirm
    and save the changes.

Your log integration for OpenSearch will be disabled.
