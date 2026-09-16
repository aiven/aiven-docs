---
title: Enable PostgreSQL for Analytics on Aiven for PostgreSQL®
sidebar_label: Enable PostgreSQL for Analytics
---

import RelatedPages from "@site/src/components/RelatedPages";

Enable [PostgreSQL for Analytics](/docs/products/postgresql/concepts/pg-analytics) on a new
Aiven for PostgreSQL® service, connect it to your Amazon S3 bucket, and create your
first Iceberg table.

:::note
PostgreSQL for Analytics is in
[limited availability (LA)](/docs/platform/concepts/service-and-feature-releases#limited-availability-)
and requires [access from Aiven](https://aiven.io/contact) before you can use it.
:::

## Prerequisites

- Access to PostgreSQL for Analytics granted by Aiven for your organization.
- An [organization or project admin](/docs/platform/concepts/permissions) role in the
  project where you create the service.
- An Amazon S3 bucket that you own, and an AWS access key with permission to read from
  and write to that bucket.

## Create a PostgreSQL for Analytics service

1. Log in to the [Aiven Console](https://console.aiven.io/) and go to your organization
   and project.
1. Click **Create service** and select **PostgreSQL®**.
1. Select a PostgreSQL 17 service plan.
1. In the service creation options, select **PostgreSQL for Analytics**.
1. Enter a service name, select a cloud region, and click **Create service**.

:::important
You can enable PostgreSQL for Analytics only when you create a service. You can't
add it to an existing service.
:::

## Connect your Amazon S3 bucket

1. In the Aiven Console, go to your organization's **Integration endpoints**.
1. Click **Create integration endpoint**, select **Amazon S3**, and enter your AWS
   access key, secret key, and bucket name.
1. Click **Create**.
1. Open your PostgreSQL for Analytics service page and go to **Integrations**.
1. Add a **Lakehouse credentials** integration and select the Amazon S3 endpoint you
   created.

## Enable the extension

Connect to your service and run:

```sql
CREATE EXTENSION pg_lake CASCADE;
```

## Create an Iceberg table

Create a table that stores its data as Iceberg files in your S3 bucket:

```sql
CREATE TABLE ORDERS_ANALYTICS (
    order_id bigint,
    customer_id bigint,
    order_total numeric,
    created_at timestamptz
) USING iceberg;
```

Load data into the table from an existing PostgreSQL table:

```sql
INSERT INTO ORDERS_ANALYTICS SELECT * FROM orders;
```

Query the Iceberg table with standard SQL:

```sql
SELECT customer_id, sum(order_total)
FROM ORDERS_ANALYTICS
GROUP BY customer_id
ORDER BY sum(order_total) DESC
LIMIT 10;
```

For more on managing extensions, see
[Manage Aiven for PostgreSQL® extensions](/docs/products/postgresql/howto/manage-extensions).

<RelatedPages/>

- [PostgreSQL for Analytics](/docs/products/postgresql/concepts/pg-analytics)
- [Manage Aiven for PostgreSQL® extensions](/docs/products/postgresql/howto/manage-extensions)
- [Create an Aiven for PostgreSQL® service](/docs/products/postgresql/get-started)
- [Limited availability and early access features](/docs/platform/concepts/service-and-feature-releases)
