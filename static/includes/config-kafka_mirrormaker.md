## ip_filter

**Title:** IP filter

**Description:** Allow incoming connections from CIDR address block, e.g. '10.20.0.0/16'

**Type:** `array`

## service_log

**Title:** Service logging

**Description:** Store logs for the service so that they are available in the HTTP API and console.

**Type:** `boolean,null`

## static_ips

**Title:** Static IP addresses

**Description:** Use static public IP addresses

**Type:** `boolean`

## kafka_mirrormaker

**Title:** Kafka MirrorMaker configuration values


**Type:** `object`

### refresh_topics_enabled

**Title:** Refresh topics and partitions

**Description:** Whether to periodically check for new topics and partitions. Defaults to 'true'.

**Type:** `boolean`

### refresh_topics_interval_seconds

**Title:** Frequency of topic and partitions refresh

**Description:** Frequency of topic and partitions refresh in seconds. Defaults to 600 seconds (10 minutes).

**Type:** `integer`

### refresh_groups_enabled

**Title:** Refresh consumer groups

**Description:** Whether to periodically check for new consumer groups. Defaults to 'true'.

**Type:** `boolean`

### refresh_groups_interval_seconds

**Title:** Frequency of group refresh

**Description:** Frequency of consumer group refresh in seconds. Defaults to 600 seconds (10 minutes).

**Type:** `integer`

### sync_group_offsets_enabled

**Title:** Sync consumer group offsets

**Description:** Whether to periodically write the translated offsets of replicated consumer groups (in the source cluster) to __consumer_offsets topic in target cluster, as long as no active consumers in that group are connected to the target cluster

**Type:** `boolean`

### sync_group_offsets_interval_seconds

**Title:** Frequency of consumer group offset sync

**Description:** Frequency at which consumer group offsets are synced (default: 60, every minute)

**Type:** `integer`

### emit_checkpoints_enabled

**Title:** Emit consumer group offset checkpoints

**Description:** Whether to emit consumer group offset checkpoints to target cluster periodically (default: true)

**Type:** `boolean`

### emit_checkpoints_interval_seconds

**Title:** Frequency of consumer group offset checkpoints

**Description:** Frequency at which consumer group offset checkpoints are emitted (default: 60, every minute)

**Type:** `integer`

### sync_topic_configs_enabled

**Title:** Sync remote topics

**Description:** Whether to periodically configure remote topics to match their corresponding upstream topics.

**Type:** `boolean`

### tasks_max_per_cpu

**Title:** Maximum number of MirrorMaker tasks (of each type) per service CPU

**Description:** 'tasks.max' is set to this multiplied by the number of CPUs in the service.

**Type:** `integer`

### offset_lag_max

**Title:** Maximum offset lag before it is resynced

**Description:** How out-of-sync a remote partition can be before it is resynced.

**Type:** `integer`

### groups

**Title:** Comma-separated list of consumer groups to replicate

**Description:** Consumer groups to replicate. Supports comma-separated group IDs and regexes.

**Type:** `string`

### groups_exclude

**Title:** Comma-separated list of group IDs and regexes to exclude from replication

**Description:** Exclude groups. Supports comma-separated group IDs and regexes. Excludes take precedence over includes.

**Type:** `string`

    