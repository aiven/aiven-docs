---
title: Create a Google Cloud Storage sink connector for Apache Kafka®
sidebar_label: Google Cloud Storage sink connector
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";

The Google Cloud Storage (GCS) sink connector moves data from Aiven for Apache Kafka® topics to a Google Cloud Storage bucket for long-term storage.

## Prerequisites

- An Aiven for Apache Kafka® service with
  [Apache Kafka Connect enabled](/docs/products/kafka/kafka-connect/howto/enable-connect),
  or a [dedicated Kafka Connect cluster](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster)
- Access to a Google Cloud project where you can create:
  - a Google Cloud Storage bucket
  - a Google service account with a JSON service key
- Collect the following values for connector configuration:

  - `GCS_NAME`: The name of the target Google Cloud Storage bucket
  - `GCS_CREDENTIALS`: The Google service account JSON key

:::note
For a full list of configuration options, see the
[Google Cloud Storage sink connector documentation](https://github.com/aiven/gcs-connector-for-apache-kafka).
:::

:::warning
The connector expects `GCS_CREDENTIALS` as a single JSON string. Escape all `"` symbols
as `\"`.

Example:

`{\"type\":\"service_account\",\"project_id\":\"XXXXXX\",...}`

If the `private_key` field contains `\n`, escape it as `\\n`.
:::

## Configure Google Cloud for the connector {#configure-google-cloud-for-the-connector}

Create a Google Cloud Storage bucket and a Google service account key that the connector
can use to write objects.

### Create a Google Cloud Storage bucket {#gcs-sink-connector-google-bucket}

1. In the [Google Cloud console](https://console.cloud.google.com/), open
   **Cloud Storage**.
1. Create a bucket using the
   [Cloud Storage buckets page](https://console.cloud.google.com/storage/).
1. Specify the bucket name and location.
1. Keep the other settings as default unless your organization requires otherwise.

### Create a Google service account and JSON key {#gcs-sink-connector-google-account}

1. Create a Google service account and JSON service key by following
   [Google authentication instructions](https://cloud.google.com/docs/authentication/client-libraries).
1. Download the JSON service key.

You use this key in the connector configuration as `GCS_CREDENTIALS`.

### Grant the service account access to the bucket {#gcs-sink-connector-grant-permissions}

1. Open the bucket in the Cloud Storage console.
1. Go to the **Permissions** tab.
1. Grant access to the service account.

Ensure the following permissions are granted:

- `storage.objects.create`
- `storage.objects.delete` (required for overwriting, for example during re-processing)

Grant these permissions using a custom role or the standard
role **Storage Legacy Bucket Writer**.

Also ensure the bucket does not have a retention policy that prevents overwriting.

## Create the connector configuration

Create a JSON configuration file (for example, `gcs_sink.json`):

```json
{
  "name": "my-gcs-connector",
  "connector.class": "io.aiven.kafka.connect.gcs.GcsSinkConnector",
  "tasks.max": "1",
  "topics": "TOPIC_NAME",
  "key.converter": "org.apache.kafka.connect.storage.StringConverter",
  "value.converter": "org.apache.kafka.connect.json.JsonConverter",
  "gcs.credentials.json": "GCS_CREDENTIALS",
  "gcs.bucket.name": "GCS_NAME",
  "file.name.prefix": "my-custom-prefix/",
  "file.compression.type": "gzip",
  "format.output.type": "jsonl",
  "format.output.fields": "value,offset"
}
```

Parameters:

- `name`: The connector name
- `topics`: Comma-separated list of Apache Kafka® topics to sink to the bucket
- `key.converter` and `value.converter`: Message converters based on your topic format
- `gcs.credentials.json`: The Google service account JSON key as a JSON string
- `gcs.bucket.name`: The name of the target bucket
- `file.name.prefix`: Prefix for files created in the bucket
- `file.compression.type`: Compression type for output files
- `format.output.type`: Output file format
- `format.output.fields`: Message fields to include in output files

:::tip
You can control file naming and output formats using dedicated parameters. For details, see
[GCS sink formats](/docs/products/kafka/kafka-connect/reference/gcs-sink-formats).
:::

## Create a Google Cloud Storage sink connector

<Tabs groupId="setup-method">
<TabItem value="console" label="Aiven Console" default>

1. Access the [Aiven Console](https://console.aiven.io/).
1. Select your Aiven for Apache Kafka® or Aiven for Apache Kafka Connect® service.
1. In the sidebar, click <ConsoleLabel name="Connectors"/>.
1. Click **Create connector** if Apache Kafka Connect is already enabled on the service.
   If not, click **Enable connector on this service**.

   To enable connectors:
   1. In the sidebar, click <ConsoleLabel name="Service settings"/>.
   1. In the **Service management** section, click <ConsoleLabel name="Actions"/> >
      **Enable Kafka Connect**.
1. In the list of sink connectors, click **Get started** under **Google Cloud Storage sink**.
1. On the connector page, open the **Common** tab.
1. In **Connector configuration**, click <ConsoleLabel name="edit"/>.
1. Paste the configuration from your `gcs_sink.json` file into the text box. Replace
   placeholders with your actual values.
1. Click **Apply**.

   :::note
   When you paste the JSON configuration, Aiven Console parses it and automatically
   populates the corresponding fields in the UI. Any changes you make in the UI are
   reflected in the **Connector configuration** JSON.
   :::

1. Click **Create connector**.
1. Verify the connector status on the <ConsoleLabel name="Connectors"/> page.
1. Confirm that data from the Apache Kafka topics appears in the target bucket.

</TabItem>

<TabItem value="cli" label="Aiven CLI">

To create a GCS sink connector using the [Aiven CLI](/docs/tools/cli/service-cli), run:

```bash
avn service connector create SERVICE_NAME @gcs_sink.json
```

Parameters:

- `SERVICE_NAME`: The name of your Aiven for Apache Kafka® service
- `@gcs_sink.json`: The path to your connector configuration file

</TabItem>

</Tabs>

## Examples

### Create a GCS sink connector for a JSON topic

This example creates a connector with the following settings:

- Connector name: `my_gcs_sink`
- Source topic: `test`
- Bucket name: `my-test-bucket`
- Name prefix: `my-custom-prefix/`
- Compression: `gzip`
- Output format: `jsonl`
- Output fields: `value, offset`
- Maximum records per file: 1

```json
{
  "name": "my_gcs_sink",
  "connector.class": "io.aiven.kafka.connect.gcs.GcsSinkConnector",
  "topics": "test",
  "key.converter": "org.apache.kafka.connect.storage.StringConverter",
  "value.converter": "org.apache.kafka.connect.json.JsonConverter",
  "gcs.credentials.json": "{\"type\": \"service_account\", \"project_id\": \"XXXXXXXXX\", ...}",
  "gcs.bucket.name": "my-test-bucket",
  "file.name.prefix": "my-custom-prefix/",
  "file.compression.type": "gzip",
  "file.max.records": "1",
  "format.output.type": "jsonl",
  "format.output.fields": "value,offset"
}
```
