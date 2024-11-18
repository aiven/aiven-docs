---
title: Aiven for OpenSearch® metrics available via Prometheus
---

import HostMetrics from "@site/static/includes/host-metrics.md";
import ConsoleLabel from "@site/src/components/ConsoleIcons"

Monitor and optimize your Aiven for OpenSearch service with metrics available via Prometheus.
These metrics help track cluster health, replication status, and overall performance.

## Access Prometheus metrics

To access Prometheus metrics for your Aiven for OpenSearch service, ensure the Prometheus
integration is set up. For instructions,
see [Prometheus integration](/docs/platform/howto/integrations/prometheus-metrics).

### Use a browser

1. Go to your service's <ConsoleLabel name="overview"/>page in the
  [Aiven console](https://console.aiven.io/).
1. In the **Connection information** section, click the **Prometheus** tab.
1. Copy the **Service URI**.
1. Paste the Service URI into your browser's address bar.

### Use `curl`

Retrieve metrics using the `curl` command. Ensure you have:

- **Prometheus credentials**: Find them in the **Prometheus** section under
  **Integration endpoints** in the[Aiven console](https://console.aiven.io/).
- **Aiven for OpenSearch hostname** and **Prometheus port**: Find them in
  the **Connection information** section on your service's
  <ConsoleLabel name="overview"/>page.

Run the following command:

```bash
curl --user '<PROMETHEUS_USER>:<PROMETHEUS_PASSWORD>' \
  'https://<OPENSEARCH_HOSTNAME>:<PROMETHEUS_PORT>/metrics'
```

Replace the placeholders with your actual credentials and connection details.

<HostMetrics />

## OpenSearch-specific metrics

The following metrics are specific to Aiven for OpenSearch and offer detailed insights
into the state and performance of your OpenSearch service.

### Node statistics

Provides metrics for each node, including CPU and memory usage, disk I/O, and
JVM statistics. For more information, see the
[node stats API](https://opensearch.org/docs/latest/api-reference/nodes-apis/nodes-stats/).

### Cluster statistics

Aggregates cluster-level metrics, such as the number of indices, shard distribution,
and memory usage. For more information, see the
[cluster stats API](https://opensearch.org/docs/latest/api-reference/cluster-api/cluster-stats/).

### Cluster health

Monitors the health of the cluster, with granular metrics available at the index level.
Use `local` with `level=index` to view index-specific health status.
For more information, see
the [cluster health API](https://opensearch.org/docs/latest/api-reference/cluster-api/cluster-health/).

### Cross-cluster replication (CCR) stats

- **Leader stats:** Tracks replication metrics from the leader cluster, such as
  replication lag and index synchronization status. For more information, see
  the [leader cluster stats API](https://opensearch.org/docs/latest/tuning-your-cluster/replication-plugin/api/#get-leader-cluster-stats).
- **Follower stats:** Tracks metrics for the follower cluster, including replication
  delays and error rates, to ensure data consistency. For more information, see the
  [follower cluster stats API](https://opensearch.org/docs/latest/tuning-your-cluster/replication-plugin/api/#get-follower-cluster-stats).

### Accessing metrics
You can view these metrics via Prometheus, which Aiven integrates with Telegraf. For
information on setting up Prometheus, see [Prometheus integration](https://aiven.io/docs/platform/howto/prometheus-integration).
