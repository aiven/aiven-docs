---
title: Manage OpenSearch® log integration
sidebar_label: Log integration
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"

Aiven provides a service integration that allows you to send your logs from several services, such as Aiven for Apache Kafka®, PostgreSQL®, Apache Cassandra®, OpenSearch®, Caching, and Grafana®, to Aiven for OpenSearch®, allowing you to use OpenSearch to gain more insight and control over your logs.

:::tip
See this [video tutorial](https://www.youtube.com/watch?v=f4y9nPadO-M) for an end-to-end
example of how to enable your Aiven for OpenSearch® log integration.
:::

## Enable log integration

Enable logs integration to send logs from your service to Aiven for OpenSearch®:

1.  Log in to the [Aiven Console](https://console.aiven.io/) and go to the service that
    produces the logs to be sent to Aiven for OpenSearch.
1.  Click <ConsoleLabel name="logs"/> in the sidebar.
1.  On the **Logs** page, click **Enable logs integration**.
1.  In the **Logs integration** window, select an existing Aiven for OpenSearch service
    or create one, and click **Continue**.

    :::note
    If you choose to select an existing service and you are a member of more than one
    Aiven project with *operator* or *admin* access rights, select a project before
    selecting an Aiven for OpenSearch service.
    :::

1.  In the **Configure logs integration** window, set up the `index prefix` and
    `index retention limit` parameters, and click **Enable**.

    :::note
    To effectively disable the `index retention limit`, set it to its maximum value of `10000`
    days.
    :::

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

1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your Aiven for
    OpenSearch service.
1.  Click <ConsoleLabel name="integrations"/> in the sidebar.
1.  On the **Integrations** page, find the integrated service to configure.
1.  Click <ConsoleLabel name="actions"/> > <ConsoleLabel name="edit"/>.
1.  After updating `index prefix` or `index retention limit`, click **Edit**.

## Disable logs integration

To stop sending logs from your service to Aiven for OpenSearch, disable the integration:

1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your integrated
    Aiven for OpenSearch service.
1.  Click <ConsoleLabel name="integrations"/> in the sidebar.
1.  On the **Integrations** page, find the service sending its logs to your Aiven for
    OpenSearch service.
1.  Click <ConsoleLabel name="actions"/> > <ConsoleLabel name="disconnect"/>.
