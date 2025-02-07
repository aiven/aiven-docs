---
title: Manage cross-cluster replication in Aiven for Apache Cassandra®
limited: true
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";

Learn how to update Apache Cassandra® services that has cross-cluster replication (CCR) enabled: change the service plan and add an extra disk space. Find out how to set up the replication factor and the consistency level for your CCR-enabled Apache Cassandra® services.

## Prerequisites

This feature is in [limited availability](/docs/platform/concepts/beta_services).
[Contact the sales team](mailto:sales@aiven.io) to try it out.

### Aiven-wise

-   Aiven account
-   Pair of Aiven for Apache Cassandra services with CCR enabled

### Tools
<!-- vale off -->
-   To update the service plan or add an extra disk space, use [Aiven
    Console](https://console.aiven.io/).
-   To set up the replication factor on the database side, issue the
    CREATE KEYSPACE statement from [any supported client
    driver](https://cassandra.apache.org/doc/latest/cassandra/getting_started/drivers.html).
    This guide uses the `cqlsh` Cassandra client for that purpose to
    ensure general applicability of the instruction.
-   To set up the consistency level on the client side, configure it in
    your software. This guide uses the `cqlsh` Cassandra client for that
    purpose to ensure general applicability of the instruction.
<!-- vale on -->

## Change the service plan

:::important
When you change the plan for your CCR-enabled service, the plan for the
connected replica service changes accordingly since the services
constituting a CCR pair always share the same service plan.
:::

:::note
It's recommended to use [Aiven Console](https://console.aiven.io/) for
changing the plan for a CCR-enabled service.
:::

1. Log in to [Aiven Console](https://console.aiven.io/).

1. From the **Services** page, select a CCR-enabled Aiven for Apache
    Cassandra service to update.

1. On the **Overview** page of your service, select **Service
    settings** from the sidebar.

1. On the **Service settings** page of your service, go to the
    **Service plan** section, and click <ConsoleLabel name="actions"/> > **Change plan**.

1. In the **Change service plan** window, select a new plan.

    :::tip
    You can also add extra disk space for your service by using the
    slider in the **Additional disk storage** section.
    :::

1. Select **Change**.

You've changed the plan for your CCR-enabled service and its
CCR-replica service.

## Add an extra disk space

:::important
Changes to the storage space are applied to both services constituting
the CCR pair so also affect the replica service.
:::

:::note
It's recommended to use [Aiven Console](https://console.aiven.io/) for
adding storage space for CCR-enabled services.
:::

1. Log in to [Aiven Console](https://console.aiven.io/).

1. From the **Services** page, select a CCR-enabled Aiven for Apache
    Cassandra service to update.

1. On the **Overview** page of your service, select **Service
    settings** from the sidebar.

1. On the **Service settings** page of your service, go to the
    **Service plan** section, and select **Add additional storage** from
    the **Actions** (**...**) menu.

1. In the **Upgrade service storage** window, use the slider to add
    extra disk space for your service.

    :::tip
    You can also change your service plan by selecting **Change plan**
    in the **Your current plan** section.
    :::

1. Select **Save changes**.

You've added extra disk storage space for your CCR-enabled service and
its CCR-replica service.

## Set up the replication factor {#set-up-replication-factor}

You can specify how many replicas of your data you'd like to have on
either of datacenters hosting your service. For that purpose, you need a
keyspace with the `NetworkTopologyStrategy` replication. To create a
keyspace that supports CCR and defines the replication factor, you need
to run the `CREATE KEYSPACE` query with a set of parameters configuring
the keyspace as needed.

:::note
This instruction uses the `cqlsh` Cassandra CLI client to configure the
replication factor. `cqlsh` is used for demonstration purposes and the
same statements can be executed using any [supported client
driver](https://cassandra.apache.org/doc/latest/cassandra/getting_started/drivers.html).
:::

1. [Connect to your service via cqlsh](/docs/products/cassandra/howto/connect-cqlsh-cli).

   :::note
   You can connect to either of the two services constituting the CCR
   pair to set up the replication factor.
   :::

1. From the `cqlsh` shell, see:

   - Existing keyspaces with the `DESCRIBE keyspaces;` query (for a
     new service, only system keyspaces are returned)
   - Datacenters available for your service with the
     `SELECT data_center from system.peers_v2;` query.

1. Create a keyspace by running a query in which you specify

   - Replication strategy (`'class': 'NetworkTopologyStrategy'`)
   - Number of replicas to be created in the first datacenter
     (`'datacenter_1_name': 'number_of_replicas'`)
   - Number of replicas to be created in the second datacenter
     (`'datacenter_2_name': 'number_of_replicas'`)

   ```bash
   CREATE KEYSPACE keyspace_name WITH replication =    /
   {                                                   /
     'class': 'NetworkTopologyStrategy',               /
     'datacenter_1_name': 'number_of_replicas',        /
     'datacaenter_2_name': 'number_of_replicas'        /
   }                                                   /
   AND durable_writes = true;
   ```

   ```bash title="Example"
   CREATE KEYSPACE default WITH replication =           /
   {                                                    /
     'class': 'NetworkTopologyStrategy',                /
     'dc_1': '3',                                       /
     'dc_2': '3'                                        /
   }                                                    /
   AND durable_writes = true;
   ```

You've set up the replication factor for your keyspace. Now all data
within this keyspace gets replicated to the datacenters according to the
specified factor.

For more details on the replication factor for Apache Cassandra, see
[NetworkTopologyStrategy](https://cassandra.apache.org/doc/4.1/cassandra/cql/ddl.html#networktopologystrategy)
in the Apache Cassandra documentation.

## Set up the consistency level

For Apache Cassandra, you can set up the `CONSISTENCY` parameter, which
regulates when the client can consider an operation as successfully
completed. The `CONSISTENCY` parameter defines how many nodes need to
confirm the operation as finalized before the client can acknowledge the
operation as successfully completed.

:::note
You can configure the consistency level in the shell or in a client
library. While using the `cqlsh` CLI client is convenient for setting up
keyspaces or testing, configuring and using a [client
driver](https://cassandra.apache.org/doc/latest/cassandra/getting_started/drivers.html)
is recommended for operations in the production environment, such as
data imports, data querying, or data reads/writes from/to databases.
:::

### In the shell

:::note
This instruction uses the `cqlsh` Cassandra CLI client to configure the
consistency level.
:::

1. [Connect to your service via cqlsh](/docs/products/cassandra/howto/connect-cqlsh-cli).

1. Run `CONSISTENCY;` to check your current setting for the consistency
    level.

    Expected output: The query can return, for example,
    `Current consistency level is ONE.`, which means that a confirmation
    of an operation completion on one node is enough for this operation
    to be considered as successful.

1. To set up the consistency level to a specific value, run the
    `CONSISTENCY consistency_level_argument;` query.

    Allowed consistency level arguments: For the list of the allowed
    consistency level arguments for Apache Cassandra, see
    [CONSISTENCY](https://cassandra.apache.org/doc/4.1/cassandra/tools/cqlsh.html#consistency)
    in the Apache Cassandra documentation.

```bash title="Example"
CONSISTENCY QUORUM;
```

### In a client library

To configure the consistency level in a client library, add an extra
parameter or object to define the consistency level on your software
component before running a particular query.

:::note[Example:]
In Python, you can specify `consistency_level` as a parameter for the
`SimpleStatement` object.

```bash
session.execute(SimpleStatement("LIST ROLES", consistency_level=ConsistencyLevel.ALL))
```
:::

You've set up the consistency level for your service. Now operations on
your data are considered as successfully completed according to the
consistency level you specified.

For more details on consistency levels for Apache Cassandra, see
[CONSISTENCY](https://cassandra.apache.org/doc/4.1/cassandra/tools/cqlsh.html#consistency)
in the Apache Cassandra documentation.

## More on Apache Cassandra CCR

-   [About cross-cluster replication on Aiven for Apache Cassandra](/docs/products/cassandra/concepts/cross-cluster-replication)
-   [Enable CCR on Aiven for Apache Cassandra](/docs/products/cassandra/howto/enable-cross-cluster-replication)
-   [Disable CCR on Aiven for Apache Cassandra](/docs/products/cassandra/howto/disable-cross-cluster-replication)

## More on CCR with Aiven

-   [OpenSearch® cross-cluster replication](/docs/products/opensearch/concepts/cross-cluster-replication-opensearch)
-   [Set up cross-cluster replication for OpenSearch](/docs/products/opensearch/howto/setup-cross-cluster-replication-opensearch)
-   [Enabling cross-cluster replication for Apache Kafka® via
    Terraform](https://aiven.io/developer/kafka-mirrormaker-crosscluster).
