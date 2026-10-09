---
title: Upload and manage Kafka Connect plugins
sidebar_label: Upload and manage plugins
description: Upload and manage custom Kafka Connect plugins and plugin versions for your organization in the Aiven Console.
limited: true
keywords:
  [
    upload Kafka Connect plugin,
    custom Kafka Connect plugin,
    Kafka Connect plugin version,
    manage Kafka Connect plugins,
    bring your own connector,
  ]
---

import LimitedBadge from "@site/src/components/Badges/LimitedBadge";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Upload custom Kafka Connect plugins to make their connector classes available to Aiven for Apache Kafka® Connect services in your organization.

To upload, edit, or delete a plugin or plugin version, you need the organization
admin role (`role:organization:admin`).

For definitions of plugin, plugin version, connector class, and connector, see
[Key concepts](/docs/products/kafka/kafka-connect/concepts/bring-your-own-connector#key-concepts).

## Prerequisites

Before you begin, make sure:

- Bring your own connector is enabled for your organization.
- You have a plugin file that meets the
  [custom plugin requirements](/docs/products/kafka/kafka-connect/concepts/bring-your-own-connector#custom-plugin-requirements).

:::note[Note]
Your organization is responsible for the plugins you upload and must hold all rights
and licenses needed to run and host them on Aiven's infrastructure. Aiven may
disable or remove a plugin. Only upload plugins from sources that you trust. For more
information, see
[Responsibility for custom plugins](/docs/products/kafka/kafka-connect/concepts/bring-your-own-connector#responsibility-for-custom-plugins).
:::

## Upload a plugin

Uploading a plugin makes it available to your organization, but doesn't
[install it on a Kafka Connect service](/docs/products/kafka/kafka-connect/howto/create-connectors-from-custom-plugins#install-a-plugin).

1. In the [Aiven Console](https://console.aiven.io/), select your organization.
1. Click **Admin**.
1. Click <ConsoleLabel name="platform management"/> > **Kafka Connect plugins**.
1. Click **Upload plugin**.
1. On **Plugin details**, enter:
   - **Plugin name**: A name for the plugin in your organization.
   - **Version**: A version identifier, for example `2.15.3`.
   - **Description**: Optional. Information about what the plugin does and any
     customizations.
1. Click **Next**.
1. In **Plugin file**, click **Choose file** and select the plugin file.
1. Select the checkbox to confirm the plugin terms.
1. Click **Upload**.

   Aiven validates the file and detects its Kafka Connect source and sink
   connector classes.

1. On **Connectors**, review the detected connector classes and enter the details
   that users see when they select a connector class to create a connector:
   - **Name**: Required. The name displayed for the connector class. Aiven provides
     a default based on the connector class name.
   - **Documentation link**: Optional. A link to the connector class documentation.
   - **Author**: Optional. The connector class author.
   - **Description**: Optional. Information about what the connector class does.

   Aiven also shows the full connector class name and whether the class is a
   source or sink connector. You can't change the connector class name.

1. Click **Next**.
1. Click **Done**.

After you upload the plugin, users with the required permissions can install it
on a Kafka Connect service and create connectors from its connector classes. For
instructions, see
[Create connectors from custom Kafka Connect plugins](/docs/products/kafka/kafka-connect/howto/create-connectors-from-custom-plugins#install-a-plugin).

## Upload a new plugin version

A plugin can have multiple versions. Uploading a new version doesn't replace
existing versions. It also doesn't change the version installed on a Kafka Connect
service, unless the service is configured to always use the latest version.

:::warning[Warning]
Services configured with **Always use latest version** switch to the new version
automatically. The switch isn't immediate and restarts Kafka Connect, which briefly
interrupts its connectors.
:::

1. In the [Aiven Console](https://console.aiven.io/), select your organization.
1. Click **Admin**.
1. Click <ConsoleLabel name="platform management"/> > **Kafka Connect plugins**.
1. Click the plugin.
1. Click **Upload new version**.
1. On **Plugin details**, enter:
   - **Version**: A version identifier, for example `2.16.0`.
   - **Description**: Optional. Information about the changes in this version.
1. Click **Next**.
1. In **Plugin file**, click **Choose file** and select the plugin file.
1. Select the checkbox to confirm the plugin terms.
1. Click **Upload**.

   Aiven validates the file and detects its Kafka Connect source and sink
   connector classes.

1. On **Connectors**, review the detected connector classes. Update the **Name**,
   **Documentation link**, **Author**, or **Description** of any connector class.
1. Click **Next**.
1. Click **Done**.

To use the new version on a service,
[change the plugin version](/docs/products/kafka/kafka-connect/howto/create-connectors-from-custom-plugins#change-the-plugin-version).

## View a plugin

1. In the [Aiven Console](https://console.aiven.io/), select your organization.
1. Click **Admin**.
1. Click <ConsoleLabel name="platform management"/> > **Kafka Connect plugins**.
1. Click the plugin.

The **Overview** tab shows the plugin details, including when the plugin was created,
who created it, and the connector classes provided by the plugin.
If you added a description, it also appears in **Plugin details**.

The **Versions** tab shows the versions uploaded for the plugin.

## View plugin versions

1. In the [Aiven Console](https://console.aiven.io/), select your organization.
1. Click **Admin**.
1. Click <ConsoleLabel name="platform management"/> > **Kafka Connect plugins**.
1. Click the plugin.
1. Click the **Versions** tab.

The **Versions** tab lists each uploaded version, the number of connector classes
it provides, and the number of connectors that use it.

To see who uploaded a version and its connector classes, click the version number.
The details panel shows each class's type (source or sink) and author.

## Edit plugin details

1. In the [Aiven Console](https://console.aiven.io/), select your organization.
1. Click **Admin**.
1. Click <ConsoleLabel name="platform management"/> > **Kafka Connect plugins**.
1. Click the plugin to edit.
1. In **Plugin details**, click **Edit**.
1. Update the **Description**.
1. Click **Save**.

You can't change the plugin name.

## Edit connector class details

1. In the [Aiven Console](https://console.aiven.io/), select your organization.
1. Click **Admin**.
1. Click <ConsoleLabel name="platform management"/> > **Kafka Connect plugins**.
1. Click the plugin to edit.
1. In **Connector classes**, click **Edit**.
1. Update the **Name**, **Documentation link**, **Author**, or **Description** of
   any connector class.
1. Click **Save**.

You can't change the connector class name.

## Delete a plugin version

:::important
You can't delete a plugin version while a Kafka Connect service in your
organization uses it.

If a service uses
[**Always use latest version**](/docs/products/kafka/kafka-connect/howto/create-connectors-from-custom-plugins#change-the-plugin-version),
you also can't delete the latest version of the plugin.

Change or remove the version on every service that uses it before you delete it.
Deleting a plugin version can't be undone.
:::

To find connectors that use the version, see
[View plugin versions](#view-plugin-versions).

1. In the [Aiven Console](https://console.aiven.io/), select your organization.
1. Click **Admin**.
1. Click <ConsoleLabel name="platform management"/> > **Kafka Connect plugins**.
1. Click the plugin.
1. Click the **Versions** tab.
1. Click <ConsoleLabel name="actions"/> next to the version.
1. Click **Delete**.
1. Click **Delete** to confirm.

## Delete a plugin

:::important
You can't delete a plugin while any of its versions is installed on a Kafka Connect
service in your organization. Uninstall the plugin from those services first. For
more information, see
[Uninstall a plugin](/docs/products/kafka/kafka-connect/howto/create-connectors-from-custom-plugins#uninstall-a-plugin).

Deleting a plugin also deletes all its versions. You can't undo this action.
:::

1. In the [Aiven Console](https://console.aiven.io/), select your organization.
1. Click **Admin**.
1. Click <ConsoleLabel name="platform management"/> > **Kafka Connect plugins**.
1. Click the plugin.
1. Click <ConsoleLabel name="actions"/> > **Delete plugin**.
1. Click **Delete** to confirm.

## Troubleshoot

### The uploaded file is rejected

Aiven checks the actual format of the file, so renaming a file doesn't make it
valid.

Confirm that the file meets the
[custom plugin requirements](/docs/products/kafka/kafka-connect/concepts/bring-your-own-connector#custom-plugin-requirements).

### No connector classes are detected

The file doesn't contain a Kafka Connect source or sink connector class that
Aiven can detect.

Check the plugin documentation or contact the plugin author if an expected class
is missing.

### You can't delete a plugin or a plugin version

A Kafka Connect service uses the plugin or one of its versions. Change or remove
the plugin version on every service that uses it before you delete the version.
Uninstall the plugin from every service that uses it before you delete the plugin.

<RelatedPages/>

- [Bring your own connector](/docs/products/kafka/kafka-connect/concepts/bring-your-own-connector)
- [Create connectors from custom Kafka Connect plugins](/docs/products/kafka/kafka-connect/howto/create-connectors-from-custom-plugins)
- [Roles and permissions for custom plugins](/docs/products/kafka/kafka-connect/concepts/bring-your-own-connector#roles-and-permissions-for-custom-plugins)
- [Available Apache Kafka® Connect connectors](/docs/products/kafka/kafka-connect/concepts/list-of-connector-plugins)
