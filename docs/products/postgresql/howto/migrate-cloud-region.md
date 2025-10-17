---
title: Migrate to a different cloud provider or region
---

import ChangeCloud from "@site/static/includes/change-cloud-console.md";

Any Aiven service can be relocated to a different cloud vendor or region. This is also valid for PostgreSQL® where the migration happens without downtime.
Cloud provider/region migration features mean that you
can relocate a service at any time, for example to meet specific latency
requirements for a particular geography.

To migrate a PostgreSQL service to a new cloud provider/region

<ChangeCloud/>

The PostgreSQL cluster will enter the `REBALANCING` state, still serving
queries from the old provider/region.

:::note
You can check the service's state at the top of the service's page,
just below the service's name.
:::

New nodes will be added to the existing PostgreSQL cluster residing in
the new provider/region and the data will be replicated to the new
nodes. Once the new nodes are in sync, one of them will become the new
primary node and all the nodes in the old provider/region will be
decommissioned. After this phase the cluster enters in the `RUNNING`
status, the PostgreSQL endpoint will not change.

:::note
You can check the nodes' availability at the top of the service's
page, just below the service's name.
:::

:::tip
To have consistent query time across the globe, consider
[creating several read-only replicas across different cloud provider/regions](/docs/products/postgresql/howto/create-read-replica)
:::
