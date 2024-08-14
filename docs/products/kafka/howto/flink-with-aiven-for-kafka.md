---
title: Use Apache Flink® with Aiven for Apache Kafka®
---

[Apache Flink®](https://flink.apache.org/) is an open-source platform for handling distributed streaming and batch data. It enhances Apache Kafka's® event streaming abilities by offering advanced features for consuming, transforming, aggregating, and enriching data.

:::note
To experience the power of streaming SQL transformations
with Flink, Aiven provides a managed
[Aiven for Apache Flink®](/docs/products/flink) with built-in data
flow integration with Aiven for Apache Kafka®.
:::

The following example demonstrates how to create a simple Java Flink job. This job
reads data from a Apache Kafka topic, processes it,and sends it to another Apache Kafka
topic. It uses the Java API on a
[local installation of Apache Flink 1.16](https://nightlies.apache.org/flink/flink-docs-release-1.16/docs/try-flink/local_installation/). However, the same approach can be applied to use
Aiven for Apache Kafka with any self-hosted cluster.

## Prerequisites {#kafka-flink-java-prereq}

Before you start, make sure you have the following:

- An active **Aiven for Apache Kafka** service with two topics: `test-flink-input` and `test-flink-output`.
  To create topics, see [Create an Apache Kafka topic](/docs/products/kafka/howto/create-topic).
- Gather the following details about your Aiven for Apache Kafka service:
   - `APACHE_KAFKA_HOST`: The hostname of your Apache Kafka service.
   - `APACHE_KAFKA_PORT`: The port number of your Apache Kafka service.
- [**Apache Maven™**](https://maven.apache.org/install.html) installed on your machine
  build the example.

### Setup the truststore and keystore

Create a
[Java keystore and truststore](keystore-truststore) for the Aiven for Apache Kafka service.
For this example, the configuration is as follows:

- The keystore is available at `KEYSTORE_PATH/client.keystore.p12`
- The truststore is available at
  `TRUSTSTORE_PATH/client.truststore.jks`
- For simplicity, use  the same secret (password) for both the
  keystore and the truststore, referred to as `KEY_TRUST_SECRET`

## Use Apache Flink with Aiven for Apache Kafka

The following example shows how to customise the `DataStreamJob`
generated from the
[Quickstart](https://nightlies.apache.org/flink/flink-docs-release-1.19/docs/dev/configuration/overview/)
to work with Aiven for Apache Kafka.

:::note
Find the full code in the
[Aiven examples GitHub repository](https://github.com/aiven/aiven-examples/tree/master/kafka/flink-capitalizer).
:::

1.  Generate a Flink job skeleton named `flink-capitalizer` using the
    Maven archetype:

    ```shell
    mvn archetype:generate -DinteractiveMode=false  \
      -DarchetypeGroupId=org.apache.flink           \
      -DarchetypeArtifactId=flink-quickstart-java   \
      -DarchetypeVersion=1.16.0                     \
      -DgroupId=io.aiven.example                    \
      -DartifactId=flink-capitalizer                \
      -Dpackage=io.aiven.example.flinkcapitalizer   \
      -Dversion=0.0.1-SNAPSHOT
    ```

1.  Uncomment the Kafka connector in \`pom.xml\`:

    ```xml
    <dependency>
      <groupId>org.apache.flink</groupId>
      <artifactId>flink-connector-kafka</artifactId>
      <version>${flink.version}</version>
    </dependency>
    ```

### Customize the `DataStreamJob` application

In the generated code, `DataStreamJob` is the main entry point, and has
already been configured with all of the context necessary to interact
with the cluster for your processing.

1.  Create a class called
    `io.aiven.example.flinkcapitalizer.StringCapitalizer` which performs
    a `MapFunction` transformation on incoming records, emitting every incoming
    string in uppercase.

    ```java
    package io.aiven.example.flinkcapitalizer;

    import org.apache.flink.api.common.functions.MapFunction;

    public class StringCapitalizer implements MapFunction<String, String> {
      public String map(String s) {
        return s.toUpperCase();
      }
    }
    ```

1.  Import the following classes in the `DataStreamJob`

    ```java
    import java.util.Properties;
    import org.apache.flink.api.common.eventtime.WatermarkStrategy;
    import org.apache.flink.api.common.serialization.SimpleStringSchema;
    import org.apache.flink.connector.base.DeliveryGuarantee;
    import org.apache.flink.connector.kafka.sink.KafkaRecordSerializationSchema;
    import org.apache.flink.connector.kafka.sink.KafkaSink;
    import org.apache.flink.connector.kafka.source.KafkaSource;
    import org.apache.flink.connector.kafka.source.enumerator.initializer.OffsetsInitializer;
    ```

1.  Modify the `main` method in `DataStreamJob` to read and write from
    the Apache Kafka topics, replacing the `APACHE_KAFKA_HOST`,
    `APACHE_KAFKA_PORT`, `KEYSTORE_PATH`, `TRUSTSTORE_PATH` and
    `KEY_TRUST_SECRET` placeholders with the values from the
    [prerequisites](/docs/products/kafka/howto/flink-with-aiven-for-kafka#kafka-flink-java-prereq).

    ```java
    public static void main(String[] args) throws Exception {
      final StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

      Properties props = new Properties();
      props.put("security.protocol", "SSL");
      props.put("ssl.keystore.type", "PKCS12");
      props.put("ssl.keystore.location", "KEYSTORE_PATH/client.keystore.p12");
      props.put("ssl.keystore.password", "KEY_TRUST_SECRET");
      props.put("ssl.key.password", "KEY_TRUST_SECRET");
      props.put("ssl.truststore.type", "JKS");
      props.put("ssl.truststore.location", "TRUSTSTORE_PATH/client.truststore.jks");
      props.put("ssl.truststore.password", "KEY_TRUST_SECRET");

      KafkaSource<String> source = KafkaSource.<String>builder()
          .setBootstrapServers("APACHE_KAFKA_HOST:APACHE_KAFKA_PORT")
          .setGroupId("test-flink-input-group")
          .setTopics("test-flink-input")
          .setProperties(props)
          .setStartingOffsets(OffsetsInitializer.earliest())
          .setValueOnlyDeserializer(new SimpleStringSchema())
          .build();

      KafkaSink<String> sink = KafkaSink.<String>builder()
          .setBootstrapServers("APACHE_KAFKA_HOST:APACHE_KAFKA_PORT")
          .setKafkaProducerConfig(props)
          .setRecordSerializer(KafkaRecordSerializationSchema.builder()
              .setTopic("test-flink-output")
              .setValueSerializationSchema(new SimpleStringSchema())
              .build()
          )
          .setDeliverGuarantee(DeliveryGuarantee.AT_LEAST_ONCE)
          .build();

       // ... processing continues here
    }
    ```

1.  Tie the Apache Kafka sources and sinks together with the
    `StringCapitalizer` in a single processing pipeline.

    ```java
    // ... processing continues here
    env
      .fromSource(source, WatermarkStrategy.noWatermarks(), "Kafka Source")
      .map(new StringCapitalizer())
      .sinkTo(sink);
    env.execute("Flink Java capitalizer");
    ```

### Build the application

From the main `flink-capitalizer` folder, execute the following Maven
command to build the application:

```shell
mvn -DskipTests=true clean package
```

The above command should create a `jar` file named
`target/flink-capitalizer-0.0.1-SNAPSHOT.jar`.

### Run the applications

If you have installed a [local cluster installation of Apache Flink
1.16](https://nightlies.apache.org/flink/flink-docs-release-1.19/docs/try-flink/local_installation/),
you can launch the job on your local machine. `$FLINK_HOME` is the Flink
installation directory.

```shell
$FLINK_HOME/bin/flink run target/flink-capitalizer-0.0.1-SNAPSHOT.jar
```

You can see that the job is running in the Flink web UI at
`http://localhost:8081`.

By integrating [Aiven for Apache Flink®](/docs/products/flink) with
Aiven for Apache Kafka®, you can process string events and transform
them to uppercase before forwarding them to the output topic.
