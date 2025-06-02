---
title: Connect to Aiven for Apache Kafka® with Java
---
import ConsoleLabel from "@site/src/components/ConsoleIcons"

You can connect to an Aiven for Apache Kafka® service using the Java client library for Apache Kafka.

The examples below show different authentication options: SSL, SASL-SSL, schema
registry-based authentication. For more details,
see [Authentication types](/docs/products/kafka/concepts/auth-types).

## Prerequisites

Before you begin:

1. Add the `kafka-clients` dependency to your Java project from your preferred artifact
   repository, such as [Maven Central](https://maven.apache.org/index.html).

1. In the Aiven Console, go to the <ConsoleLabel name="overview"/> page of your
   Aiven for Apache Kafka service and choose your authentication method:

   **SSL authentication**
   - In the **Connection information** section:
     - Set **Authentication method** to **Client certificate** (if available).
     - Download:
       - `service.key` (Access key)
       - `service.cert` (Access certificate)
       - `ca.pem` (CA certificate)
   - [Create the keystore and truststore](/docs/products/kafka/howto/keystore-truststore):
     - `client.keystore.p12`
     - `client.truststore.jks`

   **SASL authentication**
   - [Enable SASL](/docs/products/kafka/howto/kafka-sasl-auth) for your Kafka service.
   - In the **Connection information** section:
     - Set **Authentication method** to **SASL**.
     - Download `ca.pem` (CA certificate).
     - Note the **Password** for SASL authentication.

:::warning
The examples below show only the filenames for the keystore and truststore files.
In production environments, use the full file paths.
:::

## Variables

| Variable   | Description |
|------------|-------------|
| `{HOST}` | Hostname of your Kafka service |
| `{USER_NAME}` | Username for SASL or Schema Registry authentication |
| `{SSL_PORT}` | SSL port for your Kafka service |
| `{SASL_PORT}` | SASL port for your Kafka service |
| `{SASL_PASSWORD}` | Password for SASL authentication |
| `{KEYSTORE_LOCATION}` | Path to your `client.keystore.p12` file |
| `{TRUSTSTORE_LOCATION}` | Path to your `client.truststore.jks` file |
| `{KEYSTORE_PASSWORD}` | Password for the keystore |
| `{KEY_PASSWORD}` | Password for the private key (if different from keystore password) |
| `{TRUSTSTORE_PASSWORD}` | Password for the truststore |
| `{SCHEMA_REGISTRY_URL}` | URL of the Schema Registry |
| `{SCHEMA_REGISTRY_USER}` | Username for Schema Registry authentication |
| `{SCHEMA_REGISTRY_PASS}` | Password for Schema Registry authentication |


## Connect a producer

Set up properties to connect to the Kafka cluster and create a producer.

### With SSL authentication

```java
Properties properties = new Properties();
properties.put("bootstrap.servers", "{HOST}:{SSL_PORT}");
properties.put("security.protocol", "SSL");
properties.put("ssl.keystore.type", "PKCS12");
properties.put("ssl.keystore.location", "{KEYSTORE_LOCATION}");
properties.put("ssl.keystore.password", "{KEYSTORE_PASSWORD}");
properties.put("ssl.key.password", "{KEY_PASSWORD}");
properties.put("ssl.truststore.type", "JKS");
properties.put("ssl.truststore.location", "{TRUSTSTORE_LOCATION}");
properties.put("ssl.truststore.password", "{TRUSTSTORE_PASSWORD}");

// Create a producer with StringSerializer for key and value
KafkaProducer<String, String> producer = new KafkaProducer<>(properties, new StringSerializer(), new StringSerializer());
```

### With SASL authentication

```java
String sasl_username = "{USER_NAME}";
String sasl_password = "{SASL_PASSWORD}";
String jaasTemplate = "org.apache.kafka.common.security.scram.ScramLoginModule required username=\"%s\" password=\"%s\";";
String jaasConfig = String.format(jaasTemplate, sasl_username, sasl_password);

Properties properties = new Properties();
properties.put("bootstrap.servers", "{HOST}:{SASL_PORT}");
properties.put("security.protocol", "SASL_SSL");
properties.put("sasl.mechanism", "SCRAM-SHA-256");
properties.put("sasl.jaas.config", jaasConfig);
properties.put("ssl.truststore.type", "JKS");
properties.put("ssl.truststore.location", "{TRUSTSTORE_LOCATION}");
properties.put("ssl.truststore.password", "{TRUSTSTORE_PASSWORD}");

// Create a producer with StringSerializer for key and value
KafkaProducer<String, String> producer = new KafkaProducer<>(properties, new StringSerializer(), new StringSerializer());
```

### With Schema Registry (Karapace)

```java
Properties properties = new Properties();
properties.put("bootstrap.servers", "{HOST}:{SSL_PORT}");
properties.put("security.protocol", "SSL");
properties.put("ssl.keystore.type", "PKCS12");
properties.put("ssl.keystore.location", "{KEYSTORE_LOCATION}");
properties.put("ssl.keystore.password", "{KEYSTORE_PASSWORD}");
properties.put("ssl.key.password", "{KEY_PASSWORD}");
properties.put("ssl.truststore.type", "JKS");
properties.put("ssl.truststore.location", "{TRUSTSTORE_LOCATION}");
properties.put("ssl.truststore.password", "{TRUSTSTORE_PASSWORD}");

// Configure Schema Registry-specific properties
properties.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
properties.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, KafkaAvroSerializer.class.getName());
properties.setProperty("basic.auth.credentials.source", "USER_INFO");
properties.setProperty("schema.registry.basic.auth.user.info", "{SCHEMA_REGISTRY_USER}:{SCHEMA_REGISTRY_PASS}");
properties.setProperty("auto.register.schemas", "false");
properties.put(KafkaAvroSerializerConfig.SCHEMA_REGISTRY_URL_CONFIG, "{SCHEMA_REGISTRY_URL}");

// Create a producer with String key and Avro value
KafkaProducer<String, GenericRecord> producer = new KafkaProducer<>(properties);

// Define schema
String valueSchemaString = "{\"type\": \"record\", \"name\": \"simple\"," +
    "\"namespace\": \"example.avro\", " +
    "\"fields\": [{\"name\": \"name\", \"type\": \"string\"}]}";
Schema avroValueSchema = new Schema.Parser().parse(valueSchemaString);

// Produce a record
GenericRecord thisValueRecord = new GenericData.Record(avroValueSchema);
thisValueRecord.put("name", "Alice");
producer.send(new ProducerRecord<>("your-topic", "key", thisValueRecord));
```

## Connect a consumer

Set up properties to connect to the Kafka cluster and create a consumer.

### With SSL authentication

```java
String group_id = "groupid";

Properties properties = new Properties();
properties.put("bootstrap.servers", "{HOST}:{SSL_PORT}");
properties.put("security.protocol", "SSL");
properties.put("ssl.keystore.type", "PKCS12");
properties.put("ssl.keystore.location", "{KEYSTORE_LOCATION}");
properties.put("ssl.keystore.password", "{KEYSTORE_PASSWORD}");
properties.put("ssl.key.password", "{KEY_PASSWORD}");
properties.put("ssl.truststore.type", "JKS");
properties.put("ssl.truststore.location", "{TRUSTSTORE_LOCATION}");
properties.put("ssl.truststore.password", "{TRUSTSTORE_PASSWORD}");
properties.put("group.id", group_id);

// Create a consumer with StringDeserializer
KafkaConsumer<String, String> consumer = new KafkaConsumer<>(properties, new StringDeserializer(), new StringDeserializer());
```

### With SASL authentication

```java
String group_id = "groupid";
String sasl_username = "{USER_NAME}";
String sasl_password = "{SASL_PASSWORD}";
String jaasTemplate = "org.apache.kafka.common.security.scram.ScramLoginModule required username=\"%s\" password=\"%s\";";
String jaasConfig = String.format(jaasTemplate, sasl_username, sasl_password);

Properties properties = new Properties();
properties.put("bootstrap.servers", "{HOST}:{SASL_PORT}");
properties.put("security.protocol", "SASL_SSL");
properties.put("sasl.mechanism", "SCRAM-SHA-256");
properties.put("sasl.jaas.config", jaasConfig);
properties.put("ssl.truststore.type", "JKS");
properties.put("ssl.truststore.location", "{TRUSTSTORE_LOCATION}");
properties.put("ssl.truststore.password", "{TRUSTSTORE_PASSWORD}");
properties.put("group.id", group_id);

// Create a consumer with StringDeserializer
KafkaConsumer<String, String> consumer = new KafkaConsumer<>(properties, new StringDeserializer(), new StringDeserializer());
```

### With Schema Registry (Karapace)

```java
String group_id = "groupid";

Properties properties = new Properties();
properties.put("bootstrap.servers", "{HOST}:{SSL_PORT}");
properties.put("security.protocol", "SSL");
properties.put("ssl.keystore.type", "PKCS12");
properties.put("ssl.keystore.location", "{KEYSTORE_LOCATION}");
properties.put("ssl.keystore.password", "{KEYSTORE_PASSWORD}");
properties.put("ssl.key.password", "{KEY_PASSWORD}");
properties.put("ssl.truststore.type", "JKS");
properties.put("ssl.truststore.location", "{TRUSTSTORE_LOCATION}");
properties.put("ssl.truststore.password", "{TRUSTSTORE_PASSWORD}");
properties.put("group.id", group_id);

// Configure Schema Registry-specific properties
properties.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
properties.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, KafkaAvroDeserializer.class.getName());
properties.setProperty("basic.auth.credentials.source", "USER_INFO");
properties.setProperty("schema.registry.basic.auth.user.info", "{SCHEMA_REGISTRY_USER}:{SCHEMA_REGISTRY_PASS}");
properties.put(KafkaAvroSerializerConfig.SCHEMA_REGISTRY_URL_CONFIG, "{SCHEMA_REGISTRY_URL}");

// Create a consumer with String key and Avro value
KafkaConsumer<String, GenericRecord> consumer = new KafkaConsumer<>(properties);

// Process records
ConsumerRecords<String, GenericRecord> records = consumer.poll(Duration.ofMillis(100));
```
