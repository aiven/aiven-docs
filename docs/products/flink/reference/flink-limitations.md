---
title: Aiven for Apache Flink® limitation
sidebar_label: Limitations
---

Because Aiven for Apache Flink is a fully managed service, there are differences between Aiven for Apache Flink and an Apache Flink service you run yourself.

Consider the following differences and limitations:

-   **User-defined functions:** Aiven for Apache Flink does not
    currently support using user-defined functions (UDFs).
-   **Apache Flink CLI tool:** The Apache Flink® CLI tool is not
    currently supported as it requires access to the JobManager in
    production, which is not exposed to customers.
-   **Job-level settings:** In Aiven for Apache Flink, each job inherits
    the cluster-level settings, and job-level settings are not yet
    supported. You cannot specify separate settings for individual jobs
    within the same cluster.
-   **Flame graphs:** Flame graphs are marked as an experimental feature
    in Apache Flink 1.15 and are not currently enabled in the Aiven for
    Apache Flink web UI.
