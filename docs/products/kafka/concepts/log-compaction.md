---
title: Compacted topics
---

One way to reduce the disk space requirements in Apache Kafka® is to use
**compacted topics**. This methodology retains only the newest record
for each key on a topic, regardless of whether the retention period of
the message has expired or not. Depending on the application, this can
significantly reduce the amount of storage required for the topic.

To make use of log compaction, all messages sent to the topic must have
an explicit key. To enable log compaction, follow the steps described in
[how to configure log cleaner](/docs/products/kafka/howto/configure-log-cleaner).

## How compacted topics work

An Apache Kafka topic represents a continuous stream of messages that
typically get discarded after the message reaches a certain period of
time or size. However, for certain use cases it is only needed the most
recent value for a certain key.

For example, if there is a topic containing a user's home address, on
every update, a message is sent using `user_id` as the primary key and
home address as the value:

```
1001 -> "4 Privet Dr"
1002 -> "221B Baker Street"
1003 -> "Milkman Road"
1002 -> "21 Jump St"
1001 -> "Paper St"
1001 -> "Paper Road 21"
```

There are three different options to define for how long to retain the
messages:

-   **infinite message retention**: all changes to user's address are
    maintained in the logs. This can lead to the log growing in size
    without a bound. This option involves the risk of outgrowing the
    disk capacity.
-   **simple message retention**: older records are deleted after they
    reach a certain age or size.
-   **compacted topic**: only latest version of the key's value is
    kept. In the example above, only the current address for a specific
    user is kept.

With compacted topics, Apache Kafka removes any records from the topics
for which there is a newer version (based on the record key) is
available in the partition. This retention policy can be set per-topic,
so a single cluster can have some topics where retention is enforced by
size or time and other topics where retention is enforced by compaction.

## Compacted topic example

To understand better how compaction works, we will look at a partition
of a compacted topic before and after compaction has been applied.

Continuing the example above, the topic records before the compaction
would be:

 | Offset | Key  | Value             |
 | ------ | ---- | ----------------- |
 | 1      | 1001 | 4 Privet Dr       |
 | 2      | 1002 | 221B Baker Street |
 | 3      | 1003 | Milkman Road      |
 | 4      | 1002 | 21 Jump St        |
 | 5      | 1001 | Paper St          |
 | 6      | 1001 | Paper Road 21     |

You can notice that there are some records with duplicate keys (`1001`
and `1002`), with the records having offset `4`, `5`, and `6` being the
addresses updates. When applying compaction, we only keep records with
the latest offset (newest values) and the older ones get discarded. The
end result is the following:

| Offset | Key  | Value         |
| ------ | ---- | ------------- |
| 3      | 1003 | Milkman Road  |
| 4      | 1002 | 21 Jump St    |
| 6      | 1001 | Paper Road 21 |

## Compacted topic details

A compacted topic consists of an head and a tail:

-   the **head** is a traditional Apache Kafka topic where new records
    are appended. Therefore, the head can contain duplicated keys.
-   the **tail** contains one record per key. Apache Kafka compaction
    ensures that keys are unique in the tail.

Expanding the example above let's assume that the **tail** contains the
following entries:

| Offset | Key  | Value             |
| ------ | ---- | ----------------- |
| 1      | 1001 | 4 Privet Dr       |
| 2      | 1002 | 221B Baker Street |
| 3      | 1003 | Milkman Road      |

And the **head**, the newer records including duplicated keys:

| Offset | Key  | Value         |
| ------ | ---- | ------------- |
| 4      | 1002 | 21 Jump St    |
| 5      | 1001 | Paper St      |
| 6      | 1001 | Paper Road 21 |

During the compaction process, Apache Kafka creates a structure called
**offset map** for the records in the head section, containing for each
key, the latest offset.

| Key  | Offset |
| ---- | ------ |
| 1002 | 4      |
| 1001 | 6      |

The compaction thread then scans the **tail**, removing every record
having a key that is also present in the **offset map** with an higher
offset.

| Offset | Key             | Value             |
| ------ | --------------- | ----------------- |
| 1      | 1001 (`delete`) | 4 Privet Dr       |
| 2      | 1002 (`delete`) | 221B Baker Street |
| 3      | 1003            | Milkman Road      |

Lastly, the records in the offset map are added in the tail.

| Offset | Key  | Value         |
| ------ | ---- | ------------- |
| 3      | 1003 | Milkman Road  |
| 4      | 1002 | 21 Jump St    |
| 6      | 1001 | Paper Road 21 |

:::warning
The compaction occurs **per partition**: if two records with the same
key land in different partitions, they will not be compacted.

This usually doesn't happen since the record key is used to select the
partition. However, for custom message routing this might be an issue.
:::
