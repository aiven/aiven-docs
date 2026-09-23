---
title: Aiven for Valkey™ clustering
sidebar_label: Clustering
limited: true
---

import RelatedPages from "@site/src/components/RelatedPages";
import MyImg from "@site/static/images/content/figma/valkey-cluster.png";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Aiven for Valkey™ clustering provides a managed, scalable solution for distributed in-memory data storage with built-in high availability and automatic failover capabilities.

Valkey clustering distributes your data across multiple nodes (shards) to handle larger
datasets and higher traffic loads than a single-node deployment can support. Each shard
contains a portion of your data, and the cluster automatically routes requests to the
appropriate shard.

## Key features

### High availability

- **Automatic failover**: If a primary node fails, a replica is automatically promoted to
  maintain service availability.
- **Minimal downtime**: Designed to handle both expected maintenance and unexpected
  failures with minimal service interruption.
- **Read replicas**: Each shard includes at least one read replica for redundancy and
  improved read performance.

### Scalability

- **Flexible sizing**: Supports various instance sizes, including smaller 4 GB RAM
  instances for cost optimization.

### Compatibility

- **Cluster-enabled mode**: Fully compatible with existing Valkey and Redis cluster-aware
  client libraries.
- **Standard protocols**: If your application currently uses a client for Valkey standalone
  mode, switch to a cluster-aware client to enable compatibility with Aiven for Valkey
  clustering.

## Architecture overview

<img src={MyImg} className="image" width="75%" alt="Aiven for Valkey™ service architecture" />

### Multi-shard deployment

The typical cluster deployment consists of three primary nodes, each with at least one
replica, providing true high availability and scalability.

- **Distributed data**: Data is automatically partitioned across multiple shards.
- **Independent replicas**: Each shard has its own set of replicas for redundancy.
- **Load distribution**: Requests are distributed across shards based on data location.

### Single-shard deployment

While Aiven for Valkey supports single-node clusters, this configuration is functionally
equivalent to a standalone Valkey instance and is not the primary use case for clustering.

- **Initial configuration**: Starts with one primary node and 0 - 2 read replicas
- **Use case**: Ideal for smaller datasets or applications with moderate traffic
- **High availability**: Automatic failover to replicas if the primary fails

## Cluster plans

Cluster-enabled Valkey services use `cluster-N` plans, where `N` is the per-node memory
in GiB, for example `cluster-4` (4 GiB RAM per node) and `cluster-8` (8 GiB RAM per
node). You set the shard count and the replica count independently, using advanced
configuration options. Available on AWS, Azure, and Google Cloud.

### Configure a cluster-N plan

When you create or update a service on a `cluster-N` plan, set the following advanced
configuration options:

- **`shard_count`**: Number of primary shards in the cluster. Required, from `1` to
  `5`.
- **`replicas`**: Number of replicas per shard. Optional, from `0` to `2`. Defaults to
  `0`.

The total node count for the cluster is `shard_count` multiplied by `1 + replicas`. For
example, 3 shards with 1 replica each results in 6 nodes. Aiven bills `cluster-N` plans
per node, so your invoice reflects the total node count at the time of billing.

<Tabs groupId="method">
<TabItem value="console" label="Console" default>

In the [Aiven Console](https://console.aiven.io), when you create a service or update
the topology of a `cluster-N` service, use the shard count and replica steppers. The
estimated monthly price updates to reflect the total node count as you change either
value.

</TabItem>
<TabItem value="cli" label="CLI">

Set `shard_count` and `replicas` with the
[avn service create](/docs/tools/cli/service-cli#avn-cli-service-create) or
[avn service update](/docs/tools/cli/service-cli#avn-cli-service-update) command:

```bash
avn service create SERVICE_NAME \
  --service-type valkey \
  --plan cluster-4 \
  --cloud CLOUD_AND_REGION \
  --project PROJECT_NAME \
  -c shard_count=3 \
  -c replicas=1
```

Parameters:

- `SERVICE_NAME`: Name of your service.
- `CLOUD_AND_REGION`: Cloud provider and region, for example `aws-eu-west-1`.
- `PROJECT_NAME`: Name of your project.

</TabItem>
<TabItem value="api" label="API">

Call the [ServiceCreate](https://api.aiven.io/doc/#tag/Service/operation/ServiceCreate)
or [ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
endpoint and set `shard_count` and `replicas` in `user_config`:

```bash
curl --request POST \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/service \
  --header 'Authorization: Bearer BEARER_TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
    "service_name": "SERVICE_NAME",
    "service_type": "valkey",
    "plan": "cluster-4",
    "cloud": "CLOUD_AND_REGION",
    "user_config": {
      "shard_count": 3,
      "replicas": 1
    }
  }'
```

Parameters:

- `PROJECT_NAME`: Name of your project.
- `SERVICE_NAME`: Name of your service.
- `BEARER_TOKEN`: Your API authentication token.
- `CLOUD_AND_REGION`: Cloud provider and region, for example `aws-eu-west-1`.

</TabItem>
<TabItem value="terraform" label="Terraform">

Use the
[`aiven_valkey`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/valkey)
resource to set `shard_count` and `replicas` in `valkey_user_config`:

```hcl
resource "aiven_valkey" "example" {
  project      = var.PROJECT_NAME
  cloud_name   = "CLOUD_AND_REGION"
  plan         = "cluster-4"
  service_name = "SERVICE_NAME"

  valkey_user_config {
    shard_count = 3
    replicas    = 1
  }
}
```

Parameters:

- `PROJECT_NAME`: Name of your project.
- `CLOUD_AND_REGION`: Cloud provider and region, for example `aws-eu-west-1`.
- `SERVICE_NAME`: Name of your service.

</TabItem>
<TabItem value="kubernetes" label="Kubernetes">

Use the [Valkey](https://aiven.github.io/aiven-operator/resources/valkey.html) resource
to set `shard_count` and `replicas` in `userConfig`:

```yaml
apiVersion: aiven.io/v1alpha1
kind: Valkey
metadata:
  name: SERVICE_NAME
spec:
  authSecretRef:
    name: aiven-token
    key: token

  connInfoSecretTarget:
    name: valkey-connection

  project: PROJECT_NAME
  cloudName: CLOUD_AND_REGION
  plan: cluster-4

  userConfig:
    shard_count: 3
    replicas: 1
```

Apply the updated configuration:

```bash
kubectl apply -f valkey-service.yaml
```

Parameters:

- `SERVICE_NAME`: Name of your service.
- `PROJECT_NAME`: Name of your project.
- `CLOUD_AND_REGION`: Cloud provider and region, for example `aws-eu-west-1`.

</TabItem>
</Tabs>

:::note
You can't change `shard_count` and `replicas` in the same update. Change one, wait for
the update to finish, then change the other.
:::

## Benefits

### Performance

- **Higher throughput**: Distribute read and write operations across multiple nodes.
- **Read scaling**: Multiple replicas per shard increase read capacity.

### Reliability

- **Fault tolerance**: Adding replicas for each shard at service creation ensures your
  service remains available even if individual nodes fail.
- **Automatic recovery**: Failed nodes are automatically replaced and synchronized.
- **Data protection**: Multiple copies of your data across different nodes.

### Operational simplicity

- **Managed service**: Aiven handles cluster setup, maintenance, and scaling.
- **Automated operations**: Node discovery, failover, and resharding happen automatically.
- **Monitoring included**: Built-in metrics for performance and health monitoring

## Use cases

### High-traffic applications

- Applications requiring more throughput than a single node can provide
- Systems with high read/write ratios that benefit from multiple replicas
- Services needing guaranteed uptime despite hardware failures

### Large datasets

- Data that exceeds the memory capacity of a single node
- Applications requiring data partitioning for performance optimization
- Systems that need to scale storage capacity

### Mission-critical systems

- Applications requiring high availability and automatic failover
- Services that cannot tolerate single points of failure
- Systems with strict uptime requirements

## How it works

### Plan your deployment

1. **Assess your requirements**: Determine your data size, traffic patterns, and
   availability needs.
1. **Choose your configuration**: Start with a single shard for smaller workloads or
   multiple shards for larger datasets.
1. **Select instance sizes**: Choose appropriate memory and compute resources for your
   workload.

### Create a clustered service

To enable clustering in Aiven for Valkey, choose a `cluster-N` plan when creating your
service. See [Cluster plans](#cluster-plans) for how to set the shard count and replica
count.

:::tip
For high availability and improved read scalability, **add replicas** to each service
shard during service creation. This allows you to fully leverage the benefits of
clustering from the start.
:::

### Configure a client

- Ensure your application uses a cluster-aware Valkey/Redis client library. If your
  application currently uses a client for Valkey standalone mode, switch to a cluster-aware
  client to enable compatibility with Aiven for Valkey clustering.
- Configure your client to discover and connect to cluster nodes automatically.
- Test failover behavior to ensure your application handles node changes gracefully.

## Resharding

Aiven for Valkey distributes data across primary nodes using hash slots. When the number
of primary nodes in your cluster changes, Aiven reshards the cluster automatically.
Resharding redistributes the hash slots, and the keys they hold, across the available
primary nodes to keep the slots evenly balanced across shards.

The number of primary nodes changes when you update `shard_count` on a `cluster-N`
plan. See [Configure a cluster-N plan](#configure-a-cluster-n-plan).

Aiven manages the entire process:

- **Slot redistribution**: Aiven divides the ranges of hash slots owned by each primary
  node and reassigns them across the updated set of primary nodes.
- **Key migration**: Keys move together with their slots while the cluster stays available
  to clients.
- **No manual slot management**: You cannot move individual slots or assign them to
  specific nodes. Aiven controls slot placement to keep the cluster balanced and
  consistent. The `MIGRATE` command that resharding uses to move keys between nodes stays
  disabled for direct use.

To inspect the slot layout, run `CLUSTER NODES` on any Valkey node in the cluster. It shows
the current slot distribution across the cluster nodes, so you can also use it to follow
the progress of a resharding operation.

When you scale in a cluster, meaning you reduce the number of primary nodes, the same
dataset needs to fit into fewer nodes. If your dataset size exceeds the reduced memory
capacity, Valkey starts evicting keys to free up space.

:::warning
Before you scale in a cluster, set your eviction policy to `allkeys-lru`, `allkeys-lfu`, or
`allkeys-random`. Aiven requires one of these eviction policies for scale-in operations. For
more information, see [Memory management](/docs/products/valkey/concepts/memory-usage).
:::

## Backup and restore

Aiven for Valkey automatically backs up your clustered service. Each primary node backs up
the data for the hash slots it owns, and Aiven stores these backups in a remote location.
Backups run independently for each primary and need no coordination from your application.

To restore a cluster, Aiven combines the stored backups with the recorded hash slot
layout, so your data returns to the same slot distribution. The cluster must keep the same
number of primary nodes for a restore to succeed.

:::note
Cluster backups are not point-in-time recovery (PITR). Because each primary node is backed
up independently, backups are not consistent across shards. A restored cluster reflects
each primary's data as of its own backup, not a single moment in time across the whole
cluster. Design your application to tolerate this if you rely on a restore.
:::

## Limitations and considerations

- Valkey clustering is in
  [limited availability (LA)](/docs/platform/concepts/service-and-feature-releases#limited-availability-).
- Valkey clustering is supported for new services only.
- Performance factors

  - Network latency between shards can affect cross-shard operations.
  - Resharding operations may temporarily impact performance.
  - Client library choice can affect cluster performance and behavior.

<RelatedPages/>

- [Get started with Aiven for Valkey](/docs/products/valkey/get-started)
- [High availability](/docs/products/valkey/concepts/high-availability)
- [Read replica](/docs/products/valkey/concepts/read-replica)
