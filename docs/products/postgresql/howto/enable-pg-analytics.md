---
title: Enable PostgreSQL for Analytics on Aiven for PostgreSQL®
sidebar_label: Enable PostgreSQL for Analytics
---

import RelatedPages from "@site/src/components/RelatedPages";

<!-- markdownlint-disable-next-line MD013 -->
Request access to [PostgreSQL for Analytics](/docs/products/postgresql/concepts/pg-analytics), connect your service to your Amazon S3 bucket, and create your first Iceberg table.

:::note
PostgreSQL for Analytics is in
[limited availability (LA)](/docs/platform/concepts/service-and-feature-releases#limited-availability-).
There's no self-service toggle: Aiven enables it for you on a per-service basis after
a request.
:::

## Prerequisites

- An Aiven for PostgreSQL 17 service with PostgreSQL for Analytics enabled, created
  by Aiven during onboarding.
- An [organization or project admin](/docs/platform/concepts/permissions) role in the
  project where that service runs.
- An Amazon S3 bucket that you own, in the same region as your service, and an AWS
  access key with permission to read from and write to that bucket.

## Request access

1. [Contact Aiven](https://aiven.io/contact) or your account team, and describe your
   analytical use case and the data volume you plan to work with.
1. Aiven reviews your request against the eligibility criteria for this LA stage.
1. After approval, Aiven creates a PostgreSQL service with PostgreSQL for Analytics
   enabled and schedules an onboarding call to walk through the feature and set
   expectations for this LA stage.

:::important
PostgreSQL for Analytics is set when the service is created. You can't add it to an
existing Aiven for PostgreSQL service.
:::

## Connect your Amazon S3 bucket

1. In the Aiven Console, go to your project.
1. Click **Integration endpoints**.
1. Click **Amazon S3**, then click **Add new endpoint**.
1. Enter an endpoint name.
1. In **Url**, enter your bucket's virtual-hosted-style URL:
   `https://BUCKET_NAME.s3.REGION.amazonaws.com`.
1. Enter the **Access Key Id** and **Secret Access Key** for an AWS user with read
   and write access to the bucket, and click **Create**.
1. Open your PostgreSQL for Analytics service page and click **Integrations**.
1. Under **Endpoint integrations**, click **PostgreSQL for Analytics Credentials**,
   and select the Amazon S3 endpoint you created.

If you later rotate the access key on the endpoint, your service picks up the new
credentials without any further action.

:::important
Use a bucket dedicated to this one service. Aiven doesn't prevent you from pointing
two services at the same bucket, or from using a bucket that already holds other
data, and neither is supported.
:::

## Enable the extension

Connect to the database where you plan to keep Iceberg tables, as its owner, which is
your primary service user `avnadmin` by default, and run:

```sql
CREATE EXTENSION pg_lake CASCADE;
```

Only the owner of a database can create or drop this extension. Your primary service
user holds the `lake_read`, `lake_write`, and `lake_read_write` roles with admin
option, so it can grant them to other database users who work with Iceberg tables.

## Create an Iceberg table

Create a table that stores its data as Iceberg files in your S3 bucket. Set `location`
to a path in your bucket:

```sql
CREATE TABLE orders_analytics (
    order_id bigint,
    customer_id bigint,
    order_total numeric(18,4),
    created_at timestamptz
) USING iceberg WITH (location = 's3://BUCKET_NAME/orders_analytics');
```

:::important[Always declare precision and scale on numeric columns]
Iceberg can't represent a `numeric` column with no declared precision and scale as an
exact decimal. If you create an Iceberg table from a `numeric` column without one,
PostgreSQL for Analytics converts it to `double precision`, an inexact binary
floating-point type, and only reports this with a low-severity `NOTICE`, which many
clients don't show by default:

```text
NOTICE:  column "order_total" has type that cannot be stored as an Iceberg
decimal, converting to double precision
HINT:  Use numeric(P,S) with precision <= 38 to preserve exact decimal
semantics.
```

A single converted value usually looks correct, but summing many of them, as most
analytical queries do, accumulates rounding error. Totals computed through
PostgreSQL for Analytics can silently stop matching the source data. This is
particularly risky for financial, billing, or audit workloads.

PostgreSQL for Analytics makes this conversion by default. To keep exact decimal
semantics, declare an explicit `numeric(P,S)` with a precision of 38 or less on every
numeric column you migrate. If you can't change the source table, cast the column in
your `SELECT`, for example `total::numeric(18,4)`.

To catch these columns instead of converting them, turn the conversion off for your
session. Creating a table with an unbounded numeric column then fails with an error
instead of a notice:

```sql
SET pg_lake_iceberg.unsupported_numeric_as_double = off;
```

:::

Load data into the table from an existing PostgreSQL table:

```sql
INSERT INTO orders_analytics SELECT * FROM orders;
```

Query the Iceberg table with standard SQL:

```sql
SELECT customer_id, sum(order_total)
FROM orders_analytics
GROUP BY customer_id
ORDER BY sum(order_total) DESC
LIMIT 10;
```

For more on managing extensions, see
[Manage Aiven for PostgreSQL® extensions](/docs/products/postgresql/howto/manage-extensions).

## Maintain Iceberg tables

Iceberg tables accumulate data files, snapshots, and metadata over time,
particularly if you insert data frequently in small batches. Run vacuum
maintenance regularly to compact data files, expire old snapshots, and remove
orphan files:

```sql
VACUUM orders_analytics;
```

Without regular maintenance, frequent small writes can leave many small files in
your S3 bucket, which slows down queries. Schedule maintenance with
[pg_cron](/docs/products/postgresql/howto/use-pg-cron-extension) or run it manually
after loading data in batches.

<RelatedPages/>

- [PostgreSQL for Analytics](/docs/products/postgresql/concepts/pg-analytics)
- [Manage Aiven for PostgreSQL® extensions](/docs/products/postgresql/howto/manage-extensions)
- [Use the pg_cron extension](/docs/products/postgresql/howto/use-pg-cron-extension)
- [Limited availability and early access features](/docs/platform/concepts/service-and-feature-releases)
