---
title: Get started with Aiven for M3DB
sidebar_label: Get started
keywords: [quick start]
---

To begin your journey with Aiven for M3DB, there are two M3-related
services available in the [Aiven console](https://console.aiven.io).
Start with an **M3DB** service, which is responsible for data storage.
Follow
[these instructions](/docs/platform/howto/create_new_service) to create an
Aiven for M3DB service.

:::important
Aiven for M3DB will be deprecated later this year. Consider using
[Aiven for Metrics](/docs/products/metrics) as an alternative.

For details about the deprecation timeline and migration options, see
[Aiven for M3DB end of life](/docs/platform/reference/end-of-life#aiven-for-m3db).
:::


For initial experimentation with M3DB, you can opt for a single-node
setup using our startup plans. However, it is important to note that
this configuration is not recommended for production use. For production
environments, we recommend trying the 3-node clusters available with our
business plans or considering a premium plan that suits your specific
requirements. You can always scale up your plan as needed, so there's
no need to worry if you're unsure about the details.

:::note
The M3 Aggregator service provides extra query functionality when
performing complex queries against the distributed data set
:::

## Connection details

The service overview screen provides connection information for various
methods of connecting to M3DB.

-   **M3 Coordinator** is the endpoint for a direct connection.
-   **InfluxDB®** protocol is also supported by M3DB. This means you can
    use a new or existing InfluxDB application to store data in M3DB
    instead.
-   **Prometheus** gets two entries since the read and write operations
    are on different paths.
-   **Graphite** section shows the details you will need to connect with
    Graphite.
