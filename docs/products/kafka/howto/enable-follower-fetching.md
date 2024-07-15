---
title: Enable follower fetching in Aiven for Apache Kafka
sidebar_label: Enable follower fetching
---

Enabling follower fetching in Aiven for Apache Kafka allows your consumers to fetch data from the nearest replica instead of the leader, optimizing data fetching and enhancing performance.

## Prerequisites

- Aiven for Apache Kafka service version 3.6 or later.
- [Availability zone (AZ)](#identify-availability-zone) information for your
  Aiven for Apache Kafka service.

## Identify availability zone

In AWS, availability zone (AZ) names can vary across different accounts. The same
physical location might have different AZ names in different accounts. To ensure
consistency when configuring `client.rack`, use the AZ ID, which remains the same
across accounts.

For mapping AZ names to AZ IDs, see [AWS Knowledge Center article](https://repost.aws/knowledge-center/vpc-map-cross-account-availability-zones) and the [AWS documentation on AZ IDs](https://docs.aws.amazon.com/ram/latest/userguide/working-with-az-ids.html).

## Enable follower fetching

Enable follower fetching with the [Aiven CLI](/docs/tools/cli):

```bash
avn service update <service-name> -c follower_fetching.enabled=true
```

Parameters:

- `<service-name>`: Replace with the actual name of your Kafka service.
- `follower_fetching={"enabled": true}`: Enables the follower fetching feature.

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
