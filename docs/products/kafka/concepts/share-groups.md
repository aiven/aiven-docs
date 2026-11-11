---
title: Share groups in Aiven for Apache Kafka®
sidebar_label: Share groups
---

import RelatedPages from "@site/src/components/RelatedPages";

Apache Kafka® share groups let multiple consumers process records from the same topic partition at the same time. Unlike traditional consumer groups, share groups don't assign each partition to a single consumer.

Use share groups for workloads that need concurrent record processing, such as
background jobs, task processing, and event-driven applications where strict message
ordering isn't required. Share groups work well when records take different amounts of
time to process.

## How share groups differ from traditional consumer groups

| Feature | Traditional consumer groups | Share groups |
|---|---|---|
| Partition assignment | One consumer per partition at a time | Multiple consumers can process records from the same partition |
| Concurrent consumption | Limited by the number of partitions | Not limited to one consumer per partition |
| Processing progress | Committed offsets | Individual record acknowledgments |
| Message ordering | Preserves partition order during normal consumption | Doesn't guarantee strict processing order |
| Failed record processing | Applications manage retries and offset handling | Supports record redelivery and delivery attempt tracking |

Share consumers acknowledge records individually. If a consumer doesn't acknowledge a
record before its acquisition lock expires, Kafka can deliver the record again, up to a
delivery attempt limit. Because Kafka can redeliver records, your application must
handle duplicate processing.

If your application requires ordered processing within each partition, use traditional
consumer groups instead.

For details about acknowledgment types and modes, see the
[Apache Kafka `KafkaShareConsumer` API](https://kafka.apache.org/43/javadoc/org/apache/kafka/clients/consumer/KafkaShareConsumer.html).

## Requirements

To use share groups, you need:

- An Aiven for Apache Kafka service running Apache Kafka 4.2 or later.
- A compatible Kafka client, such as the Apache Kafka Java client version 4.2 or later.
- A service user with the required topic and group permissions.

Share groups use the same ACL permissions as consumer groups:

- With Aiven ACLs, grant `read` or `readwrite` access to the topic.
- With Kafka-native ACLs, grant `READ` permission on the topic and group.

Applications that use the Apache Kafka Java client must use `KafkaShareConsumer`. The
`KafkaConsumer` class doesn't support share groups.

## Create a share group

To create a share group, configure a share consumer with a new group ID and subscribe it
to a topic. Kafka creates the share group when the consumer joins for the first time.
You can't change the group type after creation. Creating a share group doesn't affect
existing consumer groups.

## Configure share groups

On Aiven for Apache Kafka services running Apache Kafka 4.2 or later, share groups work
without additional service configuration.

### Choose where a new group starts reading

By default, a new share group starts reading newly produced records
(`share.auto.offset.reset=latest`). To process records produced before the group starts
consuming, set `share.auto.offset.reset` to `earliest`.

This is a group-level configuration. Use a Kafka administration tool, such as
`kafka-configs.sh`, to set it.

For other supported values, see
[Apache Kafka group configurations](https://kafka.apache.org/43/configuration/group-configs/).

### Tune share groups

You can adjust share group behavior using the following options in your service's
advanced configuration.

| Option | Description |
|---|---|
| `kafka.group_share_record_lock_duration_ms` | How long a record remains locked before it can be delivered again. |
| `kafka.group_share_delivery_count_limit` | Maximum number of times a record can be delivered to a share group. |
| `kafka.group_share_partition_max_record_locks` | Maximum number of records that can be locked per share group partition. |
| `kafka.group_share_max_size` | Maximum number of members allowed in a share group. |

For additional options and supported values, see
[Advanced parameters for Aiven for Apache Kafka](/docs/products/kafka/reference/advanced-params).

## Monitor share groups

Aiven for Apache Kafka exposes share group metrics through Prometheus, including share
fetch requests, share acknowledgment requests, request failures, and record
acknowledgments.

For the available metrics, see
[Aiven for Apache Kafka metrics available via Prometheus](/docs/products/kafka/reference/kafka-metrics-prometheus#share-group-metrics).

<RelatedPages/>

- [Access control lists in Aiven for Apache Kafka](/docs/products/kafka/concepts/acl)
