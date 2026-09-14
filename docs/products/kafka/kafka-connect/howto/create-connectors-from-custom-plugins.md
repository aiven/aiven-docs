---
title: Create connectors from custom plugins
sidebar_label: Create connectors from custom plugins
description: Create and manage Kafka Connect connectors from custom plugins on an Aiven for Apache Kafka Connect service.
limited: true
keywords:
  [
    custom Kafka connector,
    custom plugin,
    create Kafka connector,
    change connector version,
  ]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Create connectors from custom Kafka Connect plugins on an Aiven for Apache Kafka® Connect service.

## Prerequisites

Before you begin, make sure:

- You have a standalone [Aiven for Apache Kafka Connect service](/docs/products/kafka/kafka-connect/get-started).
- Bring your own connector is enabled for your organization and Kafka Connect service.
- An organization admin has uploaded the plugin and version to use.
- You have permission to create connectors on the Kafka Connect service.
- You have the credentials required by the connector.

:::note
Aiven is not responsible for the security, compatibility, and runtime
behavior of custom plugins.
:::

## Create a connector

1. Click <ConsoleLabel name="Connectors"/>.
1. Click **Create connector**.
1. Click the **Custom plugins** tab.
1. Find the plugin and version to use.
1. Click **Get started** for the connector class.

   If the plugin version isn't installed on the service, Aiven shows a warning
   that installing the plugin briefly restarts Kafka Connect and its active
   connector tasks, without data loss.

1. Enter a name for the connector.
1. Select the topics that the connector uses.
1. In **Task max**, enter the maximum number of tasks.
1. In **Connector configurations**, enter the configuration values. Use the
   plugin documentation to complete the required settings.
1. Click **Create**.

If the selected plugin version isn't installed on the service, Aiven installs
it when you create the connector. Installing the plugin briefly restarts Kafka
Connect and its active connector tasks.

After installation, the plugin status on the connector-selection screen changes
from **Ready for install** to **Installed**.

## View custom connectors

1. Click <ConsoleLabel name="Connectors"/>.
1. Click the **Custom plugins** tab.

The **Custom plugins** tab groups connectors by plugin. Each group shows the
plugin version.

For each connector, you can view its:

- Name
- Connector class
- Status
- Type
- Tasks

## Change the plugin version

Changing the plugin version updates every connector that uses that plugin on
the Kafka Connect service.

1. Click <ConsoleLabel name="Connectors"/>.
1. Click the **Custom plugins** tab.
1. Click <ConsoleLabel name="actions"/> next to the plugin.
1. Click **Change version**.
1. Select a version.
1. Review the version details and connector classes.
1. Click **Change**.

Changing the plugin version briefly restarts Kafka Connect and its active
connector tasks.

After the restart, review the connector status and logs for configuration or
compatibility errors.

## Troubleshoot

### The plugin or connector class isn't listed

- Confirm that you selected **Custom plugins** instead of **Aiven-managed**.
- Ask your organization admin whether the plugin and version are available.
- Confirm that the uploaded `.jar` or `.zip` file contains the source or sink
  connector class you need.

### A plugin has no connector classes

If a plugin shows **No connector classes available for this plugin**, ask your
organization admin to confirm that the uploaded `.jar` or `.zip` file contains
a valid Kafka Connect source or sink connector class.

### Connector creation restarts the service

Aiven restarts Kafka Connect when it installs a plugin version. The restart
briefly interrupts active connector tasks.

### A connector fails after a version change

Review the connector logs and compare the connector configuration with the
plugin version documentation.

### A connector can't use a topic

Custom connectors are subject to the capabilities and limitations of the Kafka
topics they use. Review the connector logs for details about the incompatibility.

<RelatedPages/>

- [Bring your own connector](/docs/products/kafka/kafka-connect/concepts/bring-your-own-connector)
- [Upload and manage Kafka Connect plugins](/docs/products/kafka/kafka-connect/howto/upload-and-manage-kafka-connect-plugins)
- [Available Apache Kafka® Connect connectors](/docs/products/kafka/kafka-connect/concepts/list-of-connector-plugins)
- [Troubleshoot connector list unavailable in Apache Kafka® Connect](/docs/products/kafka/kafka-connect/concepts/connect-plugin-list-not-available)
