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
By default, exactly-once delivery operates without requiring ACL modifications. If no
ACLs are configured for the `TransactionalId` resource, exactly-once delivery functions
as expected. However, in external Apache Kafka setups where ACLs are applied to
the `TransactionalId` resource, these ACLs may block exactly-once delivery. Review and
adjust ACLs as needed to enable transactions for exactly-once delivery.
:::

## Prerequisites

- Aiven for Apache Kafka service with Aiven for Apache Kafka MirrorMaker 2 integration.
- Permission to create or modify replication flows.

## Enable or disable exactly-once delivery

<Tabs groupId="config-methods">
<TabItem value="console" label="Aiven Console" default>

1. In the [Aiven console](https://console.aiven.io/), open your Aiven for Apache Kafka
   service with the Aiven for Apache Kafka MirrorMaker 2 integration.
1. Click <ConsoleLabel name="integrations"/>.
1. Click the Aiven for Apache Kafka MirrorMaker 2 integration.
1. Click <ConsoleLabel name="Replication flow" /> in the sidebar.
   - To create a new flow, click **Create replication flow** .
   - To modify an existing flow, select <ConsoleLabel name="edit"/>.
1. Toggle **Exactly-once message delivery enabled** to enable or disable
   exactly-once delivery.
1. Click **Create** or **Save**.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

- To enable exactly-once delivery on a new replication flow:

  ```bash
  avn mirrormaker replication-flow create <service_name> \
     --source-cluster <source_cluster> \
     --target-cluster <target_cluster> \
     --replication_flow_config '{ "exactly_once_delivery_enabled": true }'
  ```

- To enable exactly-once delivery on an existing replication flow:

  ```bash
  avn mirrormaker replication-flow update <service_name> \
     --source-cluster <source_cluster> \
     --target-cluster <target_cluster> \
     --replication_flow_config '{ "exactly_once_delivery_enabled": true }'
  ```

- To disable exactly-once delivery on an existing replication flow:

  ```bash
  avn mirrormaker replication-flow update <service_name> \
     --source-cluster <source_cluster> \
     --target-cluster <target_cluster> \
     --replication_flow_config '{ "exactly_once_delivery_enabled": false }'
  ```

Parameters:

- `<service_name>`: Name of your Aiven for Apache Kafka MirrorMaker 2 service.
- `<source_cluster>`: Alias of the source Aiven for Apache Kafka cluster.
- `<target_cluster>`: Alias of the target Aiven for Apache Kafka cluster.
- `exactly_once_delivery_enabled`: Set to `true` to enable exactly-once delivery.

</TabItem>

<TabItem value="api" label="Aiven API">

Use the
[ServiceKafkaMirrorMakerCreateReplicationFlow](https://api.aiven.io/doc/#tag/Service:_Kafka_MirrorMaker/operation/ServiceKafkaMirrorMakerCreateReplicationFlow)
API to create or update the replication flow by setting `exactly_once_delivery_enabled`
in the configuration.

- Example API request to create a new flow with exactly-once delivery enabled:

  ```json
  POST /v1/project/<project_name>/service/<service_name>/mirrormaker/replication-flows
  {
    "source_cluster": "<source_cluster>",
    "target_cluster": "<target_cluster>",
    "enabled": true,
    "exactly_once_delivery_enabled": true
  }
  ```

- Example API request to update an existing flow to enable exactly-once delivery:

  ```json
  PUT /v1/project/<project_name>/service/<service_name>/mirrormaker/replication-flows/<source_cluster>/<target_cluster>
  {
    "exactly_once_delivery_enabled": true
  }
  ```

- Example API request to update an existing flow to disable exactly-once delivery:

  ```json
  PUT /v1/project/<project_name>/service/<service_name>/mirrormaker/replication-flows/<source_cluster>/<target_cluster>
  {
    "exactly_once_delivery_enabled": false
  }
  ```

Parameters:

- `<project_name>`: Name of your project.
- `<service_name>`: Name of your Aiven for Apache Kafka MirrorMaker 2 service.
- `<source_cluster>`: Alias of the source Aiven for Apache Kafka cluster.
- `<target_cluster>`: Alias of the target Aiven for Apache Kafka cluster.
- `exactly_once_delivery_enabled`: Set to `true` to enable exactly-once delivery.

</TabItem>
</Tabs>
