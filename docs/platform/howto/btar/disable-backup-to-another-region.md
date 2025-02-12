---
title: Delete a cross-region backup
sidebar_label: Delete cross-region backup
limited: true
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";
import RelatedPages from "@site/src/components/non-swizzled/RelatedPages";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Delete an [additional service backup](/docs/platform/concepts/backup-to-another-region) [created](/docs/platform/howto/btar/enable-backup-to-another-region) in a region different from your primary backup region.

You can delete a cross-region backup using the [Aiven Console](/docs/tools/aiven-console),
[API](/docs/tools/api), or [CLI](/docs/tools/cli). When you delete
the additional cross-region backup, you still have the default backup located in the
primary (service-hosting) region.

<Tabs groupId="group1">
<TabItem value="gui" label="Aiven Console" default>
1. Log in to the [Aiven Console](https://console.aiven.io/).
1. From the **Services** view, select an Aiven service on which you'd like to disable BTAR.
1. On your service's page, select **Backups** from the sidebar.
1. On the **Backups** page, click <ConsoleLabel name="actions"/> > **Secondary backup location**.
1. In the **Edit secondary backup location** window, select **Disable**.

Your additional service backup is no longer visible on your service's **Backups** page in
the **Secondary backup location** column.
</TabItem>
<TabItem value="cli" label="Aiven CLI">
To remove secondary backups for your service, use the
[avn service update](/docs/tools/cli/service-cli) command to remove all target regions names
from the `additional_backup_regions` array.

```bash
avn service update your-sevice-name   \
    -c additional_backup_regions=\[\]
```

</TabItem>
<TabItem value="api" label="Aiven API">
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

</TabItem>
</Tabs>

<RelatedPages/>

- [About the backup to another region feature in Aiven](/docs/platform/concepts/backup-to-another-region)
- [Enable BTAR for your Aiven service](/docs/platform/howto/btar/enable-backup-to-another-region)
- [Manage BTAR for your Aiven service](/docs/platform/howto/btar/manage-backup-to-another-region)
