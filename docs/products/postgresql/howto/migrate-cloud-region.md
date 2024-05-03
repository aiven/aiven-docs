---
title: Migrate to a different cloud provider or region
---

Any Aiven service can be relocated to a different cloud vendor or
region. This is also valid for PostgreSQL® where the migration happens
without downtime. Cloud provider/region migration features mean that you
can relocate a service at any time, for example to meet specific latency
requirements for a particular geography.

To migrate a PostgreSQL service to a new cloud provider/region

1.  Log in to [Aiven Console](https://console.aiven.io), and select the
    PostgreSQL instance you want to move.
2.  From the sidebar on your service's page, select **Service
    settings**.
3.  On the **Service settings** page, go to the **Cloud and
    network** section, and select **Change cloud or region**.
4.  In the **Migrate service to another cloud** window, select the new
    cloud provider and region where you want to deploy the PostgreSQL
    instance.
5.  Select **Migrate**.

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
You can check the nodes\' availability at the top of the service's
page, just below the service's name.
:::

:::tip
To have consistent query time across the globe, consider
[creating several read-only replicas across different cloud provider/regions](create-read-replica)
:::
