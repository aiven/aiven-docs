---
title: Create and use Aiven for PostgreSQL® read-only replicas
sidebar_label: Use read replicas
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";

Use Aiven for PostgreSQL® read-only replicas to reduce the load on the primary server and optimize query response times across different geographical locations.

You can run read-only queries against Aiven for PostgreSQL read-only replicas. Such
replicas can be hosted in different regions or with different cloud providers.

:::note
If your service is running a `business-*` or `premium-*` plan, you have
standby nodes available in a high availability setup. These support
read-only queries to reduce the effect of slow queries on the primary
node.
:::

## Prerequisites

- Running Aiven for PostgreSQL service
- Access the [Aiven Console](https://console.aiven.io/)
- Optionally, for creating a read-only replica programmatically:
  - [Aiven Operator for Kubernetes®](https://aiven.io/docs/tools/kubernetes)
  - [Aiven API](https://api.aiven.io/doc/)
  - [Aiven Provider for Terraform](https://registry.terraform.io/providers/aiven/aiven/latest/docs)

:::important
Creating a read-only replica programmatically, you can only use the Startup plan for the
replica.
:::

## Create a replica

<Tabs groupId="group1">
<TabItem value="gui" label="Console" default>

1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your Aiven for
    PostgreSQL service.
1.  On the <ConsoleLabel name="overview"/> page of your service, click **Create replica**.
1.  Enter a name for the remote replica, select the cloud provider, region, and service
    plan to use.
1.  Click **Create**.

The read-only replica is created and added to the list of services in
your project. The <ConsoleLabel name="overview"/> page of the replica indicates the name
of the primary service for the replica.

</TabItem>
<TabItem value="api" label="API">

Use the [ServiceCreate](https://api.aiven.io/doc/#tag/Service/operation/ServiceCreate)
endpoint and configure the `service_integrations` object so that:

- `integration_type` is set to `read_replica`.
- `source_service_name` is set as needed.

</TabItem>
<TabItem value="tf" label="Terraform">

Use the
[aiven_service_integration](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/service_integration)
resource. Set `integration_type` to `read_replica` and `source_service_name` as needed.

</TabItem>
<TabItem value="k8s" label="Kubernetes">

[Create an Aiven for PostgreSQL read-only replica with K8s](https://aiven.github.io/aiven-operator/examples/postgresql.html#create-a-postgresql-read-only-replica).

</TabItem>
</Tabs>

Read-only replicas can be manually promoted to become the master database. For more high
availability and failover scenarios, check the
[related documentation](/docs/products/postgresql/concepts/high-availability).

:::tip
You can promote a read-replica to master using the API endpoint to
[delete the service integration](https://api.aiven.io/doc/#operation/ServiceIntegrationDelete)
and passing the `integration_id` of the replica service.

After deleting the integration that comes with `integration_type` of value
`read_replica`, the service is no longer a read-replica and, hence, becomes the master.
:::

## Use a replica

To use a read only replica:

1.  Log in to the Aiven Console and select your Aiven for PostgreSQL service.

1.  In the <ConsoleLabel name="overview"/> page, copy the **Replica URI** an use it to
    connect via `psql`:

    ```sql
    psql POSTGRESQL_REPLICA_URI
    ```

## Identify replica status

To check whether you are connected to a primary or replica node, run the
following command within a `psql` terminal already connected to a
database:

```sql
SELECT * FROM pg_is_in_recovery();
```

If the above command returns `TRUE` if you are connected to the replica,
and `FALSE` if you are connected to the primary server.

:::warning
Aiven for PostgreSQL uses asynchronous replication and so a small lag is
expected. When running an `INSERT` operation on the primary node, a
minimal delay (usually less than a second) can be expected for the
change to be propagated to the replica and to be visible there.
:::

## Read-replica for disaster recovery

High availability enables data distribution across availability zones
within a single region. To do this without a default
multi-region service with node allocation spanning multiple regions:

1.  Establish a high-availability Aiven for PostgreSQL service within a
    single region.
1.  Configure a remote read-only replica in a different region or even
    on an alternate cloud platform.

As a result, you introduce an additional node in the distinct
region/cloud. Since this node does not work as a hot standby node, you
might want to promote it manually to the primary role, which makes it
operate as an independent standalone service.
