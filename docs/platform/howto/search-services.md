---
title: Search for services
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

On the <ConsoleLabel name="services"/> page in [Aiven Console](https://console.aiven.io/), you can search for services by keywords and narrow down the results using filters.

## Search by keyword

When you search by keyword, [Aiven Console](https://console.aiven.io/)
shows all services that have the matching words in the service name,
plan, cloud provider, and tags.

## Filter search results with the UI

To filter search results:

1. Click <ConsoleLabel name="filter list"/>.
1. Select the filters of your choice.

## Filter with a query

You can type filter queries. The supported filters are the following:

-   `service`
-   `status`
-   `provider`
-   `region`

Use several filters by separating them by a comma.
You can use these filters alongside keyword searches.

:::note[Examples]

```text title="All running PostgreSQL® services that are hosted on AWS or Google Cloud"
service:pg status:running provider:aws,google
```

```text title="All powered off Kafka® services with 'production' in the name"
production service:kafka status:poweroff
```

:::

### Filter by service type

To filter the services by service type, use these filter values:

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
| Caching                    | `redis`         |

### Filter by status

You can filter the services to show only those that are running, powered
off, rebuilding, or rebalancing.

Supported `status` values:

-   `running`
-   `poweroff`
-   `rebuilding`
-   `rebalancing`

### Filter by cloud provider

To filter the services by the cloud provider they are hosted on, use these filter values:

| Cloud provider              | Filter value |
| --------------------------- | ------------ |
| Amazon Web Services (AWS)   | `aws`        |
| Azure                       | `azure`      |
| Digital Ocean               | `do`         |
| Google Cloud Provider (GCP) | `google`     |
| UpCloud                     | `upcloud`    |

### Filter by cloud region

Find the supported values for the `region` filter in the **Cloud** column
of the tables in
[List of available cloud regions](/docs/platform/reference/list_of_clouds).

:::note[Example]

```text title="All services in the AWS 'eu-central-1' region"
region:aws-eu-central-1
```

:::
