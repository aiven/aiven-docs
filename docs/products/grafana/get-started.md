---
title: Get started with Aiven for Grafana®
sidebar_label: Get started
keywords: [quick start]
---

import CreateService from "@site/static/includes/create-service-console.md"

To start using Aiven for Grafana®, the first step is to create a service. You can do this in the [Aiven Console](https://console.aiven.io/) or with the [Aiven CLI](https://github.com/aiven/aiven-client).

## Create an Aiven for Grafana service

<CreateService serviceType="Grafana®"/>

## Log in to Grafana

After starting the Aiven for Grafana service, you can access Grafana:

1.  From the [Aiven Console](https://console.aiven.io/), access your
    Aiven for Grafana service.
2.  In the service **Overview** screen, copy or select the **Service
    URI** to launch the Grafana login page in a browser.
3.  On the login page, enter or copy and paste the **User** and
    **Password** details from the *Connection information* section, and
    select **Log in**.

You can begin visualizing your data sources using the default dashboards
or create your own.

## Grafana resources

-   [Open source Grafana page](https://grafana.com/oss/grafana/)
-   [Grafana docs](https://grafana.com/docs/)
-   [Aiven Terraform Provider - Grafana resource
    docs](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/grafana)
    and [Grafana data source
    docs](https://registry.terraform.io/providers/aiven/aiven/latest/docs/data-sources/grafana)
