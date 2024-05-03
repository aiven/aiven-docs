---
title: Integrate an external Apache Kafka® cluster in Aiven
---

Aiven for Apache Kafka® MirrorMaker 2 enables the cross-cluster topic
replication between any two Apache Kafka® clusters, which can be
deployed as Aiven or external services. To enable
[replication flows](setup-replication-flow) with an external Apache Kafka cluster you need to define a
service integration endpoint.

## Define an external Apache Kafka® service integration endpoint via Aiven console

You can define an external Apache Kafka® service integration endpoint
using the Aiven console. Follow these steps:

1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to
    the Aiven project where you wish to integrate the external Apache
    Kafka cluster.
2.  Select **Integration endpoints** from the left sidebar, and then
    **External Apache Kafka** from the list of available services.
3.  Select **Add a new endpoint**.
4.  Provide an **Endpoint name**, specify the **Bootstrap servers**,
    and configure the necessary security settings. Then, select
    **Create**.
5.  Fill the **Endpoint name**, **Bootstrap servers** and the security
    settings and click **Create**.
6.  The external Apache Kafka cluster is now available under the alias
    defined in the **Endpoint name** parameter

## Permissions and configuration when using external integration

By default, Apache Kafka® MirrorMaker 2 creates topics for Apache Kafka®
MirrorMaker 2 internal data and writes messages to these topics. When
integrating externally with Kafka, the integration data defines the
connecting user. For Apache Kafka® MirrorMaker 2 to be able to create
topics and write to them, the connecting user must have the necessary
permissions. Adding ACLs to the corresponding Kafka cluster for the
connecting users is required.

To mirror topics, the user connecting to external sources must have read
permission for the mirrored topics. Similarly, for external targets, the
connecting user needs write permission for the mirrored topics.
Additionally, the connecting user must have both read and write
permissions for the internal topics.

Apache Kafka® MirrorMaker 2 creates the following set of topics in the
source cluster:

<table>
  <tr>
    <th>Topic</th>
    <th>Replication factor</th>
    <th>Partitions (default value)</th>
    <th>Cleanup policy (required policy)</th>
  </tr>
  <tr>
    <td><code>__consumer_offsets</code></td>
    <td>3</td>
    <td>50</td>
    <td>compact</td>
  </tr>
  <tr>
    <td><code>heartbeats</code></td>
    <td>3</td>
    <td>1</td>
    <td>compact</td>
  </tr>
  <tr>
    <td><code>mm2-configs.&lt;target cluster alias&gt;.internal</code></td>
    <td>3</td>
    <td>1</td>
    <td>compact</td>
  </tr>
  <tr>
    <td>
    <code>mm2-offsets.&lt;target cluster alias&gt;.internal</code>
    <p>See <a href="#offsets-sync-topic-location">Offsets sync topic location</a></p>
    </td>
    <td>3</td>
    <td>1</td>
    <td>compact</td>
  </tr>
  <tr>
    <td><code>mm2-offsets.&lt;target cluster alias&gt;.internal</code></td>
    <td>3</td>
    <td>25</td>
    <td>compact</td>
  </tr>
  <tr>
    <td><code>mm2-status.&lt;target cluster alias&gt;.internal</code></td>
    <td>3</td>
    <td>5</td>
    <td>compact</td>
  </tr>
</table>

Apache Kafka® MirrorMaker 2 creates the following set of topics in the
target cluster:

<table>
  <tr>
    <th>Topic</th>
    <th>Replication factor</th>
    <th>Partitions (default value)</th>
    <th>Cleanup policy (required policy)</th>
  </tr>
  <tr>
    <td><code>__consumer_offsets</code></td>
    <td>3</td>
    <td>50</td>
    <td>compact</td>
  </tr>
  <tr>
    <td><code>heartbeats</code></td>
    <td>3</td>
    <td>1</td>
    <td>compact</td>
  </tr>
  <tr>
    <td><code>&lt;source cluster alias&gt;.checkpoints.internal</code></td>
    <td>3</td>
    <td>1</td>
    <td>compact</td>
  </tr>
  <tr>
    <td><code>&lt;source cluster alias&gt;.heartbeats</code></td>
    <td>3</td>
    <td>1</td>
    <td>compact</td>
  </tr>
  <tr>
    <td><code>mm2-configs.&lt;source cluster alias&gt;.internal</code></td>
    <td>3</td>
    <td>1</td>
    <td>compact</td>
  </tr>
  <tr>
    <td><code>mm2-offsets.&lt;source cluster alias&gt;.internal</code></td>
    <td>3</td>
    <td>25</td>
    <td>compact</td>
  </tr>
  <tr>
    <td><code>mm2-status.&lt;source cluster alias&gt;.internal</code></td>
    <td>3</td>
    <td>5</td>
    <td>compact</td>
  </tr>
</table>

If using heartbeat emitting to the source cluster (configuration:
`emit_backward_heartbeats_enabled`), the connecting user needs read and
write access to the `mm2-offsets.&lt;target cluster alias>.internal` topic
at the external source cluster. If disabled, this topic and permissions
are not required at the source cluster.

Similarly, if using heartbeat emitting to the target cluster
(configuration: `emit_heartbeats_enabled`), the connecting user requires
read and write access to `mm2-offsets.<source cluster alias>.internal`.
If disabled, this topic and permissions are not necessary at the target
cluster.

:::note
To summarize, for external Kafka cluster integration, configure the ACLs
for both the source and target clusters. This will enable Apache Kafka®
MirrorMaker 2 to describe and create topics, as well as produce and
consume messages.
:::

### Offsets sync topic location

Offsets sync topic can be either in the source or target cluster based
on the configuration value of `offset-syncs.topic.location`. The default
location is `source`. The connecting user must have permission to read
and write this topic.

If the location is configured as `target`, this topic will be created in
the target cluster.
