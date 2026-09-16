---
title: Create connectors from custom Kafka Connect plugins
sidebar_label: Create connectors from custom plugins
description: Create and manage Kafka Connect connectors from custom plugins on an Aiven for Apache Kafka Connect service.
limited: true
keywords:
  [
    custom Kafka connector,
    custom plugin,
    create Kafka connector,
    change plugin version,
  ]
---

import LimitedBadge from "@site/src/components/Badges/LimitedBadge";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Create connectors from custom Kafka Connect plugins on an Aiven for Apache Kafka® Connect service.

This feature is in <LimitedBadge/>. To try it, contact the
[sales team](https://aiven.io/contact).

## Prerequisites

Before you begin, make sure:

- You have a standalone
  [Aiven for Apache Kafka Connect service](/docs/products/kafka/kafka-connect/get-started).
- Bring your own connector is enabled for your organization and Kafka Connect
  service.
- An organization admin has uploaded the plugin to use.
- You have permission to create connectors on the Kafka Connect service.
- You have the configuration values and credentials required by the connector.

:::note
Aiven is not responsible for the security, compatibility, and runtime behavior
of custom plugins.
:::

## Install a plugin

Before creating a connector from a custom plugin, install the plugin on the
Kafka Connect service.

:::caution
Installing a plugin version briefly restarts Kafka Connect and its active
connector tasks. This can cause a brief interruption.
:::

1. Click <ConsoleLabel name="Connectors"/>.
1. Click **Create connector**.
1. Click the **Custom plugins** tab.
1. Find the plugin to use.
1. Click **Install plugin**.
1. If multiple plugin versions are available, select the plugin version to
   install.
1. Review the plugin details and connector classes.
1. Click **Install**.

After the installation completes, the plugin status changes from
**Ready for install** to **Installed**.

## Create a connector

1. Click <ConsoleLabel name="Connectors"/>.
1. Click **Create connector**.
1. Click the **Custom plugins** tab.
1. Find the installed plugin.
1. Click **Get started** for the connector class to use.
1. Configure the connector:
   - Enter a connector name.
   - Select the topics that the connector uses.
   - Set the maximum number of tasks.
   - Enter the required connector configuration values.

   Use the plugin documentation for connector-specific configuration.

1. Click **Create**.

After the connector is created, it appears under **Custom plugins** on the
**Connectors** page.

## View connectors from custom plugins

1. Click <ConsoleLabel name="Connectors"/>.
1. Click the **Custom plugins** tab.

The **Custom plugins** tab groups connectors by plugin and shows the installed
plugin version. You can also view the connector status, type, and task status.

## Change the plugin version

Changing the plugin version applies the selected version to every connector on
the Kafka Connect service that uses the plugin.

1. Click <ConsoleLabel name="Connectors"/>.
1. Click the **Custom plugins** tab.
1. Click <ConsoleLabel name="actions"/> next to the plugin.
1. Click **Change version**.
1. Select the plugin version to use.
1. Review the plugin version details and connector classes.
1. Click **Change**.

Changing the plugin version briefly restarts Kafka Connect and its active
connector tasks.

After the restart, verify the connector status. If a connector fails, review
its logs and compare its configuration with the documentation for the new
plugin version.

## Troubleshoot

### The plugin or connector class isn't listed

Try the following:

- Click **Custom plugins** instead of **Aiven-managed**.
- Ask your organization admin to confirm that the plugin version is available.
- Confirm that the uploaded JAR or zip file contains the required source
  or sink connector class.

### A connector fails after a plugin version change

Review the connector logs and compare its configuration with the documentation
for the new plugin version.

<RelatedPages/>

- [Bring your own connector](/docs/products/kafka/kafka-connect/concepts/bring-your-own-connector)
- [Upload and manage Kafka Connect plugins](/docs/products/kafka/kafka-connect/howto/upload-and-manage-kafka-connect-plugins)
- [Available Apache Kafka® Connect connectors](/docs/products/kafka/kafka-connect/concepts/list-of-connector-plugins)
- [Troubleshoot connector list unavailable in Apache Kafka® Connect](/docs/products/kafka/kafka-connect/concepts/connect-plugin-list-not-available)
