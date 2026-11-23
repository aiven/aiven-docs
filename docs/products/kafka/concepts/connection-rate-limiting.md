---
title: Connection rate limiting
sidebar_label: Connection rate limiting
---

Aiven for Apache Kafka® limits the rate at which brokers accept new client connections.
This protects brokers from connection bursts, which occur when many clients start or
reconnect at the same time. Bursts can occur during consumer group rebalances or
denial-of-service attacks.

Connection rate limiting applies to all Aiven for Apache Kafka service variants and
tiers, including Standard, Classic, Free, and Developer.

## How connection rate limiting works

The connection rate limit applies independently to each broker and client-facing listener.
It limits new connections from producers, consumers, and other Kafka clients.
It doesn't affect existing connections or connections between brokers.

When the limit is reached, the broker delays new connections instead of rejecting them.
This lets brokers keep serving client and replication requests under load.
If the delay exceeds a client's configured connection timeout, the connection attempt
can time out.

## Default connection rate limits

Aiven sets the default limit based on the RAM of each broker node.
Each broker allows up to 150 new connections per second for every 8 GB of RAM, per
client-facing listener.

For example, a broker with 16 GB of RAM allows up to 300 new connections per second on
each listener. In a three-node cluster, that's up to 900 per second across the cluster
when clients distribute connections across all brokers.

The limit increases automatically when you upgrade to a plan with more RAM.

## Monitor connection rates

For Apache Kafka 3.9 or later, use the Prometheus metric
`kafka_server_socket_server_metrics_connection_creation_rate` to monitor new connections
per second.

The metric reports a separate value for each network processor.
Sum the values across network processors for each broker and listener.
Compare the total with the default limit to identify when connection rates approach the
limit.

For more information, see [Aiven for Apache Kafka metrics available via Prometheus](/docs/products/kafka/reference/kafka-metrics-prometheus).

## Reduce connection bursts

To reduce connection bursts, do the following:

- Reuse Kafka client instances instead of creating a new client for each request.
- Increase `reconnect.backoff.max.ms` to spread out reconnection attempts.
- Stagger application restarts to avoid establishing too many connections
  simultaneously.

## Related pages

- [Quotas in Aiven for Apache Kafka®](/docs/products/kafka/concepts/kafka-quotas)
