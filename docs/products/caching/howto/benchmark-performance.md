---
title: Benchmarking Aiven for Caching performance
---

Aiven for Caching uses `memtier_benchmark`, a command-line tool by Redis, for load generation and performance evaluation of NoSQL key-value databases.

:::warning
`redis-benchmark` is not supported to work with Aiven services, since
`CONFIG` command is not allowed to run.
:::

## Prerequisites

-   An Aiven for Caching service running.
-   `memtier_benchmark` installed. To install the tool, download the source code from
    [GitHub](https://github.com/RedisLabs/memtier_benchmark) and see the
    [README](https://github.com/RedisLabs/memtier_benchmark/blob/master/README.md)
    to install all the dependencies. Next, build and install the tool.

:::note
The `Testing` section within the
[README](https://github.com/RedisLabs/memtier_benchmark/blob/master/README.md) is optional.
:::

## Running benchmark

Before using `memtier_benchmark`, explore its capabilities with `mentier_benchmark -h` or
this [Redis article](https://redis.com/blog/memtier_benchmark-a-high-throughput-benchmarking-tool-for-redis-memcached/).

Substitute the following variables in the commands. The **Overview** page of
your Aiven for Caching service contains this information.

|  Variable  |                Description                |
|------------|-------------------------------------------|
| `USERNAME` | User name of Aiven for Caching connection |
| `PASSWORD` | Password of Aiven for Caching connection  |
| `HOST`     | Hostname for Caching connection           |
| `PORT`     | Port for Caching connection               |

The following is a sample command from the
[Redis blog](https://redis.com/blog/benchmark-shared-vs-dedicated-redis-instances/). This
command executes `10000 (-n 10000)` SET & GET operations with a `1:1 ratio (--ratio 1:1)`.
It launches `4 threads (-t 4)`, with each thread opening `25 connections (-c 25)`. The
tool performs `10 iterations (-x 10)` of each run to collect meaningful aggregate
averages.

```bash
memtier_benchmark -a 'USERNAME:PASSWORD' -s 'HOST' -p 'PORT' --tls --tls-skip-verify -t 4 -n 10000 --ratio 1:1 -c 25 -x 10 -d 100 --key-pattern S:S
```

The output provides detailed metrics on operations per second, latency, and throughput for
each test run. Below is an example output for a single benchmark cycle:

```plaintext
Writing results to stdout
[RUN #1] Preparing benchmark client...
[RUN #1] Launching threads now...
[RUN #1 100%, 216 secs]  0 threads:     1000000 ops,    1996 (avg:    4621) ops/sec, 277.88KB/sec (avg: 642.15KB/sec), 50.54 (avg: 21.63) msec latency

<<<< many lines for RUN #2 to RUN #9

[RUN #10] Preparing benchmark client...
[RUN #10] Launching threads now...
[RUN #10 100%, 224 secs]  0 threads:     1000000 ops,    4116 (avg:    4444) ops/sec, 572.83KB/sec (avg: 617.53KB/sec), 24.40 (avg: 22.49) msec latency

4         Threads
25        Connections per thread
10000     Requests per client


BEST RUN RESULTS
============================================================================================================================
Type         Ops/sec     Hits/sec   Misses/sec    Avg. Latency     p50 Latency     p99 Latency   p99.9 Latency       KB/sec
----------------------------------------------------------------------------------------------------------------------------
Sets         2404.11          ---          ---        21.62541        20.60700        48.89500       112.63900       339.90
Gets         2404.11      2404.11         0.00        21.62707        20.60700        49.15100       105.98300       328.16
Waits           0.00          ---          ---             ---             ---             ---             ---          ---
Totals       4808.23      2404.11         0.00        21.62624        20.60700        49.15100       111.10300       668.06

Request Latency Distribution
Type     <= msec         Percent
------------------------------------------------------------------------
SET      11.327        0.000
<<<< many lines
GET      66.559      100.000
---
WAIT      0.000      100.000

WORST RUN RESULTS
============================================================================================================================
Type         Ops/sec     Hits/sec   Misses/sec    Avg. Latency     p50 Latency     p99 Latency   p99.9 Latency       KB/sec
----------------------------------------------------------------------------------------------------------------------------
Sets         2249.10          ---          ---        22.94219        21.63100        47.87100       109.56700       317.98
Gets         2249.10      2249.10         0.00        22.94561        21.63100        47.87100       109.05500       307.00
Waits           0.00          ---          ---             ---             ---             ---             ---          ---
Totals       4498.20      2249.10         0.00        22.94390        21.63100        47.87100       109.56700       624.99

Request Latency Distribution
Type     <= msec         Percent
------------------------------------------------------------------------
SET      10.047        0.000
<<<< many lines
GET     191.487      100.000
---
WAIT      0.000      100.000

AGGREGATED AVERAGE RESULTS (10 runs)
============================================================================================================================
Type         Ops/sec     Hits/sec   Misses/sec    Avg. Latency     p50 Latency     p99 Latency   p99.9 Latency       KB/sec
----------------------------------------------------------------------------------------------------------------------------
Sets         2312.01          ---          ---        22.42681        21.24700        47.35900       101.88700       326.88
Gets         2312.01      2312.01         0.00        22.42914        21.24700        47.35900       101.88700       315.59
Waits           0.00          ---          ---             ---             ---             ---             ---          ---
Totals       4624.02      2312.01         0.00        22.42798        21.24700        47.35900       101.88700       642.47

Request Latency Distribution
Type     <= msec         Percent
------------------------------------------------------------------------
SET       9.791        0.000
<<<< many lines
GET     712.703      100.000
---
WAIT      0.000      100.000
```

This demonstrates the performance data obtainable with `memtier_benchmark`. The initial
sections present data from the  `10` runs. The following sections present the `BEST RUN`,
`WORST RUN` and `AGGREGATED AVERAGE` results as well as the
`Request Latency Distribution` of the operations.

Running this command on various Aiven for Caching services or the same service under
different conditions allows for effective performance comparisons

:::note
Aiven has `rate limit` on services. By default it's `200` new
connections per 0.5 second per CPU core. Also be aware of the connection
limit depending on memory size as explained in
[Estimate maximum number of connection](/docs/products/caching/howto/benchmark-performance).

Aiven enforces a `rate limit` on services. By default, it's set to `200` new connections
per 0.5 seconds per CPU core. Additionally, consider the connection limit based on memory
size as explained in [Estimate maximum number of connection](/docs/products/caching/howto/benchmark-performance).
:::
