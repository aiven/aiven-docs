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

## kafka_connect

**Title:** Kafka Connect configuration values


**Type:** `object`

### connector_client_config_override_policy

**Title:** Client config override policy

**Description:** Defines what client configurations can be overridden by the connector. Default is None

**Type:** `string`

### consumer_auto_offset_reset

**Title:** Consumer auto offset reset

**Description:** What to do when there is no initial offset in Kafka or if the current offset does not exist any more on the server. Default is earliest

**Type:** `string`

### consumer_fetch_max_bytes

**Title:** The maximum amount of data the server should return for a fetch request

**Description:** Records are fetched in batches by the consumer, and if the first record batch in the first non-empty partition of the fetch is larger than this value, the record batch will still be returned to ensure that the consumer can make progress. As such, this is not a absolute maximum.

**Type:** `integer`

### consumer_isolation_level

**Title:** Consumer isolation level

**Description:** Transaction read isolation level. read_uncommitted is the default, but read_committed can be used if consume-exactly-once behavior is desired.

**Type:** `string`

### consumer_max_partition_fetch_bytes

**Title:** The maximum amount of data per-partition the server will return.

**Description:** Records are fetched in batches by the consumer.If the first record batch in the first non-empty partition of the fetch is larger than this limit, the batch will still be returned to ensure that the consumer can make progress. 

**Type:** `integer`

### consumer_max_poll_interval_ms

**Title:** The maximum delay between polls when using consumer group management

**Description:** The maximum delay in milliseconds between invocations of poll() when using consumer group management (defaults to 300000).

**Type:** `integer`

### consumer_max_poll_records

**Title:** The maximum number of records returned by a single poll

**Description:** The maximum number of records returned in a single call to poll() (defaults to 500).

**Type:** `integer`

### offset_flush_interval_ms

**Title:** The interval at which to try committing offsets for tasks

**Description:** The interval at which to try committing offsets for tasks (defaults to 60000).

**Type:** `integer`

### offset_flush_timeout_ms

**Title:** Offset flush timeout

**Description:** Maximum number of milliseconds to wait for records to flush and partition offset data to be committed to offset storage before cancelling the process and restoring the offset data to be committed in a future attempt (defaults to 5000).

**Type:** `integer`

### producer_batch_size

**Title:** The batch size in bytes the producer will attempt to collect for the same partition before publishing to broker

**Description:** This setting gives the upper bound of the batch size to be sent. If there are fewer than this many bytes accumulated for this partition, the producer will 'linger' for the linger.ms time waiting for more records to show up. A batch size of zero will disable batching entirely (defaults to 16384).

**Type:** `integer`

### producer_buffer_memory

**Title:** The total bytes of memory the producer can use to buffer records waiting to be sent to the broker

**Description:** The total bytes of memory the producer can use to buffer records waiting to be sent to the broker (defaults to 33554432).

**Type:** `integer`

### producer_compression_type

**Title:** The default compression type for producers

**Description:** Specify the default compression type for producers. This configuration accepts the standard compression codecs ('gzip', 'snappy', 'lz4', 'zstd'). It additionally accepts 'none' which is the default and equivalent to no compression.

**Type:** `string`

### producer_linger_ms

**Title:** Wait for up to the given delay to allow batching records together

**Description:** This setting gives the upper bound on the delay for batching: once there is batch.size worth of records for a partition it will be sent immediately regardless of this setting, however if there are fewer than this many bytes accumulated for this partition the producer will 'linger' for the specified time waiting for more records to show up. Defaults to 0.

**Type:** `integer`

### producer_max_request_size

**Title:** The maximum size of a request in bytes

**Description:** This setting will limit the number of record batches the producer will send in a single request to avoid sending huge requests.

**Type:** `integer`

### scheduled_rebalance_max_delay_ms

**Title:** The maximum delay of rebalancing connector workers

**Description:** The maximum delay that is scheduled in order to wait for the return of one or more departed workers before rebalancing and reassigning their connectors and tasks to the group. During this period the connectors and tasks of the departed workers remain unassigned. Defaults to 5 minutes.

**Type:** `integer`

### session_timeout_ms

**Title:** The timeout used to detect failures when using Kafka’s group management facilities

**Description:** The timeout in milliseconds used to detect failures when using Kafka’s group management facilities (defaults to 10000).

**Type:** `integer`

## private_access

**Title:** Allow access to selected service ports from private networks


**Type:** `object`

### kafka_connect

**Title:** Allow clients to connect to kafka_connect with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations


**Type:** `boolean`

### prometheus

**Title:** Allow clients to connect to prometheus with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations


**Type:** `boolean`

## privatelink_access

**Title:** Allow access to selected service components through Privatelink


**Type:** `object`

### jolokia

**Title:** Enable jolokia


**Type:** `boolean`

### kafka_connect

**Title:** Enable kafka_connect


**Type:** `boolean`

### prometheus

**Title:** Enable prometheus


**Type:** `boolean`

## public_access

**Title:** Allow access to selected service ports from the public Internet


**Type:** `object`

### kafka_connect

**Title:** Allow clients to connect to kafka_connect from the public internet for service nodes that are in a project VPC or another type of private network


**Type:** `boolean`

### prometheus

**Title:** Allow clients to connect to prometheus from the public internet for service nodes that are in a project VPC or another type of private network


**Type:** `boolean`

    