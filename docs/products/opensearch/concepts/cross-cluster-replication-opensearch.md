---
title: OpenSearch® cross-cluster replication
limited: true
sidebar_label: Cross-cluster replication
---

import RelatedPages from "@site/src/components/RelatedPages";

Cross-cluster replication (CCR) in Aiven for OpenSearch lets you replicate indices, including their data, mappings, and metadata, from one service to another across different regions and cloud providers.

This is an `active-passive` model, where the follower service pulls data from the leader
service. Setting up
[cross-cluster replication](/docs/products/opensearch/howto/setup-cross-cluster-replication-opensearch)
establishes the remote-cluster connection between the follower and the leader. You then
start replication from the follower for selected indices, or use an auto-follow rule to
replicate every index that matches a pattern. After replication starts for an index, the
follower automatically pulls new data, mappings, and metadata changes for that index from
the leader. Follower services can run in different regions and on different cloud
providers. Aiven only supports automated backups on the primary leader cluster, which
means that follower clusters are not backed up independently.

## Benefits

-   **Data locality/proximity:** Replicating data to a cluster closer to
    the user's geographical location helps reduce latency and response
    time.
-   **Horizontal scalability:** Splits a query-heavy workload across
    multiple replica clusters to improve application availability.

## Limitations {#ccr-limitatons}

-   Cross cluster replication is not available for Free and Startup
    plans.
-   During creation, the follower cluster service must have the same
    service plan as the leader cluster service, or higher. This ensures
    that the follower cluster service has at least as much memory as the
    leader cluster. Service plans can be changed later as needed.
-   To delete the cross-cluster replication integration,
    **delete** the follower cluster service.
-   Maintenance upgrade and major version upgrades must be performed manually
    on leader and follower services.
-   During a node recycle event, replication will pause until the service is
    operational again.

<RelatedPages/>

[Set up cross-cluster replication for Aiven for OpenSearch®](/docs/products/opensearch/howto/setup-cross-cluster-replication-opensearch).
