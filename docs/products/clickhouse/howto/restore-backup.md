---
title: Restore an Aiven for ClickHouse® backup
sidebar_label: Restore a backup
---

import ForkService from "@site/static/includes/fork-service-console.md";
import RelatedPages from "@site/src/components/RelatedPages";

Restore an Aiven for ClickHouse® service from a
[daily backup](/docs/products/clickhouse/concepts/disaster-recovery#service-backup)
by forking to a new service.

:::important
You cannot restore Aiven for ClickHouse services to a fewer number of nodes.
Reducing the number of nodes is only possible by
[switching the service plan](/docs/platform/howto/scale-services) from **Business** to
**Startup** on a running service.
:::

To restore a backup:

<ForkService/>

Once the new service is running, change your application's connection settings to point
to it and power off the original service.

<RelatedPages/>

- [Fork your Aiven for ClickHouse® service](/docs/products/clickhouse/howto/fork-service)
- [Schedule Aiven for ClickHouse® backups](/docs/products/clickhouse/howto/configure-backup)
- [Disaster recovery in Aiven for ClickHouse®](/docs/products/clickhouse/concepts/disaster-recovery)
