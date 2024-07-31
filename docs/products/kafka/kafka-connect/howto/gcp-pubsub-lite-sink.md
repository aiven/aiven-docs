---
title: Create a sink connector from Apache Kafka® to Google Pub/Sub Lite
---

The [Google Pub/Sub Lite sink
connector](https://github.com/googleapis/java-pubsub-group-kafka-connector)
enables you to push data from an Aiven for Apache Kafka® topic to a
Google Pub/Sub Lite topic.

:::note
See the full set of available parameters and configuration
options in the [connector's
documentation](https://github.com/googleapis/java-pubsub-group-kafka-connector).
:::

## Prerequisites {#connect_pubsub_lite_sink_prereq}

To setup an Google Pub/Sub Lite sink connector, you need an Aiven for
Apache Kafka service
[with Kafka Connect enabled](enable-connect) or a
[dedicated Aiven for Apache Kafka Connect cluster](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).

Also collect the following information about the
target Google Pub/Sub Lite upfront:

-   `GCP_PROJECT_NAME`: The GCP project name where the target Google
    Pub/Sub Lite is located
-   `GCP_TOPIC`: the name of the target Google Pub/Sub Lite topic
-   `GCP_PUBSUB_LOCATION`: the name of the [Google Pub/Sub Lite
    location](https://cloud.google.com/pubsub/lite/docs/locations)
-   `KAFKA_TOPIC`: The name of the target topic in Aiven for Apache
    Kafka
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

Starting with version 3.0, Aiven for Apache Kafka no longer supports Confluent
Schema Registry. For more information, read [the article describing the
replacement, Karapace](/docs/products/kafka/karapace).
:::

## Setup a Google Pub/Sub Lite sink connector with Aiven Console

The following example demonstrates how to setup a Google Pub/Sub Lite
sink connector for Apache Kafka using the [Aiven
Console](https://console.aiven.io/).

### Define a Kafka Connect configuration file

Define the connector configurations in a file (we'll refer to it with
the name `pubsub_sink.json`) with the following content:

```json
{
    "name":"CONNECTOR_NAME",
    "connector.class": "com.google.pubsublite.kafka.sink.PubSubLiteSinkConnector",
    "topics": "KAFKA_TOPIC",
    "pubsublite.project": "GCP_PROJECT_NAME",
    "pubsublite.location": "GCP_PUBSUB_LOCATION",
    "pubsublite.topic": "GCP_TOPIC",
    "key.converter": "io.confluent.connect.avro.AvroConverter",
    "key.converter.schema.registry.url": "https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT",
    "key.converter.basic.auth.credentials.sink": "USER_INFO",
    "key.converter.schema.registry.basic.auth.user.info": "SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD",
    "value.converter": "io.confluent.connect.avro.AvroConverter",
    "value.converter.schema.registry.url": "https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT",
    "value.converter.basic.auth.credentials.sink": "USER_INFO",
    "value.converter.schema.registry.basic.auth.user.info": "SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD"
}
```

The configuration file contains the following entries:

-   `name`: the connector name

-   `topics`: the source Apache Kafka topic names, divided by comma

-   `pubsublite.project`: the GCP project name where the target Google
    Pub/Sub is located

-   `pubsublite.location`: the name of the [Google Pub/Sub Lite
    location](https://cloud.google.com/pubsub/lite/docs/locations)

-   `pubsublite.topic`: the name of the target Google Pub/Sub topic

-   `key.converter` and `value.converter`: define the message data
    format in the Apache Kafka topic. The
    `io.confluent.connect.avro.AvroConverter` converter translates
    messages from the Avro format. To retrieve the message schema we use
    Aiven's [Karapace schema
    registry](https://github.com/aiven/karapace), as specified by the
    `schema.registry.url` parameter and related credentials.

    :::note
    The `key.converter` and `value.converter` sections are only needed
    when the sink data is in Avro format. If omitted the messages will
    be read as binary format.

    When using Avro as sink data format, set following
    parameters:

    -   `value.converter.schema.registry.url`: pointing to the Aiven for
        Apache Kafka schema registry URL in the form of
        `https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT` with the
        `APACHE_KAFKA_HOST` and `SCHEMA_REGISTRY_PORT` parameters
        [retrieved in the previous step](/docs/products/kafka/kafka-connect/howto/gcp-pubsub-lite-sink#connect_pubsub_lite_sink_prereq).
    -   `value.converter.basic.auth.credentials.sink`: to the value
        `USER_INFO`, since you're going to login to the schema registry
        using username and password.
    -   `value.converter.schema.registry.basic.auth.user.info`: passing
        the required schema registry credentials in the form of
        `SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD` with the
        `SCHEMA_REGISTRY_USER` and `SCHEMA_REGISTRY_PASSWORD` parameters
        [retrieved in the previous step](/docs/products/kafka/kafka-connect/howto/gcp-pubsub-lite-sink#connect_pubsub_lite_sink_prereq).
    :::

The full list of parameters is available in the [dedicated GitHub
page](https://github.com/googleapis/java-pubsub-group-kafka-connector/).

### Create a Kafka Connect connector with the Aiven Console

To create an Apache Kafka Connect connector:

1.  Log in to the [Aiven Console](https://console.aiven.io/) and select
    the Aiven for Apache Kafka® or Aiven for Apache Kafka Connect®
    service where the connector needs to be defined.

2.  Select **Connectors** from the left sidebar.

3.  Select **Create New Connector**, it is enabled only for
    services
    [with Kafka Connect enabled](enable-connect).

4.  Select **Google Pub/Sub Lite sink**.

5.  In the **Common** tab, locate the **Connector configuration** text
    box and select on **Edit**.

6.  Paste the connector configuration (stored in the `pubsub_sink.json`
    file) in the form.

7.  Select **Apply**. .. note:

        The Aiven Console parses the configuration file and fills the relevant UI fields. You can review the UI fields across the various tabs and change them if necessary. The changes will be reflected in JSON format in the **Connector configuration** text box.

8.  After all the settings are correctly configured, select **Create
    connector**.

9.  Verify the connector status under the **Connectors** screen.

10. Verify the presence of the data in the target Pub/Sub Lite topic,
    the table name is equal to the Apache Kafka topic name.

    :::note
    You can also create connectors using the
    [Aiven CLI command](/docs/tools/cli/service/connector#avn_service_connector_create).
    :::

## Example: Create a Google Pub/Sub sink connector

<!-- vale off -->
You have an Apache Kafka topic `iot_metrics` that you want to push to a
Google Pub/Sub Lite topic `iot_metrics_pubsub`, you can create a sink
connector with the following configuration, after replacing the
placeholders for `GCP_PROJECT_NAME` and `GCP_PUBSUB_LOCATION`:
<!-- vale on -->

```json
{
   "name":"CONNECTOR_NAME",
   "connector.class": "com.google.pubsublite.kafka.sink.PubSubLiteSinkConnector",
   "topics": "iot_metrics",
   "pubsublite.project": "GCP_PROJECT_NAME",
   "pubsublite.location": "GCP_PUBSUB_LOCATION",
   "pubsublite.topic": "iot_metrics_pubsub",
   "gcp.credentials.json": "GCP_SERVICE_KEY"
}
```
