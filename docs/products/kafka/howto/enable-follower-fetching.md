---
title: Enable follower fetching in Aiven for Apache Kafka
sidebar_label: Enable follower fetching
---

Enable follower fetching in Aiven for Apache Kafka allows your consumers to fetch data from the nearest replica instead of the leader, optimizing data fetching and enhancing performance.

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
avn service update <service-name> -c follower_fetching={"enabled": true}
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

### Example scenario

Assume you have an Aiven for Apache Kafka cluster running in three AZs in
the `us-east-1` region. The AZ IDs are `use1-az1`, `use1-az2`, and `use1-az3`.

To configure consumers, set the `client.rack` value to the respective AZ ID for each
consumer. For example, if your consumers are in `use1-az1` and `use1-az2`, use the
following configuration:

```plaintext
client.rack=use1-az1
```

Consumers in `use1-az1` and `use1-az2` fetch from the nearest replica. Consumers
in `use1-az3` fetch from the leader.

## Verify follower fetching

After configuring follower fetching, monitor for a decrease in cross-availability zone
network costs to verify its effectiveness.

## Related pages

- [Follower fetching in Aiven for Apache Kafka®](/docs/products/kafka/concepts/follower-fetching)
