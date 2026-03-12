---
title: Query external data using federated queries in Aiven for ClickHouse®
sidebar_label: Federated queries
---

import RelatedPages from "@site/src/components/RelatedPages";

Federated queries let you read and write data in external S3-compatible object storages and web resources directly from Aiven for ClickHouse®.
Use them to query remote data in place, ingest it into your ClickHouse service,
or simplify migration from a legacy data source.

:::note
Federated queries are enabled by default in Aiven for ClickHouse.
:::

## Why use federated queries

- Query remote data from your ClickHouse service: ingest it into Aiven for
  ClickHouse or reference external sources in analytics queries.
- Simplify data import from legacy sources and avoid a long or complex
  migration path.
- Extend analysis over external data with less effort than enabling
  distributed tables or using
  [remote() / remoteSecure()](https://clickhouse.com/docs/en/sql-reference/table-functions/remote).

## How federated queries work

Federated queries use specific SQL statements to read from external sources
through the ClickHouse S3 engine or URL table function. Once you read from a
remote source, you can select from it and insert into a local table in Aiven
for ClickHouse.

To run a federated query, the ClickHouse service user connecting to the cluster
requires grants to the S3 and/or URL sources. The main service user has access
by default.

Federated queries support the following external sources:

- S3-compatible object storage (including Azure Blob Storage), using the S3
  engine
- Web resources accessible over HTTP, using the URL table function

:::note
The `remote()` and `remoteSecure()` functions query remote ClickHouse servers
or create distributed tables. They cannot read data from external object
storage such as S3.
:::

## Limitations

- Only S3-compatible object storage providers are supported. More external data
  sources are planned.
- Virtual tables are supported only for URL sources using the URL table engine.
  Support for the S3 table engine is planned.

## Prerequisites

### Grant access to S3 and URL sources

The main service user has access to S3 and URL sources by default. To grant
another user access, run the following query:

```sql
GRANT CREATE TEMPORARY TABLE, S3, URL ON *.* TO <username> [WITH GRANT OPTION]
```

The `CREATE TEMPORARY TABLE` grant is required for both sources. Adding
`WITH GRANT OPTION` allows the user to pass the privileges to others.

### Get Azure Blob Storage access keys

To run federated queries using the `azureBlobStorage` table function or the
`AzureBlobStorage` table engine, obtain your Azure Blob Storage keys from one of
the following:

- [Azure portal](https://portal.azure.com/): From the portal menu, select
  **Storage accounts**, go to your account, and click
  **Security + Networking** > **Access keys**. View and copy your account
  access keys and connection strings.
- [PowerShell](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell?view=powershell-7.4)
- [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli#install)

### Set up managed credentials for Azure Blob Storage

[Managed credentials integration](/docs/products/clickhouse/concepts/data-integration-overview#managed-credentials-integration)
is:

- Required to
  [run federated queries using the AzureBlobStorage table engine](#query-using-the-azureblobstorage-table-engine)
- Optional to
  [run federated queries using the azureBlobStorage table function](#query-using-the-azureblobstorage-table-function)

[Set up a managed credentials integration](/docs/products/clickhouse/howto/data-service-integration#create-managed-credentials-integrations)
as needed.

## Run a federated query

### Query using the `azureBlobStorage` table function

Depending on how you handle connection parameters, you can run federated
queries with or without managed credentials integration.

#### Without managed credentials

**SELECT:**

```sql
SELECT *
FROM azureBlobStorage(
  'DefaultEndpointsProtocol=https;AccountName=ident;AccountKey=secret;EndpointSuffix=core.windows.net',
  'ownerresource',
  'all_stock_data.csv',
  'CSV',
  'auto',
  'Ticker String, Low Float64, High Float64'
  )
LIMIT 5
```

**INSERT:**

```sql
INSERT INTO FUNCTION
  azureBlobStorage(
    'DefaultEndpointsProtocol=https;AccountName=ident;AccountKey=secret;EndpointSuffix=core.windows.net',
    'ownerresource',
    'test_funcwrite.csv',
    'CSV',
    'auto',
    'key UInt64, data String'
    )
VALUES ('column1-value', 'column2-value');
```

#### With managed credentials

```sql
azureBlobStorage(
  `named_collection`,
  blobpath = 'path/to/blob.csv',
  format = 'CSV'
)
```

### Query using the `AzureBlobStorage` table engine

1. Create a table:

   ```sql
   CREATE TABLE default.test_azure_table
   (
       `Low` Float64,
       `High` Float64
   )
   ENGINE = AzureBlobStorage(
       `endpoint_azure-blob-storage-datasets`,
       blob_path = 'data.csv',
       compression = 'auto',
       format = 'CSV'
   )
   ```

1. Query the table:

   ```sql
   SELECT avg(Low) FROM test_azure_table
   ```

### Query using the `s3` table function

#### SELECT and `s3`

`SELECT` statements using the `s3` function can query public resources by URL.
The following example uses network connectivity measurement data from the
[Open Observatory of Network Interference (OONI)](https://ooni.org/data/):

```sql
WITH ooni_data_sample AS
   (
  SELECT *
  FROM s3('https://ooni-data-eu-fra.s3.eu-central-1.amazonaws.com/clickhouse_export/csv/fastpath_202308.csv.zstd')
  LIMIT 100000
   )
SELECT
   probe_cc AS probe_country_code,
   test_name,
   countIf(anomaly = 't') AS total_anomalies
FROM ooni_data_sample
GROUP BY
   probe_country_code,
   test_name
HAVING total_anomalies > 10
ORDER BY total_anomalies DESC
LIMIT 50
```

#### INSERT and `s3`

When you run an `INSERT` statement into the `s3` function, rows are appended to
the corresponding object if the table structure matches:

```sql
INSERT INTO FUNCTION s3(
  'https://bucket-name.s3.region-name.amazonaws.com/dataset-name/landing/raw-data.csv',
  'CSVWithNames'
)
VALUES ('column1-value', 'column2-value');
```

### Query a private S3 bucket

Private buckets require the access key ID and secret as function parameters:

```sql
SELECT *
FROM s3(
  'https://private-bucket.s3.eu-west-3.amazonaws.com/dataset-prefix/partition-name.csv',
  'some_aws_access_key_id',
  'some_aws_secret_access_key'
)
```

If the schema is not detected automatically, provide column types as
additional parameters:

```sql
SELECT *
FROM s3(
  'https://private-bucket.s3.eu-west-3.amazonaws.com/orders-dataset/partition-name.csv',
  'access_token',
  'secret_token',
  'CSVWithNames',
  "`order_id` UInt64, `quantity` Decimal(9, 18), `order_datetime` DateTime"
)
```

### Query using the `s3Cluster` table function

The `s3Cluster` function distributes query execution across all cluster nodes.
Using `default` for the cluster name, you can run the same aggregations as in
the `s3` example:

```sql
WITH ooni_clustered_data_sample AS
    (
    SELECT *
    FROM s3Cluster('default', 'https://ooni-data-eu-fra.s3.eu-central-1.amazonaws.com/clickhouse_export/csv/fastpath_202308.csv.zstd')
    LIMIT 100000
    )
SELECT
    probe_cc AS probe_country_code,
    test_name,
    countIf(anomaly = 't') AS total_anomalies
FROM ooni_clustered_data_sample
GROUP BY
    probe_country_code,
    test_name
HAVING total_anomalies > 10
ORDER BY total_anomalies DESC
LIMIT 50
```

### Query using the `url` table function

#### SELECT and `url`

The following example queries the
[Growth Projections and Complexity Rankings](https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/XTAQMC&version=4.0)
dataset from the [Atlas of Economic Complexity](https://atlas.cid.harvard.edu/)
project:

```sql
WITH economic_complexity_ranking AS
    (
    SELECT *
    FROM url('https://dataverse.harvard.edu/api/access/datafile/7259657?format=tab', 'TSV')
    )
SELECT
    replace(code, '"', '') AS `ISO country code`,
    growth_proj AS `Forecasted annualized rate of growth`,
    toInt32(replace(sitc_eci_rank, '"', '')) AS `Economic Complexity Index ranking`
FROM economic_complexity_ranking
WHERE year = 2021
ORDER BY `Economic Complexity Index ranking` ASC
LIMIT 20
```

#### INSERT and `url`

With the `url` function, `INSERT` statements send a POST request. For
example, if your application has an `ingest-csv` endpoint that accepts CSV
data:

```sql
INSERT INTO FUNCTION
  url('https://app-name.company-name.cloud/api/ingest-csv', 'CSVWithNames')
VALUES ('column1-value', 'column2-value');
```

### Query a virtual table

Instead of specifying the URL in every query, create a virtual table using the
URL table engine. Run a `CREATE` statement to define the table:

```sql
CREATE TABLE trips_export_endpoint_table
(
    `trip_id` UInt32,
    `vendor_id` UInt32,
    `pickup_datetime` DateTime,
    `dropoff_datetime` DateTime,
    `trip_distance` Float64,
    `fare_amount` Float32
)
ENGINE = URL('https://app-name.company-name.cloud/api/trip-csv-export', CSV)
```

Once defined, `SELECT` statements send a GET request and `INSERT` statements
send a POST request to the URL:

```sql
SELECT
toDate(pickup_datetime) AS pickup_date,
median(fare_amount) AS median_fare_amount,
max(fare_amount) AS max_fare_amount
FROM trips_export_endpoint_table
GROUP BY pickup_date
```

```sql
INSERT INTO trips_export_endpoint_table
VALUES (8765, 10, now() - INTERVAL 15 MINUTE, now(), 50, 20)
```

<RelatedPages/>

- [Cloud Compatibility | ClickHouse Docs](https://clickhouse.com/docs/en/whats-new/cloud-compatibility#federated-queries)
- [Integrating S3 | ClickHouse Docs](https://clickhouse.com/docs/en/integrations/s3)
- [remote, remoteSecure | ClickHouse Docs](https://clickhouse.com/docs/en/sql-reference/table-functions/remote)
