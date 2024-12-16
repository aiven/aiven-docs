---
title: Create Apache Kafka® topics automatically
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"
import {ConsoleIcon} from "@site/src/components/non-swizzled/ConsoleIcons"

Apache Kafka® can automatically create a topic if a message is produced to a topic that doesn’t already exist.

By default, Aiven for Apache Kafka enables automatic topic creation to remain compatible
with standard Apache Kafka configurations, making it useful for testing and development.
In production environments, **disable** automatic topic creation to avoid accidental topics
created by typos, which can lead to a disorganized topic catalog.

If a message is produced to a non-existent topic, you see the following error message:

```bash
KafkaTimeoutError: Failed to update metadata after 60.0 secs.
```

In such cases, you have two options:

1. **Create topics in advance**: Manually
   [create the topics](/docs/products/kafka/howto/create-topic) before use. This
   approach is recommended for production environments as it provides better
   control over settings such as partition count, replication factor, and retention time.
1. **Enable automatic topic creation**: This option is simpler but has some drawbacks. It
   can lead to inadvertent topic creation due to typos and may create topics with
   [default configuration values](set-kafka-parameters) set at the service level.

:::note
If [tiered storage is enabled](/docs/products/kafka/howto/enable-kafka-tiered-storage)
for your Aiven for Apache Kafka service, all new topics have tiered storage enabled
by default.
:::

## Enable automatic topic creation

<Tabs groupId="setup">
<TabItem value="Console" label="Console" default>

To enable automatic topic creation through the Aiven Console:

1. Log in to the [Aiven Console](https://console.aiven.io/), select your
   project, and choose your Aiven for Apache Kafka® service.
1. Click <ConsoleLabel name="service settings"/> from the sidebar.
1. Scroll to the **Advanced configuration** section, and click **Configure**.
1. In the **Advanced configuration** dialog, click
   <ConsoleLabel name="addadvancedconfiguration"/>.
1. Find the `auto_create_topics_enable` parameter and set it to `true` to
   enable automatic topic creation.
1. Click **Save configuration**.

:::warning
Even with automatic topic creation enabled, the user account producing a message
to a non-existent topic must have `admin` permissions. Aiven for Apache Kafka validates
the access control list (ACL) before creating the topic. To change user permissions, go
to the `Users` tab on your service detail page in the [Aiven Console](https://console.aiven.io/).
:::

</TabItem>
<TabItem value="CLI" label="CLI">

To enable the automatic creation of topics on an existing Aiven for Apache Kafka service,
use the
[Aiven CLI service update command](/docs/tools/cli/service-cli#avn-cli-service-update).
Run the following command, replacing `SERVICE_NAME` with your service name:

```bash
avn service update SERVICE_NAME -c kafka.auto_create_topics_enable=true
```

Parameters:

- `auto_create_topics_enable=true`: Enables automatic topic creation.
- `SERVICE_NAME`: Your Aiven for Apache Kafka service name.

</TabItem>
</Tabs>

## Related pages

- [Manage Aiven for Apache Kafka® topics via CLI](/docs/tools/cli/service/topic#avn_cli_service_topic_create)
- [Create an Apache Kafka® topic](/docs/products/kafka/howto/create-topic)
