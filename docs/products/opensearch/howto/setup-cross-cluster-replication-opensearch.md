---
title: Set up cross-cluster replication for Aiven for OpenSearch®
limited: true
sidebar_label: Set up cross-cluster replication
---

import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Set up cross-cluster replication (CCR) for your Aiven for OpenSearch service to synchronize data across regions and cloud providers efficiently.

:::note
Cross cluster replication is not available for the Free and Startup plans.
:::

## Steps to set up CCR

<Tabs groupId="ccr-setup-method">
<TabItem value="Console" label="Aiven Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/), and select the
   Aiven for OpenSearch service.
1. On the service's <ConsoleLabel name="overview"/> page, scroll to the
   **Cross cluster replication** section.
1. Click **+ Create follower**.
1. In the **Create follower** dialog, select how to set up the follower:

   **To use an existing service:**

   1. Select **Existing service**.
   1. Select the **Project name** and the **Service name**.

      :::note
      Only services running the same OpenSearch version as the leader can be
      selected as a follower. For example, a 2.19 leader requires a 2.19 follower.
      :::

   1. Click **Create follower**.

   **To create a new service:**

   1. Select **New service**.
   1. Select the **Project name**.
   1. Click **Create service**. The service creation page opens.
   1. On the service creation page:

      - Enter a name for the follower service.
      - Select the cloud provider, region, and service plan.
      - Add additional disk storage if required.

      :::note
      The follower service must use the same service plan as the leader service
      during creation to ensure sufficient memory. You can change the service plan later.
      :::

   1. Click **Create**.

</TabItem>
<TabItem value="API" label="Aiven API">

To set up cross-cluster replication using the Aiven API, create the follower service
and include the `opensearch_cross_cluster_replication` integration in the service
creation request. For more information, see
[Create service](https://api.aiven.io/doc/#tag/Service/operation/ServiceCreate).

```bash
curl -X POST https://api.aiven.io/v1/project/PROJECT_NAME/service \
  -H "Authorization: Bearer API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
      "service_type": "opensearch",
      "plan": "business-4",
      "cloud": "gcp-us-east1",
      "service_name": "follower-os-cluster",
      "service_integrations": [
         {
            "integration_type": "opensearch_cross_cluster_replication",
            "source_service": "LEADER_SERVICE_NAME",
            "user_config": {}
         }
      ]
  }'
```

Parameters:

- `PROJECT_NAME`: Aiven project name
- `API_TOKEN`: API authentication token
- `LEADER_SERVICE_NAME`: Leader service name

</TabItem>
</Tabs>

:::note
To learn about the limitations with cross-cluster replications
for Aiven for OpenSearch, see the
[Limitations](/docs/products/opensearch/concepts/cross-cluster-replication-opensearch#ccr-limitatons) section.
:::

## Start replication

The `opensearch_cross_cluster_replication` integration sets up the remote-cluster
connection between the follower and the leader and maps the replication security roles.
It does not start replicating any data. After the integration is created, start
replication from the follower using the
[OpenSearch replication API](https://docs.opensearch.org/latest/tuning-your-cluster/replication-plugin/api/),
either for a single index or for all indices that match a pattern.

The integration exposes the leader as a remote-cluster alias named
`LEADER_PROJECT_LEADER_SERVICE`, formed from the leader's project name and service name
joined by an underscore. Use this value as `leader_alias` in the requests that follow.

:::note
Aiven maps the replication roles as `ccr_leader_full_access` and
`ccr_follower_full_access`. The OpenSearch documentation uses the built-in role names
`cross_cluster_replication_leader_full_access` and
`cross_cluster_replication_follower_full_access`. Use the Aiven role names on Aiven
services.
:::

:::note
The replication API requests that send a JSON body require the
`Content-Type: application/json` header. For example, with `curl`, add
`-H 'Content-Type: application/json'` to the request.
:::

### Replicate a single index

Run the following request against the follower to start replicating one index:

```json
PUT https://FOLLOWER_HOST/_plugins/_replication/FOLLOWER_INDEX/_start
{
  "leader_alias": "LEADER_PROJECT_LEADER_SERVICE",
  "leader_index": "LEADER_INDEX",
  "use_roles": {
    "leader_cluster_role": "ccr_leader_full_access",
    "follower_cluster_role": "ccr_follower_full_access"
  }
}
```

Replace the following:

- `FOLLOWER_HOST`: connection URI of the follower service.
- `FOLLOWER_INDEX`: name of the index to create on the follower.
- `LEADER_PROJECT_LEADER_SERVICE`: remote-cluster alias of the leader service.
- `LEADER_INDEX`: name of the index to replicate from the leader.

For more information, see
[Start replication](https://docs.opensearch.org/latest/tuning-your-cluster/replication-plugin/getting-started/)
in the OpenSearch documentation.

### Replicate indices by pattern

An auto-follow rule replicates every existing and future index on the leader that matches
a wildcard pattern, so you do not start replication for each index separately. Run the
following request against the follower:

```json
POST https://FOLLOWER_HOST/_plugins/_replication/_autofollow
{
  "leader_alias": "LEADER_PROJECT_LEADER_SERVICE",
  "name": "REPLICATION_RULE_NAME",
  "pattern": "movies*",
  "use_roles": {
    "leader_cluster_role": "ccr_leader_full_access",
    "follower_cluster_role": "ccr_follower_full_access"
  }
}
```

The `pattern` field is the index mask and supports wildcards. The following table shows
example masks and the indices they match:

| Mask | Matches |
| --- | --- |
| `movies*` | `movies`, `movies-0001`, `movies-2024` |
| `logs-*` | `logs-2024.06.18`, `logs-app` |
| `index-01*` | `index-01`, `index-012`, `index-01-prod` |
| `*` | every user index on the leader |

:::note
A `*` pattern matches only user indices. Auto-follow skips system and hidden
dot-prefixed indices such as `.kibana_1`, `.opendistro_security`, and `.tasks`.
Dot-prefixed indices that match the pattern are listed under `failed_indices` in
`autofollow_stats` instead of being replicated.
:::

To verify that replication is running, query the auto-follow statistics and the status of
a replicated index:

```text
GET https://FOLLOWER_HOST/_plugins/_replication/autofollow_stats
GET https://FOLLOWER_HOST/_plugins/_replication/INDEX_NAME/_status
```

The `_status` request returns `SYNCING` when replication is active.

To stop auto-following new indices, delete the rule:

```json
DELETE https://FOLLOWER_HOST/_plugins/_replication/_autofollow
{
  "leader_alias": "LEADER_PROJECT_LEADER_SERVICE",
  "name": "REPLICATION_RULE_NAME"
}
```

Deleting the rule stops auto-following new indices. Indices that are already replicating
continue until you stop each one.

For more information, see
[Auto-follow](https://docs.opensearch.org/latest/tuning-your-cluster/replication-plugin/auto-follow/)
and
[Replication permissions](https://docs.opensearch.org/latest/tuning-your-cluster/replication-plugin/permissions/)
in the OpenSearch documentation.

## View follower services

To view the follower services configured for your Aiven for OpenSearch service:

1. Go to the <ConsoleLabel name="overview"/> page of your service.
1. Scroll to the **Cross cluster replication** section.

The section lists all follower services with their version, region, project, and
replication status. The **Follower** badge identifies each follower service.
Click a follower service name to open it.

## Promote a follower service to a standalone service

You can promote a follower service to standalone status to make it work independently,
without replicating data from a leader service. This is helpful in disaster recovery
situations where replication needs to stop, and the service must function on its own.

:::note
Promoting a follower service to standalone stops replication and deletes the
replication integration.
A standalone service cannot be reverted to a follower service.
:::

<Tabs groupId="promote-cluster-method">
<TabItem value="Console" label="Aiven Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/), and select the
   Aiven for OpenSearch service.
1. On the service's <ConsoleLabel name="overview" /> page, scroll to
   the **Cross-cluster replica status** section.
1. Click the follower Aiven for OpenSearch service to promote.
1. On the follower service's <ConsoleLabel name="overview" /> page, click
   **Promote to standalone** in the **Cross-cluster replica status**.
1. Click **Confirm** to complete the promotion.

The follower service is now a standalone service and can accept writes. You can set up
replication again if needed.

</TabItem>
<TabItem value="API" label="Aiven API">

To promote a follower service to standalone using the Aiven API,
delete the `opensearch_cross_cluster_replication` integration from the service.

```bash
curl -X DELETE https://api.aiven.io/v1/project/<PROJECT_NAME>/integration/<INTEGRATION_ID> \
  -H "Authorization: Bearer <API_TOKEN>"
```

Parameters:

- `<PROJECT_NAME>`: Aiven project name.
- `<INTEGRATION_ID>`: ID of the `opensearch_cross_cluster_replication` integration.
- `<API_TOKEN>`: API authentication token.

Removing the integration transitions the follower service to a standalone service.

</TabItem>
</Tabs>

<RelatedPages/>

- [Cross-cluster replication for Aiven for OpenSearch®](/docs/products/opensearch/concepts/cross-cluster-replication-opensearch)
- [OpenSearch® cross-cluster replication via the OpenSearch API](https://opensearch.org/docs/latest/replication-plugin/get-started/)
