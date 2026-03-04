---
title: Use Apache Kafka® Streams with Aiven for Apache Kafka®
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"

[Apache Kafka® Streams](https://kafka.apache.org/documentation/streams/) is a client-side library for building real-time applications where input and output data are stored in Kafka clusters.

Kafka Streams enables you to build scalable, fault-tolerant applications that process
data streams. It reads from one or more input
sources (such as Kafka topics) and writes to a sink (such as an output Kafka
topic). You write Kafka Streams applications in Java or Scala.

The following example shows how to use Kafka Streams with Aiven for Apache Kafka® and
[Karapace](https://karapace.io/) schema registry to filter
[Apache Avro™](https://avro.apache.org/) messages.

The example uses data from the Sample Data Generator for **Logistics**,
which writes to the `logistics_data_gen` topic. The example code reads from
that topic and writes filtered data to the `logistics_data_delivered` topic:

- Writes messages where the `state` is `Delivered`.
- Copies the `carrier` and `manifest` fields, and renames `time_utc` to `timeUtc` and
  `tracking_id` to `trackingId`. Other fields are not copied.

:::note
The Avro messages in this example use the
[Confluent wire format](https://docs.confluent.io/platform/current/schema-registry/fundamentals/serdes-develop/index.html#wire-format). In this format, a schema ID is
inserted before each message value. This format is sometimes referred to as
`AvroConfluent`.

The input message schema is retrieved from the schema registry. The output schema is
defined in [logistics_delivered.avsc](https://github.com/Aiven-Labs/kafka-streams-example/blob/main/app/src/main/avro/logistics_delivered.avsc), compiled into the Java application, and registered with the
schema registry.
:::

## Prerequisites {#kafka-streams-prereq}

You can run this example with any Apache Kafka service. The steps below use an
**Aiven for Apache Kafka®** service.

### Schema registry

This example requires a **schema registry**. The producer registers the Avro schema to
obtain a schema ID, which is added to each message. The consumer retrieves the schema
from the registry to decode the message.

Enable the **Karapace schema registry** for the Kafka service. See
[Enable Karapace schema registry](/docs/products/kafka/karapace/howto/enable-karapace).

### Environment variables

Create the following environment variables to connect to the Aiven for Apache Kafka and
Karapace services:

- `KAFKA_SERVICE_URL`: Service URL of the Kafka service
- `SCHEMA_REGISTRY_URL`: Service URI of the schema registry
- `SCHEMA_REGISTRY_USERNAME`: Username for the schema registry
- `SCHEMA_REGISTRY_PASSWORD`: Password for the schema registry

:::tip
You can find these values in **Connection information** on the
<ConsoleLabel name="overview"/> page in the [Aiven console](https://console.aiven.io/) or
by running `avn service get` with the
[Aiven CLI](/docs/tools/cli/service-cli#avn_service_get). You can also download the
certificate files used in the next step from this section.
:::

### Certificates

Create a directory named `certs` and download the following files to this directory:

- Access key (`service.key`)
- Access certificate (`service.cert`)
- CA certificate (`ca.pem`)

### Kafka topic

Create the output topic
[`logistics_data_delivered`](/docs/products/kafka/howto/create-topic#create-an-apache-kafka-topic)
in the Kafka service. The sample data generator automatically creates the input topic.

### Local tools

Install one of the following to run the example:

- [Docker](https://www.docker.com/) to run the application in a container
- [Gradle](https://gradle.org/) to build and run the application locally using the `run.sh` script

## Get the example application code

1. Clone the `kafka-streams-example` repository from GitHub:

   ```shell
   git clone https://github.com/Aiven-Labs/kafka-streams-example.git
   ```

1. Change into the repository directory:

   ```shell
   cd kafka-streams-example
   ```

## Start the Logistics data stream

Follow the instructions in
[Stream sample data from the Aiven Console](/docs/products/kafka/howto/generate-sample-data)
to start the **Logistics** data generator.

## Run the example application

Set the following environment variables:

- `CA_PEM_CONTENTS`: Contents of the `ca.pem` file
- `SERVICE_CERT_CONTENTS`: Contents of the `service.cert` file
- `SERVICE_KEY_CONTENTS`: Contents of the `service.key` file

Set these variables by sourcing the `prep_cert_env.sh` script in the cloned
repository:

```shell
source prep_cert_env.sh
```

<Tabs groupId="running">
<TabItem value="docker" label="Run with Docker" default>

1. Build the container image for the `GenericFilterApp` example:

   ```shell
   docker build --build-arg APP_NAME=GenericFilterApp -t appimage .
   ```

1. Run the container using the environment variables set earlier:

   ```shell
   docker run -d --name kafka-streams-container -p 3000:3000 \
           -e KAFKA_SERVICE_URL=$KAFKA_SERVICE_URL \
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

Build and run the application locally:

1. Build the application. This command creates a **fat JAR**.

   ```shell
   gradle GenericFilterAppUberJar
   ```

1. Copy the JAR file to the current directory so the `run.sh` script can find it:

   ```shell
   cp app/build/libs/GenericFilterApp-uber.jar .
   ```

1. Run the application using the `run.sh` script:

   ```shell
   APP_NAME=GenericFilterApp ./run.sh
   ```

   The script uses the environment variables set earlier.

:::tip
The Docker image uses the same `run.sh` script.
:::

</TabItem>
</Tabs>

## Check the produced data

<Tabs groupId="checkingData">
<TabItem value="console" label="In the Aiven console" default>

1. In the [Aiven console](https://console.aiven.io/), open the **Aiven for Apache Kafka®** service.
1. In the sidebar, click <ConsoleLabel name="topics" />.
1. Select the `logistics_data_delivered` topic.
1. Click **Messages**.
1. In **Format**, select `Avro`.
1. Click **Fetch messages**.
</TabItem>

<TabItem value="python" label="With Python">

The `reporting` directory contains the command-line program `report_messages.py`, which
reads messages from the input and output topics and displays them in the terminal.

Install [`uv`](https://docs.astral.sh/uv/) to run the script.

After installing [`uv`](https://docs.astral.sh/uv/getting-started/installation/) and
setting the environment variables from earlier steps, run the script:

```shell
reporting/report_messages.py
```

</TabItem>
</Tabs>

## About the example code

The example repository contains source code for several applications. This example
focuses on [`GenericFilterApp.java`](https://github.com/Aiven-Labs/kafka-streams-example/blob/main/app/src/main/java/org/example/GenericFilterApp.java).

:::note
See the example repository [README](https://github.com/Aiven-Labs/kafka-streams-example/blob/main/README.md)
for additional details and other sample programs.
:::
