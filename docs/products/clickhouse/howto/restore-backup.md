---
title: Restore Aiven for ClickHouse® backup
sidebar_label: Restore backups
---

Depending on your service plan, you can restore Aiven for ClickHouse® backups from
a specific day or hour.

To restore a backup:

1. Log in to the [Aiven Console](https://console.aiven.io) and
   select your Aiven for ClickHouse service.

1. Select **Backups** from the left sidebar.

1. Select **Fork & restore**.

   This opens the **New Database Fork** view where you can create the
   fork for the backup to restore.

1. Fill in the required details, select the cloud provider, region, and
    service plan and click **Create fork**.

1. Once the new service is running, change your application's
   connection settings to point to it and power off the original
   service.
