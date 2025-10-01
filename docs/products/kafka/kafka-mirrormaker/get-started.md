---
title: Get started with Apache Kafka® MirrorMaker 2
sidebar_label: Get started
keywords: [quick start]
---

Create an Apache Kafka® MirrorMaker 2 service and integrate it with your Aiven for Apache Kafka service.

## Prerequisites

Ensure that you have at least one **running** Aiven for Apache Kafka® service in your project.
If your project does not have any Aiven for Apache Kafka service,
[create one](/docs/platform/howto/create_new_service).

## Creating a dedicated Aiven for Apache Kafka® MirrorMaker 2 service {#apache_kafka_mirrormaker_dedicated_cluster}

Create an Aiven for Apache Kafka MirrorMaker 2 dedicated service:

1.  Log in to the [Aiven Console](https://console.aiven.io/) and select
    the **Aiven for Apache Kafka®** service for which to create
    a dedicated Aiven for Apache Kafka® MirrorMaker 2 service.
1.  Click **Integrations** on the sidebar.
1.  On the **Integrations** screen, choose **Apache Kafka MirrorMaker**.
1.  Select the **New service** option.
1.  Choose **New Apache Kafka MirrorMaker service**.
1.  Click **Create service**.
1.  In the new browser tab, enter a name for the MirrorMaker 2 service and
    configure the service.
1.  Click **Create service**.
1.  Go back to the browser tab for the service integration and
    select **Existing service**.
1.  Choose the service you created and click **Continue**.
1.  Specify a **Cluster alias**. This alias is a name assigned to an
    Apache Kafka cluster within MirrorMaker 2. It helps identify and
    differentiate the source and target clusters used for replication.
    Ensure careful selection, as the cluster alias cannot be modified
    once the integration is created.
1. Click **Enable**.

Accessing the integration link at the top of the screen will take you to
the Service Overview page for the newly created Apache Kafka
integration. Monitor the service status on the **Service overview**
page, and wait until it transitions from REBUILDING to RUNNING to use
its full functionality.

## Next steps

-   Check our [examples
    project](https://github.com/aiven/aiven-examples) to find code
    samples to get your application connected.
-   Try our [sample data generator
    project](https://github.com/aiven/python-fake-data-producer-for-apache-kafka)
    to give you some data to get started with.
