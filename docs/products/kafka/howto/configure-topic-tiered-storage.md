---
title: Enable and configure tiered storage for topics
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

Aiven for Apache Kafka® allows you to configure tiered storage and set retention policies for individual topics.

## Prerequisite

[Tiered storage enabled for the Aiven for Apache Kafka service](/docs/products/kafka/howto/enable-kafka-tiered-storage).

## Tiered storage status for topics

When you activate tiered storage for a service, any new topics created in that service
have tiered storage enabled by default.

- **Disable tiered storage for new topics**: You can disable tiered storage by setting
  **Remote storage enable** to false during the creation of a new topic in the topic
  advanced configurations. Once you activate tiered storage for a topic, you cannot
  disable it. Contact [Aiven support](mailto:support@aiven.io) for assistance.

- **Tiered storage for existing topics**: Disabled for existing topics.

## Enable and configure tiered storage for topics

<Tabs groupId="setup">
<TabItem value="Console" label="Console" default>

1. Access the [Aiven Console](https://console.aiven.io/), select your project,
   and select your Aiven for Apache Kafka service.
1. Click <ConsoleLabel name="topics" />.

1. On the **Topics** page, either add a new topic with tiered storage or modify an
   existing one:
   - To add a new topic, click **Add topic**.
   - To modify an existing topic, select the topic to modify, then either:
     - Click the topic name to open the **Topic info** screen, and click **Modify**.
     - Alternatively, in the topic row, click <ConsoleLabel name="actions"/> >
       <ConsoleLabel name="Edit topic"/>.

1. The **Enable advanced configuration?** option is set to **Yes** by default.

1. Ensure the **Remote storage enable** option is set to **True** to activate tiered
   storage for the topic. To disable it, set it to **False**.

1. Optionally, adjust the default values for `local_retention_ms` and `local_retention_bytes`.

   :::important
   By default, `local_retention_bytes` and `local_retention_ms` are set to `-2` or
   inherit the configuration from the service level.

   When set to `-2`, the retention in local storage matches the total retention. In this
   scenario, the data segments sent to remote storage are also retained locally. Remote
   storage contains older data segments only if the total retention exceeds the local retention.
   :::

1. Click **Create topic** or **Update** to save your changes and activate tiered storage.

</TabItem>
<TabItem value="CLI" label="CLI">

Using the [Aiven CLI](/docs/tools/cli), you can enable tiered storage for specific
Apache Kafka® topics and set retention policies.

To create a topic with tiered storage enabled:

```bash
avn service topic-create \
    --project demo-kafka-project \
    --service-name demo-kafka-service \
    --topic exampleTopic \
    --partitions 2 \
    --replication 2 \
    --remote-storage-enable
```

In this example:

- `demo-kafka-project` is the name of your project.
- `demo-kafka-service` is the name of your Aiven for Apache Kafka® service.
- `exampleTopic` is the name of the topic you are creating with tiered storage enabled.
- The topic has the partition set to `2` and the replication factor set to `2`

### Configure retention policies for a topic

After enabling tiered storage, you can configure the retention policies for local storage:

```bash
avn service topic-update \
  --project demo-kafka-project \
  --service-name demo-kafka-service \
  --topic exampleTopic \
  --local-retention-ms 100 \
  --local-retention-bytes 10
```

This command sets the local retention time to 100 milliseconds and the local retention
size to 10 bytes for the `exampleTopic` topic in the `demo-kafka-service` of
the `demo-kafka-project`.

:::important

By default, `local_retention_bytes` and `local_retention_ms` are set to `-2` or
inherit the configuration from the service level.

When set to `-2`, the retention in local storage matches the total retention. In this
scenario, the data segments sent to remote storage are also retained locally. Remote
storage contains older data segments only if the total retention exceeds the local
retention.
:::

</TabItem>
</Tabs>

## Optional: Configure the client-side parameter

For optimal performance and reduced risk of broker interruptions when
using tiered storage, it is recommended to update the client-side
parameter `fetch.max.wait.ms` from its default value of 500 ms to 5000 ms.

This consumer configuration is no longer necessary starting from Apache Kafka
version 3.6.2. Consider upgrading to Apache Kafka version 3.6.2 or later before
enabling tiered storage.
