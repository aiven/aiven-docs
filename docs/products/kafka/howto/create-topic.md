---
title: Creating an Apache Kafka® topic
---

When working with Apache Kafka®, while it is possible to configure it to
[automatically create topics when a message is produced to a non-existent topic](create-topics-automatically), it is generally recommended to create topics beforehand,
especially in production environments. This approach offers several
advantages:

-   It allows you to define specific topic settings, such as the number
    of partitions, replication factor, retention period, and more.
-   It helps prevent the generation of incorrect topics due to typos or
    other mistakes.

## Create an Apache Kafka® topic

To create a topic using the [Aiven
Console](https://console.aiven.io/), follow these steps:

1.  Log in to [Aiven Console](https://console.aiven.io/) and select the
    Aiven for Apache Kafka® service where you want to create the topic.
2.  From the left sidebar, select **Topics**.
3.  Select **Create topic** to create a topic and enter a name for
    the topic.
4.  If required, set the advanced configuration option to **Yes**.
5.  In the **Topic advanced configuration** section, you can set
    properties such as the replication factor, number of partitions, and
    other settings. These settings can be modified later if needed.
6.  Select **Create topic**. The new topic will be visible immediately,
    but may take a few minutes before you can update its settings.

You can also use the
[topic-create](/docs/tools/cli/service/topic#avn_cli_service_topic_create) command to create a topic using
[Aiven CLI](/docs/tools/cli).
