---
title: Manage a cross-region backup
sidebar_label: Manage cross-region backup
limited: true
---

For a service that has the [backup to another region (BTAR)](/docs/platform/concepts/backup-to-another-region) feature [enabled](/docs/platform/howto/btar/enable-backup-to-another-region), you can check the service backup status, change the backup region, monitor the replication lag, fork and restore using [the cross-region backup](/docs/platform/concepts/backup-to-another-region), or migrate to another cloud or region.

## Prerequisites

You have at least one
[Aiven service with BTAR enabled](/docs/platform/howto/btar/enable-backup-to-another-region).

## Change a backup region

1. Log in to the [Aiven Console](https://console.aiven.io/).
1. From the **Services** view, select an Aiven service on which you'd like to enable BTAR.
1. On your service's page, select **Backups** from the sidebar.
1. On the **Backups** page, select the actions (**...**) menu > **Secondary backup
   location**.
1. In the **Edit secondary backup location** window, use the **Secondary location**
   menu to select a region for your additional backup. Confirm your choice by
   selecting **Save**.

:::important
You can change the backup region once in 24 hours.
:::

## Monitor a service with BTAR

There are a few things you may want to check for your Aiven service in the context of
BTAR:

- What is the status of a secondary backup?

  - Does your service has a backup in another region?
  - What is the target region of the secondary backup?

- What is the replication lag between data availability in the primary region and the
  secondary region?

### Check BTAR status in the console

To see the availability, the status, and the target region of a secondary (BTAR)
backup in the [Aiven Console](https://console.aiven.io/), go to your
**service's page** > **Backups** view > **Secondary backup location** column.

### Determine replication lag with API

Determine the target region and the replication lag for a secondary (BTAR) backup of
your service, call the
[ServiceBackupToAnotherRegionReport](https://api.aiven.io/doc/#tag/Service/operation/ServiceBackupToAnotherRegionReport)
endpoint.

Configure the call as follows:

1. Enter YOUR-PROJECT-NAME and YOUR-SERVICE-NAME into the URL.
1. Specify DESIRED-TIME-PERIOD depending on the time period you need the metrics for:
   select one of the following values for the `period` key: `hour`, `day`, `week`,
   `month`, or `year`.

```bash
curl --request POST                                                                                                     \
   --url https://api.aiven.io/v1/project/YOUR-PROJECT-NAME/service/YOUR-SERVICE-NAME/backup_to_another_region/report    \
   --header 'Authorization: Bearer YOUR-BEARER-TOKEN'                                                                   \
   --header 'content-type: application/json'                                                                            \
   --data '{"period":"DESIRED-TIME-PERIOD"}'
```

As output, you get metrics including replication lags at specific points in time.

## Fork and restore a service with BTAR {#fork-and-restore}

You can use the [Aiven Console](https://console.aiven.io/) to recover your service from a
backup in another region. To restore your service using BTAR,
[create a fork](/docs/platform/concepts/service-forking) of the original service in the
region where the secondary backup resides.

:::note
When you **Fork & restore** from the secondary backup, your new fork service is created in
the cloud and region where the secondary backup is located. The fork service gets the same
plan that the primary service uses. Backups of the fork service are located in the region
where this new service is hosted.
:::

1. Open the [Aiven Console](https://console.aiven.io/) and go to your service
   homepage.
1. Select **Backups** from the sidebar.
1. On the **Backups** page, select **Fork & restore**.
1. In the **New database fork** window, apply the following settings:

   1. As **Source backup location**, select **Secondary location**.
<!--1. As **Source backup version**, select either **Latest transaction** or **Point in
      time**.

      :::note
      For the point-in-time recovery (PITR) option, set up the time to no later than the
      time of taking the latest backup.
      :::-->

   1. Specify a name for the new fork service.
   1. Select **Create fork**.

## Migrate a service with BTAR

You can migrate a service with BTAR the same way you
[migrate a service with a regular backup](/docs/platform/howto/migrate-services-cloud-region).

:::note
When you migrate your service, locations of service backups, both primary and secondary
ones, do not change.
:::

## Related pages

- [About the backup to another region feature in Aiven](/docs/platform/concepts/backup-to-another-region)
- [Enable BTAR for your Aiven service](/docs/platform/howto/btar/enable-backup-to-another-region)
- [Disable BTAR for your Aiven service](/docs/platform/howto/btar/disable-backup-to-another-region)
