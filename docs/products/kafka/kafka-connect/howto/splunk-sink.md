---
title: Create a sink connector from Apache Kafka® to Splunk
---

The [Splunk](https://www.splunk.com/) sink connector enables you to move
data from an Aiven for Apache Kafka® cluster to a remote Splunk server
via [HTTP event
collector](https://docs.splunk.com/Documentation/Splunk/latest/Data/FormateventsforHTTPEventCollector)
(HEC).

:::note
See the full set of available parameters and configuration
options in the [connector's
documentation](https://github.com/splunk/kafka-connect-splunk).
:::

## Prerequisites {#connect_splunk_sink_prereq}

To setup an Splunk sink connector, you need an Aiven for Apache Kafka
service [with Kafka Connect enabled](enable-connect) or a
[dedicated Aiven for Apache Kafka Connect cluster](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).

Also collect the following information about the
target server:

-   `SPLUNK_HEC_TOKEN`: The [HEC authentication
    token](https://docs.splunk.com/Documentation/Splunk/latest/Data/FormateventsforHTTPEventCollector)
-   `SPLUNK_HEC_URI`: The [Splunk endpoint
    URI](https://docs.splunk.com/Documentation/Splunk/9.0.1/Data/UsetheHTTPEventCollector)
-   `TOPIC_LIST`: The list of topics to sink divided by comma
-   `SPLUNK_INDEXES`: The list of Splunk indexes where the data will be
    landing

and, if you are using Avro as the data format:

-   `APACHE_KAFKA_HOST`: The hostname of the Apache Kafka service
-   `SCHEMA_REGISTRY_PORT`: The Apache Kafka's schema registry port
-   `SCHEMA_REGISTRY_USER`: The Apache Kafka's schema registry username
-   `SCHEMA_REGISTRY_PASSWORD`: The Apache Kafka's schema registry user
    password

:::note
You can browse the additional parameters available for the `static` and
`oauth2` authorization types in the [dedicated
documentation](https://github.com/aiven/http-connector-for-apache-kafka/blob/main/docs/sink-connector-config-options.rst).
:::

## Setup an Splunk sink connector with Aiven Console

The following example demonstrates how to setup an Splunk sink connector
for Apache Kafka using the [Aiven Console](https://console.aiven.io/).

### Define a Kafka Connect configuration file

Create a file (we'll refer to this one as `splunk_sink.json`) to hold
the connector configuration. As an example, see the following configuration
for sending JSON payloads to Splunk:

```json
{
    "name":"CONNECTOR_NAME",
    "connector.class": "com.splunk.kafka.connect.SplunkSinkConnector",
    "splunk.hec.token": "SPLUNK_HEC_TOKEN",
    "splunk.hec.uri": "SPLUNK_HEC_URI",
    "splunk.indexes": "SPLUNK_INDEXES",
    "topics": "TOPIC_LIST",
    "splunk.hec.raw" : false,
    "splunk.hec.ack.enabled" : false,
    "splunk.hec.ssl.validate.certs": "true",
    "config.splunk.hec.json.event.formatted": false,
    "tasks.max":1
}
```

The configuration file contains the following entries:

-   `name`: the connector name
-   `splunk.hec.token` and `splunk.hec.uri`: remote Splunk server URI
    and authorization parameters collected in the
    [prerequisite](/docs/products/kafka/kafka-connect/howto/splunk-sink#connect_splunk_sink_prereq) phase.
-   `splunk.hec.raw`: if set to `false` defines the data ingestion using
    the `/raw` HEC endpoint instead of the default `/event` one.
-   `splunk.hec.ack.enabled`: if set to `true`, Kafka offset is updated
    only after receiving the ACK for the POST call to Splunk.
-   `config.splunk.hec.json.event.formatted`: Defines if events are
    preformatted into the proper [HEC JSON
    format](https://docs.splunk.com/Documentation/KafkaConnect/2.0.2/User/Parameters).

:::tip
When using Splunk with self service SSL certificates it can be useful
to set `splunk.hec.ssl.validate.certs` to `false` to disable HTTPS
certification validation.
:::

### Create a Kafka Connect connector with the Aiven Console

To create an Apache Kafka Connect connector:

1.  Log in to the [Aiven Console](https://console.aiven.io/) and select
    the Aiven for Apache Kafka® or Aiven for Apache Kafka Connect®
    service where the connector needs to be defined.

2.  Select **Connectors** from the left sidebar.

3.  Select **Create New Connector**, it is enabled only for
    services
    [with Kafka Connect enabled](enable-connect).

4.  Select **Splunk sink**.

5.  In the **Common** tab, locate the **Connector configuration** text
    box and select on **Edit**.

6.  Paste the connector configuration (stored in the `splunk_sink.json`
    file) in the form.

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

10. Verify the data in the target Splunk instance.

    :::note
    You can also create connectors using the
    [Aiven CLI command](/docs/tools/cli/service/connector#avn_service_connector_create).
    :::

## Example: Create a simple Splunk sink connector

If you have a topic named `data_logs` to sink to a Splunk
server in the `kafka_logs` index:

```json
{
    "name":"data_logs_splunk_sink",
    "connector.class": "com.splunk.kafka.connect.SplunkSinkConnector",
    "splunk.hec.token": "SPLUNK_HEC_TOKEN",
    "splunk.hec.uri": "SPLUNK_HEC_URI",
    "splunk.indexes": "kafka_logs",
    "topics": "data_logs"
}
```

The configuration file contains the following things to note:

-   `"topics": "data_logs"`: setting the topic to sink
