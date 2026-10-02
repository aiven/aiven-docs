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

Bring your own connector lets you use custom Kafka Connect connectors with Aiven for Apache Kafka® Connect.
Use it when the connector you need isn't available as an Aiven-managed connector or when
you need a specific plugin or plugin version.

This feature is in <LimitedBadge/>. To try it, contact the
[sales team](https://aiven.io/contact).

Bring your own connector is available on
[standalone Kafka Connect services](/docs/products/kafka/kafka-connect/get-started).

## Key concepts

Bring your own connector uses the following concepts:

- **Custom plugin**: A JAR or ZIP file that contains one or more connector classes.
  You upload a plugin to Aiven and install it on a Kafka Connect service.
  Unlike Aiven-managed connectors, which Aiven provides and maintains, you upload
  and install custom plugins yourself.
- **Plugin version**: A specific version of a plugin, for example `2.15.3`.
  You can upload multiple versions of the same plugin. Uploading a new version
  doesn't replace existing versions.
- **Connector class**: The implementation of a connector provided by a plugin
  version, for example `solutions.a2.cdc.oracle.OraCdcLogMinerConnector`.
  A connector class is either a source or a sink. A source connector reads data
  from an external system into Apache Kafka. A sink connector writes data from
  Apache Kafka to an external system. You choose a connector class when you create
  a connector.
- **Connector**: A configured instance of a connector class from a plugin
  installed on a Kafka Connect service. Each connector has its own name and
  configuration. You can create multiple connectors from the same connector class.

A Kafka Connect service uses one version of each plugin at a time.
Uploading a new plugin version doesn't change the version installed on a service,
unless the service is configured to always use the latest version.
To use a different version,
[change the plugin version](/docs/products/kafka/kafka-connect/howto/create-connectors-from-custom-plugins#change-the-plugin-version)
on the service. The change applies to every connector on that service that uses the plugin.

In the Aiven Console, you manage uploaded plugins under **Kafka Connect plugins** in
your organization. Installed plugins appear on the **Custom plugins** tab of a
Kafka Connect service's **Connectors** page.

## Custom plugin workflow

To use a custom plugin:

1. **Upload a plugin.** An organization admin uploads a JAR or ZIP file
   and specifies a plugin version.
1. **Review connector classes.** Aiven detects the source and sink connector
   classes. The organization admin reviews each class and can update its
   name, author, documentation link, and description.
1. **Install the plugin.** A project operator or admin installs the plugin on a
   Kafka Connect service. If multiple plugin versions are available, they choose
   the version to install.
1. **Create a connector.** A developer, operator, or project admin chooses a
   connector class from the installed plugin and configures the connector.

:::warning[Warning]
Installing a plugin version or changing the installed version restarts Kafka
Connect, which briefly interrupts running connectors. This includes an automatic
switch on a service that always uses the latest version.
:::

## Roles and permissions for custom plugins

The access you need depends on the task. Any one of the listed roles or permissions is enough.

| Task                                                                    | Roles or permissions                                                                                          |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Upload, edit, or delete a plugin or plugin version                      | Organization admin (`role:organization:admin`)                                                                |
| Install a plugin, change its version, or uninstall it                   | Operator (`operator`), Project admin (`role:project:admin`), or `project:services:write`                      |
| View, create, edit, pause, stop, resume, restart, or delete a connector | Developer (`developer`), Operator (`operator`), Project admin (`role:project:admin`), or `service:data:write` |

Connector configurations can contain secrets in plain text, so viewing them requires the
same access as managing connectors. For more information about roles and permissions, see
[Roles and permissions](/docs/platform/concepts/permissions).

## Custom plugin requirements

A custom plugin has the following requirements:

- **File type:** An unencrypted JAR file, or a ZIP file built with the Confluent
  [`kafka-connect-maven-plugin`](https://github.com/confluentinc/kafka-connect-maven-plugin).
  Other ZIP structures aren't guaranteed to work.
- **File size:** No larger than 150 MB.
- **Contents:** At least one class that implements a Kafka Connect source or sink
  connector.

After you upload a plugin, Aiven detects its source and sink connector classes
and lists them in the Aiven Console for review.

A plugin file can also contain other Kafka Connect components, such as
Single Message Transforms, which modify records, or header converters.
Aiven doesn't list these components separately or support them.

## Responsibility for custom plugins

Aiven provides the platform to upload plugins, install them on Kafka Connect
services, and create connectors from those plugins.

Your organization is responsible for the custom plugins it uses, especially
plugins from third parties. This includes making sure that each plugin is secure,
works with the Kafka Connect version that your service runs, and performs as you
expect with your data and workload. Your organization is also responsible for the
connectors it creates from them.
Only use plugins from sources that you trust.

## Next steps

- [Upload and manage Kafka Connect plugins](/docs/products/kafka/kafka-connect/howto/upload-and-manage-kafka-connect-plugins)
- [Create connectors from custom Kafka Connect plugins](/docs/products/kafka/kafka-connect/howto/create-connectors-from-custom-plugins)
- [Available Apache Kafka® Connect connectors](/docs/products/kafka/kafka-connect/concepts/list-of-connector-plugins)
