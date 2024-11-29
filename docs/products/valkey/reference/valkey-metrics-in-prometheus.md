---
title: Aiven for Valkey™ metrics available via Prometheus
sidebar_label: Valkey™ metrics in Prometheus
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import HostMetrics from "@site/static/includes/host-metrics.md";
import ConsoleLabel from "@site/src/components/ConsoleIcons"

Monitor and optimize your Aiven for Valkey service with metrics available via Prometheus.
These metrics help track cluster health, replication status, and overall performance.

## Prerequisites

- [Enable Prometheus integration](/docs/platform/howto/integrations/prometheus-metrics).
- Note the Prometheus **username** and **password** in the **Integration endpoints**
  section of the  [Aiven Console](https://console.aiven.io/).

## Access Prometheus metrics

<Tabs groupId="group1">
<TabItem value="browser" label="Browser" default>

1. Open your service's <ConsoleLabel name="overview"/> page in the
   [Aiven Console](https://console.aiven.io/).
1. In the **Connection information** section, click the **Prometheus** tab.
1. Copy the **Service URI**.
1. Paste the Service URI into your browser's address bar.
1. When prompted, enter your Prometheus credentials.
1. Click **Login**.

</TabItem>
<TabItem value="cli" label="CLI">

To retrieve metrics, run the following `curl` command:

```bash
curl --user 'USERNAME:PASSWORD' PROMETHEUS_URL/metrics
```

Replace `USERNAME:PASSWORD` with your Prometheus credentials and `PROMETHEUS_URL`
with the Service URI from the **Connection information** section.

</TabItem>
</Tabs>

<HostMetrics />

## Valkey-specific metrics

These metrics provide insights into the performance and health of your Aiven for
Valkey service.

- `keyspace_hitrate(float, number)`
- `rdb_last_save_time_elapsed(int, seconds)`

### Server

- `uptime(int, seconds)`
- `lru_clock(int, number)`
- `redis_version(string)`

### Clients

- `clients(int, number)`
- `client_longest_output_list(int, number)`
- `client_biggest_input_buf(int, number)`
- `blocked_clients(int, number)`

### Memory

- `used_memory(int, bytes)`
- `used_memory_rss(int, bytes)`
- `used_memory_peak(int, bytes)`
- `total_system_memory(int, bytes)`
- `used_memory_lua(int, bytes)`
- `maxmemory(int, bytes)`
- `maxmemory_policy(string)`
- `mem_fragmentation_ratio(float, number)`

### Persistence

- `loading(int,flag)
- `rdb_changes_since_last_save(int, number)`
- `rdb_bgsave_in_progress(int, flag)`
- `rdb_last_save_time(int, seconds)`
- `rdb_last_bgsave_status(string)`
- `rdb_last_bgsave_time_sec(int, seconds)`
- `rdb_current_bgsave_time_sec(int, seconds)`
- `aof_enabled(int, flag)`
- `aof_rewrite_in_progress(int, flag)`
- `aof_rewrite_scheduled(int, flag)`
- `aof_last_rewrite_time_sec(int, seconds)`
- `aof_current_rewrite_time_sec(int, seconds)`
- `aof_last_bgrewrite_status(string)`
- `aof_last_write_status(string)`

### Stats

- `total_connections_received(int, number)`
- `total_commands_processed(int, number)`
- `instantaneous_ops_per_sec(int, number)`
- `total_net_input_bytes(int, bytes)`
- `total_net_output_bytes(int, bytes)`
- `instantaneous_input_kbps(float, KB/sec)`
- `instantaneous_output_kbps(float, KB/sec)`
- `rejected_connections(int, number)`
- `sync_full(int, number)`
- `sync_partial_ok(int, number)`
- `sync_partial_err(int, number)`
- `expired_keys(int, number)`
- `evicted_keys(int, number)`
- `keyspace_hits(int, number)`
- `keyspace_misses(int, number)`
- `pubsub_channels(int, number)`
- `pubsub_patterns(int, number)`
- `latest_fork_usec(int, microseconds)`
- `migrate_cached_sockets(int, number)`

### Replication

- `connected_slaves(int, number)`
- `master_link_down_since_seconds(int, number)`
- `master_link_status(string)`
- `master_repl_offset(int, number)`
- `second_repl_offset(int, number)`
- `repl_backlog_active(int, number)`
- `repl_backlog_size(int, bytes)`
- `repl_backlog_first_byte_offset(int, number)`
- `repl_backlog_histlen(int, bytes)`

### CPU

- `used_cpu_sys(float, number)`
- `used_cpu_user(float, number)`
- `used_cpu_sys_children(float, number)`
- `used_cpu_user_children(float, number)`

### Cluster

- `cluster_enabled(int, flag)`

### `keyspace`

- `keys(int, number)`
- `expires(int, number)`
- `avg_ttl(int, number)`

### `cmdstat`

Command fields:

- `calls(int, number)`
- `failed_calls(int, number)`
- `rejected_calls(int, number)`
- `usec(int, mircoseconds)`
- `usec_per_call(float, microseconds)`

### `latency_percentiles_usec`

Command fields:

- `p50(float, microseconds)`
- `p99(float, microseconds)`
- `p99.9(float, microseconds)`

### `replication`

Tags:

- `replication_role`
- `replica_ip`
- `replica_port`
- `state (either "online", "wait_bgsave", or "send_bulk")`

Command fields:

- `lag(int, number)`
- `offset(int, number)`

### `errorstat`

Tags:

- `err`

Command fields:

- `total (int, number)`

## Measurement tags

- All measurements have the following tags:

  - `port`
  - `server`
  - `replication_role`

- `keyspace` measurement has the additional `database` tag.
- `cmdstat` measurement has the additional `command` tag.
- `latency_percentiles_usec` measurement has the additional `command` tag.
