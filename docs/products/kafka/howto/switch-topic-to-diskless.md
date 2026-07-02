---
title: Switch a classic topic to a diskless topic
sidebar_label: Switch to a diskless topic
early: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RelatedPages from "@site/src/components/RelatedPages";

Switch an existing
[classic topic](/docs/products/kafka/diskless/concepts/topics-vs-classic)
in Aiven for Apache Kafka® to a diskless topic.
You do not need to copy data or rename the topic. The topic remains available during the
switch.

Records written before the switch remain readable from the classic topic log,
and new records are written to the diskless topic.

Switching a topic to diskless applies only to Aiven for Apache Kafka services
that have
[diskless topics](/docs/products/kafka/diskless/concepts/diskless-topic-overview)
enabled.

:::note
This feature is in
[early availability](/docs/platform/concepts/service-and-feature-releases#early-availability-)
and is not enabled by default. To request access, contact your account team or
[Aiven support](/docs/platform/howto/support#create-a-support-ticket).
:::

## Prerequisites

- [Diskless topics](/docs/products/kafka/diskless/concepts/diskless-topic-overview)
  are enabled for the service.
- The service runs Apache Kafka® 4.1 or later.
- Unclean leader election is turned off for the topic. If unclean leader election
  is enabled, the switch does not start.
- You have access to one of the following:

  - [Aiven CLI](/docs/tools/cli) installed and authenticated.
  - [Aiven API token](/docs/platform/howto/create_authentication_token) for API
    requests.

## Considerations

Before switching a topic, review the following:

- The switch is one-way. You can't switch a diskless topic back to a classic
  topic. This might change in a future release.
- Diskless topic limitations apply after the switch. Review
  [Limitations of diskless topics](/docs/products/kafka/diskless/concepts/limitations)
  to confirm that diskless topics support your workload.
- The switch runs in the background. A successful update request doesn't mean
  that every partition has finished switching. You can't view per-partition
  switch status or progress in the Aiven CLI, Aiven API, topic configuration,
  or customer-facing metrics integrations.

## Switch a topic to a diskless topic

To switch a classic topic to a diskless topic, enable diskless for the topic using the
Aiven CLI or Aiven API.

:::note
The topic keeps its existing tiered storage setting. Do not include
`remote_storage_enable` in the diskless update request. If you set
`remote_storage_enable` and `diskless_enable` in the same request, the request
returns an error.
:::

<Tabs groupId="switch-method">
<TabItem value="cli" label="Aiven CLI" default>

Run the following command:

```bash
avn service topic-update SERVICE_NAME TOPIC_NAME \
  --project PROJECT_NAME \
  --partitions PARTITION_COUNT \
  --diskless-enable
```

Replace the following values:

- `PROJECT_NAME`: Name of your Aiven project.
- `SERVICE_NAME`: Name of your Aiven for Apache Kafka service.
- `TOPIC_NAME`: Name of the topic to switch.
- `PARTITION_COUNT`: Current number of partitions in the topic. Use the existing
  partition count. Do not change the partition count as part of the switch.

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

After the update request succeeds, Aiven starts switching the topic to a
diskless topic.

## Verify the topic configuration

Verify the topic configuration to confirm that the diskless switch request was
accepted.

<Tabs groupId="confirm-method">
<TabItem value="cli" label="Aiven CLI" default>

This command uses `jq` to filter the output for the selected topic.

Run the following command:

```bash
avn service topic-list SERVICE_NAME \
  --project PROJECT_NAME \
  --json | jq '.[] | select(.topic_name=="TOPIC_NAME")'
```

Replace the following values:

- `PROJECT_NAME`: Name of your Aiven project.
- `SERVICE_NAME`: Name of your Aiven for Apache Kafka service.
- `TOPIC_NAME`: Name of the topic.

In the output, verify that `diskless_enable` and `remote_storage_enable` are
both set to `true`. This confirms that Aiven accepted the diskless switch
request. Per-partition switch status or progress isn't exposed in the topic
configuration.

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

Replace the following values:

- `PROJECT_NAME`: Name of your Aiven project.
- `SERVICE_NAME`: Name of your Aiven for Apache Kafka service.
- `TOPIC_NAME`: Name of the topic.
- `TOKEN`: Your Aiven API token.

In the response, verify that `diskless_enable` and `remote_storage_enable` are
both set to `true`. This confirms that Aiven accepted the diskless switch
request. Per-partition switch status or progress isn't exposed in the topic
configuration.

</TabItem>
</Tabs>

## What to expect during the switch

During the switch:

- The topic remains available.
- Producers might briefly receive retriable errors while the topic is switched.
  Most Kafka clients retry these errors by default.
- Consumer applications do not need changes to read records written before or
  after the switch.
- The topic name and retention settings do not change.
- Aiven manages the partition-level switch process. No action is required after
  the update request succeeds.

## How the switch works

When you switch a topic to a diskless topic, Aiven does the following for each
partition:

1. Briefly pauses writes to the classic topic log.
1. Waits until all records written to the classic topic log are safely
   replicated.
1. Records the offset where the diskless topic takes over.
1. Initializes the diskless topic from that offset and routes new writes to it.

Records written before the switch, including records already moved to tiered
storage, remain readable until they expire based on the topic retention settings.

<RelatedPages/>

- [Diskless topics](/docs/products/kafka/diskless/concepts/diskless-topic-overview)
- [Diskless vs. classic topics](/docs/products/kafka/diskless/concepts/topics-vs-classic)
- [Enable and configure tiered storage for topics](/docs/products/kafka/howto/configure-topic-tiered-storage)
- [Create Apache Kafka topics](/docs/products/kafka/howto/create-topic)
