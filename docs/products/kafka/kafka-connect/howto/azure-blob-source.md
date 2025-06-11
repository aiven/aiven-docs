---
title: Create an Azure Blob Storage source connector for Aiven for Apache Kafka®
sidebar_label: Azure Blob source connector
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';

Use the Azure Blob source connector to stream data from Blob Storage into Apache Kafka® for real-time processing, analytics, or recovery.

## Prerequisites

- An [Aiven for Apache Kafka® service](/docs/products/kafka/kafka-connect/howto/enable-connect)
  with Apache Kafka Connect enabled, or a
  [dedicated Aiven for Apache Kafka Connect® service](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster)
- An Azure Storage container with data to stream into an Apache Kafka topic
- A storage account connection string (`azure.storage.connection.string`) for authentication
- Azure Blob Storage details:
  - `azure.storage.container.name`: Name of the container to read from
  - Optional: `azure.blob.prefix` or `file.name.prefix` to filter files
- An existing Apache Kafka topic where the connector sends the data

## Input formats

Use the `input.format` parameter to configure how the connector interprets the
contents of source files. Supported formats:

- `bytes` (default)
- `jsonl`
- `avro`
- `parquet`

## Create an Azure Blob Storage source connector configuration file

Create a file named `azure_blob_source_config.json` with the following configuration:

```json
{
  "name": "azure-blob-source",
  "connector.class": "io.aiven.kafka.connect.azure.source.AzureBlobSourceConnector",
  "azure.storage.connection.string": "CONNECTION_STRING",
  "azure.storage.container.name": "CONTAINER_NAME",
  "file.name.template": "{{topic}}-{{timestamp}}.gz",
  "tasks.max": 1,
  "azure.blob.prefix": "data/logs/",
  "file.compression.type": "gzip",
  "input.format": "jsonl",
  "poll.interval.ms": 10000
}

```

Parameters:

- `name`: Name of the connector
- `connector.class`: Class name of the Azure Blob Storage source connector
- `azure.storage.connection.string`: Connection string for the Azure Storage account
- `azure.storage.container.name`: Name of the Azure blob container to read from
- `file.name.template`: Pattern used to match blob filenames, such as `{{topic}}-{{timestamp}}.gz`.

   Supported placeholders:
   - `{{topic}}`: Kafka topic name
   - `{{partition}}`: Partition number
   - `{{start_offset}}`: Starting Kafka offset
   - `{{timestamp}}`: Timestamp when the file is written
   Example: `{{topic}}-{{partition:padding=true}}-{{start_offset:padding=true}}.gz`

- `tasks.max`: Maximum number of parallel ingestion tasks
- `azure.blob.prefix`: Optional. Prefix path in the container to filter files
- `file.compression.type`: Optional. Compression type used in the files. Valid values
  are `none`, `gzip`, `snappy`, or `zstd`
- `input.format`: Optional. Format of the input files. Valid values are
  `bytes` (default), `avro`, `json`, or `parquet`
- `poll.interval.ms`: Optional. How often the connector checks for new blobs, in
  milliseconds. The default is `5000`

**Advanced options**

For advanced use cases, such as Avro or Parquet formats, byte buffering, or topic
overrides, you can customize the following settings:

- `schema.registry.url`: URL of the schema registry. Required when `input.format` is
  set to `avro` or `parquet`

  If the schema registry requires authentication, provide the following properties:

  ```json
  "basic.auth.credentials.source": "USER_INFO",
  "basic.auth.user.info": "username:password"
  ```

  The `basic.auth.user.info` value should contain your Schema Registry credentials in
  the format `username:password`.

- `value.serializer`: Serializer used for values with Avro input format
- `transformer.max.buffer.size`: Maximum size in bytes of each blob read when using
  the `bytes` input format with byte distribution
- `distribution.type`: File distribution strategy. Valid values are `hash` (default)
  or `partition`
- `errors.tolerance`: Whether to skip records with decoding or formatting errors. Set to
  `all` to prevent connector failure
- `topic`: Kafka topic to use if not specified in the file name template, or to
  override the topic defined in the template

For a complete list of configuration options, see the
[Azure Blob source connector configuration reference](https://aiven-open.github.io/cloud-storage-connectors-for-apache-kafka/azure-source-connector/AzureBlobSourceConfig.html).

:::caution
This file is auto-generated and may change when the connector is updated.
:::

## Create the connector

<Tabs groupId="setup-method">
<TabItem value="console" label="Console" default>

1. Access the [Aiven Console](https://console.aiven.io/).
1. Select your Aiven for Apache Kafka or Aiven for Apache Kafka Connect service.
1. Click <ConsoleLabel name="Connectors"/>.
1. Click **Create connector** if Apache Kafka Connect is enabled on the service.
   If not, click **Enable connector on this service**.

   Alternatively, to enable connectors:

   1. Click <ConsoleLabel name="Service settings"/> in the sidebar.
   1. In the **Service management** section, click
      <ConsoleLabel name="Actions"/> > **Enable Kafka connect**.

1. In the source connectors list, select **Azure Blob source connector**, and click
   **Get started**.
1. On the **Azure Blob Source Connector** page, go to the **Common** tab.
1. Locate the **Connector configuration** text box and click <ConsoleLabel name="edit"/>.
1. Paste the configuration from your `azure_blob_source_config.json` file into the text
   box.
1. Click **Create connector**.
1. Verify the connector status on the <ConsoleLabel name="Connectors"/> page.

</TabItem>
<TabItem value="cli" label="CLI">

To create the Azure Blob Storage source connector using the Aiven CLI, run:

```bash
avn service connector create SERVICE_NAME @azure_blob_source_config.json
```

Replace:

- `SERVICE_NAME`: Name of your Apache Kafka or Apache Kafka Connect service.
- `@azure_blob_source_config.json`: Path to your JSON configuration file.

</TabItem>
<TabItem value="terraform" label="Terraform">

You can configure this connector using
the [`aiven_kafka_connector`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/kafka_connector#example-usage)
resource in the Aiven Terraform Provider.

Use the `config` block to define the connector settings as key-value pairs.

</TabItem>
</Tabs>

## Example: Define and create an Azure Blob Storage source connector

This example creates an Azure Blob Storage source connector with the following settings:

- Connector name: `azure_blob_source`
- Apache Kafka topic: `blob-ingest-topic`
- Azure Storage connection string: `CONNECTION_STRING`
- Azure container: `CONTAINER_NAME`
- File prefix: `data/logs/`
- File name template: `{{topic}}-{{timestamp}}.gz`
- Input format: `json`
- Compression type: `gzip`
- Poll interval: `10 seconds`

```json
{
  "name": "azure_blob_source",
  "connector.class": "io.aiven.kafka.connect.azure.source.AzureBlobSourceConnector",
  "tasks.max": 1,
  "kafka.topic": "blob-ingest-topic",
  "azure.storage.connection.string": "CONNECTION_STRING",
  "azure.storage.container.name": "CONTAINER_NAME",
  "azure.blob.prefix": "data/logs/",
  "file.name.template": "{{topic}}-{{timestamp}}.gz",
  "file.compression.type": "gzip",
  "input.format": "json",
  "poll.interval.ms": 10000
}

```

## Disaster recovery

To use the Azure Blob Storage source connector for disaster recovery:

1. On your primary Aiven for Apache Kafka service (or a dedicated Aiven for Apache Kafka
   Connect service), configure an
   [Azure Blob sink connector](/docs/products/kafka/kafka-connect/howto/azure-blob-sink)
   to write data to Azure Blob Storage.
1. On your secondary Apache Kafka service, configure an Azure Blob source
   connector to restore data from the same Azure container.

### Configuration requirements

The source and sink connectors should use the same settings to ensure successful recovery:

- **File naming**: Use the same `file.name.template` in both sink and source connectors
  for compatibility.
  - For source connectors, a recommended format
    is `{{topic}}-{{timestamp:padding=true}}.gz`.
  - For sink connectors, formats like
    `{{topic}}-{{partition:padding=true}}-{{start_offset:padding=true}}.gz` are more
    common. This format may not suit source connectors, as it can make file matching
    harder.
- **Format**: Use the same `input.format`. If using Avro or Parquet, make sure
  schema-related settings match.
- **Compression**: Use the same compression method.

Using different settings can cause the source connector to skip files, fail to decode
content, or ingest records with incorrect topic, partition, or offset information.

:::note
The source connector uses Apache Kafka Connect offset tracking. If it restarts before
committing offsets, it may reprocess previously ingested files. Design downstream
systems to tolerate duplicates or implement idempotent processing.
:::
