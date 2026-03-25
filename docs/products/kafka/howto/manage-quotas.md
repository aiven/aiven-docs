---
title: Manage quotas in Aiven for Apache Kafka®
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"
import RelatedPages from "@site/src/components/RelatedPages";

Manage quotas for your Aiven for Apache Kafka® service to control network throughput
and CPU usage per client. For an overview of quotas, see
[Quotas in Aiven for Apache Kafka®](/docs/products/kafka/concepts/kafka-quotas).

## Prerequisites

- An [Aiven for Apache Kafka® service](/docs/products/kafka/get-started/create-kafka-service) running.
- Access to the [Aiven Console](https://console.aiven.io/) or
  [Aiven CLI](/docs/tools/cli) installed and authenticated.

## Add quota

<Tabs groupId="quota">
<TabItem value="console" label="Aiven Console" default>

1. Log in to [Aiven Console](https://console.aiven.io/) and select your
   Aiven for Apache Kafka service.
1. Select **Quotas** from the left sidebar and select **Add quota**.
1. Enter the **Client ID** or **User** for which to set the quota.
1. Choose one or more quota types and enter the desired value:
   - **Consumer throttle** (bytes per second): Maximum data rate for consumers.
   - **Producer throttle** (bytes per second): Maximum data rate for producers.
   - **CPU throttle** (percentage): Maximum CPU usage for the client.

   :::note
   To apply a quota to all clients or all users, enter `default` in the
   **Client ID** or **User** field.
   :::

1. Select **Add**.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Use [`avn service quota create`](/docs/tools/cli/service/quota) with at least one of
`--client-id` or `--user`, and at least one quota parameter.

**Example:** Set a 1 MiB/s producer and consumer throttle for user `alice`:

```bash
avn service quota create kafka-doc \
  --user alice \
  --consumer-byte-rate 1048576 \
  --producer-byte-rate 1048576
```

**Example:** Set a default quota for all users:

```bash
avn service quota create kafka-doc \
  --user default \
  --consumer-byte-rate 5242880
```

</TabItem>
<TabItem value="api" label="Aiven API">

Call the [ServiceKafkaQuotaCreate](https://api.aiven.io/doc/#tag/Service:_Kafka/operation/ServiceKafkaQuotaCreate)
endpoint:

```bash
curl -X POST https://api.aiven.io/v1/project/{project}/service/{service}/quota \
  -H "Authorization: Bearer $AIVEN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "user": "alice",
    "consumer_byte_rate": 1048576,
    "producer_byte_rate": 1048576
  }'
```

</TabItem>
</Tabs>

## View quotas

<Tabs groupId="quota">
<TabItem value="console" label="Aiven Console" default>

1. Log in to [Aiven Console](https://console.aiven.io/) and select your
   Aiven for Apache Kafka service.
1. Select **Quotas** from the left sidebar to see all configured quotas.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

```bash
avn service quota list kafka-doc
```

</TabItem>
<TabItem value="api" label="Aiven API">

Call the [ServiceKafkaQuotaList](https://api.aiven.io/doc/#tag/Service:_Kafka/operation/ServiceKafkaQuotaList)
endpoint:

```bash
curl https://api.aiven.io/v1/project/{project}/service/{service}/quota \
  -H "Authorization: Bearer $AIVEN_TOKEN"
```

</TabItem>
</Tabs>

## Update quota

<Tabs groupId="quota">
<TabItem value="console" label="Aiven Console" default>

1. Select **Quotas** from the left sidebar for your Apache Kafka service.
1. Locate the quota to update and select **Update** from the ellipsis menu.
1. Modify the quota value as needed and select **Save changes**.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Run `avn service quota create` again with the same `--user` and/or `--client-id`
to overwrite the existing quota values:

```bash
avn service quota create kafka-doc \
  --user alice \
  --consumer-byte-rate 2097152
```

</TabItem>
<TabItem value="api" label="Aiven API">

Call [ServiceKafkaQuotaCreate](https://api.aiven.io/doc/#tag/Service:_Kafka/operation/ServiceKafkaQuotaCreate)
again with the updated values to overwrite the existing quota.

</TabItem>
</Tabs>

## Delete quota

<Tabs groupId="quota">
<TabItem value="console" label="Aiven Console" default>

1. Select **Quotas** from the left sidebar for your Apache Kafka service.
1. Locate the quota to delete and select **Delete** from the ellipsis menu.
1. Select **Delete quota** to confirm.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

```bash
avn service quota delete kafka-doc --user alice
```

</TabItem>
<TabItem value="api" label="Aiven API">

Call the [ServiceKafkaQuotaDelete](https://api.aiven.io/doc/#tag/Service:_Kafka/operation/ServiceKafkaQuotaDelete)
endpoint:

```bash
curl -X DELETE "https://api.aiven.io/v1/project/{project}/service/{service}/quota?user=alice" \
  -H "Authorization: Bearer $AIVEN_TOKEN"
```

</TabItem>
</Tabs>

<RelatedPages/>

- [Quotas in Aiven for Apache Kafka®](/docs/products/kafka/concepts/kafka-quotas)
- [`avn service quota`](/docs/tools/cli/service/quota)
