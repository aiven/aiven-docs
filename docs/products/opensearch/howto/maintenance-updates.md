---
title: Maintenance and updates for your Aiven for OpenSearch® service
sidebar_label: Maintenance and updates
---

import MaintenanceUpdates from "@site/static/includes/maintenance-updates.md";
import MaintenanceWindowConcepts from "@site/static/includes/maintenance-window-concepts.md";
import MaintenanceWindowInstructions from "@site/static/includes/maintenance-window-instructions.md";
import RelatedPages from "@site/src/components/RelatedPages";

Learn what happens to your Aiven for OpenSearch® service during maintenance updates, how it affects your clients, how to prepare for it, and how to set the maintenance window.

## Maintenance updates

<MaintenanceUpdates/>

## What happens during a maintenance update {#what-happens-during-a-maintenance-update}

Aiven applies maintenance updates by replacing the nodes of your service with new ones
and moving your data from the old nodes to the new nodes. Your service keeps serving
reads and writes while this happens. Aiven uses the same procedure when you
[upgrade the OpenSearch version](/docs/products/opensearch/howto/os-version-upgrade) or
[change the service plan](/docs/products/opensearch/howto/change-service-plan).

During a maintenance update, Aiven follows this procedure:

1. **Create the new nodes:** Aiven creates new nodes alongside the existing ones, so your
   service temporarily has more nodes than your plan includes. For plans with more than
   6 nodes, Aiven adds up to 6 new nodes at a time.

1. **Join the cluster:** The new nodes join your existing OpenSearch cluster. When a new
   node is ready, Aiven adds its IP address to the DNS record of your service. The
   service hostname stays the same.

1. **Move the data:** Aiven moves the shards from the old nodes to the new nodes over
   the network. OpenSearch copies each shard to a new node before it removes the shard
   from the old node, so your indices stay available.

1. **Retire the old nodes:** When an old node has no shards left, Aiven removes its IP
   address from the DNS record. After a short wait for the DNS change to propagate,
   Aiven stops OpenSearch on the node and deletes the node. Connections that are still
   open to the node are closed at this point.

1. **Finish the update:** The maintenance update completes when all old nodes are
   removed.

If your service uses dedicated node roles, see
[Node replacement and scaling](/docs/products/opensearch/concepts/dedicated-node-roles#node-replacement-and-scaling)
for the order in which Aiven replaces each node type.

Services with a single node follow the same procedure: the new node joins the existing
node, and the data moves to the new node before the existing node is removed. Because a
single-node service has no replicas, expect a brief interruption when the existing node
leaves the cluster. If the existing node stops responding during the maintenance update,
Aiven restores the service on the new node from the latest backup, and changes made
after that backup are lost.

### Service availability during maintenance

On services with more than one node, the cluster keeps serving reads and writes for the
whole maintenance update. Your clients see an effect only when an old node is stopped:

- Connections to the old node are closed, and requests that are in progress on these
  connections fail. Your clients need to reconnect and retry these requests.
- The DNS record of your service has a time to live (TTL) of 15 seconds. Aiven removes
  the old node from the DNS record before it stops the node, so clients that re-resolve
  the DNS name move to the other nodes in time.
- Clients that cache DNS records longer than the TTL, keep connections open for a long
  time, or connect to a node IP address can still send requests to the old node after it
  stops. These requests fail until the client resolves the DNS name again.

Moving shards uses disk, network, and CPU capacity on the nodes. Searches and indexing
can be slower while the data moves, especially on heavily loaded services.

### How long maintenance takes

The duration of a maintenance update depends on:

- **Data volume and shard sizes:** More data and larger shards take longer to move.
- **Number of nodes:** Aiven replaces large clusters in batches.
- **Cluster load:** Heavy search and indexing traffic competes with the data movement
  for resources.

A maintenance update takes minutes on small services and can take several hours on large
clusters. The only interruption for your clients is when an old node stops, as described
in [Service availability during maintenance](#service-availability-during-maintenance).

### Issues you might notice

| Issue | Cause | What to do |
| ----- | ----- | ---------- |
| Failed requests or dropped connections during the maintenance update | When Aiven stops an old node, it closes the connections your clients still have open to that node. | Configure your application to reconnect and retry failed requests. Connect with the service hostname and respect the DNS TTL. |
| Slower searches or search timeouts during the maintenance update | Moving shards competes with your queries for disk, network, and CPU capacity. | Schedule maintenance for a period with low traffic, and avoid heavy queries while the update runs. If timeouts continue, contact Aiven support. |
| The maintenance update takes hours or doesn't finish | OpenSearch doesn't move shards to nodes with disk usage above the low disk watermark, 85% by default. Very large shards take a long time to move and can fail to relocate. | Keep disk usage below the [low disk watermark](/docs/products/opensearch/reference/low-space-watermarks), [free up disk space](/docs/products/opensearch/howto/handle-low-disk-space), and [split large shards](/docs/products/opensearch/howto/resolve-shards-too-large). |
| Cluster health turns red and the maintenance update stops | An index without replicas lost its only copy of a shard, for example because a node ran out of disk space. Aiven doesn't remove old nodes while the cluster health is red. | Keep at least one [replica](/docs/products/opensearch/concepts/index-replication) for each index, which is the default on multi-node services. Contact Aiven support. |
| Uneven disk usage across nodes after the maintenance update | OpenSearch balances shards across nodes by the number of shards, not by their size. | No action is needed. To keep disk usage even, keep your shard sizes similar. |

### Prepare your clients

To keep the effect on your clients small:

- Connect to your service with its hostname, never with a node IP address.
- Make sure your client, connection pool, and runtime respect the DNS TTL. For example,
  in Java applications, check the `networkaddress.cache.ttl` security property.
- Configure your application to reconnect automatically and to retry failed requests.
- [Set the maintenance window](#set-the-maintenance-window) to a period with low traffic.
- Before the maintenance update, check that disk usage is below the low disk watermark
  and that your shard sizes are within the
  [recommended range](/docs/products/opensearch/concepts/shards-number).
- To test maintenance updates on a development or staging service first, use
  [controlled upgrade pipelines](/docs/products/opensearch/howto/controlled-upgrade-pipelines).
- To apply pending updates at a time you choose instead of waiting for the maintenance
  window, start the maintenance yourself. In the **Service management** section of your
  service settings, click **Review updates** > **Start maintenance**, or use the
  [`avn service maintenance-start`](/docs/tools/cli/service-cli#avn-service-maintenance-start)
  command.

## Maintenance window

<MaintenanceWindowConcepts/>

## Set the maintenance window {#set-the-maintenance-window}

<MaintenanceWindowInstructions/>

<RelatedPages/>

- [High availability in Aiven for OpenSearch®](/docs/products/opensearch/concepts/high-availability-for-opensearch)
- [Version upgrades](/docs/products/opensearch/howto/os-version-upgrade)
- [Change the service plan](/docs/products/opensearch/howto/change-service-plan)
- [Handle low disk space](/docs/products/opensearch/howto/handle-low-disk-space)
