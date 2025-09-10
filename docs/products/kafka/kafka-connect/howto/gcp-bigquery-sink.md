---
title: Create a sink connector from Apache Kafka® to Google BigQuery
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";

Set up the [BigQuery sink connector](https://github.com/Aiven-Open/bigquery-connector-for-apache-kafka) to move data from Aiven for Apache Kafka® into BigQuery tables for analysis and storage.

See the
[full list of parameters](https://aiven-open.github.io/bigquery-connector-for-apache-kafka/configuration.html)
in the GitHub documentation.

## Prerequisites

- An Aiven for Apache Kafka service with
  [Apache Kafka Connect enabled](/docs/products/kafka/kafka-connect/howto/enable-connect),
  or a [dedicated Kafka Connect cluster](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster)
- A Google Cloud project with:
  - A [service account and JSON service key](https://cloud.google.com/docs/authentication/client-libraries)
  - BigQuery API enabled
  - A [BigQuery dataset](https://cloud.google.com/bigquery/docs/datasets) to store data
  - Dataset access granted to the service account

Collect the following details:

- `GOOGLE_CLOUD_PROJECT_NAME`: Target Google Cloud project name
- `GOOGLE_CLOUD_SERVICE_KEY`: Google Cloud service account key in JSON format

  :::warning
  When adding the service key to the connector configuration, provide it as an escaped
  string:
  - Escape all `"` characters as `\"`
  - Escape any `\n` in the `private_key` field as `\\n`

  Example:
  `{\"type\": \"service_account\",\"project_id\": \"XXXXXX\", ...}`
  :::

<<<<<<< HEAD
- `BIGQUERY_DATASET_NAME`: BigQuery dataset name
- `TOPIC_LIST`: Comma-separated list of Kafka topics to sink
- Only if using Avro: Schema Registry connection details:
  - `APACHE_KAFKA_HOST`
  - `SCHEMA_REGISTRY_PORT`
  - `SCHEMA_REGISTRY_USER`
  - `SCHEMA_REGISTRY_PASSWORD`
=======
::: important
The following items are only valid when `deleteEnabled` or `upsertEnabled` is true
- intermediateTableSuffix
- kafkaKeyFieldName -- this item is required for `deleteEnabled` or `upsertEnabled`
- mergeIntervalMs
  :::

### Define a Kafka Connect configuration file

This example creates a BigQuery connector that uses GCS to write to BigQuery
Define the connector configurations in a file (we'll refer to it with
the name `bigquery_sink.json`) with the following content:

```json
{
    "name":"CONNECTOR_NAME",
    "connector.class": "com.wepay.kafka.connect.bigquery.BigQuerySinkConnector",
    "topics": "TOPIC_LIST",
    "project": "GCP_PROJECT_NAME",
    "defaultDataset": ".*=BIGQUERY_DATASET_NAME",
    "schemaRetriever": "com.wepay.kafka.connect.bigquery.retrieve.IdentitySchemaRetriever",
    "schemaRegistryClient.basic.auth.credentials.source": "URL",
    "schemaRegistryLocation":"https://SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD@APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT",
    "key.converter": "io.confluent.connect.avro.AvroConverter",
    "key.converter.schema.registry.url": "https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT",
    "key.converter.basic.auth.credentials.source": "USER_INFO",
    "key.converter.schema.registry.basic.auth.user.info": "SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD",
    "value.converter": "io.confluent.connect.avro.AvroConverter",
    "value.converter.schema.registry.url": "https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT",
    "value.converter.basic.auth.credentials.source": "USER_INFO",
    "value.converter.schema.registry.basic.auth.user.info": "SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD",
    "autoCreateTables": "true",
    "keySource": "JSON",
    "keyfile": "GCP_SERVICE_KEY"
}
```

The configuration file contains the following entries:

-   `name`: the connector name

-   `project`: the GCP project name where the target Google BigQuery is
    located.

-   `defaultDataset`: the target BigQuery dataset name, prefixed with
    `.*=`.

-   `schemaRegistryLocation`: details of the connection to Karapace
    offering the schema registry functionality, only needed when the
    source data is in Avro format.

-   `key.converter` and `value.converter`: define the message data
    format in the Apache Kafka topic. The
    `io.confluent.connect.avro.AvroConverter` converter translates
    messages from the Avro format. To retrieve the message schema we use
    Aiven's [Karapace schema
    registry](https://github.com/aiven/karapace), as specified by the
    `schema.registry.url` parameter and related credentials.

    :::note
    The `key.converter` and `value.converter` sections are only needed
    when the source data is in Avro format. If omitted the messages will
    be read as binary format.

    When using Avro as source data format, set following
    parameters:

    -   `value.converter.schema.registry.url`: pointing to the Aiven for
        Apache Kafka schema registry URL in the form of
        `https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT` with the
        `APACHE_KAFKA_HOST` and `SCHEMA_REGISTRY_PORT` parameters
        [retrieved in the previous step](/docs/products/kafka/kafka-connect/howto/gcp-bigquery-sink#connect_bigquery_sink_prereq).
    -   `value.converter.basic.auth.credentials.source`: to the value
        `USER_INFO`, since you're going to login to the schema registry
        using username and password.
    -   `value.converter.schema.registry.basic.auth.user.info`: passing
        the required schema registry credentials in the form of
        `SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD` with the
        `SCHEMA_REGISTRY_USER` and `SCHEMA_REGISTRY_PASSWORD` parameters
        [retrieved in the previous step](/docs/products/kafka/kafka-connect/howto/elasticsearch-sink#connect_elasticsearch_sink_prereq).
    :::

-   `autoCreateTables`: enables the auto creation of the target BigQuery
    tables if they do not yet exist.

-   `allBQFieldsNullable`: sets any created column of produced BigQuery
    schema as NULLABLE instead of REQUIRED (even from Avro fields
    defined as non-nullable).

    :::note
    Additional configuration parameters enable the BigQuery sink
    connector to automatically evolve tables in response to new incoming
    messages from the source topic. Specifically, these parameters
    provide the following functionalities: :

    -   `allowNewBigQueryFields`: new fields can be added to BigQuery
        tables during subsequent schema updates.
    -   `allowBigQueryRequiredFieldRelaxation`: fields in BigQuery
        schema can be changed back from REQUIRED to NULLABLE.
    :::

    :::warning
    When the connector automatically performs subsequent schema changes
    on tables, columns, and data type definitions, it reduces the
    control database users have over these changes. This can lead to
    unexpected errors, particularly if message evolution exceeds the
    compatibility limits of BigQuery and its associated applications.
    :::

-   `keySource`: defines the format of the GCP key, the value should be
    `JSON` if the key is generated in JSON format

-   `keyfile`: contains the GCP service account key, correctly escaped
    as defined in the
    [prerequisite phase](/docs/products/kafka/kafka-connect/howto/gcp-bigquery-sink#connect_bigquery_sink_prereq)


The [full list of parameters](https://aiven-open.github.io/bigquery-connector-for-apache-kafka/configuration.html) is
available on the [GitHub documentation site](https://aiven-open.github.io/bigquery-connector-for-apache-kafka).

### Create a Kafka Connect connector with the Aiven Console

To create a Kafka Connect connector:

1.  Log in to the [Aiven Console](https://console.aiven.io/) and select
    the Aiven for Apache Kafka® or Aiven for Apache Kafka Connect®
    service where the connector needs to be defined.

2.  Select **Connectors** from the left sidebar.

3.  Select **Create New Connector**, it is enabled only for
    services
    [with Kafka Connect enabled](enable-connect).

4.  Select **Google BigQuery Sink**.

5.  In the **Common** tab, locate the **Connector configuration** text
    box and select on **Edit**.

6.  Paste the connector configuration (stored in the
    `bigquery_sink.json` file) in the form.

7.  Select **Apply**.

    :::note
    The Aiven Console parses the configuration file and fills the
    relevant UI fields. You can review the UI fields across the various
    tabs and change them if necessary. The changes will be reflected in
    JSON format in the **Connector configuration** text box.
    :::

8.  After all the settings are correctly configured, select **Create
    connector**.

9.  Verify the connector status under the **Connectors** screen.

10. Verify the presence of the data in the target BigQuery dataset, the
    table name is equal to the Apache Kafka topic name. To
    change the target table name, you can do so using the Kafka Connect
    `RegexRouter` transformation.

    :::note
    You can also create connectors using the
    [Aiven CLI command](/docs/tools/cli/service/connector).
    :::

## Example: Create a Google BigQuery sink connector on a topic with a JSON schema

You have a topic named `iot_measurements` containing data in JSON
format, with a defined JSON schema:

```json
{
    "schema": {
        "type":"struct",
        "fields":[{
            "type":"int64",
            "optional": false,
            "field": "iot_id"
            },{
            "type":"string",
            "optional": false,
            "field": "metric"
            },{
            "type":"int32",
            "optional": false,
            "field": "measurement"
            }]
    },
    "payload":{ "iot_id":1, "metric":"Temperature", "measurement":14}
}
{
    "schema": {
        "type":"struct",
        "fields":[{
            "type":"int64",
            "optional": false,
            "field": "iot_id"
            },{
            "type":"string",
            "optional": false,
            "field": "metric"
            },{
            "type":"int32",
            "optional": false,
            "field": "measurement"
            }]
    },
    "payload":{"iot_id":2, "metric":"Humidity", "measurement":60}
}
```
>>>>>>> 50c24ab3 (adjusted url for new documentation site)

:::note
Schema Registry connection details are available in the <ConsoleLabel name="overview"/>
page of your Kafka service, under **Connection information**, in the **Schema Registry**
tab.
Aiven uses [Karapace](https://github.com/aiven/karapace) as the Schema Registry.
:::

## Configure Google Cloud

1. **Create a service account and generate a JSON key:**
   In the [Google Cloud Console](https://console.cloud.google.com/), create a service account and
   generate a JSON key.
   See [Google’s guide](https://cloud.google.com/docs/authentication/client-libraries)
   for details. You’ll use this key in the connector configuration.

1. **Enable the BigQuery API:**
   In the [API & Services dashboard](https://console.cloud.google.com/apis), enable
   the **BigQuery API** if it isn’t already. See
   [Google’s reference](https://cloud.google.com/bigquery/docs/reference/rest) for details.

1. **Create a BigQuery dataset:**
   In the [BigQuery Console](https://console.cloud.google.com/bigquery), create a
   dataset or use an existing one. See
   [Google’s guide](https://cloud.google.com/bigquery/docs/datasets).
   Select a region close to your Kafka service to reduce latency.

1. **Grant dataset access to the service account:**
   In the BigQuery Console, grant your service account the **BigQuery Data Editor**
   role on the dataset. See
   [Google’s access control guide](https://cloud.google.com/bigquery/docs/dataset-access-controls).

## Create a BigQuery sink connector configuration

Define the connector configuration in a JSON file, for example `bigquery_sink.json`.

```json
{
  "name": "CONNECTOR_NAME",
  "connector.class": "com.wepay.kafka.connect.bigquery.BigQuerySinkConnector",
  "topics": "TOPIC_LIST",
  "project": "GOOGLE_CLOUD_PROJECT_NAME",
  "defaultDataset": ".*=BIGQUERY_DATASET_NAME",
  "schemaRetriever": "com.wepay.kafka.connect.bigquery.retrieve.IdentitySchemaRetriever",
  "schemaRegistryClient.basic.auth.credentials.source": "URL",
  "schemaRegistryLocation": "https://SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD@APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT",
  "key.converter": "io.confluent.connect.avro.AvroConverter",
  "key.converter.schema.registry.url": "https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT",
  "key.converter.basic.auth.credentials.source": "USER_INFO",
  "key.converter.schema.registry.basic.auth.user.info": "SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD",
  "value.converter": "io.confluent.connect.avro.AvroConverter",
  "value.converter.schema.registry.url": "https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT",
  "value.converter.basic.auth.credentials.source": "USER_INFO",
  "value.converter.schema.registry.basic.auth.user.info": "SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD",
  "autoCreateTables": "true",
  "allBQFieldsNullable": "true",
  "keySource": "JSON",
  "keyfile": "GOOGLE_CLOUD_SERVICE_KEY"
}
```

The configuration file includes:

- `name`: Connector name
- `connector.class`: Must be `com.wepay.kafka.connect.bigquery.BigQuerySinkConnector`
- `topics`: Comma-separated list of Kafka topics to write to BigQuery
- `project`: Target Google Cloud project name
- `defaultDataset`: BigQuery dataset name, prefixed with `.*=`

If your messages are in Avro format, also set these parameters:

- `schemaRegistryLocation`: Karapace schema registry endpoint
- `key.converter` and `value.converter`: Set to `io.confluent.connect.avro.AvroConverter`
  for Avro
- `key.converter.schema.registry.url` and `value.converter.schema.registry.url`: Schema
  registry URL (`https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT`)
- `key.converter.schema.registry.basic.auth.user.info` and
  `value.converter.schema.registry.basic.auth.user.info`: Schema registry credentials in
  the format `SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD`

For table management, you can set:

- `autoCreateTables`: Create target BigQuery tables automatically if they do not exist
- `allBQFieldsNullable`: Set new BigQuery fields to `NULLABLE` instead of `REQUIRED`

For schema evolution, you can also set:

- `allowNewBigQueryFields`: Add new fields from Kafka schemas to BigQuery tables
- `allowBigQueryRequiredFieldRelaxation`: Relax `REQUIRED` fields back to `NULLABLE`

:::warning
Automatic schema evolution reduces control over table definitions and may cause errors
if message schemas change in ways BigQuery cannot support.
:::

For authentication, set:

- `keySource`: Format of the Google Cloud service account key, set to `JSON`
- `keyfile`: Google Cloud service account key as an escaped string

## Create a BigQuery sink connector

<Tabs groupId="setup-method">

<TabItem value="console" label="Aiven Console" default>

1. Go to the [Aiven Console](https://console.aiven.io/).
1. Select your Aiven for Apache Kafka® or Kafka Connect service.
1. Click <ConsoleLabel name="Connectors"/>.
1. Click **Create connector** (enable Kafka Connect if required).
1. Select **Google BigQuery Sink** from the list.
1. On the **Common** tab, click <ConsoleLabel name="edit"/> in the
  **Connector configuration** box.
1. Paste the contents of `bigquery_sink.json`. Replace placeholders with actual values.
1. Click **Apply**, then **Create connector**.
1. Verify the connector status on the <ConsoleLabel name="Connectors"/> page.
1. Check that data appears in the BigQuery dataset. By default, table names match topic
   names. Use the Kafka Connect `RegexRouter` transformation to rename tables if required.

</TabItem>

<TabItem value="cli" label="Aiven CLI">

Run the following command to create the connector:

```bash
avn service connector create SERVICE_NAME @bigquery_sink.json
```

Parameters:

- `SERVICE_NAME`: Name of your Aiven for Apache Kafka service
- `@bigquery_sink.json`: Path to the connector configuration file

</TabItem>

</Tabs>

## Examples

### Sink a JSON topic

Suppose you have a topic `iot_measurements` containing JSON messages with an inline schema:

```json
{
  "schema": {
    "type": "struct",
    "fields": [
      { "type": "int64", "field": "iot_id" },
      { "type": "string", "field": "metric" },
      { "type": "int32", "field": "measurement" }
    ]
  },
  "payload": { "iot_id": 1, "metric": "Temperature", "measurement": 14 }
}
```

Connector configuration:

```json
{
  "name": "iot_sink",
  "connector.class": "com.wepay.kafka.connect.bigquery.BigQuerySinkConnector",
  "topics": "iot_measurements",
  "project": "GOOGLE_CLOUD_PROJECT_NAME",
  "defaultDataset": ".*=BIGQUERY_DATASET_NAME",
  "value.converter": "org.apache.kafka.connect.json.JsonConverter",
  "autoCreateTables": "true",
  "keySource": "JSON",
  "keyfile": "GOOGLE_CLOUD_SERVICE_KEY"
}
```

- `topics`: Source topic
- `value.converter`: JSON converter without schema

:::note
Inline JSON schemas increase message size and add processing overhead.
For efficiency, prefer Avro format with Karapace Schema Registry.
:::

### Sink an Avro topic

Suppose you have a topic `students` with messages in Avro format and schemas stored in Karapace.

Connector configuration:

```json
{
  "name": "students_sink",
  "connector.class": "com.wepay.kafka.connect.bigquery.BigQuerySinkConnector",
  "topics": "students",
  "project": "GOOGLE_CLOUD_PROJECT_NAME",
  "defaultDataset": ".*=BIGQUERY_DATASET_NAME",
  "schemaRetriever": "com.wepay.kafka.connect.bigquery.retrieve.IdentitySchemaRetriever",
  "schemaRegistryLocation": "https://SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD@APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT",
  "key.converter": "io.confluent.connect.avro.AvroConverter",
  "key.converter.schema.registry.url": "https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT",
  "key.converter.basic.auth.credentials.source": "USER_INFO",
  "key.converter.schema.registry.basic.auth.user.info": "SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD",
  "value.converter": "io.confluent.connect.avro.AvroConverter",
  "value.converter.schema.registry.url": "https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT",
  "value.converter.basic.auth.credentials.source": "USER_INFO",
  "value.converter.schema.registry.basic.auth.user.info": "SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD",
  "autoCreateTables": "true",
  "keySource": "JSON",
  "keyfile": "GOOGLE_CLOUD_SERVICE_KEY"
}
```

- `topics`: Source topic
- `key.converter` and `value.converter`: Enable Avro parsing with Karapace schema registry
