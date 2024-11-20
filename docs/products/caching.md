---
title: Aiven for Caching
---

Aiven for Caching, formerly known as Aiven for Redis®, is a fully managed in-memory NoSQL database. Deployable in the cloud of your choice, it helps you store and access data efficiently.
This service is compatible with legacy Redis® OSS up to version 7.2.4, facilitating seamless transitions and compatibility.

For insights into he service name change and the latest updates, read the
[blog post](https://aiven.io/blog/aiven-for-redis-becomes-aiven-for-caching).

With Aiven, you can leverage the power of this in-memory database to improve the
performance of your applications by setting up high-performance data caching.
Additionally, it can be integrated seamlessly into your observability stack for
purposes such as logging and monitoring.

Aiven for Caching supports a wide range of data structures, including strings, hashes,
lists, sets, sorted sets with range queries, bitmaps, hyperloglogs,
geospatial indexes, and streams.

## Features and benefits of Aiven for Caching

Aiven for Caching has many features that make it easy and stress-free to
use:

-   **Managed service:** Fully managed service, so you don't have to worry about
    setup, management, or updates. Aiven provides tools and integrations to help you
    use this in-memory data store in your data pipelines.
-   **Fast and easy deployment:** Launch a production-ready service
    within minutes. Choose from multiple public clouds across numerous global regions,
    using high-performance clusters with optimally selected instance types and storage
    options.
-   **Integration with data infrastructure:** Aiven ensures secure
    network connectivity using VPC peering, PrivateLink, or
    TransitGateway technologies. Aiven integrates with various
    observability tooling, including Datadog, Prometheus, and Jolokia,
    or you can use Aiven's observability tools for improved monitoring
    and logging.
-   **DevOps-friendly management and development:** Manage your caching solution
    using [Aiven Console](https://console.aiven.io/),
    [Aiven CLI](https://github.com/aiven/aiven-client), or
    [Aiven Provider for Terraform](/docs/tools/terraform) .
    Features like scaling, forking, and upgrading your Aiven for Caching cluster
    are simple and efficient. Compatible with open-source software, it integrates
    with your existing applications and facilitates cloud and regional migrations.
-   **Backups and disaster recovery:** Automatic and configurable backups ensure data
    safety. Backups are performed every 24 hours, with retention periods varying by
    service plan.

## Ways to use Aiven for Caching

- Use Aiven for Caching and its in-memory data store technology as a supplementary
  data system alongside primary databases like PostgreSQL®.
- Ideal for transient data, caching values for quick access, and data that can be
  reestablished, such as session data. While this service is not inherently a
  persistent storage solution, it can be configured for persistence.

## Related pages

- [Redis documentation](https://redis.io/documentation)
- [Redis refcard on DZone](https://dzone.com/refcardz/getting-started-with-redis)
