---
title: Generate Java data classes from Protobuf schemas
sidebar_label: Protobuf schema
---

import RelatedPages from "@site/src/components/RelatedPages";

Generate Java data classes from Protocol Buffers (`.proto`) schema files for use in Apache Kafka® producers and consumers. Use the `protoc` compiler to generate Java classes that match your schema structure.

## Prerequisites

- An active [Aiven for Apache Kafka® service](/docs/products/kafka/get-started#create-an-aiven-for-apache-kafka-service)
- [Karapace Schema Registry](/docs/products/kafka/karapace/howto/enable-karapace)
  enabled
- Java (JDK 8 or later)
- [Apache Maven](https://maven.apache.org/) installed to manage dependencies
- [`protoc`](https://grpc.io/docs/protoc-installation/) compiler installed
- A Protobuf schema file (`.proto`)

## Generate the Java class

Generate Java classes from your Protobuf schema file using the `protoc` CLI:

```bash
protoc -I=. --java_out=src/main/java/ src/main/resources/example.proto
```

- Replace `example.proto` with your Protobuf schema file.
- Replace `src/main/java/` with your preferred output directory.

The generated class is placed inside a directory that matches the `package` declaration
in your `.proto` file. Ensure the `package` in your `.proto` file matches your intended
Java package structure.

:::note
If your `.proto` file does not define a `package`, you may need to update the package
declaration in the generated Java file so it matches your project's structure.
Kafka serialization depends on the fully qualified class name.
:::

## Example schema

```protobuf
syntax = "proto3";

package io.aiven.example;

message User {
  int32 id = 1;
  string email = 2;
}
```

This schema produces the following file:

```plaintext
src/main/java/io/aiven/example/User.java
```

## Add Maven dependencies

Add these dependencies to your `pom.xml` to compile and use the generated classes for
Protobuf serialization and deserialization in Kafka producers and consumers.

```xml
<dependencies>
  <!-- Apache Kafka client dependency -->
  <dependency>
    <groupId>org.apache.kafka</groupId>
    <artifactId>kafka-clients</artifactId>
    <version>3.8.1</version>
  </dependency>

  <!-- Confluent dependencies for Protobuf serialization and Schema Registry -->
  <dependency>
    <groupId>io.confluent</groupId>
    <artifactId>kafka-protobuf-serializer</artifactId>
    <version>8.0.0</version>
  </dependency>
  <dependency>
    <groupId>io.confluent</groupId>
    <artifactId>kafka-schema-registry-client</artifactId>
    <version>8.0.0</version>
  </dependency>

  <!-- Protobuf core library -->
  <dependency>
    <groupId>com.google.protobuf</groupId>
    <artifactId>protobuf-java</artifactId>
    <version>4.32.0</version>
  </dependency>
</dependencies>
```

### Optional dependencies

You can also use these optional dependencies depending on your use case:

```xml
<!-- Support for Protobuf well-known types (e.g., Timestamp, Struct) -->
<dependency>
  <groupId>io.confluent</groupId>
  <artifactId>kafka-protobuf-types</artifactId>
  <version>8.0.0</version>
</dependency>

<!-- Provider for advanced Protobuf schema features -->
<dependency>
  <groupId>io.confluent</groupId>
  <artifactId>kafka-protobuf-provider</artifactId>
  <version>8.0.0</version>
</dependency>
```

These dependencies are optional. Use them if your schema includes well-known Protobuf
types or if you use advanced features in Confluent’s Protobuf support.

<RelatedPages />

[Protobuf Compiler Installation](https://grpc.io/docs/protoc-installation/)
