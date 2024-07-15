---
title: Follower fetching in Aiven for Apache Kafka®
sidebar_label: Follower fetching
---

[Follower fetching](/docs/products/kafka/howto/enable-follower-fetching) in Aiven for Apache Kafka allows consumers to fetch data from the nearest replica instead of the leader. This feature optimizes data fetching by leveraging Apache Kafka's rack awareness, which treats each availability zone (AZ) as a rack.

## Benefits

1. **Reduced network costs:** Fetching data from the closest replica minimizes
   inter-zone data transfers, reducing costs.
1. **Lower latency:** Fetching from a nearby replica reduces the time it takes to
   receive data, improving overall performance.

## How it works

Aiven for Apache Kafka uses rack awareness to optimize data fetching and ensure
high availability.

- **Rack awareness**: Rack awareness distributes data across different physical racks,
  also known as availability zones (AZs), within a data center. This distribution
  ensures data replication for fault tolerance. Each Apache Kafka broker has
  a `broker.rack` setting corresponding to its specific AZ. For example, in AWS, AZ IDs
  (like `use1-az1`) are used instead of AZ names (like `us-east-1a`) to ensure
  consistency across different accounts.

- **Follower fetching**: Uses rack awareness to allow consumers to fetch data from
  the nearest replica, reducing latency and costs. Apache Kafka consumers use
  the `client.rack` setting to specify their AZ, ensuring they fetch data from the
  closest replica.

### `broker.rack` and `client.rack` settings

- `broker.rack`: This setting corresponds to the AZ where each Apache Kafka broker
  is deployed and helps manage data replication efficiently. Apache Kafka brokers in
  the same AZ have the same `broker.rack` value, like `use1-az1`.
  Aiven for Apache Kafka simplifies this process by automatically managing
  the `broker.rack` setting, eliminating the need for manual configuration.

- `client.rack`:  This setting on the Apache Kafka consumer indicates the AZ where
  the consumer is running. It allows you to fetch data from the nearest replica. For
  example, if your `client.rack` is set to `use1-az1`, it fetches data from an
  Apache Kafka broker with `broker.rack` set to `use1-az1`.
  [Configure](/docs/products/kafka/howto/enable-follower-fetching#client-side-configuration)
  this setting to retrieve data from the closest replica.

## Related pages

- [Enable follower fetching in Aiven for Apache Kafka](/docs/products/kafka/howto/enable-follower-fetching)
