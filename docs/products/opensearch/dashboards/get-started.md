---
title: Get started with Aiven for OpenSearch® Dashboards
sidebar_label: Get started
keywords: [quick start]
---

To start using **Aiven for OpenSearch® Dashboards**, [create Aiven for OpenSearch® service first](/docs/products/opensearch/get-started) and OpenSearch Dashboards service will be added alongside it.

Once the Aiven for OpenSearch service is running, the
connection information to your OpenSearch Dashboards is displayed in the service
overview page. Use your browser to access the OpenSearch Dashboards service.

## Load sample data

OpenSearch Dashboards come with three demonstration datasets included.
To add sample data:

1.  On the OpenSearch Dashboards landing page click **Add sample
    data**.
1.  Choose one of the available datasets and click **Add data**.
1.  Click **View data** to open the dashboard.

## Tools and pages

OpenSearch Dashboards have many tools and features for working with data
and running queries.

### Discover

**Discover** page provides an interface to work with available data
fields and run search queries by using either [the OpenSearch Dashboards
Query Language
(DQL)](https://opensearch.org/docs/latest/dashboards/dql/) or [Apache
Lucene®](https://lucene.apache.org/).

Additionally to search queries, you can filter the data by using either
a visual interface or [OpenSearch Query
DSL](https://opensearch.org/docs/latest/opensearch/query-dsl/index/)

:::tip
If the index you're looking at contains a date field, pay attention to
the currently selected date range when running a query.
:::

### Visualize

**Visualize** page is an interface to create and manage your
visualisations. In order to create a visualization:

1.  Select visualization type to use.
1.  Choose the source of data.
1.  Follow the interface to set up metrics and buckets.

### Dashboard

A set of visualization can be put together on a single dashboard. Search
queries and filters applied to the dashboard will refine results for
every included visualisation.

### Dev tools console

Read how you can use **Dev Tools** to run the queries directly from
OpenSearch Dashboards
[in a separate article](howto/dev-tools-usage-example) .

### Query Workbench

Query Workbench allows you to use SQL syntax instead of DSL to query the
data. For example, you can retrieve the items we just added to the
shopping list with:

```sql
select * from shopping-list
```

Find more on how to work [with SQL
Workbench](https://opensearch.org/docs/latest/search-plugins/sql/workbench/)
and [how to run SQL
queries](https://opensearch.org/docs/latest/search-plugins/sql/index/)
in the official documentation.

<div class="trademark">
*Apache Lucene is a registered trademark or trademark of the Apache
Software Foundation in the United States and/or other countries*
</div>
