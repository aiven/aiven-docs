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

Bring your own connector lets your organization upload custom Kafka Connect plugins to Aiven for Apache Kafka® Connect.
Create connectors from the connector classes those plugins provide.

Use bring your own connector when the connector you need isn't available as an
Aiven-managed connector or when you need a specific plugin or plugin version.

This feature is in <LimitedBadge/>. To try it, contact the
[sales team](https://aiven.io/contact).

Bring your own connector is available on standalone Kafka Connect services.

## Key concepts

Bring your own connector uses the following concepts:

- **Custom plugin**: A Kafka Connect plugin uploaded by your organization.
  The Aiven Console lists uploaded plugins under **Custom plugins**. The
  following sections use plugin as the short form.
- **Plugin version**: A specific version of a plugin, for example `2.15.3`.
  You can upload multiple versions of the same plugin. Uploading a new version
  doesn't replace existing versions.
- **Connector class**: A source or sink connector class provided by a plugin
  version, for example
  `solutions.a2.cdc.oracle.OraCdcLogMinerConnector`.
- **Connector**: A configured instance of a connector class on a Kafka Connect
  service. Each connector has its own name and configuration.

You can create multiple connectors from the same connector class.

A Kafka Connect service uses one version of a plugin at a time.
[Changing the plugin version](/docs/products/kafka/kafka-connect/howto/create-connectors-from-custom-plugins#change-the-plugin-version)
applies the selected version to every connector on that service that uses the
plugin.

## Custom plugin roles and permissions

- **Upload and manage plugins:** Organization admins upload, review, and manage
  custom plugins and plugin versions.
- **Install plugins and create connectors:** Users with permission to create
  connectors on a Kafka Connect service can install plugins and create
  connectors from them.

## Custom plugin requirements

A custom plugin has the following requirements:

- **File type:** JAR or zip file.
- **Contents:** At least one Kafka Connect source or sink connector class.

Aiven detects the source and sink connector classes in the plugin and lists
them for review and configuration.

The file can also contain other classes, such as Single Message Transforms or
header converters. Aiven doesn't detect or list these classes separately.
They aren't supported, even if they work when packaged with a connector class.

## Bring your own connector workflow

Bring your own connector works as follows:

1. **Upload a plugin.** An organization admin uploads a JAR or zip file
   and specifies a plugin version.
1. **Review connector classes.** Aiven detects the source and sink connector
   classes. The organization admin reviews each class and can update its
   display name, author, documentation link, and description.
1. **Install the plugin.** A user with permission to create connectors installs
   the plugin on a Kafka Connect service. If multiple plugin versions are
   available, the user selects the plugin version to install.
1. **Create a connector.** The user selects a connector class from the
   installed plugin and configures the connector.

Installing a plugin version briefly restarts Kafka Connect and its active
connector tasks. This can cause a brief interruption.

Changing the installed plugin version also briefly restarts Kafka Connect and
its active connector tasks.

## Responsibility for custom plugins

Aiven provides the platform to upload plugins, install them on Kafka Connect
services, and create connectors from those plugins.

Your organization is responsible for the security, compatibility, and runtime
behavior of the custom plugins it uploads and the connectors created from
them. Only upload plugins from sources that you trust.

## Next steps

- [Upload and manage Kafka Connect plugins](/docs/products/kafka/kafka-connect/howto/upload-and-manage-kafka-connect-plugins)
- [Create connectors from custom Kafka Connect plugins](/docs/products/kafka/kafka-connect/howto/create-connectors-from-custom-plugins)
- [Available Apache Kafka® Connect connectors](/docs/products/kafka/kafka-connect/concepts/list-of-connector-plugins)
