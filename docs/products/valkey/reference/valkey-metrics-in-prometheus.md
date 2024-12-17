---
title: Aiven for Valkey™ metrics available via Prometheus
sidebar_label: Valkey™ metrics in Prometheus
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import HostMetrics from "@site/static/includes/host-metrics.md";
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

Monitor and optimize your Aiven for Valkey service with metrics available via Prometheus.
These metrics help track cluster health, replication status, and overall performance.

## Prerequisites

- [Enable Prometheus integration](/docs/platform/howto/integrations/prometheus-metrics).
- Note the Prometheus **username** and **password** in the **Integration endpoints**
  section of the  [Aiven Console](https://console.aiven.io/).

## Access Prometheus metrics

<Tabs groupId="group1">
<TabItem value="browser" label="Browser" default>

1. Open your service's <ConsoleLabel name="overview"/> page in the
   [Aiven Console](https://console.aiven.io/).
1. In the **Connection information** section, click the **Prometheus** tab.
1. Copy the **Service URI**.
1. Paste the Service URI into your browser's address bar.
1. When prompted, enter your Prometheus credentials.
1. Click **Login**.

</TabItem>
<TabItem value="cli" label="CLI">

To retrieve metrics, run the following `curl` command:

```bash
curl --user 'USERNAME:PASSWORD' PROMETHEUS_URL/metrics
```

Replace `USERNAME:PASSWORD` with your Prometheus credentials and `PROMETHEUS_URL`
with the Service URI from the **Connection information** section.

</TabItem>
</Tabs>

<HostMetrics />

## Valkey-specific metrics

[Valkey-specific metrics](https://github.com/influxdata/telegraf/blob/master/plugins/inputs/redis/README.md#metrics)
provide insights into the performance and health of your Aiven for Valkey service.
