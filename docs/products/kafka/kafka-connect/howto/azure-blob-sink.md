---
title: Create an Azure Blob Storage sink connector for Aiven for Apache Kafka®
sidebar_label: Azure Blob sink connector
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";

The Azure Blob Storage sink connector moves data from Apache Kafka® topics to Azure Blob Storage containers for long-term storage, such as archiving or creating backups.

## Prerequisites

Before you begin, make sure you have:

- An
  [Aiven for Apache Kafka® service](https://docs.aiven.io/docs/products/kafka/kafka-connect/howto/enable-connect)
  with Kafka Connect enabled, or a
  [dedicated Aiven for Apache Kafka Connect® service](https://docs.aiven.io/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).
- Access to an Azure Storage account and a container with the following:
  - Azure Storage connection string: Required to authenticate and
    connect to your Azure Storage account.
  - Azure Storage container name: Name of the Azure Blob Storage container where data is
    saved.

## Create an Azure Blob Storage sink connector configuration file

Create a file named `azure_blob_sink_connector.json` with the following configuration:

```json
{
    "name": "azure_blob_sink",
    "connector.class": "io.aiven.kafka.connect.azure.sink.AzureBlobSinkConnector",
    "tasks.max": "1",
    "topics": "test-topic",
    "azure.storage.connection.string": "DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=mykey;EndpointSuffix=core.windows.net",
    "azure.storage.container.name": "my-container",
    "key.converter": "org.apache.kafka.connect.storage.StringConverter",
    "value.converter": "org.apache.kafka.connect.storage.StringConverter",
    "header.converter": "org.apache.kafka.connect.storage.StringConverter",
    "file.name.prefix": "connect-azure-blob-sink/test-run/",
    "file.compression.type": "gzip",
    "format.output.fields": "key,value,offset,timestamp",
    "reload.action": "restart"
}
```

Parameters:

- `name`: Name of the connector.
- `topics`: Apache Kafka topics to sink data from.
- `azure.storage.connection.string`: Azure Storage connection string.
- `azure.storage.container.name`: Azure Blob Storage container name.
- `key.converter`: Class used to convert the Apache Kafka record key.
- `value.converter`: Class used to convert the Apache Kafka record value.
- `header.converter`: Class used to convert message headers.
- `file.name.prefix`: Prefix for the files created in Azure Blob Storage.
- `file.compression.type`: Compression type for the files, such as `gzip`.
- `reload.action`: Action to take when reloading the connector, set to `restart`.

You can view the full set of available parameters and advanced configuration options
in the [Aiven Azure Blob Storage sink connector GitHub repository](https://github.com/Aiven-Open/cloud-storage-connectors-for-apache-kafka/blob/main/azure-sink-connector/README.md).

## Create the connector

<Tabs groupId="setup-method">
  <TabItem value="console" label="Aiven Console" default>

1. Access the [Aiven Console](https://console.aiven.io/).
1. Select your Aiven for Apache Kafka® or Aiven for Apache Kafka Connect® service.
1. Click <ConsoleLabel name="Connectors"/>.
1. Click **Create connector** if Kafka Connect is already enabled on the service.
   If not, click **Enable connector on this service**.

   Alternatively, to enable connectors:

   1. Click <ConsoleLabel name="Service settings"/> in the sidebar.
   1. In the **Service management** section, click
      <ConsoleLabel name="Actions"/> > **Enable Kafka connect**.

1. In the sink connectors, find **Azure Blob Storage sink**, and click **Get started**.
1. On the **Azure Blob Storage sink** connector page, go to the **Common** tab.
1. Locate the **Connector configuration** text box and click <ConsoleLabel name="edit"/>.
1. Paste the configuration from your `azure_blob_sink_connector.json` file into the
   text box.
1. Click **Create connector**.
1. Verify the connector status on the <ConsoleLabel name="Connectors"/> page.


</TabItem>

  <TabItem value="cli" label="Aiven CLI">

To create the Azure Blob Storage sink connector using the Aiven CLI, run:

```bash
avn service connector create SERVICE_NAME @azure_blob_sink_connector.json
```

Parameters:

- `SERVICE_NAME`: Name of your Aiven for Apache Kafka® service.
- `@azure_blob_sink_connector.json`: Path to your JSON configuration file.

</TabItem>
</Tabs>

## Example: Define and create an Azure Blob Storage sink connector

This example shows how to create an Azure Blob Storage sink connector with the following properties:

- Connector name: `azure_blob_sink`
- Apache Kafka topic: `test-topic`
- Azure Storage connection string: `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=mykey;EndpointSuffix=core.windows.net`
- Azure container: `my-container`
- Output fields: `key, value, offset, timestamp`
- File name prefix: `connect-azure-blob-sink/test-run/`
- Compression type: `gzip`

```json
{
    "name": "azure_blob_sink",
    "connector.class": "io.aiven.kafka.connect.azure.sink.AzureBlobSinkConnector",
    "tasks.max": "1",
    "topics": "test-topic",
    "azure.storage.connection.string": "DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=mykey;EndpointSuffix=core.windows.net",
    "azure.storage.container.name": "my-container",
    "format.output.fields": "key,value,offset,timestamp",
    "file.name.prefix": "connect-azure-blob-sink/test-run/",
    "file.compression.type": "gzip"
}
```

Once this configuration is saved in the `azure_blob_sink_connector.json` file, you can
create the connector using the Aiven Console or CLI, and verify that data from the
Apache Kafka topic `test-topic` is successfully delivered to your Azure Blob
Storage container.
