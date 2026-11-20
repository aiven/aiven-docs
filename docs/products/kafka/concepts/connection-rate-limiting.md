---
title: Connection rate limiting
---

Aiven for Apache Kafka® limits the rate of new connections to protect brokers from networking bursts that can exhaust node resources, such as for example:

- Denial-of-service (DoS) attacks over the public network.
- Consumer group rebalance storms.

## Limit

Each broker accepts up to 150 new connections per second for every 8 GB of node RAM, on each listener.

For example, a Business-4 cluster accepts up to 225 new connections per second on the SSL
port when clients distribute connections across all brokers.

## Benefit

The limit allows the server to keep serving user and replication requests when under load. It
increases automatically when you upgrade to a higher plan.

For further questions about connection rate limiting, contact Aiven Support.
