---
title: Fetch query statistics for Aiven for ClickHouse®
---

## About fetching query statistics

Usually, query statistics in ClickHouse can be obtained using the
`system.query_log` table, which stores statistics of each executed
query, including memory usage and duration. In Aiven for ClickHouse®,
the `system.query_log` table is currently not accessible for the purpose
of obtaining query statistics.

To fetch query statistics in Aiven for ClickHouse, you can use either
Aiven Console or Aiven API.

## Use Aiven Console

1.  Log in to the [Aiven Console](https://console.aiven.io/), choose the
    right project, and select your Aiven for ClickHouse service.
2.  In your service's page, select **Query statistics** from the
    sidebar and view the content in the dashboard.

## Use Aiven API

To access query statistics in Aiven for ClickHouse with Aiven API, use
the [ServiceClickHouseQueryStats
endpoint](https://api.aiven.io/doc/#tag/Service:_ClickHouse/operation/ServiceClickHouseQueryStats).

```bash
GET /project/<project>/service/<service_name>/clickhouse/query/stats
```

:::note[See also]
Learn more on Aiven API in the
[Aiven API overview](/docs/tools/api).
:::
