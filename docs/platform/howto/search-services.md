---
title: Search for services in Aiven Console
---

On the **Services** page in [Aiven Console](https://console.aiven.io/),
you can search for services by keywords and narrow down the results
using filters.

## Search by keyword

When you search by keyword, [Aiven Console](https://console.aiven.io/)
shows all services that have the matching words in the service name,
plan, cloud provider, and tags.

## Filter search results

You can narrow down your search results by selecting **Filter list** and
selecting the services, statuses, and providers to filter by.

You can also add filters to the search field yourself. The supported
filters are the following:

-   `service`
-   `status`
-   `provider`
-   `region`

You can add multiple values to filters separated by a comma. For
example, this is how you would view all running PostgreSQL® services
that are hosted on AWS or Google Cloud:

```
service:pg status:running provider:aws,google
```

You can use these filters alongside keyword searches. For example, to
see all powered off Kafka® services with *production* in the name. Example output:

```
production service:kafka status:poweroff
```

### Filter by service type

To filter the services by service type, use the filter values in this
table.

| Service name                | Filter value    |
| --------------------------- | --------------- |
| Apache Cassandra®           | `cassandra`     |
| Apache Flink®               | `flink`         |
| Apache Kafka®               | `kafka`         |
| Apache Kafka® Connect       | `kafkaconnect`  |
| Apache Kafka® MirrorMaker 2 | `mirrormaker`   |
| ClickHouse®                 | `clickhouse`    |
| Grafana®                    | `grafana`       |
| InfluxDB®                   | `influxdb`      |
| M3 Aggregator®              | `m3aggregator`  |
| M3 Coordinator®             | `m3coordinator` |
| M3DB®                       | `m3db`          |
| MySQL®                      | `mysql`         |
| OpenSearch®                 | `opensearch`    |
| PostgreSQL®                 | `pg`            |
| Redis®*                     | `redis`         |

### Filter by status

You can filter the services to show only those that are running, powered
off, rebuilding, or rebalancing. The values supported for the `status`
filter are the following:

-   `running`
-   `poweroff`
-   `rebuilding`
-   `rebalancing`

### Filter by cloud provider

To filter the services by the cloud provider they are hosted on, use the
filter values in this table.

 | Cloud provider              | Filter value |
 | --------------------------- | ------------ |
 | Amazon Web Services (AWS)   | `aws`        |
 | Azure                       | `azure`      |
 | Digital Ocean               | `do`         |
 | Google Cloud Provider (GCP) | `google`     |
 | UpCloud                     | `upcloud`    |

### Filter by cloud region

Find the supported values for the `region` filter in the *Cloud* column
of the tables in
[List of available cloud regions](/docs/platform/reference/list_of_clouds). For example, to see all services in the AWS `eu-central-1`
region, you use this filter:

```
region:aws-eu-central-1
```
