---
title: Memory Management and persistence in Aiven for Caching
---

Learn how Aiven for Caching, compatible with legacy Redis® OSS up to version 7.2.4, addresses the challenges of high memory usage and high change rate. Discover how it implements robust memory management and persistence strategies.

Aiven for Caching functions primarily as a database cache. Data fetched from a database
is stored in the caching system. Subsequent queries with the same parameters first check
this cache, bypassing the need for a repeat database query. This efficiency can lead to
challenges such as increased memory usage and frequent data changes, which
Aiven for Caching is specifically designed to manage.


## Data eviction policy in Aiven for Caching

Data eviction policy is one of the most important caching settings and it
is available in the Aiven Console.

Aiven for Caching offers a `maxmemory` setting that determines the maximum amount
of data that can be stored. The data eviction policy specifies what happens when this
limit is reached. By default, all Aiven for Caching services have the eviction policy
set to *No eviction*. If you continue storing data without removing anything, write
operations fail once the maximum memory is reached.

When data is consumed at a rate similar to how it is written, it is acceptable to use
the current eviction policy. However, for other use cases, it is better to use
the `allkeys-lru` eviction policy. This policy starts dropping the old keys based on
the least recently used strategy when `maxmemory` is reached. Another way to handle
the situation is to drop random keys.

Regardless of the eviction policy chosen, the system will only drop the keys with an
expiration time set, prioritizing keys with the shortest time-to-live (TTL).

:::note
If you continue to write data, you will eventually reach the `maxmemory` limit, regardless
of the eviction policy you use.
:::

## High memory and high change rate behavior

For all new Aiven for Caching services, the `maxmemory` setting is configured to **70% of
available RAM** (minus management overhead) plus 10% for replication log.
This configuration limits the memory usage to below 100%, accommodating operations
that require additional memory:

- When a new caching node connects to the master, the master node forks a copy of itself,
  transmitting the current memory contents to the new node.
- A similar forking process occurs when the state of the caching service is persisted to
  disk, which for Aiven for Caching, happens **every 10 minutes**.

:::note
When a fork occurs, all memory pages of the new process are identical to
the parent and do not consume extra memory. However, any changes in the parent process
cause the memory configurations to diverge, increasing actual memory allocation.

**Example**

If the forked process took 4 minutes to perform the task, with new data
written at 5 megabytes per second, the system memory usage can increase by approximately
1.2 gigabytes during that time.
:::

The duration of backup and replication operations depends on the total amount
f memory in use. As the size of the plan increases, the memory usage also increases,
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
attempting to write at about 50 megabytes per second is likely lead to failures,
particularly when memory usage approaches the allowed maximum or during the
initialization of a new node.
:::

## Initial synchronization

During system upgrades or in a high-availability setup in case of node failure,
a new Caching node needs to be synchronized with the current master. The new node starts
with an empty state, connects to the master, and requests a full copy of its current
state. After receiving this copy, the new node begins following the replication stream
from the master to achieve complete synchronization.

Initial synchronization is CPU intensive, and because the underlying technology (Redis®)
does not distribute the workload across multiple CPU cores, the maximum transfer speed is
typically around 50 megabytes per second. Additionally, the new node initially persists
data on disk, entering a separate loading phase with speeds in the low hundreds of
megabytes per second. For a data set of 20 gigabytes, the initial sync phase takes
about 6 minutes with today's hardware, and speed improvements are limited.

Once initial synchronization is complete, the new node begins to follow the replication
stream from the master. The size of the replication log is set to 10% of the total
memory the underlying Redis technology can use. For a 28 gigabyte plan, this is just
under 2 gigabytes.

If the volume of changes during the 6 minute initial sync exceeds the replication
log size, the new node cannot start following the replication stream and undergoes
another initial sync.

:::tip
Writing new changes at 5 megabytes per second, totaling 1.8 gigabytes over 6 minutes,
allows the new node to start up successfully. A higher constant rate of change can
cause the synchronization to fail unless the replication log size is increased.
:::

## Mitigation

Aiven does not impose a rate limit on traffic for Caching services because limiting only
relevant write operations would require a specialized proxy, and restricting all traffic
can negatively impact non-write operations.

Rate limiting might be considered in the future, but for now, it is advisable to manage
your workloads carefully and keep write rates moderate to prevent node failures due to
excessive memory usage or challenges in initializing new nodes.

:::note
If you frequently need to write large volumes of data, contact Aiven support to
discuss service configuration options that can accommodate your needs.
:::
