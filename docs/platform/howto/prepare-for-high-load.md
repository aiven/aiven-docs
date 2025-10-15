---
title: Prepare services for high load
---

import RelatedPages from "@site/src/components/RelatedPages";

Prepare your services for higher than usual traffic to avoid service outages.

## Subscribe to service notifications

To receive notifications about service health and warnings when resources are low, you can
[set service and project contacts](https://aiven.io/docs/platform/howto/technical-emails).

You can also view the status of the Aiven Platform and get updates
on incidents on the [status page](https://status.aiven.io/).
You can follow the RSS feed, subscribe to email or SMS notifications,
or use the Slack integration to get notified.

## Monitor your services

You can [monitor the health of your services](/docs/platform/howto/list-monitoring)
using metrics, logs, alerts, and dashboards.

## Scale your services

If you forecast a load that can't be handled by the service, you can
[scale up your service](/docs/platform/howto/scale-services).

## Set the backup schedule

To minimize the impact of the higher load during the backup process,
[schedule backups](/docs/platform/concepts/service_backups#backup-frequency-and-retention-per-service)
outside of peak traffic hours.

## Set the maintenance window

Schedule [maintenance updates](/docs/platform/concepts/maintenance-window)
outside of your peak traffic hours.

## Run load tests on service forks

To test the impact of high traffic on a production service,
[fork the service](/docs/platform/concepts/service-forking) and run your load
test on the fork.

## Optimize your services

Optimizing a service allows it to perform better under stress therefore
avoiding the need of an upgrade. The more optimized a service is for
your usage, the better you can weather spikes in traffic:

- Aiven for Apache Kafka®
  - [Get the best from Apache Kafka®](/docs/products/kafka/howto/best-practices)
  - [Optimizing resource usage for Aiven for Apache Kafka®](/docs/products/kafka/howto/optimizing-resource-usage)
  - [Apache Kafka® and Apache Kafka® Connect best practices](/docs/products/kafka/howto/best-practices)
- Aiven for PostgreSQL®
  - [Optimize Aiven for PostgreSQL® slow queries](/docs/products/postgresql/howto/optimize-pg-slow-queries)
  - [AI database optimizer for Aiven for PostgreSQL®](/docs/products/postgresql/howto/ai-insights)
- Aiven for MySQL®
  - [AI database optimizer for Aiven for MySQL®](/docs/products/mysql/howto/ai-insights)
- Aiven for Metrics
  - [Optimize storage and resources](/docs/products/metrics/concepts/storage-resource-scaling#resource-management)
