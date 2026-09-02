---
title: Backups and migration in Aiven for OpenSearch®
sidebar_label: Backups and migration
---

import RelatedPages from "@site/src/components/RelatedPages";

Restore backups, manage snapshots and custom repositories, and migrate data into your
Aiven for OpenSearch® service.

## Automatic backups compared to custom repositories

Aiven for OpenSearch automatically backs up every service. You don't manage those
backups directly:
[restoring one](/docs/products/opensearch/howto/restore_opensearch_backup) means
[forking](/docs/products/opensearch/howto/fork-service) the service from a chosen
backup, the same mechanism behind
[renaming](/docs/products/opensearch/howto/rename-service) a service or creating a
test copy.

[Custom repositories](/docs/products/opensearch/howto/manage-custom-repo/list-manage-custom-repo)
are a separate, opt-in path. You point Aiven at your own Amazon S3, Google Cloud
Storage, or Azure Blob Storage account and manage snapshots there yourself.
Repositories with the `aiven_repo` prefix are the exception. Those back the automatic
backups from Aiven, which is why you can't create or delete snapshots in them
directly.

## Moving data into or out of Aiven for OpenSearch

Depending on the size and source of your data, use one of the following approaches:

- Move a single index between clusters or out to Amazon S3 using
  [`elasticsearch-dump`](/docs/products/opensearch/howto/import-opensearch-data-elasticsearch-dump-to-aiven),
  the lightest option when you don't need a full migration.
- Configure a custom repository and restore an external
  [OpenSearch or Elasticsearch snapshot](/docs/products/opensearch/howto/migrate-external-snapshots-aiven-opensearch)
  into it for a bulk migration. This path moves index data but leaves
  [ISM policy assignments](/docs/products/opensearch/howto/migrate-ism-policies) and
  [OpenDistro security configuration](/docs/products/opensearch/howto/migrate-opendistro-security-config-aiven)
  behind, since neither is part of the snapshot's restorable state.
- For Elasticsearch specifically,
  [reindex directly from a remote cluster](/docs/products/opensearch/howto/migrating_elasticsearch_data_to_aiven)
  instead. Unlike the other two approaches, this path only works for Elasticsearch
  sources, because Aiven for OpenSearch can't join external Elasticsearch nodes to
  the same cluster.

Several snapshot and repository operations are also available through the Aiven CLI,
using the `avn service opensearch snapshot-*` and `custom-repo-list` commands, even
where the following articles show only the Aiven Console or API.

<RelatedPages/>

- [Restore an OpenSearch® backup](/docs/products/opensearch/howto/restore_opensearch_backup)
- [Manage Aiven for OpenSearch® custom
  repositories](/docs/products/opensearch/howto/manage-custom-repo/list-manage-custom-repo)
- [Migrate external OpenSearch or Elasticsearch snapshots to
  Aiven](/docs/products/opensearch/howto/migrate-external-snapshots-aiven-opensearch)
- [Migrate Elasticsearch data to Aiven for
  OpenSearch®](/docs/products/opensearch/howto/migrating_elasticsearch_data_to_aiven)
