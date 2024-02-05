---
title: Enable and configure tiered storage for topics
early: true
---

Aiven for Apache Kafka® allows you to configure tiered storage
and set retention policies for individual topics. Learn how to configure
tiered storage for individual topics and set local retention policies
step by step.

## Prerequisite

-   [Tiered storage enabled for the Aiven for Apache Kafka service](/docs/products/kafka/howto/enable-kafka-tiered-storage).

## Configure tiered storage for topics via Aiven Console

1.  Access [Aiven console](https://console.aiven.io/), select your
    project, and select your Aiven for Apache Kafka service.
1.  From the left sidebar, select **Topics**.
1.  You have the option to either add a new topic with tiered
    storage configuration or modify an existing topic to use tiered
    storage.

### For a new topic

1.  From the **Topics** page, select **Add topic**.

1.  Enable advanced configurations by setting the **Do you want to
    enable advanced configuration?** option to **Yes**.

1.  In the **Topic advanced configuration** drop-down, choose
    `remote_storage_enable`. This action will reveal the **Remote
    storage enabled** drop-down.

1.  Select **True** to activate tiered storage for the topic.

1.  Additionally, you can also set the values for `local_retention_ms`
    and `local_retention_bytes` using the respective options from the
    drop-down list.

    :::important
    If the values for `local_retention_bytes` and `local_retention_ms`
    are not set, they default to -2 or take the configuration from the
    service level.

    When set to -2, the retention in local storage will match the total
    retention. In this scenario, the data segments sent to remote
    storage are also retained locally. The remote storage will contain
    older data segments than in the local storage only when the total
    retention is set to be greater than the local retention.
    :::

1.  Select **Add topic** to save your changes and add the topic with
    tiered storage.

### For an existing topic

1.  From the **Topics** page, select the topic for which you wish to
    enable tiered storage.
1.  Use the ellipsis or open the topic and choose **Modify**.
1.  In the **Modify** page, choose `remote_storage_enable` from the
    drop-down list, followed by selecting **True** from the **Remote
    storage enable** drop-down.
1.  Additionally, you can also set the values for `local_retention_ms`
    and `local_retention_bytes` using the respective options from the
    drop-down list.

    :::important
    If the values for `local_retention_bytes` and `local_retention_ms` are
    not set, they default to -2 or take the configuration from the service
    level.

    When set to -2, the retention in local storage will match the total
    retention. In this scenario, the data segments sent to remote storage
    are also retained locally. The remote storage will contain older data
    segments than in the local storage only when the total retention is set
    to be greater than the local retention.
    :::

1.  Select **Update** to save your changes and activate tiered storage.

## (Optional) configure client-side parameter

For optimal performance and reduced risk of broker interruptions when
using tiered storage, it is recommended to update the client-side
parameter `fetch.max.wait.ms` from its default value of 500ms to 5000ms.

## Enable tiered storage for topics via Aiven CLI

Using the [Aiven CLI](/docs/tools/cli),
you can enable tiered storage for specific Apache Kafka® topics and set
retention policies.

### Enable tiered storage for a topic

To enable tiered storage for a Kafka topic, execute the following
command:

``` bash
avn service topic-create \
    --project demo-kafka-project \
    --service-name demo-kafka-service \
    --topic exampleTopic \
    --partitions 1 \
    --replication 2 \
    --remote-storage-enable
```

In this example:

-   `demo-kafka-project` is the name of your project.
-   `demo-kafka-service` is the name of your Aiven for Apache Kafka®
    service.
-   `exampleTopic` is the name of the topic you are creating with tiered
    storage enabled.
-   The topic will have 1 partition and a replication factor of 2.

### Configure retention policies for a topic with tiered storage

After enabling tiered storage, you can configure the retention policies
for local storage:

``` bash
avn service topic-update \
    --project demo-kafka-project \
    --service-name demo-kafka-service \
    --topic exampleTopic \
    --local-retention-ms 100 \
    --local-retention-bytes 10
```

This command sets the local retention time to 100 milliseconds and the
local retention size to 10 bytes for the topic named `exampleTopic` in
the `demo-kafka-service` of the `demo-kafka-project`.

:::important
If the values for `local_retention_bytes` and `local_retention_ms` are
not set, they default to -2 or inherit the configuration from the
service level.

When set to -2, the retention in local storage will match the total
retention. Consequently, data segments sent to remote storage are also
retained locally. The remote storage will contain older data segments
than the local storage, only if the total retention exceeds the local
retention.
:::
