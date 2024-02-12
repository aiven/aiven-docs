---
title: Read and pull data from S3 object storages and web resources over HTTP
---

With federated queries in Aiven for ClickHouse®, you can read and pull
data from an external S3-compatible object storage or any web resource
accessible over HTTP. Learn more about capabilities and applications of
federated queries in
[About querying external data in Aiven for ClickHouse®](/docs/products/clickhouse/concepts/federated-queries).

This article shows how to run federated queries in Aiven for ClickHouse.
It provides multiple examples of querying external resources using the
SELECT and INSERT statements and the S3 and the URL functions.

## About running federated queries

Federated queries are written using specific SQL statements and can be
run from CLI, for instance. To run a federated query, just send a query
over an external S3-compatible object storage including relevant S3
bucket details. A properly-constructed federated query returns a
specific output.

## Before you start

### Access and permissions {#access-permissions}

To run a federated query, the ClickHouse service user connecting to the
cluster requires grants to the S3 and/or URL sources. The main service
user is granted access to the sources by default, and new users can be
allowed to use the sources with the following query:

```sql
GRANT CREATE TEMPORARY TABLE, S3, URL ON *.* TO <username> [WITH GRANT OPTION]
```

The CREATE TEMPORARY TABLE grant is required for both sources. Adding
WITH GRANT OPTION allows the user to further transfer the privileges.

### Limitations

-   Federated queries in Aiven for ClickHouse only support S3-compatible
    object storage providers for the time being. More external data
    sources coming soon!
-   Virtual tables are only supported for URL sources, using the URL
    table engine. Stay tuned for us supporting the S3 table engine in
    the future!

## Run a federated query

Check out some examples of running federated queries to read and pull
data from external S3-compatible object storages.

### Query using SELECT and the S3 function

SQL SELECT statements using the S3 and URL functions are able to query
public resources using the URL of the resource. For instance, let's
explore the network connectivity measurement data provided by the [Open
Observatory of Network Interference (OONI)](https://ooni.org/data/).

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

### Query using SELECT and the s3Cluster function

The `s3Cluster` function allows all cluster nodes to participate in the
query execution. Using `default` for the cluster name parameter, we can
compute the same aggregations as above as follows:

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

### Query a private S3 bucket

Private buckets can be accessed by providing the access token and secret
as function parameters.

```sql
SELECT *
FROM s3(
  'https://private-bucket.s3.eu-west-3.amazonaws.com/dataset-prefix/partition-name.csv',
  'some_aws_access_key_id',
  'some_aws_secret_access_key'
)
```

Depending on the format, the schema can be automatically detected. If it
isn\'t, you may also provide the column types as function parameters.

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

### Query using SELECT and the URL function

Let's query the [Growth Projections and Complexity
Rankings](https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/XTAQMC&version=4.0)
dataset, courtesy of the [Atlas of Economic
Complexity](https://atlas.cid.harvard.edu/) project.

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

### Query using INSERT and the URL function

With the URL function, INSERT statements generate a POST request, which
can be used to interact with APIs having public endpoints. For instance,
if your application has a `ingest-csv` endpoint accepting CSV data, you
can insert a row using the following statement:

```sql
INSERT INTO FUNCTION
  url('https://app-name.company-name.cloud/api/ingest-csv', 'CSVWithNames')
VALUES ('column1-value', 'column2-value');
```

### Query using INSERT and the S3 function

When executing an INSERT statement into the S3 function, the rows are
appended to the corresponding object if the table structure matches:

```sql
INSERT INTO FUNCTION
  s3('https://bucket-name.s3.region-name.amazonaws.com/dataset-name/landing/raw-data.csv', 'CSVWithNames')
VALUES ('column1-value', 'column2-value');
```

### Query a virtual table

Instead of specifying the URL of the resource in every query, it's
possible to create a virtual table using the URL table engine. This can
be achieved by running a DDL CREATE statement similar to the following:

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

Once the table is defined, SELECT and INSERT statements execute GET and
POST requests to the URL respectively:

```sql
SELECT
toDate(pickup_datetime) AS pickup_date,
median(fare_amount) AS median_fare_amount,
max(fare_amount) AS max_fare_amount
FROM trips_export_endpoint_table
GROUP BY pickup_date

INSERT INTO trips_export_endpoint_table
VALUES (8765, 10, now() - INTERVAL 15 MINUTE, now(), 50, 20)
```

## Related pages

-   [About querying external data in Aiven for ClickHouse®](/docs/products/clickhouse/concepts/federated-queries)
-   [Cloud Compatibility \| ClickHouse
    Docs](https://clickhouse.com/docs/en/whats-new/cloud-compatibility#federated-queries)
-   [Integrating S3 with
    ClickHouse](https://clickhouse.com/docs/en/integrations/s3)
-   [remote, remoteSecure \| ClickHouse
    Docs](https://clickhouse.com/docs/en/sql-reference/table-functions/remote)
