---
title: Dedicated node roles in Aiven for OpenSearch®
sidebar_label: Dedicated node roles
---

import RelatedPages from "@site/src/components/RelatedPages";

Aiven for OpenSearch® supports dedicated node roles, enabling workload isolation across specialized node groups for optimized performance and scaling.

The dedicated node roles capability is generally available (GA) for Aiven for OpenSearch®
version 2.19 and later. The cluster topology with node roles is available for 9-node and
15-node service plans, for production workloads that require enhanced performance and
reliability.

## Benefits and use cases

The dedicated node roles feature helps achieve the following:

- **Improved stability**: Separating cluster management from data operations prevents
  resource-intensive queries from affecting cluster coordination, reducing the risk of
  cluster instability.
- **Better scalability**: You can scale data nodes independently from cluster manager
  nodes, adding capacity where needed without over-provisioning management resources.
- **Optimized resource allocation**: Each node group can use hardware configurations
  tailored to its specific workload, improving cost efficiency.
- **Enhanced performance**: Dedicated data nodes can focus entirely on query execution and
  data processing without the overhead of cluster management tasks.

The dedicated node roles feature is particularly beneficial for:

- **Large-scale deployments**: Clusters with high data volumes or query throughput benefit
  from isolating coordination overhead from data operations.
- **Performance-critical applications**: Preventing resource contention between cluster
  management and query execution ensures consistent performance.
- **Complex cluster topologies**: Larger clusters with many nodes see stability
  improvements when cluster management runs on dedicated hardware.
- **Machine learning workloads**: Running model inference on dedicated ML nodes keeps
  compute-intensive ML Commons tasks from competing with search and indexing.

## About dedicated node roles

By default, OpenSearch nodes perform all roles: cluster management, data storage, and
query processing. With dedicated node roles, you can separate these responsibilities
across different node groups, each optimized for specific tasks.

This architecture separates the cluster control plane from the data plane.
It keeps cluster management operations stable during heavy query loads or data ingestion.

```mermaid
graph TB
    subgraph "Client apps"
        C1[Client 1]
    end

    subgraph "OpenSearch cluster"
        subgraph "Cluster manager nodes"
            CM1[Cluster manager 1]
            CM2[Cluster manager 2]
            CM3[Cluster manager 3]
        end

        subgraph "Data nodes"
            DN1[Data node 1<br/>Search and index]
            DN2[Data node 2<br/>Search and index]
        end

        subgraph "ML nodes (optional)"
            ML1[ML node 1<br/>Model inference]
        end
    end

    C1 -.->|Client requests via<br/>internal DNS| DN1
    C1 -.->|Client requests via<br/>internal DNS| DN2

    CM1 <-->|Cluster state<br/>coordination| CM2
    CM2 <-->|Cluster state<br/>coordination| CM3
    CM3 <-->|Cluster state<br/>coordination| CM1

    CM1 -.->|Manage shards<br/>and health| DN1
    CM1 -.->|Manage shards<br/>and health| DN2

    DN1 <-->|Replicate data| DN2

    DN1 -.->|ML tasks| ML1
    DN2 -.->|ML tasks| ML1
    CM1 -.->|Manage shards<br/>and health| ML1

    style C1 fill:#e3e9ff
    style CM1 fill:#cfeefc
    style CM2 fill:#cfeefc
    style CM3 fill:#cfeefc
    style DN1 fill:#fff3e8
    style DN2 fill:#fff3e8
    style ML1 fill:#e8f7ec
```

### Available node roles

#### Cluster manager nodes

Cluster manager nodes handle cluster-wide operations such as:

- Managing cluster state and metadata
- Coordinating node membership
- Creating and deleting indices
- Tracking cluster health
- Allocating shards to nodes
- Orchestrating cluster-wide operations

These nodes run on smaller instances optimized for low-latency coordination tasks rather
than data storage. Cluster manager nodes do not store data or handle search requests,
allowing them to focus on maintaining cluster stability.

:::note
Configure cluster manager nodes in odd numbers to ensure quorum for cluster decisions and
prevent split-brain scenarios.
:::

#### Data nodes

Data nodes are responsible for:

- Storing and indexing data
- Executing search queries
- Performing data aggregations
- Running ingest pipelines
- Handling client requests
- Coordinating distributed requests across the cluster
- Providing internal DNS routing for cluster traffic

In dedicated-role plans, each data node includes the data, ingest, coordinator, and
internal DNS roles. Data nodes typically run on larger instances with more storage and
compute resources for data-intensive operations.

#### ML nodes

ML nodes run the machine learning workloads that the
[ML Commons](/docs/products/opensearch/concepts/ml-commons) plugin handles, such as:

- Deploying pretrained models in the cluster
- Running model inference and predictions
- Generating embeddings for vector search
- Running ML tasks and their related jobs

Isolating these workloads on their own nodes keeps compute-intensive inference from
competing with search and indexing for resources.

An `ml` node group is always dedicated and cannot also carry the `data` or
`cluster_manager` role. ML inference runs outside the JVM heap, so Aiven sizes ML nodes
with a smaller heap and more native memory headroom than data or cluster manager nodes.
Sharing a node between the `ml` role and another role would apply the wrong memory
profile to that node.

By default, `ml_commons_only_run_on_ml_node` is `true`, so ML tasks only run on nodes
with the `ml` role. On a plan without ML nodes, set this parameter to `false` so that ML
tasks run on data nodes instead.

:::note
ML nodes are available on cluster plans that include an ML node group. To request such a
plan, [contact Aiven support](https://aiven.io/support-services).
:::

### Cluster configuration

Dedicated node roles are defined at the service plan level. When you select a plan with
dedicated roles:

- Cluster manager nodes are configured as a separate node group with their own instance type.
- Cluster manager nodes are automatically distributed across different availability zones.
- Data nodes form another group optimized for storage and compute.
- ML nodes, when the plan includes them, form a separate group that never carries the
  `data` or `cluster_manager` role.
- The configuration is managed automatically by Aiven.
- Cluster manager nodes are excluded from DNS routing for client connections.
- Node roles are assigned during cluster creation and maintained throughout the cluster
  lifecycle.
- OpenSearch Dashboards is served on every node.
- Dedicated dashboard nodes are not included.

All standard service operations work with dedicated node roles, including service creation,
major version upgrades, plan changes, service forking, and node replacement. The platform
handles cluster manager node operations carefully to maintain cluster stability during
updates.

### Node replacement and scaling

During maintenance or scaling operations:

- To increase data capacity, move to a dedicated-role plan with more or larger data nodes
  while keeping the cluster manager layout unchanged.
- Cluster manager nodes are replaced last during maintenance updates, including version
  upgrades, to maintain cluster coordination.
- ML nodes are replaced first during maintenance updates. Deployed models redeploy
  automatically once the replacement node joins the cluster, as long as
  `ml_commons_model_auto_redeploy_enable` is `true`, which is the default.
- Node failures are handled automatically with role-aware replacement.
- Disk space validation and additional disk capacity apply only to data nodes, as cluster
  manager nodes do not store data. This makes adding disk space more cost-efficient
  compared to scaling disk across all nodes.

## Manage dedicated node roles

The dedicated node roles feature is plan-based.

### Prerequisites

- [Upgrade Aiven for OpenSearch®](/docs/products/opensearch/howto/os-version-upgrade) to
  2.19 or later if your service runs an older version.

### Start using dedicated node roles

Create an Aiven for OpenSearch® service and choose a plan that includes
dedicated node roles, available under Cluster plans.

### Scale a cluster plan

To move to another dedicated-role layout, change the service plan to a
different eligible plan, available under Cluster plans.

### Disable dedicated node roles

Change the service plan to a plan without dedicated node roles. This
returns the service to a standard node layout where nodes share roles.

<RelatedPages/>

- [High availability in Aiven for OpenSearch®](/docs/products/opensearch/concepts/high-availability-for-opensearch)
- [Shards and replicas](/docs/products/opensearch/concepts/shards-number)
- [Service plans](/docs/platform/concepts/service-pricing)
- [ML Commons for Aiven for OpenSearch®](/docs/products/opensearch/concepts/ml-commons)
