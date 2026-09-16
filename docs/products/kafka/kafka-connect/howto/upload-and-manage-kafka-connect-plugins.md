---
title: Upload and manage Kafka Connect plugins
sidebar_label: Upload and manage plugins
description: Upload and manage custom Kafka Connect plugins and plugin versions in the Aiven Console.
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

Upload and manage custom Kafka Connect plugins and their versions for your organization to use with Aiven for Apache Kafka® Connect.

This feature is in <LimitedBadge/>. To try it, contact the
[sales team](https://aiven.io/contact).

## Prerequisites

Before you begin, make sure:

- You have the
  [organization admin role](/docs/platform/concepts/permissions#organization-roles).
- Bring your own connector is enabled for your organization.
- You have a `.jar` or `.zip` file that is no larger than 150 MB.
- The file contains at least one Kafka Connect source or sink connector class.

:::note
You are responsible for the security, compatibility, and runtime behavior of
the plugins that you upload. Only upload plugins from sources that you trust.
:::

## Upload a plugin

1. Click **Admin**.
1. Click <ConsoleLabel name="platform management"/> > **Kafka plugins**.
1. Click **Upload plugin**.
1. On **Plugin details**, enter:
   - **Plugin name**: A name for the plugin in your organization.
   - **Version**: A version identifier, for example `2.15.3`.
   - **Description**: Optional. Information about what the plugin does and any
     customizations.
1. Click **Next**.
1. On **Upload plugin**, in **JAR file**, click **Choose file** and select a
   `.jar` or `.zip` file that is no larger than 150 MB.
1. Select the confirmation that you are responsible for the security,
   compatibility, and runtime behavior of the plugin.
1. Click **Upload**.

   Aiven validates the file and detects its Kafka Connect source and sink
   connector classes.

1. On **Connectors**, review each detected connector class:
   - **Name**: The name shown to users.
   - **Documentation link**: Optional. A link to the connector documentation.
   - **Author**: Optional. The connector author.
   - **Description**: Optional. Information about what the connector does.
1. Click **Next**.
1. Click **Done**.

The connector class identifier is detected from the plugin and cannot be
changed.

The plugin is available under **Custom plugins** on standalone Kafka Connect
services in the organization.

Uploading a plugin doesn't install it on a Kafka Connect service. Aiven
installs the selected plugin version as part of creating the first connector
that uses it.

## View plugin details

1. Click **Admin**.
1. Click <ConsoleLabel name="platform management"/> > **Kafka plugins**.
1. Click a plugin.

The **Overview** tab shows the plugin details and the connector classes
provided by the plugin.

The **Versions** tab shows the versions uploaded for the plugin.

## Edit plugin details

### Edit plugin description

1. Click **Admin**.
1. Click <ConsoleLabel name="platform management"/> > **Kafka plugins**.
1. Click the plugin to edit.
1. In **Plugin details**, click **Edit**.
1. Update the **Description**.
1. Click **Save**.

The plugin name cannot be changed.

### Edit connector class details

1. Click **Admin**.
1. Click <ConsoleLabel name="platform management"/> > **Kafka plugins**.
1. Click the plugin to edit.
1. In **Connector classes**, click **Edit**.
1. Update the **Name**, **Documentation link**, **Author**, or
   **Description**.
1. Click **Save**.

The connector class identifier cannot be changed.

## View plugin versions

1. Click **Admin**.
1. Click <ConsoleLabel name="platform management"/> > **Kafka plugins**.
1. Click a plugin.
1. Click the **Versions** tab.

The **Versions** tab shows each uploaded version, the connector classes it
provides, and the active connectors that use it.

## View connectors that use a plugin version

The **Active connectors** column shows how many connectors use each plugin
version.

To view those connectors:

1. Click **Admin**.
1. Click <ConsoleLabel name="platform management"/> > **Kafka plugins**.
1. Click a plugin.
1. Click the **Versions** tab.
1. Click <ConsoleLabel name="actions"/> next to the plugin version.
1. Click **Details**.
1. Click **Active connectors**.

## Upload a new plugin version

A plugin can have multiple versions.

1. Click **Admin**.
1. Click <ConsoleLabel name="platform management"/> > **Kafka plugins**.
1. Click a plugin.
1. Click **Upload new version**.
1. On **Plugin details**, enter:
   - **Version**: A version identifier, for example `2.16.0`.
   - **Description**: Optional. Information about the changes in this version.
1. Click **Next**.
1. On **Upload plugin**, in **JAR file**, click **Choose file** and select a
   `.jar` or `.zip` file that is no larger than 150 MB.
1. Select the confirmation that you are responsible for the security,
   compatibility, and runtime behavior of the plugin.
1. Click **Upload**.

   Aiven validates the file and detects its Kafka Connect source and sink
   connector classes.

1. On **Connectors**, review each detected connector class. For each class,
   enter or update:
   - **Name**
   - **Documentation link**
   - **Author**
   - **Description**
1. Click **Next**.
1. Click **Done**.

Uploading a new version doesn't replace existing versions. It also doesn't
change the version installed on an existing Kafka Connect service.

To update an installed version,
[change the plugin version](/docs/products/kafka/kafka-connect/howto/create-connectors-from-custom-plugins#change-the-plugin-version)
from the Kafka Connect service.

## Delete a plugin version

:::important
You cannot delete a plugin version while a Kafka Connect service in the
organization uses it.

If a service uses `latest`, you also cannot delete the plugin version that
currently resolves to `latest`.

Remove or change the plugin version on all affected Kafka Connect services
before deleting it. Deleting a plugin version cannot be undone.
:::

To find connectors that use the plugin version, see
[View connectors that use a plugin version](#view-connectors-that-use-a-plugin-version).

1. Click **Admin**.
1. Click <ConsoleLabel name="platform management"/> > **Kafka plugins**.
1. Click a plugin.
1. Click the **Versions** tab.
1. Click <ConsoleLabel name="actions"/> next to the plugin version.
1. Click **Delete**.
1. Click **Delete** to confirm.

## Delete a plugin

1. Click **Admin**.
1. Click <ConsoleLabel name="platform management"/> > **Kafka plugins**.
1. Click a plugin.
1. Click <ConsoleLabel name="actions"/> > **Delete plugin**.
1. Click **Delete** to confirm.

Deleting a plugin cannot be undone.

## Troubleshoot

### The uploaded file is rejected

Aiven validates the file media type, not its filename extension.

Confirm that the file:

- Is a valid `.jar` or `.zip` file.
- Is no larger than 150 MB.
- Contains a valid Kafka Connect plugin.

### No connector classes are detected

Confirm that the file contains at least one Kafka Connect source or sink
connector class.

Check the plugin documentation or contact the plugin author if an expected
class is missing.

### A plugin version cannot be deleted

A Kafka Connect service uses the plugin version.

Remove or change the plugin version on all affected services, then try again.

<RelatedPages/>

- [Bring your own connector](/docs/products/kafka/kafka-connect/concepts/bring-your-own-connector)
- [Create connectors from custom plugins](/docs/products/kafka/kafka-connect/howto/create-connectors-from-custom-plugins)
- [Available Apache Kafka® Connect connectors](/docs/products/kafka/kafka-connect/concepts/list-of-connector-plugins)
