---
title: Enable PostgreSQL for Analytics on Aiven for PostgreSQL®
sidebar_label: Enable PostgreSQL for Analytics
limited: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RequirementsPanel from "@site/src/components/RequirementsPanel";
import RelatedPages from "@site/src/components/RelatedPages";

<!-- markdownlint-disable-next-line MD013 -->
Connect your [PostgreSQL for Analytics](/docs/products/postgresql/concepts/pg-analytics) service to your storage bucket, create Iceberg tables, and query them with standard SQL.

<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: ['`role:organization:admin`', '`role:project:admin`'],
    },
  ]}
/>

:::note
PostgreSQL for Analytics is in
[limited availability (LA)](/docs/platform/concepts/service-and-feature-releases#limited-availability-).
[Request access](https://aiven.io/contact) to use it.
:::

## Prerequisites

- PostgreSQL for Analytics enabled for your project. [Request access](https://aiven.io/contact),
  and Aiven enables it for you.
- Access to the [Aiven API](https://api.aiven.io/doc/) or the
  [Aiven CLI](/docs/tools/cli), which you need to create the service.
- Optionally, to connect the bucket with Terraform,
  [Aiven Provider for Terraform](https://registry.terraform.io/providers/aiven/aiven/latest/docs)
  4.64.0 or later.
- A storage bucket that you own, in the same region as your service, and an access key
  with permission to read from and write to it.

## Create your service

Create a PostgreSQL for Analytics service with the API or the CLI. Choose a plan with
room for both engines: PostgreSQL runs with the memory settings of a half-size plan, and
the analytical query engine needs memory and disk of its own.

Set both `variant` and `service_architecture` on every service you create.

<Tabs groupId="group2">
<TabItem value="cli" label="CLI" default>

```bash
avn service create SERVICE_NAME --project PROJECT_NAME \
  --service-type pg                                    \
  --plan PLAN                                          \
  --cloud CLOUD_REGION                                 \
  -c pg_version=17                                     \
  -c variant=pg_lake                                   \
  -c service_architecture=granite
```

</TabItem>
<TabItem value="api" label="API">

Use the [ServiceCreate](https://api.aiven.io/doc/#tag/Service/operation/ServiceCreate)
endpoint:

```bash
curl --request POST                                                  \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/service         \
  --header 'Authorization: Bearer BEARER_TOKEN'                 \
  --header 'content-type: application/json'                          \
  --data '{
    "service_name": "SERVICE_NAME",
    "service_type": "pg",
    "plan": "PLAN",
    "cloud": "CLOUD_REGION",
    "user_config": {
      "pg_version": "17",
      "variant": "pg_lake",
      "service_architecture": "granite"
    }
  }'
```

</TabItem>
</Tabs>

If PostgreSQL for Analytics isn't enabled for your project, the request fails with
`Setting variant is not allowed`.

## Connect your storage bucket

Create an Amazon S3 integration endpoint in your project, then connect that endpoint to
your service with a PostgreSQL for Analytics Credentials integration. This endpoint type
holds the bucket URL and the access credentials for both Amazon S3 and Google Cloud
Storage, and the integration passes them to the analytical query engine. The integration's
source is your PostgreSQL for Analytics service, and its destination is the endpoint.

Set the endpoint's URL to your bucket:

| Storage | URL |
| --- | --- |
| Amazon S3 | `https://BUCKET_NAME.s3.REGION.amazonaws.com` |
| Google Cloud Storage | `https://storage.googleapis.com/BUCKET_NAME` |

Add a path after the bucket to scope the credentials to a prefix, such as
`https://storage.googleapis.com/BUCKET_NAME/analytics`. For Google Cloud Storage, use an
HMAC key as the access key and secret.

<Tabs groupId="group1">
<TabItem value="gui" label="Console" default>

1. In the Aiven Console, go to your project.
1. Click **Integration endpoints**.
1. Click **Amazon S3**, then click **Add new endpoint**.
1. Enter an endpoint name.
1. In **Url**, enter your bucket's URL.
1. Enter the **Access Key Id** and **Secret Access Key** for a user with read and write
   access to the bucket, and click **Create**.
1. Open your PostgreSQL for Analytics service page and click **Integrations**.
1. Under **Endpoint integrations**, click **PostgreSQL for Analytics Credentials**,
   and select the endpoint you created.

</TabItem>
<TabItem value="cli" label="CLI">

1. Create the endpoint:

   ```bash
   avn service integration-endpoint-create --project PROJECT_NAME \
     --endpoint-name analytics-storage                            \
     --endpoint-type external_aws_s3                              \
     -c url="https://BUCKET_NAME.s3.REGION.amazonaws.com"         \
     -c access_key_id=AWS_ACCESS_KEY_ID                           \
     -c secret_access_key=AWS_SECRET_ACCESS_KEY
   ```

1. Find the endpoint's ID:

   ```bash
   avn service integration-endpoint-list --project PROJECT_NAME
   ```

1. Connect the endpoint to your service:

   ```bash
   avn service integration-create --project PROJECT_NAME \
     --integration-type pg_for_analytics_credentials     \
     --source-service SERVICE_NAME                       \
     --dest-endpoint-id ENDPOINT_ID
   ```

</TabItem>
<TabItem value="api" label="API">

1. Create the endpoint with
   [ServiceIntegrationEndpointCreate](https://api.aiven.io/doc/#tag/Service_Integrations/operation/ServiceIntegrationEndpointCreate):

   ```bash
   curl --request POST                                                  \
     --url https://api.aiven.io/v1/project/PROJECT_NAME/integration_endpoint \
     --header 'Authorization: Bearer BEARER_TOKEN'                 \
     --header 'content-type: application/json'                          \
     --data '{
       "endpoint_name": "analytics-storage",
       "endpoint_type": "external_aws_s3",
       "user_config": {
         "url": "https://BUCKET_NAME.s3.REGION.amazonaws.com",
         "access_key_id": "AWS_ACCESS_KEY_ID",
         "secret_access_key": "AWS_SECRET_ACCESS_KEY"
       }
     }'
   ```

   The response contains the `endpoint_id` you need in the next step.

1. Connect the endpoint to your service with
   [ServiceIntegrationCreate](https://api.aiven.io/doc/#tag/Service_Integrations/operation/ServiceIntegrationCreate):

   ```bash
   curl --request POST                                                  \
     --url https://api.aiven.io/v1/project/PROJECT_NAME/integration     \
     --header 'Authorization: Bearer BEARER_TOKEN'                 \
     --header 'content-type: application/json'                          \
     --data '{
       "integration_type": "pg_for_analytics_credentials",
       "source_service": "SERVICE_NAME",
       "dest_endpoint_id": "ENDPOINT_ID"
     }'
   ```

Replace the placeholders with your project name, bearer token, bucket URL, access
credentials, service name, and endpoint ID.

</TabItem>
<TabItem value="tf" label="Terraform">

Requires
[Aiven Provider for Terraform](https://registry.terraform.io/providers/aiven/aiven/latest/docs)
4.64.0 or later. Terraform connects the bucket to a service you created with the API or
the CLI, so reference that service by name.

```hcl
resource "aiven_service_integration_endpoint" "analytics_storage" {
  project       = "PROJECT_NAME"
  endpoint_name = "analytics-storage"
  endpoint_type = "external_aws_s3"

  external_aws_s3_user_config {
    url               = "https://BUCKET_NAME.s3.REGION.amazonaws.com"
    access_key_id     = var.access_key_id
    secret_access_key = var.secret_access_key
  }
}

resource "aiven_service_integration" "analytics_credentials" {
  project                 = "PROJECT_NAME"
  integration_type        = "pg_for_analytics_credentials"
  source_service_name     = "SERVICE_NAME"
  destination_endpoint_id = aiven_service_integration_endpoint.analytics_storage.id
}
```

</TabItem>
</Tabs>

If you later rotate the access key on the endpoint, your service picks up the new
credentials without any further action.

:::important
Use a bucket dedicated to this one service, and keep the integration in place once you
have Iceberg tables. Queries expect those tables in the bucket the integration points to,
so they fail if it changes.
:::

:::note
Aiven doesn't validate the URL or the credentials when you create the integration. If
either is wrong, the service still starts and PostgreSQL works normally, but any statement
against an Iceberg table fails later:

```text
ERROR:  HTTP Error: HTTP GET error reading 's3://BUCKET_NAME/orders_analytics' in region
'REGION' (HTTP 403 Forbidden)
AccessDenied: Access Denied
```

Verify the endpoint's **Url**, **Access Key Id**, and **Secret Access Key**.
:::

## Enable the extension

Connect to the database where you plan to keep Iceberg tables as your primary service
user, `avnadmin`, and run:

```sql
CREATE EXTENSION pg_lake CASCADE;
```

## Grant access to Iceberg tables

Your service comes with three group roles. As `avnadmin`, grant membership to the
database users who need it:

| Role | Members can |
| --- | --- |
| `lake_read` | Read data in Iceberg tables |
| `lake_write` | Write data in Iceberg tables |
| `lake_read_write` | Read and write data in Iceberg tables, and create them |

```sql
GRANT lake_read_write TO analytics_user;
```

:::important
`lake_read_write` is the only role with access to the `pg_lake_iceberg` foreign server, so
anyone who creates Iceberg tables needs it. Granting `lake_read` and `lake_write` together
isn't equivalent.
:::

## Create an Iceberg table

Create a table that stores its data as Iceberg files in your bucket. Set `location`
to a path in your bucket:

```sql
CREATE TABLE orders_analytics (
    order_id bigint,
    customer_id bigint,
    order_total numeric(18,4),
    created_at timestamptz
) USING iceberg WITH (location = 's3://BUCKET_NAME/orders_analytics');
```

:::important
Set `location` on every Iceberg table, and keep it inside the bucket and path of the
endpoint you connected. Aiven scopes the storage credentials to that path, so a table
outside it fails with an access error.
:::

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

A single converted value usually looks correct, but summing many of them accumulates
rounding error, so totals can silently stop matching the source data. This is
particularly risky for financial, billing, or audit workloads.

Declare `numeric(P,S)` with a precision of 38 or less on every numeric column. If you
can't change the source table, cast the column in your `SELECT`, for example
`total::numeric(18,4)`.

To fail instead of converting, turn the conversion off for your session:

```sql
SET pg_lake_iceberg.unsupported_numeric_as_double = off;
```

:::

## Load data into Iceberg tables

You can write into an Iceberg table directly, which keeps a single copy of the data in
your bucket:

```sql
INSERT INTO orders_analytics VALUES (1001, 42, 99.9500, now());
```

You can also copy rows from a regular PostgreSQL table in the same service. This leaves
you with two copies, and the Iceberg copy is only as current as your last load:

```sql
INSERT INTO orders_analytics SELECT * FROM orders;
```

Load in batches rather than row by row. Each write creates files in your bucket, so
many small writes leave many small files and slow your queries down.

To load new data on a schedule, run your `INSERT ... SELECT` from
[pg_cron](/docs/products/postgresql/howto/use-pg-cron-extension). Define what counts as new
for your data, such as a timestamp or an ID watermark, and select on that.

## Query Iceberg tables

Query Iceberg tables with standard SQL, from the same connection you use for your
regular tables:

```sql
SELECT customer_id, sum(order_total)
FROM orders_analytics
GROUP BY customer_id
ORDER BY sum(order_total) DESC
LIMIT 10;
```

You can also join an Iceberg table with a regular PostgreSQL table in the same query.

## Maintain Iceberg tables

An autovacuum worker maintains Iceberg tables for you. It compacts data files, expires old
snapshots, and removes files that no snapshot references any more, much as autovacuum does
for regular PostgreSQL tables.

To compact a table immediately, for example after a large batch load, run `VACUUM`
yourself:

```sql
VACUUM orders_analytics;
```

<RelatedPages/>

- [PostgreSQL for Analytics](/docs/products/postgresql/concepts/pg-analytics)
- [Manage Aiven for PostgreSQL® extensions](/docs/products/postgresql/howto/manage-extensions)
- [Use the pg_cron extension](/docs/products/postgresql/howto/use-pg-cron-extension)
- [Limited availability and early access features](/docs/platform/concepts/service-and-feature-releases)
