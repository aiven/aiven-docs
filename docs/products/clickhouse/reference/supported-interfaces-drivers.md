---
title: Interfaces and drivers supported in Aiven for ClickHouse®
---

Find out what technologies and tools you can use to interact with Aiven for ClickHouse®.

## Interfaces (protocols) {#clickhouse-interfaces}

Aiven for ClickHouse® supports the following fundamental underlying
interfaces (protocols):

-   `HTTPS`
-   `Native TCP`
-   `MySQL Interface`

:::note
For security reasons, you need TLS (plaintext) to connect to Aiven for
ClickHouse.
:::

:::note[Unsupported interfaces (protocols)]
-   `HTTP`
-   `gRPC`
-   `PostgreSQL`
:::

For the full list of interfaces and protocols supported in ClickHouse,
see [Drivers and
Interfaces](https://clickhouse.com/docs/en/interfaces/overview).

## Drivers (libraries)

There are a number of drivers (libraries) that use one of
[the fundamental underlying interfaces supported in Aiven for ClickHouse](/docs/products/clickhouse/reference/supported-interfaces-drivers#clickhouse-interfaces) under the hood. It's up to you to pick up a driver
(library) of your choice and use it for connecting to your Aiven for
ClickHouse service.

-   See
    [how to use different drivers (libraries) for connecting to Aiven for ClickHouse](/docs/products/clickhouse/howto/list-connect-to-service).
-   For the full list of drivers and libraries that support connecting
    to ClickHouse, see [Drivers and
    Interfaces](https://clickhouse.com/docs/en/interfaces/overview).

:::note
You can connect to Aiven for ClickHouse with any driver that uses TLS
and one of the supported protocols.
:::

## Related pages

-   [How to connect to Aiven for ClickHouse using different libraries](/docs/products/clickhouse/howto/list-connect-to-service)
-   [Drivers and interfaces supported in
    ClickHouse](https://clickhouse.com/docs/en/interfaces/overview)
