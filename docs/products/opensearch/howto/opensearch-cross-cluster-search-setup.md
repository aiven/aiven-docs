---
title: Set up cross-cluster search for Aiven for OpenSearch®
limited: true
sidebar_label: Set up cross-cluster search
---

import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Connect your Aiven for OpenSearch® service to another OpenSearch cluster and query indices on both clusters in a single search request.

Cross-cluster search (CCS) is directional. The source service runs the query, and the
destination service exposes its indices to the source service as a remote cluster. Each
integration covers one direction. To let two services search each other, create one
integration for each direction.

Cross-cluster search queries remote indices in place. It does not copy or replicate data.

:::note
Cross-cluster search is in
[limited availability](/docs/platform/concepts/service-and-feature-releases#limited-availability-).
[Contact Aiven](https://aiven.io/contact) to enable it for your project.
:::

## Requirements

Aiven rejects the integration unless all the following are true:

- The source and the destination are two different Aiven for OpenSearch services. You
  cannot connect a service to itself.
- Both services run the same OpenSearch major version.
- [Security management](/docs/products/opensearch/concepts/os-security) is either turned
  on for both services or turned off for both.
- When security management is turned on, both services are in the same project.

## Set up cross-cluster search

<Tabs groupId="ccs-setup-method">
<TabItem value="console" label="Aiven Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/), and select an Aiven for
   OpenSearch service. This service is one side of the connection.
1. On the service's <ConsoleLabel name="overview"/>, go to the **Cross-cluster search**
   section.
1. Click **Connect a cluster**.
1. Select the search direction, where `SERVICE_NAME` is the service you selected:

   - **Search `SERVICE_NAME`**: this service queries indices on `SERVICE_NAME`.
   - **Let `SERVICE_NAME` search**: `SERVICE_NAME` queries indices on this service.

1. Select **Existing service**, then select the **Project** and the **Service** to
   connect to.

   You cannot select a service that runs a different OpenSearch major version or a
   service that is already connected.

1. Optional: In **Cluster alias**, enter the alias to use for the remote cluster in
   queries.
1. Click **Connect**.

The **Cross-cluster search** section is not available while the service is powered off,
or when the service is a
[cross-cluster replication](/docs/products/opensearch/concepts/cross-cluster-replication-opensearch)
follower.

</TabItem>
<TabItem value="cli" label="Aiven CLI">

Create the integration with
[avn service integration-create](/docs/tools/cli/service/integration#avn_service_integration_create):

```bash
avn service integration-create                        \
  --project PROJECT_NAME                              \
  --integration-type opensearch_cross_cluster_search  \
  --source-service SOURCE_SERVICE_NAME                \
  --dest-service DEST_SERVICE_NAME                    \
  -c cluster_alias=CLUSTER_ALIAS
```

Replace the following:

- `PROJECT_NAME`: name of the project that contains both services.
- `SOURCE_SERVICE_NAME`: name of the service that runs the queries.
- `DEST_SERVICE_NAME`: name of the service to search.
- `CLUSTER_ALIAS`: alias to use for the remote cluster in queries. This setting is
  optional. Omit the `-c` parameter to use the default alias.

To connect services in two different projects, use the Aiven Console or the Aiven API.
The Aiven CLI creates the integration within a single project.

</TabItem>
<TabItem value="api" label="Aiven API">

Create the integration with
[ServiceIntegrationCreate](https://api.aiven.io/doc/#tag/Service_Integrations/operation/ServiceIntegrationCreate):

```bash
curl -X POST https://api.aiven.io/v1/project/PROJECT_NAME/integration \
  -H "Authorization: Bearer API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
      "integration_type": "opensearch_cross_cluster_search",
      "source_service": "SOURCE_SERVICE_NAME",
      "dest_project": "DEST_PROJECT_NAME",
      "dest_service": "DEST_SERVICE_NAME",
      "user_config": {
         "cluster_alias": "CLUSTER_ALIAS"
      }
  }'
```

Replace the following:

- `PROJECT_NAME`: name of the project that contains the source service.
- `API_TOKEN`: Aiven API authentication token.
- `SOURCE_SERVICE_NAME`: name of the service that runs the queries.
- `DEST_PROJECT_NAME`: name of the project that contains the destination service. This
  setting is optional and defaults to `PROJECT_NAME`.
- `DEST_SERVICE_NAME`: name of the service to search.
- `CLUSTER_ALIAS`: alias to use for the remote cluster in queries. This setting is
  optional.

</TabItem>
</Tabs>

## Query a remote cluster

Address a remote index from the source service by prefixing the index name with the
remote cluster alias and a colon:

```text
GET https://SOURCE_SERVICE_HOST/CLUSTER_ALIAS:INDEX_NAME/_search
```

To search local and remote indices in one request, list them together:

```text
GET https://SOURCE_SERVICE_HOST/local-index,CLUSTER_ALIAS:remote-index/_search
```

Replace the following:

- `SOURCE_SERVICE_HOST`: connection URI of the source service.
- `CLUSTER_ALIAS`: alias of the remote cluster.
- `INDEX_NAME`: name of the index to search on the remote cluster.

For more information, see
[Cross-cluster search](https://docs.opensearch.org/latest/search-plugins/cross-cluster-search/)
in the OpenSearch documentation.

## Remote cluster aliases

When you do not set `cluster_alias`, Aiven derives the alias from the destination
service:

- Destination in the same project: the destination service name.
- Destination in another project: the destination project name and the destination
  service name joined by an underscore, for example `DEST_PROJECT_DEST_SERVICE`.

A custom alias keeps your queries stable if the destination service is renamed or
recreated. The following rules apply:

- The alias can contain ASCII alphanumeric characters, dots, underscores, and dashes, up
  to 128 characters.
- The alias must be unique among the cross-cluster search integrations of the source
  service. A duplicate alias returns a `409 Conflict` status code.
- You can set the alias only when you create the integration. Updating it returns a
  `400 Bad Request` status code. To change an alias, delete the integration and create it
  again.

## Return partial results when a remote cluster is unavailable

By default, a query fails when a remote cluster it addresses is unavailable. Set the
`skip_unavailable` parameter to `true` to return partial results from the remaining
clusters and indices instead:

```bash
avn service integration-update INTEGRATION_ID  \
  --project PROJECT_NAME                       \
  -c skip_unavailable=true
```

Replace `INTEGRATION_ID` with the ID of the cross-cluster search integration and
`PROJECT_NAME` with the name of the project that contains the source service. To list
integration IDs, run
[avn service integration-list](/docs/tools/cli/service/integration#avn_service_integration_list).

You can also set `skip_unavailable` in the user configuration when you create the
integration. Unlike the cluster alias, this setting remains editable afterwards.

## View and remove remote clusters

On the source service's <ConsoleLabel name="overview"/>, the **Cross-cluster search**
section lists each connected cluster with its version, cloud region, project, and
integration status. A **Remote** label marks a cluster that this service searches, and an
**Incoming** label marks a cluster that searches this service. Custom aliases appear next
to the service name.

To remove a connection:

1. In the **Cross-cluster search** section, click the delete icon for the cluster to
   disconnect.
1. In the **Remove cross-cluster search?** dialog, click **Remove**.

Removing the integration deletes the remote-cluster connection. Queries that use the
alias of the removed cluster stop working.

<RelatedPages/>

- [OpenSearch® cross-cluster replication](/docs/products/opensearch/concepts/cross-cluster-replication-opensearch)
- [Set up cross-cluster replication for Aiven for OpenSearch®](/docs/products/opensearch/howto/setup-cross-cluster-replication-opensearch)
- [OpenSearch Security in Aiven for OpenSearch®](/docs/products/opensearch/concepts/os-security)
- [Cross-cluster search](https://docs.opensearch.org/latest/search-plugins/cross-cluster-search/)
  in the OpenSearch documentation
