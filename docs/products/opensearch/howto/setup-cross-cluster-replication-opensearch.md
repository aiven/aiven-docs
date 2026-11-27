---
title: Set up cross-cluster replication for Aiven for OpenSearch®
sidebar_label: Set up cross-cluster replication
---

import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RequirementsPanel from "@site/src/components/RequirementsPanel";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Create a follower for your Aiven for OpenSearch® service, start replicating indices to it, and promote the follower to a standalone service when it needs to take writes.

<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: [
        '`project:integrations:write`',
        '`role:project:admin`',
        '`role:project:manager`',
      ],
    },
    {
      label: 'Service plans',
      values: ['Business', 'Premium'],
    },
  ]}
/>

## Prerequisites

- The leader and the follower run the same OpenSearch version, for example 2.19.
- The follower's total memory is at least 80% of the leader's, and a multi-node leader
  has a multi-node follower. See
  [Size the follower](/docs/products/opensearch/howto/ccr-best-practices-opensearch#size-the-follower-to-at-least-match-the-leader).
- Both services are powered on.
- Neither service has
  [tiered storage](/docs/products/opensearch/concepts/hot-warm-tiering) enabled.

Replication traffic is charged for each GB. See
[Charges](/docs/products/opensearch/concepts/cross-cluster-replication-opensearch#charges).

## Create a follower

Use an existing Aiven for OpenSearch service as the follower, or create a new one.

<Tabs groupId="ccr-setup-method">
<TabItem value="Console" label="Aiven Console" default>

1. In the [Aiven Console](https://console.aiven.io/), open the Aiven for OpenSearch
   service to use as the leader.
1. On the service's <ConsoleLabel name="overview"/>, go to the
   **Cross cluster replication** section and click **Create follower**.
1. Select the follower:

   **To use an existing service:**

   1. Select **Existing service**.
   1. Select the **Project** and the **Service**. You can select only services that run
      the same OpenSearch version as the leader.
   1. Check the replication traffic rate in the dialog, and click **Create follower**.

   **To create a new service:**

   1. Select **New service**. The dialog shows the replication traffic rates for a
      follower on the same continent as the leader and on a different continent.
   1. Click **Create service**.
   1. On the service creation page, enter a name for the follower, and select its cloud,
      region, and service plan. To run the follower in a
      [custom cloud](/docs/platform/concepts/byoc), select **Custom clouds** in the
      region list.
   1. Click **Create**.

</TabItem>
<TabItem value="API" label="Aiven API">

**To create a new service as the follower**, include the
`opensearch_cross_cluster_replication` integration in the
[service creation request](https://api.aiven.io/doc/#tag/Service/operation/ServiceCreate):

```bash
curl -X POST https://api.aiven.io/v1/project/PROJECT_NAME/service \
  -H "Authorization: Bearer API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
      "service_type": "opensearch",
      "plan": "business-4",
      "cloud": "google-us-east1",
      "service_name": "FOLLOWER_SERVICE_NAME",
      "service_integrations": [
         {
            "integration_type": "opensearch_cross_cluster_replication",
            "source_service": "LEADER_SERVICE_NAME",
            "user_config": {}
         }
      ]
  }'
```

**To use an existing service as the follower**,
[create the integration](https://api.aiven.io/doc/#tag/Service_Integrations/operation/ServiceIntegrationCreate)
between the two services:

```bash
curl -X POST https://api.aiven.io/v1/project/PROJECT_NAME/integration \
  -H "Authorization: Bearer API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
      "integration_type": "opensearch_cross_cluster_replication",
      "source_service": "LEADER_SERVICE_NAME",
      "dest_service": "FOLLOWER_SERVICE_NAME",
      "user_config": {}
  }'
```

Replace the following:

- `PROJECT_NAME`: name of the project.
- `API_TOKEN`: Aiven API authentication token.
- `LEADER_SERVICE_NAME`: name of the leader service.
- `FOLLOWER_SERVICE_NAME`: name of the follower service.

To create the follower in a [custom cloud](/docs/platform/concepts/byoc), set `cloud` to
the name of your custom cloud. To set a leader alias or a batch size, add them to
`user_config`. See [Replication settings](#replication-settings).

</TabItem>
<TabItem value="terraform" label="Terraform">

Use the
[`aiven_opensearch`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/opensearch)
and
[`aiven_service_integration`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/service_integration)
resources to create the follower service and connect it to the leader.

1. Add the following to your Terraform configuration:

   ```hcl
   # Leader service
   resource "aiven_opensearch" "leader" {
     project      = var.project_name
     cloud_name   = "google-us-east1"
     plan         = "business-4"
     service_name = "leader-os-cluster"
   }

   # Follower service
   resource "aiven_opensearch" "follower" {
     project      = var.project_name
     cloud_name   = "aws-us-east-1"
     plan         = "business-4"
     service_name = "follower-os-cluster"
   }

   # Cross-cluster replication integration
   resource "aiven_service_integration" "ccr" {
     project                  = var.project_name
     integration_type         = "opensearch_cross_cluster_replication"
     source_service_name      = aiven_opensearch.leader.service_name
     destination_service_name = aiven_opensearch.follower.service_name

     depends_on = [
       aiven_opensearch.leader,
       aiven_opensearch.follower,
     ]
   }
   ```

   To run the follower in a [custom cloud](/docs/platform/concepts/byoc), set
   `cloud_name` to the name of your custom cloud.

1. Apply the configuration:

   ```bash
   terraform apply
   ```

</TabItem>
</Tabs>

The follower is now connected to the leader. To copy data to it,
[start replication](#start-replication).

## Replication settings

The `opensearch_cross_cluster_replication` integration takes the following optional
settings in its `user_config`:

| Setting | Description | When you can set it |
| --- | --- | --- |
| `cluster_alias` | Alias under which the follower knows the leader, used as `leader_alias` in replication requests. Up to 128 characters: ASCII letters, digits, `.`, `_`, and `-`. By default, the alias is the leader's project name and service name joined by an underscore, for example `LEADER_PROJECT_LEADER_SERVICE`. | Only when you create the integration |
| `ops_batch_size` | Maximum number of operations the follower fetches from the leader in one replication request, for all replicated indices. Minimum value: `16`. When not set, the OpenSearch default applies. | At any time |

To change `ops_batch_size` on an existing follower,
[update the integration](https://api.aiven.io/doc/#tag/Service_Integrations/operation/ServiceIntegrationUpdate):

```bash
curl -X PUT https://api.aiven.io/v1/project/PROJECT_NAME/integration/INTEGRATION_ID \
  -H "Authorization: Bearer API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
      "user_config": {
         "ops_batch_size": 5000
      }
  }'
```

## Start replication

Start replication from the follower with the
[OpenSearch replication API](https://docs.opensearch.org/latest/tuning-your-cluster/replication-plugin/api/),
for a single index or for every index that matches a pattern.

In the requests, use the following values:

- `leader_alias`: the leader's alias, `LEADER_PROJECT_LEADER_SERVICE` by default, or the
  `cluster_alias` you set.
- `use_roles`: the Aiven replication roles `ccr_leader_full_access` and
  `ccr_follower_full_access`. The OpenSearch documentation shows the upstream role names
  `cross_cluster_replication_leader_full_access` and
  `cross_cluster_replication_follower_full_access`, which don't apply on Aiven.

Requests with a JSON body need the `Content-Type: application/json` header, for example
`-H 'Content-Type: application/json'` with `curl`.

### Replicate a single index

Run the following request against the follower:

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
- `LEADER_PROJECT_LEADER_SERVICE`: alias of the leader.
- `LEADER_INDEX`: name of the index to replicate from the leader.

For more information, see
[Start replication](https://docs.opensearch.org/latest/tuning-your-cluster/replication-plugin/getting-started/)
in the OpenSearch documentation.

### Replicate indices by pattern

An auto-follow rule replicates every existing and future index on the leader that matches
a wildcard pattern, so you don't start replication for each index separately. Run the
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
A `*` pattern matches user indices only. Auto-follow skips system and hidden dot-prefixed
indices such as `.kibana_1`, `.opendistro_security`, and `.tasks`, and lists any that
match the pattern under `failed_indices` in `autofollow_stats`.
:::

To check that replication is running, query the auto-follow statistics and the status of
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

Indices that are already replicating continue until you stop each one.

For more information, see
[Auto-follow](https://docs.opensearch.org/latest/tuning-your-cluster/replication-plugin/auto-follow/)
and
[Replication permissions](https://docs.opensearch.org/latest/tuning-your-cluster/replication-plugin/permissions/)
in the OpenSearch documentation.

## View follower services

1. In the [Aiven Console](https://console.aiven.io/), open the leader service.
1. On the service's <ConsoleLabel name="overview"/>, go to the
   **Cross cluster replication** section.

The section lists each follower service with its version, region, project, and
replication status. Click a follower to open it.

## Promote a follower service to a standalone service

Promote a follower when it needs to work on its own, for example to take writes after the
leader becomes unavailable. Promotion stops replication and removes the integration.

<Tabs groupId="promote-cluster-method">
<TabItem value="Console" label="Aiven Console" default>

1. In the [Aiven Console](https://console.aiven.io/), open the follower service.
1. On the service's <ConsoleLabel name="overview"/>, go to
   **Cross cluster replica status** and click **Promote to standalone**.
1. Click **Confirm**.

</TabItem>
<TabItem value="API" label="Aiven API">

[Delete the integration](https://api.aiven.io/doc/#tag/Service_Integrations/operation/ServiceIntegrationDelete)
between the leader and the follower:

```bash
curl -X DELETE https://api.aiven.io/v1/project/PROJECT_NAME/integration/INTEGRATION_ID \
  -H "Authorization: Bearer API_TOKEN"
```

Replace the following:

- `PROJECT_NAME`: name of the project.
- `INTEGRATION_ID`: ID of the `opensearch_cross_cluster_replication` integration.
- `API_TOKEN`: Aiven API authentication token.

</TabItem>
<TabItem value="terraform" label="Terraform">

1. Remove the `aiven_service_integration` resource for the
   `opensearch_cross_cluster_replication` integration from your configuration.

1. Apply the change:

   ```bash
   terraform apply
   ```

</TabItem>
</Tabs>

The follower is now a standalone service and accepts writes. To replicate again, create a
new follower.

<RelatedPages/>

- [Cross-cluster replication for Aiven for OpenSearch®](/docs/products/opensearch/concepts/cross-cluster-replication-opensearch)
- [Best practices for cross-cluster replication in Aiven for OpenSearch®](/docs/products/opensearch/howto/ccr-best-practices-opensearch)
- [Cross-cluster replication in the OpenSearch documentation](https://docs.opensearch.org/latest/tuning-your-cluster/replication-plugin/getting-started/)
