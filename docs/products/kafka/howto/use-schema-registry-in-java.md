---
title: Use schema registry with Java producers and consumers
sidebar_label: Producers and consumers
description: Configure a Java producer and consumer to use Karapace schema registry with Aiven for Apache Kafka.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"
import RelatedPages from "@site/src/components/RelatedPages";

Aiven for Apache Kafka® provides schema registry functionality through [Karapace](https://github.com/Aiven-Open/karapace).
Karapace lets you store, retrieve, and evolve schemas without rebuilding producer or
consumer code.

The examples use Avro. For Protobuf or JSON Schema, generate the classes first, then
apply the same connection and authentication settings.

## Workflow overview

To produce and consume Avro messages in Java using the schema registry:

1. Define your Avro schema.
1. Generate Java classes from the schema.
1. Add the required Maven dependencies.
1. Optional: Create a keystore, and create a truststore only if you use SASL
   authentication.
1. Configure your Kafka producer and consumer properties.

## Prerequisites

- A running [Aiven for Apache Kafka®](/docs/products/kafka/get-started/create-kafka-service)
  service
- [Karapace schema registry enabled](/docs/products/kafka/karapace/howto/enable-karapace)
- [Keystore and truststore files](/docs/products/kafka/howto/keystore-truststore) for SSL
  authentication

## Get connection details

<Tabs groupId="group1">
<TabItem value="console" label="Aiven Console" default>

On the service <ConsoleLabel name="overview"/> page, open **Connection information**.

1. On the **Apache Kafka** tab, copy the **Service URI** for the bootstrap servers.
1. On the **Schema Registry** tab, copy the **Service URI**, **User**, and **Password**.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Generate the keystore and truststore using the Aiven CLI:

```bash
avn service user-kafka-java-creds \
  --project PROJECT_NAME \
  --service SERVICE_NAME \
  --username USERNAME
```

</TabItem>
</Tabs>

## Variables {#kafka_schema_registry_variables}

Replace the following placeholders in the example configuration:

| Variable                 | Description                                                                 |
|--------------------------|-----------------------------------------------------------------------------|
| `BOOTSTRAPSERVERS`       | Kafka service URI from **Connection information** on the service overview page |
| `KEYSTORE`               | Path to the keystore file                                                   |
| `KEYSTOREPASSWORD`       | Password for the keystore                                                   |
| `TRUSTSTORE`             | Path to the truststore file                                                 |
| `TRUSTSTOREPASSWORD`     | Password for the truststore                                                 |
| `SSLKEYPASSWORD`         | Password for the private key in the keystore                                |
| `SCHEMAREGISTRYURL`      | Schema registry URI from **Connection information**                         |
| `SCHEMAREGISTRYUSER`     | Schema registry username from **Connection information**                     |
| `SCHEMAREGISTRYPASSWORD` | Schema registry password from **Connection information**                     |
| `TOPIC_NAME`             | Kafka topic name                                                            |

## Define an Avro schema

Create an Avro schema file. For example, save the following schema in a file
named `ClickRecord.avsc`:

```json
{
  "type": "record",
  "name": "ClickRecord",
  "namespace": "io.aiven.avro.example",
  "fields": [
    {"name": "session_id", "type": "string"},
    {"name": "browser", "type": ["string", "null"]},
    {"name": "campaign", "type": ["string", "null"]},
    {"name": "channel", "type": "string"},
    {"name": "referrer", "type": ["string", "null"], "default": "None"},
    {"name": "ip", "type": ["string", "null"]}
  ]
}
```

This schema defines a record named `ClickRecord` in the namespace
`io.aiven.avro.example`.
The record has the fields `session_id`, `browser`, `campaign`, `channel`, `referrer`,
and `ip`.

## Generate Java classes and add dependencies

Generate Java classes from your schema, then add the required dependencies to your
`pom.xml`:

- [Generate Java classes from Avro schemas](/docs/products/kafka/howto/generate-avro-java-classes)
  (used in these examples)
- [Generate Java classes from Protobuf schemas](/docs/products/kafka/howto/generate-protobuf-java-classes)
- [Generate Java classes from JSON Schema](/docs/products/kafka/howto/generate-json-java-classes)

## Configure producer and consumer properties

For complete example code, see the
[Aiven examples GitHub repository](https://github.com/aiven/aiven-examples/tree/master/solutions/kafka-schema-registry).

### Producer configuration

```java
props.put(CommonClientConfigs.BOOTSTRAP_SERVERS_CONFIG, BOOTSTRAPSERVERS);
props.put(CommonClientConfigs.SECURITY_PROTOCOL_CONFIG, "SSL");
props.put(SslConfigs.SSL_TRUSTSTORE_LOCATION_CONFIG, TRUSTSTORE);
props.put(SslConfigs.SSL_TRUSTSTORE_PASSWORD_CONFIG, TRUSTSTOREPASSWORD);
props.put(SslConfigs.SSL_KEYSTORE_TYPE_CONFIG, "PKCS12");
props.put(SslConfigs.SSL_KEYSTORE_LOCATION_CONFIG, KEYSTORE);
props.put(SslConfigs.SSL_KEYSTORE_PASSWORD_CONFIG, KEYSTOREPASSWORD);
props.put(SslConfigs.SSL_KEY_PASSWORD_CONFIG, SSLKEYPASSWORD);
props.put("schema.registry.url", SCHEMAREGISTRYURL);
props.put("basic.auth.credentials.source", "USER_INFO");
props.put("basic.auth.user.info", SCHEMAREGISTRYUSER + ":" + SCHEMAREGISTRYPASSWORD);
props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, KafkaAvroSerializer.class.getName());
```

### Consumer configuration

```java
props.put(CommonClientConfigs.BOOTSTRAP_SERVERS_CONFIG, BOOTSTRAPSERVERS);
props.put(CommonClientConfigs.SECURITY_PROTOCOL_CONFIG, "SSL");
props.put(SslConfigs.SSL_TRUSTSTORE_LOCATION_CONFIG, TRUSTSTORE);
props.put(SslConfigs.SSL_TRUSTSTORE_PASSWORD_CONFIG, TRUSTSTOREPASSWORD);
props.put(SslConfigs.SSL_KEYSTORE_TYPE_CONFIG, "PKCS12");
props.put(SslConfigs.SSL_KEYSTORE_LOCATION_CONFIG, KEYSTORE);
props.put(SslConfigs.SSL_KEYSTORE_PASSWORD_CONFIG, KEYSTOREPASSWORD);
props.put(SslConfigs.SSL_KEY_PASSWORD_CONFIG, SSLKEYPASSWORD);
props.put("schema.registry.url", SCHEMAREGISTRYURL);
props.put("basic.auth.credentials.source", "USER_INFO");
props.put("basic.auth.user.info", SCHEMAREGISTRYUSER + ":" + SCHEMAREGISTRYPASSWORD);
props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, KafkaAvroDeserializer.class.getName());
props.put(KafkaAvroDeserializerConfig.SPECIFIC_AVRO_READER_CONFIG, true);
props.put(ConsumerConfig.GROUP_ID_CONFIG, "clickrecord-example-group");
```

Replace the placeholders with the values from the
[variables section](#kafka_schema_registry_variables).

<RelatedPages/>

- [Generate Java classes from Avro schemas](/docs/products/kafka/howto/generate-avro-java-classes)
- [Generate Java classes from Protobuf schemas](/docs/products/kafka/howto/generate-protobuf-java-classes)
- [Generate Java classes from JSON Schema](/docs/products/kafka/howto/generate-json-java-classes)
- [Enable schema registry and REST proxy](/docs/products/kafka/karapace/howto/enable-karapace)
- [Karapace](/docs/products/kafka/karapace)
