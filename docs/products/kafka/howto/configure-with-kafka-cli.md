---
title: Manage configurations with Apache Kafka® CLI tools
---

Aiven for Apache Kafka® services are fully manageable and customizable via the the [Aiven CLI](/docs/tools/cli).

To guarantee the service stability, direct Apache
ZooKeeper™ access isn't available, but our tooling provides you all the
options that you need - whether your Apache Kafka version has Apache
ZooKeeper™ in it or not.

Some of the configuration changes can be made using the standard client tools
shipped with the Apache Kafka® binaries. The example below shows how to create a
topic using one of these tools, `kafka-topics.sh`.

## Example: Create a topic with retention time to 30 minutes with `kafka-topics.sh`

Each topic in Apache Kafka can have a different retention time, defining
for the messages' time to live. The Aiven Console and API offer the
ability to set the retention time as part of the topic
[creation](/docs/tools/cli/service/topic#avn_cli_service_topic_create)
or [update](/docs/tools/cli/service/topic#avn-cli-topic-update).

The same can be achieved using the `kafka-topics.sh` script included in
the [Apache Kafka binaries](https://kafka.apache.org/downloads):

1.  Download the [Apache Kafka
    binaries](https://kafka.apache.org/downloads) and unpack the archive.

1.  Go to the `bin` folder containing the Apache Kafka client tools.

1.  Create a [Java keystore and truststore](keystore-truststore) to authenticate with
    the Aiven for Apache Kafka service.

1.  Create a
    [client configuration file](kafka-tools-config-file) with the necessary
    authentication details.

1.  Run the following command to check the connectivity to the Aiven for
    Apache Kafka service, replacing the `<KAFKA_SERVICE_URI>` with the
    URI of the service available in the [Aiven
    Console](https://console.aiven.io/).

    ```bash
    ./kafka-topics.sh                           \
        --bootstrap-server <KAFKA_SERVICE_URI>  \
        --command-config consumer.properties    \
        --list
    ```

    If successful, the above command lists all the available topics

1.  Run the following command to create a topic named
    `new-test-topic` with a retention rate of 30 minutes. Use the
    kafka-topics script for this and set the retention value in
    milliseconds `((100 * 60) * 30 = 180000)`.

    ```bash
    ./kafka-topics.sh  \
        --bootstrap-server <KAFKA_SERVICE_URI>  \
        --command-config consumer.properties    \
        --topic new-test-topic                  \
        --create                                \
        --config retention.ms=180000
    ```

1.  Run the same command as step 5 to check the topic creation.
    Optionally, you can also run the `kafka-topics.sh` command with the
    `--describe` flag to check the details of your topic and the
    retention rate.

:::note
It is currently not possible to change the configurations for an
existing topic via `kafka-topics.sh` as that requires a connection to
ZooKeeper.
:::
