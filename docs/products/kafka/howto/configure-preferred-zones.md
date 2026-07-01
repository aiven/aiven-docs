---
title: Configure preferred availability zones for Aiven for Apache Kafka®
sidebar_label: Configure preferred zones
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Configure preferred availability zones to control where your Aiven for Apache Kafka® service nodes are placed within a cloud region.

By default, Aiven distributes Kafka service nodes across the available zones in a
cloud region. With preferred zones, you can limit node placement to specific
availability zones (AZs) while keeping the service highly available.

Use preferred zones to:

- Reduce cross-AZ data transfer costs by placing Kafka nodes closer to your
  applications.
- Reduce latency between Kafka nodes and client applications.
- Meet requirements that restrict workloads to specific zones within a region.
- Align broker placement with consumer locations when using follower fetching.

## Prerequisites

- An Aiven for Apache Kafka service on AWS, Google Cloud, or Azure.
- The zone IDs for your cloud region.
- [Aiven CLI](/docs/tools/cli), to configure preferred zones from the command line.

## Zone ID formats

Zone ID formats vary by cloud provider.

| Cloud provider | Format | Examples |
| ------------- | ------ | -------- |
| AWS | Zone ID | `use1-az1`, `use1-az2`, `euc1-az1` |
| Google Cloud | Zone name | `europe-west1-a`, `us-central1-b` |
| Azure | Location and zone number | `germanywestcentral/1`, `westeurope/2` |

::::note[AWS zone IDs]
AWS availability zone names, such as `us-east-1a`, can map to different physical
locations in different accounts. Use zone IDs, such as `use1-az1`, because they are
consistent across all accounts. For more information, see
[AWS documentation on AZ IDs](https://docs.aws.amazon.com/ram/latest/userguide/working-with-az-ids).
::::

## Configure preferred zones

<Tabs groupId="config-methods">
<TabItem value="console" label="Console" default>

1. In the [Aiven Console](https://console.aiven.io), select your
   Aiven for Apache Kafka service.
1. Click <ConsoleLabel name="service settings"/>.
1. In the **Advanced configuration** section, click **Configure**.
1. In **`preferred_zones`**, enter the zone IDs, separated by commas.

   Example:

   ```text
   use1-az1,use1-az2,use1-az3
   ```

1. Click **Save changes**.

</TabItem>
<TabItem value="cli" label="CLI">

To configure preferred zones for an existing service, run:

```bash
avn service update SERVICE_NAME \
  -c preferred_zones='["use1-az1", "use1-az2", "use1-az3"]'
```

To configure preferred zones when you create a service, run:

```bash
avn service create SERVICE_NAME \
  --service-type kafka \
  --plan business-4 \
  --cloud aws-us-east-1 \
  -c preferred_zones='["use1-az1", "use1-az2", "use1-az3"]'
```

Replace the following:

- `SERVICE_NAME`: Name of your Aiven for Apache Kafka service.
- `preferred_zones`: JSON array of zone IDs where nodes can be placed.

</TabItem>
<TabItem value="api" label="API">

To configure preferred zones, use the
[ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate) API
operation:

```bash
curl --request PUT \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME \
  --header 'Authorization: Bearer API_TOKEN' \
  --header 'content-type: application/json' \
  --data '{
    "user_config": {
      "preferred_zones": ["use1-az1", "use1-az2", "use1-az3"]
    }
  }'
```

Replace the following:

- `PROJECT_NAME`: Name of your Aiven project.
- `SERVICE_NAME`: Name of your Aiven for Apache Kafka service.
- `API_TOKEN`: Your Aiven API token.

</TabItem>
<TabItem value="terraform" label="Terraform">

Use the `preferred_zones` attribute in your `aiven_kafka` resource:

```hcl
resource "aiven_kafka" "example" {
  project      = "my-project"
  service_name = "my-kafka"
  cloud_name   = "aws-us-east-1"
  plan         = "business-4"

  kafka_user_config {
    preferred_zones = ["use1-az1", "use1-az2", "use1-az3"]
  }
}
```

</TabItem>
</Tabs>

## How preferred zones work

When you configure preferred zones:

- New nodes use the specified zones when capacity is available.
- The service validates zone IDs when you save the configuration.
- If a preferred zone is unavailable, Aiven can use another zone in the same region
  to keep the service available. See
  [Automatic node rebalancing](#automatic-node-rebalancing).
- Existing nodes do not move immediately. Preferred zones take effect when Aiven
  recreates nodes, such as during maintenance or a plan change.

### Minimum zone count

For high availability, configure at least three preferred zones.

Configuring fewer than three zones reduces fault tolerance and requires special
account permissions.

### Interaction with single-zone configuration

If you configure both `preferred_zones` and
[`single_zone.availability_zone`](/docs/products/kafka/reference/advanced-params-inkless#single_zone.availability_zone)
settings and set `single_zone.enabled` to `true`, the `single_zone` setting takes
precedence.

## Automatic node rebalancing

When Aiven creates or replaces a node, it uses one of your preferred zones if
capacity is available. If none of the preferred zones have capacity, Aiven places the
node in another availability zone in the same region to keep your service available.

For Kafka plans that support automatic rebalancing, Aiven regularly checks for nodes
running outside their preferred zones. When capacity is available, Aiven automatically
moves those nodes back to a preferred zone.

For Kafka plans that do not support automatic rebalancing, Aiven can move a node
back to a preferred zone when Aiven recreates the node, such as during maintenance
or a plan change.

Automatic rebalancing is supported on:

- `inkless-professional` plans
- Inkless Business and Premium plans on BYOC
- `kafka-professional` plans

## Example: Optimize follower fetching

To reduce cross-AZ network costs with
[follower fetching](/docs/products/kafka/howto/enable-follower-fetching), align
preferred zones with the availability zones where your Kafka consumers run.

1. Identify the availability zones where your Kafka consumers run.
1. Configure preferred zones to match those zones.
1. Enable [follower fetching](/docs/products/kafka/howto/enable-follower-fetching) on
   your Kafka service.
1. Configure `client.rack` on your consumers to match their availability zone.

With this configuration, consumers can fetch data from replicas in the same zone when
local replicas are available.

## Example: Reduce cross-AZ costs for diskless topics

For Kafka services that use diskless topics, you can reduce cross-AZ data transfer
costs by routing requests to brokers in the same availability zone as the client
application. This configuration uses the `client.id` pattern to communicate the
client's availability zone to the broker.

### How it works

Diskless topics store data in object storage, which is accessible from all
availability zones. Any broker can serve any partition. By configuring client rack
awareness, clients can send requests to brokers in their local availability zone.

### Configuration

1. Identify the availability zones where your producers run.
1. Configure preferred zones to match those availability zones.
1. Configure each producer's `client.id` to include the `diskless_az` pattern:

   ```properties
   # Producer in use1-az1
   client.id=my-producer,diskless_az=use1-az1

   # Producer in use1-az2
   client.id=my-producer,diskless_az=use1-az2
   ```

   Set `diskless_az` to match the broker's `broker.rack` configuration, which uses
   the zone IDs in your `preferred_zones` setting.

1. Apply the same pattern to consumers to route requests consistently:

   ```properties
   # Consumer in use1-az1
   client.id=my-consumer,diskless_az=use1-az1
   ```

### Benefits

- Eliminates most cross-AZ data transfer costs for diskless topics.
- Improves cache hit rates by routing clients to consistent brokers per partition.
- Works with any Kafka client version because it uses the standard `client.id`
  property.

::::note
This `client.id` pattern is specific to Kafka with diskless topics. For
classic Kafka topics, use [follower fetching](#example-optimize-follower-fetching)
with the standard `client.rack` configuration instead.
::::

## Remove preferred zones

To return to automatic zone distribution across all available zones, remove the
`preferred_zones` configuration.

<Tabs groupId="config-methods">
<TabItem value="cli" label="CLI">

```bash
avn service update SERVICE_NAME --remove-option preferred_zones
```

</TabItem>
<TabItem value="api" label="API">

```bash
curl --request PUT \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME \
  --header 'Authorization: Bearer API_TOKEN' \
  --header 'content-type: application/json' \
  --data '{
    "user_config": {
      "preferred_zones": null
    }
  }'
```

</TabItem>
</Tabs>

<RelatedPages/>

- [Availability zones](/docs/platform/concepts/availability-zones)
- [Enable follower fetching](/docs/products/kafka/howto/enable-follower-fetching)
- [Follower fetching concepts](/docs/products/kafka/concepts/follower-fetching)
