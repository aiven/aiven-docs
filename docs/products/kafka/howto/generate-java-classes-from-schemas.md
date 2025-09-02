---
title: Generate Java classes from schemas
---

Generate Java classes from Avro, Protobuf, or JSON Schema files to use with Apache Kafka® and [Karapace Schema Registry](/docs/products/kafka/karapace/concepts/schema-registry-authorization).
These classes match your schema structure and help serialize and deserialize messages
with the correct data types.

## When to generate data classes

Generate data classes if you:

- Work with schema-based formats such as Avro, Protobuf, or JSON Schema
- Want strongly typed Kafka producers and consumers
- Use Karapace as your Schema Registry
- Prefer Java classes over generic records or raw values

## Prerequisites

- An active [Aiven for Apache Kafka® service](/docs/products/kafka/get-started)
- [Karapace Schema Registry enabled](/docs/products/kafka/karapace/howto/enable-karapace)
- Java (JDK 8 or later)
- [Apache Maven](https://maven.apache.org/) installed
- A schema file in one of these formats:
  - Avro (`.avsc`)
  - Protobuf (`.proto`)
  - JSON Schema (`.json`)

## Next steps

See schema-specific instructions:

- [Generate Avro Java classes with avro-tools](/docs/products/kafka/howto/generate-avro-java-classes)
- [Generate Protobuf Java classes with protoc](/docs/products/kafka/howto/generate-protobuf-java-classes)
- [Generate JSON Schema Java classes with jsonschema2pojo](/docs/products/kafka/howto/generate-json-java-classes)

After generating your classes,
[use them with Kafka and the schema registry](/docs/products/kafka/howto/schema-registry)
to produce and consume messages.
