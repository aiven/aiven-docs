---
title: Use schema registry in Java with Aiven for Apache Kafka®
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"
import RelatedPages from "@site/src/components/RelatedPages";

Aiven for Apache Kafka® provides schema registry functionality through [Karapace](https://github.com/aiven/karapace). Karapace lets you store, retrieve, and evolve schemas without rebuilding producer or consumer code.

## Workflow overview

To produce and consume Avro messages in Java using the schema registry:

1. Define your schema.
1. Generate Java classes from the schema.
1. Add the required dependencies.
1. Create a keystore and truststore.
1. Configure your Kafka producer and consumer properties.

## Prerequisites

To connect a Java application to an Aiven for Apache Kafka service using the schema
registry:

<Tabs groupId="group1">
<TabItem value="console" label="Aiven Console" default>

- Running **Aiven for Apache Kafka** service
- [Karapace Schema Registry enabled](/docs/products/kafka/howto/enable-karapace/)
- [Keystore and truststore files](/docs/tools/keystore-truststore) for SSL authentication

</TabItem> <TabItem value="cli" label="Aiven CLI">

Generate the keystore and truststore using the Aiven CLI:

```bash
avn service user-kafka-java-creds \
  --project <project-name> \
  --service <service-name> \
  --username <user>
```

</TabItem>
</Tabs>

## Variables {#kafka_schema_registry_variables}

Replace the following placeholders in the example configuration:

| Variable                 | Description                                                                 |
|--------------------------|-----------------------------------------------------------------------------|
| `BOOTSTRAPSERVERS`       | Kafka service URI. Available in Connection information on the service overview page in the Aiven Console. |
| `KEYSTORE`               | Path to the keystore file                                                   |
| `KEYSTOREPASSWORD`       | Password for the keystore                                                   |
| `TRUSTSTORE`             | Path to the truststore file                                                 |
| `TRUSTSTOREPASSWORD`     | Password for the truststore                                                 |
| `SSLKEYPASSWORD`         | Password for the private key in the keystore                                |
| `SCHEMAREGISTRYURL`      | Schema Registry URI. Available in Connection information on the service overview page in the Aiven Console. |
| `SCHEMAREGISTRYUSER`     | Schema Registry username. Available in Connection information on the service overview page in the Aiven Console. |
| `SCHEMAREGISTRYPASSWORD` | Schema Registry password. Available in Connection information on the service overview page in the Aiven Console. |
| `TOPIC_NAME`             | Kafka topic name                                                            |

### Define the schema

Create an Avro schema file. For example, save the following schema in a file
named `ClickRecord.avsc`

```json
{"type": "record",
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

This schema defines a record named `ClickRecord` in the namespace `io.aiven.avro.example`
with fields `session_id`, `browser`, `campaign`, `channel`, `referrer` and `ip` and
related data types.

Once the schema is defined, compile it either **manually** or **automatically**.

To generate Java classes from Avro, Protobuf, or JSON Schema files, see
[Generate Java classes from schemas](/docs/products/kafka/howto/Generate-java-pojo-schemas).

### Manual schema compilation

To compile manually, download`avro-tools-1.11.0.jar` from
[https://avro.apache.org/releases.html](https://avro.apache.org/releases.html) or
fetch it using Maven:

```
mvn org.apache.maven.plugins:maven-dependency-plugin:2.8:get -Dartifact=org.apache.avro:avro-tools:1.11.0:jar -Ddest=avro-tools-1.11.0.jar
```

To compile the schema and generate a Java class, run:

```
java -jar avro-tools-1.11.0.jar compile schema ClickRecord.avsc .
```

This generates a Java file named `ClickRecord.java` in a subdirectory that matches
the `namespace` defined in your schema (for example, `io.aiven.avro.example`).
The required package structure is created automatically if it does not already exist.

### Automatic schema compilation

With auto, the schema is compiled during the project build with, for
example, `maven-avro-plugin` or `gradle-avro-plugin`. The following is a
configuration example for `maven-avro-plugin` when `ClickRecord.avsc` is
stored in the path `src/main/avro/ClickRecord.avsc`:

To compile the schema during the build process, use
the `avro-maven-plugin` or `gradle-avro-plugin`. The following is an example
Maven configuration:

```xml
<plugin>
  <groupId>org.apache.avro</groupId>
  <artifactId>avro-maven-plugin</artifactId>
  <version>1.11.0</version>
  <executions>
    <execution>
      <id>schemas</id>
      <phase>generate-sources</phase>
      <goals>
        <goal>schema</goal>
        <goal>protocol</goal>
        <goal>idl-protocol</goal>
      </goals>
      <configuration>
        <sourceDirectory>${project.basedir}/src/main/avro/</sourceDirectory>
        <outputDirectory>${project.basedir}/src/main/generated-sources/</outputDirectory>
      </configuration>
    </execution>
  </executions>
</plugin>

```

The generated files will be placed in the `generated-sources` folder.

### Configure producer and consumer properties

For complete example code that shows how to create producers and consumers using the
Schema Registry with Aiven for Apache Kafka, see
the [Aiven examples GitHub repository](https://github.com/aiven/aiven-examples/tree/master/solutions/kafka-schema-registry).

The following sections list the required configuration properties.

#### Producer configuration

```java
props.put(CommonClientConfigs.BOOTSTRAP_SERVERS_CONFIG, [BOOTSTRAPSERVERS]);
props.put(CommonClientConfigs.SECURITY_PROTOCOL_CONFIG, "SSL");
props.put(SslConfigs.SSL_TRUSTSTORE_LOCATION_CONFIG, [TRUSTSTORE]);
props.put(SslConfigs.SSL_TRUSTSTORE_PASSWORD_CONFIG, [TRUSTSTOREPASSWORD]);
props.put(SslConfigs.SSL_KEYSTORE_TYPE_CONFIG, "PKCS12");
props.put(SslConfigs.SSL_KEYSTORE_LOCATION_CONFIG, [KEYSTORE]);
props.put(SslConfigs.SSL_KEYSTORE_PASSWORD_CONFIG, [KEYSTOREPASSWORD]);
props.put(SslConfigs.SSL_KEY_PASSWORD_CONFIG, [SSLKEYPASSWORD]);
props.put("schema.registry.url", [SCHEMAREGISTRYURL]);
props.put("basic.auth.credentials.source", "USER_INFO");
props.put("basic.auth.user.info", [SCHEMAREGISTRYUSER] + ":" + [SCHEMAREGISTRYPASSWORD]);
props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, KafkaAvroSerializer.class.getName());
```

#### Consumer configuration

```java
props.put(CommonClientConfigs.BOOTSTRAP_SERVERS_CONFIG, [BOOTSTRAPSERVERS]);
props.put(CommonClientConfigs.SECURITY_PROTOCOL_CONFIG, "SSL");
props.put(SslConfigs.SSL_TRUSTSTORE_LOCATION_CONFIG, [TRUSTSTORE]);
props.put(SslConfigs.SSL_TRUSTSTORE_PASSWORD_CONFIG, [TRUSTSTOREPASSWORD]);
props.put(SslConfigs.SSL_KEYSTORE_TYPE_CONFIG, "PKCS12");
props.put(SslConfigs.SSL_KEYSTORE_LOCATION_CONFIG, [KEYSTORE]);
props.put(SslConfigs.SSL_KEYSTORE_PASSWORD_CONFIG, [KEYSTOREPASSWORD]);
props.put(SslConfigs.SSL_KEY_PASSWORD_CONFIG, [SSLKEYPASSWORD]);
props.put("schema.registry.url", [SCHEMAREGISTRYURL]);
props.put("basic.auth.credentials.source", "USER_INFO");
props.put("basic.auth.user.info", [SCHEMAREGISTRYUSER] + ":" + [SCHEMAREGISTRYPASSWORD]);
props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, KafkaAvroDeserializer.class.getName());
props.put(KafkaAvroDeserializerConfig.SPECIFIC_AVRO_READER_CONFIG, true);
props.put(ConsumerConfig.GROUP_ID_CONFIG, "clickrecord-example-group");
```

Replace the placeholders with the values from the
[variables section](/docs/products/kafka/howto/schema-registry#kafka_schema_registry_variables).
