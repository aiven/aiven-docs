---
title: Understand Aiven for MySQL® backups
sidebar_label: Backups
---

import EditBackupSchedule from "@site/static/includes/service-backups-instructions.md";
import RelatedPages from "@site/src/components/RelatedPages";

Aiven for MySQL databases are automatically backed-up, with full backups daily, and binary logs recorded continuously.
The number of stored
backups and backup retention time depends on your [Aiven service
plan](https://aiven.io/pricing?product=mysql&tab=plan-comparison). Full
backups are version-specific binary backups, which when combined with
[binlog](https://dev.mysql.com/doc/internals/en/binary-log-overview.html)
allow for consistent recovery to a specific point in time (PITR).

:::important
One thing to consider is that you may modify the backup time
configuration option in **Advanced configuration** in [Aiven
Console](https://console.aiven.io) which will begin shifting the backup
schedule to the new time. If there was a recent backup taken, it may
take another backup cycle before it starts applying new backup time.
:::

:::note
To be able to safely make backups, MySQL INSTANT ALTER TABLE always use
the INPLACE or COPY algorithm instead of INSTANT. Specifying
ALGORITHM=INSTANT does not fail but automatically falls back to INPLACE
or COPY as needed.
:::

## Backup retention

### Full backups

Aiven takes a full backup of your service every 24 hours. Your service plan defines how
many full backups Aiven stores, and therefore how far back you can restore. As new full
backups are taken, the oldest ones are removed. For the backup history of each plan, see
[High availability of Aiven for MySQL®](/docs/products/mysql/concepts/high-availability).

### Binary logs

Aiven records binary logs continuously and keeps them for at least the period set in the
`binlog_retention_period` advanced parameter. Combined with full backups, binary logs let
you restore your service to a specific point in time.

The shortest retention you can set is 600 seconds. By default, the longest retention you
can set is 86400 seconds (24 hours). To keep binary logs for up to 1814400 seconds
(21 days), [contact Aiven support](mailto:support@aiven.io). If your service has enough
disk space for the additional binary logs, Aiven raises the limit for the whole project.

Longer binary log retention uses more disk space on your service. Review your disk usage
before you increase the retention period. See
[Prevent a full disk](/docs/products/mysql/howto/prevent-disk-full).

:::warning
Reducing `binlog_retention_period` can make a large batch of binary logs eligible for
purge at once. Depending on the volume, this can stall the MySQL commit path and block
writes until the purge completes. Lower the value gradually, in small decrements, during
a low-traffic window.
:::

To set `binlog_retention_period`, see
[binlog_retention_period](/docs/products/mysql/reference/advanced-params#binlog_retention_period)
in the advanced parameters reference.

## MySQL backups and encryption

All Aiven for MySQL backups use the [myhoard
software](https://github.com/aiven/myhoard) to perform encryption.
Myhoard utilizes [Percona XtraBackup](https://www.percona.com/)
internally for taking a full
(or [incremental](/docs/products/mysql/howto/use-incremental-backups))
snapshot of MySQL.

Since [Percona XtraBackup
8.0.23](https://jira.percona.com/browse/PXB-1979) the `--lock-ddl`
option is enabled by default. This ensures that DDL changes cannot be
performed while a full backup process is ongoing. This is important to
guarantee that the backup service is consistent and can be reliably used
for restoration.

With this feature enabled, if you try to run `CREATE`, `ALTER`, `DROP`,
`TRUNCATE` or another command during backup, you may receive the message
**Waiting for backup lock**. In this case, wait till the backup is
complete for running such operations.

## Configure the backup schedule

Set the time of day when the daily backup is taken.

<EditBackupSchedule/>

<RelatedPages/>

- [Use incremental backups](/docs/products/mysql/howto/use-incremental-backups)
- [High availability of Aiven for MySQL®](/docs/products/mysql/concepts/high-availability)
- [Enable slow query logging for Aiven for MySQL®](/docs/products/mysql/howto/enable-slow-queries)
- [Aiven cloud security and data encryption](/docs/platform/concepts/cloud-security#data-encryption)
