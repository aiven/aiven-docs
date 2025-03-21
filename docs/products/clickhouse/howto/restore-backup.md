---
title: Fork and restore from Aiven for ClickHouse® backups
sidebar_label: Fork & restore from backups
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Choose a service [backup](/docs/products/clickhouse/concepts/disaster-recovery#service-backup) to fork from and restore your Aiven for ClickHouse® service.

1. Log in to the [Aiven Console](https://console.aiven.io) and go to your Aiven for
   ClickHouse service.
1. Click <ConsoleLabel name="backups"/> in the sidebar.
1. Click **Fork & restore**.
1. In the **New database fork** window, select the following:

   - Backup to fork from
   - Service name and a project
   - Cloud provider and region
   - Service plan and additional storage

1. Click **Create fork**.

Once the new fork service is running, you can set up your application's connection settings
to point to this new fork service.

<RelatedPages/>

- [Disaster Recovery testing scenarios](/docs/platform/concepts/disaster-recovery-test-scenarios)
- [Configure Aiven for ClickHouse® backup settings](/docs/products/clickhouse/howto/configure-backup)
- [Disaster recovery in Aiven for ClickHouse®](/docs/products/clickhouse/concepts/disaster-recovery)
