---
title: Generate Java data classes from Avro schemas
sidebar_label: Avro schema
---

import RelatedPages from "@site/src/components/RelatedPages";

Generate Java data classes from Avro schema files (`.avsc`) to use with Apache Kafka® producers and consumers. Use the `avro-tools` JAR to create Java classes that match your schema structure.

## Prerequisites

- An active [Aiven for Apache Kafka® service](/docs/products/kafka/get-started#create-an-aiven-for-apache-kafka-service)
- [Karapace Schema Registry](/docs/products/kafka/karapace/concepts/schema-registry-authorization)
  enabled
- Java (JDK 8 or later)
- [Apache Maven](https://maven.apache.org/) installed to manage dependencies
- [`avro-tools`](https://avro.apache.org/releases.html) JAR file downloaded (such
  as `avro-tools-1.12.0.jar`)
- An Avro schema file with a `.avsc` extension

  :::note
  You can also use `.json` files if they contain a valid Avro schema. Do not
  use `.avro` files. They include both schema and data and are not compatible with `avro-tools`.
  :::

## Generate the Java class

Run the following command to generate Java classes from your Avro schema:

```bash
java -jar avro-tools-1.12.0.jar compile schema src/main/resources/user-value.avsc src/main/java/
```

- Replace `user-value.avsc` with your schema file.
- Replace `src/main/java/` with your preferred output directory.

The generated class is named based on the `name` field in your schema, and it is placed
in a subdirectory matching the `namespace`.

:::note
Do not rename the generated class or change its package declaration. Kafka serialization
depends on the original name and namespace in the schema.
:::

## Example schema

```json
{
  "type": "record",
  "name": "User",
  "namespace": "io.aiven.example",
  "fields": [
    { "name": "id", "type": "int" },
    { "name": "email", "type": "string" }
  ]
}
```

This schema produces the following file:

```plaintext
src/main/java/io/aiven/example/User.java
```

## Add Maven dependencies

Add these dependencies to your `pom.xml` to compile and use the generated classes for
Avro serialization and deserialization in Kafka producers and consumers.

```xml
<dependencies>
  <!-- Apache Kafka client dependency -->
  <dependency>
    <groupId>org.apache.kafka</groupId>
    <artifactId>kafka-clients</artifactId>
    <version>3.8.1</version>
  </dependency>

  <!-- Confluent dependencies for Avro serialization and Schema Registry -->
  <dependency>
    <groupId>io.confluent</groupId>
    <artifactId>kafka-avro-serializer</artifactId>
    <version>8.0.0</version>
  </dependency>
  <dependency>
    <groupId>io.confluent</groupId>
    <artifactId>kafka-schema-registry-client</artifactId>
    <version>8.0.0</version>
  </dependency>

  <!-- Apache Avro dependency -->
  <dependency>
    <groupId>org.apache.avro</groupId>
    <artifactId>avro</artifactId>
    <version>1.12.0</version>
  </dependency>
</dependencies>
```

:::note
Ensure that the versions of Avro, Kafka, and Confluent dependencies are compatible
with each other and with your Kafka setup.
:::

### Optional dependencies

You can use additional libraries depending on your schema or Avro usage:

```xml
<!-- Jackson support for Java 8 types (used with generated POJOs) -->
<dependency>
  <groupId>com.fasterxml.jackson.datatype</groupId>
  <artifactId>jackson-datatype-jdk8</artifactId>
  <version>2.19.2</version>
</dependency>

<!-- Guava support (used in some Avro-related tooling) -->
<dependency>
  <groupId>com.google.guava</groupId>
  <artifactId>guava</artifactId>
  <version>33.4.8-jre</version>
</dependency>
```

These dependencies are optional. Include them only if your generated classes use
features like `Optional<T>` fields (Jackson) or `ImmutableList` and `ImmutableSet`
types (Guava).

<RelatedPages />

[Official Avro Java Getting Started Guide](https://avro.apache.org/docs/1.12.0/getting-started-java/)
