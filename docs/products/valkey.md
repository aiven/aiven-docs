---
title: Aiven for Valkey™
---

import RelatedPages from "@site/src/components/RelatedPages";

Aiven for Valkey™ is a fully managed in-memory NoSQL database service that offers high performance, scalability, and security. Deployable in the cloud of your choice, it helps you store and access data efficiently.

Developed under the Linux Foundation, Valkey™ is an open-source fork of Redis® designed to
provide a seamless and reliable alternative to Redis OSS. Aiven for Valkey ensures full
compatibility with Redis OSS 7.2.4 and [Aiven for Caching](/docs/products/valkey), making
it easy for users to transition their existing applications without disruption.

With Aiven for Valkey, you can leverage the power of this in-memory database to improve
the performance of your applications by setting up high-performance data caching.
Additionally, it can be integrated seamlessly into your observability stack for purposes
such as logging and monitoring.

Aiven for Valkey supports a wide range of data structures, including strings, hashes,
lists, sets, sorted sets with range queries, bitmaps, hyperloglogs, geospatial indexes,
and streams.

:::tip
Aiven for Valkey is the new open-source fork of Redis®, and Aiven for Caching is Redis®
with a new name. Valkey version 7.2.5 remains fully compatible with Aiven for Caching,
and you can continue to refer to the [Aiven for Caching](/docs/products/valkey)
documentation for detailed instructions and more information.
:::

## Key features and benefits

Aiven for Valkey has many features that make it easy and stress-free to use:

- **Open source**: Valkey is licensed under the permissive BSD-3 license, ensuring
  open-source availability and freedom from restrictive licensing changes.

- **Redis compatible**: Fully compatible with Redis OSS 7.2.4 and Aiven for Caching,
  providing a seamless transition for users with existing Redis applications.

- **High performance**: As an in-memory NoSQL database, Valkey offers fast data retrieval
  with low latency, ideal for applications requiring real-time data processing.

- **Managed service**: Fully managed service, so you don't have to worry about setup,
  management, or updates. Aiven provides tools and integrations to help you use this
  in-memory data store in your data pipelines.

- **Fast and easy deployment**: Launch a production-ready service within minutes. Choose
  from multiple public clouds across numerous global regions, using high-performance
  clusters with optimally selected instance types and storage options.

- **Integration with data infrastructure**: Aiven ensures secure network connectivity
  using VPC peering, PrivateLink, or TransitGateway technologies. Aiven integrates with
  various observability tooling, including Datadog, Prometheus, and Jolokia, or you can
  use Aiven's observability tools for improved monitoring and logging.

- **DevOps-friendly management and development**: Manage your Valkey solution using
  [Aiven Console](https://console.aiven.io/),
  [Aiven CLI](https://github.com/aiven/aiven-client), or
  [Aiven Provider for Terraform](/docs/tools/terraform). Features like scaling, forking,
  and upgrading your Aiven for Valkey cluster are simple and efficient. Compatible with
  open-source software, it integrates with your existing applications and facilitates
  cloud and regional migrations.

- **Backups and disaster recovery**: Automatic and configurable backups ensure data safety.
  Backups are performed every 24 hours, with retention periods varying by service plan.

- **Migration support**: Supports data migration from external Redis® implementations,
  Aiven for Caching, and other Valkey databases to Aiven for Valkey with minimal downtime.

## Ways to use Aiven for Valkey

- Use Aiven for Valkey and its in-memory data store technology as a supplementary data
  system alongside primary databases like PostgreSQL®.

- Ideal for transient data, caching values for quick access, and data that can be
  reestablished, such as session data. While this service is not inherently a persistent
  storage solution, it can be configured for persistence.

- Perfect for high-performance applications requiring fast data access, real-time
  analytics, session management, and distributed caching scenarios.

<RelatedPages/>

- [Get started](/docs/products/valkey/get-started)
- [Valkey GitHub repository](https://github.com/valkey-io/valkey)
- [Valkey documentation](https://valkey.io/docs/)
- [Aiven.io](https://aiven.io/valkey)
- [Redis to Valkey migration guide](https://valkey.io/docs/migration/)
