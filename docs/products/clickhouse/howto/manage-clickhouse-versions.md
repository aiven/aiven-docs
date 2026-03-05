---
title: Manage versions in Aiven for ClickHouse®
sidebar_label: Manage versions
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";

Aiven for ClickHouse® supports multiple ClickHouse versions. You can select a version when creating a service and upgrade the service to a newer supported version later.

## Supported ClickHouse versions

Aiven for ClickHouse currently supports the following versions:

- **25.3** (default)
- **25.8**

If you do not specify a version when creating a service, the platform uses the default
version.

## Before you upgrade

Before upgrading your service, complete the following checks:

- Review the upstream ClickHouse release notes.
- Test the upgrade in a development or staging environment.
- Verify that your applications and clients support the target version.
- Ensure recent backups are available.

Downgrading to an earlier ClickHouse version is not supported.

## How upgrades work

During a version upgrade, the platform replaces the service nodes with new nodes running
the selected version.

- New service nodes are created with the selected ClickHouse version.
- The new nodes start alongside the existing nodes.
- Data is streamed from the existing nodes to the new nodes.
- Once the migration completes, the service switches to the upgraded nodes.
- The previous nodes are removed.

This process avoids modifying the existing nodes directly during the upgrade.

## Upgrade your service

You can upgrade a service to a newer supported ClickHouse version using the
Aiven Console, CLI, API, or Terraform.

<Tabs groupId="method">
<TabItem value="console" label="Console" default>

1. In the [Aiven Console](https://console.aiven.io), open your Aiven for ClickHouse service.
1. On the <ConsoleLabel name="overview"/> page, go to the **Maintenance** section.
1. Click <ConsoleLabel name="actions"/> > **Upgrade version**.
1. Select a version to upgrade to, and click **Upgrade**.

</TabItem>
<TabItem value="cli" label="CLI">

1. Check the available ClickHouse versions:

   ```bash
   avn service versions
   ```

1. Upgrade the service:

   ```bash
   avn service update SERVICE_NAME \
     -c clickhouse_version="CLICKHOUSE_VERSION"
   ```

   Parameters:

   - `SERVICE_NAME`: Name of the service
   - `CLICKHOUSE_VERSION`: Target ClickHouse version, for example `25.8`

</TabItem>
<TabItem value="api" label="API">

Use the
[ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
endpoint and set `clickhouse_version`.

```bash
curl --request PUT \
  --url "https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME" \
  --header "Authorization: Bearer API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "user_config": {
      "clickhouse_version": "CLICKHOUSE_VERSION"
    }
  }'
```

Parameters:

- `PROJECT_NAME`: Name of the project
- `SERVICE_NAME`: Name of the service
- `API_TOKEN`: API authentication token
- `CLICKHOUSE_VERSION`: Target ClickHouse version, for example `25.8`

</TabItem>
<TabItem value="terraform" label="Terraform">

1. Update the
   [`aiven_clickhouse`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/clickhouse)
   resource and set `clickhouse_version`.

   ```hcl
   user_config {
     clickhouse_version = "CLICKHOUSE_VERSION"
   }
   ```

  Set `CLICKHOUSE_VERSION` to the target ClickHouse version, for example `25.8`.

1. Apply the change:

   ```bash
   terraform apply
   ```

</TabItem>
</Tabs>
