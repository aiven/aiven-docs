---
title: Migrate from Elasticsearch to Aiven for OpenSearch® with Migration Assistant on Google Cloud
sidebar_label: Migrate from ES to Aiven with assistant on GCP
---

import RelatedPages from "@site/src/components/RelatedPages";

Migrate Elasticsearch or OpenSearch workloads to Aiven for OpenSearch® on Google Cloud Platform (GCP) using the open-source OpenSearch Migration Assistant.

The [OpenSearch Migration Assistant](https://github.com/opensearch-project/opensearch-migrations)
is an open-source, Kubernetes-native tool that handles migrating to OpenSearch. It
covers metadata migration, index mapping, live traffic capture and replay, and
comparison tooling to validate your target cluster before cutover.

For full deployment and configuration instructions, including GCP-specific setup,
see the [Migration Assistant documentation](https://docs.opensearch.org/latest/migration-assistant/).

## Configure Aiven for OpenSearch as the target cluster

1. [Create an Aiven for OpenSearch service](/docs/products/opensearch/get-started)
   if you do not already have one.

1. In the [Aiven Console](https://console.aiven.io), open your service and go to
   the **Overview** tab. Note the following connection details:

   - **Host**
   - **Port**
   - **User** (default: `avnadmin`)
   - **Password**

1. In your Migration Assistant workflow configuration, set the target cluster
   endpoint and credentials to these values.

<RelatedPages/>

- [Migrate from Elasticsearch to Aiven for OpenSearch®](/docs/products/opensearch/howto/migrating-elasticsearch-data-to-aiven)
- [Migrate data to Aiven for OpenSearch® using snapshots](/docs/products/opensearch/howto/manage-snapshots)
- [Migrate external snapshots to Aiven for OpenSearch®](/docs/products/opensearch/howto/migrate-external-snapshots-aiven-opensearch)
- [Reapply ISM policies after snapshot restore](/docs/products/opensearch/howto/migrate-ism-policies)
