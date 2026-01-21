---
title: Generate sample data with Docker
---
import ConsoleLabel from "@site/src/components/ConsoleIcons"
import RelatedPages from "@site/src/components/RelatedPages";

Use a Docker-based producer to generate sample data in Aiven for Apache Kafka®. It creates a customizable stream of messages for testing and development.

This example uses [Docker](https://www.docker.com/) images.

## Prerequisites

- [Docker](https://www.docker.com/) or [Podman](https://podman.io/) installed
- Active [Aiven for Apache Kafka® service](/docs/products/kafka/create-kafka-service)
- Access to the [Aiven Console](https://console.aiven.io)
- [Kafka REST API](https://aiven.io/docs/products/kafka/karapace/howto/enable-karapace)
  enabled
- [Personal access token](/docs/platform/howto/create_authentication_token)


## Set up the fake data producer

Use the [Dockerized fake data producer for Aiven for Apache Kafka®](https://github.com/aiven/fake-data-producer-for-apache-kafka-docker) to stream sample messages into a topic.

1. Clone the repository:

   ```bash
   git clone https://github.com/aiven/fake-data-producer-for-apache-kafka-docker
   ```

1. Copy the sample config file to create your own version:

   ```bash
   cp conf/env.conf.sample conf/env.conf
   ```

1. Open the `conf/env.conf` file and update the following values:

   - `my_project_name`: Aiven project name
   - `my_kafka_service_name`: Apache Kafka service name
   - `my_topic_name`: Topic name to receive messages
   - `my_aiven_email`: Aiven login email
   - `my_aiven_token`: Personal access token

1. Generate a [personal access token](/docs/platform/howto/create_authentication_token)
   in the [Aiven Console](https://console.aiven.io) or use the [Aiven CLI](/docs/tools/cli):

   ```bash
   avn user access-token create                            \
     --description "Token used by fake data generator"     \
     --max-age-seconds 3600                                \
     --json | jq -r '.[].full_token'
   ```

   :::tip
   The command uses [`jq`](https://stedolan.github.io/jq/) to extract the token from the
   Aiven CLI output. If `jq` is not installed, remove the `| jq -r '.[].full_token'`
   part and copy the token manually from the JSON output.
   :::

1. Build the Docker image:

   ```bash
   docker build -t fake-data-producer-for-apache-kafka-docker .
   ```

   :::tip
   Rebuild the Docker image after editing the `conf/env.conf` file.
   :::

1. Start the producer:

   ```bash
   docker run fake-data-producer-for-apache-kafka-docker
   ```

1. Once the Docker image is running, verify that the topic is receiving messages:

   - In the [Aiven Console](https://console.aiven.io), go to your Apache Kafka service
     and click <ConsoleLabel name="topics" />.
   - Or use a command-line tool such as [kcat](/docs/products/kafka/howto/kcat) to
     consume messages from the topic.

<RelatedPages />

[Stream sample data from the Aiven Console](/docs/products/kafka/howto/generate-sample-data)
