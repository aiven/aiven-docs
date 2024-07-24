---
title: Aiven for Apache Flink®
---

Aiven for Apache Flink® is a fully managed service that leverages the power of the [open-source Apache Flink framework](https://flink.apache.org/) to provide distributed, stateful stream processing capabilities, allowing users to perform real-time computation with SQL efficiently.

## Main features

### Flink SQL

Apache Flink allows you to develop streaming applications using standard
SQL. Aiven for Apache Flink is a fully managed service that provides
various features for developing and running streaming applications using
Flink on the Aiven platform. One of these features is the SQL editor,
which is a built-in feature of the Aiven Console.

The built-in SQL
editor allows you to create and test Flink SQL queries, explore
the table schema of your data streams and tables, and deploy queries to
your streaming application. This makes it easy to develop and maintain
streaming applications using Flink SQL on the Aiven platform.

### Build applications to process data

An [Aiven for Apache Flink® Application](/docs/products/flink/concepts/flink-applications)
is an abstraction layer on top of Apache Flink SQL that
includes all the elements related to a Flink job to help build your data
processing pipeline. It contains all the components related to a Flink
job, including the definition of source and sink tables, data processing
logic, deployment parameters, and other relevant metadata.

Applications are the starting point for running an Apache Flink job
within the Aiven managed service. The [Aiven
Console](https://console.aiven.io/) provides a user-friendly, guided
wizard to help you build and deploy applications, create source and sink
tables, write transformation statements, and validate and ingest data
using the interactive query feature.

### Interactive queries

The
[interactive query](/docs/products/flink/concepts/supported-syntax-sql-editor) feature in Aiven for Apache Flink grants the ability to
preview the data of a Flink table or job without outputting the rows to
a sink table like Apache Kafka®. This can be useful for testing and
debugging purposes, as it allows you to examine the data being processed
by your
[Flink application](/docs/products/flink/concepts/flink-applications).

### Built-in data flow integration with Aiven for Apache Kafka®

Aiven for Apache Flink provides built-in data flow integration with
[Aiven for Apache Kafka®](/docs/products/kafka), allowing you to connect your Flink
streaming applications with Apache Kafka as a source or sink for your
data.

-   When you create data tables in Aiven for Apache Flink, the service
    provides auto-completion for finding existing topics in a connected
    Kafka service.
-   You can also choose the table format when reading data from Kafka,
    including JSON, Apache Avro, Confluent Avro, and Debezium CDC.
-   Aiven for Apache Flink also supports upsert Kafka connectors, which
    allow you to produce a changelog stream where each data record
    represents an update or delete an event. This can be useful for
    maintaining data consistency in real-time streaming applications
    that involve complex data transformations or updates.

### Built-in data flow integration with Aiven for PostgreSQL®

Aiven for Apache Flink provides built-in data flow integration with
[Aiven for PostgreSQL](/docs/products/postgresql), allowing you to connect your Flink
streaming applications with PostgreSQL as a source or sink for your
data.

When you create data tables in Aiven for Apache Flink, the service
provides auto-completion for finding existing databases in a connected
PostgreSQL service. This makes it easy to select the appropriate
database and table when configuring your Flink streaming application to
read or write data from PostgreSQL.

### Automate workflows with Terraform

Aiven for Apache Flink provides integration with the [Aiven Terraform
Provider](/docs/tools/terraform), which allows you to automate workflows for managing Flink
services on the Aiven platform.

To use the Aiven Terraform Provider to
automate workflows for managing Flink services, you can reference the
Flink data source in your Terraform configuration files.

### Disaster recovery

Periodic checkpoints have been configured to be persisted externally in
object storage. They allow Flink to recover states and positions in the
streams by giving the application the same semantics as a failure-free
execution. See [Checkpoints](/docs/products/flink/concepts/checkpoints).

## Cluster management

### Cluster deployment mode

Aiven for Apache Flink® is configured to use the [HashMap state
backend](https://ci.apache.org/projects/flink/flink-docs-stable/api/java/org/apache/flink/runtime/state/hashmap/HashMapStateBackend.html).
This means that the
[state](https://nightlies.apache.org/flink/flink-docs-stable/docs/concepts/stateful-stream-processing/#what-is-state)
is stored in memory, which can impact the performance of jobs that
require keeping a very large state. We recommend you provision your
platform accordingly.

The Flink cluster executes applications in [session
mode](https://nightlies.apache.org/flink/flink-docs-stable/docs/deployment/overview/#session-mode)
so you can deploy multiple Flink jobs on the same cluster and maximize resource use.

### Cluster scaling

Each node is equipped with a TaskManager and JobManager. We recommend
scaling up your cluster to add more CPU and memory for the TaskManager
before attempting to scale out, so you make the best use of the
resources with a minimum number of nodes.

By default, each TaskManager is configured with a single slot for
maximum job isolation. It is highly recommended that you modify this
option to match your requirements.

:::warning
Adjusting the task slots per TaskManager requires a cluster restart.
:::

### Cluster restart strategy

The default restart strategy of the cluster is set to `Failure Rate`.
This controls how Apache Flink restarts in case of failures during job
execution. Administrators can change this setting in the advanced
configuration options of the service.

For more information on available options, refer to [Apache Flink fault
tolerance](https://nightlies.apache.org/flink/flink-docs-master/docs/deployment/config/#fault-tolerance)
documentation.

### Cluster logging, metrics, and alerting

Log and metrics integration to Aiven services are available for
administrators to configure so you can monitor the health of your
service.

By enabling these integrations, you can:

- Push service logs into an index in [Aiven for OpenSearch®](/docs/products/opensearch).
- Push service metrics to [M3®](/docs/products/m3db)
  or [PostgreSQL®](/docs/products/postgresql) services on Aiven.
- Create custom OpenSearch or [Grafana®](/docs/products/grafana) dashboards to
  monitor the service.

### Cluster security considerations

All services run on a dedicated virtual machine with end-to-end
encryption, and all nodes are firewall-protected. The credentials used
for data flow integrations between Flink and other Aiven services have
read/write permissions on the clusters.

You can set up separate clusters
for writing processed data from Flink and restrict access if you need
more strict access management than our default setup offers. This also
minimizes the risk of accidental write events to the source cluster.

## Related pages

- [Aiven.io](https://aiven.io/flink)
