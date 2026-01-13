---
title: Migrate Elasticsearch data to Aiven for OpenSearch®
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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
