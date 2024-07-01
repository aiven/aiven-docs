---
title: Enable tiered storage for Aiven for Apache Kafka®
sidebar_label: Enable tiered storage
---

Tiered storage significantly improves the storage efficiency of your Aiven for Apache Kafka® service. You can enable this feature for your service using either the [Aiven console](https://console.aiven.io/) or the [Aiven CLI](/docs/tools/cli).

## Prerequisites

-   Aiven account and a project set up in the Aiven Console
-   Aiven for Apache Kafka® service with Apache Kafka version 3.6 or later

    Tiered storage on Aiven for Apache Kafka is currently not available
    on all plans and regions. View the [plans and pricing
    page](https://aiven.io/pricing?product=kafka) for a comprehensive
    list of supported plans and regions.

-   Aiven CLI

## Enable tiered storage via Aiven Console

To enable tiered storage for your service using the Aiven Console:

1. Log in to the [Aiven console](https://console.aiven.io/), and select
    your project.
1. Choose to either create an Aiven for Apache Kafka service or select an
   existing one.
   -   For [a new service](/docs/platform/howto/create_new_service):

       1.  On the **Create Apache Kafka® service** page, scroll down to
           the **Tiered storage** section.
       1.  Click **Enable tiered storage**.
       1.  In the **Service summary**, you can view the pricing for
           tiered storage.
   -   For an existing service:
       1.  Go to the service's **Overview** page, click **Service
           settings** from the sidebar.
       1.  In the Service plan section, click **Enable tiered storage**
           to activate it.
1.  Click **Activate tiered storage** to confirm your settings and turn
    on tiered storage for your service.

After you have activated tiered storage for your service and configured it for your
[topics](/docs/products/kafka/howto/configure-topic-tiered-storage), you can monitor both
usage and associated costs in the
[Tiered storage overview](/docs/products/kafka/howto/tiered-storage-overview-page) section.

:::note
Alternatively, if tiered storage is not yet active for your service,
you can enable it by selecting **Tiered storage**from the sidebar.
:::

:::warning
If you power off a service with tiered storage active, you will
permanently lose all remote data. However, you will not be charged for
tiered storage while the service is off.
:::

### Configure default retention policies at service-level

1.  Access [Aiven console](https://console.aiven.io/), select your
    project, and choose your Aiven for Apache Kafka service.
1.  In the service page, select **Service settings** from the sidebar.
1.  On the **Service settings** page, scroll down to the **Advanced
    configuration** section, and click **Configure**.
1.  In the **Advanced configuration** dialog, click **Add configuration
    option**.
1.  To define the retention policy for Aiven for Apache Kafka tiered
    storage, choose either of these options:
    -   Find `kafka.log_local_retention_ms` and set the value to define
        the retention period in milliseconds for time-based retention.
    -   Find `kafka.log_local_retention_bytes` and set the value to
        define the retention limit in bytes for size-based retention.
1.  Click **Save configuration** to apply your changes.

Additionally, you can configure the retention policies from the
[Tiered storage overview](/docs/products/kafka/howto/tiered-storage-overview-page#modify-retention-polices) page.

## (Optional) configure client-side parameter

For optimal performance and reduced risk of broker interruptions when
using tiered storage, it is recommended to update the client-side
parameter `fetch.max.wait.ms` from its default value of 500 ms to 5000 ms.

## Enable tiered storage via Aiven CLI

To enable tiered storage for your Aiven for Apache
Kafka service using the [Aiven CLI](/docs/tools/cli):

1. Ensure the tiered storage feature is activated for your account by contacting [our sales
   team](mailto:sales@aiven.io). This feature is an early availability and requires
   activation on your account.

1.  Once activated, retrieve the project information using the following command:

    ```bash
    avn project details
    ```

    If you need details for a specific project, use:

    ```bash
    avn project details --project <your_project_name)
    ```

1.  To find the name of the Aiven for Apache Kafka service for enabling tiered storage,
    use this command:

    ```bash
    avn service list
    ```

    Make a note of the `SERVICE_NAME` corresponding to your Aiven for
    Apache Kafka service.

1.  Enable tiered storage using the command below:

    ```bash
    avn service update \
       --project demo-kafka-project \
       demo-kafka-service \
       -c tiered_storage.enabled=true
    ```

In this command:

-   `--project demo-kafka-project`: Replace `demo-kafka-project` with
    your project name.
-   `demo-kafka-service`: Specify the Aiven for Apache Kafka service you
    intend to update.
-   `-c tiered_storage.enabled=true`: Configuration flag that activates
    tiered storage for your Aiven for Apache Kafka service.
