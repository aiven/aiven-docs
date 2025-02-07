---
title: Create an IBM MQ sink connector in Aiven for Apache Kafka®
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";

The IBM MQ sink connector allows you to route messages from Apache Kafka® topics to IBM MQ queues.

## Prerequisites {#connect_ibm_mq_sink_prereq}

- An [Aiven for Apache Kafka service](/docs/products/kafka/kafka-connect/howto/enable-connect)
  with Apache Kafka Connect enabled,
  or
- A [dedicated Aiven for Apache Kafka Connect cluster](/docs/products/kafka/kafka-connect/get-started#apache_kafka_connect_dedicated_cluster).
- Access to an IBM MQ instance.

### Required IBM MQ details

Gather the following details about your IBM MQ setup:

:::note
You can view the full set of available parameters and configuration options in the
[IBM MQ sink connector GitHub repository](https://github.com/ibm-messaging/kafka-connect-mq-sink).
:::

- `mq.queue.manager`: The name of the IBM MQ queue manager.
- `mq.connection.mode`: The connection mode, typically set to `client`.
- `mq.connection.name.list`: The hostname and port of the IBM MQ instance, in the format
  `host(port)`.
- `mq.channel.name`: The name of the server-connection channel in IBM MQ.
- `mq.queue`: The name of the IBM MQ target queue.
- `mq.user.name`: The username for IBM MQ authentication.
- `mq.password`: The password associated with the `mq.user.name`.
- `mq.ssl.cipher.suite`: The cipher suite name for TLS (SSL) connections.
- `mq.ssl.use.ibm.cipher.mappings`: A setting that controls whether to apply IBM-specific
  cipher mappings. Typically set to `false` to ensure compatibility with standard TLS
  configurations.

## Create an IBM MQ sink connector configuration file

Create a file named `ibm_mq_sink_connector.json` with the following configurations. This
file is optional but helps you organize your settings, making it easier to copy
and paste the configurations into the [Aiven Console](https://console.aiven.io/) later.

```json
{
    "name": "IBM_MQ_Sink_Connector",
    "connector.class": "com.ibm.eventstreams.connect.mqsink.MQSinkConnector",
    "tasks.max": "2",
    "topics": "kafka_topic_name",
    "mq.queue.manager": "QueueManagerName",
    "mq.connection.mode": "client",
    "mq.connection.name.list": "mq-host(1414)",
    "mq.channel.name": "CLOUD.APP.SVRCONN",
    "mq.queue": "TargetQueueName",
    "mq.user.name": "YourUsername",
    "mq.password": "YourPassword",
    "mq.ssl.cipher.suite": "TLS_AES_256_GCM_SHA384",
    "mq.ssl.use.ibm.cipher.mappings": "false",
    "mq.message.builder": "com.ibm.eventstreams.connect.mqsink.builders.DefaultMessageBuilder",
    "mq.message.body.jms": true,
    "config.action.reload": "restart"
}
```

Parameters:

- `name`: The connector name. Replace `IBM_MQ_Sink_Connector` with the desired
  connector name.
- `topics`: The Apache Kafka topics from which messages will be sent to IBM MQ.
- `mq.queue.manager`, `mq.connection.mode`, `mq.connection.name.list`, `mq.channel.name`,
  `mq.queue`, `mq.user.name`, `mq.password`: IBM MQ connection details collected in the
  [prerequisite](#connect_ibm_mq_sink_prereq) phase.
- `mq.ssl.cipher.suite`: The cipher suite for the SSL connection.
- `mq.ssl.use.ibm.cipher.mappings`: Controls the use of IBM cipher mappings, typically
  set to `false`.
- `mq.message.builder`: Defines how Apache Kafka messages are converted to MQ messages.
- `config.action.reload`: Defines the action to take when the configuration changes,
   typically set to `restart`.

## Create an IBM MQ sink connector

<Tabs groupId="setup-method">
  <TabItem value="console" label="Aiven Console" default>

1. Access the [Aiven Console](https://console.aiven.io/).
1. Select your Aiven for Apache Kafka® or Aiven for Apache Kafka Connect® service.
1. Click <ConsoleLabel name="Connectors"/>.
1. Click **Create connector** if Apache Kafka Connect is already enabled on the service.
   If not, click **Enable connector on this service**.

   Alternatively, to enable connectors:

   1. Click <ConsoleLabel name="Service settings"/> in the sidebar.
   1. In the Service management section, click <ConsoleLabel name="Actions"/> >
      **Enable Kafka connect**.

1. In the sink connectors, click **Get started** under **IBM MQ Sink**.
1. On the **IBM MQ Sink** connector page, go to the **Common** tab.
1. Locate the **Connector configuration** text box and click <ConsoleLabel name="edit"/>.
1. Paste the configuration from your `ibm_mq_sink_connector.json` file into the text box.
1. Click **Create connector**.
1. Verify the connector status on the <ConsoleLabel name="Connectors"/> page.

Ensure that data from the Apache Kafka topics is successfully transferred to the
target IBM MQ queue.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

To create an IBM MQ Sink connector using the [Aiven CLI](/docs/tools/cli/service-cli),
run the following command:

```bash
avn service connector create SERVICE_NAME @ibm_mq_sink_connector.json
```

Parameters:

- `SERVICE_NAME`: The name of your Aiven for Apache Kafka service.
- `@ibm_mq_sink_connector.json`: This denotes the path to your JSON configuration file.

</TabItem>
</Tabs>

## Example: Define and create an IBM MQ sink connector

This example demonstrates how to create an IBM MQ sink connector using the
following properties:

- Connector name: `ibm_mq_sink`
- Queue manager: `kafka_connect_connector_testing_queue_manager`
- Connection mode: `client`
- Connection name list: `kafka-connect-connector-testing-queue-manager-95e0.qm2.eu-de.mq.appdomain.cloud(32275)`
- Channel name: `CLOUD.APP.SVRCONN`
- Target queue: `test_topic_mq_1`
- Username:  `testuser`
- Password: `Test123!`
- SSL cipher suite: `TLS_AES_256_GCM_SHA384`
- IBM cipher mappings: `false`
- Topics to sink: `test-topic-1`

**Connector configuration example:**

```json
{
    "name": "ibm_mq_sink",
    "connector.class": "com.ibm.eventstreams.connect.mqsink.MQSinkConnector",
    "tasks.max": "2",
    "topics": "test-topic-1",
    "mq.queue.manager": "kafka_connect_connector_testing_queue_manager",
    "mq.connection.mode": "client",
    "mq.connection.name.list": "kafka-connect-connector-testing-queue-manager-95e0.qm2.eu-de.mq.appdomain.cloud(32275)",
    "mq.channel.name": "CLOUD.APP.SVRCONN",
    "mq.queue": "test_topic_mq_1",
    "mq.user.name": "testuser",
    "mq.password": "Test123!",
    "mq.ssl.cipher.suite": "TLS_AES_256_GCM_SHA384",
    "mq.ssl.use.ibm.cipher.mappings": "false",
    "mq.message.builder": "com.ibm.eventstreams.connect.mqsink.builders.DefaultMessageBuilder",
    "config.action.reload": "restart"
}
```

Once you've saved this configuration in the `ibm_mq_sink_connector.json` file, you can
create the connector in your Aiven for Apache Kafka service. You can observe data from
the `test-topic-1` Apache Kafka topic being successfully delivered to the IBM MQ queue
named  `test_topic_mq_1`.
