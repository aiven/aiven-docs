---
title: Monitoring services
---

When running Aiven services, you get access by default to both metrics
and logs to monitor the health of your service from the [Aiven
console](https://console.aiven.io/).

1.  From the left sidebar, navigate to **Services** and select the
    service you want to review.
2.  To review metrics, select **Metrics** from the left sidebar. You can
    select a time range spanning the last hour, day, week, month, or
    year.
3.  For log analysis, select **Logs** from the left sidebar. Older logs
    will load progressively. To return to the most recent log entry,
    select **Go to most recent message**.

You can also use the dedicated functions
[service logs](/docs/tools/cli/service-cli#avn-service-logs) and
[service metrics](/docs/tools/cli/service-cli#avn-service-metrics) to
export your service's monitoring data via the
[Aiven CLI](/docs/tools/cli).

Additionally, you have the option to
[export logs and metrics to an Aiven service or external provider](/docs/platform/concepts/logs-metrics-alerts), expanding your monitoring capabilities. For example:

-   You can send logs to
    [Aiven for Opensearch](/docs/products/opensearch).
-   You can send metrics to
    [Aiven for m3](/docs/products/m3db),
    and visualise these metrics with
    [Aiven for Grafana](/docs/products/grafana).
