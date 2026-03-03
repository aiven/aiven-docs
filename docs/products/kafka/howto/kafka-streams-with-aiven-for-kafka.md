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
It is typically used from Java or Scala.

The following example demonstrates how to use Kafka Streams with Aiven for
Apache Kafka, and the schema registry functionality offered by
[Karapace](https://karapace.io/), to filter [Apache
Avro™](https://avro.apache.org/) messages.

The example expects data generated using the Sample Data Generator for
**Logistics** which writes to the `logistics_data_gen` topic. The example code
reads from that topic and writes filtered data to a topic called
`logistics_data_filtered`:

- It only writes messages where the `state` is `Delivered`.
- It copies the fields `carrier` and `manifest`, and renames `time_utc` to
  `timeUtc` and `tracking_id` to `trackingId`. Other fields are not copied.

:::note
The Avro messages in this example use the [Confluent Wire
Format](https://docs.confluent.io/platform/current/schema-registry/fundamentals/serdes-develop/index.html#wire-format),
which means the schema id is inserted before each value. This is sometimes
also referred to as `AvroConfluent`.

The schema for the input Avro messages is downloaded from the schema
repository. The schema for the output
messages is in the file
[`logistics_delivered.avsc`](https://github.com/Aiven-Labs/kafka-streams-example/blob/main/app/src/main/avro/logistics_delivered.avsc),
which is compiled into the Java application, and then registered with the
schema registry.
:::

## Prerequisites {#kafka-streams-prereq}

It is possible to run the example code with any Apache Kafka service, but this
documentation assumes you are running an Aiven for Apache Kafka service.

The example needs a **schema registry**. The message producer registers the
Avro schema to get a schema id, which is added to the start of each message.
The consumer looks up the schema in the registry so it can correctly decode
the message. [Enable the **Karapace** schema
registry](/docs/products/kafka/karapace/howto/enable-karapace) for the Aiven
for Kafka service.

Create the following environment variables, needed to connect to the Aiven for
Apache Kafka and Karapace services:

- `KAFKA_SERVICE_URI`: The Service URI of the Apache Kafka service.
- `SCHEMA_REGISTRY_URL`: The Service URI for the schema registry, from the
  Schema Registry tab.
- `SCHEMA_REGISTRY_PASSWORD`: The Password for accessing the schema registry,
  from the Schema Registry tab.
- `SCHEMA_REGISTRY_USERNAME`: The User for accessing the schema registry, from
  the Schema Registry tab.

:::tip
The values are available in the **Connection Information** section of the
service Overview tab in the [Aiven console](https://console.aiven.io/) or via
the dedicated `avn service get` command with the [Aiven
CLI](/docs/tools/cli/service-cli#avn_service_get). That's also where you
can download the files in the next step.
:::
 
Create a directory called `certs` and download the **Access key**,
**Access certificate** and **CA certificate** files (`service.key`,
`service.cert`, and `ca.pem`) to that directory.

[Create the output
topic](/docs/products/kafka/howto/create-topic#create-an-apache-kafka-topic)
`logistics_data_filtered` on the Kafka Service. The input topic is
created automatically by the sample data generator.

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

## Start the "Logistics" data stream

Follow the instructions at [Stream sample data from the Aiven Console](/docs/products/kafka/howto/generate-sample-data) and
run the **Logistics** data generator.

## Run the application

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

Build the application. This builds a **fat JAR**.
```shell
gradle GenericFilterAppUberJar
```

Copy the JAR file to the current directory so the `run.sh` script can find it:
```shell
cp app/build/libs/GenericFilterApp-uber.jar .
```

Use the `run.sh` script to run the program. This requires the environment
variables set earlier. The header comments for the script also list the
environment variables needed.
```
APP_NAME=GenericFilterApp ./run.sh
```

:::tip
This is the same `run.sh` script that the container file runs.
:::
</TabItem>
</Tabs>

## Check the produced data


<Tabs groupId="checkingData">
<TabItem value="console" label="In the Aiven console" default>
In the [Aiven console](https://console.aiven.io/)

1. Go to the service page for this Aiven for Apache Kafka service
2. Choose the **Topics** tab from the sidebar
3. Select the `logistics_data_filtered` topic
4. Click **Messages**
5. Change the Format to `avro`
6. Click **Fetch messages**
</TabItem>

<TabItem value="python" label="With a Python program" default>
In the `reporting` directory of the repository there is a command line program
`report_messages.py` which reads messages from both the input and output
topics and shows them in the terminal using a text UI.

Running it requires [`uv`](https://docs.astral.sh/uv/).

If [`uv` is
installed](https://docs.astral.sh/uv/getting-started/installation/) and all
the environment variables discussed earlier are set up, then run the
visualization script with

```shell
reporting/report_messages.py
```
</TabItem>
</Tabs>

## About the example code

The example code provides source code for several different applications. This
page concentrates on the program
[`GenericFilterApp.java`](https://github.com/Aiven-Labs/kafka-streams-example/blob/main/app/src/main/java/org/example/GenericFilterApp.java).

:::note
See the example repository
[README](https://github.com/Aiven-Labs/kafka-streams-example/blob/main/README.md)
for more details, including other sample programs.
:::
