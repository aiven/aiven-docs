---
title: Monitor Aiven for ClickHouse® metrics with Grafana®
---

As well as offering ClickHouse®-as-a-service, the Aiven platform gives
you access to monitor the database. The metrics/dashboard integration in
the Aiven console allows you to create an integration and monitoring
dashboards in Aiven for Grafana®. For more information on the metrics,
see
[Aiven for ClickHouse® metrics exposed in Aiven for Grafana®](/docs/products/clickhouse/reference/metrics-list).

## Push ClickHouse® metrics to M3DB, or PostgreSQL®

To collect metrics about your ClickHouse® service, you will need to
configure a metrics integration and nominate somewhere to store the
collected metrics.

1.  On the service **Overview** page for your ClickHouse® service, go to
    **Manage integrations** and choose the **Store Metrics** option with
    **Store service metrics in a time-series database** as its
    description.
2.  Choose either a new or existing M3DB, or PostgreSQL®
    service.
    -   If you choose to use a new service, follow instructions on
        [how to create a service](/docs/platform/howto/create_new_service).
    -   If you're already using M3DB, or PostgreSQL on Aiven,
        you can submit your ClickHouse® metrics to the existing service.

## Provision and configure Grafana®

1.  Select the target M3DB, or PostgreSQL database service and
    go to its service page. Under **Manage integrations**, select
    **Grafana Metrics Dashboard** to make the metrics available on that
    platform.
2.  Choose either a new or existing Grafana® service.
    -   If you choose to use a new service, follow instructions on
        [how to create a service](/docs/platform/howto/create_new_service).
    -   If you're already using Grafana® on Aiven, you can integrate
        your M3DB as an additional data source for that existing
        Grafana.
3.  On the service **Overview** page for your Grafana® service, select
    the **Service URI** link. The username and password for your
    Grafana® service is also available on the same page.

Now your Grafana® service is connected to M3DB, or PostgreSQL
as a data source and you can go ahead and visualize your ClickHouse®
metrics.

## Open ClickHouse® metrics dashboard

1.  In Grafana®, go to **Dashboards** \> **Manage**.
2.  Double click on the dashboard that bears the name of the metrics
    database.
3.  Browse the prebuilt dashboard or create your own monitoring views.
