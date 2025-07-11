---
title: Create Apache Kafka® topics automatically
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"
import {ConsoleIcon} from "@site/src/components/ConsoleIcons"
import RelatedPages from "@site/src/components/RelatedPages";

Apache Kafka® can automatically create a topic when a message is sent to a topic that does not exist.

By default, Aiven for Apache Kafka enables automatic topic creation to stay compatible
with standard Apache Kafka behavior. This is useful for testing and development. In
production environments, it is recommended to **disable** automatic topic creation to
prevent topics from being created accidentally due to typos or misconfigured clients.

If automatic topic creation is disabled and a message is sent to a non-existent topic,
you might see the following error:

```bash
KafkaTimeoutError: Failed to update metadata after 60.0 secs.
```

In such cases, you have two options:

1. **Create topics in advance**: [Create the topics](/docs/products/kafka/howto/create-topic)
   manually. This is recommended for production environments because it gives you
   control over topic settings such as partition count, replication factor, and
   retention time.
1. **Enable automatic topic creation**: This is simpler but may lead to unintentional
   topic creation due to typos. Topics are created
   using [default configuration values](set-kafka-parameters) defined at the service level.

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
1. Click <ConsoleLabel name="service settings"/>.
1. Scroll to the **Advanced configuration** section, and click **Configure**.
1. In the **Advanced configuration** dialog, click
   <ConsoleLabel name="addadvancedconfiguration"/>.
1. Find the `auto_create_topics_enable` parameter and set it to `true`.
1. Click **Save configuration**.

:::warning
Even if automatic topic creation is enabled, the user sending the message
must have `admin` permissions.
Aiven for Apache Kafka® checks the access control list (ACL) before creating the topic.

To update permissions, go to the **Users** tab in the service detail page in
the [Aiven Console](https://console.aiven.io/).
:::

</TabItem>
<TabItem value="CLI" label="CLI">

To enable automatic topic creation for an existing Aiven for Apache Kafka service, use the
[Aiven CLI `service update` command](/docs/tools/cli/service-cli#avn-cli-service-update).
Run the following command, replacing `SERVICE_NAME` with your service name:

```bash
avn service update SERVICE_NAME -c kafka.auto_create_topics_enable=true
```

Parameters:

- `auto_create_topics_enable=true`: Enables automatic topic creation
- `SERVICE_NAME`: Name of your Aiven for Apache Kafka service

</TabItem>
</Tabs>

<RelatedPages/>

- [Manage Aiven for Apache Kafka® topics via CLI](/docs/tools/cli/service/topic#avn_cli_service_topic_create)
- [Create an Apache Kafka® topic](/docs/products/kafka/howto/create-topic)
