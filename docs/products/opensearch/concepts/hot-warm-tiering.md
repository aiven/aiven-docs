---
title: Hot/warm data tiering in Aiven for OpenSearch®
sidebar_label: Hot/warm data tiering
limited: true
---

import RelatedPages from "@site/src/components/RelatedPages";
import LimitedBadge from "@site/src/components/Badges/LimitedBadge";

Hot/warm data tiering lets you store recent, frequently queried data on fast nodes and older data on cheaper nodes—without splitting your cluster or changing how you search.

Hot/warm data tiering is in
[limited availability](/docs/platform/concepts/service-and-feature-releases#limited-availability-)
for Aiven for OpenSearch® version 2.19 and later. It is available on custom plans only.

:::tip
[Contact Aiven](https://aiven.io/contact) to request a custom plan with hot/warm data tiering enabled.
:::

## How hot/warm data tiering works

A tiered cluster has two groups of data nodes. Each group carries a `node.attr.temp` attribute:

- **Hot nodes** use faster disks and are sized for active writes and frequent queries.
- **Warm nodes** use larger, lower-cost disks and are sized for data that is queried less often.

OpenSearch shard allocation filtering places index shards on the correct tier using the
`index.routing.allocation.require.temp` index setting. Set this to `hot` to pin new
indices to hot nodes. When an index ages, change the setting to `warm` to move shards
to warm nodes.

[Index State Management (ISM)](/docs/products/opensearch/howto/migrate-ism-policies)
automates these transitions. An ISM policy rolls over an index when it reaches a
size or age threshold, migrates it to warm storage after a retention period, and
optionally deletes it.

```mermaid
graph LR
    A[New writes] -->|"require.temp=hot"| B[Hot nodes<br/>Fast disks]
    B -->|"ISM: index age threshold"| C[Warm nodes<br/>Large disks]
    C -->|"ISM: delete after retention"| D[Deleted]

    style B fill:#fff3e8
    style C fill:#cfeefc
```

## Dynamic Disk Sizing

[Dynamic Disk Sizing](/docs/platform/concepts/dynamic-disk-sizing) is tier-aware for tiered
plans. You can add disk capacity to hot nodes and warm nodes independently without affecting
the other group.

## Supported OpenSearch versions

Hot/warm data tiering requires Aiven for OpenSearch® 2.19 or later. Version 3.3 and later is also
supported.

## Prerequisites

- A custom plan with hot and warm node groups. [Contact Aiven](https://aiven.io/contact) to
  get one configured for your account.
- Aiven for OpenSearch® 2.19 or later.

<RelatedPages/>

- [Manage hot/warm data tiering](/docs/products/opensearch/howto/hot-warm-tiering)
- [Dedicated node roles in Aiven for OpenSearch®](/docs/products/opensearch/concepts/dedicated-node-roles)
- [Index State Management policies](/docs/products/opensearch/howto/migrate-ism-policies)
- [Dynamic Disk Sizing](/docs/platform/concepts/dynamic-disk-sizing)
