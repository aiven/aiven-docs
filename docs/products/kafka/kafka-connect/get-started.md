---
title: Get started with Aiven for Apache Kafka® Connect
sidebar_label: Get started
keywords: [quick start]
---

Get started with Aiven for Apache Kafka® Connect and integrate it with your Apache Kafka® service.

## Prerequisites

Ensure that you have at least one Aiven for Apache Kafka® service in your project.
If your project does not have any Aiven for Apache Kafka
service, [create one](/docs/platform/howto/create_new_service).

## Create a dedicated Aiven for Apache Kafka® Connect service {#apache_kafka_connect_dedicated_cluster}

To create an Aiven for Apache Kafka Connect dedicated service:

1.  Log into [Aiven Console](https://console.aiven.io) and select the
    **Aiven for Apache Kafka** service where to create a
    dedicated Aiven for Apache Kafka Connect service.

2.  Select **Connectors** from left sidebar and select **Integrate
    standalone service**.

3.  Enter a name for your service. A random name is provided by default,
    but you can enter a more recognizable name to distinguish it from
    other services.

4.  Select the cloud provider and region where to run your
    service.

    :::note
    The pricing for the same service may vary between different
    providers and regions. The service summary on the right side of the
    console shows you the pricing for your selected options.
    :::

5.  Select a service plan. This defines how many servers and what kind
    of memory, CPU, and disk resources are allocated to your service.

6.  Select **Create and enable** under the summary in the console.

At the top of the screen, you will notice the Apache Kafka Connect
integration. Selecting the service name will take you to the **Service
Overview** page to monitor the service status. Before using it, it's
important to wait until the service status changes from *REBUILDING* to
*RUNNING*.

## Next steps

-   Check our [examples
    project](https://github.com/aiven/aiven-examples) to find code
    samples to get your application connected.
-   Try our [sample data generator
    project](https://github.com/aiven/python-fake-data-producer-for-apache-kafka)
    to give you some data to get started with.
