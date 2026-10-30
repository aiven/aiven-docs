---
title: Use Aiven for MySQL® incremental backups
sidebar_label: Incremental backups
---
import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Enable incremental backups for your Aiven for MySQL® service to back up only what changed since the last full backup, check the type of each stored backup, and follow a restore through the backup chain.

The Aiven for MySQL® incremental backups feature is an extension of the
[base backups](/docs/products/mysql/concepts/mysql-backups) feature. It allows you to back
up only the changes (increments) made since your last full backup. While full backups
provide a complete snapshot of your database at a specific point in time, incremental
backups capture the differences that have occurred between these full snapshots. This
feature calculates the difference between the last full backup and the current state of
your Aiven for MySQL database and stores it. During a restore, the full backup is applied
first, followed by each incremental backup in order, reconstructing your database to the
desired point in time.

Use incremental backups for:

- **Reduced DDL lock times:** For large databases, full backups can cause prolonged DDL
  (Data Definition Language) locks. Incremental backups significantly reduce this lock
  duration, especially when there haven't been many changes.
- **Efficient storage:** Databases with fewer changes will benefit from less storage
  consumption, as incremental backups only store the differences, leading to more
  efficient use of your storage.

:::note

- Restoring from incremental backups might take more time than restoring from a full
  backup.
- Incremental backups reduce DDL lock duration, but they don't eliminate DDL locks.

:::

## Prerequisites

- Access the [Aiven Console](https://console.aiven.io/) or the
  [Aiven API](/docs/tools/api).
- Decide which days of the week to take full backups on. Setting
  `full_backup_week_schedule` is required when you enable incremental backups.

## Enable incremental backups

<Tabs groupId="group1">
<TabItem value="gui" label="Console" default>

1. Access your Aiven for MySQL service in the [Aiven Console](https://console.aiven.io/).
1. In the sidebar, click <ConsoleLabel name="service settings"/>.
1. Scroll to the **Advanced configuration** section and click **Configure**.
1. In the **Advanced configuration** window, click **Add configuration option**.
1. Use the search bar to:
   1. Find `mysql_incremental_backup`, and set it to **Enable**.
   1. Find `mysql_incremental_backup.full_backup_week_schedule`, and set it to a string
      of any number of the following comma-separated values: `mon`, `tue`, `wed`, `thu`,
      `fri`, `sat`, `sun`.
1. Click **Save configuration**.

</TabItem>
<TabItem value="api" label="API">

Use the [ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
API to add `"mysql_incremental_backup": true` to the `user_config` object:

```bash
curl -X PUT \
  https://api.aiven.io/v1/project/YOUR_PROJECT_NAME/service/YOUR_SERVICE_NAME \
  -H "Authorization: Bearer YOUR_BEARER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
        "user_config": {
          "mysql_incremental_backup": {
            "enabled": true,
            "full_backup_week_schedule": "mon,wed"
          }
        }
      }'
```

In `"full_backup_week_schedule": "VALID_VALUES"`, replace the `VALID_VALUES` placeholder
with a string of any number of the following comma-separated values: `mon`, `tue`, `wed`,
`thu`, `fri`, `sat`, `sun`.

</TabItem>
</Tabs>

## Disable incremental backups

<Tabs groupId="group1">
<TabItem value="gui" label="Console" default>

1. Access your Aiven for MySQL service in the [Aiven Console](https://console.aiven.io/).
1. In the sidebar, click <ConsoleLabel name="service settings"/>.
1. Scroll to the **Advanced configuration** section and click **Configure**.
1. In the **Advanced configuration** window, click **Add configuration option**.
1. Use the search bar to find `mysql_incremental_backup`, and set it to **Disable**.
1. Click **Save configuration**.

</TabItem>
<TabItem value="api" label="API">

Use the [ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
API to add `"mysql_incremental_backup": false` to the `user_config` object:

```bash
curl -X PUT \
  https://api.aiven.io/v1/project/YOUR_PROJECT_NAME/service/YOUR_SERVICE_NAME \
  -H "Authorization: Bearer YOUR_BEARER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
        "user_config": {
          "mysql_incremental_backup": {
            "enabled": false
          }
        }
      }'
```

</TabItem>
</Tabs>

## Identify full and incremental backups

With incremental backups enabled, your service stores a chain of backups: a full backup
taken on one of the days in `full_backup_week_schedule`, followed by the incremental
backups taken until the next full backup. Check the type of each stored backup to see how
your chain is built.

<Tabs groupId="group1">
<TabItem value="gui" label="Console" default>

1. Access your Aiven for MySQL service in the [Aiven Console](https://console.aiven.io/).
1. In the sidebar, click <ConsoleLabel name="backups"/>.
1. Check the **Backup type** column, which shows **Full** or **Incremental** for each
   backup in the list.

</TabItem>
<TabItem value="api" label="API">

Use the
[ServiceBackupsGet](https://api.aiven.io/doc/#tag/Service/operation/ServiceBackupsGet)
API to list stored backups:

```bash
curl -X GET \
  https://api.aiven.io/v1/project/YOUR_PROJECT_NAME/service/YOUR_SERVICE_NAME/backups \
  -H "Authorization: Bearer YOUR_BEARER_TOKEN"
```

Each entry in the response includes an `incremental` field, which is `true` for an
incremental backup and `false` for a full backup. This field is available for Aiven for
MySQL services only.

</TabItem>
</Tabs>

## Follow a restore through the backup chain

When a node is restored from a chain of backups, the full backup is applied first, and
then each incremental backup in order. While the restore runs, you can see which backup
in the chain is being applied.

In the [Aiven Console](https://console.aiven.io/), the service status shows a progress bar
for the position in the backup chain, in addition to the progress bar for the current
restore phase.

In the Aiven API, each entry in `node_states[].progress_updates[]` can include a
`position` object with the following fields:

- `backup_name`: Name of the backup currently being restored. It matches the name in the
  service backup list.
- `backup_incremental`: Whether the backup currently being restored is an incremental one.
- `chain_index`: Position of that backup in the restore chain, starting from `1`.
- `chain_total`: Total number of backups in the restore chain.

:::note
The `position` object is reported only when the service has chain information available.
Restores without it don't include the object.
:::

For the complete restore progress data model, see
[Track restore progress](/docs/products/mysql/howto/track-restore-progress).

<RelatedPages/>

- [Understand MySQL backups](/docs/products/mysql/concepts/mysql-backups)
- [Track restore progress](/docs/products/mysql/howto/track-restore-progress)
- [Backup to another region](/docs/products/mysql/howto/backup-to-another-region)
