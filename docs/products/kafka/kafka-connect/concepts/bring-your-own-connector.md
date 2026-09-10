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
import RelatedPages from "@site/src/components/RelatedPages";

Bring your own connector lets you upload Kafka Connect plugins and create
connectors from the connector classes they provide on Aiven for Apache Kafka®
Connect.

This feature is in <LimitedBadge/>. To try it, contact the
[sales team](https://aiven.io/contact).

Bring your own connector is available on standalone Kafka Connect services.
Organization admins upload and manage plugins for the organization. Users with
access to a Kafka Connect service can create connectors from those plugins.

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
change the plugin version used by a connector.

<!-- REVIEWER NOTE: Confirm deletion behavior before publishing it in the
user documentation. The design shows connectors continuing to run until the
next service upgrade after a plugin or version is deleted, while implementation
behavior needs confirmation.
Document the confirmed behavior in create-connectors-from-custom-plugins.md
under "What happens when a plugin or version is deleted". -->

<!-- REVIEWER NOTE: Confirm the maximum plugin file size before publishing it.
The design sources show different limits. Add the confirmed value to
upload-and-manage-kafka-connect-plugins.md, where users need it when uploading
a file. -->

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
1. **Install the plugin.** When you create the first connector that uses a
   plugin version, Aiven installs that version on the Kafka Connect service.

Installing a plugin version briefly restarts the Kafka Connect service and
its active connector tasks.

## Responsibility for custom plugins

You are responsible for the security, compatibility, and runtime behavior of
plugins that you upload. Only upload plugins from sources that you trust.

## Next steps

- [Upload and manage Kafka Connect plugins](/docs/products/kafka/kafka-connect/concepts/upload-and-manage-kafka-connect-plugins)
- [Create custom Kafka Connect connectors](/docs/products/kafka/kafka-connect/concepts/create-connectors-from-custom-plugins)
- [Available Apache Kafka® Connect connectors](/docs/products/kafka/kafka-connect/concepts/list-of-connector-plugins)
