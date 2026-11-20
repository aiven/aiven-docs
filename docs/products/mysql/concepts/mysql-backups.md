---
title: Understand Aiven for MySQL® backups
sidebar_label: Backups
---

import EditBackupSchedule from "@site/static/includes/service-backups-instructions.md";
import RelatedPages from "@site/src/components/RelatedPages";
import LimitedBadge from "@site/src/components/Badges/LimitedBadge";

Aiven for MySQL databases are automatically backed-up, with full backups daily, and binary logs recorded continuously.
The number of stored backups and the retention time depend on your service plan. For the
exact figures, see [Backup retention](#backup-retention). Full backups are
version-specific binary backups, which when combined with
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

Aiven takes a backup of your service every 24 hours. It is a full backup unless you
enable [incremental backups](/docs/products/mysql/howto/use-incremental-backups). Your
service plan defines how many backups Aiven stores, and therefore how far back you can
restore. As new backups are taken, the oldest ones are removed. For the backup history of
each plan, see
[High availability of Aiven for MySQL®](/docs/products/mysql/concepts/high-availability).

### Binary logs

Aiven uploads binary logs to backup storage continuously and keeps them as long as the
backup they belong to. Your plan decides how far back you can restore.

## Binary log retention on the service disk

The `binlog_retention_period` advanced parameter sets how long binary log files stay on
your service's disk after they are backed up. It exists for tools that read binary logs
from the server, such as Debezium. It does not change how far back you can restore.

When the parameter is not set, binary logs stay on the disk for 600 seconds. The shortest
retention you can set is 600 seconds. By default, the longest retention you can set is
86400 seconds (24 hours). To keep binary logs for up to 1814400 seconds (21 days),
[contact Aiven support](mailto:support@aiven.io). If your service has enough disk space for
the additional binary logs, Aiven raises the limit for the whole project.

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

## DDL lock during backups

To keep each backup consistent and restorable, Percona XtraBackup takes a backup lock. The
backup lock blocks DDL statements, such as `CREATE`, `ALTER`, `DROP`, and `TRUNCATE`. It
doesn't block DML statements, such as `INSERT`, `UPDATE`, and `DELETE`.

By default, the backup lock is held for the whole backup. A DDL statement that you run
during a backup shows the `Waiting for backup lock` state and runs after the backup
completes. On large databases, a full backup can take hours, and DDL waits for the whole
time. To keep DDL wait time short, use the
[reduced DDL lock](#reduced-ddl-lock) or
[incremental backups](/docs/products/mysql/howto/use-incremental-backups).

### Reduced DDL lock <LimitedBadge/> {#reduced-ddl-lock}

With the reduced DDL lock, a backup blocks DDL statements only for a short final step,
typically a few seconds, instead of for the whole backup. The lock time stays about the
same as your database grows, so large databases benefit the most. The reduced DDL lock
uses the
[reduced backup lock](https://docs.percona.com/percona-xtrabackup/8.4/reduction-in-locks.html)
feature of Percona XtraBackup 8.4 (`--lock-ddl=REDUCED`).

A backup with the reduced DDL lock runs as follows:

1. It copies InnoDB data without the backup lock, and tracks the DDL changes that run
   during the copy.
1. It takes the backup lock, copies non-InnoDB data, and copies again the tables that DDL
   changed during the backup.
1. It records a consistent point for the backup and releases the backup lock.

When Aiven restores the backup, it applies the tracked DDL changes, so the restored data
is consistent.

#### Requirements

- Aiven for MySQL 8.4 or later
- A service plan with at least two nodes: Business or Premium

The reduced DDL lock works with both full and
[incremental backups](/docs/products/mysql/howto/use-incremental-backups).

#### Enable the reduced DDL lock

The reduced DDL lock is in limited availability: it's fully supported, and Aiven enables
it on request for each service. To enable it for your service,
[contact Aiven support](mailto:support@aiven.io) with your project and service names. To
return to the default backup lock, contact Aiven support again.

#### DDL during backups with the reduced DDL lock

If you run DDL during backups, consider the following:

- **Final lock time:** Tables changed by DDL are copied again while the backup lock is
  held. Heavy DDL on a large table near the end of a backup can make the final lock last
  minutes. It's still shorter than the default backup lock, which covers the whole backup.
- **Backup size and duration:** Tables changed by DDL during a backup are copied twice, so
  backups of services with frequent DDL can be larger and take longer.

## Configure the backup schedule

Set the time of day when the daily backup is taken.

<EditBackupSchedule/>

<RelatedPages/>

- [Use incremental backups](/docs/products/mysql/howto/use-incremental-backups)
- [High availability of Aiven for MySQL®](/docs/products/mysql/concepts/high-availability)
- [Enable slow query logging for Aiven for MySQL®](/docs/products/mysql/howto/enable-slow-queries)
- [Aiven cloud security and data encryption](/docs/platform/concepts/cloud-security#data-encryption)
