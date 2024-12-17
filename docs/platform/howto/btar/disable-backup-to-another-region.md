---
title: Delete a cross-region backup
sidebar_label: Delete cross-region backup
limited: true
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";

Delete an [additional service backup](/docs/platform/concepts/backup-to-another-region) [created](/docs/platform/howto/btar/enable-backup-to-another-region) in a region different from your primary backup region.

You can delete a cross-region backup using the Aiven [console](#delete-btar-console),
[CLI](#delete-btar-cli), or [API](#delete-btar-api).

## Delete backup via console {#delete-btar-console}

1. Log in to the [Aiven Console](https://console.aiven.io/).
1. From the **Services** view, select an Aiven service on which you'd like to disable BTAR.
1. On your service's page, select **Backups** from the sidebar.
1. On the **Backups** page, click <ConsoleLabel name="actions"/> > **Secondary backup location**.
1. In the **Edit secondary backup location** window, select **Disable**.

Your additional service backup is no longer visible on your service's **Backups** page in
the **Secondary backup location** column.

## Delete backup with CLI {#delete-btar-cli}

To remove secondary backups for your service, use the
[avn service update](/docs/tools/cli/service-cli) command to remove all target regions names
from the `additional_backup_regions` array.

```bash
avn service update your-sevice-name   \
    -c additional_backup_regions=\[\]
```

## Delete backup with API {#delete-btar-api}

To remove secondary backups for your service, update the service configuration. Use the
[ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate) endpoint
to remove all target regions names from the `additional_backup_regions` array.

```bash
curl --request PUT                                                                  \
    --url https://api.aiven.io/v1/project/YOUR_PROJECT_NAME/service/YOUR_SERVICE_NAME   \
    --header 'Authorization: Bearer YOUR_BEARER_TOKEN'                                  \
    --header 'content-type: application/json'                                           \
    --data
      '{
        "user_config": {
          "additional_backup_regions": []
          }
      }'
```

The additional cross-region backup has been deleted. You still have the default backup
located in the primary (service-hosting) region.

## Related pages

- [About the backup to another region feature in Aiven](/docs/platform/concepts/backup-to-another-region)
- [Enable BTAR for your Aiven service](/docs/platform/howto/btar/enable-backup-to-another-region)
- [Manage BTAR for your Aiven service](/docs/platform/howto/btar/manage-backup-to-another-region)
