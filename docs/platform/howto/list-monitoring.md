---
title: Metrics, logs, and alerts
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

Use metrics, logs, alerts, and dashboards to monitor the health of your services and integrations.

- Metrics: Real-time information about your services.
- Logs: Available for services and integrations.
- Alerts: Receive emails and in-app [notifications](/docs/platform/howto/technical-emails).

## View service metrics

The service metrics available in [Aiven
Console](https://console.aiven.io/) include the following:

-   **CPU usage:** Shows the percentage of CPU resources consumed by the
    service.
-   **Disk space usage:** Represents the percentage of disk space
    utilized by the service.
-   **Disk iops (reads):** Indicates the input/output operations per
    second (IOPS) for disk reads.
-   **Disk iops (writes):** Indicates the input/output operations per
    second (IOPS) for disk writes.
-   **Load average:** Shows the 5-minute average CPU load, indicating
    the system's computational load.
-   **Memory usage:** Represents the percentage of memory resources
    utilized by the service.
-   **Network received:** Indicates the amount of network traffic
    received by the service, measured in bytes per second.
-   **Network transmitted:** Indicates the amount of network traffic
    transmitted by the service, also measured in bytes per second.

To view the metrics:

1. Open the service.
1. Click <ConsoleLabel name="metrics"/>.

To retrieve service logs with the CLI,
use [service metrics](/docs/tools/cli/service-cli#avn-service-metrics).

## View service logs

1. Open the service.
1. Click <ConsoleLabel name="logs"/>.

:::note[Log retention]
Service logs are retained for 4 days.

To control retention time, set up a log integration with an Aiven for OpenSearch®
service. The integration allows you to configure longer retention times for your
service logs, only limited by the disk space available on the Aiven for
OpenSearch® plan you have selected.

OpenSearch® together with OpenSearch®
Dashboards offers comprehensive logs browsing and analytics platform.
:::

To retrieve service logs with the CLI, use [service logs](/docs/tools/cli/service-cli#avn-service-logs)

## Export service metrics and logs

You can export logs and metrics **to an Aiven service**:

- Send logs to [Aiven for Opensearch](/docs/products/opensearch/dashboards).
- Send logs to [Aiven for M3](/docs/products/m3db).
- Visualize logs with [Aiven for Grafana](/docs/products/grafana).

## Set up alerts and notfications

See [Manage project and service notifications](/docs/platform/howto/technical-emails).

## Related pages

- [Manage notifications](/docs/platform/howto/technical-emails)
