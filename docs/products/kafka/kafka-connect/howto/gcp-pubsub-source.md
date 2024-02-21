---
title: Create a Google Pub/Sub source connector to Apache Kafka®
---

The [Google Pub/Sub source
connector](https://github.com/googleapis/java-pubsub-group-kafka-connector)
enables you to push from a Google Pub/Sub subscription to an Aiven for
Apache Kafka® topic.

:::note
You can check the full set of available parameters and configuration
options in the [connector's
documentation](https://github.com/googleapis/java-pubsub-group-kafka-connector).
:::

## Prerequisites {#connect_pubsub_source_prereq}

To setup an Google Pub/Sub source connector, you need an Aiven for
Apache Kafka service
[with Kafka Connect enabled](enable-connect) or a
[dedicated Aiven for Apache Kafka Connect cluster](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).

Furthermore you need to collect the following information about the
target Google Pub/Sub upfront:

-   `GCP_PROJECT_NAME`: The GCP project name where the target Google
    Pub/Sub is located

-   `GCP_SUBSCRIPTION`: the name of the [Google Pub/Sub
    subscription](https://cloud.google.com/pubsub/docs/create-subscription)

-   `GCP_SERVICE_KEY`: A valid GCP service account key for the
    `GCP_PROJECT_NAME`. To create the project key review the
    [dedicated document](/docs/products/kafka/kafka-connect/howto/gcp-bigquery-sink-prereq#gcp-bigquery-sink-connector-google-account)

    :::warning
    The GCP Pub/Sub source connector accepts the `GCP_SERVICE_KEY` JSON
    service key as a string, therefore all `"` symbols within it must be
    escaped `\"`.

    The `GCP_SERVICE_KEY` parameter should be in the format
    `{\"type\": \"service_account\",\"project_id\": \"XXXXXX\", ...}`

    Additionally, any `\n` symbols contained in the `private_key` field
    need to be escaped (by substituting with `\\n`)
    :::

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

As of version 3.0, Aiven for Apache Kafka no longer supports Confluent
Schema Registry. For more information, read [the article describing the
replacement, Karapace](https://help.aiven.io/en/articles/5651983)
:::

## Setup a Google Pub/Sub source connector with Aiven Console

The following example demonstrates how to setup a Google Pub/Sub source
connector for Apache Kafka using the [Aiven
Console](https://console.aiven.io/).

### Define a Kafka Connect configuration file

Define the connector configurations in a file (we'll refer to it with
the name `pubsub_source.json`) with the following content:

```json
{
    "name":"CONNECTOR_NAME",
    "connector.class": "com.google.pubsub.kafka.source.CloudPubSubSourceConnector",
    "kafka.topic": "KAFKA_TOPIC",
    "cps.project": "GCP_PROJECT_NAME",
    "cps.subscription": "GCP_SUBSCRIPTION",
    "gcp.credentials.json": "GCP_SERVICE_KEY",
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

-   `name`: the connector name

-   `kafka-topic`: the target Apache Kafka topic name

-   `cps.project`: the GCP project name where the target Google Pub/Sub
    is located

-   `cps.subscription`: the name of the [Google Pub/Sub
    subscription](https://cloud.google.com/pubsub/docs/create-subscription)

-   `gcp.credentials.json`: contains the GCP service account key,
    correctly escaped as defined in the
    [prerequisite phase](/docs/products/kafka/kafka-connect/howto/gcp-pubsub-source#connect_pubsub_source_prereq)

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
        [retrieved in the previous step](/docs/products/kafka/kafka-connect/howto/gcp-pubsub-source#connect_pubsub_source_prereq).
    -   `value.converter.basic.auth.credentials.source`: to the value
        `USER_INFO`, since you're going to login to the schema registry
        using username and password.
    -   `value.converter.schema.registry.basic.auth.user.info`: passing
        the required schema registry credentials in the form of
        `SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD` with the
        `SCHEMA_REGISTRY_USER` and `SCHEMA_REGISTRY_PASSWORD` parameters
        [retrieved in the previous step](/docs/products/kafka/kafka-connect/howto/gcp-pubsub-source#connect_pubsub_source_prereq).
    :::

The full list of parameters is available in the [dedicated GitHub
page](https://github.com/googleapis/java-pubsub-group-kafka-connector/).

### Create a Kafka Connect connector with the Aiven Console

To create a Kafka Connect connector, follow these steps:

1.  Log in to the [Aiven Console](https://console.aiven.io/) and select
    the Aiven for Apache Kafka® or Aiven for Apache Kafka Connect®
    service where the connector needs to be defined.

2.  Select **Connectors** from the left sidebar.

3.  Select **Create New Connector**, the button is enabled only for
    services
    [with Kafka Connect enabled](enable-connect).

4.  Select **Google Pub/Sub source**.

5.  In the **Common** tab, locate the **Connector configuration** text
    box and select on **Edit**.

6.  Paste the connector configuration (stored in the
    `pubsub_source.json` file) in the form.

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

10. Verify the presence of the data in the target Pub/Sub dataset, the
    table name is equal to the Apache Kafka topic name. If you need to
    change the target table name, you can do so using the Kafka Connect
    `RegexRouter` transformation.

    :::note
    You can also create connectors using the
    [Aiven CLI command](/docs/tools/cli/service/connector#avn_service_connector_create).
    :::

## Example: Create a Google Pub/Sub source connector

You have a Google Pub/Sub subscription `GCP_SUBSCRIPTION` that you want
to push to a Aiven for Apache Kafka topic named `measurements` you can
create a source connector with the following configuration, after
replacing the placeholders for `GCP_PROJECT_NAME` and `GCP_SERVICE_KEY`:

```json
{
   "name":"CONNECTOR_NAME",
   "connector.class": "com.google.pubsub.kafka.source.CloudPubSubSourceConnector",
   "kafka.topic": "measurements",
   "cps.project": "GCP_PROJECT_NAME",
   "cps.subscription": "GCP_SUBSCRIPTION",
   "gcp.credentials.json": "GCP_SERVICE_KEY"
}
```

The Apache Kafka topic format will be the default bytes by default, you
can use the AVRO schema by including the `value.converter` and
`key.converter` properties defined previously.
