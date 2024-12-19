---
title: Upgrade from Aiven for Caching to Aiven for Valkey™
sidebar_label: Upgrade to Aiven for Valkey™
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

Upgrade your Aiven for Caching service to Aiven for Valkey using the Aiven Console or Aiven API.
The process retains configurations, users, and data without disrupting your service.

## Prerequisites

- Ensure your Aiven for Caching service is running **version 7.2**. Upgrade to 7.2 if
  needed.
- To upgrade using the Aiven API, ensure you have an
  [Aiven API token](/docs/platform/howto/create_authentication_token) with the
  necessary permissions.

## What to expect during the upgrade

- **No service disruption**: The upgrade occurs without interruption. The service
  is recycled, and the nodes are replaced, but your service continues to
  operate during the process.
- **DNS updates**: DNS names update to new hosts during the upgrade. This might
  cause brief delays as the changes take effect, but the service remains available.
- **Automatic configuration transfer**: All Aiven for Caching configurations are
  automatically updated to work with Aiven for Valkey. No manual changes are needed.

:::note
After you upgrade to Aiven for Valkey, you cannot revert to Aiven for Caching.
:::

## Upgrade service

<Tabs groupId="method">
<TabItem value="console" label="Aiven Console">

1. Access the [Aiven Console](https://console.aiven.io/) and select your
   **Aiven for Caching** service.
1. Click <ConsoleLabel name="service settings"/>.
1. Go to **Service management** section, and
   click <ConsoleLabel name="actions"/> > **Upgrade to Valkey**.
1. On the confirmation window, review the upgrade process guidelines, and click
   **Confirm upgrade**.

After confirming, the **Service status** changes to **Rebalancing** in the
**Service settings** screen. This indicates that the upgrade is in progress. The nodes
are recycled, and your service continues to operate as the upgrade completes.

</TabItem>
<TabItem value="api" label="Aiven API">

1. To upgrade the service to Aiven for Valkey using the API, run:

   ```bash
   curl -X PATCH \
     -H "Authorization: <AIVEN_TOKEN>" \
     -H "Content-Type: application/json" \
     --data '{"service_type": "valkey"}' \
     https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME/service_type

   ```

   Replace `AIVEN_TOKEN`, `PROJECT_NAME`, and `SERVICE_NAME` with your actual values.

1. Confirm the upgrade by checking the service details with this command:

   ```bash
   curl -X GET \
     -H "Authorization: <AIVEN_TOKEN>" \
     "https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME"
   ```

</TabItem> </Tabs>

## Related pages

Learn how to [update Terraform configuration and state after upgrading to Valkey™](https://registry.terraform.io/providers/aiven/aiven/latest/docs/guides/update-deprecated-resources#update-aiven_redis-resources-after-valkey-upgrade).
