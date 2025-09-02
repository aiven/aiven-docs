---
title: Generate Java data classes from JSON schemas
sidebar_label: JSON schema
---

import RelatedPages from "@site/src/components/RelatedPages";

Generate Java data classes from JSON Schema (`.json`) files for use in Apache Kafka® applications. Use the `jsonschema2pojo` CLI tool to generate Java classes that match your schema structure.

## Prerequisites

- An active [Aiven for Apache Kafka® service](/docs/products/kafka/get-started#create-an-aiven-for-apache-kafka-service)
- [Karapace Schema Registry](/docs/products/kafka/karapace/howto/enable-karapace)
  enabled
- Java (JDK 8 or later)
- [Apache Maven](https://maven.apache.org/) installed to manage dependencies
- [`jsonschema2pojo`](https://github.com/joelittlejohn/jsonschema2pojo) installed
- A JSON Schema file (`.json`)

## Generate the Java class

Generate Java classes from your JSON schema file using the `jsonschema2pojo` CLI:

```bash
jsonschema2pojo --source src/main/resources/schema.json --target src/main/java/
```

- Replace `schema.json` with your schema file.
- Replace `src/main/java/` with your preferred output directory.

The generated Java class is placed in a subdirectory based on the `javaType` field in the
schema. If `javaType` is not defined, the output directory is based on the schema title
or the folder structure.

Make sure the `package` declaration in the generated Java file matches your
project’s structure. Kafka serialization depends on consistent class names and packages.

## Example schema

```json
{
  "type": "object",
  "title": "User",
  "javaType": "io.aiven.example.User",
  "properties": {
    "id": { "type": "integer" },
    "email": { "type": "string" }
  },
  "required": ["id", "email"]
}
```

This schema generates the following Java file:

```plaintext
src/main/java/io/aiven/example/User.java
```

## Optional: Add Confluent schema annotation

To support additional features in Confluent-compatible deserializers (such as Karapace, Aiven’s Schema Registry), you can add this annotation to your JSON Schema:

```json
"@io.confluent.kafka.schemaregistry.annotations.Schema": {
  "value": "{...your schema as a string...}",
  "refs": []
}
```

This annotation allows Confluent-compatible deserializers, such
as [Karapace](/docs/products/kafka/karapace/concepts/schema-registry-authorization),
to expose runtime methods like `schema()` and `refs()` in the generated Java class.

Use this only for advanced use cases that require schema introspection at runtime.

## Add Maven dependencies

Add these dependencies to your `pom.xml` to compile and use the generated classes with
JSON Schema and Kafka:

```xml
<dependencies>
  <!-- Apache Kafka client dependency -->
  <dependency>
    <groupId>org.apache.kafka</groupId>
    <artifactId>kafka-clients</artifactId>
    <version>3.8.1</version>
  </dependency>

  <!-- Confluent dependency for JSON Schema serialization -->
  <dependency>
    <groupId>io.confluent</groupId>
    <artifactId>kafka-json-schema-serializer</artifactId>
    <version>8.0.0</version>
  </dependency>

  <!-- Core Jackson library for JSON binding -->
  <dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.19.2</version>
  </dependency>
</dependencies>
```

### Optional dependencies

Depending on your schema complexity or tooling, you might also need these:

```xml
<!-- Jackson support for Java 8 types -->
<dependency>
  <groupId>com.fasterxml.jackson.datatype</groupId>
  <artifactId>jackson-datatype-jdk8</artifactId>
  <version>2.19.2</version>
</dependency>

<!-- Jackson support for Java time (JSR-310) -->
<dependency>
  <groupId>com.fasterxml.jackson.datatype</groupId>
  <artifactId>jackson-datatype-jsr310</artifactId>
  <version>2.19.2</version>
</dependency>

<!-- JSON Schema validation -->
<dependency>
  <groupId>com.github.erosb</groupId>
  <artifactId>everit-json-schema</artifactId>
  <version>1.14.6</version>
</dependency>
```

These optional dependencies support features like Java 8 types, JSR-310 date/time classes,
and schema validation. Add them only if your schema or generated class uses these
features.

<RelatedPages />

[jsonschema2pojo CLI reference](https://github.com/joelittlejohn/jsonschema2pojo/wiki/Getting-Started#the-command-line-interface)
