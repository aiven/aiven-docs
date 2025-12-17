---
title: Use Aiven for MySQL® incremental backups
sidebar_label: Incremental backups
early: true
---
import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Streamline your Aiven for MySQL® backups using incremental backups.

The Aiven for MySQL® incremental backups feature is an extension of the
[base backups](/docs/products/mysql/concepts/mysql-backups) feature. It allows you to back
up only the changes (increments) made since your last full backup. While full backups
provide a complete snapshot of your database at a specific point in time, incremental
backups capture the differences that have occurred between these full snapshots. This
feature calculates the difference between the last full backup and the current state of
your Aiven for MySQL database and stores it. During a restore, the full backup is applied
first, followed by each incremental backup in order, reconstructing your database to the
desired point in time.

Use Aiven for MySQL® backups for:

- **Reduced DDL lock times:** For large databases, full backups can cause prolonged DDL
  (Data Definition Language) locks. Incremental backups significantly reduce this lock
  duration, especially when there haven't been many changes.
- **Efficient storage:** Databases with fewer changes will benefit from less storage
  consumption, as incremental backups only store the differences, leading to more efficient
  use of your storage.

:::note

- Restoring from incremental backups might take more time than restoring from a full backup.
- Using incremental backups doesn't allow to completely eliminate DDL locks.

:::

## Prerequisites

- Enable Aiven for MySQL® incremental backups as a
  [early availability feature](/docs/platform/concepts/service-and-feature-releases#early-availability-).
- Access the [Aiven Console](https://console.aiven.io/) or the
  [Aiven API](/docs/tools/api).
- Set up a weekly backup schedule before or when
  [enabling incremental backups](/docs/products/mysql/howto/use-incremental-backups#enable-incremental-backups).

## Enable incremental backups

<Tabs groupId="group1">
<TabItem value="gui" label="Console" default>

1. Access your Aiven for MySQL service in the [Aiven Console](https://console.aiven.io/).
1. Click <ConsoleLabel name="service settings"/> in the sidebar.
1. Scroll to the **Advanced configuration** section and click **Configure**.
1. In the **Advanced configuration** window, click **Add configuration option**.
1. Use the search bar to:
   1. Find `mysql_incremental_backup`, and set it to **Enable**.
   1. Find `mysql_incremental_backup.full_backup_week_schedule`, and set it to a string of
      any number of the following comma-separated values: `mon`, `tue`, `wed`, `thu`, `fri`,
      `sat`, `sun`.
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
1. Click <ConsoleLabel name="service settings"/> in the sidebar.
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

<RelatedPages/>

[Service backup](/docs/platform/concepts/service_backups)
