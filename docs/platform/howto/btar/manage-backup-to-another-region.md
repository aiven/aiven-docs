---
title: Manage a cross-region backup
sidebar_label: Manage cross-region backup
limited: true
---

import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

For a service that has the [backup to another region (BTAR)](/docs/platform/concepts/backup-to-another-region) feature [enabled](/docs/platform/howto/btar/enable-backup-to-another-region), you can check the service backup status, change the backup region, monitor the replication lag, fork and restore using [the cross-region backup](/docs/platform/concepts/backup-to-another-region), or migrate to another cloud or region.

## Prerequisites

- At least one
  [Aiven service with BTAR enabled](/docs/platform/howto/btar/enable-backup-to-another-region)
- Access to the [Aiven Console](https://console.aiven.io/)
- [Aiven API](/docs/tools/api)
- [Aiven CLI](/docs/tools/api)

## Change a backup region

1. Log in to the [Aiven Console](https://console.aiven.io/) and go to your project.
1. On the <ConsoleLabel name="Services"/> page, select an Aiven service on which you'd
   like to enable BTAR.
1. On your service page, click <ConsoleLabel name="backups"/> in the sidebar.
1. On the **Backups** page, click <ConsoleLabel name="actions"/> >
   **Edit secondary backup location**.
1. In the **Edit secondary backup location** window, use the **Backup location**
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

### Check BTAR status

To see the availability, the status, and the target region of a secondary (BTAR)
backup in the [Aiven Console](https://console.aiven.io/), go to your
service page > <ConsoleLabel name="backups"/> > **Secondary backup location**.

### Determine replication lag

Determine the target region and the replication lag for a secondary (BTAR) backup of
your service, call the
[ServiceBackupToAnotherRegionReport](https://api.aiven.io/doc/#tag/Service/operation/ServiceBackupToAnotherRegionReport)
endpoint.

Configure the call as follows:

1. Enter `YOUR-PROJECT-NAME` and `YOUR-SERVICE-NAME` into the URL.
1. Specify `DESIRED-TIME-PERIOD` depending on the time period you need the metrics for:
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

You can use the [Aiven Console](/docs/tools/aiven-console), [API](/docs/tools/api), or
[CLI](/docs/tools/cli) to recover your service from a backup in another region. To restore
your service using BTAR, [create a fork](/docs/platform/concepts/service-forking) of the
original service in the region where the secondary backup resides.

:::note
When you **fork & restore** from the secondary backup, your new fork service is created in
the cloud and region where the secondary backup is located. The fork service gets the same
plan that the primary service uses. Backups of the fork service are located in the region
where this new service is hosted.
:::

<Tabs groupId="group1">
<TabItem value="gui" label="Aiven Console" default>
1. Open the [Aiven Console](https://console.aiven.io/) and go to your service
   homepage.
1. Click <ConsoleLabel name="backups"/> in the sidebar.
1. On the **Backups** page, select **Fork & restore**.
1. In the **New database fork** window:

   1. Set **Backup location** to either **Primary location** or **Secondary location**.
   1. Set **Backup version** to one of the following:

      - **Latest transaction**
      - **Point in time**: Set it up to no earlier than the time of taking the oldest
        replicated base backup.

   1. Specify a name for the new fork service.
   1. Select **Create fork**.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Run the [avn service create](/docs/tools/cli/service-cli#avn-cli-service-create) command
with the `--service-to-fork-from` option and the `--recovery-target-time`option. Set
`--recovery-target-time` to no earlier than the time of taking the oldest replicated base
backup.

```bash {6,7}
avn service create FORK_SERVICE_NAME                 \
  --plan SERVICE_PLAN                                \
  --project PROJECT_NAME                             \
  --service-type SERVICE_TYPE                        \
  --cloud SECONDARY_BACKUP_REGION                    \
  --recovery-target-time "YYYY-MM-DDTHH:MM:SS+00:00" \
  --service-to-fork-from PRIMARY_SERVICE_NAME
```

Replace the following with meaningful data:

- `FORK_SERVICE_NAME`
- `SERVICE_PLAN`
- `PROJECT_NAME`
- `SERVICE_TYPE`
- `SECONDARY_BACKUP_REGION`
- `PRIMARY_SERVICE_NAME`
- `YYYY-MM-DDTHH:MM:SS+00:00`

</TabItem>
<TabItem value="api" label="Aiven API">

Use the [ServiceCreate](https://api.aiven.io/doc/#tag/Service/operation/ServiceCreate) API
to create a fork service. When constructing the API request, add the `user_config` object
to the request body and nest the `service_to_fork_from` field and the
`recovery_target_time` field inside. Set `recovery_target_time` to no earlier than the
time of taking the oldest replicated base backup.

```bash
curl --request POST                                                    \
    --url https://api.aiven.io/v1/project/PROJECT_NAME/service         \
    --header 'Authorization: Bearer BEARER_TOKEN'                      \
    --header 'content-type: application/json'                          \
    --data
        '{
        "cloud": "SECONDARY_BACKUP_REGION",
        "plan": "SERVICE_PLAN",
        "service_name": "FORK_SERVICE_NAME",
        "service_type": "SERVICE_TYPE",
        "user_config": {
            "service_to_fork_from": "PRIMARY_SERVICE_NAME",
            "recovery_target_time": "YYYY-MM-DDTHH:MM:SS+00:00"
        }
    }'
```

Replace the following with meaningful data:

- `FORK_SERVICE_NAME`
- `SERVICE_PLAN`
- `PROJECT_NAME`
- `SERVICE_TYPE`
- `SECONDARY_BACKUP_REGION`
- `PRIMARY_SERVICE_NAME`
- `YYYY-MM-DDTHH:MM:SS+00:00`

</TabItem>
</Tabs>

## Migrate a service with BTAR

You can migrate a service with BTAR the same way you
[migrate a service with a regular backup](/docs/platform/howto/migrate-services-cloud-region).

:::note
When you migrate your service, locations of service backups, both primary and secondary
ones, do not change.
:::

<RelatedPages/>

- [About the backup to another region feature in Aiven](/docs/platform/concepts/backup-to-another-region)
- [Enable BTAR for your Aiven service](/docs/platform/howto/btar/enable-backup-to-another-region)
- [Disable BTAR for your Aiven service](/docs/platform/howto/btar/disable-backup-to-another-region)
