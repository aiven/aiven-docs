---
title: Fork and restore from Aiven for ClickHouse® backups
sidebar_label: Fork and restore from backups
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";
import ForkService from "@site/static/includes/fork-service-console.md";

Select a [service backup](/docs/products/clickhouse/concepts/disaster-recovery#service-backup) to fork from and restore your Aiven for ClickHouse® service.

:::important
You cannot fork Aiven for ClickHouse services to a fewer number of nodes.
Reducing the number of nodes is only possible by
[switching the service plan](/docs/platform/howto/scale-services) from **Business** to **Startup**
on a running service.
:::

<ForkService/>

Once the new fork service is running, you can set up your application's connection settings
to point to this new fork service.

<RelatedPages/>

- [Disaster Recovery testing scenarios](/docs/platform/concepts/disaster-recovery-test-scenarios)
- [Configure Aiven for ClickHouse® backup settings](/docs/products/clickhouse/howto/configure-backup)
- [Disaster recovery in Aiven for ClickHouse®](/docs/products/clickhouse/concepts/disaster-recovery)
