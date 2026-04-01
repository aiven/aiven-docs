---
title: Manage quotas in Aiven for Apache Kafka®
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"
import RelatedPages from "@site/src/components/RelatedPages";

Manage quotas in your Aiven for Apache Kafka® service to control network throughput and CPU usage per client.

## Prerequisites

- An [Aiven for Apache Kafka® service](/docs/products/kafka/get-started/create-kafka-service).
- Access to the [Aiven Console](https://console.aiven.io/) or an authenticated [Aiven CLI](/docs/tools/cli).
- A [personal access token](/docs/platform/howto/create_authentication_token) for API requests.

## Add quota

<Tabs groupId="quota">
<TabItem value="console" label="Aiven Console" default>

1. Log in to [Aiven Console](https://console.aiven.io/) and select your Kafka service.
1. Click <ConsoleLabel name="quotas" /> in the sidebar.
1. Click **Add quota**.
1. Enter the **Client ID** or **User**.
1. Set one or more quota values:
   - **Consumer throttle**: Maximum data rate for consumers, in bytes per second.
   - **Producer throttle**: Maximum data rate for producers, in bytes per second.
   - **CPU throttle**: Maximum CPU usage for the client, as a percentage.

   :::note
   Enter `default` to apply the quota to all clients or users.
   :::

1. Click **Add**.

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

Send a request to the [ServiceKafkaQuotaCreate](https://api.aiven.io/doc/#tag/Service:_Kafka/operation/ServiceKafkaQuotaCreate)
endpoint:

```bash
curl -X POST https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME/quota \
  -H "Authorization: Bearer $AIVEN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "user": "alice",
    "consumer_byte_rate": 1048576,
    "producer_byte_rate": 1048576
  }'
```

Replace `PROJECT_NAME` and `SERVICE_NAME` with your Aiven project name and Kafka service
name.

</TabItem>
</Tabs>

## View quotas

<Tabs groupId="quota">
<TabItem value="console" label="Aiven Console" default>

1. Access the [Aiven Console](https://console.aiven.io/) and open your Aiven for Apache
   Kafka® service.
1. Click <ConsoleLabel name="quotas" />.

The page lists all configured quotas.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

```bash
avn service quota list kafka-doc
```

</TabItem>
<TabItem value="api" label="Aiven API">

Send a request to the [ServiceKafkaQuotaList](https://api.aiven.io/doc/#tag/Service:_Kafka/operation/ServiceKafkaQuotaList)
endpoint:

```bash
curl https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME/quota \
  -H "Authorization: Bearer $AIVEN_TOKEN"
```

Replace `PROJECT_NAME` and `SERVICE_NAME` with your Aiven project name and Kafka service
name.

</TabItem>
</Tabs>

## Update quota

<Tabs groupId="quota">
<TabItem value="console" label="Aiven Console" default>

1. Access the [Aiven Console](https://console.aiven.io/) and open your Aiven for Apache
   Kafka® service.
1. Click <ConsoleLabel name="quotas" />.
1. Find the quota to update.
1. Click <ConsoleLabel name="actions" /> > **Update**.
1. Update the quota values.
1. Click **Save changes**.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Run `avn service quota create` again with the same `--user` or `--client-id` to overwrite
existing values:

```bash
avn service quota create kafka-doc \
  --user alice \
  --consumer-byte-rate 2097152
```

</TabItem>
<TabItem value="api" label="Aiven API">

Send another request to the [ServiceKafkaQuotaCreate](https://api.aiven.io/doc/#tag/Service:_Kafka/operation/ServiceKafkaQuotaCreate)
endpoint with the updated values to overwrite the existing quota.

</TabItem>
</Tabs>

## Delete quota

<Tabs groupId="quota">
<TabItem value="console" label="Aiven Console" default>

1. Access the [Aiven Console](https://console.aiven.io/) and open your Aiven for Apache
   Kafka® service.
1. Click <ConsoleLabel name="quotas" />.
1. Find the quota to delete.
1. Click <ConsoleLabel name="actions" /> > **Delete**.
1. Click **Delete quota** to confirm.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

```bash
avn service quota delete kafka-doc --user alice
```

</TabItem>
<TabItem value="api" label="Aiven API">

Send a request to the [ServiceKafkaQuotaDelete](https://api.aiven.io/doc/#tag/Service:_Kafka/operation/ServiceKafkaQuotaDelete)
endpoint:

```bash
curl -X DELETE "https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME/quota?user=alice" \
  -H "Authorization: Bearer $AIVEN_TOKEN"
```

Replace `PROJECT_NAME` and `SERVICE_NAME` with your Aiven project name and Kafka service
name.

</TabItem>
</Tabs>

<RelatedPages/>

- [Quotas in Aiven for Apache Kafka®](/docs/products/kafka/concepts/kafka-quotas)
- [`avn service quota`](/docs/tools/cli/service/quota)
