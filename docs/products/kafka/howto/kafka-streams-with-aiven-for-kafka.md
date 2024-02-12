---
title: Use Apache Kafka® Streams with Aiven for Apache Kafka®
---

[Apache Kafka® streams](https://kafka.apache.org/documentation/streams/)
and streams API allows streaming data through the heart of Apache Kafka:
the brokers.

As the data, a key-value structure, enters the brokers, it is serialized
by the streams API to a byte array. The opposite happens when data exits
the brokers, where the streams API de-serializes it back to the original
key-value structure.

Apache Kafka streams also allows data transformation in real-time with
the output feeding another, transformed, stream of data. This makes
Kafka streams a powerful tool for the variety of use cases it can
address in the world of real-time data processing and analysis.

The following article explores how to realize Kafka streams with Aiven
for Apache Kafka and the schema registry functionality offered by
[Karapace](https://karapace.io/).

## Prerequisites {#kafka-streams-prereq}

To use Kafka streams, you need an Aiven for Apache Kafka service up and
running with **Schema Registry (Karapace)** Enabled.

:::note
Enabling **Schema Registry (Karapace)** is needed to make use of the
schema registry features necessary for dealing with messages in Avro
format. If you plan to use JSON format, enabling Schema Registry
(Karapace) might not be necessary.
:::

Two topics named `song-feed` and `play-events` should be created.
Furthermore, for the example, you need to collect the following
information about the Aiven for Apache Kafka service:

-   `APACHE_KAFKA_HOST`: The hostname of the Apache Kafka service
-   `APACHE_KAFKA_PORT`: The port of the Apache Kafka service
-   `SCHEMA_REGISTRY_PORT`: The Apache Kafka's schema registry port,
    only needed when using Avro as data format
-   `SCHEMA_REGISTRY_USER`: The Apache Kafka's schema registry
    username, only needed when using Avro as data format
-   `SCHEMA_REGISTRY_PASSWORD`: The Apache Kafka's schema registry user
    password, only needed when using Avro as data format

:::note
If you're using Aiven for Apache Kafka the above details are available
in the [Aiven console](https://console.aiven.io/) service Overview tab
or via the dedicated `avn service get` command with the
[Aiven CLI](/docs/tools/cli/service-cli#avn_service_get).
:::

The following example assumes you have [Apache
Maven](https://maven.apache.org/index.html) already installed.

## Use Kafka streams with Aiven for Apache Kafka - `KafkaMusicExample`

The following example shows how to customise the `KafkaMusicExample`
available in the [dedicated
repository](https://github.com/confluentinc/kafka-streams-examples) to
work with Aiven for Apache Kafka.

1.  Download the `kafka-streams-examples` sources from GitHub

    ```shell
    git clone https://github.com/confluentinc/kafka-streams-examples.git
    ```

2.  Build the packages using Maven

    ```shell
    cd kafka-streams-examples/
    mvn -DskipTests=true clean package
    ```

### Setup the truststore and keystore {#kafka-streams-keystore-truststore}

Create a
[Java keystore and truststore](keystore-truststore) for the Aiven for Apache Kafka service. For the following
example we assume:

-   The keystore is available at `KEYSTORE_PATH/client.keystore.p12`
-   The truststore is available at
    `TRUSTSTORE_PATH/client.truststore.jks`
-   For simplicity, the same secret (password) is used for both the
    keystore and the truststore, and is shown here as `KEY_TRUST_SECRET`

### Customizing the Java applications

The `KafkaMusicExample` example in the repository is constituted by two
classes under the
`src/main/java/io/confluent/examples/streams/interactivequeries/kafkamusic`
folder:

-   `KafkaMusicExampleDriver.java`: an Apache Kafka producer writing
    messages to a topic named `song-feed`
-   `KafkaMusicExample.java`: a Kafka stream application reading from
    the `song-feed` topic and calculating aggregated metrics

To have the two applications working with Aiven for Apache Kafka we need
to customise the files to use the right endpoints.

### Customize `KafkaMusicExampleDriver.java` {#modify-kafkamusicexampledriverjava}

Starting with the `KafkaMusicExampleDriver.java` follow the steps below:

1.  Add the following dependencies

    ```java
    import org.apache.kafka.clients.CommonClientConfigs;
    import org.apache.kafka.common.config.SslConfigs;
    import java.util.HashMap;
    ```

2.  After the `KafkaMusicExampleDriver` class declaration add the
    following two lines to set the `DEFAULT_BOOTSTRAP_SERVERS` and
    `DEFAULT_SCHEMA_REGISTRY_URL` endpoints replacing the
    `APACHE_KAFKA_HOST`, `APACHE_KAFKA_PORT`, `APACHE_KAFKA_HOST`,
    `SCHEMA_REGISTRY_PORT` placeholders

    ```java
    private static final String DEFAULT_BOOTSTRAP_SERVERS = "APACHE_KAFKA_HOST:APACHE_KAFKA_PORT";
    private static final String DEFAULT_SCHEMA_REGISTRY_URL = "https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT";
    ```

3.  Within the `main` function, replace the `bootstrapServers` and
    `schemaRegistryUrl` default values

    ```java
    final String bootstrapServers = args.length > 1 ? args[1] : DEFAULT_BOOTSTRAP_SERVERS;
    final String schemaRegistryUrl = args.length > 2 ? args[2] : DEFAULT_SCHEMA_REGISTRY_URL;
    ```

4.  Within the `main` function, after the line

    ```java
    props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
    ```

    define the keystore and truststore location and secrets for SSL
    connection, by replacing the placeholders `KEYSTORE_PATH`,
    `TRUSTSTORE_PATH` and `KEY_TRUST_SECRET` with the values set when
    [creating the keystore and truststore](/docs/products/kafka/howto/kafka-streams-with-aiven-for-kafka#kafka-streams-keystore-truststore).

    ```java
    props.put(CommonClientConfigs.SECURITY_PROTOCOL_CONFIG, "SSL");
    props.put(SslConfigs.SSL_TRUSTSTORE_LOCATION_CONFIG, "TRUSTSTORE_PATH/client.truststore.jks");
    props.put(SslConfigs.SSL_TRUSTSTORE_PASSWORD_CONFIG, "KEY_TRUST_SECRET");
    props.put(SslConfigs.SSL_KEYSTORE_TYPE_CONFIG, "PKCS12");
    props.put(SslConfigs.SSL_KEYSTORE_LOCATION_CONFIG, "KEYSTORE_PATH/client.keystore.p12");
    props.put(SslConfigs.SSL_KEYSTORE_PASSWORD_CONFIG, "KEY_TRUST_SECRET");
    props.put(SslConfigs.SSL_KEY_PASSWORD_CONFIG, "KEY_TRUST_SECRET");
    ```

5.  Within the `main` function, replace the line

    ```java
    final Map<String, String> serdeConfig = Collections.singletonMap(
       AbstractKafkaSchemaSerDeConfig.SCHEMA_REGISTRY_URL_CONFIG, schemaRegistryUrl);
    ```

    with the following, creating and configuring the
    `SpecificAvroSerdes` required, passing the schema registry username
    and password and substituting the `SCHEMA_REGISTRY_USER` and
    `SCHEMA_REGISTRY_PASSWORD` placeholders

    ```java
    final Map<String, String> serdeConfig = new HashMap<>();
    serdeConfig.put(AbstractKafkaSchemaSerDeConfig.SCHEMA_REGISTRY_URL_CONFIG, schemaRegistryUrl);
    serdeConfig.put(AbstractKafkaSchemaSerDeConfig.BASIC_AUTH_CREDENTIALS_SOURCE, "USER_INFO");
    serdeConfig.put(AbstractKafkaSchemaSerDeConfig.USER_INFO_CONFIG, "SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD");
    ```

### Customize `KafkaMusicExample.java` {#modifying-kafkamusicexamplejava}

Similar changes need to be performed in the file
`KafkaMusicExample.java`, replacing the placeholders with the connection
parameters fetched in the
[prerequisite phase](/docs/products/kafka/howto/kafka-streams-with-aiven-for-kafka#kafka-streams-prereq).

1.  Add the following dependencies

    ```java
    import org.apache.kafka.clients.CommonClientConfigs;
    import org.apache.kafka.common.config.SslConfigs;
    ```

2.  Change the `DEFAULT_BOOTSTRAP_SERVERS` and
    `DEFAULT_SCHEMA_REGISTRY_URL` endpoints replacing the
    `APACHE_KAFKA_HOST`, `APACHE_KAFKA_PORT`, `APACHE_KAFKA_HOST`,
    `SCHEMA_REGISTRY_PORT` placeholders

    ```java
    private static final String DEFAULT_BOOTSTRAP_SERVERS = "APACHE_KAFKA_HOST:APACHE_KAFKA_PORT";
    private static final String DEFAULT_SCHEMA_REGISTRY_URL = "https://APACHE_KAFKA_HOST:SCHEMA_REGISTRY_PORT";
    ```

3.  Replace the `bootstrapServers` and `schemaRegistryUrl` default
    values

    ```java
    final String bootstrapServers = args.length > 1 ? args[1] : DEFAULT_BOOTSTRAP_SERVERS;
    final String schemaRegistryUrl = args.length > 2 ? args[2] : DEFAULT_SCHEMA_REGISTRY_URL;
    ```

4.  Within the `main` function, replace the line

    ```java
    final KafkaStreams streams = new KafkaStreams(
       buildTopology(singletonMap(AbstractKafkaSchemaSerDeConfig.SCHEMA_REGISTRY_URL_CONFIG, schemaRegistryUrl)),
       streamsConfig(bootstrapServers, restEndpointPort, "/tmp/kafka-streams", restEndpointHostname)
       );
    ```

    with the following, creating and configuring the
    `SpecificAvroSerdes` required, passing the schema registry username
    and password and substituting the `SCHEMA_REGISTRY_USER` and
    `SCHEMA_REGISTRY_PASSWORD` placeholders

    ```java
    final Map<String, String> serdeConfig = new HashMap<>();
    serdeConfig.put(AbstractKafkaSchemaSerDeConfig.SCHEMA_REGISTRY_URL_CONFIG, schemaRegistryUrl);
    serdeConfig.put(AbstractKafkaSchemaSerDeConfig.BASIC_AUTH_CREDENTIALS_SOURCE, "USER_INFO");
    serdeConfig.put(AbstractKafkaSchemaSerDeConfig.USER_INFO_CONFIG, "SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD");

    final KafkaStreams streams = new KafkaStreams(
       buildTopology(serdeConfig),
       streamsConfig(bootstrapServers, restEndpointPort, "/tmp/kafka-streams", restEndpointHostname)
       );
    ```

5.  Within the `streamsConfig` static function, after the line

    ```java
    streamsConfiguration.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
    ```

    define the keystore and truststore location and secrets for SSL
    connection, by replacing the placeholders `KEYSTORE_PATH`,
    `TRUSTSTORE_PATH` and `KEY_TRUST_SECRET` with the values set when
    [creating the keystore and truststore](/docs/products/kafka/howto/kafka-streams-with-aiven-for-kafka#kafka-streams-keystore-truststore).

    ```java
    streamsConfiguration.put(CommonClientConfigs.SECURITY_PROTOCOL_CONFIG, "SSL");
    streamsConfiguration.put(SslConfigs.SSL_TRUSTSTORE_LOCATION_CONFIG, "TRUSTSTORE_PATH/client.truststore.jks");
    streamsConfiguration.put(SslConfigs.SSL_TRUSTSTORE_PASSWORD_CONFIG, "KEY_TRUST_SECRET");
    streamsConfiguration.put(SslConfigs.SSL_KEYSTORE_TYPE_CONFIG, "PKCS12");
    streamsConfiguration.put(SslConfigs.SSL_KEYSTORE_LOCATION_CONFIG, "KEYSTORE_PATH/client.keystore.p12");
    streamsConfiguration.put(SslConfigs.SSL_KEYSTORE_PASSWORD_CONFIG, "KEY_TRUST_SECRET");
    streamsConfiguration.put(SslConfigs.SSL_KEY_PASSWORD_CONFIG, "KEY_TRUST_SECRET");
    ```

### Build the applications

From the main `kafka-streams-examples` folder, execute the following
Maven command to build the applications:

```shell
mvn -DskipTests=true clean package
```

The above command should create a `jar` file named
`kafka-streams-examples-<VERSION>-standalone.jar` under the `target`
folder, where `<VERSION>` depends on the repository release number. When
using the `7.00` release the file name would be
`kafka-streams-examples-7.0.0-standalone.jar`.

### Run the applications

To run the applications in parallel you need to have two terminal
sessions pointing at the main `kafka-streams-examples` folder.

From the first terminal session you can start the
`KafkaMusicExampleDriver` producer with:

```shell
java -cp ./target/kafka-streams-examples-7.0.0-standalone.jar \
   io.confluent.examples.streams.interactivequeries.kafkamusic.KafkaMusicExampleDriver
```

Check the target folder of your project and change the version of the
command if necessary.

From the second terminal session you can start the `KafkaMusicExample`
Kafka streams application with:

```shell
java -cp ./target/kafka-streams-examples-7.0.0-standalone.jar \
   io.confluent.examples.streams.interactivequeries.kafkamusic.KafkaMusicExample 7070
```

Change the port number 7070 to the actual Kafka Rest port of your Aiven
for Apache Kafka service.

### Check the produced data

The results of the running applications are available by running the
following `curl` commands (and optionally `jq` to beautify the JSON
output):

-   Get the latest top five across all genres

    ```
    curl http://localhost:7070/kafka-music/charts/top-five | jq
    ```

-   Get the latest top five for the genre `punk`

    ```
    curl http://localhost:7070/kafka-music/charts/genre/punk | jq
    ```

More information for further customisations is available in the [source
GitHub
repository](https://github.com/confluentinc/kafka-streams-examples).
