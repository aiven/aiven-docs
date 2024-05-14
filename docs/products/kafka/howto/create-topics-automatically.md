---
title: Create Apache Kafka® topics automatically
---

Apache Kafka® provides the capability to automatically create topics
when a message is produced to a topic that does not exist. By default,
this feature is disabled in Aiven for Apache Kafka as a precaution
against accidental topic creation. When a message is produced to a
non-existent topic, the common error message is as follows:

```
KafkaTimeoutError: Failed to update metadata after 60.0 secs.
```

In such cases, you have two options available:

1.  Create topics in advance: This approach involves manually
    [creating the topics](/docs/products/kafka/howto/create-topic) before they are used. It is generally recommended for
    production environments as it provides better control over topic
    settings such as partition count, replication factor, and retention
    time.
2.  Enable topic automatic creation: While simpler, enabling automatic
    topic creation carries some drawbacks. It introduces the risk of
    inadvertently creating new topics, especially in the case of typos.
    Additionally, it may result in topics created with
    [default configuration values](set-kafka-parameters) defined at the service level.

## Enable automatic topic creation using Aiven Console

To enable automatic topic creation through the Aiven Console, follow
these steps:

1.  In the [Aiven Console](https://console.aiven.io/), select your
    project and then choose your Aiven for Apache Kafka® service.
2.  In the service page, select **Service settings** from the sidebar.
3.  On the **Service settings** page, scroll down to the **Advanced
    configuration** section, and click **Configure**.
4.  In the **Advanced configuration** dialog, click **Add configuration
    options**.
5.  Find the `auto_create_topics_enable` parameter and set it to true to
    enable automatic topic creation.
6.  Select **Save configuration**.

:::warning
Even when you enable automatic topic creation, the user account that
produces a message to a non-existing topic must have `admin`
permissions. Aiven for Apache Kafka validates the access control list
(ACL) before creating the topic. To change user permissions, go to
the **Users** tab in your service detail page in the [Aiven web
console](https://console.aiven.io/).
:::

## Enable automatic topic creation with Aiven CLI

The
[Aiven CLI service update command](/docs/tools/cli/service-cli#avn-cli-service-update) enables to modify service parameters on an existing service.
To enable the automatic creation of topics on an existing Aiven for
Apache Kafka service set the `auto_create_topics_enable` to `true` by
using the following command replacing the `SERVICE_NAME` with the name
of your service:

You can enable the automatic creation of topics on an existing Aiven for
Apache Kafka service by using the
[Aiven CLI service update](/docs/tools/cli/service-cli#avn-cli-service-update) command:

1.  Use the following command:

    ```
    avn service update SERVICE_NAME -c kafka.auto_create_topics_enable=true
    ```

Where:

-   `auto_create_topics_enable` is `true`.
-   `SERVICE_NAME` matches the name of your service.
