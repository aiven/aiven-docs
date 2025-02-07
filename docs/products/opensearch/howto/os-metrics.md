---
title: Aiven for OpenSearch® metrics available via Prometheus
sidebar_label: OpenSearch metrics with Prometheus
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import HostMetrics from "@site/static/includes/host-metrics.md";
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"
import LimitedBadge from "@site/src/components/non-swizzled/Badges/LimitedBadge";

Monitor and optimize your Aiven for OpenSearch service with metrics available via Prometheus.
These metrics help track cluster health, replication status, and overall performance.

## Prerequisites

- [Enable Prometheus integration](/docs/platform/howto/integrations/prometheus-metrics).
- Note the Prometheus **username** and **password** in the **Integration endpoints**
  section of the  [Aiven Console](https://console.aiven.io/).

## Access Prometheus metrics

<Tabs groupId="group1">
<TabItem value="browser" label="View in browser" default>

1. Open your service's <ConsoleLabel name="overview"/> page in the
   [Aiven Console](https://console.aiven.io/).
1. In the **Connection information** section, click the **Prometheus** tab.
1. Copy the **Service URI**.
1. Paste the Service URI into your browser's address bar.
1. When prompted, enter your Prometheus credentials.
1. Click **Login**.

</TabItem>
<TabItem value="curl" label="Retrieve via cURL">

To retrieve metrics, run the following `curl` command:

```bash
curl --user 'USERNAME:PASSWORD' PROMETHEUS_URL/metrics
```

Replace `USERNAME:PASSWORD` with your Prometheus credentials and `PROMETHEUS_URL`
with the Service URI from the **Connection information** section.

</TabItem>
</Tabs>

<HostMetrics />

## OpenSearch-specific metrics

These metrics provide insights into the performance and health of your Aiven for
OpenSearch service.

### Node statistics

Track node metrics such as CPU and memory usage, disk I/O, and JVM statistics. For more
information, see the
[node stats API](https://opensearch.org/docs/latest/api-reference/nodes-apis/nodes-stats/).

### Cluster statistics

Track cluster-level metrics, including the number of indices, shard distribution, and
memory usage. For more information, see the
[cluster stats API](https://opensearch.org/docs/latest/api-reference/cluster-api/cluster-stats/).

### Cluster health

Monitor cluster health with granular metrics available at the index level. Use `local`
with `level=index` to view index-specific health status.
For more information, see
the [cluster health API](https://opensearch.org/docs/latest/api-reference/cluster-api/cluster-health/).

### Cross-cluster replication (CCR) stats <LimitedBadge/>

- **Leader stats:** Monitor replication metrics from the leader cluster, including
  replication lag and synchronization status. For more information, see
  the [leader cluster stats API](https://opensearch.org/docs/latest/tuning-your-cluster/replication-plugin/api/#get-leader-cluster-stats).
- **Follower stats:**  Monitor follower cluster metrics, including replication delays and
  error rates, to maintain data consistency. For more information, see the
  [follower cluster stats API](https://opensearch.org/docs/latest/tuning-your-cluster/replication-plugin/api/#get-follower-cluster-stats).
