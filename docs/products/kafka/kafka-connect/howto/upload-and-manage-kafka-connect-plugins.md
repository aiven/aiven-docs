---
title: Upload and manage Kafka Connect plugins
sidebar_label: Upload connector plugins
description: Upload custom Kafka Connect plugin files and manage plugin versions for your Aiven organization.
limited: true
---

import LimitedBadge from "@site/src/components/Badges/LimitedBadge";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Upload and manage custom Kafka Connect plugins for your organization.

This feature is in <LimitedBadge/>. To try it, contact the
[sales team](https://aiven.io/contact).

## Prerequisites

Before you begin, make sure you have:

- Bring your own connector enabled for your organization
- The Organization admin role
- A `.jar` or `.zip` file that is 150 MB or smaller and contains at least one
  Kafka Connect source or sink connector class

:::note
Aiven provides the platform to upload and manage plugins. You are
responsible for the security, compatibility, and runtime behavior of
plugins that you upload.
:::

## Upload a plugin

1. Click **Admin** in the top navigation bar.
1. Click <ConsoleLabel name="platform management"/> > **Kafka Connect plugins**.
1. Click **Upload plugin**.
1. On **About plugin**, enter:
   - **Plugin name**: A name for the plugin in your organization.
   - **Version**: A version identifier, for example `2.15.3`.
   - **Description**: Optional. Information about what the plugin does and any
     customizations.
1. Click **Next**.
1. On **Upload plugin**, select a `.jar` or `.zip` file that is 150 MB or
   smaller.
1. Select the confirmation that you are responsible for the security,
   compatibility, and runtime behavior of the plugin.
1. Click **Upload**.

   Aiven processes the file and identifies the Kafka Connect source and sink
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

Uploading a plugin doesn't install it on a Kafka Connect service. Aiven
installs a plugin version when you add it to that service's configuration.

## View a plugin

1. Click **Admin** in the top navigation bar.
1. Click <ConsoleLabel name="platform management"/> > **Kafka Connect plugins**.
1. Click a plugin.

The **Overview** tab shows the plugin description, **Created at** date, and
connector classes.

The **Versions** tab shows each plugin version and the following information:

- **Connector classes**
- **Active connectors**
- **Description**
- **Created at** date

Each plugin version has its own description.

## View connectors that use a version

The **Versions** tab shows how many connectors use each plugin version.
Open a plugin version to see those connectors and the Kafka Connect service
where they run.

1. Click **Admin** in the top navigation bar.
1. Click <ConsoleLabel name="platform management"/> > **Kafka Connect plugins**.
1. Click a plugin.
1. On the **Versions** tab, click the plugin version.
1. Click **Active connectors**.

## Edit plugin description

1. Click **Admin** in the top navigation bar.
1. Click <ConsoleLabel name="platform management"/> > **Kafka Connect plugins**.
1. Click a plugin.
1. In **Plugin details**, click **Edit**.
1. Update the plugin description.
1. Click **Save**.

## Edit connector class details

1. Click **Admin** in the top navigation bar.
1. Click <ConsoleLabel name="platform management"/> > **Kafka Connect plugins**.
1. Click a plugin.
1. In **Connector classes**, click **Edit**.
1. Update the name, documentation URL, author, or description.
1. Click **Save**.

## Upload a new version

1. Click **Admin** in the top navigation bar.
1. Click <ConsoleLabel name="platform management"/> > **Kafka Connect plugins**.
1. Click a plugin.
1. Click **Upload new version**.
1. Select a `.jar` or `.zip` file that is 150 MB or smaller.
1. Enter:
   - **Version**: A version identifier, for example `2.15.3`.
   - **Description**: Optional. Information about the changes in this version.
1. Select the confirmation that you are responsible for the security,
   compatibility, and runtime behavior of the plugin.
1. Click **Upload**.

   Aiven processes the file and identifies the Kafka Connect source and sink
   connector classes it contains.

1. For each newly detected connector class, enter:
   - **Name**: The name shown to users.
   - **Documentation URL**: A link to documentation for the connector.
   - **Author**: The connector author.
   - **Description**: Information about what the connector does, including any
     customizations or release information.
1. Click **Next**.
1. Click **Done**.

Aiven adds the new version without replacing existing versions.

## Delete a plugin version

:::important
You cannot delete a plugin version while a Kafka Connect service in the
organization uses it.

If a service uses `latest`, you also cannot delete the plugin version that
currently resolves to `latest`.

Remove or change the plugin version on all affected Kafka Connect services
before you delete it.
:::

To find the services that use the plugin version, see
[View connectors that use a version](#view-connectors-that-use-a-version).

1. Click **Admin** in the top navigation bar.
1. Click <ConsoleLabel name="platform management"/> > **Kafka Connect plugins**.
1. Click a plugin.
1. On the **Versions** tab, click <ConsoleLabel name="actions"/> >
   **Delete version**.
1. Click **Delete**.

## Delete a plugin

:::important
Deleting a plugin deletes all its versions except those used by a Kafka Connect
service. This also applies to the plugin version that `latest` resolves to.

To delete the plugin and all its versions, first remove or change those plugin
versions on every affected service.
:::

1. Click **Admin** in the top navigation bar.
1. Click <ConsoleLabel name="platform management"/> > **Kafka Connect plugins**.
1. Click a plugin.
1. Click <ConsoleLabel name="actions"/> > **Delete**.
1. Click **Delete**.

## Troubleshoot

### An upload fails

If the upload fails, match the message to the following actions:

| Message | Recommended action |
| --- | --- |
| Select a JAR file to upload | Select a `.jar` or `.zip` file. |
| Upload failed | Check your connection. Try again. |
| Plugin validation failed. | Select a `.jar` or `.zip` file that packages a Kafka Connect plugin. |
| No connector classes were discovered in this plugin. | Select a file that contains at least one Kafka Connect source or sink connector class, or contact the plugin author. |
| Upload is taking longer than expected. | Don't close **Upload plugin** until the upload finishes. |

### A plugin version is in use

If a Kafka Connect service uses the plugin version, Aiven rejects the delete.
The error lists the plugin name, version, and number of affected services.

Remove the plugin version from those services, then try the delete again. For
more information about the services that use the version, see
[View connectors that use a version](#view-connectors-that-use-a-version).

<RelatedPages/>

- [Bring your own connector](/docs/products/kafka/kafka-connect/concepts/bring-your-own-connector)
- [Create connectors from custom plugins](/docs/products/kafka/kafka-connect/howto/create-connectors-from-custom-plugins)
