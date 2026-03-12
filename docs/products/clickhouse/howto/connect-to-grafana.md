---
title: Visualize ClickHouse® data with Grafana®
sidebar_label: Visualize data with Grafana
---

You can visualise your ClickHouse® data using Grafana® and Aiven can
help you connect the two services.

## Prerequisites

1.  Aiven for ClickHouse® service accessible by HTTPS
1.  Aiven for Grafana® service (see how to
    [get started with Aiven for Grafana®](/docs/products/grafana/get-started))

## Variables

You\'ll need a few variables for the setup. To get their values, go to
[Aiven Console](https://console.aiven.io/) and go to **Overview**
of your Aiven for ClickHouse® service (**Connection information** >
**ClickHouse HTTPS & JDBC**).

| Variable               | Description                                   |
| ---------------------- | --------------------------------------------- |
| `CLICKHOUSE_HTTPS_URI` | HTTPS service URI of your ClickHouse service. |
| `CLICKHOUSE_USER`      | Username to access ClickHouse service.        |
| `CLICKHOUSE_PASSWORD`  | Password to access ClickHouse service.        |

## Integrate ClickHouse® with Grafana®

1.  Log in to Aiven for Grafana® following
    [the instructions](/docs/products/grafana/howto/log-in).
1.  From the **Configuration** menu, select **Data sources** > **Add
    data source**.
1.  Find **Altinity plugin for ClickHouse** in the list and select it.
1.  Set **URL** to `CLICKHOUSE_HTTPS_URI`.
1.  In **Auth** section, enable **Basic auth** and **With Credentials**.
1.  In **Basic Auth Details**, set your `CLICKHOUSE_USER` and
    `CLICKHOUSE_PASSWORD`.
1.  Select **Save & test**.

Now you can create a dashboard and panels to work with the data from
your Aiven for ClickHouse® service.
