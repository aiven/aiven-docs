---
title: Create a sink connector from Apache Kafka® to Google BigQuery
---

The [Google BigQuery sink
connector](https://github.com/confluentinc/kafka-connect-bigquery)
enables you to move data from an Aiven for Apache Kafka® cluster to a
set of Google BigQuery tables for further processing and analysis.

:::note
You can check the full set of available parameters and configuration
options in the [connector's
documentation](https://github.com/confluentinc/kafka-connect-bigquery).
:::

## Prerequisites {#connect_bigquery_sink_prereq}

To setup an Google BigQuery sink connector, you need an Aiven for Apache
Kafka service
[with Kafka Connect enabled](enable-connect) or a
[dedicated Aiven for Apache Kafka Connect cluster](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).

Furthermore you need to follow the steps
[to prepare the GCP account](gcp-bigquery-sink-prereq) and collect the following information about the target
BigQuery upfront:

-   `GCP_PROJECT_NAME`: The GCP project name where the target Google
    BigQuery is located

-   `GCP_SERVICE_KEY`: A valid GCP service account key for the
    `GCP_PROJECT_NAME`. To create the project key review the
    [dedicated document](/docs/products/kafka/kafka-connect/howto/gcp-bigquery-sink-prereq#gcp-bigquery-sink-connector-google-account)

    :::warning
    The GCP BigQuery sink connector accepts the `GCP_SERVICE_KEY` JSON
    service key as a string, therefore all `"` symbols within it must be
    escaped `\"`.

    The `GCP_SERVICE_KEY` parameter should be in the format
    `{\"type\": \"service_account\",\"project_id\": \"XXXXXX\", ...}`

    Additionally, any `\n` symbols contained in the `private_key` field
    need to be escaped (by substituting with `\\n`)
    :::

-   `BIGQUERY_DATASET_NAME`: The BigQuery dataset name, as defined in
    the
    [dedicated pre-requisite step](/docs/products/kafka/kafka-connect/howto/gcp-bigquery-sink-prereq#gcp-bigquery-sink-connector-bigquery-dataset)

-   `TOPIC_LIST`: The list of topics to sink divided by comma

-   `APACHE_KAFKA_HOST`: The hostname of the Apache Kafka service, only
    needed when using Avro as data format

-   `SCHEMA_REGISTRY_PORT`: The Apache Kafka's schema registry port,
    only needed when using Avro as data format

-   `SCHEMA_REGISTRY_USER`: The Apache Kafka's schema registry
    username, only needed when using Avro as data format

-   `SCHEMA_REGISTRY_PASSWORD`: The Apache Kafka's schema registry user
    password, only needed when using Avro as data format

:::note
The `SCHEMA_REGISTRY` related parameters are available in the Aiven for
Apache Kafka® service page, *Overview* tab, and *Schema Registry* subtab

As of version 3.0, Aiven for Apache Kafka no longer supports Confluent
Schema Registry. For more information, read [the article describing the
replacement, Karapace](https://help.aiven.io/en/articles/5651983)
:::

## Setup a Google BigQuery sink connector with Aiven Console

The following example demonstrates how to setup a Google BigQuery sink
connector for Apache Kafka using the [Aiven
Console](https://console.aiven.io/).

### Define a Kafka Connect configuration file

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

    When using Avro as source data format, you need to set following
    parameters

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
    control database users have over these changes. This could lead to
    unexpected errors, particularly if message evolution exceeds the
    compatibility limits of BigQuery and its associated applications.
    :::

-   `keySource`: defines the format of the GCP key, the value should be
    `JSON` if the key is generated in JSON format

-   `keyfile`: contains the GCP service account key, correctly escaped
    as defined in the
    [prerequisite phase](/docs/products/kafka/kafka-connect/howto/gcp-bigquery-sink#connect_bigquery_sink_prereq)

    :::warning
    The configuration of the BigQuery connector in Aiven has a
    non-backward-compatible change between versions `1.2.0` and `1.6.5`:

    -   version `1.2.0` uses the `credentials` field to specify the
        Google Cloud credentials in JSON format:

        ```
        ...
        "credentials": "{...}",
        ...
        ```

    -   from version `1.6.5` on, use the `keyfield` field and set the
        `keySource` parameter to `JSON`:

        ```
        ...
        "keyfile": "{...}",
        "keySource": "JSON",
        ...
        ```

    You can review the connector version available in an Aiven for
    Apache Kafka service with the
    [dedicated Aiven CLI command](/docs/tools/cli/service/connector#avn_cli_service_connector_available) `avn service connector available`.
    :::

The full list of parameters is available in the [dedicated GitHub
page](https://github.com/wepay/kafka-connect-bigquery/wiki/Connector-Configuration).

### Create a Kafka Connect connector with the Aiven Console

To create a Kafka Connect connector, follow these steps:

1.  Log in to the [Aiven Console](https://console.aiven.io/) and select
    the Aiven for Apache Kafka® or Aiven for Apache Kafka Connect®
    service where the connector needs to be defined.

2.  Select **Connectors** from the left sidebar.

3.  Select **Create New Connector**, the button is enabled only for
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
    table name is equal to the Apache Kafka topic name. If you need to
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

:::note
Since the JSON schema needs to be defined in every message, there is a
big overhead to transmit the information. To achieve a better
performance in term of information-message ratio you should use the Avro
format together with the [Karapace schema
registry](https://karapace.io/) provided by Aiven
:::

You can sink the `iot_measurements` topic to BigQuery with the following
connector configuration, after replacing the placeholders for
`GCP_PROJECT_NAME`, `GCP_SERVICE_KEY` and `BIGQUERY_DATASET_NAME`:

```json
{
    "name":"iot_sink",
    "connector.class": "com.wepay.kafka.connect.bigquery.BigQuerySinkConnector",
    "topics": "iot_measurements",
    "project": "GCP_PROJECT_NAME",
    "defaultDataset": ".*=BIGQUERY_DATASET_NAME",
    "value.converter": "org.apache.kafka.connect.json.JsonConverter",
    "autoCreateTables": "true",
    "keySource": "JSON",
    "keyfile": "GCP_SERVICE_KEY"
}
```

The configuration file contains the following things to note:

-   `"topics": "iot_measurements"`: defines the topic to sink
-   `"value.converter": "org.apache.kafka.connect.json.JsonConverter"`:
    the message value is in plain JSON format without a schema

## Example: Create a Google BigQuery sink connector on a topic in Avro format

You have a topic named `students` in Avro format with the schema stored
in Karapace.

You can sink the `students` topic to BigQuery with the following
connector configuration, after replacing the placeholders for
`GCP_PROJECT_NAME`, `GCP_SERVICE_KEY`, `BIGQUERY_DATASET_NAME`,
`SCHEMA_REGISTRY_USER`, `SCHEMA_REGISTRY_PASSWORD`, `APACHE_KAFKA_HOST`,
`SCHEMA_REGISTRY_PORT`:

```json
{
    "name":"students_sink",
    "connector.class": "com.wepay.kafka.connect.bigquery.BigQuerySinkConnector",
    "topics": "students",
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

The configuration file contains the following things to note:

-   `"topics": "students"`: setting the topic to sink
-   `key.converter` and `value.converter`: define the message data
    format in the Apache Kafka topic. The
    `io.confluent.connect.avro.AvroConverter` converter translates
    messages from the Avro format. To retrieve the message schema we use
    Aiven's [Karapace schema
    registry](https://github.com/aiven/karapace) as specified by the
    `schema.registry.url` parameter and related credentials.
