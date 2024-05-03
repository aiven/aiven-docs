---
title: Aiven for Grafana® quickstart
---

To start using Aiven for Grafana®, the first step is to create a
service. You can do this in the [Aiven web
console](https://console.aiven.io/) or with the [Aiven
CLI](https://github.com/aiven/aiven-client).

This quickstart section provides the steps to create an Aiven for
Grafana service and how to log in to Aiven for Grafana®.

## Create an Aiven for Grafana service

1.  Log in to the [Aiven Console](https://console.aiven.io/).
2.  Follow
    [these instructions](/docs/platform/howto/create_new_service) to create an Aiven for Grafana service.

Once the service is ready, the status changes to *Running*. Depending on
your selected cloud provider and region, this generally takes a couple
of minutes.

## Log in to Grafana

After starting the Aiven for Grafana service, you can follow these steps
to access Grafana:

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
