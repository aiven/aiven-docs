---
title: OpenSearch® cross-cluster replication
limited: true
---

Cross-cluster replication (CCR) in Aiven for OpenSearch allows you to replicate an entire cluster, including all indexes, mappings, and metadata, from one service to another across different regions and cloud providers.

This is an `active-passive` model, where the follower service pulls all data and
indexes from the leader service. Once you have a
[cross-cluster replication setup](/docs/products/opensearch/howto/setup-cross-cluster-replication-opensearch), the leader cluster automatically
replicates data to all follower clusters. Follower clusters can be set up in various
regions and on different cloud providers, ensuring that all index creation, deletion,
new data entries, metadata, and configurations are replicated automatically.

## Benefits

-   **Data locality/proximity:** Replicating data to a cluster closer to
    the user's geographical location helps reduce latency and response
    time.
-   **Horizontal scalability:** Splits a query-heavy workload across
    multiple replica clusters to improve application availability.

## Limitations {#ccr-limitatons}

-   Cross cluster replication is not available for Hobbyist and Startup
    plans.
-   During creation, the follower cluster service must have the same
    service plan as the leader cluster service. This ensures the
    follower cluster service has as much memory as the leader cluster.
    Service plans can be changed later as needed.
-   To delete the cross-cluster replication integration,
    **delete** the follower cluster service.
-   Maintenance upgrade and major version upgrades must be performed manually
    on leader and follower services.
-   During a node recycle event, replication will pause until the service is
    operational again.

## Related pages

[Set up cross-cluster replication for Aiven for OpenSearch®](/docs/products/opensearch/howto/setup-cross-cluster-replication-opensearch).
