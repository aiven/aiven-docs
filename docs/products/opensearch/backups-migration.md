---
title: Backups and migration in Aiven for OpenSearch®
sidebar_label: Backups and migration
---

import RelatedPages from "@site/src/components/RelatedPages";

Restore backups, manage snapshots and custom repositories, and migrate data into your
Aiven for OpenSearch® service.

## Automatic backups compared to custom repositories

Aiven for OpenSearch automatically backs up every service, with backup frequency and
retention set by your plan. You don't manage these backups directly. Restoring one
means forking the service from a chosen backup, which is also how renaming and
creating a test copy work.

Custom repositories are a separate, opt-in feature. You point Aiven at your own Amazon
S3, Google Cloud Storage, or Azure Blob Storage account, then create and manage
snapshots in that repository yourself, since automatic snapshot scheduling isn't
supported for custom repositories. You can't create or delete snapshots in
Aiven-managed repositories, prefixed `aiven_repo`, because those exist only for the
automatic backups.

## Moving data into or out of Aiven for OpenSearch

Depending on the size and source of your data, use one of the following approaches:

- **`elasticsearch-dump`**: Copy one index at a time between an OpenSearch or
  Elasticsearch cluster and Aiven for OpenSearch, or out to Amazon S3. This is the
  lightest option for small or occasional transfers.
- **Snapshot restore**: Configure a custom repository and restore an external
  OpenSearch or Elasticsearch snapshot into it. This is the bulk migration path, but it
  doesn't bring over Index State Management (ISM) policy assignments or OpenDistro
  security configuration, so reapply those separately with the migration scripts.
- **Remote reindexing**: Reindex directly from a remote Elasticsearch cluster, since
  Aiven for OpenSearch doesn't support joining external Elasticsearch nodes to the
  same cluster for an online migration.

Several snapshot and repository operations are also available through the Aiven CLI,
using the `avn service opensearch snapshot-*` and `custom-repo-list` commands, even
where the following articles show only the Aiven Console or API.

<RelatedPages/>

- [Restore an OpenSearch® backup](/docs/products/opensearch/howto/restore_opensearch_backup)
- [Back up your Aiven for OpenSearch® service to another
  region](/docs/products/opensearch/howto/backup-to-another-region)
- [Track restore progress for your Aiven for OpenSearch®
  service](/docs/products/opensearch/howto/track-restore-progress)
- [Copy data from OpenSearch to Aiven for OpenSearch® using
  elasticsearch-dump](/docs/products/opensearch/howto/import-opensearch-data-elasticsearch-dump-to-aiven)
- [Copy data from Aiven for OpenSearch® to AWS S3 using
  elasticsearch-dump](/docs/products/opensearch/howto/import-opensearch-data-elasticsearch-dump-to-aws)
- [Manage Aiven for OpenSearch® custom
  repositories](/docs/products/opensearch/howto/manage-custom-repo/list-manage-custom-repo)
- [Create and manage snapshots in Aiven for
  OpenSearch®](/docs/products/opensearch/howto/manage-snapshots)
- [Migrate external OpenSearch or Elasticsearch snapshots to
  Aiven](/docs/products/opensearch/howto/migrate-external-snapshots-aiven-opensearch)
- [Migrate Elasticsearch data to Aiven for
  OpenSearch®](/docs/products/opensearch/howto/migrating_elasticsearch_data_to_aiven)
