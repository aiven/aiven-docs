---
title: Include or exclude topics in a replication flow
---

When you [define a replication flow](/docs/products/kafka/kafka-mirrormaker/howto/setup-replication-flow), specify which topics in the source Apache Kafka® cluster to include or exclude from the cross-cluster replica.

Use the **Topics** field to define the topics to include. You can enter a
[list of regular expressions in Java format](https://docs.oracle.com/javase/7/docs/api/java/util/regex/Pattern).
If you leave **Topics** empty, MirrorMaker 2 uses `.*` and includes all topics.

Use the **Topic blacklist** field to define the topics to exclude. To exclude
internal topics, click **Internal topics**, which adds these patterns:
`.*[\-\.]internal`, `.*\.replica`, and `__.*`.

## Example: Include and exclude topics

To replicate the `warehouse.operations` topic and any topic that starts with
`customer.`, but exclude the `customer.support` topic, use these values:

- **Topics**: `customer\..*` and `warehouse\.operations`
- **Topic blacklist**: `customer\.support`
