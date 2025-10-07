---
title: Monitor Aiven for ClickHouse® metrics with Aiven for Grafana®
sidebar_label: Monitor with Grafana
---

import NoThanosAccess from '@site/static/includes/no-thanos-access.md';

Push Aiven for ClickHouse® metrics to Aiven for Metrics or Aiven for PostgreSQL®, and integrate with Aiven for Grafana® to monitor your metrics on Grafana dashboards.

For more information on the metrics, see
[Aiven for ClickHouse® metrics exposed in Aiven for Grafana®](/docs/products/clickhouse/reference/metrics-list).

## Metrics storage options

Aiven provides two options for storing your Aiven for ClickHouse metrics:

- **Aiven for Metrics**: A managed time-series database service built on Thanos, optimized
  for long-term metrics storage and querying

  <NoThanosAccess/>

- **Aiven for PostgreSQL**: A relational database that can store metrics data using
  TimescaleDB extension

## Push ClickHouse® metrics to Metrics or PostgreSQL

To collect metrics about your Aiven for ClickHouse service,
configure a metrics integration and nominate somewhere to store the
collected metrics.

1.  On the service **Overview** page for your Aiven for ClickHouse service, go to
    **Manage integrations** and choose the **Store Metrics** option with
    **Store service metrics in a time-series database** as its
    description.
1.  Choose either a new or existing Aiven for Metrics or Aiven for PostgreSQL service.
    -   **For Aiven for Metrics**: This provides a Thanos-based time-series database
        optimized for metrics storage and long-term retention
    -   **For Aiven for PostgreSQL**: This stores metrics in a relational format, suitable
        if you prefer SQL-based querying
    -   If you choose to use a new service, follow instructions on
        [how to create a service](/docs/platform/howto/create_new_service).
    -   If you're already using Aiven for Metrics or Aiven for PostgreSQL,
        you can submit your Aiven for ClickHouse metrics to the existing service.

## Provision and configure Grafana®

1.  Go to your metrics storage service (Aiven for Metrics or Aiven for PostgreSQL) page
    in the Aiven Console. Under **Manage integrations**, click
    **Grafana Metrics Dashboard** to make the metrics available on that
    platform.
1.  Choose either a new or existing Aiven for Grafana service.
    -   If you choose to use a new service, follow instructions on
        [how to create a service](/docs/platform/howto/create_new_service).
    -   If you're already using Grafana on Aiven, you can integrate
        your Aiven for Metrics or Aiven for PostgreSQL as an additional data source for that
        existing Grafana.
1.  On the service **Overview** page for your Aiven for Grafana service, click
    the **Service URI** link. The username and password for your
    Aiven for Grafana service is also available on the same page.

Now your Aiven for Grafana service is connected to your metrics storage service
as a data source and you can visualize your ClickHouse metrics.

## Open ClickHouse® metrics dashboard

1.  In Grafana®, go to **Dashboards** > **Manage**.
1.  Double click the dashboard that bears the name of the metrics
    database.
1.  Browse the prebuilt dashboard or create your own monitoring views.
