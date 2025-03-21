---
title: Configure Aiven for ClickHouse® backup settings
sidebar_label: Configure backups
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Choose when [backups](/docs/products/clickhouse/concepts/disaster-recovery#service-backup)
are taken for your Aiven for ClickHouse® service, or configure its base backup name.

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io)
- At least one Aiven for ClickHouse service backup to be configured

:::note

- After changing backup settings, you cannot reset them to default.
- After adding a backup setting, you cannot delete it.
- Changing or adding some settings causes the service to restart.

:::

## Configure backup

<Tabs groupId="group1">
<TabItem value="gui" label="Aiven Console" default>
1. Log in to the [Aiven Console](https://console.aiven.io) and go to your project.
1. Click <ConsoleLabel name="services"/> in the sidebar, and go to your Aiven for
   ClickHouse service.
1. On the service page, click <ConsoleLabel name="backups"/> in the sidebar.
1. On the **Backups** page, click <ConsoleLabel name="actions"/> >
   **Configure backup settings**.
1. In the **Configure backup settings** window:
   1. Click **Add configuration options**.
   1. Add options `backup_hour` and `backup_minute`, and set theirs values.
   1. Click **Save configuration**.
</TabItem>
<TabItem value="api" label="Aiven API">
Call the [ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
endpoint, and add a property assignment in the `user_config` object:

```bash{7-9}
curl --request PUT \
    --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME \
    --header 'Authorization: Bearer YOUR_BEARER_TOKEN' \
    --header 'content-type: application/json' \
    --data '{
        "user_config": {
            "backup_hour": BACKUP_HOUR,
            "backup_minute": BACKUP_MINUTE,
            "recovery_basebackup_name": "CLICKHOUSE_RECOVERY_BASEBACKUP_NAME"
        }
    }'
```

</TabItem>
<TabItem value="cli" label="Aiven CLI">

</TabItem>
</Tabs>

## Restore defaults

<RelatedPages/>

- [Disaster Recovery testing scenarios](/docs/platform/concepts/disaster-recovery-test-scenarios)
- [Fork and restore from Aiven for ClickHouse® backups](/docs/products/clickhouse/howto/restore-backup)
- [Disaster recovery in Aiven for ClickHouse®](/docs/products/clickhouse/concepts/disaster-recovery)
