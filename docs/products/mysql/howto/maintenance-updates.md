---
title: Maintenance and updates for your Aiven for MySQL® service
sidebar_label: Maintenance and updates
---

import MaintenanceUpdates from "@site/static/includes/maintenance-updates.md";
import MaintenanceWindowConcepts from "@site/static/includes/maintenance-window-concepts.md";
import MaintenanceWindowInstructions from "@site/static/includes/maintenance-window-instructions.md";
import RelatedPages from "@site/src/components/RelatedPages";

Learn what happens to your Aiven for MySQL® service during maintenance updates, how long the interruption lasts, how to prepare your clients, and how to set the maintenance window.

## Maintenance updates

<MaintenanceUpdates/>

## What happens during a maintenance update {#what-happens-during-a-maintenance-update}

Aiven applies maintenance updates by replacing the nodes of your service with new ones.
Your service keeps serving clients while the new nodes are prepared. The only interruption
is the switchover, when a new node takes over as the primary.

During a maintenance update, Aiven follows this procedure:

1. **Create the new nodes:** Aiven creates a new node for each node in your service plan.
   Each new node restores the latest backup and then replicates from the current primary
   until it catches up. On Business and Premium plans, Aiven replaces the standby nodes
   first.

1. **Turn on semi-synchronous replication:** When a new node has caught up, Aiven
   switches its replication from the primary to semi-synchronous. The primary waits
   for a new node to receive each transaction before the commit completes.

1. **Stop the old primary:** When the new nodes are close to up to date, Aiven stops
   MySQL on the old primary. The old primary closes all open client connections, and
   transactions that were not committed are rolled back. The interruption starts here.

1. **Promote a new primary:** Aiven promotes one of the new nodes to primary and updates
   the DNS record of your service to point to it. The service hostname stays the same,
   and only the IP address changes. The new primary accepts writes as soon as the
   promotion completes.

1. **Forward connections and retire the old nodes:** For a short time, the old primary
   forwards new client connections to the new primary, so clients that still resolve the
   old IP address can connect. After the DNS change has propagated, Aiven removes the old
   nodes. Connections that still go through the old primary are closed at this point.

Services with a single node follow the same procedure: the new node catches up with the
existing node before it takes over as the primary.

### How long the interruption lasts

The interruption usually lasts less than 10 seconds. It starts when MySQL stops on the
old primary and ends when the new primary accepts connections. All open connections are
closed when the interruption starts, so your clients need to reconnect.

The DNS record of your service has a time to live (TTL) of 15 seconds. Clients that
re-resolve the DNS name connect to the new primary directly. Clients that still use the
old IP address connect through the old primary until Aiven removes the old nodes.

The interruption is longer for clients that cache DNS records longer than the TTL, or
that keep connecting to the old IP address. These clients can't connect after Aiven
removes the old nodes, until they resolve the DNS name again.

### Issues you might notice

| Issue | Cause | What to do |
| ----- | ----- | ---------- |
| Dropped connections or failed queries at the switchover | The old primary closes all open connections when MySQL stops. Transactions that were not committed are rolled back. | Configure your application to reconnect and retry failed transactions. |
| Connection errors that continue after the switchover | The client keeps using the old IP address because it caches DNS records or reuses resolved addresses in its connection pool. | Connect with the service hostname, not an IP address. Make sure your client and runtime respect the DNS TTL. |
| Higher query latency and CPU usage for some time after the switchover | The new primary starts with an empty InnoDB buffer pool, so it reads more data from disk until the cache warms up. | Set the maintenance window to a period with low traffic. |
| The maintenance update takes hours to complete | The new nodes restore the backup and catch up with the writes made in the meantime. This usually takes minutes, but it can take hours for large datasets and high write loads. | No action is needed. This phase doesn't interrupt your service. |

### Prepare your clients

To keep the interruption short:

- Connect to your service with its hostname, never with an IP address.
- Make sure your client, connection pool, and runtime respect the DNS TTL. For example,
  in Java applications, check the `networkaddress.cache.ttl` security property.
- Configure your application to reconnect automatically and to retry transactions that
  fail during the switchover.
- [Set the maintenance window](#set-the-maintenance-window) to a period with low traffic.
- To apply pending updates at a time you choose instead of waiting for the maintenance
  window, start the maintenance yourself. In the **Service management** section of your
  service settings, click **Review updates** > **Start maintenance**, or use the
  [`avn service maintenance-start`](/docs/tools/cli/service-cli#avn-service-maintenance-start)
  command.

## Maintenance window

<MaintenanceWindowConcepts/>

## Set the maintenance window {#set-the-maintenance-window}

<MaintenanceWindowInstructions/>

## Certificate rotation

Aiven periodically rotates the CA certificate for your project. This affects your
Aiven for MySQL® service if you connect with the `VERIFY_CA` or
`VERIFY_IDENTITY` SSL mode. Your service switches to the new certificate through
two maintenance updates, applied during your maintenance window as described in
[Maintenance updates](#maintenance-updates).

:::important
Configure your clients to trust the new CA certificate before the second
maintenance update. Otherwise, your clients can't verify the server certificate
and connections fail.
:::

For the full rotation process, including how to get the new certificate, see
[Certificate rotation](/docs/platform/concepts/tls-ssl-certificates#certificate-rotation).

<RelatedPages/>

- [High availability of Aiven for MySQL®](/docs/products/mysql/concepts/high-availability)
- [Version upgrades](/docs/products/mysql/howto/manage-mysql-version)
- [Change the service plan](/docs/products/mysql/howto/change-service-plan)
- [TLS/SSL certificates](/docs/platform/concepts/tls-ssl-certificates)
