---
title: Manage connector versions in Aiven for Apache Kafka Connect®
sidebar_label: Manage connector versions
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Multi-version connector support lets you control which connector version is used in your Aiven for Apache Kafka Connect® service.
It prevents compatibility issues from automatic updates, avoids breaking changes
when multiple dependencies rely on a specific connector version, and allows testing,
upgrading, or reverting versions to maintain production pipeline stability.

## Key considerations for multi-version connectors

- Deprecated connector versions may be removed during maintenance updates. If you
  [pin](#pin-version) a deprecated version, the system alerts you and recommends an
  upgrade. The connector will continue to run, but upgrading to a supported version is
  recommended to avoid compatibility issues.
- Support is limited to the latest connector version and the most recent previous
  version. Breaking changes, if any, are detailed in
  [maintenance update notifications](/docs/platform/concepts/maintenance-window#maintenance-updates).
- Pinning a connector version applies to the entire plugin, ensuring that all
  connectors provided by the plugin (such as source and sink connectors) use the same
  version.
- Multi-version support is available for all connectors where Aiven has published and
  supports more than one version. Support will continue to expand as new versions are
  released.
- If no version is pinned, the latest available version is used.
- Refer to [Check available connector versions](#check-available-connector-versions) to
  confirm which versions are supported before pinning a version.

## Supported connectors and versions

:::note
All versions listed in the table are supported unless explicitly noted otherwise.
:::


| Connector          | Versions              |
|---------------------|-----------------------|
| Debezium            | `2.5.0` (recommended) <br /> `1.9.7` (deprecated) |
| JDBC                | `6.10.0` (recommended) <br /> `6.9.0` (deprecated) |
| Snowflake           | `2.3.0` (recommended) <br /> `2.2.0`               |


:::tip
This is a partial list of connectors, and it may change as new versions are released. To
view the most up-to-date versions, see
[Check available connector versions](#check-available-connector-versions).
:::

:::note
If you are using version `1.9.7` of the Debezium connector, you can upgrade to
version `2.5.0` without raising a support ticket. To upgrade, pin version `2.5.0` in
your configuration. For details, see [Pin a connector version](#pin-version).
:::

## Prerequisites

- [Aiven for Apache Kafka® service](/docs/products/kafka/kafka-connect/howto/enable-connect)
  with a [dedicated Aiven for Apache Kafka Connect® service](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster)
  enabled
- [Aiven CLI](/docs/tools/cli)
- [Aiven API](/docs/tools/api)
- [Aiven Provider for Terraform](/docs/tools/terraform)

:::note
Multi-version support is only available for **dedicated Kafka Connect services**. Ensure
that your service is updated to enable this feature.
:::

## Check available connector versions {#check-available-connector-versions}

Before pinning a connector version, check which versions are available for your
Apache Kafka Connect service. Verify if a connector supports multi-versioning by
reviewing the listed versions. Use one of the following methods:

<Tabs groupId="check-method">

<TabItem value="api" label="Aiven API" default>

1. Run the following command:

   ```bash
   curl -X GET "https://api.aiven.io/v1/project/<project_name>/service/<service_name>/available-connectors" \
   -H "Authorization: Bearer <API_TOKEN>"
   ```

1. Review the response to see the available versions. If multiple versions are listed,
   the connector supports multi-versioning.

   Example output:

   ```json
   {
    "plugin_name": "aiven-kafka-connect-jdbc",
    "available_versions": [
        {
            "version": "6.10.0",
            "deprecated": false
        },
        {
            "version": "6.9.0",
            "deprecated": true
        }
    ]
   }
   ```

</TabItem>
<TabItem value="cli" label="Aiven CLI">

1. Run the following command:

   ```bash
   avn service connector available <service_name>
   ```

1. Review the output to see the available versions. If multiple versions are listed,
   the connector supports multi-versioning.

   Example output:

   ```json
   {
      "plugin_name": "aiven-kafka-connect-jdbc",
      "available_versions": [
        {
          "version": "6.10.0",
          "deprecated": false
        },
        {
          "version": "6.9.0",
          "deprecated": true
        }
      ]
    }
   ```

</TabItem>
<TabItem value="terraform" label="Terraform">

In Terraform, you can specify the desired connector version using the `plugin_versions`
attribute in your configuration. This ensures that your Apache Kafka Connect service
uses the exact version you need.

For detailed steps and examples, see [Pin a connector version](#pin-version).

</TabItem>
</Tabs>

## Pin a connector version {#pin-version}

To use a specific connector version, update the `plugin_versions` property in the
service configuration. Pinning a **plugin version** applies to all connectors
(source and sink) provided by that plugin. For example, pinning
the `aiven-kafka-connect-jdbc` plugin to version `6.9.0` affects both the JDBC source
and sink connectors.

:::note
Pinning a plugin version restarts Apache Kafka Connect and reloads all plugins.
Allow time for the process to complete.
:::

<Tabs groupId="check-method">
<TabItem value="api" label="Aiven API" default>

1. Run the following command:

   ```bash
   curl -X PUT "https://api.aiven.io/v1/project/<project_name>/service/<service_name>" \
   -H "Authorization: Bearer <api_token>" \
   -H "Content-Type: application/json" \
   -d '{
         "plugin_versions": {
           "<plugin_name>": "<version>"
         }
       }'
   ```

   Parameters:

   - `<project_name>`: Aiven project name.
   - `<service_name>`: Apache Kafka Connect service name.
   - `<api_token>`: Aiven API token.
   - `<plugin_name>`: Plugin name. For example, `aiven-kafka-connect-jdbc`.
   - `<version>`: Desired version of the plugin. For example, `6.9.0`.

1. Verify the update in the service configuration:

   ```bash
   curl -X GET "https://api.aiven.io/v1/project/<project_name>/service/<service_name>" \
   -H "Authorization: Bearer <api_token>"
   ```

</TabItem>
<TabItem value="cli" label="Aiven CLI">

1. Run the following command:

   ```bash
   avn service update <service_name> --project <project_name> \
   -c 'plugin_versions={"<plugin_name>": "<version>"}'
   ```

   Parameters:

   - `<service_name>`: Apache Kafka Connect service name.
   - `<project_name>`: Aiven project name.
   - `<plugin_name>`: Plugin name. For example, `aiven-kafka-connect-jdbc`.
   - `<version>`: Desired version of the plugin. For example, `6.9.0`.

1. Verify the update:

   ```bash
   avn service get <service_name>
   ```

</TabItem>
<TabItem value="terraform" label="Terraform">

1. Update your Terraform configuration:

   ```hcl
   resource "aiven_service" "kafka_connect" {
     service_name = "<service_name>"
     project      = "<project_name>"

     user_config {
       plugin_versions = {
         "<plugin_name>" = "<version>"
       }
     }
   }
   ```

   Parameters:

   - `<service_name>`: Apache Kafka Connect service name.
   - `<project_name>`: Aiven project name.
   - `<plugin_name>`: Plugin name. For example, `aiven-kafka-connect-jdbc`.
   - `<version>`: Desired version of the plugin. For example, `6.9.0`.

1. Apply the changes:

   ```bash
   terraform apply
   ```

1. Confirm the updated configuration:

   ```bash
   terraform show
   ```

For detailed information, refer to the
[Terraform Registry - `plugin_versions`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/kafka_connect#plugin_versions-1).

</TabItem>
</Tabs>

## Verify the connector version

After pinning a version, confirm that the correct version is in use.

<Tabs groupId="check-method">
<TabItem value="api" label="Aiven API" default>

1. Run the following command:

   ```bash
   curl -X GET "https://api.aiven.io/v1/project/<project_name>/service/<service_name>" \
   -H "Authorization: Bearer <api_token>"

   ```

1. Review the `plugin_versions` property in the response to verify the pinned version.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

1. Run the following command:

   ```bash
   avn service get <service_name>
   ```

1. Check the `plugin_versions` property in the output to confirm the version.

</TabItem>
<TabItem value="terraform" label="Terraform">

Verify the version in your Terraform state or configuration after applying changes:

1. Run:

   ```bash
   terraform show
   ```

1. Locate the `plugin_versions` property under the Kafka Connect service resource.
   It displays the pinned version of the connector.

</TabItem>
</Tabs>
