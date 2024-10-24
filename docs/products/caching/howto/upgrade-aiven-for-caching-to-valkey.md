---
title: Upgrade from Aiven for Caching to Aiven for Valkey™
sidebar_label: Upgrade to Aiven for Valkey™
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"

You can upgrade your Aiven for Caching service to Aiven for Valkey directly through the Aiven Console.
The upgrade keeps your configurations, users, and data with no service disruption.

## Prerequisites

Before upgrading, ensure that your **Aiven for Caching** service is running
**version 7.2**. If your service is on **version 7.0**, it will first be
upgraded to **7.2** before the **Aiven for Valkey** upgrade can proceed.

## What to expect during the upgrade

- **No service disruption**: The upgrade occurs without interruption. The service
  is recycled, and the nodes are replaced, but your service continues to
  operate during the process.
- **DNS updates**: DNS names update to new hosts during the upgrade. This might
  cause brief delays as the changes take effect, but the service remains available.
- **Maintenance updates**: Any pending maintenance updates are applied during the
  upgrade process.
- **Automatic configuration transfer**: All Aiven for Caching configurations are automatically
  updated to work with Aiven for Valkey. No manual changes are needed.

:::note
Once you upgrade to Aiven for Valkey, you cannot revert to Aiven for Caching.
:::


## Upgrade procedure

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
