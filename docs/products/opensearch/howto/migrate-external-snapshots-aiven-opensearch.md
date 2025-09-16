---
title: Migrate external OpenSearch or Elasticsearch snapshots to Aiven
sidebar_label: Migrate external snapshots
---

Migrate an existing OpenSearch or Elasticsearch® snapshot to Aiven for OpenSearch® with minimal downtime and data integrity.

The migration process uses
[custom repositories](/docs/products/opensearch/howto/manage-custom-repo/list-manage-custom-repo)
and consists of the following phases:

1. [Configure a custom repository](/docs/products/opensearch/howto/manage-custom-repo/list-manage-custom-repo)
   where your migrated data will reside.
1. [Migrate the data](/docs/products/opensearch/howto/manage-snapshots#restore-from-snapshots)
   by restoring it from external snapshots stored on supported platforms like Amazon S3,
   Google Cloud Storage (GCS), Microsoft Azure, or other S3-compatible services.
1. Optional:
   [Reapply Index State Management (ISM) policies](/docs/products/opensearch/howto/migrate-ism-policies):
   Use a
   [script](https://github.com/aiven/aiven-examples/blob/main/solutions/reapply-ism-policies/avn-re-apply-ism-policies.py)
   to migrate ISM policies to maintain consistent index lifecycle management, including
   tasks like index rollover, retention, and deletion.
1. Optional:
   [Recreate security configuration](/docs/products/opensearch/howto/migrate-opendistro-security-config-aiven):
   Use a
   [script](https://github.com/aiven/aiven-examples/blob/main/solutions/migrate-opendistro-security-to-aiven-for-opensearch/avn-migrate-os-security-config.py)
   to migrate user roles, permissions, and access controls to preserve security settings
   and ensure a smooth user experience after migration.
