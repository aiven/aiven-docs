---
title: OpenSearch® cross-cluster replication
---

:::important
Aiven for OpenSearch® cross-cluster replication (CCR) is a
[limited availability feature](/docs/platform/concepts/beta_services). If you're interested in trying out this feature, contact
the sales team at [sales@aiven.io](mailto:sales@aiven.io).
:::

Cross-cluster replication in Aiven for OpenSearch allows you to
replicate the entire cluster, including all of its indexes, mappings,
and metadata, from one service to another across different regions and
cloud providers.

Cross-cluster replication follows an `active-passive` model
where the follower service pulls all data and indexes from the leader
service. Once you have a
[cross-cluster replication setup](/docs/products/opensearch/howto/setup-cross-cluster-replication-opensearch), the leader cluster automatically replicates data to all its
follower clusters. You can set up follower clusters in different regions
and on different cloud providers. For simplicity, all index creation,
deletion, new data, metadata, and configuration will be replicated
automatically.

## Benefits of cross-cluster replication

Some of the key benefits of cross-cluster replication include the
following:

-   **Data locality/proximity:** Replicating data to a cluster closer to
    the user's geographical location helps reduce latency and response
    time.
-   **Horizontal scalability:** Splits a query-heavy workload across
    multiple replica clusters to improve application availability.
-   **High availability and Disaster recovery (active-passive):** With
    tolerance for outages or complete failure of clusters, cross-cluster
    replication ensures uninterrupted service availability with the
    ability to failover to an alternate cluster.
-   **Centralized reporting cluster:** Having a single replica cluster
    as a single source of truth between different master cluster

## Limitations {#ccr-limitatons}

Some limitations include:

-   Cross cluster replication is not available for Hobbyist and Startup
    plans.
-   During creation, the follower cluster service must have the same
    service plan as the leader cluster service. This ensures the
    follower cluster service has as much memory as the leader cluster.
    You can change the service plan as required later.
-   To delete the cross cluster replication integration,
    **delete** the follower cluster service.
-   Maintenance upgrade, major version upgrade needs to be done manually
    for both Leader and Follower service.
-   In case of a node recycle event, replication will be paused until
    the service is running again.

## Related pages

[Set up cross-cluster replication for Aiven for OpenSearch®](/docs/products/opensearch/howto/setup-cross-cluster-replication-opensearch).
