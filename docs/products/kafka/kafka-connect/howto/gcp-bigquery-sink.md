---
title: Create a sink connector from Apache Kafka® to Google BigQuery
sidebar_label: Google BigQuery sink connector
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import KafkaConnectGcpAuthRestrictions from "@site/static/includes/kafka-connect-gcp-auth-restrictions.md";

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

- `BIGQUERY_DATASET_NAME`: BigQuery dataset name
- `TOPIC_LIST`: Comma-separated list of Kafka topics to sink
- Only if using Avro: Schema Registry connection details:
  - `APACHE_KAFKA_HOST`
  - `SCHEMA_REGISTRY_PORT`
  - `SCHEMA_REGISTRY_USER`
  - `SCHEMA_REGISTRY_PASSWORD`

:::note
Schema Registry connection details are available in the <ConsoleLabel name="overview"/>
page of your Kafka service, under **Connection information**, in the **Schema Registry**
tab.
Aiven uses [Karapace](https://github.com/aiven/karapace) as the Schema Registry.
:::

<KafkaConnectGcpAuthRestrictions />

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

## Write methods

- **Google Cloud Storage (default):** Uses GCS as an intermediate step. Supports all
  features, including delete and upsert. Parameters used only with delete or upsert:
  - `intermediateTableSuffix`
  - `kafkaKeyFieldName` (required)
  - `mergeIntervalMs`

- **Storage Write API:** Streams data directly into BigQuery. Enable by
  setting `useStorageWriteApi` to `true`. This method provides lower latency for
  streaming workloads.
  Parameters used only with Storage Write API:
  - `bigQueryPartitionDecorator`
  - `commitInterval`
  - `enableBatchMode`

  :::warning
  Do not use the Storage Write API with `deleteEnabled` or `upsertEnabled`.
  :::

If `useStorageWriteApi` is not set, the connector uses the standard Google Cloud Storage
API by default.

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

:::note
To use the Storage Write API instead of the default GCS method, add
`"useStorageWriteApi": "true"` to the configuration.
:::

The configuration file includes:

- `name`: Connector name
- `connector.class`: Must be `com.wepay.kafka.connect.bigquery.BigQuerySinkConnector`
- `topics`: Comma-separated list of Kafka topics to write to BigQuery
- `project`: Target Google Cloud project name
- `defaultDataset`: BigQuery dataset name, prefixed with `.*=`

  :::note
  By default, table names in BigQuery match the Kafka topic names.
  Use the Kafka Connect `RegexRouter` transformation to rename tables if needed.
  :::

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

If multiple connector tasks or connector instances write to the same BigQuery table,
you can also set:

- `mediateConcurrentSchemaUpdates`: Retry failed schema updates and check whether another
  connector already applied the required schema change. Default: `false`
- `concurrentSchemaUpdateRetryWaitMs`: Time to wait before each retry attempt when
  `mediateConcurrentSchemaUpdates` is enabled, in milliseconds. Allowed range: `0` to
  `300000` (up to five minutes). Default: `10000`
- `concurrentSchemaUpdateMaxRetries`: Maximum number of retry attempts. Default: `3`

:::warning
Automatic schema evolution reduces control over table definitions and may cause errors
if message schemas change in ways BigQuery cannot support.
:::

:::note
Enable `mediateConcurrentSchemaUpdates` when multiple connector tasks or connector instances
write to the same BigQuery table and schema evolution is enabled. This setting helps recover
from concurrent schema update failures, but it does not remove BigQuery limits, including
limits on table metadata updates.
:::

For authentication, set:

- `keySource`: Format of the Google Cloud service account key, set to `JSON`
- `keyfile`: Google Cloud service account key as an escaped string

## Track write attempts for deduplication

To help downstream systems distinguish rows written by different Kafka Connect `put()` attempts,
enable write-attempt tracking.

Set both of the following:

```json
{
  "kafkaDataFieldName": "__kafka",
  "trackPutAttempts": "true"
}
```

When `trackPutAttempts` is enabled, the connector adds a `putAttemptId` field to the Kafka
metadata struct in each BigQuery row. The connector generates one ULID value for each
Kafka Connect `put()` call. If Kafka Connect retries the same records in a later `put()` call,
the retried rows get a different `putAttemptId`.

This setting does not prevent duplicate rows. Use `putAttemptId` with Kafka metadata,
such as topic, partition, and offset, to support downstream deduplication.

:::important
If you enable `trackPutAttempts` on an existing BigQuery table that already has a Kafka metadata
field, also set `allowNewBigQueryFields` to `true`. The connector must add `putAttemptId` as a
new nullable subfield in the existing metadata `RECORD` schema.
:::

## Create a BigQuery sink connector

<Tabs groupId="setup-method">

<TabItem value="console" label="Aiven Console" default>

1. Go to the [Aiven Console](https://console.aiven.io/).
1. Select your Aiven for Apache Kafka® or Kafka Connect service.
1. Click <ConsoleLabel name="manage stream" /> > **Connectors**.
1. Click **Create connector** (enable Kafka Connect if required).
1. Select **Google BigQuery Sink** from the list.
1. On the **Common** tab, click <ConsoleLabel name="edit"/> in the
  **Connector configuration** box.
1. Paste the contents of `bigquery_sink.json`. Replace placeholders with actual values.
1. Click **Apply**, then **Create connector**.
1. Verify the connector status on the <ConsoleLabel name="manage stream" /> > **Connectors** page.
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

The topic `iot_measurements` contains JSON messages with an inline schema:

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

Parameters:

- `topics`: Source topic
- `value.converter`: JSON converter without schema

:::note
Inline JSON schemas increase message size and add processing overhead.
For efficiency, prefer Avro format with Karapace Schema Registry.
:::

### Sink an Avro topic

The topic `students` contains messages in Avro format, with schemas stored in Karapace.

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

Parameters:

- `topics`: Source topic
- `key.converter` and `value.converter`: Enable Avro parsing with Karapace schema registry

### Sink an Avro topic using Storage Write API

To stream Avro messages directly into BigQuery with lower latency.

Connector configuration:

```json
{
  "name": "students_sink_write_api",
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
  "keyfile": "GOOGLE_CLOUD_SERVICE_KEY",
  "useStorageWriteApi": "true",
  "commitInterval": "1000"
}
```

Parameters:

- `useStorageWriteApi`: Enables direct streaming into BigQuery
- `commitInterval`: Flush interval for Storage Write API batches, in milliseconds

### Enable schema update retries

Use this configuration when multiple connector tasks or connector instances write to the same
BigQuery table and schema evolution is enabled.

```json
{
  "allowNewBigQueryFields": "true",
  "mediateConcurrentSchemaUpdates": "true",
  "concurrentSchemaUpdateRetryWaitMs": "10000",
  "concurrentSchemaUpdateMaxRetries": "3"
}
```

Parameters:

- `allowNewBigQueryFields`: Allows the connector to add new fields to BigQuery tables
- `mediateConcurrentSchemaUpdates`: Enables retry-and-reconcile handling for concurrent schema
  updates
- `concurrentSchemaUpdateRetryWaitMs`: Sets the wait time before each retry, in milliseconds
  (allowed range `0` to `300000`; default `10000`)
- `concurrentSchemaUpdateMaxRetries`: Sets the maximum number of retry attempts

### Track write attempts

Use this configuration to add write-attempt metadata to BigQuery rows for downstream
deduplication.

```json
{
  "kafkaDataFieldName": "__kafka",
  "trackPutAttempts": "true"
}
```

Parameters:

- `kafkaDataFieldName`: Adds Kafka metadata to BigQuery rows under the specified field name
- `trackPutAttempts`: Adds a ULID-based `putAttemptId` to the Kafka metadata struct for each
  `put()` call

If the BigQuery table already exists and has a Kafka metadata field, also set
`allowNewBigQueryFields` to `true`.
