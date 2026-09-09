---
title: Bring your own connector for Aiven for Apache Kafka Connect®
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

Bring your own connector lets you upload your own Kafka Connect plugins and use the connector classes they provide with Aiven for Apache Kafka Connect®.

Organization admins upload and manage plugins for the organization. Users with access
to a Kafka Connect service can then create connectors from the connector classes provided
by those plugins.


## Key concepts

Bring your own connector uses the following concepts:

- **Plugin**: A Kafka Connect plugin that you upload as a `.jar` file.
  A plugin can contain one or more connector classes.
- **Version**: A specific version of a plugin, for example `2.15.3`.
  A plugin can have multiple versions.
- **Connector class**: A Kafka Connect source or sink class contained in
  a plugin version, for example `solutions.a2.cdc.oracle.OraCdcLogMinerConnector`.
- **Connector**: A configured instance of a connector class on a Kafka Connect
  service. Each connector has its own name and configuration.

A single plugin version can provide multiple connector classes.
You can use those classes to create connectors on different Kafka Connect services.

## How it works

1. **Upload a plugin.** An organization admin creates a plugin version and
   uploads its `.jar` file.
2. **Identify connector classes.** Aiven processes the uploaded file and
   identifies the Kafka Connect source and sink connector classes it contains.
3. **Review connector classes.** The admin reviews the discovered classes and
   adds details such as a name, author, documentation URL, and description.
4. **Create a connector.** On a Kafka Connect service, a user selects
   **Custom plugins**, chooses a connector class, and configures the connector.
5. **Install the plugin.** If the plugin version isn't already installed on the
   service, Aiven installs it when the connector is created. Installing the
   plugin briefly restarts the Kafka Connect service and its active connector
   tasks.

## Plugin versions

A plugin can have multiple versions. Organization admins can upload a new
version without replacing existing versions.

Users can change a connector to another available version of the plugin.

<!-- REVIEWER NOTE: Confirm deletion behavior before publishing it in the
user documentation. The design shows connectors continuing to run until the
next service upgrade after a plugin or version is deleted, while implementation
behavior needs confirmation.

Document the confirmed behavior in create-connectors-from-custom-plugins.md
under "What happens when a plugin or version is deleted". -->

## Responsibility for custom plugins

You are responsible for the security, compatibility, and runtime behavior of
plugins that you upload. Only upload plugins from sources that you trust.

## Supported connector types

Bring your own connector supports Kafka Connect source and sink connectors
packaged as `.jar` files.

<!-- REVIEWER NOTE: Confirm the maximum plugin file size before publishing it.
The design sources show different limits. Add the confirmed value to
upload-and-manage-kafka-connect-plugins.md, where users need it when uploading
a file. -->

## Next steps

- [Upload and manage Kafka Connect plugins](./upload-and-manage-kafka-connect-plugins)
- [Create connectors from custom plugins](./create-connectors-from-custom-plugins)
- [Available Apache Kafka® Connect connectors](/docs/products/kafka/kafka-connect/concepts/list-of-connector-plugins)
