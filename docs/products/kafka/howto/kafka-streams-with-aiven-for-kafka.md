---
title: Use Apache Kafka® Streams with Aiven for Apache Kafka®
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[Apache Kafka® Streams](https://kafka.apache.org/documentation/streams/) is a client side library for building real time applications where the input and/or output data are stored in Kafka clusters.

Kafka Streams aims to make it easy for users to write scalable, fault tolerant
and secure applications to manipulate data streams.

It processes data from one or more input sources (for instance, but not
necessarily, Kafka topics) and writes to a sink (for instance, an output Kafka
topic).

It runs on the JVM and is typically used from Java or Scala.

The following example demonstrates how to use Kafka Streams with Aiven for
Apache Kafka and the schema registry functionality offered by
[Karapace](https://karapace.io/) to filter [Apache
Avro™](https://avro.apache.org/) messages.

:::note
The Avro messages are expected to be "Confluent style", where the schema id is
added before each value (see the Confluent [Wire
format](https://docs.confluent.io/platform/current/schema-registry/fundamentals/serdes-develop/index.html#wire-format)
documentation for details of how this works)
:::

## Prerequisites {#kafka-streams-prereq}

It is possible to run the example code with any Apache Kafka service, but this
documentation assumes you are running an Aiven for Apache Kafka service with
**Schema Registry (Karapace)** Enabled.

:::note
Enabling **Schema Registry (Karapace)** is needed to make use of the
schema registry features necessary for dealing with messages in Avro
format.
:::

Sample data will be generated using the Sample Data Generator for "Logistics"
which writes to the `logistics_data_gen` topic. Filtered data will be written
to a topic called `logistics_data_filtered`.


For the example, collect the following information about the Aiven for Apache
Kafka service.

- `KAFKA_SERVICE_URI`: The Service URI of the Apache Kafka service.
- `SCHEMA_REGISTRY_URL`: The Service URI for the schema registry, from the
  Schema Registry tab.
- `SCHEMA_REGISTRY_PASSWORD`: The Password for accessing the schema registry,
  from the Schema Registry tab.
- `SCHEMA_REGISTRY_USERNAME`: The User for accessing the schema registry, from
  the Schema Registry tab.

:::tip
The details are available in the **Connection Information** section of the
service Overview tab in the [Aiven console](https://console.aiven.io/) or via
the dedicated `avn service get` command with the [Aiven
CLI](/docs/tools/cli/service-cli#avn_service_get). And that's also where you
can download the files in the next step...
:::
 
Create a directory called `certs` and download the **Access key**,
**Access certificate** and **CA certificate** files (`service.key`,
`service.cert`, and `ca.pem`) to that directory.

Create the output topic `logistics_data_filtered` on the Kafka
Service (the input topic will be created automatically by the sample data
generator).

To run the examples, you will need either Docker (to run them in a container),
or [Gradle](https://gradle.org/) (to run them using the `run.sh` script, which
builds the application locally).

## Get the example application code

Download the `kafka-streams-example` sources from GitHub

```shell
git clone https://github.com/Aiven-Labs/kafka-streams-example.git
```

and change to the repository directory:

```shell
cd kafka-streams-example
```

### Start the "Logistics" data stream

See [Stream sample data from the Aiven Console](/docs/products/kafka/howto/generate-sample-data) and
run the "Logistics" data generator.

### Run the application

Running the example also needs the environment variables

- `CA_PEM_CONTENTS`: The contents of the `ca.pem` file
- `SERVICE_CERT_CONTENTS`: The contents of the `service.cert` file
- `SERVICE_KEY_CONTENTS`: the contents of the `service.key` file

These can be set by sourcing the provided `prep_cert_env.sh` script
```shell
source prep_cert_env.sh
```

<Tabs groupId="running">
<TabItem value="docker" label="Run with Docker" default>

Build the container image for the `GenericFilterApp` example:
```shell
docker build --build-arg APP_NAME=GenericFilterApp -t appimage .
```

Run the container image using the environment values collected earlier:
```shell
docker run -d --name kafka-streams-container -p 3000:3000 \
        -e KAFKA_SERVICE_URI=$KAFKA_SERVICE_URI \
        -e CA_PEM_CONTENTS="$CA_PEM_CONTENTS" \
        -e SERVICE_CERT_CONTENTS="$SERVICE_CERT_CONTENTS" \
        -e SERVICE_KEY_CONTENTS="$SERVICE_KEY_CONTENTS" \
        -e SCHEMA_REGISTRY_URL=$SCHEMA_REGISTRY_URL \
        -e SCHEMA_REGISTRY_USERNAME=$SCHEMA_REGISTRY_USERNAME \ 
        -e SCHEMA_REGISTRY_PASSWORD=$SCHEMA_REGISTRY_PASSWORD \
        appimage
```
</TabItem>

<TabItem value="local" label="Build and run locally">

Build the application (this builds a "fat JAR"):
```shell
gradle GenericFilterAppUberJar
```

Copy it to the current directory so the `run.sh` script can find it:
```shell
cp app/build/libs/GenericFilterApp-uber.jar .
```

Run the program. This requires the environment variables set earlier (which are
detailed in the header comments for the script).
```
APP_NAME=GenericFilterApp ./run.sh
```

:::tip
This is the same `run.sh` script that the container file runs.
:::
</TabItem>
</Tabs>

### Check the produced data


<Tabs groupId="checkingData">
<TabItem value="console" label="In the Aiven console" default>
In the [Aiven console](https://console.aiven.io/)

1. Go to the service page for this Aiven for Kafka service
2. Choose the **Topics** tab from the sidebar
3. Select the `logistics_data_filtered` topic
4. Select **Messages**
5. Change the Format to `avro`
6. Select **Fetch messages**
</TabItem>

<TabItem value="python" label="With a Python program" default>
In the `reporting` directory of the repository there is a command line program
`report_messages.py` which reads messages from both the input and output
topics and shows them using a text UI.

If all the environment variables discussed before are set up, then you can run
it with

```shell
reporting/report_messages.py
```
</TabItem>
</Tabs>

### About the example code

The example code provides source code for several different applications. This
page concentrates on the
[`GenericFilterApp.java`](https://github.com/Aiven-Labs/kafka-streams-example/blob/main/app/src/main/java/org/example/GenericFilterApp.java).

The schema for the input Avro messages is downloaded from Karapace. The output
messages use the
[`logistics_delivered.avsc`](https://github.com/Aiven-Labs/kafka-streams-example/blob/main/app/src/main/avro/logistics_delivered.avsc)
schema, which the application registers with Karapace.

:::note
For more details of the example repository and what it provides, including
[Building the program](https://github.com/Aiven-Labs/kafka-streams-example?tab=readme-ov-file#building-the-program)
and
[Running the unit tests](https://github.com/Aiven-Labs/kafka-streams-example?tab=readme-ov-file#running-the-unit-tests),
see its
[README](https://github.com/Aiven-Labs/kafka-streams-example/blob/main/README.md)
:::
