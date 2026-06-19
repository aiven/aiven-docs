---
title: Configure preferred availability zones for Aiven for Apache Kafka®
sidebar_label: Configure preferred zones
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"
import ConsoleIcon from "@site/src/components/ConsoleIcons"
import RelatedPages from "@site/src/components/RelatedPages";

Configure preferred availability zones to control where your Aiven for Apache Kafka® service nodes are placed within a cloud region.

## Overview

By default, Aiven automatically distributes Kafka service nodes across all available
availability zones (AZs) in a region for maximum fault tolerance. With preferred
zones, you can restrict node placement to specific AZs while maintaining high
availability.

Use cases for preferred zones include:

- **Latency optimization**: Place nodes closer to your application workloads.
- **Cost reduction**: Minimize cross-AZ data transfer costs by co-locating Kafka
  nodes with your consumers.
- **Compliance requirements**: Restrict data to specific zones within a region.
- **Follower fetching optimization**: Align broker placement with consumer locations
  for efficient rack-aware fetching.

## Prerequisites

- An Aiven for Apache Kafka service running on AWS, Google Cloud, or Azure.
- Knowledge of available zone IDs for your cloud region.
- [Aiven CLI](/docs/tools/cli) (optional).

## Zone ID formats

Zone IDs vary by cloud provider:

| Cloud provider | Format | Examples |
|---------------|--------|----------|
| AWS | Zone ID (account-independent) | `use1-az1`, `use1-az2`, `euc1-az1` |
| Google Cloud | Zone name | `europe-west1-a`, `us-central1-b` |
| Azure | Location/zone number | `germanywestcentral/1`, `westeurope/2` |

:::note[AWS zone IDs]
AWS availability zone names (like `us-east-1a`) can map to different physical
locations in different accounts. Use zone IDs (like `use1-az1`) instead, which are
consistent across all accounts. See
[AWS documentation on AZ IDs](https://docs.aws.amazon.com/ram/latest/userguide/working-with-az-ids)
for more information.
:::

## Configure preferred zones

<Tabs groupId="config-methods">
<TabItem value="console" label="Console" default>

1. Access the [Aiven Console](https://console.aiven.io) and select your
   Aiven for Apache Kafka service.
1. Click <ConsoleLabel name="service settings"/>.
1. In the **Advanced configuration** section, click **Configure**.
1. In **`preferred_zones`**, enter the zone IDs as comma-separated values,
   for example: `use1-az1,use1-az2,use1-az3`
1. Click **Save changes**.

</TabItem>
<TabItem value="cli" label="CLI">

Configure preferred zones on an existing service:

```bash
avn service update SERVICE_NAME \
  -c preferred_zones='["use1-az1", "use1-az2", "use1-az3"]'
```

Or when creating a new service:

```bash
avn service create SERVICE_NAME \
  --service-type kafka \
  --plan business-4 \
  --cloud aws-us-east-1 \
  -c preferred_zones='["use1-az1", "use1-az2", "use1-az3"]'
```

Parameters:

- `SERVICE_NAME`: Name of your Aiven for Apache Kafka service.
- `preferred_zones`: JSON array of zone IDs where nodes should be placed.

</TabItem>
<TabItem value="api" label="API">

Use the [ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
API to configure preferred zones:

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

Parameters:

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

1. **New nodes** are placed in the specified zones when capacity is available.
1. **Zone validation** rejects invalid zone IDs at configuration time.
1. **Fallback behavior**: If a preferred zone is temporarily unavailable (for example,
   due to capacity constraints), nodes are placed in other available zones to maintain
   service availability.
1. **Existing nodes** are not automatically moved. Changes take effect on the next
   node recreation, such as during maintenance or plan changes.

### Minimum zone count

For high availability, configure at least three preferred zones. Configuring fewer
than three zones requires special account permissions and reduces fault tolerance.

### Interaction with single zone configuration

If both `preferred_zones` and `single_zone.availability_zone` are configured,
the `single_zone` setting takes precedence when `single_zone.enabled` is true.

## Automatic rebalancing for Standard plans

For Kafka services with Standard professional plans, nodes placed outside preferred
zones are automatically rebalanced once per day. This ensures that temporary zone
unavailability during node creation is eventually corrected without manual
intervention.

Classic Kafka services receive alerts about misplaced nodes but do not automatically
rebalance. You can manually trigger node replacement through the Aiven Console or
API if needed.

## Example: Optimizing for follower fetching

To optimize costs with
[follower fetching](/docs/products/kafka/howto/enable-follower-fetching),
align your preferred zones with your consumer locations:

1. Identify the AZs where your Kafka consumers run.
1. Configure preferred zones to match those AZs.
1. Enable follower fetching on your Kafka service.
1. Configure `client.rack` on your consumers to match their AZ.

This setup ensures brokers and consumers are co-located, enabling consumers to fetch
from local replicas and reducing cross-AZ network costs.

## Example: Reducing cross-AZ costs when producing to diskless topics

For Kafka services with diskless topics, you can reduce cross-AZ data
transfer costs by configuring producers to route requests to brokers in their local
AZ. This uses the `client.id` pattern to communicate the producer's availability
zone to the broker.

### How it works

Diskless topics store data in object storage, which is accessible from all AZs. Any
broker can serve any partition. By configuring client rack awareness, producers send
requests to brokers in their local AZ, eliminating cross-AZ network traffic for
produce requests.

### Configuration

1. Configure preferred zones to match the AZs where your producers run.

1. Configure each producer's `client.id` to include the `diskless_az` pattern:

   ```properties
   # Producer in use1-az1
   client.id=my-producer,diskless_az=use1-az1

   # Producer in use1-az2
   client.id=my-producer,diskless_az=use1-az2
   ```

   The `diskless_az` value must match the broker's `broker.rack` configuration,
   which corresponds to the zone IDs in your `preferred_zones` setting.

1. Apply the same pattern to consumers for consistent local routing:

   ```properties
   # Consumer in use1-az1
   client.id=my-consumer,diskless_az=use1-az1
   ```

### Benefits

- **Eliminate most cross-AZ data transfer costs** for diskless topics
- **Improve cache hit rates** by routing clients to consistent brokers per partition
- **Works with any Kafka client version** since it uses the standard `client.id`
  property

:::note
This `client.id` pattern is specific to Kafka with diskless topics. For
classic Kafka topics, use [follower fetching](#example-optimizing-for-follower-fetching)
with the standard `client.rack` configuration instead.
:::

## Remove preferred zones configuration

To return to automatic zone distribution across all available zones, remove the
`preferred_zones` configuration:

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
