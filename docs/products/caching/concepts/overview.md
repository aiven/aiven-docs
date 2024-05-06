---
title: Aiven for Caching overview
---

Aiven for Caching, a fully managed **in-memory NoSQL database**, offers efficient storage and quick data access in your preferred cloud.

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

-   **Managed service:** Fully managed service, so you don't
    have to worry about setup, management, or updates. Aiven provides
    tools and integrations to help you use Redis in your data
    pipelines.
-   **Fast and easy deployment:** Launch a production-ready Redis-based service
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
    [Terraform](/docs/tools/terraform) .
    Features like scaling, forking, and upgrading your Redis-based cluster
    are simple and efficient. Compatible with open-source software, it integrates
    with your existing applications and facilitates cloud and regional migrations.
-   **Backups and disaster recovery:** Automatic and configurable backups ensure data
    safety. Backups are performed every 24 hours, with retention periods varying by
    service plan.

## Ways to use Aiven for Caching

- Use Redis technology as a supplementary data store alongside a primary database
  like PostgreSQL®.
- Ideal for transient data, caching values for quick access, and data that can be
  reestablished, such as session data. While Redis is not inherently a persistent storage
  solution, it can be configured for persistence.

## Related pages

- [Redis documentation](https://redis.io/documentation)
- [Redis refcard on DZone](https://dzone.com/refcardz/getting-started-with-redis)
