---
title: Restore an OpenSearch® backup
---

Depending on your service plan, you can restore OpenSearch® backups from
a specific day or hour.

To restore a backup:

1.  Log in to the [Aiven Console](https://console.aiven.io) and
    select your OpenSearch service.

2.  Select **Backups** from the left sidebar.

3.  Select **Fork & restore**.

    This opens the *New Database Fork* view where you can create the
    fork for the backup to restore.

4.  Fill in the required details, select the cloud provider, region, and
    service plan and click **Create fork**.

5.  Once the new service is running, change your application's
    connection settings to point to it and power off the original
    service.
