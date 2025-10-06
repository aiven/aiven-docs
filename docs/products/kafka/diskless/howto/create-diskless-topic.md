---
title: Create a diskless topic
limited: true
sidebar_label: Create a diskless topic
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons"
import CreateService from "@site/static/includes/create-service-console.md"

You can create diskless topics after Aiven provisions your Aiven for Apache Kafka® service configured with Diskless Topics.

When you create a Kafka topic, you must choose a topic type: **diskless** or **classic**.
You cannot change the type after the topic is created. Diskless topics have some feature
limitations. For details, see
[Diskless Topics limitations](/docs/products/kafka/diskless/concepts/limitations).

:::note
Diskless Topics is in limited availability. Aiven provisions the service and
manages the setup in your cloud account. Self-service support is coming soon.
To request access, [contact Aiven](https://aiven.io/contact).
:::

## Steps to create a diskless topic

<Tabs groupId="setup">
<TabItem value="Console" label="Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/) and select your
   Aiven for Apache Kafka® service.
1. Click <ConsoleLabel name="topics" /> in the sidebar.
1. Click **Create topic** and enter a name for the topic.
1. Optional: Click **Advanced settings** to configure additional topic parameters.
1. Set properties such as the replication factor, number of partitions, and other
   settings. You can update these later.
1. Click **Create topic**.

</TabItem>
<TabItem value="CLI" label="CLI">

To create a diskless topic using the Aiven CLI, include
the `inkless.enable=true` configuration:

```bash
avn service topic-create \
--project demo-kafka-project \
--service-name demo-kafka-service \
--topic exampleTopic \
--partitions 2 \
--replication 2 \
--config inkless.enable=true
````

To create a diskless topic using the Kafka Admin API or `kafka-topics.sh`,
include the same configuration:

```bash
kafka-topics.sh --create \
--bootstrap-server <broker> \
--topic <topic-name> \
--partitions <num> \
--replication-factor <num> \
--config inkless.enable=true
```

</TabItem>
<TabItem value="terraform" label="Terraform">

Use [the `aiven_kafka_topic` resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/kafka_topic)
and set `inkless_enable` to `true`.

</TabItem>
</Tabs>


<RelatedPages/>

- [Diskless Topics overview](/docs/products/kafka/diskless/concepts/diskless-overview)
- [Diskless Topics architecture](/docs/products/kafka/diskless/concepts/architecture)
- [Batching and delivery in Diskless Topics](/docs/products/kafka/diskless/concepts/batching-and-delivery)
