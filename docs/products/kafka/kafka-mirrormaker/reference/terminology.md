---
title: Terminology for Aiven for Apache Kafka® MirrorMaker 2
sidebar_label: Terminology
---

-   **Cluster alias**: The name alias defined in MirrorMaker 2 for a
    certain Apache Kafka® source or target cluster.
-   **Replication flow**: The flow of data between two Apache Kafka®
    clusters (called source and target) executed by Apache Kafka®
    MirrorMaker 2. One Apache Kafka® MirrorMaker 2 service can execute
    multiple replication flows.
-   **Remote topics**: Topics replicated by MirrorMaker 2 from a source
    Apache Kafka® cluster to a target Apache Kafka® cluster. There is
    only one source topic for each remote topic. Remote topics refer to
    the source cluster by the topic name prefix:
    `{source_cluster_alias}.{source_topic_name}`.
