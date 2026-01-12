---
title: Configure rack awareness in Aiven for Apache Kafka® MirrorMaker 2
sidebar_label: Configure rack awareness
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"
import ConsoleIcon from "@site/src/components/ConsoleIcons"
import RelatedPages from "@site/src/components/RelatedPages";

Configure rack awareness in Aiven for Apache Kafka® MirrorMaker 2 to reduce cross-availability zone (AZ) network traffic by directing MirrorMaker to read from local follower replicas instead of remote partition leaders.

## About rack awareness in MirrorMaker 2

Rack awareness in MirrorMaker 2 depends on follower fetching being enabled on the source
Aiven for Apache Kafka® service and for the replication flow.

When follower fetching is enabled for a replication flow, MirrorMaker assigns a rack ID
based on the MirrorMaker node availability zone (or the integration `rack_id`, if set).
MirrorMaker then prefers reading from in-sync follower replicas in the same availability
zone. This reduces cross-AZ network traffic and associated costs.

Follower fetching is enabled by default for new replication flows. If follower fetching
is disabled for a replication flow, MirrorMaker reads only from partition leaders for
that flow and rack awareness has no effect.

Rack awareness is supported only when replicating between Aiven-hosted Kafka services.
It is disabled for endpoint (external Kafka) integrations because availability zones and
racks cannot be mapped reliably.

For details on follower fetching, see
[Follower fetching in Aiven for Apache Kafka®](/docs/products/kafka/concepts/follower-fetching).

## When to use rack awareness

Use rack awareness when:

- MirrorMaker 2 and the source Kafka service run across multiple availability zones.
- Cross-AZ network costs or latency are a concern.
- The source Kafka service is hosted on Aiven.

Rack awareness does not provide benefits when the Kafka cluster runs in a single
availability zone.

## Configuration hierarchy

By default, MirrorMaker 2 assigns the node availability zone as the rack ID and prefers
follower replicas in the same availability zone.

Rack awareness behavior follows this order:

1. **MirrorMaker 2 service setting:** If follower fetching is disabled at the service
   level, rack awareness is disabled for all replication flows.
1. **Replication flow setting:** If follower fetching is disabled for a replication
   flow, rack awareness is disabled for that flow.
1. **Rack ID selection for Aiven-hosted Kafka services:**
   - If `rack_id` is set for the integration, that value is used.
   - Otherwise, the node availability zone is used as the rack ID.

## Prerequisites

- A running Aiven for Apache Kafka® MirrorMaker 2 service.
- Follower fetching enabled on the source Aiven for Apache Kafka® service.
- Availability zone (AZ) information for Kafka brokers if you plan to configure a custom
  `rack_id` value:
  - [AWS: Map AZ IDs to names](https://repost.aws/knowledge-center/vpc-map-cross-account-availability-zones)
  - [Google Cloud: Regions and zones](https://cloud.google.com/compute/docs/regions-zones)

## Enable or disable rack awareness for a replication flow

Rack awareness is controlled by
[follower fetching](/docs/products/kafka/howto/enable-follower-fetching) and can be
enabled or disabled per replication flow.

When enabled, MirrorMaker assigns a rack ID based on the node availability zone (or the
integration `rack_id`, if set) and prefers reading from in-sync follower replicas in the
same availability zone. When disabled, MirrorMaker reads from partition leaders for that
replication flow.

1. In the [Aiven Console](https://console.aiven.io), open the MirrorMaker 2 service.
1. Click **Replication flows**.
1. Create a replication flow or edit an existing one.
1. Set **Follower fetching enabled** to on or off.
1. Click **Create** or **Save**.

## Enable or disable rack awareness for the MirrorMaker 2 service

Disabling follower fetching at the service level acts as a global override.

When disabled, follower fetching and rack awareness are disabled for all replication
flows, regardless of the per-flow setting.

Disable this setting only if MirrorMaker 2 must always read from partition leaders.

<Tabs groupId="config-methods">
<TabItem value="console" label="Console" default>

1. In the [Aiven Console](https://console.aiven.io), open the MirrorMaker 2 service.
1. Click <ConsoleLabel name="service settings"/>.
1. In **Advanced configuration**, click **Configure**.
1. Click <ConsoleIcon name="Add config options"/>.
1. Set `kafka_mirrormaker.follower_fetching_enabled` to **Disabled**.
1. Click **Save configurations**.

</TabItem>
<TabItem value="cli" label="CLI">

```bash
avn service update SERVICE_NAME \
  -c kafka_mirrormaker.follower_fetching_enabled=false
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
        "follower_fetching_enabled": false
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
      follower_fetching_enabled = false
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

| Node AZ          | Rack ID used     | Behavior                                      |
| ---------------- | ---------------- | --------------------------------------------- |
| `use1-az1`       | `use1-az1`       | Reads and writes to brokers in `use1-az1`     |
| `europe-west1-b` | `europe-west1-b` | Reads and writes to brokers in the same AZ    |

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
