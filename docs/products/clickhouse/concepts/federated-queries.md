---
title: Querying external data in Aiven for ClickHouse®
sidebar_label: Federated queries
---

Discover federated queries and their capabilities in Aiven for ClickHouse® and how they simplify and speed up migrating into Aiven from external data sources.

Federated queries allow communication between Aiven for ClickHouse and
S3-compatible object storages and web resources. The federated queries
feature in Aiven for ClickHouse enables you to read and pull data from
an external object storage that uses the S3 integration engine, or any
web resource accessible over HTTP.

:::note
The federated queries feature in Aiven for ClickHouse is enabled by
default.
:::

## Why use federated queries

There are a few reasons why you might want to use federated queries:

-   Query remote data from your ClickHouse service. Ingest it into Aiven
    for ClickHouse or only reference external data sources as part of an
    analytics query. In the context of an increasing footprint of
    connected data sources, federated queries can help you better
    understand how your customers use your products.
-   Simplify and speed up the import of your data into the Aiven for
    ClickHouse instance from a legacy data source, avoiding a long and
    sometimes complex migration path.
-   Improve the migration of data in Aiven for ClickHouse, and extend
    analysis over external data sources with a relatively low effort in
    comparison to enabling distributed tables and [the remote and
    remoteSecure
    functionalities](https://clickhouse.com/docs/en/sql-reference/table-functions/remote).

:::note
The `remote()` and `remoteSecure()` features are designed to read from
remote data sources or provide the ability to create a distributed table
across remote data sources but they are not designed to read from an
external S3 storage.
:::

## How it works

To run a federated query, the ClickHouse service user connecting to the
cluster requires grants to the S3 and/or URL sources. The main service
user is granted access to the sources by default, and new users can be
allowed to use the sources via the CREATE TEMPORARY TABLE grant, which
is required for both sources.

For more information on how to enable new users to use the sources,
see [Prerequisites](/docs/products/clickhouse/howto/run-federated-queries#prerequisites).

Federated queries read from external S3-compatible object storage
utilizing the ClickHouse S3 engine. Once you read from a remote
S3-compatible storage, you can select from that storage and insert into
a table in the Aiven local instance, enabling migration of data into
Aiven.

For more details on how to run federated queries in Aiven for ClickHouse,
see
[Read and pull data from S3 object storages and web resources over HTTP](/docs/products/clickhouse/howto/run-federated-queries).

## Limitations

-   Federated queries in Aiven for ClickHouse only support S3-compatible
    object storage providers for the time being. More external data
    sources coming soon.
-   Virtual tables are only supported for URL sources, using the URL
    table engine. Stay tuned for us supporting the S3 table engine in
    the future.

## Related pages

-   [Read and pull data from S3 object storages and web resources over HTTP](/docs/products/clickhouse/howto/run-federated-queries)
-   [Integrating S3 | ClickHouse Docs](https://clickhouse.com/docs/en/integrations/s3)
-   [remote, remoteSecure | ClickHouse Docs](https://clickhouse.com/docs/en/sql-reference/table-functions/remote)
-   [Cloud Compatibility | ClickHouse Docs](https://clickhouse.com/docs/en/whats-new/cloud-compatibility#federated-queries)
