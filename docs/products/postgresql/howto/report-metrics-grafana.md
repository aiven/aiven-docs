---
title: Monitor PostgreSQL® metrics with Grafana®
---

As well as offering PostgreSQL-as-a-service, the Aiven platform gives
you access to monitor the database. The metrics/dashboard integration in
the Aiven console lets you send PostgreSQL® metrics to an external
endpoint like Datadog or to create an integration and a
[prebuilt dashboard](/docs/products/postgresql/reference/pg-metrics) in Aiven for Grafana®.

Get detailed information about the
metrics and dashboard sections in
[PostgreSQL® metrics exposed in Grafana®](/docs/products/postgresql/reference/pg-metrics).

## Push PostgreSQL metrics to M3DB, or PostgreSQL

To collect metrics about your PostgreSQL service you will need to
configure a metrics integration and nominate somewhere to store the
collected metrics.

1.  In the **Overview** page of your Aiven for PostgreSQL service, go to
    **Manage integrations** and choose the **Store Metrics** option with
    **Store service metrics in a time-series database** as its
    description.
2.  Choose either a new or existing M3DB, or PostgreSQL
    service.

    -   A new service will ask you to select the cloud, region and plan
        to use. You should also give your service a name. The service
        overview page shows the nodes rebuilding, and indicates
        when they are ready.
    -   If you're already using M3DB, or PostgreSQL on Aiven,
        you can submit your PostgreSQL metrics to the existing service.

:::warning
Although you can send metrics of your PostgreSQL service to this very
service, this is not recommended since it increases the load on the
monitored system. This can also result in issues with the availability
of the metrics in case of problems with the service.
:::

## Provision and configure Grafana

1.  Select the target M3DB, or PostgreSQL database service and
    go to its service page. Under **Manage integrations**, choose the
    **Grafana Metrics Dashboard** option to make the metrics available on
    that platform.

2.  Choose either a new or existing Grafana service.

    -   A new service will ask you to select the cloud, region and
        plan to use. You should also give your service a name. The
        service overview page shows the nodes rebuilding, and
        indicates when they are ready.
    -   If you're already using Grafana on Aiven, you can integrate
        your M3DB as an additional data source for that existing
        Grafana.

3.  On the **Overview** page for your Aiven for Grafana service, select
    the **Service URI** link. The username and password for your Grafana
    service is also available on the service's **Overview** page.

Now your Grafana service is connected to M3DB as a data source and you
can go ahead and visualize your PostgreSQL metrics.

## Open PostgreSQL metrics prebuilt dashboard

In Grafana, go to **Dashboards** and **Manage**, and double click the
dashboard named after the metrics database.

![Screenshot of a Grafana Manage Dashboards panel](/images/content/products/postgresql/metrics-dashboard-manage.png)

Browse the prebuilt dashboard or create your own monitoring views. More
info about the dashboard and pushed metrics can be found at
[PostgreSQL® metrics exposed in Grafana®](/docs/products/postgresql/reference/pg-metrics)

![Screenshot of the PostgreSQL Metrics Dashboard for Grafana](/images/content/products/postgresql/metrics-dashboard-global.png)
