---
title: Create a sink connector from Apache Kafka® to OpenSearch®
sidebar_label: OpenSearch® sink connector
---
import ConsoleLabel from "@site/src/components/ConsoleIcons"

The OpenSearch sink connector writes data from Aiven for Apache Kafka® to OpenSearch®.

## Prerequisites {#connect_opensearch_sink_prereq}

To set up an OpenSearch sink connector, you need an Aiven for Apache
Kafka service
[with Kafka Connect enabled](enable-connect) or a
[dedicated Aiven for Apache Kafka Connect cluster](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).

Collect the following information about the target OpenSearch service:

- `OS_CONNECTION_URL`: The OpenSearch connection URL, in the form of
  `https://HOST:PORT`
- `OS_USERNAME`: The OpenSearch username to connect
- `OS_PASSWORD`: The password for the username selected
- `TOPIC_LIST`: The comma-separated list of topics to sink

If the source data is in Avro format, also collect the following
information:

- `APACHE_KAFKA_HOST`: The hostname of the Apache Kafka service
- `SCHEMA_REGISTRY_PORT`: The Apache Kafka schema registry port
- `SCHEMA_REGISTRY_USER`: The Apache Kafka schema registry username
- `SCHEMA_REGISTRY_PASSWORD`: The password for the schema registry user

:::note
For Aiven for OpenSearch® and Aiven for Apache Kafka®, find these values
on the service <ConsoleLabel name="overview" /> page in the [Aiven
Console](https://console.aiven.io/). On Aiven for Apache Kafka®, Schema
Registry credentials are in the **Schema Registry** subtab. You can
also run `avn service get` with the
[Aiven CLI](/docs/tools/cli/service-cli#avn_service_get).

As of version 3.0, Aiven for Apache Kafka no longer supports Confluent
Schema Registry. For more information, see
[Karapace](/docs/products/kafka/karapace).
:::

## Setup an OpenSearch sink connector with Aiven Console

The following example demonstrates how to setup a OpenSearch sink
connector for Apache Kafka using the [Aiven
Console](https://console.aiven.io/).

### Define a Kafka Connect configuration file

Define the connector configuration in a file named `opensearch_sink.json`
with the following content:

```json
{
    "name":"CONNECTOR_NAME",
    "connector.class": "io.aiven.kafka.connect.opensearch.OpensearchSinkConnector",
    "topics": "TOPIC_LIST",
    "connection.url": "OS_CONNECTION_URL",
    "connection.username": "OS_USERNAME",
    "connection.password": "OS_PASSWORD",
    "type.name": "TYPE_NAME",
    "tasks.max":"1",
    "key.ignore": "true",
    "key.converter": "io.confluent.connect.avro.AvroConverter",
    "key.converter.schema.registry.url": "https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT",
    "key.converter.basic.auth.credentials.source": "USER_INFO",
    "key.converter.schema.registry.basic.auth.user.info": "SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD",
    "value.converter": "io.confluent.connect.avro.AvroConverter",
    "value.converter.schema.registry.url": "https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT",
    "value.converter.basic.auth.credentials.source": "USER_INFO",
    "value.converter.schema.registry.basic.auth.user.info": "SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD"
}
```

The configuration file contains the following entries:

- `name`: Name of the connector.
- `connection.url`, `connection.username`, `connection.password`:
  OpenSearch connection values from the
  [prerequisites](#connect_opensearch_sink_prereq).
- `type.name`: OpenSearch type name the connector uses when indexing.
- `key.ignore`: If `true`, the connector ignores the message key and
  sets the document ID to `topic+partition+offset`. Otherwise it uses
  the message key.
- `tasks.max`: Maximum number of tasks to run in parallel. The default
  is `1`.
- `key.converter` and `value.converter`: Define the message data format
  in the Apache Kafka topic. For Avro, use
  `io.confluent.connect.avro.AvroConverter`.
- `existing.resource.type` and `topic.to.existing.resource.mapping`:
  Optional properties that send records to an existing OpenSearch
  resource, such as an index alias, instead of an index named after the
  topic. Add them before you create the connector. For details, see
  [Write to an existing OpenSearch resource](#connect_opensearch_sink_existing_resource).

:::note
Include the `key.converter` and `value.converter` sections only when
the source data is in Avro format. If you omit them, Kafka Connect
reads the messages as binary. For Avro, the converter retrieves the
schema from [Karapace](https://github.com/aiven/karapace).

When the source data is Avro, set the following parameters:

- `value.converter.schema.registry.url`: Schema registry URL in the form
  `https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT`. Use the values from
  the [prerequisites](#connect_opensearch_sink_prereq).
- `value.converter.basic.auth.credentials.source`: Set to `USER_INFO` to
  log in with a username and password.
- `value.converter.schema.registry.basic.auth.user.info`: Schema registry
  credentials in the form `SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD`.
  Use the values from the [prerequisites](#connect_opensearch_sink_prereq).

:::

<!-- vale off -->
:::note
For the full set of connector parameters, see the [OpenSearch sink
connector configuration
options](https://github.com/aiven/opensearch-connector-for-apache-kafka/blob/main/docs/opensearch-sink-connector-config-options.rst).
:::
<!-- vale on -->

### Create a Kafka Connect connector with the Aiven Console

To create a Kafka Connect connector:

1. Log in to the [Aiven Console](https://console.aiven.io/) and select
   the Aiven for Apache Kafka® or Aiven for Apache Kafka Connect®
   service where the connector needs to be defined.
1. Click <ConsoleLabel name="manage stream" /> > **Connectors** from the left sidebar.
1. Select **Create New Connector**, it is enabled only for services
   [with Kafka Connect enabled](enable-connect).
1. Select **OpenSearch sink**.
1. In the **Common** tab, locate the **Connector configuration** text
   box and click on **Edit**.
1. Paste the connector configuration (stored in the
   `opensearch_sink.json` file) in the form.
1. Click **Apply**.

   :::note
   The Aiven Console parses the configuration file and fills the
   relevant UI fields. You can review the UI fields across the various
   tab and change them if necessary. The changes will be reflected in
   JSON format in the **Connector configuration** text box.
   :::

1. After all the settings are correctly configured, click **Create
   connector**.
1. Verify the connector status under <ConsoleLabel name="manage stream" /> > **Connectors**.
1. Verify that the data is available in the target OpenSearch resource.
   By default, the connector writes to an index based on the Apache
   Kafka topic name. In your Aiven for OpenSearch service, select
   <ConsoleLabel name="opensearchindexes" /> to view the index. If the
   configuration maps the topic to an existing resource, verify that
   resource instead. See
   [Write to an existing OpenSearch resource](#connect_opensearch_sink_existing_resource).

:::note
You can also create connectors using the
[Aiven CLI command](/docs/tools/cli/service/connector#avn_service_connector_create).
:::

## Write to an existing OpenSearch resource {#connect_opensearch_sink_existing_resource}

From connector version 3.2.0, you can write to an existing OpenSearch
resource. The connector does not create an index from the Kafka topic
name.

Writing to an existing resource is useful when you manage index rotation
with a write alias. You rotate daily or weekly indices behind a stable
alias.

Create the target resource in OpenSearch before you start the connector.
Then set the following properties in the connector configuration:

- `existing.resource.type`: The type of existing OpenSearch resource.
  To write to an index alias, set this to `index_alias`.
- `topic.to.existing.resource.mapping`: Maps Kafka topics to existing
  OpenSearch resources. Use the format `topic_name:resource_name`.
  Separate multiple mappings with commas.

```json
{
    "connection.url": "OS_CONNECTION_URL",
    "connection.username": "OS_USERNAME",
    "connection.password": "OS_PASSWORD",
    "existing.resource.type": "index_alias",
    "topic.to.existing.resource.mapping": "orders:orders_write_alias",
    "key.ignore": "true",
    "schema.ignore": "true"
}
```

This example maps the `orders` topic to the `orders_write_alias` alias.

For other `existing.resource.type` values, see the [connector
configuration
options](https://github.com/aiven/opensearch-connector-for-apache-kafka/blob/main/docs/opensearch-sink-connector-config-options.rst).

## Create daily OpenSearch indices

To write through a stable write alias, use an existing resource mapping.
To include the message date in the index name, use the `TimestampRouter`
transformation and create the indices first.

To store the Apache Kafka messages in a daily OpenSearch index, add the
following `TimestampRouter` transformation to the connector properties
file. The transformation defines the index name as the topic name
followed by the message date.

```json
"transforms": "TimestampRouter",
"transforms.TimestampRouter.topic.format": "${topic}-${timestamp}",
"transforms.TimestampRouter.timestamp.format": "yyyy-MM-dd",
"transforms.TimestampRouter.type": "org.apache.kafka.connect.transforms.TimestampRouter"
```

:::warning
The current version of the OpenSearch sink connector is not able to
automatically create daily indices in OpenSearch. Therefore
create the indices with the correct name before starting the sink
connector. You can create OpenSearch indices in many ways including
[CURL commands](/docs/products/opensearch/howto/opensearch-with-curl).
:::

## Create a sink connector for JSON with a schema

If you have a topic named `iot_measurements` that contains the following
JSON, including an embedded schema:

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
    "payload":{"iot_id":2, "metric":"Humidity", "measurement":60}}
}
```

:::note
Each message includes the JSON schema, which increases payload size. For
a smaller payload, use Avro with
[Karapace](/docs/products/kafka/karapace).
:::

You can sink the `iot_measurements` topic to OpenSearch with the
following connector configuration, after replacing `OS_CONNECTION_URL`,
`OS_USERNAME`, and `OS_PASSWORD`:

```json
{
    "name":"sink_iot_json_schema",
    "connector.class": "io.aiven.kafka.connect.opensearch.OpensearchSinkConnector",
    "topics": "iot_measurements",
    "connection.url": "OS_CONNECTION_URL",
    "connection.username": "OS_USERNAME",
    "connection.password": "OS_PASSWORD",
    "type.name": "iot_measurements",
    "tasks.max":"1",
    "key.ignore": "true",
    "value.converter": "org.apache.kafka.connect.json.JsonConverter"
}
```

The configuration file contains the following entries:

- `topics`: Set to `iot_measurements`.
- `value.converter`: JSON converter. The sample messages include an
  embedded schema, so leave schema support enabled.
- `key.ignore`: If `true`, the connector ignores the empty message key
  and sets the document ID to `topic+partition+offset`.

## Create a sink connector for schemaless JSON

If you have a topic named `students` that contains the following
schemaless JSON:

```text
Key: 1 Value: {"student_id":1, "student_name":"Carla"}
Key: 2 Value: {"student_id":2, "student_name":"Ugo"}
Key: 3 Value: {"student_id":3, "student_name":"Mary"}
```

You can sink the `students` topic to OpenSearch with the following
connector configuration, after replacing `OS_CONNECTION_URL`,
`OS_USERNAME`, and `OS_PASSWORD`:

```json
{
    "name":"sink_students_json",
    "connector.class": "io.aiven.kafka.connect.opensearch.OpensearchSinkConnector",
    "topics": "students",
    "connection.url": "OS_CONNECTION_URL",
    "connection.username": "OS_USERNAME",
    "connection.password": "OS_PASSWORD",
    "type.name": "students",
    "tasks.max":"1",
    "key.converter": "org.apache.kafka.connect.storage.StringConverter",
    "value.converter": "org.apache.kafka.connect.json.JsonConverter",
    "value.converter.schemas.enable": "false",
    "schema.ignore": "true"
}
```

The configuration file contains the following entries:

- `topics`: Set to `students`.
- `key.converter`: String converter for the message key.
- `value.converter`: JSON converter for the message value.
- `value.converter.schemas.enable`: Set to `false` when the value has no
  schema so the connector does not read a schema.
- `schema.ignore`: Set to `true` so the connector does not infer a
  schema before it writes to OpenSearch.

:::note
The connector sets the OpenSearch document ID to the message key.
:::
