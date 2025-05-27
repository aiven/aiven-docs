---
title: Create an Azure Blob Storage source connector for Aiven for Apache Kafka®
sidebar_label: Azure Blob source connector
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";

The Azure Blob Storage source connector allows you to ingest data from Azure Blob Storage containers into Apache Kafka® topics for real-time processing, analytics, or disaster recovery.

## Prerequisites

- An [Aiven for Apache Kafka® service](/docs/products/kafka/kafka-connect/howto/enable-connect)
  with Apache Kafka Connect enabled, or a
  [dedicated Aiven for Apache Kafka Connect® service](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).
- An Azure Storage container with data to stream into an Apache Kafka topic.
- Authentication credentials using one of the following methods:
  - Shared Access Signature (SAS) token: `azblob.sas.token`
  - Storage account key: `azure.storage.connection.string`

  :::note
  Use either `azblob.sas.token` or `azure.storage.connection.string`, not both. If both
  are provided, the SAS token is used.
  :::

- Azure Blob Storage details:
  - `azure.storage.container.name`: Name of the container to read from.
  - Optional: `azure.blob.prefix` or `file.name.prefix` to filter files.
- A target Apache Kafka topic that exists before you create the connector.

## Supported input formats

Specify the input format of your files using the `format.class` parameter:

| Format    | Description                                | Configuration               |
| --------- | ------------------------------------------ | --------------------------- |
| `csv`     | Flat structure with comma-separated values | `format.class=csv`     |
| `jsonl`   | One JSON object per line                   | `format.class=jsonl`   |
| `json`    | JSON array of objects                      | `format.class=json`    |
| `avro`    | Avro Object Container File                 | `format.class=avro`    |
| `parquet` | Apache Parquet columnar format             | `format.class=parquet` |

## Create an Azure Blob Storage source connector configuration file

Create a file named `azure_blob_source_config.json` with the following configuration:

```json
{
  "name": "azure-blob-source",
  "connector.class": "io.aiven.connect.azure.blob.storage.source.AzureBlobStorageSourceConnector",
  "azure.storage.connection.string": "your-connection-string",
  "azure.storage.container.name": "your-container",
  "azure.blob.prefix": "data/logs/",
  "format.class": "json",
  "kafka.topic": "blob-ingest-topic",
  "format.output.fields": "key,value,offset,timestamp",
  "file.name.prefix": "data/logs/",
  "file.compression.type": "gzip",
  "tasks.max": 1,
  "poll.interval.ms": 10000
}
```

Parameters:

- `name`: Name of the connector.
- `connector.class`: Connector class for Azure Blob Storage source.
- `azure.storage.connection.string`: Azure Storage connection string.
- `azure.storage.container.name`: Name of the blob container.
- `azure.blob.prefix` (optional): Filters files by prefix path.
- `format.class`: Format of the input files (see supported formats above).
- `kafka.topic`: Target Apache Kafka topic.
- `format.output.fields`: Fields to include in the Kafka record.
- `file.name.prefix` (optional): Prefix pattern to match blob filenames.
- `file.compression.type` (optional): Set to `gzip` for compressed files.
- `tasks.max`: Number of parallel ingestion tasks.
- `poll.interval.ms`: How often the connector checks for new blobs (in milliseconds)

For advanced settings and additional configuration options, see the
[Azure Blob source connector reference](https://aiven-open.github.io/cloud-storage-connectors-for-apache-kafka/azure-source-connector/index.html).

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

</TabItem> </Tabs>

## Example: Define and create an Azure Blob Storage source connector

This example creates an Azure Blob Storage source connector with the following settings:

- Connector name: `azure_blob_source`
- Apache Kafka topic: `blob-ingest-topic`
- Azure Storage connection string: `your-connection-string`
- Azure container: `my-container`
- File prefix: `data/logs/`
- Input format: `json`
- Output fields: `key, value, offset, timestamp`
- Compression type: `gzip`
- Poll interval: `10 seconds`

```json
{
  "name": "azure_blob_source",
  "connector.class": "io.aiven.connect.azure.blob.storage.source.AzureBlobStorageSourceConnector",
  "tasks.max": 1,
  "kafka.topic": "blob-ingest-topic",
  "azure.storage.connection.string": "your-connection-string",
  "azure.storage.container.name": "my-container",
  "azure.blob.prefix": "data/logs/",
  "file.name.prefix": "data/logs/",
  "format.class": "json",
  "format.output.fields": "key,value,offset,timestamp",
  "file.compression.type": "gzip",
  "poll.interval.ms": 10000
}
```

## Disaster recovery

To use the Azure Blob Storage source connector for disaster recovery:

1. Configure an [Azure Blob sink connector](/docs/products/kafka/kafka-connect/howto/azure-blob-sink)
   on your primary Aiven for Apache Kafka service or a dedicated Aiven for Apache Kafka
   Connect service to write Kafka messages to Azure Blob Storage.
1. Configure an Azure Blob source connector using your DR Aiven for Apache Kafka service
   (with Apache Kafka Connect enabled) or a dedicated Aiven for Apache Kafka Connect
   service to restore those messages from the same storage container.

### Configuration requirements

Both connectors must use identical settings:

- File naming: Same `file.name.template`, such
  as `{{topic}}-{{partition:padding=true}}-{{start_offset:padding=true}}.gz`
- Format: Same `format.class`, `format.output.fields`, and envelope settings if used
- Compression: Same compression method

Mismatched settings can cause the source connector to skip files, fail to
deserialize the data, or restore records with incorrect topic, partition, or
offset values.

:::note
The source connector uses Apache Kafka Connect offset tracking. If it restarts before
committing offsets, it may reprocess previously ingested files. Design downstream
systems to tolerate duplicates or implement idempotent processing.
:::
