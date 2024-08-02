---
title: Enable follower fetching in Aiven for Apache Kafka®
sidebar_label: Enable follower fetching
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Enabling follower fetching in Aiven for Apache Kafka® allows your consumers to fetch data from the nearest replica instead of the leader, optimizing data fetching and enhancing performance.

## Prerequisites

- Aiven for Apache Kafka service version 3.6 or later.
- [Availability zone (AZ)](#identify-availability-zone) information for your
  Aiven for Apache Kafka service.
- [Aiven CLI](/docs/tools/cli) client.
- [Aiven Provider for Terraform](https://registry.terraform.io/providers/aiven/aiven/latest/docs)


:::note
Follower fetching is currently supported on AWS (Amazon Web Services).
:::

## Identify availability zone

In AWS, availability zone (AZ) names can vary across different accounts. The same
physical location might have different AZ names in different accounts. To ensure
consistency when configuring `client.rack`, use the AZ ID, which remains the same
across accounts.

To map AZ names to AZ IDs, see [AWS Knowledge Center article](https://repost.aws/knowledge-center/vpc-map-cross-account-availability-zones) and the [AWS documentation on AZ IDs](https://docs.aws.amazon.com/ram/latest/userguide/working-with-az-ids.html).

## Enable follower fetching

Use either of the following methods to enable follower fetching on your
Aiven for Apache Kafka service:

<Tabs groupId="config-methods">
<TabItem value="cli" label="CLI" default>

Enable follower fetching on an existing service with the Aiven CLI:

```bash
avn service update <service-name> -c follower_fetching.enabled=true
```

Parameters:

- `<service-name>`: Name of your Aiven for Apache Kafka service.
- `follower_fetching={"enabled": true}`: Enables the follower fetching feature.

</TabItem>
<TabItem value="api" label="API">

Use the [ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
API to enable follower fetching on an existing service:

```bash
curl --request PUT \
    --url https://api.aiven.io/v1/project/YOUR_PROJECT_NAME/service/YOUR_SERVICE_NAME \
    --header 'Authorization: Bearer YOUR_BEARER_TOKEN' \
    --header 'content-type: application/json' \
    --data '{
        "user_config": {
            "follower_fetching": {
                "enabled": true
            }
        }
    }'
```

Parameters:

- `YOUR_PROJECT_NAME`: Name of your project.
- `YOUR_SERVICE_NAME`: Name of your service.
- `YOUR_BEARER_TOKEN`: API token for authentication.
- `follower_fetching={"enabled": true}`: Enables the follower fetching feature.

</TabItem>
<TabItem value="terraform" label="Terraform">

1. Add the Aiven Terraform provider to the `required_providers` block in your Terraform
configuration:

   ```hcl
   terraform {
    required_providers {
      aiven = {
        source  = "aiven/aiven"
        version = ">=4.0.0, < 5.0.0"
      }
    }
   }
   ```

1. Set the service connection attributes in the provider block:

   ```hcl
   provider "aiven" {
    api_token = "YOUR_API_TOKEN"
    }
   ```

   The `api_token` is your Aiven API token for [authentication](/docs/platform/howto/create_authentication_token).

1. Enable follower fetching in your Aiven for Apache Kafka service using the
following configuration:

   ```hcl
   resource "aiven_kafka" "example_kafka" {
    project      = "YOUR_PROJECT_NAME"
    cloud_name   = "cloud_region"
    plan         = "business-4"
    service_name = "example-service-name"

    kafka_user_config {
      # Other Kafka configurations...
      follower_fetching = {
        enabled = true
      }
     }
    }
   ```

   Parameters:

    - `project`: Name of your project.
    - `cloud_name`: Cloud region where the service is hosted.
    - `plan`: Service plan.
    - `service_name`: Name of your Kafka service.
    - `follower_fetching.enabled`: Set to `true` to enable the follower fetching feature.

</TabItem>
</Tabs>

## Client-side configuration

To enable follower fetching at the client level, configure the `client.rack` setting
in the Apache Kafka client. Set the `client.rack` value to the corresponding AZ ID
for each client. This ensures the client fetches data from the nearest replica.

Add this example configuration to your consumer properties file:

```plaintext
client.rack=use1-az1
```

### Example scenario: follower fetching in different AZs

Assume you have an Aiven for Apache Kafka cluster running in two AZs in the `us-east-1`
region. The AZ IDs are `use1-az1` and `use1-az2`. You also have consumers distributed
across three AZs: `use1-az1`, `use1-az2`, and `use1-az3`.

#### Cluster setup

- Apache Kafka brokers are in:
  - `use1-az1`
  - `use1-az2`

- Consumers are in:
  - `use1-az1`
  - `use1-az2`
  - `use1-az3`

#### Consumer configuration

To configure consumers, set the `client.rack` value to the respective
AZ ID for each consumer:

```plaintext
# For consumers in use1-az1
client.rack=use1-az1

# For consumers in use1-az2
client.rack=use1-az2

# For consumers in use1-az3
client.rack=use1-az3
```

#### Fetching behavior

- **Consumers in `use1-az1` and `use1-az2`**:
  - Fetch from the nearest replica in their respective AZ.
  - Benefit from reduced latency and network costs.

- **Consumers in `use1-az3`**:
  - Fetch from the leader.
  - No matching `broker.rack` exists, so follower fetching isn't possible.


## Verify follower fetching

After configuring follower fetching, monitor for a decrease in cross-availability zone
network costs to verify its effectiveness.

## Related pages

- [Follower fetching in Aiven for Apache Kafka®](/docs/products/kafka/concepts/follower-fetching)
