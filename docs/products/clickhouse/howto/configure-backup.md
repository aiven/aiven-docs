---
title: Configure Aiven for ClickHouse® backup scheduling settings
sidebar_label: Configure backups
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Set the time when
[backups](/docs/products/clickhouse/concepts/disaster-recovery#service-backup) are taken
for your Aiven for ClickHouse® service.

## Prerequisites

- Depending on what tools to use for configuring backup settings:
  - [Aiven Console](https://console.aiven.io)
  - [Aiven API](/docs/tools/api)
  - [Aiven CLI](/docs/tools/cli)
- At least one Aiven for ClickHouse service backup to be configured

:::note

- Changing or adding some settings causes the service to restart.
- To reset already configured setting to default or to delete them, use the
  Aiven [API](/docs/tools/api) or [CLI](/docs/tools/cli).

:::

## Configure backup time

:::note
A backup process can only start when the previous backup process completes.
:::

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
endpoint, and add property assignments in the `user_config` object:

```bash{7-8}
curl --request PUT                                                        \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME \
  --header 'Authorization: Bearer YOUR_BEARER_TOKEN'                      \
  --header 'content-type: application/json'                               \
  --data '{
      "user_config": {
          "backup_hour": BACKUP_HOUR,
          "backup_minute": BACKUP_MINUTE
      }
  }'
```

Replace the following placeholders with meaningful values:

- `SERVICE_NAME`: the name of your service
- `PROJECT_NAME`: the name of your project
- `BACKUP_HOUR`: the hour when the service backup is started, an integer from `0` to `24`
- `BACKUP_MINUTE`: the minute when the service backup is started, an integer from `0` to `59`

</TabItem>
<TabItem value="cli" label="Aiven CLI">
Run the [avn service update](/docs/tools/cli/service-cli#avn-cli-service-update) command,
and add property assignments in the `user_config` object:

```bash{4-5}
avn service update SERVICE_NAME \
  --project PROJECT_NAME        \
  --user-config '{
      "backup_hour": BACKUP_HOUR,
      "backup_minute": BACKUP_MINUTE
  }'
```

Replace the following placeholders with meaningful values:

- `SERVICE_NAME`: the name of your service
- `PROJECT_NAME`: the name of your project
- `BACKUP_HOUR`: the hour when the service backup is started, an integer from `0` to `24`
- `BACKUP_MINUTE`: the minute when the service backup is started, an integer from `0` to `59`

</TabItem>
</Tabs>

## Restore defaults

<Tabs groupId="group1">
<TabItem value="gui" label="Aiven Console" default>
The [Aiven Console](https://console.aiven.io) doesn't support restoring defaults. Use
the Aiven [API](/docs/tools/api) or [CLI](/docs/tools/cli).
</TabItem>
<TabItem value="api" label="Aiven API">
Call the [ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
endpoint, and set the backup scheduling parameters to `null` or remove them from
`user_config`. Replace placeholders `SERVICE_NAME` and `PROJECT_NAME` with meaningful values.

```bash{7-8}
curl --request PUT                                                        \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME \
  --header 'Authorization: Bearer YOUR_BEARER_TOKEN'                      \
  --header 'content-type: application/json'                               \
  --data '{
      "user_config": {
          "backup_hour": null,
          "backup_minute": null
      }
  }'
```

</TabItem>
<TabItem value="cli" label="Aiven CLI">
Run the [avn service update](/docs/tools/cli/service-cli#avn-cli-service-update) command,
and set the backup scheduling parameters to `null` or remove them from `user_config`.
Replace placeholders `SERVICE_NAME` and `PROJECT_NAME` with meaningful values.

```bash{4-5}
avn service update SERVICE_NAME \
  --project PROJECT_NAME        \
  --user-config '{
      "backup_hour": null,
      "backup_minute": null
  }'
```

</TabItem>
</Tabs>

<RelatedPages/>

- [Disaster Recovery testing scenarios](/docs/platform/concepts/disaster-recovery-test-scenarios)
- [Fork and restore from Aiven for ClickHouse® backups](/docs/products/clickhouse/howto/restore-backup)
- [Disaster recovery in Aiven for ClickHouse®](/docs/products/clickhouse/concepts/disaster-recovery)
