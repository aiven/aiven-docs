---
title: Visualize PostgreSQL® data with Grafana®
---

PostgreSQL® can hold a wide variety of types of data, and creating
visualisations helps gather insights on top of raw figures. Luckily,
Aiven can set up the Grafana® and the integration between the two
services for you.

## Integrate PostgreSQL and Grafana

1.  On the **Overview** page for your Aiven for PostgreSQL service, go
    to **Manage integrations** and choose the **Monitor Data in
    Grafana** option.
2.  Choose either a new or existing Grafana service.
    -   A new service will ask you to select the cloud, region and plan
        to use. You should also give your service a name. The service
        overview page shows the nodes rebuilding, and then indicates
        when they are ready.
    -   If you're already using Grafana on Aiven, you can integrate
        your PostgreSQL as a data source for that existing Grafana.
3.  On the **Overview** page for your Aiven for Grafana service, select
    the **Service URI** link. The username and password for your Grafana
    service is also available on the service's **Overview** page.

Now your Grafana service is connected to PostgreSQL as a data source and
you can go ahead and visualise your data.

## Visualize PostgreSQL data in Grafana

In Grafana, create a new dashboard and add a panel to it.

The datasource dropdown shows `--Grafana--` by default, but you will
also find your PostgreSQL service listed here.

![Screenshot of a Grafana panel showing PostgreSQL logo](/images/content/products/postgresql/grafana-pg-logo.png)

With your PostgreSQL service selected, the \"Query\" section will show
the metrics from the database in its dropdown.

:::tip
If no metrics are shown, check that there is data in the database
:::

Once you are happy with your panel, give it a title and click \"Save\"
in the top right hand corner.

![Screenshot of a Grafana panel](/images/content/products/postgresql/view-data-postgresql-grafana.png)

:::tip
Grafana expects a Time column in the query, if you don't have any, use
the function `NOW()` which generates the up-to-date timestamp.
:::

To get to know Grafana better, try the [Grafana
Fundamentals](https://grafana.com/tutorials/grafana-fundamentals/?pg=docs)
page on the Grafana project site.
