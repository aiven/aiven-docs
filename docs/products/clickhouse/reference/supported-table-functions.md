---
title: Table functions supported in Aiven for ClickHouse®
sidebar_label: Table functions
---

[Table
functions](https://clickhouse.com/docs/en/sql-reference/table-functions)
can be used to construct tables, for example, in a FROM clause of a
query or in an INSERT INTO TABLE FUNCTION statement.

:::note[Sample usage of the S3 table function]
```bash
SELECT *
FROM deltaLake('s3://bucket/path/to/lake')
```
:::

:::note
Occasionally, you may find specific table functions disabled for
security reasons.
:::

Aiven for ClickHouse® supports the following table functions. Availability can
differ by service version.

| Table function | Supported in |
| -------------- | ------------ |
| `azureBlobStorage` | 25.3, 25.8, 26.3 |
| `azureBlobStorageCluster` | 25.3, 25.8, 26.3 |
| `cluster` | 25.3, 25.8, 26.3 |
| `clusterAllReplicas` | 25.3, 25.8, 26.3 |
| `cosn` | 25.3, 25.8, 26.3 |
| `deltaLake` | 25.3, 25.8, 26.3 |
| `deltaLakeAzure` | 25.8, 26.3 |
| `deltaLakeAzureCluster` | 26.3 |
| `deltaLakeCluster` | 25.3, 25.8, 26.3 |
| `deltaLakeS3` | 25.8, 26.3 |
| `deltaLakeS3Cluster` | 26.3 |
| `dictionary` | 25.3, 25.8, 26.3 |
| `format` | 25.3, 25.8, 26.3 |
| `fuzzJSON` | 25.3, 25.8, 26.3 |
| `fuzzQuery` | 25.3, 25.8, 26.3 |
| `gcs` | 25.3, 25.8, 26.3 |
| `generateRandom` | 25.3, 25.8, 26.3 |
| `generateSeries` | 25.3, 25.8, 26.3 |
| `generate_series` | 25.3, 25.8, 26.3 |
| `hudi` | 25.3, 25.8, 26.3 |
| `hudiCluster` | 25.3, 25.8, 26.3 |
| `iceberg` | 25.3, 25.8, 26.3 |
| `icebergAzure` | 25.3, 25.8, 26.3 |
| `icebergAzureCluster` | 25.3, 25.8, 26.3 |
| `icebergCluster` | 26.3 |
| `icebergS3` | 25.3, 25.8, 26.3 |
| `icebergS3Cluster` | 25.3, 25.8, 26.3 |
| `input` | 25.3, 25.8, 26.3 |
| `loop` | 25.3, 25.8, 26.3 |
| `merge` | 25.3, 25.8, 26.3 |
| `mergeTreeAnalyzeIndexes` | 26.3 |
| `mergeTreeAnalyzeIndexesUUID` | 26.3 |
| `mergeTreeIndex` | 25.3, 25.8, 26.3 |
| `mergeTreeProjection` | 25.8, 26.3 |
| `mergeTreeTextIndex` | 26.3 |
| `mysql` | 25.3, 25.8, 26.3 |
| `null` | 25.3, 25.8, 26.3 |
| `numbers` | 25.3, 25.8, 26.3 |
| `numbers_mt` | 25.3, 25.8, 26.3 |
| `oss` | 25.3, 25.8, 26.3 |
| `paimon` | 26.3 |
| `paimonAzure` | 26.3 |
| `paimonAzureCluster` | 26.3 |
| `paimonCluster` | 26.3 |
| `paimonS3` | 26.3 |
| `paimonS3Cluster` | 26.3 |
| `postgresql` | 25.3, 25.8, 26.3 |
| `primes` | 26.3 |
| `prometheusQuery` | 25.8, 26.3 |
| `prometheusQueryRange` | 25.8, 26.3 |
| `remoteSecure` | 25.3, 25.8, 26.3 |
| `s3` | 25.3, 25.8, 26.3 |
| `s3Cluster` | 25.3, 25.8, 26.3 |
| `timeSeriesData` | 25.8, 26.3 |
| `timeSeriesMetrics` | 25.8, 26.3 |
| `timeSeriesSelector` | 25.8, 26.3 |
| `timeSeriesTags` | 25.8, 26.3 |
| `url` | 25.3, 25.8, 26.3 |
| `urlCluster` | 25.3, 25.8, 26.3 |
| `values` | 25.3, 25.8, 26.3 |
| `view` | 25.3, 25.8, 26.3 |
| `viewExplain` | 25.3, 25.8, 26.3 |
| `viewIfPermitted` | 25.3, 25.8, 26.3 |
| `zeros` | 25.3, 25.8, 26.3 |
| `zeros_mt` | 25.3, 25.8, 26.3 |
