---
title: Manage hot/warm data tiering in Aiven for OpenSearch®
sidebar_label: Manage hot/warm data tiering
limited: true
---

import RelatedPages from "@site/src/components/RelatedPages";
import LimitedBadge from "@site/src/components/Badges/LimitedBadge";

Set up Index State Management (ISM) policies to automate index lifecycle management across hot and warm data nodes in Aiven for OpenSearch®.

This is a <LimitedBadge/> feature. See
[hot/warm data tiering](/docs/products/opensearch/concepts/hot-warm-tiering) for a
feature overview.

## Prerequisites

- A custom plan with hot and warm data nodes.
  [Contact Aiven](https://aiven.io/contact) to request one.
- Aiven for OpenSearch® 2.19 or later.

## Verify node tier attributes

Before configuring ISM policies, confirm that all data nodes have their tier attribute set:

```
GET _cat/nodeattrs?v&h=node,attr,value
```

The response must show `temp=hot` on all hot data nodes and `temp=warm` on all warm data
nodes. Cluster manager, coordinator, and Dashboards nodes have no `temp` attribute—that
is expected.

## Bootstrap the first index

Create your first index with the shard allocation requirement pinned to the hot tier and
attach a rollover alias. Applications write to the alias. ISM rolls over and creates new
indices that inherit the same settings from your index template.

```
PUT logs-000001
{
  "aliases": { "logs": { "is_write_index": true } },
  "settings": {
    "index.routing.allocation.require.temp": "hot",
    "index.number_of_shards": 3,
    "index.number_of_replicas": 1
  }
}
```

Create an index template for `logs-*` so that every index created by rollover also
receives `index.routing.allocation.require.temp: hot`.

## Create an ISM policy

The following sections show two common ISM policy patterns. Apply a policy to the
rollover alias so every new index enters the lifecycle automatically.

### Time-series logs: hot for 7 days, warm for 23 days, then delete

Use this pattern for application logs, metrics, or audit trails with a fixed
30-day retention window.

```json
PUT _plugins/_ism/policies/logs-hot-warm-policy
{
  "policy": {
    "description": "Logs stay hot for 7 days, warm for 23 days, then deleted",
    "default_state": "hot",
    "states": [
      {
        "name": "hot",
        "actions": [
          {
            "rollover": {
              "min_index_age": "1d",
              "min_primary_shard_size": "40gb"
            }
          }
        ],
        "transitions": [
          {
            "state_name": "warm",
            "conditions": { "min_index_age": "7d" }
          }
        ]
      },
      {
        "name": "warm",
        "actions": [
          { "index_priority": { "priority": 50 } },
          {
            "allocation": {
              "require": { "temp": "warm" },
              "include": {},
              "exclude": {},
              "wait_for": true
            }
          },
          { "force_merge": { "max_num_segments": 1 } }
        ],
        "transitions": [
          {
            "state_name": "delete",
            "conditions": { "min_index_age": "30d" }
          }
        ]
      },
      {
        "name": "delete",
        "actions": [{ "delete": {} }]
      }
    ],
    "ism_template": [
      {
        "index_patterns": ["logs-*"],
        "priority": 100
      }
    ]
  }
}
```

What this policy does:

1. Creates an index on hot nodes (`temp=hot` required).
2. Rolls over when the index is 1 day old or a primary shard reaches 40 GB.
   The previous index stops receiving writes.
3. Transitions to warm 7 days after creation. ISM updates `require.temp` to `warm`.
   OpenSearch relocates shards to warm nodes. `wait_for: true` holds the transition
   until relocation completes.
4. Force-merges to 1 segment per shard on warm. Warm nodes do less write work,
   so this is low-cost.
5. Deletes the index 30 days after creation.

### Search-focused data: hot for 30 days, then warm indefinitely

Use this pattern for product catalogs, document search, or any workload where all
historical data must be queryable but older data can tolerate slower response times.
This pattern does not delete data.

```json
PUT _plugins/_ism/policies/catalog-hot-warm-policy
{
  "policy": {
    "description": "Catalog indices live hot for 30 days, then move to warm permanently",
    "default_state": "hot",
    "states": [
      {
        "name": "hot",
        "actions": [],
        "transitions": [
          {
            "state_name": "warm",
            "conditions": { "min_index_age": "30d" }
          }
        ]
      },
      {
        "name": "warm",
        "actions": [
          {
            "allocation": {
              "require": { "temp": "warm" },
              "wait_for": true
            }
          },
          { "force_merge": { "max_num_segments": 1 } },
          { "index_priority": { "priority": 20 } }
        ],
        "transitions": []
      }
    ],
    "ism_template": [
      {
        "index_patterns": ["catalog-*"],
        "priority": 100
      }
    ]
  }
}
```

Search requests that use aliases or `catalog-*` wildcards hit both hot and warm shards.
Warm shards respond more slowly. For most workloads, letting OpenSearch aggregate across
all tiers is the correct behavior.

## Move an index to warm manually

Use manual transitions for ops work such as responding to an incident or decommissioning
a dataset without waiting for the policy schedule.

1. Attach a policy to an index:

   ```
   POST _plugins/_ism/add/logs-000042
   {
     "policy_id": "logs-hot-warm-policy"
   }
   ```

1. Force-transition the index to warm:

   ```
   POST _plugins/_ism/change_policy/logs-000042
   {
     "policy_id": "logs-hot-warm-policy",
     "state": "warm"
   }
   ```

1. Check the ISM state:

   ```
   GET _plugins/_ism/explain/logs-000042
   ```

   The response shows which state the index is in, when it last transitioned, and what
   is blocking any pending action—for example, shards still relocating.

## Size warm nodes

Warm nodes must hold all data within the warm retention window. Calculate warm storage
as follows:

```
daily_ingest_rate × warm_retention_days × (1 + replica_factor)
```

Add at least 20% headroom above OpenSearch's default high-watermark threshold of 90%.
OpenSearch applies the same watermarks (85% / 90% / 95%) to both tiers. Monitor warm disk
usage separately from hot. With
[Dynamic Disk Sizing](/docs/platform/howto/add-storage-space), you can expand warm
disk independently of hot at any time.

## Troubleshoot

### Shards not moving to warm

The most common cause is a missing `node.attr.temp` attribute on a node. Verify with:

```
GET _cat/nodeattrs?v&h=node,attr,value
```

All hot data nodes must show `temp=hot` and all warm data nodes must show `temp=warm`.
If an attribute is missing, [contact Aiven support](https://aiven.io/support).

### ISM transition completed but shards remain on hot nodes

Without `"wait_for": true` in the allocation action, ISM marks the transition complete
when it updates the setting—before shards relocate. Always pair an `allocation` action
with `"wait_for": true` when followed by `force_merge`, which assumes shards are on
their final tier.

### Allocation filter reference

The following table describes the allocation filter settings for tiering:

| Setting | Behavior |
|---|---|
| `require` | Shard must be on a node matching all listed attributes. Use this for tiering. |
| `include` | Shard may be on any node matching at least one attribute. |
| `exclude` | Shard must not be on matching nodes. Use this for "anywhere but hot" during backfills. |

Most tiering configurations need only `require`.

## API reference

The following table lists useful API endpoints for managing tiered clusters:

| Purpose | Endpoint |
|---|---|
| List node tier attributes | `GET _cat/nodeattrs?v&h=node,attr,value` |
| See where each shard lives | `GET _cat/shards?v&h=index,shard,node,state` |
| Get per-index ISM state | `GET _plugins/_ism/explain/<index>` |
| Debug unallocated shards | `GET _cluster/allocation/explain` |
| List all ISM policies | `GET _plugins/_ism/policies` |
| Retry a failed ISM action | `POST _plugins/_ism/retry/<index>` |

<RelatedPages/>

- [Hot/warm data tiering in Aiven for OpenSearch®](/docs/products/opensearch/concepts/hot-warm-tiering)
- [Index State Management policies](/docs/products/opensearch/howto/migrate-ism-policies)
- [Dynamic Disk Sizing](/docs/platform/howto/add-storage-space)
- [Resolve low disk space issues](/docs/products/opensearch/howto/handle-low-disk-space)
