---
title: Create Apache Kafka® topics automatically
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"
import {ConsoleIcon} from "@site/src/components/ConsoleIcons"
import RelatedPages from "@site/src/components/RelatedPages";

When you send a message to a topic that does not exist, Apache Kafka® can
automatically create that topic.

Automatic topic creation is off by default on both Classic Kafka and Inkless
Kafka services. Turn it on when you want topics to be created automatically
(for example, in development). In production, leave it off to avoid creating
topics by mistake (for example, due to typos or incorrectly configured clients).

If automatic topic creation is disabled and a producer sends to a non-existent topic,
you may see errors such as:

```text
UNKNOWN_TOPIC_OR_PARTITION
```

For example:

```bash
WARN [Producer clientId=console-producer] The metadata response from the cluster reported
a recoverable issue with correlation id 18: {example-topic=UNKNOWN_TOPIC_OR_PARTITION}
(org.apache.kafka.clients.NetworkClient)
```

You can:

1. **Create topics in advance**: [Create the topics](/docs/products/kafka/howto/create-topic)
   before use. Prefer this in production so you control partition count, replication
   factor, and retention.
1. **Enable automatic topic creation**: This is simpler, but you cannot set partitions,
   replication, or topic type. The topic uses [default configuration values](set-kafka-parameters).

:::note
If [tiered storage is enabled](/docs/products/kafka/howto/enable-kafka-tiered-storage)
on your Classic Kafka service, new topics use tiered storage by default.

On Inkless Kafka services, automatically created topics are classic topics with remote
storage. Diskless topics are not auto-created. Create them manually.
:::

## Enable automatic topic creation

<Tabs groupId="setup">
<TabItem value="Console" label="Console" default>

Enable automatic topic creation in the Aiven Console:

1. In the [Aiven Console](https://console.aiven.io/), open your project and your
   Aiven for Apache Kafka® service.
1. Click <ConsoleLabel name="service settings"/>.
1. Scroll to **Advanced configuration** and click **Configure**.
1. In the **Advanced configuration** dialog, click
   <ConsoleLabel name="addadvancedconfiguration"/>.
1. Find `auto_create_topics_enable` and set it to `true`.
1. Click **Save configuration**.

:::warning
With automatic topic creation enabled, the user who sends the message must have
admin permissions. To change permissions, open the **Users** tab on the service
page in the [Aiven Console](https://console.aiven.io/).
:::

</TabItem>
<TabItem value="CLI" label="CLI">

To enable automatic topic creation, use the
[Aiven CLI `service update` command](/docs/tools/cli/service-cli#avn-cli-service-update).
Replace `SERVICE_NAME` with your service name:

```bash
avn service update SERVICE_NAME -c kafka.auto_create_topics_enable=true
```

Parameters:

- `auto_create_topics_enable=true`: Enable automatic topic creation.
- `SERVICE_NAME`: The name of your Aiven for Apache Kafka service.

</TabItem>
</Tabs>

<RelatedPages/>

- [Manage Aiven for Apache Kafka® topics via CLI](/docs/tools/cli/service/topic#avn_cli_service_topic_create)
- [Create an Apache Kafka® topic](/docs/products/kafka/howto/create-topic)
