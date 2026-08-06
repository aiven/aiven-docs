---
title: Remove topic prefix when replicating with Apache Kafka® MirrorMaker 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"

When you use Apache Kafka® MirrorMaker 2 to replicate topics across Apache
Kafka® clusters, the default target topic name uses this format:
`<SOURCE_CLUSTER_ALIAS>.<TOPIC_NAME>`.
For example, if the source Apache Kafka cluster alias is `src-kafka`,
replicating the `orders` source topic creates the `src-kafka.orders` target
topic.

For most use cases, the extra prefix is not an issue. If you use a backup
Apache Kafka cluster for disaster recovery, you might need consumers and
producers to switch clusters with minimal downtime and without changing topic
names in their configuration.

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/) and click the
   Aiven for Apache Kafka MirrorMaker 2 service.
1. Click <ConsoleLabel name="replicationflow" />.
1. Open the replication flow to update.
1. In **Replication policy class**, replace the default
   `org.apache.kafka.connect.mirror.DefaultReplicationPolicy` value with
   `org.apache.kafka.connect.mirror.IdentityReplicationPolicy`.

</TabItem>
<TabItem value="api" label="API">
Replace the
`<MIRRORMAKER_SERVICE_NAME>`, `<SOURCE_CLUSTER_ALIAS>`, and
`<TARGET_CLUSTER_ALIAS>` placeholders:

```bash
avn MirrorMaker replication-flow update <MIRRORMAKER_SERVICE_NAME> \
    --source-cluster <SOURCE_CLUSTER_ALIAS>                         \
    --target-cluster <TARGET_CLUSTER_ALIAS>                         \
    "{\"replication_policy_class\": \"org.apache.kafka.connect.mirror.IdentityReplicationPolicy\"}"
```

To revert the policy and include the source cluster
alias as the topic prefix, run the command with the
`org.apache.kafka.connect.mirror.DefaultReplicationPolicy` value.

:::warning
The `org.apache.kafka.connect.mirror.IdentityReplicationPolicy`
replication policy **does not support active-active replication** because the
topics keep the same name and offsets cannot be accurately tracked.

Do not create identical replication flows between a source and a destination
with the `org.apache.kafka.connect.mirror.IdentityReplicationPolicy` policy.
This configuration creates an infinite loop.

For active-active, use the
`org.apache.kafka.connect.mirror.DefaultReplicationPolicy`.
:::

</TabItem>
</Tabs>
