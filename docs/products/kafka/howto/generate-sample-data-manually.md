---
title: Generate sample data with Docker
---

Use a Docker-based sample data producer to simulate streaming data in Aiven for Apache Kafka®.
This method provides a customizable stream of messages for testing and development.

:::note
This example uses [Docker](https://www.docker.com/) images. You must
have [Docker](https://www.docker.com/) or [Podman](https://podman.io/) installed to
run the generator.
:::

## Prerequisites

- An active [Aiven for Apache Kafka® service](/docs/products/kafka/get-started)
- Access to the [Aiven Console](https://console.aiven.io)
- A [personal access token](/docs/platform/howto/create_authentication_token)

## Set up the fake data producer

Use the [Dockerized fake data producer for Aiven for Apache Kafka®](https://github.com/aiven/fake-data-producer-for-apache-kafka-docker) to stream sample messages into a topic.

1. Clone the repository:

   ```bash
   git clone https://github.com/aiven/fake-data-producer-for-apache-kafka-docker
   ```

1. Copy the file `conf/env.conf.sample` to `conf/env.conf`

1. Edit the `conf/env.conf` file and update the following values:

   - `my_project_name`: your Aiven project name
   - `my_kafka_service_name`: your Kafka service name
   - `my_topic_name`: name of the topic to receive messages
   - `my_aiven_email`: your Aiven login email
   - `my_aiven_token`: the personal access token generated in the next step

1. Create a [token](/docs/platform/howto/create_authentication_token) in the Aiven
   Console or using the following command in the
   [Aiven CLI](/docs/tools/cli),
   changing the `max-age-seconds` appropriately for the duration of
   your test:
1. Generate a [token](/docs/platform/howto/create_authentication_token) in the
   [Aiven Console](https://console.aiven.io) or use the[Aiven CLI](/docs/tools/cli):

    ```bash
    avn user access-token create                            \
    --description "Token used by Fake data generator"       \
    --max-age-seconds 3600                                  \
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
   Rebuild the Docker image after making any changes to the `conf/env.conf` file.
   :::

1. Start the data stream:

   ```bash
   docker run fake-data-producer-for-apache-kafka-docker
   ```

1. Once the Docker image is running, verify that the topic is receiving messages.

   - Use the [Aiven Console](https://console.aiven.io): Go to the **Topics** tab in
     your Aiven for Apache Kafka service (Kafka REST must be enabled).
   - Or use a command-line tool such as [kcat](/docs/products/kafka/howto/kcat).
