---
title: Create custom Kafka Connect connectors
sidebar_label: Create custom connectors
description: Create Kafka Connect connectors from custom plugins on an Aiven for Apache Kafka Connect service.
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

After an organization admin publishes a custom Kafka Connect plugin, you can create connectors from it on your Kafka Connect service.

## Prerequisites

Before you begin, make sure:

- You have a standalone [Aiven for Apache Kafka Connect service](/docs/products/kafka/kafka-connect/get-started).
- Bring your own connector is enabled for your organization and Kafka Connect service.
- An organization admin has uploaded the plugin and version to use.
- You have permission to create connectors on the Kafka Connect service.

You are responsible for the security, compatibility, and runtime behavior of
connectors that you create from custom plugins.

## Create a connector

1. In your Kafka Connect service, click <ConsoleLabel name="Connectors"/>.
1. Click **Create connector**.
1. Click the **Custom plugins** tab.
1. Find the plugin and version to use.
1. Click **Get started** for the connector class.

   If the plugin version isn't installed on the service, Aiven shows a warning
   that creating the connector briefly restarts Kafka Connect and its active
   connector tasks, without data loss.

1. Enter a name for the connector.
1. Select the topics that the connector uses.
1. Enter the maximum number of tasks.
1. Edit the connector configuration.
1. Click **Create**.

If the selected plugin version isn't installed on the service, Aiven installs
it when you create the connector. Installing the plugin briefly restarts Kafka
Connect and its active connector tasks.

After installation, the plugin status changes from **Ready for install** to
**Installed**.

## View custom connectors

1. In your Kafka Connect service, click <ConsoleLabel name="Connectors"/>.
1. Click the **Custom plugins** tab.

Connectors are grouped by plugin. Each group shows the plugin version and
whether it is installed on the service.

For each connector, you can view its:

- Name
- Connector class
- Status
- Type
- Number of running tasks

## Change the plugin version

<!-- REVIEWER NOTE: Confirm whether changing a plugin version affects all
connectors on the service that use that plugin before publishing this behavior.
The UI exposes Change version at the plugin level. -->

1. In your Kafka Connect service, click <ConsoleLabel name="Connectors"/>.
1. Click the **Custom plugins** tab.
1. Click <ConsoleLabel name="actions"/> next to the plugin.
1. Click **Change version**.
1. Select a version.
1. Review the version details and connector classes.
1. Click **Change**.

Changing the plugin version briefly restarts Kafka Connect and its active
connector tasks.

After the restart, check the connector status and logs for configuration or
compatibility errors.

## What happens when a plugin or version is deleted {#what-happens-when-a-plugin-or-version-is-deleted}

<!-- REVIEWER NOTE: Resolve before publishing.

The developer-flow design shows deletion as non-blocking:

- If a plugin is deleted, affected connectors continue running until the next
  service upgrade.
- If a version is deleted, affected connectors continue running until the next
  service upgrade unless the version is changed first.

The current backend behavior conflicts with this and blocks deletion while a
service still references the plugin version.

Confirm the released behavior with engineering before replacing this comment
with user-facing content. -->

## Troubleshoot

### The plugin or connector class isn't listed

- Confirm that you selected **Custom plugins** instead of **Aiven-managed**.
- Ask your organization admin whether the plugin and version are available.
- Confirm that the uploaded `.jar` file contains the source or sink connector
  class you need.

### Connector creation restarts the service

Aiven restarts Kafka Connect when it installs a plugin version. The restart
briefly interrupts active connector tasks.

### A connector fails after a version change

Review the connector logs and compare the connector configuration with the
plugin version documentation.

### A connector can't use a topic

Custom connectors are subject to the capabilities and limitations of the Kafka
topics they use. Review the connector logs for details about the incompatibility.

<!-- REVIEWER NOTE: Add a link to the final Diskless topic compatibility
guidance or error reference when available. -->

<RelatedPages/>

- [Bring your own connector](/docs/products/kafka/kafka-connect/concepts/bring-your-own-connector)
- [Upload and manage Kafka Connect plugins](/docs/products/kafka/kafka-connect/concepts/upload-and-manage-kafka-connect-plugins)
- [Available Apache Kafka® Connect connectors](/docs/products/kafka/kafka-connect/concepts/list-of-connector-plugins)
- [Troubleshoot connector list unavailable in Apache Kafka® Connect](/docs/products/kafka/kafka-connect/concepts/connect-plugin-list-not-available)
