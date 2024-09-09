---
title: Migrate external OpenSearch or Elasticsearch snapshots
sidebar_label: Migrate external snapshots
---

Migrate an existing OpenSearch or Elasticsearch® snapshot to Aiven for OpenSearch®.
The migration process is designed to minimize downtime and ensure data integrity, and it
consists of three key phases:

- **[Data migration](/docs/products/opensearch/howto/migrate-snapshot-data-opensearch)**: Restore your data from external snapshots stored on supported
  platforms like Amazon S3, Google Cloud Storage (GCS), Microsoft Azure, or other
  S3-compatible services.

- **Index State Management (ISM)**: Migrate ISM policies to maintain consistent index
  lifecycle management, including tasks like index rollover, retention, and deletion.

- **[User configurations](/docs/products/opensearch/howto/migrate-opendistro-security-config-aiven)**: Migrate user roles, permissions, and access controls to
  preserve security settings and ensure a smooth user experience after migration.

  :::note
  A migration script is available for migrating Opendistro security configurations.
  :::
