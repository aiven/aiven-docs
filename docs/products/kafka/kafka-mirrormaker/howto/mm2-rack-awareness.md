---
title: Configure rack awareness in Aiven for Apache Kafka® MirrorMaker 2
sidebar_label: Configure rack awareness
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"
import ConsoleIcon from "@site/src/components/ConsoleIcons"
import RelatedPages from "@site/src/components/RelatedPages";

Configure rack awareness in Aiven for Apache Kafka® MirrorMaker 2 to reduce cross-Availability Zone (AZ) network traffic by preferring follower replicas in the same AZ as the MirrorMaker node.

## About rack awareness in MirrorMaker 2

Rack awareness works only when follower fetching is enabled on both the source Kafka
service and the MirrorMaker 2 service. When follower fetching is enabled, MirrorMaker 2
prefers reading from follower replicas in the same availability zone when those replicas
are in sync, reducing data transfer across zones.

If follower fetching is disabled on either service, MirrorMaker 2 reads from leaders and
rack awareness has no effect.

To learn how these features work together, see
[Follower fetching in Aiven for Apache Kafka®](/docs/products/kafka/concepts/follower-fetching).

## Configuration hierarchy

MirrorMaker 2 applies rack awareness using the following rules:

1. If `follower_fetching_enabled = false`: rack awareness is disabled for all integrations.
1. If `follower_fetching_enabled = true`:
   - External Kafka clusters: rack awareness is always disabled.
   - Aiven-hosted Kafka services:
     - If `rack_id` is set in the integration configuration, that value is used.
     - If `rack_id` is not set, the node’s AZ is used as the rack ID.

## Prerequisites

- A running Aiven for Apache Kafka® MirrorMaker 2 service.
- Follower fetching enabled on the **source Aiven for Apache Kafka® service**.
  MirrorMaker 2 applies rack awareness only when both the source Kafka service
  (`follower_fetching.enabled=true`) and the MirrorMaker 2 service
  (`kafka_mirrormaker.follower_fetching_enabled=true`) have follower fetching enabled.
- Identify the availability zones (AZs) for your Kafka brokers if you plan to use
  custom `rack_id` values:

  - [AWS: Map AZ IDs to names](https://repost.aws/knowledge-center/vpc-map-cross-account-availability-zones)
  - [Google Cloud: Regions and zones](https://cloud.google.com/compute/docs/regions-zones)

:::note
Rack awareness is disabled for integrations with external Kafka clusters.
:::

## Enable rack awareness

Rack awareness is controlled using the `follower_fetching_enabled` flag in the
MirrorMaker 2 service configuration.

<Tabs groupId="config-methods">
<TabItem value="console" label="Console" default>

1. In the [Aiven Console](https://console.aiven.io), open your MirrorMaker 2 service.
1. Click <ConsoleLabel name="service settings"/>.
1. In **Advanced configuration**, click **Configure**.
1. Click <ConsoleIcon name="Add config options"/>.
1. Set `kafka_mirrormaker.follower_fetching_enabled` to **Enabled** or **Disabled**.
1. Click **Save configurations**.

</TabItem>
<TabItem value="cli" label="CLI">

```bash
avn service update SERVICE_NAME \
  -c kafka_mirrormaker.follower_fetching_enabled=true
```

</TabItem>
<TabItem value="api" label="API">

```bash
curl --request PUT \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME \
  --header 'Authorization: Bearer TOKEN' \
  --header 'content-type: application/json' \
  --data '{
    "user_config": {
      "kafka_mirrormaker": {
        "follower_fetching_enabled": true
      }
    }
  }'
```

</TabItem>
<TabItem value="terraform" label="Terraform">

```hcl
resource "aiven_kafka_mirrormaker" "mm2" {
  project      = var.project_name
  service_name = "my-mm2-service"
  cloud_name   = "google-us-east1"
  plan         = "business-4"

  kafka_mirrormaker_user_config {
    kafka_mirrormaker {
      follower_fetching_enabled = true
    }
  }
}
```

</TabItem>
</Tabs>

## Override the rack ID per integration

To override the default AZ-based rack assignment, set a custom `rack_id` in the
MirrorMaker 2 integration configuration.

<Tabs groupId="config-methods">
<TabItem value="console" label="Console" default>

1. In the [Aiven Console](https://console.aiven.io), open your MirrorMaker 2 service.
1. Click <ConsoleLabel name="integrations"/>.
1. Select the integration to update.
1. In **Advanced configuration**, set the `rack_id` to your custom value
   (for example, `use1-az1`).
1. Click **Save changes**.

</TabItem>
<TabItem value="cli" label="CLI">

```bash
avn service integration-update \
  --project PROJECT_NAME \
  --user-config-json '{"rack_id": "use1-az1"}' \
  INTEGRATION_ID

```

Replace `PROJECT_NAME`, `INTEGRATION_ID`, and `use1-az1`.

</TabItem>
<TabItem value="api" label="API">

```bash
curl --request PUT \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/integration/INTEGRATION_ID \
  --header 'Authorization: Bearer TOKEN' \
  --header 'content-type: application/json' \
  --data '{
    "user_config": {
      "rack_id": "use1-az1"
    }
  }'
```

Replace the placeholders with your values.

</TabItem>
<TabItem value="terraform" label="Terraform">

```hcl
resource "aiven_service_integration" "mm2_integration" {
  project                  = var.project_name
  integration_type         = "kafka_mirrormaker"
  source_service_name      = aiven_kafka.source.service_name
  destination_service_name = aiven_mirrormaker.mm2.service_name

  mirrormaker_user_config {
    cluster_alias = "source-cluster"
    rack_id       = "use1-az1"
  }
}
```

</TabItem>
</Tabs>



## Example configurations

For a deeper explanation of how rack awareness works with follower fetching, see
[Enable follower fetching in Aiven for Apache Kafka®](/docs/products/kafka/howto/enable-follower-fetching).

Below are examples specific to MirrorMaker 2 integrations.

### AZ-based rack ID (default)

| Node AZ          | Rack ID used     | Behavior                              |
| ---------------- | ---------------- | ------------------------------------- |
| `use1-az1`       | `use1-az1`       | Reads/writes to brokers in `use1-az1` |
| `europe-west1-b` | `europe-west1-b` | Reads/writes to brokers in same AZ    |

### Custom rack ID per integration

```json
{
  "cluster_alias": "kafka-source",
  "rack_id": "custom-rack-1"
}
```

This overrides the node's AZ. MirrorMaker uses `custom-rack-1` for that integration.

### Mixed setup

| Integration            | `rack_id` value | Rack ID used            |
| ---------------------- | --------------- | ----------------------- |
| Aiven-hosted service A | Not set         | Node’s AZ               |
| Aiven-hosted service B | `custom-rack`   | `custom-rack`           |
| External Kafka service | Any value       | Rack awareness disabled |

<RelatedPages/>

- [Follower fetching in Aiven for Apache Kafka®](/docs/products/kafka/concepts/follower-fetching)
- [Enable follower fetching in Aiven for Apache Kafka®](/docs/products/kafka/howto/enable-follower-fetching)
- [Aiven for Apache Kafka® MirrorMaker 2](/docs/products/kafka/kafka-mirrormaker)
