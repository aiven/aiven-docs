---
title: Share groups in Aiven for Apache Kafka®
sidebar_label: Share groups
---

import RelatedPages from "@site/src/components/RelatedPages";

Apache Kafka® share groups let multiple consumers process different records from the same topic partition concurrently. Unlike traditional consumer groups, share groups aren't limited to one consumer per partition.

Use share groups for workloads that need concurrent record processing, such as
background jobs, task processing, and event-driven applications.

Share groups are useful when records take different amounts of time to process. While one
consumer works on a slow record, other consumers can continue processing available records.

## How share groups differ from traditional consumer groups

The following table compares traditional consumer groups with share groups.

| Feature | Traditional consumer groups | Share groups |
|---|---|---|
| Partition assignment | One consumer per partition at a time | Multiple consumers can process records from the same partition |
| Processing parallelism | Limited by the number of partitions | Not limited to one consumer per partition |
| Processing progress | Committed offsets | Per-record acknowledgments |
| Record ordering | Preserves partition order during normal consumption | Doesn't guarantee strict processing order |
| Failed record processing | Applications manage retries and offset handling | Supports record redelivery and delivery attempt tracking |

Share groups track acknowledgments for individual records. When a consumer receives a
record, Kafka places a time-limited lock on it. While the lock is active, other
consumers in the same share group can't receive that record. If the record isn't
acknowledged before the lock expires, Kafka can deliver it again, up to the configured
delivery attempt limit.

Because records can be delivered more than once, design your application to handle
duplicate processing.

If your application requires ordered processing within each partition, use traditional
consumer groups instead.

## Requirements

Share groups are available on Aiven for Apache Kafka services running Apache Kafka 4.2
or later. No additional service configuration is required.

To use share groups, you need:

- A Kafka client that supports share groups, such as the Apache Kafka Java client
  version 4.2 or later.
- A service user with the required ACL permissions.

Share groups use the same [ACL permissions](/docs/products/kafka/concepts/acl) as
traditional consumer groups:

- **Aiven ACLs:** Grant `read` or `readwrite` access to the topic. No separate group
  ACL is required.
- **Kafka-native ACLs:** Grant `READ` permission on the topic and group.

If you use the Apache Kafka Java client, use `KafkaShareConsumer`. The `KafkaConsumer`
class doesn't support share groups.

## Use share groups

You can use share groups with existing Kafka topics. You don't need to create a new
topic or change how you produce records. Share groups and traditional consumer groups
can consume records from the same topic independently.

To start using a share group:

1. Connect a compatible share consumer to your Aiven for Apache Kafka service.
1. Configure a new group ID and subscribe to a topic.
1. To process records concurrently, start additional share consumers with the same
   group ID.

Kafka creates the share group when the first share consumer joins. Each group ID
identifies a single group type, so you can't change an existing share group into a
traditional consumer group, or vice versa.

For more information about implementing share consumers, including acknowledgment
types and modes, see the
[Apache Kafka `KafkaShareConsumer` API](https://kafka.apache.org/43/javadoc/org/apache/kafka/clients/consumer/KafkaShareConsumer.html).

## Configure share groups

You can choose where a new share group starts reading and tune share group behavior.

### Choose where a new group starts reading

By default, a new share group starts consuming newly produced records
(`share.auto.offset.reset=latest`). To consume records already in the topic, set
`share.auto.offset.reset` to `earliest` before the group starts consuming.

This is a group-level configuration, not an Aiven service setting. Use
`kafka-configs.sh` to set it:

```bash
bin/kafka-configs.sh \
  --bootstrap-server SERVICE_HOST:SERVICE_PORT \
  --command-config configuration.properties \
  --entity-type groups \
  --entity-name GROUP_ID \
  --alter \
  --add-config share.auto.offset.reset=earliest
```

Replace the following:

- `SERVICE_HOST:SERVICE_PORT`: Host and port of your Aiven for Apache Kafka service.
- `GROUP_ID`: ID of your share group.

The `configuration.properties` file contains your connection and authentication settings. For
more information, see
[Configure properties for Apache Kafka toolbox](/docs/products/kafka/howto/kafka-tools-config-file).

This setting controls only where a new group starts reading. It doesn't reset the
progress of a group that is already consuming.

For other supported values, see
[Apache Kafka group configurations](https://kafka.apache.org/43/configuration/group-configs/).

### Tune share groups

You can adjust the following share group settings using your service's advanced
configuration.

| Option | Description |
|---|---|
| `kafka.group_share_record_lock_duration_ms` | How long a record remains locked before it can be delivered again. |
| `kafka.group_share_delivery_count_limit` | Maximum number of times a record can be delivered to a share group. |
| `kafka.group_share_partition_max_record_locks` | Maximum number of records that can be locked per share group partition. |
| `kafka.group_share_max_size` | Maximum number of members allowed in a share group. |

For more options and supported values, see
[Advanced parameters for Aiven for Apache Kafka](/docs/products/kafka/reference/advanced-params).

## Monitor share groups

Aiven for Apache Kafka exposes share group metrics through Prometheus, including share
fetch requests, share acknowledgment requests, request failures, and record
acknowledgments.

For the available metrics, see
[Aiven for Apache Kafka metrics available via Prometheus](/docs/products/kafka/reference/kafka-metrics-prometheus#share-group-metrics).

To view share group members, state, and lag, use the Apache Kafka
`kafka-share-groups.sh` tool. For more information, see
[Managing share groups](https://kafka.apache.org/43/operations/basic-kafka-operations/#managing-share-groups).

<RelatedPages/>

- [Access control lists in Aiven for Apache Kafka](/docs/products/kafka/concepts/acl)
