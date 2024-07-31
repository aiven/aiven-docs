---
title: Integration of logs into Apache Kafka® topic
---

You can send logs from your Aiven services into a specified Apache Kafka® topic.
The setup can be done through [Aiven console](https://console.aiven.io).

:::note
The integration can be used for both Aiven for Apache Kafka, as well as
external Kafka clusters registered in the project's service
integrations page. Read more on
[how to manage Aiven internal and external integrations](/docs/tools/cli/service/integration).
:::

In this example, you will learn how to send logs from an Aiven for
PostgreSQL® service to a topic in your Aiven for Apache Kafka® service.
To proceed with this example, you will need the following:

-   A running Aiven for PostgreSQL service, which will be referred to as
    the *source* service.
-   A running Aiven for Apache Kafka service, which will be referred to
    as the *destination* service.

## Set up Apache Kafka to receive the logs

Verify that
[Apache Kafka REST API](/docs/products/kafka/concepts/kafka-rest-api) is enabled and
create a Kafka topic where to receive the logs.

## Add a new integration to the source service

1.  Log in to [Aiven console](https://console.aiven.io) and select your
    source PostgreSQL service.
1.  On the **Overview page**, scroll to **Service integrations**.
1.  Select **Manage Integrations**. You will be redirected to the
    **Integrations** screen that shows the available
    integrations for your service.
1.  Select **Apache Kafka Logs** from this list.
1.  Select the destination Kafka service (or external Kafka integration)
    and select **Continue**.
1.  Enter the desired **Topic name** where you want the logs to be
    produced.

## Test the integration (with Aiven for Apache Kafka)

1.  Access your destination Apache Kafka service.

1.  Select **Topics** from the left sidebar and locate your topic you
    specified to send logs.

1.  From the **Topic info** screen, select **Messages**.

    :::note
    Alternatively, you can access the messages for a topic by selecting
    the ellipsis in the row of the topic and choosing **Topic
    messages**.
    :::

1.  In the **Messages** screen, select **Fetch Messages** to view the
    log entries that were sent from your source service.

1.  To see the messages in JSON format, use the **FORMAT** drop-down
    menu and select *json*.

## Edit or remove the integration

To edit or remove the integration, use **Manage
Integrations** in the source service. The created integration is listed
in the **Enabled service integrations** section, from where you can edit
or remove it.
