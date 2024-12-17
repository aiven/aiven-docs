---
title: Fork and restore from Aiven for ClickHouse® backups
sidebar_label: Fork & restore from backups
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";

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
