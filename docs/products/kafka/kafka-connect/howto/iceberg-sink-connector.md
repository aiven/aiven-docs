---
title: Create an Iceberg sink connector for Aiven for Apache Kafka®
sidebar_label: Iceberg sink connector
early: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";

Use the Iceberg sink connector to write real-time Apache Kafka® data to Iceberg tables for analytics and long-term storage.

<!-- vale off -->
The connector supports exactly-once delivery, schema evolution, and metadata management.
It is optimized for high-throughput, large-scale processing. For more information, see
the [official Iceberg sink connector documentation](https://iceberg.apache.org/docs/latest/kafka-connect/#apache-iceberg-sink-connector).

## Catalogs in Iceberg

In Apache Iceberg, a catalog stores table metadata and supports key operations such as
creating, renaming, and deleting tables. It manages collections of tables organized
into namespaces and provides the metadata needed for access.

The Iceberg sink connector writes data to a storage backend. The catalog manages metadata
so that multiple systems can read and write to the same tables.

The connector supports the following catalog types:

- [AWS Glue REST catalog](/docs/products/kafka/kafka-connect/howto/aws-glue-rest-catalog)
- [AWS Glue catalog](/docs/products/kafka/kafka-connect/howto/aws-glue-catalog)


:::note
The AWS Glue REST catalog does not support automatic table creation. You must
manually create tables in AWS Glue and ensure the schema matches the Apache Kafka data.
:::

For more details, see the
[Iceberg catalogs documentation](https://iceberg.apache.org/terms/#catalog/).

## File I/O and write format

The Iceberg sink connector supports the following settings:

- **File I/O**: Supports `S3FileIO` for AWS S3 storage.

- **Write format**: Supports the Parquet format.

## Future enhancements

Future updates to the Iceberg sink connector include:

- **FileIO implementations:** Support for GCS and Azure FileIO.
- **Write formats:** Additional support for Avro and ORC formats.
- **Catalogs:** Planned support for Hive, JDBC, and Amazon S3 Tables.

## Limitations

[Aiven for Apache Kafka® Connect secret providers](/docs/products/kafka/kafka-connect/howto/configure-secret-providers)
are not supported in this release.
