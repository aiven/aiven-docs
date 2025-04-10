---
title: Manage connector versions in Aiven for Apache Kafka Connect®
sidebar_label: Manage connector versions
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";

Multi-version connector support lets you control which connector version is used in your Aiven for Apache Kafka Connect® service.
It prevents compatibility issues from automatic updates, avoids breaking changes
when multiple dependencies rely on a specific connector version, and allows testing,
upgrading, or reverting versions to maintain production pipeline stability. You can
specify the version of a connector by setting the `plugin_versions` property in the
service configuration.

## Key considerations for multi-version connectors

- Deprecated connector versions may be removed during maintenance updates. If you
  [set](#set-version) a deprecated version, the system alerts you and recommends an
  upgrade. The connector will continue to run, but upgrading to a supported version is
  recommended to avoid compatibility issues.
- Support is limited to the latest connector version and the most recent previous
  version. Breaking changes, if any, are detailed in
  [maintenance update notifications](/docs/platform/concepts/maintenance-window#maintenance-updates).
- Setting a connector version applies to the entire plugin, ensuring that all
  connectors provided by the plugin (such as source and sink connectors) use the same
  version.
- Multi-version support is available for all connectors where Aiven has published and
  supports more than one version. Support will continue to expand as new versions are
  released.
- If no version is set, the latest available version is used.
- Refer to [Check available connector versions](#check-available-connector-versions) to
  confirm which versions are supported before setting a version.

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
version `2.5.0` without raising a support ticket. To upgrade, set version `2.5.0` in
your configuration. For details, see [Set a connector version](#set-version).
:::

## Prerequisites

- [Aiven for Apache Kafka® service](/docs/products/kafka/kafka-connect/howto/enable-connect)
  with a [dedicated Aiven for Apache Kafka Connect® service](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster)
  enabled

  :::note
  Multi-version support is only available for dedicated Apache Kafka Connect services.
  :::
- [Aiven CLI](/docs/tools/cli)
- [Aiven API](/docs/tools/api)
- [Aiven Provider for Terraform](/docs/tools/terraform)


## Check available connector versions {#check-available-connector-versions}

Before selecting a connector version, check which versions are available for your
Aiven for Apache Kafka Connect service. This ensures that the desired version is
supported and can be set if needed. Use one of the following methods:

<Tabs groupId="check-method">
<TabItem value="console" label="Aiven Console" default>

1. Access the [Aiven Console](https://console.aiven.io/).
1. Select your Aiven for Apache Kafka Connect service.
1. Click <ConsoleLabel name="Connectors"/>.

Connectors that support multiple versions display **2 versions** next to their names on
the **Connectors** page.

:::note
When setting up a new connector, a default version is selected. To change it, go to the
connector details page and click **Change version**.
:::

</TabItem>
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
</Tabs>

## Set a connector version {#set-version}

To set a specific connector version, update the `plugin_versions` property in the
service configuration using the API, CLI, or Terraform. In the Aiven Console, you can
select the version through the UI.

The selected version applies to all instances of the connector, including both source and
sink connectors. For example, setting
the `aiven-kafka-connect-jdbc` plugin to version `6.9.0` affects both the JDBC source
and sink connectors.

:::note
Changing the connector version restarts the Apache Kafka Connect service and reloads
all plugins. This process can take several minutes.
:::


<Tabs groupId="check-method">
<TabItem value="console" label="Aiven Console" default>

1. In your Aiven for Apache Kafka Connect service, click <ConsoleLabel name="Connectors"/>.
1. In the **Enabled connectors** section, locate the connector to update.
1. Click <ConsoleLabel name="actions"/> > **Change connector version**.
1. In the **Version setup** window:
   - Select the version to use.
   - Optional: If you select the latest version, you can turn on
     **Enable version updates** to automatically update the connector to newer
     versions during maintenance updates.

     :::note
     **Enable version updates** is available only for the latest (default) version. This
     option is unavailable for older versions because automatic updates apply only to the latest version.
     :::
1. Depending on your selection, click:
   - **Install version and restart service** to apply the selected version.
   - **Confirm version** to keep the current version.

:::note
If you change the version, the connector installs the new package and restarts. The
selected version applies to all instances of the connector, including both source and
sink connectors.
:::

</TabItem>
<TabItem value="api" label="Aiven API" default>

1. Run the following command:

   ```bash
   curl -X PUT "https://api.aiven.io/v1/project/<project_name>/service/<service_name>" \
   -H "Authorization: Bearer <api_token>" \
   -H "Content-Type: application/json" \
   -d '{
         "user_config": {
           "plugin_versions": [{
             "plugin_name": "<plugin_name>",
             "version": "<version>"
           }]
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
   -c plugin_versions='[{"plugin_name":"<plugin_name>","version":"<version>"}]'
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

Use [the `plugin_versions` attribute](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/kafka_connect#nestedblock--kafka_connect_user_config--plugin_versions)
in your `aiven_kafka_connect` resource.

</TabItem>
</Tabs>

## Verify the connector version

After setting a version, confirm that the correct version is in use.

<Tabs groupId="check-method">
<TabItem value="api" label="Aiven API" default>

1. Run the following command:

   ```bash
   curl -X GET "https://api.aiven.io/v1/project/<project_name>/service/<service_name>" \
   -H "Authorization: Bearer <api_token>"

   ```

1. Review the `plugin_versions` property in the response to verify the set version.

</TabItem>
</Tabs>
