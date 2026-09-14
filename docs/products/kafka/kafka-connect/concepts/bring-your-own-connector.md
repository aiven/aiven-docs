---
title: Bring your own connector for Aiven for Apache Kafka® Connect
sidebar_label: Bring your own connector
description: Upload custom Kafka Connect plugins and create connectors from those plugins on Aiven for Apache Kafka Connect.
limited: true
keywords:
  [
    bring your own connector,
    custom Kafka Connect plugin,
    custom Kafka connector,
    upload Kafka Connect plugin,
  ]
---

import LimitedBadge from "@site/src/components/Badges/LimitedBadge";

Bring your own connector lets you upload Kafka Connect plugins and create connectors from the connector classes they provide on Aiven for Apache Kafka® Connect.

This feature is in <LimitedBadge/>. To try it, contact the
[sales team](https://aiven.io/contact).

Bring your own connector is available on standalone Kafka Connect services.
Organization admins upload and manage plugins for the organization. Users with
access to a Kafka Connect service can create connectors from those plugins.

Custom plugins support Kafka Connect source and sink connectors. Single message
transforms, header converters, and other plugin types are not supported.

## Key concepts

Bring your own connector uses the following concepts:

- **Plugin**: A Kafka Connect plugin that you upload as a `.jar` file. A plugin
  can contain one or more source or sink connector classes.
- **Version**: A specific version of a plugin, for example `2.15.3`. You can
  upload multiple versions of a plugin. Uploading a new version does not
  replace existing versions.
- **Connector class**: A source or sink connector class provided by a plugin
  version, for example
  `solutions.a2.cdc.oracle.OraCdcLogMinerConnector`.
- **Connector**: A configured instance of a connector class on a Kafka Connect
  service. Each connector has its own name and configuration.

You can create multiple connectors from the same connector class. You can also
change the plugin version for all connectors that use that plugin on a Kafka
Connect service.

## How it works

Bring your own connector works as follows:

1. **Upload a plugin.** An organization admin uploads a `.jar` file and
   specifies a version.
1. **Identify connector classes.** Aiven processes the file and identifies
   the source and sink connector classes.
1. **Review connector classes.** The organization admin reviews the classes
   and adds a name, author, documentation URL, and description.
1. **Create a connector.** If you have access to a Kafka Connect service,
   select **Custom plugins**, choose a connector class, and configure the
   connector.
1. **Install the plugin.** If the plugin version isn't installed on the Kafka
   Connect service, Aiven installs it when you create a connector that uses
   that version.

Installing a plugin version briefly restarts Kafka Connect and its active
connector tasks.

## Responsibility for custom plugins

Aiven provides the platform to upload plugins, install them on Kafka Connect
services, and create connectors from those plugins.

You are responsible for the security, compatibility, and runtime behavior of
the plugins that you upload and the connectors that you create from them. Only
upload plugins from sources that you trust.

## Next steps

- [Upload and manage Kafka Connect plugins](/docs/products/kafka/kafka-connect/howto/upload-and-manage-kafka-connect-plugins)
- [Create connectors from custom plugins](/docs/products/kafka/kafka-connect/howto/create-connectors-from-custom-plugins)
- [Available Apache Kafka® Connect connectors](/docs/products/kafka/kafka-connect/concepts/list-of-connector-plugins)
