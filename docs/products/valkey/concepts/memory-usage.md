---
title: Memory management and persistence in Aiven for Valkey™
sidebar_label: Memory management and persistence
---

Learn how Aiven for Valkey™ addresses the challenges of high memory usage and high change rate. Discover how it implements robust memory management and persistence strategies.

Aiven for Valkey™ functions primarily as a database cache. Data fetched from a database
is stored in the caching system. Subsequent queries with the same parameters first check
this cache, bypassing the need for a repeat database query. This efficiency can lead to
challenges such as increased memory usage and frequent data changes, which
Aiven for Valkey is specifically designed to manage.

## Data eviction policy in Aiven for Valkey

Data eviction policy is one of the most important caching settings and it
is available in the Aiven Console.

Aiven for Valkey sets the `maxmemory` config, which determines the maximum amount
of data that can be stored. The data eviction policy specifies what happens when this
limit is reached. By default, all Aiven for Valkey services have the eviction policy
set to *No eviction*. If you continue storing data without removing anything, write
operations fail once the maximum memory is reached.

When data is consumed at a rate similar to how it is written, it is acceptable to use
the current eviction policy. However, for other use cases, it is better to use
the `allkeys-lru` eviction policy. This policy starts dropping the old keys based on
the least recently used strategy when `maxmemory` is reached. Another way to handle
the situation is to drop random keys.

:::note
If you continue to write data, you will eventually reach the `maxmemory` limit, regardless
of the eviction policy you use.
:::

## High memory and high change rate behavior

For all new Aiven for Valkey services, the `maxmemory` setting is configured to **70% of
available RAM** (minus management overhead) plus 5% for replication log for multi-node
services.
This configuration limits the memory usage to below 100%, accommodating operations
that require additional memory:

- When a new Valkey replica connects to the primary, the service process on the primary
  node forks and creates an RDB snapshot, which is streamed to the new Valkey replica
  node.
- A similar forking process occurs when the state of the Valkey service is persisted to
  disk, which for Aiven for Valkey happens **every 10 minutes by default**.

:::tip

- To reduce snapshot frequency, set `frequent_snapshots=false`.
- To disable persistence, set `valkey_persistence=off`.

:::

:::note
When a fork occurs, all memory pages of the new process are identical to
the parent and do not consume extra memory. However, any changes in the parent process
cause the memory configurations to diverge, increasing actual memory allocation.

**Example**

If the forked process took 4 minutes to write the RDB snapshot to disk, with new data
written at 5 megabytes per second, the system memory usage can increase by approximately
1.2 gigabytes during that time.
:::

The duration of backup and replication operations depends on the total amount
of memory in use. As the size of the plan increases, the memory usage also increases,
which can cause a memory divergence. Therefore, the amount of memory reserved for
completing these operations without using a swap is directly proportional to the total
memory available.

If memory usage exceeds the available memory to the extent that a swap is required,
the node may become unresponsive and require replacement.

In scenarios involving on-disk persistence, the child process attempts to dump
all its memory onto the disk. If the parent process undergoes significant changes and
uses up available RAM, it may force the child process to swap unfinished memory pages
to disk. This transition makes the child process more I/O bound and further slows its
operation. Increased divergence from the parent process results in more frequent swapping,
further slowing the process. In such cases, the node is limited to writing and reading
from swap memory.

The rate at which data can be written is influenced by the size of the data values
and the specifics of the Aiven plan.

:::tip
Writing at about 5 megabytes per second is manageable in most situations. However,
attempting to write at about 50 megabytes per second is likely to lead to failures,
particularly when memory usage approaches the allowed maximum or during the
initialization of a new node.
:::

## Initial synchronization

During system upgrades or in a high-availability setup in case of node failure,
a new Valkey replica node needs to be synchronized with the current primary. The new
node starts with an empty state, connects to the primary, and requests a full copy of
its current state. After receiving this copy, the new node begins following the
replication stream from the primary to achieve complete synchronization.

Once initial synchronization is complete, the new node begins to follow the replication
stream from the primary. The value of the replica client output buffer limit is set to
20% of the total memory Valkey is allowed to use. For a 28 gigabyte plan, this is
around 4 gibibytes. Under memory pressure conditions, the value is set to 10%.

If the volume of changes during the initial sync exceeds the replica client output
buffer limit, the primary node logs `Client [...] scheduled to be closed ASAP for
overcoming of output buffer limits.` The replica is disconnected, the buffer is
cleared, and the replication process starts from scratch.

:::tip
Writing new changes at 5 megabytes per second, totaling 1.8 gigabytes over 6 minutes,
allows the new node to start up successfully. A higher constant rate of change can
cause the synchronization to fail unless the replica client output buffer limit is
increased.
:::

## Mitigation

Aiven does not impose a rate limit on traffic for Valkey services because limiting only
relevant write operations would require a specialized proxy, and restricting all traffic
can negatively impact non-write operations.

Rate limiting might be considered in the future, but for now, it is advisable to manage
your workloads carefully and keep write rates moderate to prevent node failures due to
excessive memory usage or challenges in initializing new nodes.

:::note
If you frequently need to write large volumes of data, contact Aiven support to
discuss service configuration options that can accommodate your needs.
:::
