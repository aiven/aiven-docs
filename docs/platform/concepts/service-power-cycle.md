---
title: Service power cycle
---

Aiven service power off and on is more than stopping and starting a service on nodes. For better utilisation of resources on Aiven platform, idle resources will be released and only the necessary data will be kept after power off. The impact on the service is different depending on the service type and plan.

:::warning
Depending on service type and plan, data loss may happen during a
service power off, so it is important for users to understand the
consequences before powering off a service.
:::

Aiven service power off and power on can be done on [Aiven
Console](https://console.aiven.io) or through
[Aiven CLI](/docs/platform/howto/pause-from-cli).

## Power off

Whenever an Aiven service is powered off:

-   All virtual machines of the service will be **removed** from the
    public cloud.
-   The service information and configuration will be stored on Aiven
    Platform, while service data will be lost if there's no backup
    available.
-   If the service has **time-based** or **PITR (point in time
    recovery)** backups, they will be kept on Aiven Platform. The
    backups are listed on the **Backups** page of the service in [Aiven
    Console](https://console.aiven.io). Absence of the **Backups** view
    means the service has no backups. For details on backups for
    different Aiven services on different plans, refer to
    [Backups at Aiven](/docs/platform/concepts/service_backups).

:::warning
Aiven does periodic cleanup of powered-off services on services powered
off for longer than **180** consecutive days. Notification emails will
be sent before actions are taken.
:::

-   The message in the **Confirm power off** window will give some hints
    on the consequence of the power off. For example, powering off an
    Aiven service can erase data since the latest backup because the
    service only has time-based but not PITR backups.
-   On the **Backups** page, hovering over the help
    icon displays some details on the content of
    the backups including what can be restored if the
    service is powered on later.

:::warning
For backup enabled Aiven for Apache Kafka® services, topic
configuration, schemas and connectors are all backed up, but not the
data in topics. Therefore all topic data will be lost on power off. For
Kafka services without backups, topic configurations including all
topic data will be lost on power off.
:::

## Power on

When a service is powered on:

-   New virtual machines will be created on the specified public cloud
    for the service.
-   Service will be started with the stored configuration parameters.
-   The latest time-based backup that is available will be restored. The
    restore time depends on the network bandwidth and disk IOPS
    allocated to the service plan as well as the size of the backup. It
    takes from a few minutes to a few hours. Smaller plans with larger backups
    take longer time than bigger plans with smaller backups. Restore
    progress can be checked by Aiven support with Aiven Admin CLI.
-   If PITR backup is available, the database transaction log (for example,
    `WAL` for PostgreSQL®, `binlog` for MySQL) will be replayed to
    recover the service data to a specific point in time.
-   Service will be ready for serving.

:::warning
Depending on the service plan, backups have different retention periods.
Data will be lost after the retention period.
:::

:::note
Maintenance updates are automatically applied when a service is powered
on as new virtual machines are created for the service to run on.
:::
