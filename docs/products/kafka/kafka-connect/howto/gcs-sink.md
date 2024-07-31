---
title: Create a sink connector from Apache Kafka® to Google Cloud Storage
---

The Apache Kafka Connect® Google Cloud Storage (GCS) sink connector by Aiven enables you to move data from an Aiven for Apache Kafka® cluster to a Google Cloud Storage bucket for long term storage.

The full connector documentation is available in the dedicated
[GitHub repository](https://github.com/aiven/gcs-connector-for-apache-kafka).

:::note
See the full set of available parameters and configuration
options in the [connector's
documentation](https://github.com/aiven/aiven-kafka-connect-gcs).
:::

## Prerequisites

- An Aiven for Apache Kafka® service
[with Apache Kafka Connect enabled](enable-connect) or a
[dedicated Aiven for Apache Kafka Connect cluster](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).

- [Prepare the GCP account and GCS sink](gcs-sink-prereq) and collect the following information about the target GCS
  bucket:

  -   `GCS_NAME`: The name of the GCS bucket
  -   `GCS_CREDENTIALS`: The Google service account JSON service key
      [created during the prerequisite phase](/docs/products/kafka/kafka-connect/howto/gcs-sink-prereq#gcs-sink-connector-google-account)

:::warning
The GCS sink connector accepts the `GCS_CREDENTIALS` JSON service key as
string, therefore all `"` symbols within it must be escaped `\"`.

The `GCS_CREDENTIALS` parameter should be in the format
`{\"type\": \"service_account\",\"project_id\": \"XXXXXX\", ...}`

Additionally, any `\n` symbols contained in the `private_key` field need
to be escaped (by substituting with `\\n`)
:::

## Setup an GCS sink connector with Aiven Console

The following example demonstrates how to setup an Apache Kafka Connect®
GCS sink connector using the [Aiven Console](https://console.aiven.io/).

### Define an Apache Kafka Connect® configuration file

Define the connector configurations in a file (we'll refer to it with
the name `gcs_sink.json`) with the following content:

```json
{
    "name": "my-gcs-connector",
    "connector.class": "io.aiven.kafka.connect.gcs.GcsSinkConnector",
    "tasks.max": "1",
    "key.converter": "org.apache.kafka.connect.storage.StringConverter",
    "value.converter": "org.apache.kafka.connect.json.JsonConverter",
    "topics": "TOPIC_NAME",
    "gcs.credentials.json": "GCS_CREDENTIALS",
    "gcs.bucket.name": "GCS_NAME",
    "file.name.prefix": "my-custom-prefix/",
    "file.compression.type": "gzip",
    "format.output.type": "jsonl",
    "format.output.fields": "value,offset"
}
```

The configuration file contains the following entries:

-   `name`: The connector name
-   `topics`: The list of Apache Kafka® topics to sink to the GCS bucket
-   `key.converter` and `value.converter`: Data converters, depending on
    the topic data format. Check the [GitHub repository
    documentation](https://github.com/aiven/gcs-connector-for-apache-kafka)
    for more information
-   `gcs.credentials.json`: The Google service account JSON service key
    as JSON string
-   `gcs.bucket.name`: The name of the GCS bucket
-   `file.name.prefix`: The file name prefix
-   `file.compression.type`: The type of compression to use when
    creating the file
-   `format.output.type`: The format used to store the message values
-   `format.output.fields`: The message fields to be included in the
    target file

:::tip
You can define GCS sink connector naming and data formats by setting the
[dedicated parameters](/docs/products/kafka/kafka-connect/reference/gcs-sink-formats).
:::

See the [GitHub repository parameters
documentation](https://github.com/aiven/gcs-connector-for-apache-kafka)
for the full list of configuration options.

### Create a Kafka Connect connector with the Aiven Console

To create a Kafka Connect connector:

1.  Log in to the [Aiven Console](https://console.aiven.io/) and select
    the Aiven for Apache Kafka® or Aiven for Apache Kafka Connect®
    service where the connector needs to be defined.

2.  Select **Connectors** from the left sidebar.

3.  Select **Create New Connector**, it is enabled only for
    services
    [with Kafka Connect enabled](enable-connect).

4.  Select **Google Cloud Storage sink**.

5.  In the **Common** tab, locate the **Connector configuration** text
    box and select on **Edit**.

6.  Paste the connector configuration (stored in the `gcs_sink.json`
    file) in the form.

7.  Select **Apply**.

    :::note
    The Aiven Console parses the configuration file and fills the
    relevant UI fields. You can review the UI fields across the various
    tab and change them if necessary. The changes will be reflected in
    JSON format in the **Connector configuration** text box.
    :::

8.  After all the settings are correctly configured, select **Create
    connector**.

9.  Verify the connector status under the **Connectors** screen.

10. Verify the presence of the data in the target GCS bucket.

:::note
You can also create connectors using the
[Aiven CLI command](/docs/tools/cli/service/connector#avn_service_connector_create).
:::

## Example: define a GCS sink connector

The example creates an GCS sink connector with the following properties:

-   connector name: `my_gcs_sink`
-   source topics: `test`
-   target GCS bucket name: `my-test-bucket`
-   target Google service key:
    `{\"type\": \"service_account\",   \"project_id\": \XXXXXXXXX\", ..}`
-   name prefix: `my-custom-prefix/`
-   data compression: `gzip`
-   message data format: `jsonl`
-   fields to include in the message: `value, offset`
-   number of messages per file: 1

The connector configuration is the following:

```json
{
    "name": "my_gcs_sink",
    "connector.class": "io.aiven.kafka.connect.gcs.GcsSinkConnector",
    "key.converter": "org.apache.kafka.connect.storage.StringConverter",
    "value.converter": "org.apache.kafka.connect.json.JsonConverter",
    "topics": "test",
    "gcs.credentials.json": "{\"type\": \"service_account\",   \"project_id\": \XXXXXXXXX\", ..}",
    "gcs.bucket.name": "my-test-bucket",
    "file.name.prefix": "my-custom-prefix/",
    "file.compression.type": "gzip",
    "file.max.records": "1",
    "format.output.type": "jsonl",
    "format.output.fields": "value,offset"
}
```
