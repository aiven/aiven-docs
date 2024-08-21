---
title: About scaling M3
---

[M3](https://m3db.io/) scales horizontally up to a large number of nodes, at least in the low hundreds in a single cluster, and thousands, overall. Understand how to make good use of the resources and manage the load.

If you run out of resources in M3DB, you can always add more nodes (or change to larger nodes).
The same applies also to M3Aggregator nodes.

## Disk usage (M3DB only)

M3DB writes data on disk for each one of the following:

-   commit log (every point written)
-   snapshot (condensed versions of future blocks when they are still
    open)
-   fileset (historic data covering blocks to which data can no longer
    be inserted)
-   index

They all scale based on number of points in the database. However, each
namespace stores its data on the disk separately, so having namespaces
with overlapping retention periods will add to the storage space since
the data is stored repeatedly.

:::note
M3Aggregator and M3Coordinator do not store anything on disk, they keep
state in a shared etcd cluster.
:::

### Example configuration

We can use the disk space used by the unaggregated namespace over time
as a basis for calculating how much space the aggregated namespaces will
need. This example uses namespaces configured as follows:

| Namespace        | Retention | Resolution | Block size |
| ---------------- | --------- | ---------- | ---------- |
| Unaggregated (U) | 1 week    | 15 sec     | 2 hours    |
| Aggregated A (A) | 4 weeks   | 5 min      | 4 hours    |
| Aggregated B (B) | 8 weeks   | 1 hour     | 12 hours   |

The unaggregated namespace will grow at a constant rate for 1 week and
then remain at that size since the older data is not retained.

Namespace A stores the data at 5 minute intervals, so one data point
represents 20 data points from the original namespace. We know that 1
week of namespace A therefore takes up 1/20 of the storage that 1 week
of the unaggregated namespace does.

Namespace B stores the data at hourly intervals, so takes 1/240 of the
space that the unaggregated namespace uses over a week.

Since the retention data is kept for different amounts of time, we can
estimate the disk space needed as each namespace's size multiplied by
the number of weeks we keep the data for:

`( 1 + ( 4 * 1/20 ) + ( 8 * 1/240 ) ) * the space needed for the unaggregated namespace )`

We need 25% more storage than the unaggregated namespace by itself for this example.

### Block size duration

M3DB has a concept of block size duration. This option is configurable
by namespace, and cannot be changed after the namespace has been
created. A longer block size makes better use of disk, but incurs a
memory usage penalty as more of the data is held in memory before the
block is written.

Read more about this configuration [in the M3DB
documentation](https://m3db.io/docs/operational_guide/namespace_configuration/#blocksize).

### Number of files

There is a limit to the number of files that each Aiven M3DB node can
support. The number of files increases with the number of
[block shards](/docs/products/m3db/reference/terminology) that your namespace configuration requires. To increase the
number of total blocks available, we recommend increasing the number of
nodes in your setup.

## CPU usage

CPU usage generally scales with the amount of work done; the number of
operations (especially if having to open new SSL connections)
contributes significantly, as does the data mass described above. In
general:

-   M3Aggregators are not particularly CPU bound.
-   M3Coordinator's main resource that is used is CPU. However, if
    there is some sort of network congestion and requests pile up, the
    memory usage can also spike.

Adding more nodes to provide more CPU resource is our recommended
strategy,

## Memory usage

<!-- vale off -->
The memory usage of M3 is the most difficult aspect of scaling. It
consists of:
<!-- vale on -->

-   fixed base cost (of the order of hundreds of megabytes if configured
    with small or no pools)
-   per-request overhead (main cost in M3Coordinator)
-   cached data for queries
-   storing data being aggregated in memory (Only applicable if
    aggregated namespaces are configured, in which case the impact is
    seen in M3Aggregator - or a more significant impact in M3Coordinator
    if M3Aggregator is not in use)
-   storing data for the current block, that is not yet written to disk
    (represents the main memory impact in M3DB)

The first three are fairly steady, regardless of configuration settings
or points stored. However, the last two are the ones that cause the
majority of scalability problems. Both the data being stored for
aggregation and the data in current blocks (not yet persisted to disk as
filesets) scale linearly with:

-   number of time series
-   number of configured namespaces
-   number of points within single block

For efficient on-disk storage, M3's default recommendation is to have
about 720 points per block. So for 15 second intervals, that would
indicate 180 minutes, or 3 hours, per block. For longer lived namespaces
this rule of thumb may lead to too much data being kept in memory. For
example, if there is a point per day then that would indicate keeping a
block open for two years, which we would not recommend. Instead, set the
block size duration to be a day, or at the very most, a few days.

Given a consistent amount of points per second coming in, the memory
usage can be reduced by:

-   having smaller block size duration (disk usage will grow faster)
-   having fewer namespaces
-   filtering data that gets to aggregated namespaces

M3Aggregator will also hold a subset of this data; the unaggregated
namespace will not be included.

## Scaling recommendations

Have as few namespaces as you can, with as few points per block as you
can afford (to minimize memory usage) to achieve what you want. Or
filter the data that enters namespaces. If dealing only with short-term
data, avoiding aggregation altogether may be the most resource effective
choice.

## Real-world example: Aiven production configuration

At the moment we use with 30 second typical scrape interval with
following namespace configuration:

-   2 day unaggregated namespace, and
-   1 month aggregated namespace with 10-minute resolution

This approach to aggregation does increase the CPU and memory usage in
comparison to just keeping the unaggregated data for longer, but our
disk usage is much smaller.
