---
title: Create connectors from custom Kafka Connect plugins
sidebar_label: Create connectors from custom plugins
description: Install custom plugins on an Aiven for Apache Kafka Connect service, create connectors from them, change plugin versions, and uninstall plugins.
limited: true
keywords:
  [
    custom Kafka connector,
    custom plugin,
    create Kafka connector,
    change plugin version,
    uninstall plugin,
  ]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Install a custom plugin on your Aiven for Apache Kafka® Connect service, and create connectors from the connector classes the plugin provides.

An organization admin uploads the plugin that provides the connector.
You then install the plugin on your Kafka Connect service and create a connector from
one of its connector classes.

For definitions of plugin, plugin version, connector class, and connector, see
[Key concepts for bring your own connector](/docs/products/kafka/kafka-connect/concepts/bring-your-own-connector#key-concepts).

## Required roles and permissions

To install a plugin or create a connector, you need one of the following
[project roles or permissions](/docs/platform/concepts/permissions#project-roles-and-permissions):

- **Install a plugin, change its version, or uninstall it:** Operator,
  Project admin, or the `project:services:write` permission.
- **Create a connector:** Developer, Operator, Project admin, or the
  `service:data:write` permission.

If you don't have the required access, ask a project admin to change your role.
For the full list of roles and permissions for custom plugins, see
[Roles and permissions for custom plugins](/docs/products/kafka/kafka-connect/concepts/bring-your-own-connector#roles-and-permissions-for-custom-plugins).

## Prerequisites

Before you begin, make sure that:

- You have a standalone
  [Aiven for Apache Kafka Connect service](/docs/products/kafka/kafka-connect/get-started).
- Bring your own connector is enabled for your organization and Kafka Connect
  service.
- An organization admin has uploaded the plugin to use.
- You have the configuration values and credentials required by the connector.

:::note[Note]
Your organization is responsible for the custom plugins it uploads and the connectors
it creates from them. For more information, see
[Responsibility for custom plugins](/docs/products/kafka/kafka-connect/concepts/bring-your-own-connector#responsibility-for-custom-plugins).
:::

## Install a plugin

Plugins uploaded by your organization appear on the **Custom plugins** tab. Install a
plugin on the service to make its connector classes available for new connectors.

:::warning[Warning]
Installing a plugin version restarts Kafka Connect and its active connector
tasks, which causes a brief interruption. No data is lost.
:::

In your Kafka Connect service:

1. Click <ConsoleLabel name="Connectors"/>.
1. Click **Create connector**.
1. Click the **Custom plugins** tab.
1. Click **Install plugin** for the plugin to use.
1. If the plugin has multiple versions, in **Version**, select the version to
   install. The default is the latest version.
1. If the dialog shows plugin details and connector classes, review them.
1. Click **Install plugin** to confirm.

The plugin status moves from **Ready for install** to **Installing** to
**Installed**. Kafka Connect restarts, and connector actions are unavailable
until the service is back up, which usually takes a minute or two.

Uploading a newer plugin version doesn't change the version installed on the
service. To use the new version,
[change the plugin version](#change-the-plugin-version).

## Create a connector from an installed plugin

Create a connector from a connector class in a plugin installed on your service.
If the plugin status isn't **Installed**, [install the plugin](#install-a-plugin)
first.

In your Kafka Connect service:

1. Click <ConsoleLabel name="Connectors"/>.
1. Click **Create connector**.
1. Click the **Custom plugins** tab.
1. In the installed plugin, click **Get started** for the connector class to use.
1. In **Connector configurations**, enter the connector configuration in the JSON
   editor. The required fields depend on the connector class.

   See the connector or plugin documentation for the configuration values to use.
   Hover over a field name to see its documentation.

1. Click **Create**.

   Aiven validates the configuration before it creates the connector. If
   validation fails, fix the errors shown and click **Create** again.

The connector appears on the **Custom plugins** tab of the **Connectors** page,
grouped under its plugin. Confirm that its status is **Running**.

To view your connectors later, click <ConsoleLabel name="Connectors"/> > **Custom plugins**.
The tab shows the installed plugin version, and each connector's status, type, and
tasks.

## Change the plugin version

Upgrade a plugin to a newer version, or roll back to an earlier one. A newer version
is available after an organization admin
[uploads it](/docs/products/kafka/kafka-connect/howto/upload-and-manage-kafka-connect-plugins#upload-a-new-plugin-version).
All connectors on the service that use the plugin switch to the version you choose.

:::warning[Warning]
Changing the plugin version restarts Kafka Connect and its active connector
tasks, which causes a brief interruption. No data is lost.
:::

In your Kafka Connect service:

1. Click <ConsoleLabel name="Connectors"/>.
1. Click the **Custom plugins** tab.
1. Click <ConsoleLabel name="actions"/> next to the plugin.
1. Click **Change version**.
1. In **Version**, select one of the following:
   - A specific plugin version, for example `3.6.1`. The installed version is
     labeled **(Current)**. The service keeps running the selected version until
     you change it.
   - **Always use latest version**. The service uses the latest version that an
     organization admin has uploaded.
1. Review the upload date and connector classes for the selected version.
1. Click **Change**.

On the **Custom plugins** tab, confirm that the plugin shows the version you
selected and that each connector's status is **Running**. If a connector fails,
see [A connector fails after a plugin version change](#a-connector-fails-after-a-plugin-version-change).

## Uninstall a plugin

:::warning
Uninstalling a plugin restarts Kafka Connect. Connectors that use the plugin stop
working, but Aiven doesn't delete them. The console lists them under
**Unavailable connectors**. To restore them, [install the plugin version](#install-a-plugin)
again. To remove them, delete them from that list.
:::

In your Kafka Connect service:

1. Click <ConsoleLabel name="Connectors"/>.
1. Click the **Custom plugins** tab.
1. Click <ConsoleLabel name="actions"/> next to the plugin.
1. Click **Uninstall plugin**.
1. Click **Uninstall** to confirm.

## Troubleshoot

### The plugin or connector class isn't listed

You might be viewing the **Aiven-managed** tab. Click the **Custom plugins** tab.

If the plugin still isn't listed, ask your organization admin to confirm that
the plugin version is uploaded and contains the required source or sink
connector class.

### You can't install, change, or uninstall a plugin

These tasks require specific roles or permissions. See
[Required roles and permissions](#required-roles-and-permissions), then ask a project
admin to perform the task or to grant you access.

### A connector fails after a plugin version change

On the **Custom plugins** tab, click <ConsoleLabel name="actions"/> next to the
connector > **View logs**.

Configuration options can differ between plugin versions. Compare the connector
configuration with the documentation for the new plugin version.

<RelatedPages/>

- [Bring your own connector](/docs/products/kafka/kafka-connect/concepts/bring-your-own-connector)
- [Upload and manage Kafka Connect plugins](/docs/products/kafka/kafka-connect/howto/upload-and-manage-kafka-connect-plugins)
- [Available Apache Kafka® Connect connectors](/docs/products/kafka/kafka-connect/concepts/list-of-connector-plugins)
- [Troubleshoot connector list unavailable in Apache Kafka® Connect](/docs/products/kafka/kafka-connect/concepts/connect-plugin-list-not-available)
