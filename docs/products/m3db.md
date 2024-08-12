---
title: Aiven for M3
---
import DocCardList from '@theme/DocCardList';

Aiven for M3 is a fully managed **distributed time series database**, deployable in the cloud of your choice which can bring unlimited scalability and high-availability to your monitoring environment and other time series applications.

Aiven for M3 consists of `n` number of **M3DB** and **M3 Coordinator**
pairs (where `n` is the number of nodes as chosen for your Aiven plan).

M3 is a great choice if your organization has a very large volume of
metrics to handle, and it can be used as part of your observability
solution. It is optimized for storing and serving time series through
associated pairs of times and values. It also provides a reverse index
of time series.

:::note
Aiven offers M3 because we ourselves needed a solution that would work
with the size of our own metrics.
:::

Read more about [the M3
components](https://m3db.io/docs/overview/components/).

## Integrates with your existing tools

M3 is highly compatible with other Aiven products for the following
tasks:

-   To collect metrics with Prometheus, M3 is designed as a scalable
    storage backend.
-   To write metrics directly from your applications using the
    InfluxDB®-compatible wire protocol.
-   To create dashboards and query available features using Grafana® and
    PromQL.

See all the features on our [M3 product page](https://aiven.io/m3).

## Ways to use Aiven for M3

Handle and analyse the time-stamped data from multiple connected devices
and services, scale up as needed, and compare datasets to provide
insights into past and present.

With Aiven for M3, you can set up the following example solutions:

-   Monitor IoT deployments, applications performance, financial trends.
-   Detect problems, respond promptly to incidents and plan maintenance.
-   Provide fast data ingest and queries, with strong data compression.



## Related pages

- [Get started](/docs/products/m3db/get-started)
- [Official overview of the M3DB, M3 query and M3 aggregator
  components](https://m3db.io/docs/overview/components/)
- From the upstream project:
  - Using M3DB with
    [Prometheus](https://m3db.io/docs/integrations/prometheus/)
  - Ingesting data from
    [Graphite](https://m3db.io/docs/integrations/graphite/)
  - Integrating M3DB with
    [Grafana](https://m3db.io/docs/integrations/grafana/)
  - Writing to M3DB using [InfluxDB
    protocol](https://m3db.io/docs/integrations/influx/)
