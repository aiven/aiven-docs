---
title: Migrate Elasticsearch data to Aiven for OpenSearch®
sidebar_label: Migrate ES data to Aiven
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RelatedPages from "@site/src/components/RelatedPages";

To migrate Elasticsearch data to Aiven for OpenSearch®, reindex from a remote Elasticsearch cluster.
This method can also be used to migrate data from Aiven for OpenSearch to a self-hosted Elasticsearch service.

<!-- vale off -->
:::tip
To migrate a large number of indexes, consider automating the process with a script.
:::
<!-- vale on -->

As Aiven for OpenSearch does not support joining external Elasticsearch
servers to the same cluster, online migration is not currently possible.

:::important
Migrating from Elasticsearch to OpenSearch can impact connectivity between client
applications and services. Some clients or tools may check the service version, which
can lead to compatibility issues with OpenSearch. For more details, refer to the
following OpenSearch resources:

- [OpenSearch release notes](https://github.com/opensearch-project/OpenSearch/blob/main/release-notes/opensearch.release-notes-1.0.0.md)
- [OpenSearch Dashboards release notes](https://github.com/opensearch-project/OpenSearch-Dashboards/blob/main/release-notes/opensearch-dashboards.release-notes-1.0.0.md)
- [Frequently asked questions about OpenSearch](https://opensearch.org/faq/)
:::

## Check migration compatibility

Before you migrate, assess your source cluster with the
[Elasticsearch to Aiven for OpenSearch Migration Checker](https://aiven.io/tools/elasticsearch-to-aiven-migration-checker).
The checker reads cluster metadata over a read-only API key and returns an assessment
in the browser. It requires no Aiven account and never writes to the source cluster.

The report covers:

- A verdict and a score out of 100 that reflect how much work the migration takes.
- Findings grouped by severity, with an explanation of what each one means for the
  migration.
- A service plan and sizing recommendation for Aiven for OpenSearch, with list pricing
  for the cloud region you select.
- Detection of hot, warm, and frozen tiered topologies.
- The checks that the tool skips when the cluster data they rely on is unavailable.

Cluster metadata is processed in memory and is not stored, and the API key is not
logged or saved.

:::note
Sizing is a directional estimate based on the cluster the checker reads, not a quote.
:::

### Create a read-only API key

The checker needs an Elasticsearch API key with the `monitor` cluster privilege and the
`view_index_metadata` and `monitor` index privileges. Such a key reads metadata only and
has no write access to the cluster.

To create the key in Kibana, click **Stack Management** > **API Keys** >
**Create API key**, turn on **Restrict privileges**, and paste these role descriptors:

```json
{
  "name": "aiven-migration-check",
  "role_descriptors": {
    "readonly_monitor": {
      "cluster": ["monitor"],
      "indices": [
        { "names": ["*"], "privileges": ["view_index_metadata", "monitor"] }
      ]
    }
  }
}
```

If your Elasticsearch version has no restrict-privileges field on that screen, send the
same payload to `POST /_security/api_key` from the Kibana **Dev Tools** console, or with
`curl`:

```bash
curl -X POST "ELASTICSEARCH_ENDPOINT/_security/api_key" \
  -u "ELASTICSEARCH_USERNAME" \
  -H "Content-Type: application/json" \
  -d @descriptors.json
```

Replace the following:

- `ELASTICSEARCH_ENDPOINT`: the endpoint of your source Elasticsearch cluster.
- `ELASTICSEARCH_USERNAME`: a user with permission to create API keys.
- `descriptors.json`: a file holding the role descriptors shown earlier.

The `encoded` field in the response holds the API key. Elasticsearch returns the key
once, so copy it before you leave the page.

### Run the checker

The checker reads your cluster over the public internet. Before you run it, confirm
that your endpoint:

- Uses HTTPS.
- Is a publicly resolvable hostname, not an IP address or an internal host name.
- Carries no username or password. Supply the credentials as the API key instead.

To run the checker:

1. Open the
   [migration checker](https://aiven.io/tools/elasticsearch-to-aiven-migration-checker).

1. Enter your cluster endpoint and the read-only API key.

1. Select a target cloud region, or keep **Same region as my cluster** to price the
   plan in the region your cluster runs in.

1. Click **Analyze cluster**.

To have an Aiven solutions architect confirm the sizing and plan the migration with
you, submit your email address with the assessment. The cluster endpoint and API key
are not included.

## Migrate data

1. [Create an Aiven for OpenSearch service](/docs/products/opensearch/get-started#create-an-aiven-for-opensearch-service).

1. Set the `reindex.remote.whitelist` parameter to point to your source Elasticsearch
   service using the following [Aiven CLI](https://github.com/aiven/aiven-client)
   command:

    ```bash
    avn service update your-aiven-service \
      -c 'opensearch.reindex_remote_whitelist=["your-non-aiven-service:port"]'
    ```

    Replace `port` with the port number your source Elasticsearch service is using.

1. Wait for the cluster to restart. This process might take a few minutes as the
   service attempts a rolling restart to minimize downtime.

1. Start migrating the indexes. For each index:

    1. Stop writes to the index. This step is optional if testing the process.

    1. Export the index mapping from the source Elasticsearch instance. For example,
       using `curl`:

        ```bash
        curl https://avnadmin:yourpassword@os-123-demoprj.aivencloud.com:23125/logs-2024-09-21/_mapping > mapping.json
        ```

    1. Edit `mapping.json`:

        <Tabs groupId="group1">
        <TabItem value="jq" label="With jq" default>

        If you have `jq`, run:

        ```bash
        jq .[].mappings mapping.json > src_mapping.json
        ```

        </TabItem>
        <TabItem value="Manual update" label="Manual update">

        To edit `mapping.json` manually:
        - Remove the wrapping `{"logs-2024-09-21":{"mappings": ... }}`.
        - Keep `{"properties":...}}`.

        </TabItem>
        </Tabs>

    1. Create the empty index on your destination Aiven for OpenSearch service.

        ```bash
        curl -XPUT https://avnadmin:yourpassword@os-123-demoprj.aivencloud.com:23125/logs-2024-09-21
        ```

    1. Import the mapping to the destination Aiven for OpenSearch index.

       ```bash
       curl -XPUT https://avnadmin:yourpassword@os-123-demoprj.aivencloud.com:23125/logs-2024-09-21/_mapping \
       -H 'Content-type: application/json' -T src_mapping.json
       ```

    1. Submit the reindexing request.

       ```bash
       curl -XPOST https://avnadmin:yourpassword@os-123-demoprj.aivencloud.com:23125/_reindex \
         -H 'Content-type: application/json' \
         -d '{"source":
                 {"index": "logs-2024-09-21",
                  "remote":
                      {"username": "your-remote-username",
                       "password": "your-remote-password",
                       "host": "https://your.non-aiven-service.example.com:9200"
                      }
                 },
              "dest":
                 {"index": "logs-2024-09-21"}
             }'
       ```

    1. Wait for the reindexing process to complete. If you receive a response message
       such as:

       ```text
       [your.non-aiven-service.example.com:9200] not whitelisted in reindex.remote.whitelist
       ```

       Verify the hostname and port match those set earlier. The time required for
       reindexing can vary depending on the amount of data.

    1. Update clients to use the new index on Aiven for OpenSearch for both read and
       write operations, then resume any paused write activity.

    1. Delete the source index if necessary.

<RelatedPages/>

- [OpenSearch® vs Elasticsearch](/docs/products/opensearch/concepts/opensearch-vs-elasticsearch)
- [Upgrade Elasticsearch clients to OpenSearch®](/docs/products/opensearch/howto/upgrade-clients-to-opensearch)
- [Migrate external OpenSearch or Elasticsearch snapshots to Aiven](/docs/products/opensearch/howto/migrate-external-snapshots-aiven-opensearch)
- [Reapply ISM policies after snapshot restore](/docs/products/opensearch/howto/migrate-ism-policies)
