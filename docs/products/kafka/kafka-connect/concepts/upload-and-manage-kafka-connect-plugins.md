---
title: Upload and manage Kafka Connect plugins
sidebar_label: Upload and manage plugins
description: Upload and manage custom Kafka Connect plugins and versions for your organization.
---

import LimitedBadge from "@site/src/components/Badges/LimitedBadge";
import ConsoleLabel from "@site/src/components/ConsoleIcons";

Upload and manage custom Kafka Connect plugins for your organization. Users with access to a Kafka Connect service can then create connectors from those plugins.

This feature is in <LimitedBadge/>. To try it, contact the
[sales team](https://aiven.io/contact).

## Prerequisites

To complete these procedures, you need the following:

- Bring your own connector is enabled for your organization.
- You have the Organization admin role.
- You have a `.jar` file that contains at least one Kafka Connect source or
  sink connector class.

:::note
Aiven is not responsible for the security, compatibility, and runtime
behavior of these connectors.
:::

<!-- REVIEWER NOTE: Confirm the maximum plugin file size before publishing it.
The design shows both 200 MB and 500 MB in different upload states. Add the
confirmed limit to the prerequisites or upload steps. -->

## Upload a plugin

1. Click **Admin** in the top navigation bar.
1. Click **Kafka Connect plugins**.
1. Click **Upload plugin**.
1. On **Plugin details**, enter:
   - **Plugin name**: A name for the plugin in your organization.
   - **Version**: A version identifier, for example `2.15.3`.
   - **Description**: Optional information about what the plugin does and any
     customizations.
1. Click **Next**.
1. On **Upload plugin**, select the `.jar` file.
1. Select the confirmation that you are responsible for the security,
   compatibility, and runtime behavior of the plugin.
1. Click **Upload**.

   Aiven validates the file and identifies the Kafka Connect source and sink
   connector classes it contains.

1. On **Connectors**, review each connector class that Aiven found. For each
   class, enter or update:
   - **Name**: The name shown to users.
   - **Documentation URL**: A link to documentation for the connector.
   - **Author**: The connector author.
   - **Description**: Information about what the connector does, including any
     customizations or release information.
1. Click **Next**.
1. Click **Done**.

The plugin is now available for use when creating connectors on Kafka Connect
services in the organization.

Uploading a plugin doesn't install it on a Kafka Connect service. Aiven installs
the required plugin version when a user creates the first connector from that
version on a service.

## View a plugin

1. Click **Admin** in the top navigation bar.
1. Click **Kafka Connect plugins**.
1. Click a plugin.

The **Overview** tab shows the plugin description, upload date, and connector
classes.

The **Versions** tab shows each version and its:

- Connector class count
- Active connector count
- Description
- Upload date

## View active connectors

1. Click **Admin** in the top navigation bar.
1. Click **Kafka Connect plugins**.
1. Click a plugin.
1. Click **Versions**.
1. Click a version.
1. Click **Active connectors**.

The list shows the connectors that use the version.

## Edit plugin and connector information

1. Click **Admin** in the top navigation bar.
1. Click **Kafka Connect plugins**.
1. Click a plugin.
1. In **Plugin details**, click **Edit**.
1. In **Connector classes**, click **Edit**.
1. Click **Save**.

## Upload a new version

1. Click **Admin** in the top navigation bar.
1. Click **Kafka Connect plugins**.
1. Click a plugin.
1. Click **Upload new version**.
1. Select the `.jar` file.
1. Enter the **Version**.
1. Optional: Enter a **Description** of the changes in this version.
1. Follow the remaining steps in [Upload a plugin](#upload-a-plugin).

The new version is added without replacing existing versions.

## Delete a plugin version

<!-- REVIEWER NOTE: Confirm deletion behavior before publishing.
The design shows a non-blocking deletion result in which connectors continue
running until the next service upgrade, while implementation evidence shows
different behavior. Don't state whether deletion is allowed or blocked while
a version is in use until the released behavior is confirmed.

Document the confirmed connector impact in
create-connectors-from-custom-plugins.md under
"What happens when a plugin or version is deleted". -->

1. Click **Admin** in the top navigation bar.
1. Click **Kafka Connect plugins**.
1. Click a plugin.
1. Click **Versions**.
1. Click <ConsoleLabel name="actions"/> > **Delete version**.
1. Click **Delete**.

For more information about how deleting a plugin version affects existing
connectors, see
[What happens when a plugin or version is deleted](./create-connectors-from-custom-plugins#what-happens-when-a-plugin-or-version-is-deleted).

## Delete a plugin

1. Click **Admin** in the top navigation bar.
1. Click **Kafka Connect plugins**.
1. Click a plugin.
1. Click <ConsoleLabel name="actions"/> > **Delete**.
1. Click **Delete**.

Deleting a plugin removes all its versions.

For more information about how deleting a plugin affects existing connectors,
see
[What happens when a plugin or version is deleted](./create-connectors-from-custom-plugins#what-happens-when-a-plugin-or-version-is-deleted).

## Troubleshoot an upload

If the upload fails, match the message to the following actions:

| Message | Recommended action |
| --- | --- |
| Select a `.jar` file. | The upload accepts only a `.jar` file. Select a `.jar` file. |
| Couldn't upload the file. | Check your connection, and then try again. |
| Your JAR file isn't a valid Kafka Connect plugin. | Select a `.jar` file that packages a Kafka Connect plugin. |
| No connector classes found. | Select a file that contains at least one Kafka Connect source or sink connector class, or check with the plugin author. |
| Upload is taking longer than expected. | Don't close **Upload plugin** until the upload finishes. |

## Next steps

- [Bring your own connector](./bring-your-own-connector)
- [Create connectors from custom plugins](./create-connectors-from-custom-plugins)
