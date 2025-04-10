---
title: Exactly-once delivery in Aiven for Apache Kafka MirrorMaker 2
sidebar_label: Exactly-once delivery
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"
import ConsoleIcon from "@site/src/components/ConsoleIcons"

Exactly-once delivery in Aiven for Apache Kafka MirrorMaker 2 replicates each message exactly once between clusters, preventing duplicates or data loss.

## Exactly-once delivery semantics

Exactly-once delivery semantics provide a transactional guarantee for message
replication, ensuring that all messages in a batch are either fully committed to the
target cluster or not replicated at all. This maintains data consistency across clusters.

<!-- vale off -->
:::note
Exactly-once delivery does not require ACL modifications by default. However, in
external Apache Kafka setups where ACLs are applied to the `TransactionalId` resource,
review and adjust these ACLs as needed to enable exactly-once delivery.
:::

## Prerequisites

- Aiven for Apache Kafka service with [Aiven for Apache Kafka MirrorMaker 2 integration
  enabled](/docs/products/kafka/kafka-mirrormaker/get-started)
- Access to [create or modify replication flows](/docs/products/kafka/kafka-mirrormaker/howto/setup-replication-flow)
- Access to one of the following, depending on your preferred method:
  - [Aiven Console](https://console.aiven.io/)
  - [Aiven CLI](/docs/tools/cli)
  - [Aiven Terraform Provider](https://registry.terraform.io/providers/aiven/aiven/latest/docs)
  - [Aiven API](https://api.aiven.io/)

## Enable or disable exactly-once delivery

<Tabs groupId="config-methods">
<TabItem value="console" label="Aiven Console" default>

1. In the [Aiven Console](https://console.aiven.io/), open your Aiven for Apache Kafka
   service with the Aiven for Apache Kafka MirrorMaker 2 integration.
1. Click <ConsoleLabel name="integrations"/>.
1. Click the Aiven for Apache Kafka MirrorMaker 2 integration.
1. Click <ConsoleLabel name="replicationflow" /> in the sidebar.
   - To create a new flow, click **Create replication flow** .
   - To modify an existing flow, select <ConsoleLabel name="edit"/>.
1. Set **Exactly-once message delivery enabled** to **Enabled** to turn it on or
   **Disabled** to turn it off.
1. Click **Create** or **Save**.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

- Create a new replication flow with exactly-once delivery enabled:

  ```bash
  avn mirrormaker replication-flow create <service_name> \
     --source-cluster <source_cluster> \
     --target-cluster <target_cluster> \
     --replication_flow_config '{ "exactly_once_delivery_enabled": true }'
  ```

- Enable exactly-once delivery on an existing replication flow:

  ```bash
  avn mirrormaker replication-flow update <service_name> \
     --source-cluster <source_cluster> \
     --target-cluster <target_cluster> \
     --replication_flow_config '{ "exactly_once_delivery_enabled": true }'
  ```

- Disable exactly-once delivery on an existing replication flow:

  ```bash
  avn mirrormaker replication-flow update <service_name> \
     --source-cluster <source_cluster> \
     --target-cluster <target_cluster> \
     --replication_flow_config '{ "exactly_once_delivery_enabled": false }'
  ```

Parameters:

- `SERVICE_NAME`: Name of your Aiven for Apache Kafka MirrorMaker 2 service.
- `SOURCE_CLUSTER`: Alias of the source Aiven for Apache Kafka cluster.
- `TARGET_CLUSTER`: Alias of the target Aiven for Apache Kafka cluster.
- `EXACTLY_ONCE_DELIVERY_ENABLED`: Set to `true` to enable or `false` to disable
  exactly-once delivery.

</TabItem>

<TabItem value="api" label="Aiven API">

Use the [ServiceKafkaMirrorMakerCreateReplicationFlow](https://api.aiven.io/doc/#tag/Service:_Kafka_MirrorMaker/operation/ServiceKafkaMirrorMakerCreateReplicationFlow) API to create or update a replication flow
with `exactly_once_delivery_enabled` in the configuration.

- Create a new replication flow with exactly-once delivery enabled:

  ```bash
  curl -X POST "https://console.aiven.io/v1/project/<project_name>/service/<service_name>/mirrormaker/replication-flows" \
     -H "Authorization: Bearer <API_TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{
           "source_cluster": "<source_cluster>",
           "target_cluster": "<target_cluster>",
           "enabled": true,
           "exactly_once_delivery_enabled": true
         }'
  ```

- Update an existing replication flow to enable exactly-once delivery:

  ```bash
  curl -X PUT "https://console.aiven.io/v1/project/<project_name>/service/<service_name>/mirrormaker/replication-flows/<source_cluster>/<target_cluster>" \
     -H "Authorization: Bearer <API_TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{
           "exactly_once_delivery_enabled": true
         }'
  ```

- Update an existing replication flow to disable exactly-once delivery:

  ```bash
  curl -X PUT "https://console.aiven.io/v1/project/<project_name>/service/<service_name>/mirrormaker/replication-flows/<source_cluster>/<target_cluster>" \
     -H "Authorization: Bearer <API_TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{
           "exactly_once_delivery_enabled": false
         }'
  ```

Parameters:

- `PROJECT_NAME`: Name of your project.
- `SERVICE_NAME`: Name of your Aiven for Apache Kafka MirrorMaker 2 service.
- `API_TOKEN`: Your personal Aiven API
  [token](/docs/platform/howto/create_authentication_token).
- `SOURCE_CLUSTER`: Alias of the source Aiven for Apache Kafka cluster.
- `TARGET_CLUSTER`: Alias of the target Aiven for Apache Kafka cluster.
- `EXACTLY_ONCE_DELIVERY_ENABLED`: Set to `true` to enable or `false` to disable
  exactly-once delivery.

</TabItem>
<TabItem value="terraform" label="Terraform">

In your `aiven_mirrormaker_replication_flow` resource, set
[the `exactly_once_delivery_enabled` attribute](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/mirrormaker_replication_flow#exactly_once_delivery_enabled-1)
to true.

</TabItem>
</Tabs>
