---
title: High availability in Aiven for Dragonfly®
sidebar_label: High availability
---

Aiven for Dragonfly® offers different plans with varying levels of high availability. The available features depend on the selected plan.
Refer to the table below for a summary of these plans:

<table>
  <thead>
    <tr>
      <th>Plan</th>
      <th>Node configuration</th>
      <th>High availability & Backup features</th>
      <th>Backup history</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Startup</strong></td>
      <td>Single-node</td>
      <td>Limited availability. No automatic failover.</td>
      <td>During limited availability, only one latest snapshot stored.</td>
    </tr>
    <tr>
      <td><strong>Business</strong></td>
      <td>Two-node (primary + standby)</td>
      <td>High availability with automatic failover to a standby node if the primary fails.</td>
      <td>During limited availability, only one latest snapshot stored.</td>
    </tr>
    <tr>
      <td><strong>Premium</strong></td>
      <td>Three-node (primary + standby + standby)</td>
      <td>Enhanced high availability with automatic failover among multiple standby nodes if the primary fails.</td>
      <td>During limited availability, only one latest snapshot stored.</td>
    </tr>
    <tr>
      <td><strong>Custom</strong></td>
      <td>Custom configurations</td>
      <td>Custom high availability and failover features based on user requirements.</td>
      <td>During limited availability, only one latest snapshot stored. Custom based on user requirements.</td>
    </tr>
  </tbody>
</table>

## Failure handling

- **Minor failures**: Aiven automatically handles minor failures, such as service process
  crashes or temporary loss of network access, without any significant changes to the
  service deployment. In all plans, the service automatically restores regular operation
  by restarting crashed processes or restoring network access when available.
- **Severe failures**: In case of severe hardware or software problems, such as losing
  an entire node, more drastic recovery measures are required. Aiven's monitoring
  infrastructure automatically detects a failing node when it reports problems with its
  self-diagnostics or stops communicating altogether. The monitoring infrastructure then
  schedules the creation of a new replacement node.

:::note
In case of database failover, your service's
**Service URI** remains the same, only the IP address changes to
point to the new primary node.
:::

## High availability for business, premium, and custom plans

If a standby Dragonfly node fails, the primary node continues running. The system prepares
the replacement standby node and synchronizes it with the primary for normal operations
to resume.

In case the primary Dragonfly node fails, the standby node is evaluated for promotion to
the new primary based on data from the Aiven monitoring infrastructure.
Once promoted, this node starts serving clients, and a new node is scheduled to become
the standby. However, during this transition, there may be a brief service interruption.

If the primary and standby nodes fail simultaneously, new nodes are created
automatically to replace them. However, this may lead to data loss as the primary
node is restored from the latest backup. As a result, any database writes made since
the last backup can be lost.

:::note
The duration for replacing a failed node depends mainly on the **cloud region**
and the **amount of data** to be restored. For Business, Premium, and Custom plans
with multiple nodes, this process is automatic and requires no administrator
intervention, but service interruptions may occur during the recreation of nodes.
:::

## Single-node startup service plans

Losing the only node in the service triggers an automatic process of creating a new
replacement node. The new node then restores its state from the latest available backup
and resumes serving customers.

The service is unavailable for the duration of the restore operation.
All the write operations made since the last backup are lost.
