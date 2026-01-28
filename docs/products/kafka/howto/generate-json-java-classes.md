---
title: Generate Java data classes from JSON schemas
sidebar_label: JSON schema
---

import RelatedPages from "@site/src/components/RelatedPages";

Generate Java data classes from JSON Schema (`.json`) files for use in Apache Kafka® applications. Use the `jsonschema2pojo` CLI tool to generate Java classes that match your schema structure.

## Prerequisites

- An active [Aiven for Apache Kafka® service](/docs/products/kafka/get-started/create-kafka-service)
- [Karapace Schema Registry](/docs/products/kafka/karapace/howto/enable-karapace)
  enabled
- Java (JDK 8 or later)
- [Apache Maven](https://maven.apache.org/) installed to manage dependencies
- [`jsonschema2pojo`](https://github.com/joelittlejohn/jsonschema2pojo) installed
- A JSON Schema file (`.json`)

## Generate the Java classes

Generate Java classes from your JSON schema file using the `jsonschema2pojo` CLI:

```bash
jsonschema2pojo --source src/main/resources/schema.json --target src/main/java/
```

- Replace `schema.json` with your schema file.
- Replace `src/main/java/` with your preferred output directory.

:::note
Use the `--package` option to specify the Java package during code generation.
Kafka serialization depends on the fully
qualified class name.

For example:

```bash
jsonschema2pojo \
  --source src/main/resources/users.json \
  --target src/main/java/io/aiven/example \
  --package io.aiven.example
```

:::

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

To enable additional features in Confluent’s deserializers (which are compatible
with schema registries like
[Karapace](/docs/products/kafka/karapace/concepts/schema-registry-authorization)), you
can add this annotation to your JSON Schema:

```json
"@io.confluent.kafka.schemaregistry.annotations.Schema": {
  "value": "{...your schema as a string...}",
  "refs": []
}
```

This annotation makes runtime methods such as `schema()` and `refs()` available in
the generated Java classes.

Use this only for advanced use cases that require schema introspection at runtime.

## Add Maven dependencies

Add these dependencies to your `pom.xml` to compile and use the generated classes for
JSON Schema serialization and deserialization in Kafka producers and consumers.

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
