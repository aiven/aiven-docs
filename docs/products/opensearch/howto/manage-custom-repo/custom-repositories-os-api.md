---
title: Manage Aiven for OpenSearch® custom repositories in OpenSearch® API
sidebar_label: In OpenSearch® API
---

import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Use the OpenSearch® API for configuring custom repositories in Aiven for OpenSearch to store [snapshots](/docs/products/opensearch/howto/manage-snapshots) in your cloud storage.

## Prerequisites

- [Maintenance updates](/docs/platform/concepts/maintenance-window#maintenance-updates)
  applied for your service
- [Security management enabled](/docs/products/opensearch/howto/enable-opensearch-security)
  for your service
- [Snapshot permissions](https://docs.opensearch.org/docs/latest/security/access-control/permissions/#snapshot-permissions)
  and
  [snapshot repository permissions](https://docs.opensearch.org/docs/latest/security/access-control/permissions/#snapshot-repository-permissions)
  configured
- [Storage credentials](/docs/products/opensearch/howto/snapshot-credentials)
- Name of the [custom keystore](/docs/products/opensearch/howto/snapshot-credentials)

## Limitations

- Supported storage services
  - Amazon S3
  - Google Cloud Storage (GCS)
  - Microsoft Azure Blob Storage
- The following operations are not supported via native OpenSearch API:
  - [Remove a repository](/docs/products/opensearch/howto/custom-repositories#remove-a-repository)
  - [Edit repository details](/docs/products/opensearch/howto/custom-repositories#view-or-edit-repository-details)
  - [List custom repositories](/docs/products/opensearch/howto/custom-repositories#list-custom-repositories)
- Using the native OpenSearch API requires providing
  [storage credentials and the name of the custom keystore](/docs/products/opensearch/howto/snapshot-credentials).

## Register custom repositories

Each repository requires a unique name, a storage type (such as S3, Azure, or GCS), and
the appropriate settings for the selected storage provider.

Use the
[Register Snapshot Repository](https://docs.opensearch.org/docs/latest/api-reference/snapshots/create-repository/)
native OpenSearch API endpoint.

## View repository details

To view details on a repository, use the
[Get Snapshot Repository](https://docs.opensearch.org/docs/latest/api-reference/snapshots/get-snapshot-repository/)
native OpenSearch API endpoint.

## Error handling

The Aiven API returns OpenSearch errors as they are.

**Exceptions:**

- 502: OpenSearch did not respond.
- 409: The service is not powered on or does not support this feature.

<RelatedPages/>

[OpenSearch snapshot API reference](https://opensearch.org/docs/latest/api-reference/snapshots/index/)
