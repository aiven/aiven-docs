---
title: Connect to Aiven for Apache Kafka® with command line tools
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"
import ConsoleIcon from "@site/src/components/non-swizzled/ConsoleIcons"

Learn how to send and receive messages from an Aiven for Apache Kafka® service using command-line tools.

## Prerequisites

The `kafka-console-producer.sh` and `kafka-console-consumer.sh` scripts are included
in the [open-source Apache Kafka® distribution](https://kafka.apache.org/downloads),
located in the `bin` directory.

For `kafka-avro-console-producer`, follow the installation steps in
[its GitHub repository](https://github.com/confluentinc/schema-registry) or
download the Confluent platform via the **Tar archive** option in
the [Quick Start for Confluent Platform](https://docs.confluent.io/platform/current/quickstart/ce-docker-quickstart).
The  `kafka-avro-console-producer` tool is also located in the bin directory of
the Confluent archive.

:::note
The Confluent platform is not required to use the `kafka-avro-console-producer` tool
with an Aiven for Apache Kafka service running [Karapace](/docs/products/kafka/karapace/howto/enable-karapace).
:::

To configure all three tools, see the
[Apache Kafka toolbox properties](/docs/products/kafka/howto/kafka-tools-config-file).

## Variables

 | Variable               | Description                                                                                                                              |
 | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
 | `HOST`                 | Host name for the connection                                                                                                             |
 | `PORT`                 | Port number to use for the Kafka service                                                                                                 |
 | `CONFIGURATION_PATH`   | Path to your configuration file [for Apache Kafka toolbox](/docs/products/kafka/howto/kafka-tools-config-file) |
 | `SCHEMA_REGISTRY_HOST` | Host name for your schema registry                                                                                                       |
 | `SCHEMA_REGISTRY_PORT` | Port number for your schema registry                                                                                                     |
 | `SCHEMA_REGISTRY_USER` | User name for your schema registry                                                                                                       |
 | `SCHEMA_REGISTRY_PWD`  | Password for your schema registry                                                                                                        |
 | `TARGET_TOPIC`         | The name of the Kafka topic to be written to/read from                                                                                   |

In the command lines below, values in `{` and `}` are to be replaced -
so `{PORT}` would be replaced by the appropriate port number, for
instance `12345`.

## Produce messages

Use `kafka-console-producer` to send multiple messages to your topic.

```bash
kafka-console-producer.sh --broker-list {HOST}:{PORT} \
  --topic {TARGET_TOPIC} \
  --producer.config {CONFIGURATION_PATH}
```

Once the connection is established, you can send messages one after another by typing
them in the terminal. For example:

```plaintext
message1
message2
```

## Produce messages with a schema

Use `kafka-avro-console-producer` to produce messages with a schema by connecting
to your schema registry.

:::note

- The `schema.registry.url` must be a complete URL, typically starting with `https://`.
- Aiven's [Karapace](https://karapace.io/) is a compatible schema registry. To enable
  it for your Aiven for Apache Kafka® service, see
  [Enable Karapace with Aiven for Apache Kafka®](/docs/products/kafka/karapace/howto/enable-karapace).
  The `SCHEMA_REGISTRY_` values are available on the **Schema Registry** tab of the
  service's <ConsoleIcon name="overview"/> page.
:::

```bash
kafka-avro-console-producer --broker-list {HOST}:{PORT} \
  --producer.config {CONFIGURATION_PATH} \
  --topic {TARGET_TOPIC} \
  --property value.schema='{"type":"record","name":"Test","fields":[{"name":"id","type":"string"}]}' \
  --property schema.registry.url={SCHEMA_REGISTRY_HOST}:{SCHEMA_REGISTRY_PORT} \
  --property basic.auth.credentials.source=USER_INFO \
  --property basic.auth.user.info={SCHEMA_REGISTRY_USER}:{SCHEMA_REGISTRY_PASSWORD}
```

Once connected, you can send messages using the specified schema. For example:

```json
{"id": "1"}
```

For more information on how to use `kafka-avro-console-producer`, see the
[Confluent developer documentation](https://developer.confluent.io/tutorials/kafka-console-consumer-producer-avro/kafka.html).

## Consume messages

Use `kafka-console-consumer` to read messages from your topic. To read from the
beginning of the topic, run:

```bash
kafka-console-consumer.sh --bootstrap-server {HOST}:{PORT} \
  --topic {TARGET_TOPIC}  \
  --consumer.config {CONFIGURATION_PATH} \
  --from-beginning
```
