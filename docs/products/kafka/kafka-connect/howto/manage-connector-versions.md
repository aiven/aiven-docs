---
title: Manage connector versions in Aiven for Apache Kafka Connect®
sidebar_label: Manage connector versions
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Manage specific Apache Kafka connector versions in your Kafka Connect service using multi-version connector support.
Managing versions gives you control over which connector version is used, helping to
avoid compatibility issues caused by automatic updates. Pin a version, test development
upgrades, and ensure production pipeline stability.

:::note
Multi-version support is available for connectors that have multiple versions
published. Support will expand as new versions are released.
:::

## Prerequisites

- [Aiven for Apache Kafka® service](/docs/products/kafka/kafka-connect/howto/enable-connect)
  with a [dedicated Aiven for Apache Kafka Connect® service](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster) enabled.
- Aiven CLI installed and authenticated.
- Aiven API token with the necessary permissions.
- Access to Aiven Provider for Terraform.

## Check available connector versions {#check-available-connector-versions}

To view the available versions for a connector, use one of the following methods:

<Tabs groupId="check-method">

<TabItem value="api" label="Aiven API" default>

1. Run the following command:

   ```bash
   curl -X GET "https://api.aiven.io/v1/project/<project_name>/service/<service_name>/available-connectors" \
   -H "Authorization: Bearer <API_TOKEN>"
   ```

1. Review the response to see the available versions. If multiple versions are listed,
   the connector supports multi-versioning.

   Example response:

   ```json
   {
       "plugin_name": "aiven-kafka-connect-jdbc",
       "available_versions": ["6.10.0", "6.9.0"]
   }
   ```

</TabItem>
<TabItem value="cli" label="Aiven CLI">

1. Run the following command:

   ```bash
   avn service connector-versions <service_name>
   ```

1. Review the output to see the available versions. If multiple versions are listed,
   the connector supports multi-versioning.

</TabItem>
<TabItem value="terraform" label="Terraform">

1. Use the `available_connectors` attribute in the Apache Kafka Connect resource output
   to view supported connector versions.
1. Check if multiple versions are listed for a connector in your Terraform state or plan.

</TabItem>
</Tabs>

## Pin a connector version

To use a specific connector version, update the `plugin_versions` property in the
service configuration. Pinning a **plugin version** applies to all connectors
(source and sink) provided by that plugin. For example, pinning
the `aiven-kafka-connect-jdbc` plugin to version `6.9.0` affects both the JDBC source
and sink connectors.

:::note
When you pin a plugin version, Apache Kafka Connect restarts and reloads all plugins.
Allow time for the process to complete.
:::

<Tabs groupId="setup-method">
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

:::note

- Upgrade to a supported version as soon as possible. Deprecated versions can be removed
  at any time.
- Avoid forced upgrades by manually upgrading to the next supported version. If you do
  not upgrade, the system will automatically apply the next available version.
- Refer to [Check available connector versions](#check-available-connector-versions) to
  identify supported versions.

:::

## Verify the connector version

After pinning a version, confirm that the correct version is in use.

<Tabs groupId="verify-method">
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
