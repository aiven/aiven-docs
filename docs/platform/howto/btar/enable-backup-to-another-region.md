---
title: Add a backup to another region
sidebar_label: Add cross-region backup
limited: true
---

import CreateService from "@site/static/includes/create-service-console.md";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Enable [the backup to another region (BTAR) feature](/docs/platform/concepts/backup-to-another-region) and create an additional cross-region service backup on top of a regular backup stored in the region where your service is hosted.

:::important
BTAR is supported for Aiven for MySQL®, Aiven for PostgreSQL®, and Aiven for OpenSearch®.
:::

To add an additional service backup for your service, you can use the Aiven Console, CLI,
or API. You can enable BTAR for

- [New Aiven service](/docs/platform/howto/btar/enable-backup-to-another-region#add-a-cross-region-backup-to-a-new-service)
  or
- [Existing Aiven service](/docs/platform/howto/btar/enable-backup-to-another-region#add-a-cross-region-backup-to-an-existing-service)

## Prerequisites

- This feature is in [limited availability](/docs/platform/concepts/service-and-feature-releases#limited-availability-).
  Enable it by contacting your account team.
- Make sure you have at least one running Aiven for MySQL® or Aiven for PostgreSQL® service.
- Depending on your preferred tool to manage BTAR with, make sure you can access or use:

  - [Aiven Console](https://console.aiven.io/)
  - [Aiven CLI](/docs/tools/cli)
  - [Aiven API](/docs/tools/api)

## Add a cross-region backup to an existing service

<Tabs groupId="group1">
<TabItem value="gui" label="Aiven Console" default>
1. Log in to the [Aiven Console](https://console.aiven.io/) and go to your project page.
1. From <ConsoleLabel name="Services"/>, select an Aiven service on which you'd like to
   enable BTAR.
1. On your service's page, click <ConsoleLabel name="backups"/> in the sidebar.
1. On the **Backups** page, click <ConsoleLabel name="actions"/> >
   **Add secondary backup location**.
1. In the **Add secondary backup location** window, toggle the
   **Secondary backup location enabled** switch and use the **Backup location** menu to
   choose a region for your additional backup.
1. Click **Save** to confirm your selection.

   :::tip
   For names of the cloud regions supported in Aiven, see column *Cloud* in
   [List of available cloud regions](/docs/platform/reference/list_of_clouds).
   :::

Your new additional backup is now visible on your service's **Backups** page in the
**Secondary backup location** column.
</TabItem>
<TabItem value="cli" label="Aiven CLI">
Use the [avn service update](/docs/tools/cli/service-cli) command to configure your
service so that it supports BTAR. Include `additional_backup_regions` as a parameter to
the command and set its value to the name of desired cloud region.

```bash
avn service update name_of_existing_service         \
    -c additional_backup_regions=[\"name_of_cloud_region\"]
```
</TabItem>
<TabItem value="api" label="Aiven API">
Use the [ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate) API
to configure your existing service so that it supports BTAR. When constructing the API
request, add the `user_config` object to the request body and nest the
`additional_backup_regions` field inside. Set the value of the
`additional_backup_regions` parameter to the name of desired cloud region.

```bash
curl --request PUT                                                                       \
    --url https://api.aiven.io/v1/project/YOUR_PROJECT_NAME/service/YOUR_SERVICE_NAME    \
    --header 'Authorization: Bearer YOUR_BEARER_TOKEN'                 \
    --header 'content-type: application/json'                          \
    --data
        '{
        "user_config": {
            "additional_backup_regions": ["cloud-region-name"]
        }
    }'
```

</TabItem>
</Tabs>

## Add a cross-region backup to a new service

<Tabs groupId="group1">
<TabItem value="gui" label="Aiven Console" default>

#### Step 1: Create a service

<CreateService/>

#### Step 2: Add a backup for the new service

1. On your service's page, click <ConsoleLabel name="backups"/> in the sidebar.
1. On the **Backups** page, click <ConsoleLabel name="actions"/> >
   **Add secondary backup location**.
1. In the **Add secondary backup location** window, toggle the
   **Secondary backup location enabled** switch and use the **Backup location** menu to
   choose a region for your additional backup.
1. Click **Save** to confirm your selection.

   :::tip
   For names of the cloud regions supported in Aiven, see column *Cloud* in
   [List of available cloud regions](/docs/platform/reference/list_of_clouds).
   :::

Your new additional backup is now visible on your service's **Backups** page in the
**Secondary backup location** column.
</TabItem>
<TabItem value="cli" label="Aiven CLI">
Use the [avn service create](/docs/tools/cli/service-cli) command to create a
service. Include `additional_backup_regions` as a parameter to the command and set its
value to the name of the desired cloud region.

```bash
avn service create                                            \
    --service-type service_type_name                          \
    --cloud cloud_region_name                                 \
    --plan service_plan_name                                  \
    -c additional_backup_regions=\[\"name_of_cloud_region\"\] \
    new_service_name
```

</TabItem>
<TabItem value="api" label="Aiven API">
Use the [ServiceCreate](https://api.aiven.io/doc/#tag/Service/operation/ServiceCreate) API
to create a service with BTAR enabled. When constructing the API request, add the
`user_config` object to the request body and nest the `additional_backup_regions`
field inside.

```bash
curl --request POST                                                    \
    --url https://api.aiven.io/v1/project/YOUR_PROJECT_NAME/service    \
    --header 'Authorization: Bearer YOUR_BEARER_TOKEN'                 \
    --header 'content-type: application/json'                          \
    --data
        '{
        "cloud": "string",
        "plan": "string",
        "service_name": "service_2_name",
        "service_type": "cassandra",
        "user_config": {
            "additional_backup_regions": ["cloud-region-name"]
        }
    }'
```

</TabItem>
</Tabs>

<RelatedPages/>

- [About the backup to another region feature in Aiven](/docs/platform/concepts/backup-to-another-region)
- [Manage BTAR for your Aiven service](/docs/platform/howto/btar/manage-backup-to-another-region)
- [Disable BTAR for your Aiven service](/docs/platform/howto/btar/disable-backup-to-another-region)
