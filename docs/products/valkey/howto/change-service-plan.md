---
title: Change the plan for your Aiven for Valkey™ service
sidebar_label: Change service plan
---

import ChangePlan from "@site/static/includes/change-service-plan.md";
import RelatedPages from "@site/src/components/RelatedPages";

Change the service plan for your Aiven for Valkey™ service to scale resources up or down and optimize costs.

<ChangePlan/>

:::note
For `cluster-N` plans, `--plan` changes the per-node memory only. To change the shard
count or the replica count, update the `shard_count` or `replicas` advanced
configuration option instead. See
[Cluster plans](/docs/products/valkey/concepts/valkey-cluster#cluster-plans).
:::

<RelatedPages/>

- [Scale disk storage](/docs/products/valkey/howto/scale-disk-storage)
- [Prepare for high load](/docs/products/valkey/howto/prepare-for-high-load)
