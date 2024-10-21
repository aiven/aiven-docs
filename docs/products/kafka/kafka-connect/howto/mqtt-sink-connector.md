---
title: Create an MQTT sink connector
---

The [MQTT sink
connector](https://docs.lenses.io/connectors/kafka-connectors/sources/mqtt)
copies messages from an Apache Kafka® topic to an MQTT queue.

:::tip
The connector can be used to sink messages to RabbitMQ® where
[RabbitMQ MQTT plugin](https://www.rabbitmq.com/mqtt.html) is enabled.
:::

## Prerequisites {#connect_mqtt_rbmq_sink_prereq}

To set up an MQTT sink connector, you need an Aiven for Apache Kafka
service [with Kafka Connect enabled](enable-connect) or a
[dedicated Aiven for Apache Kafka Connect cluster](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).

:::tip
The connector will write to a topic defined in the `"connect.mqtt.kcql"`
configuration, so either create the topic in your Kafka service, or
enable the `auto_create_topic` parameter so that the topic will be
created automatically.
:::

Also collect the following information about the sink
MQTT server upfront:

-   `USERNAME`: The MQTT username to connect

-   `PASSWORD`: The password for the username selected

-   `HOST`: The MQTT hostname

-   `PORT`: MQTT port (usually 1883)

-   `KCQL_STATEMENT`: The KCQL statement to be used in the following
    format:

    ```
    INSERT INTO <mqtt-topic> SELECT FIELD, ... FROM <kafka-topic>
    ```

-   `APACHE_KAFKA_HOST`: The hostname of the Apache Kafka service, only
    needed when using Avro as data format

-   `SCHEMA_REGISTRY_PORT`: The Apache Kafka's schema registry port,
    only needed when using Avro as data format

-   `SCHEMA_REGISTRY_USER`: The Apache Kafka's schema registry
    username, only needed when using Avro as data format

-   `SCHEMA_REGISTRY_PASSWORD`: The Apache Kafka's schema registry user
    password, only needed when using Avro as data format

## Setup an MQTT sink connector with Aiven Console

The following example demonstrates how to setup an Apache Kafka MQTT
sink connector using the [Aiven Console](https://console.aiven.io/).

### Define a Kafka Connect configuration file

Define the connector configurations in a file (we'll refer to it with
the name `mqtt_sink.json`) with the following content. Creating a file
is not strictly necessary but allows to have all the information in one
place before copy/pasting them in the [Aiven
Console](https://console.aiven.io/):

```
{
    "name": "CONNECTOR_NAME",
    "connect.mqtt.hosts": "tcp://<HOST>:<PORT>",
    "connect.mqtt.kcql": "KCQL_STATEMENT",
    "connector.class": "com.datamountaineer.streamreactor.connect.mqtt.sink.MqttSinkConnector",
    "connect.mqtt.username": "USERNAME",
    "connect.mqtt.password": "PASSWORD",
    "key.converter": "org.apache.kafka.connect.json.JsonConverter",
    "value.converter": "org.apache.kafka.connect.json.JsonConverter"
}
```

The configuration file contains the following entries:

-   `name`: the connector name, replace `CONNECTOR_NAME` with the name
    to give to the connector.
-   `connect.mqtt.hosts`, `connect.mqtt.kcql`, `connect.mqtt.username`
    and `connect.mqtt.password`: sink MQTT parameters collected in the
    [prerequisite](/docs/products/kafka/kafka-connect/howto/mqtt-sink-connector#connect_mqtt_rbmq_sink_prereq) phase.
-   `key.converter` and `value.converter`: The data converter used for
    this example JSON converter is used.

See the [dedicated
documentation](https://docs.lenses.io/connectors/kafka-connectors/sources/mqtt#storage-to-output-matrix)
for the full list of parameters.

### Create a Kafka Connect connector with the Aiven Console

To create an Apache Kafka Connect connector:

1.  Log in to the [Aiven Console](https://console.aiven.io/) and select
    the Aiven for Apache Kafka® or Aiven for Apache Kafka Connect®
    service where the connector needs to be defined.

2.  Select **Connectors** from the left sidebar.

3.  Select **Create New Connector**, it is enabled only for
    services
    [with Kafka Connect enabled](enable-connect).

4.  Select **Stream Reactor MQTT Sink Connector**.

5.  In the **Common** tab, locate the **Connector configuration** text
    box and select on **Edit**.

6.  Paste the connector configuration (stored in the `mqtt_sink.json`
    file) in the form.

7.  Select **Apply**.

    To create the connector, access the [Aiven
    Console](https://console.aiven.io/) and select the Aiven for Apache
    Kafka® or Aiven for Apache Kafka® Connect service where the
    connector needs to be defined, then:

    :::note
    The Aiven Console parses the configuration file and fills the
    relevant UI fields. You can review the UI fields across the various
    tabs and change them if necessary. The changes will be reflected in
    JSON format in the **Connector configuration** text box.
    :::

8.  After all the settings are correctly configured, select **Create
    connector**.

9.  Verify the connector status under the **Connectors** screen.

10. Verify the presence of the data in the target Apache Kafka topic,
    the topic name is the one defined in the `KCQL_STATEMENT`.

:::tip
You can also create connectors using the
[Aiven CLI command](/docs/tools/cli/service/connector#avn_service_connector_create).
:::
