---
title: Reindex Aiven for DataHub search and graph indices
sidebar_label: Reindex search indices
limited: true
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Rebuild your OpenSearch search and graph indices if your search results or relationship graphs disagree with the data in your metadata database.
This is useful:

- After OpenSearch data loss
- When an index is corrupt or inconsistent
- After wiping a cluster or re-provisioning the search backend
- After a schema or mapping change that requires a full reindexing
- For disaster recovery where SQL is intact, but OpenSearch is not

To reindex your indices, run the `RestoreIndices` upgrade task. This task rebuilds
the indices from the source-of-truth `metadata_aspect_v2` SQL table. It
replays every aspect from the database back into search and graph stores.

You can run this at any time. Events are replayed asynchronously
and existing reads keep working.

## Run the restore indices task

1. In your DataHub service, go to the **DataHub resources** section.
1. Open the Aiven App that ends in `-upgrade`.
1. In the **Environment variables** section, click **Edit**.
1. On the **Variables** tab, add the following variables:

   | Key | Value | Description |
   |-----|-------|-------------|
   | `UPGRADE_JOB` | `RestoreIndices` | The restore indices task. |
   | `KAFKA_SCHEMAREGISTRY_URL` | `GMS_URL/schema-registry/api/` | Optional. Queries Kafka Topic schemas for re-emitting events. |

   The `GMS_URL` is the DataHub application URL with `/api/gms` appended.

1. Optional: Add `UPGRADE_JOB_ARGS` to include additional arguments:

   | Arg | Description |
   |-----|-------|
   | `-a clean` | Wipes each index before repopulating. Use when an index has stale documents that you don't want to carry over. |
   | `-a batchSize` | Number of records per batch. |
   | `-a urnBasedPagination=true` | Use URN-based pagination instead of offset-based. Use for large datasets to avoid skipping rows on busy systems. |
   | `-a aspectNames` | Comma-separated list of aspect names to reindex. Use to speed up partial recoveries. For example, `aspectNames=datasetProperties,ownership`. |
   | `-a urnLike` | SQL `LIKE` pattern to filter URNs. Use to target specific entity types. For example, `urnLike=urn:li:dataset:%` to reindex all datasets. |

1. Click **Save**.

   After setting the variables, the upgrade app restarts automatically.
   It's in the **Building** state until the reindexing completes.

1. When the upgrade app is in the **Powered off** state, remove the
   `UPGRADE_JOB` and `KAFKA_SCHEMAREGISTRY_URL` variables.
