---
title: Configure rack awareness in Aiven for Apache Kafka® MirrorMaker 2
sidebar_label: Configure rack awareness
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"
import ConsoleIcon from "@site/src/components/ConsoleIcons"
import RelatedPages from "@site/src/components/RelatedPages";

Configure rack awareness in Aiven for Apache Kafka® MirrorMaker 2 to reduce cross-availability zone (AZ) network traffic by directing MirrorMaker to read from local follower replicas instead of remote partition leaders.

## About rack awareness in MirrorMaker 2

Rack awareness in MirrorMaker 2 requires
[follower fetching](/docs/products/kafka/howto/enable-follower-fetching) to be enabled
on the source Aiven for Apache Kafka® service and on the replication flow.

When follower fetching is enabled for a replication flow, MirrorMaker automatically
sets a rack value based on the availability zone where the MirrorMaker node runs and
prefers reading from in-sync follower replicas in the same availability zone. This can
reduce cross-availability zone network traffic and associated costs.

If the source Kafka cluster does not support follower fetching or uses different
rack identifiers, Kafka ignores the rack value and MirrorMaker reads from
partition leaders.

Follower fetching is enabled by default for new replication flows. If follower fetching
is disabled for a replication flow, MirrorMaker reads only from partition leaders for
that flow and rack awareness has no effect.

For details on follower fetching, see
[Follower fetching in Aiven for Apache Kafka®](/docs/products/kafka/concepts/follower-fetching).

## When to use rack awareness

Use rack awareness when:

- MirrorMaker 2 and the source Kafka service run across multiple availability zones.
- Cross-AZ network costs or latency are a concern.
- The source Kafka service is hosted on Aiven.

Rack awareness does not provide benefits when the Kafka cluster runs in a single
availability zone.

## Prerequisites

- A running Aiven for Apache Kafka® MirrorMaker 2 service.
- Follower fetching enabled on the source Aiven for Apache Kafka® service.

## Enable or disable rack awareness for a replication flow

Rack awareness is controlled by
[follower fetching](/docs/products/kafka/howto/enable-follower-fetching) and can be
enabled or disabled per replication flow.

When enabled, MirrorMaker assigns a rack value based on the availability zone where the
node runs and prefers reading from in-sync follower replicas in the same availability
zone. When disabled, MirrorMaker reads from partition leaders for that replication flow.

1. In the [Aiven Console](https://console.aiven.io), open the MirrorMaker 2 service.
1. Click **Replication flows**.
1. Create a replication flow or edit an existing one.
1. Set **Follower fetching enabled** to on or off.
1. Click **Create** or **Save**.

<RelatedPages/>

- [Follower fetching in Aiven for Apache Kafka®](/docs/products/kafka/concepts/follower-fetching)
- [Enable follower fetching in Aiven for Apache Kafka®](/docs/products/kafka/howto/enable-follower-fetching)
- [Aiven for Apache Kafka® MirrorMaker 2](/docs/products/kafka/kafka-mirrormaker)
