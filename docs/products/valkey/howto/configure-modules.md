---
title: Configure Aiven for Valkey™ modules
sidebar_label: Configure modules
---

import RelatedPages from "@site/src/components/RelatedPages";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";

Enable or disable Valkey modules on your Aiven for Valkey™ service with the `valkey_modules_enabled` configuration parameter.

For the supported modules and the default list for each Valkey version, see
[Supported Valkey™ modules](/docs/products/valkey/reference/valkey-modules#module-availability-and-defaults).

To disable a module, first remove its data. See
[Before you disable a module](#before-you-disable-a-module).

## Prerequisites

- A running Aiven for Valkey service.
- All nodes are running.
- If not all nodes in your service support module configuration, apply the latest
  maintenance update.

## Before you disable a module

Check that your applications don't depend on the module. Stop writing data that uses
the module, and remove its data or indexes from all databases:

| Module   | Required before disabling                                                  |
| -------- | -------------------------------------------------------------------------- |
| `json`   | Delete all JSON documents.                                                 |
| `bloom`  | Delete all keys that contain Bloom filters.                                |
| `search` | In each database, run `FT._LIST`, then `FT.DROPINDEX` for each index.      |

If you use Valkey Search on JSON documents, keep the `json` module enabled. Valkey
Search can't create indexes on JSON documents without it.

If data or indexes remain, the change fails with a `409 Conflict` error. The error
lists every module that blocks the change and what it found, for example the number of
JSON documents or search indexes. Remove the remaining data or indexes, and try again.

The change also fails if Aiven can't verify that the module has no data, for example
because the service is powered off or a node isn't running. Power on the service and
wait until all nodes are running, then try again.

## Change the enabled modules

Enter the complete list of modules you want to enable. To disable a module, leave it
out of the list.

:::important
Enabling or disabling modules on an existing service triggers node replacement.
:::

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. In the [Aiven Console](https://console.aiven.io/), select your Aiven for
   Valkey service.
1. Click <ConsoleLabel name="service settings"/>.
1. In the **Advanced configuration** section, click **Configure**.
1. In the `valkey_modules_enabled` field, enter a comma-separated list of the
   modules to enable.
1. Click **Save configuration**.
1. Wait for the service status to change from **Rebalancing** to **Running**
   while Aiven replaces the nodes. Don't change the module configuration again
   until the status is **Running**.

For example, on Valkey 9:

- To enable all modules, enter `json,bloom,search`.
- To enable only JSON and Bloom, enter `json,bloom`.
- To disable all configurable modules, clear the field.

If the `valkey_modules_enabled` field is empty, no configurable modules are enabled.

</TabItem>
<TabItem value="cli" label="CLI">

Use the [`avn service update`](/docs/tools/cli/service-cli#avn-cli-service-update)
command to specify the modules to enable.

For example, to enable only JSON and Bloom on Valkey 9, run:

```bash
avn service update SERVICE_NAME \
  --project PROJECT_NAME \
  -c valkey_modules_enabled='["json","bloom"]'
```

To disable all configurable modules, set the value to an empty list:

```bash
avn service update SERVICE_NAME \
  --project PROJECT_NAME \
  -c valkey_modules_enabled='[]'
```

To wait until the nodes are replaced, run:

```bash
avn service wait SERVICE_NAME --project PROJECT_NAME
```

Replace the following placeholders:

- `SERVICE_NAME`: the name of your Aiven for Valkey service
- `PROJECT_NAME`: the name of your Aiven project

</TabItem>
</Tabs>

## Version upgrades

Upgrading your service doesn't change the enabled modules. If you upgrade from
Valkey 8.1 to 9, Aiven doesn't enable Valkey Bloom and Valkey Search automatically.
To use them, add `bloom` and `search` to `valkey_modules_enabled`.

## Forks, restores, and read replicas

When you fork a service, restore a backup to a new service, or create a read replica,
include at least the modules enabled on the source service in the target service.

Forks and read replicas inherit the source modules by default. If you set a different
module list, include every module enabled on the source service. You can add modules
that the target Valkey version supports.

If the target list omits a required module, the request fails. Add the missing
modules to the target configuration, and try again.

### Change modules on a service with read replicas

When you change the enabled modules on a service with read replicas, change them in
this order:

- To enable a module, enable it on all read replicas first, then on the primary service.
- To disable a module, disable it on the primary service first, then on the read replicas.

If you enable a module on the primary service first, the change fails with an error
that names the read replica to change first.

Wait for each service to return to **Running** before you change the next one.

<RelatedPages/>

- [Supported Valkey™ modules](/docs/products/valkey/reference/valkey-modules)
- [Manage Aiven for Valkey™ versions](/docs/products/valkey/howto/valkey-version-upgrade)
- [Fork your Aiven for Valkey™ service](/docs/products/valkey/howto/fork-service)
- [Create read replica in Aiven for Valkey™](/docs/products/valkey/howto/create-valkey-read-replica)
