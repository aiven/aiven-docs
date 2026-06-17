---
title: Switch a classic topic to a diskless topic
sidebar_label: Switch a topic to diskless
early: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RelatedPages from "@site/src/components/RelatedPages";

Switch an existing classic topic in Aiven for Apache Kafka® to a diskless topic without manually copying data or renaming the topic.
The topic remains available during the switch.

Records written before the switch remain readable from the classic topic log,
and new records are written to the diskless topic.
This feature applies only to Aiven for Apache Kafka services that have
[diskless topics](/docs/products/kafka/diskless/concepts/diskless-topic-overview)
enabled.

## Prerequisites

Before you switch a topic, make sure that:

- Diskless topics are enabled for the service.
- [Tiered storage](/docs/products/kafka/howto/configure-topic-tiered-storage) is
  enabled for the topic.
- Unclean leader election is turned off for the topic.
- You have access to one of the following:
  - [Aiven CLI](/docs/tools/cli) installed and authenticated.
  - [Aiven API token](/docs/platform/howto/create_authentication_token) for API
    requests.

## Considerations

Before switching a topic, review the following:

- The switch is one-way. You cannot switch a diskless topic back to a classic
  topic.
- Diskless topic limitations apply after the switch. Review
  [Limitations of diskless topics](/docs/products/kafka/diskless/concepts/limitations)
  to confirm that diskless topics support your workload.

## Switch a topic to diskless

To switch a topic, enable diskless for the topic by setting `diskless_enable=true`.
Use the Aiven CLI or Aiven API to switch a topic. This action is not available
in the Aiven Console.

<Tabs groupId="switch-method">
<TabItem value="cli" label="Aiven CLI" default>

Run the following command:

```bash
avn service topic-update SERVICE_NAME TOPIC_NAME \
  --project PROJECT_NAME \
  --config diskless_enable=true
```

Replace the following values:

- `PROJECT_NAME`: Name of your Aiven project.
- `SERVICE_NAME`: Name of your Aiven for Apache Kafka service.
- `TOPIC_NAME`: Name of the topic to switch.

</TabItem>
<TabItem value="api" label="Aiven API">

Send a request to update the topic configuration:

```bash
API_URL="https://api.aiven.io/v1/project/PROJECT_NAME/service"
API_URL="${API_URL}/SERVICE_NAME/topic/TOPIC_NAME"

curl --request PUT \
  --url "${API_URL}" \
  --header "Authorization: Bearer TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "config": {
      "diskless_enable": true
    }
  }'
```

Replace the following values:

- `PROJECT_NAME`: Name of your Aiven project.
- `SERVICE_NAME`: Name of your Aiven for Apache Kafka service.
- `TOPIC_NAME`: Name of the topic to switch.
- `TOKEN`: Your Aiven API token.

</TabItem>
</Tabs>

The topic keeps its existing tiered storage setting. Do not set
`remote_storage_enable` in the same request. If you set both properties, the
request returns an error.

After the update request succeeds, Aiven starts switching each partition in the
topic.

## Check the topic configuration

The switch runs asynchronously and completes independently for each partition.
Checking the topic configuration confirms that the switch request was accepted.

<Tabs groupId="confirm-method">
<TabItem value="cli" label="Aiven CLI" default>

Run the following command:

```bash
avn service topic-get SERVICE_NAME TOPIC_NAME \
  --project PROJECT_NAME
```

In the output, verify that `diskless_enable` is set to `true`.

</TabItem>
<TabItem value="api" label="Aiven API">

Send a request to get the topic configuration:

```bash
API_URL="https://api.aiven.io/v1/project/PROJECT_NAME/service"
API_URL="${API_URL}/SERVICE_NAME/topic/TOPIC_NAME"

curl --request GET \
  --url "${API_URL}" \
  --header "Authorization: Bearer TOKEN"
```

In the response, verify that `diskless_enable` is set to `true`.

</TabItem>
</Tabs>

## What to expect during the switch

During the switch:

- The topic remains available.
- Producers might briefly receive retriable errors while each partition is
  switched, such as `NOT_LEADER_FOR_PARTITION` or request timeouts. Most Kafka
  clients retry these errors by default.
- Consumer applications do not need changes to read records written before or
  after the switch.
- The topic name and retention settings do not change.
- Partitions switch independently, so some partitions might finish before others.

## How the switch works

When you switch a topic to diskless, Aiven does the following for each
partition:

1. Briefly stops writes to the classic topic log.
1. Waits until all records written to the classic topic log are safely
   replicated.
1. Records the offset where the diskless topic takes over.
1. Initializes the diskless topic from that offset and routes new writes to it.

Records written before the switch, including records already moved to tiered
storage, remain readable until they expire based on the topic retention settings.

<RelatedPages/>

- [Diskless topics](/docs/products/kafka/diskless/concepts/diskless-topic-overview)
- [Enable and configure tiered storage for topics](/docs/products/kafka/howto/configure-topic-tiered-storage)
- [Create Apache Kafka topics](/docs/products/kafka/howto/create-topic)
