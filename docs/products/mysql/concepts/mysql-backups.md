---
title: Understand MySQL backups
sidebar_label: Backups
---

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

## MySQL backups and encryption

All Aiven for MySQL backups use the [myhoard
software](https://github.com/aiven/myhoard) to perform encryption.
Myhoard utilizes [Percona XtraBackup](https://www.percona.com/)
internally for taking a full (or incremental) snapshot of MySQL.

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

## More resources

-   Our blog post: [MyHoard, your solution to MySQL backups and
    restoration](https://aiven.io/blog/introducing-myhoard-your-single-solution-to-mysql-backups-and-restoration)
-   Read about [Aiven cloud security and data
    encryption](/docs/platform/concepts/cloud-security#data-encryption)
