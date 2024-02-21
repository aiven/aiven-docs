---
title: Integrate with Grafana®
---

You can monitor and set up alerts for the data in your Aiven for
OpenSearch® service with Grafana®. This feature is especially powerful
if you're sending your Aiven service logs to an OpenSearch instance
using [log integration](opensearch-log-integration).

## Prerequisites

1.  Aiven for OpenSearch service.
2.  Aiven for Grafana service, see how to
    [get started with Aiven for Grafana](/docs/products/grafana/get-started).

## Variables

we'll use these values later in the set up. They can be found in your
Aiven for OpenSearch service page, in the connection information.

 | Variable              | Description                             |
 | --------------------- | --------------------------------------- |
 | `OPENSEARCH_URI`      | Service URI of your OpenSearch service. |
 | `OPENSEARCH_USER`     | Username to access OpenSearch service.  |
 | `OPENSEARCH_PASSWORD` | Password to access OpenSearch service.  |

## Integration steps

1.  [Log into Aiven for Grafana](/docs/products/grafana/howto/log-in).
2.  In **Configuration menu**, select **Data sources**.
3.  Click to **Add data source**.
4.  Find **OpenSearch** in the list and select it. You\'ll see a panel
    with list of settings to fill in.
5.  Use your preferred in the *Name* field. You\'ll use it later for
    creating dashboards and alerts.
6.  Set *URL* to `OPENSEARCH_URI`.
7.  In *Auth* section enable **Basic auth** and **With Credentials**.
8.  In *Basic Auth Details* set your `OPENSEARCH_USER` and
    `OPENSEARCH_PASSWORD`.
9.  Scroll down to *OpenSearch details* and set the index name or an
    index pattern (for example, `logs-*`).
10. Set the time field name (in case you use
    [the log integration](opensearch-log-integration) it will be `timestamp`).
11. Press on **Save & test**. In case of errors, verify that the data
    source information is set correctly.

## Create dashboards and alerts

Using the interface of Grafana you can now create dashboards and alerts.

Select **Create** from the menu on the left and select to create either
a dashboard or an alert rule. Follow the instructions to set them up.
