## custom_domain

**Title:** Custom domain

**Description:** Serve the web frontend using a custom CNAME pointing to the Aiven DNS name

**Type:** `string,null`

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

## private_access

**Title:** Allow access to selected service ports from private networks


**Type:** `object`

### kafka

**Title:** Allow clients to connect to kafka with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations


**Type:** `boolean`

### kafka_connect

**Title:** Allow clients to connect to kafka_connect with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations


**Type:** `boolean`

### kafka_rest

**Title:** Allow clients to connect to kafka_rest with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations


**Type:** `boolean`

### prometheus

**Title:** Allow clients to connect to prometheus with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations


**Type:** `boolean`

### schema_registry

**Title:** Allow clients to connect to schema_registry with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations


**Type:** `boolean`

## public_access

**Title:** Allow access to selected service ports from the public Internet


**Type:** `object`

### kafka

**Title:** Allow clients to connect to kafka from the public internet for service nodes that are in a project VPC or another type of private network


**Type:** `boolean`

### kafka_connect

**Title:** Allow clients to connect to kafka_connect from the public internet for service nodes that are in a project VPC or another type of private network


**Type:** `boolean`

### kafka_rest

**Title:** Allow clients to connect to kafka_rest from the public internet for service nodes that are in a project VPC or another type of private network


**Type:** `boolean`

### prometheus

**Title:** Allow clients to connect to prometheus from the public internet for service nodes that are in a project VPC or another type of private network


**Type:** `boolean`

### schema_registry

**Title:** Allow clients to connect to schema_registry from the public internet for service nodes that are in a project VPC or another type of private network


**Type:** `boolean`

## privatelink_access

**Title:** Allow access to selected service components through Privatelink


**Type:** `object`

### jolokia

**Title:** Enable jolokia


**Type:** `boolean`

### kafka

**Title:** Enable kafka


**Type:** `boolean`

### kafka_connect

**Title:** Enable kafka_connect


**Type:** `boolean`

### kafka_rest

**Title:** Enable kafka_rest


**Type:** `boolean`

### prometheus

**Title:** Enable prometheus


**Type:** `boolean`

### schema_registry

**Title:** Enable schema_registry


**Type:** `boolean`

## kafka

**Title:** Kafka broker configuration values


**Type:** `object`

### compression_type

**Title:** compression.type

**Description:** Specify the final compression type for a given topic. This configuration accepts the standard compression codecs ('gzip', 'snappy', 'lz4', 'zstd'). It additionally accepts 'uncompressed' which is equivalent to no compression; and 'producer' which means retain the original compression codec set by the producer.

**Type:** `string`

### group_initial_rebalance_delay_ms

**Title:** group.initial.rebalance.delay.ms

**Description:** The amount of time, in milliseconds, the group coordinator will wait for more consumers to join a new group before performing the first rebalance. A longer delay means potentially fewer rebalances, but increases the time until processing begins. The default value for this is 3 seconds. During development and testing it might be desirable to set this to 0 in order to not delay test execution time.

**Type:** `integer`

### group_min_session_timeout_ms

**Title:** group.min.session.timeout.ms

**Description:** The minimum allowed session timeout for registered consumers. Longer timeouts give consumers more time to process messages in between heartbeats at the cost of a longer time to detect failures.

**Type:** `integer`

### group_max_session_timeout_ms

**Title:** group.max.session.timeout.ms

**Description:** The maximum allowed session timeout for registered consumers. Longer timeouts give consumers more time to process messages in between heartbeats at the cost of a longer time to detect failures.

**Type:** `integer`

### connections_max_idle_ms

**Title:** connections.max.idle.ms

**Description:** Idle connections timeout: the server socket processor threads close the connections that idle for longer than this.

**Type:** `integer`

### max_incremental_fetch_session_cache_slots

**Title:** max.incremental.fetch.session.cache.slots

**Description:** The maximum number of incremental fetch sessions that the broker will maintain.

**Type:** `integer`

### message_max_bytes

**Title:** message.max.bytes

**Description:** The maximum size of message that the server can receive.

**Type:** `integer`

### offsets_retention_minutes

**Title:** offsets.retention.minutes

**Description:** Log retention window in minutes for offsets topic

**Type:** `integer`

### log_cleaner_delete_retention_ms

**Title:** log.cleaner.delete.retention.ms

**Description:** How long are delete records retained?

**Type:** `integer`

### log_cleaner_min_cleanable_ratio

**Title:** log.cleaner.min.cleanable.ratio

**Description:** Controls log compactor frequency. Larger value means more frequent compactions but also more space wasted for logs. Consider setting log.cleaner.max.compaction.lag.ms to enforce compactions sooner, instead of setting a very high value for this option.

**Type:** `number`

### log_cleaner_max_compaction_lag_ms

**Title:** log.cleaner.max.compaction.lag.ms

**Description:** The maximum amount of time message will remain uncompacted. Only applicable for logs that are being compacted

**Type:** `integer`

### log_cleaner_min_compaction_lag_ms

**Title:** log.cleaner.min.compaction.lag.ms

**Description:** The minimum time a message will remain uncompacted in the log. Only applicable for logs that are being compacted.

**Type:** `integer`

### log_cleanup_policy

**Title:** log.cleanup.policy

**Description:** The default cleanup policy for segments beyond the retention window

**Type:** `string`

### log_flush_interval_messages

**Title:** log.flush.interval.messages

**Description:** The number of messages accumulated on a log partition before messages are flushed to disk

**Type:** `integer`

### log_flush_interval_ms

**Title:** log.flush.interval.ms

**Description:** The maximum time in ms that a message in any topic is kept in memory before flushed to disk. If not set, the value in log.flush.scheduler.interval.ms is used

**Type:** `integer`

### log_index_interval_bytes

**Title:** log.index.interval.bytes

**Description:** The interval with which Kafka adds an entry to the offset index

**Type:** `integer`

### log_index_size_max_bytes

**Title:** log.index.size.max.bytes

**Description:** The maximum size in bytes of the offset index

**Type:** `integer`

### log_local_retention_ms

**Title:** log.local.retention.ms

**Description:** The number of milliseconds to keep the local log segments before it gets eligible for deletion. If set to -2, the value of log.retention.ms is used. The effective value should always be less than or equal to log.retention.ms value.

**Type:** `integer`

### log_local_retention_bytes

**Title:** log.local.retention.bytes

**Description:** The maximum size of local log segments that can grow for a partition before it gets eligible for deletion. If set to -2, the value of log.retention.bytes is used. The effective value should always be less than or equal to log.retention.bytes value.

**Type:** `integer`

### log_message_downconversion_enable

**Title:** log.message.downconversion.enable

**Description:** This configuration controls whether down-conversion of message formats is enabled to satisfy consume requests. 

**Type:** `boolean`

### log_message_timestamp_type

**Title:** log.message.timestamp.type

**Description:** Define whether the timestamp in the message is message create time or log append time.

**Type:** `string`

### log_message_timestamp_difference_max_ms

**Title:** log.message.timestamp.difference.max.ms

**Description:** The maximum difference allowed between the timestamp when a broker receives a message and the timestamp specified in the message

**Type:** `integer`

### log_preallocate

**Title:** log.preallocate

**Description:** Should pre allocate file when create new segment?

**Type:** `boolean`

### log_retention_bytes

**Title:** log.retention.bytes

**Description:** The maximum size of the log before deleting messages

**Type:** `integer`

### log_retention_hours

**Title:** log.retention.hours

**Description:** The number of hours to keep a log file before deleting it

**Type:** `integer`

### log_retention_ms

**Title:** log.retention.ms

**Description:** The number of milliseconds to keep a log file before deleting it (in milliseconds), If not set, the value in log.retention.minutes is used. If set to -1, no time limit is applied.

**Type:** `integer`

### log_roll_jitter_ms

**Title:** log.roll.jitter.ms

**Description:** The maximum jitter to subtract from logRollTimeMillis (in milliseconds). If not set, the value in log.roll.jitter.hours is used

**Type:** `integer`

### log_roll_ms

**Title:** log.roll.ms

**Description:** The maximum time before a new log segment is rolled out (in milliseconds).

**Type:** `integer`

### log_segment_bytes

**Title:** log.segment.bytes

**Description:** The maximum size of a single log file

**Type:** `integer`

### log_segment_delete_delay_ms

**Title:** log.segment.delete.delay.ms

**Description:** The amount of time to wait before deleting a file from the filesystem

**Type:** `integer`

### auto_create_topics_enable

**Title:** auto.create.topics.enable

**Description:** Enable auto creation of topics

**Type:** `boolean`

### min_insync_replicas

**Title:** min.insync.replicas

**Description:** When a producer sets acks to 'all' (or '-1'), min.insync.replicas specifies the minimum number of replicas that must acknowledge a write for the write to be considered successful.

**Type:** `integer`

### num_partitions

**Title:** num.partitions

**Description:** Number of partitions for autocreated topics

**Type:** `integer`

### default_replication_factor

**Title:** default.replication.factor

**Description:** Replication factor for autocreated topics

**Type:** `integer`

### replica_fetch_max_bytes

**Title:** replica.fetch.max.bytes

**Description:** The number of bytes of messages to attempt to fetch for each partition (defaults to 1048576). This is not an absolute maximum, if the first record batch in the first non-empty partition of the fetch is larger than this value, the record batch will still be returned to ensure that progress can be made.

**Type:** `integer`

### replica_fetch_response_max_bytes

**Title:** replica.fetch.response.max.bytes

**Description:** Maximum bytes expected for the entire fetch response (defaults to 10485760). Records are fetched in batches, and if the first record batch in the first non-empty partition of the fetch is larger than this value, the record batch will still be returned to ensure that progress can be made. As such, this is not an absolute maximum.

**Type:** `integer`

### max_connections_per_ip

**Title:** max.connections.per.ip

**Description:** The maximum number of connections allowed from each ip address (defaults to 2147483647).

**Type:** `integer`

### producer_purgatory_purge_interval_requests

**Title:** producer.purgatory.purge.interval.requests

**Description:** The purge interval (in number of requests) of the producer request purgatory(defaults to 1000).

**Type:** `integer`

### sasl_oauthbearer_expected_audience

**Title:** sasl.oauthbearer.expected.audience

**Description:** The (optional) comma-delimited setting for the broker to use to verify that the JWT was issued for one of the expected audiences.

**Type:** `string`

### sasl_oauthbearer_expected_issuer

**Title:** sasl.oauthbearer.expected.issuer

**Description:** Optional setting for the broker to use to verify that the JWT was created by the expected issuer.

**Type:** `string`

### sasl_oauthbearer_jwks_endpoint_url

**Title:** sasl.oauthbearer.jwks.endpoint.url

**Description:** OIDC JWKS endpoint URL. By setting this the SASL SSL OAuth2/OIDC authentication is enabled. See also other options for SASL OAuth2/OIDC. 

**Type:** `string`

### sasl_oauthbearer_sub_claim_name

**Title:** sasl.oauthbearer.sub.claim.name

**Description:** Name of the scope from which to extract the subject claim from the JWT. Defaults to sub.

**Type:** `string`

### socket_request_max_bytes

**Title:** socket.request.max.bytes

**Description:** The maximum number of bytes in a socket request (defaults to 104857600).

**Type:** `integer`

### transaction_state_log_segment_bytes

**Title:** transaction.state.log.segment.bytes

**Description:** The transaction topic segment bytes should be kept relatively small in order to facilitate faster log compaction and cache loads (defaults to 104857600 (100 mebibytes)).

**Type:** `integer`

### transaction_remove_expired_transaction_cleanup_interval_ms

**Title:** transaction.remove.expired.transaction.cleanup.interval.ms

**Description:** The interval at which to remove transactions that have expired due to transactional.id.expiration.ms passing (defaults to 3600000 (1 hour)).

**Type:** `integer`

### transaction_partition_verification_enable

**Title:** transaction.partition.verification.enable

**Description:** Enable verification that checks that the partition has been added to the transaction before writing transactional records to the partition

**Type:** `boolean`

## kafka_authentication_methods

**Title:** Kafka authentication methods


**Type:** `object`

### certificate

**Title:** Enable certificate/SSL authentication


**Type:** `boolean`

### sasl

**Title:** Enable SASL authentication


**Type:** `boolean`

## kafka_connect

**Title:** Enable Kafka Connect service


**Type:** `boolean`

## kafka_connect_config

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

**Description:** The maximum delay that is scheduled in order to wait for the return of one or more departed workers before rebalancing and reassigning their connectors and tasks to the group. During this period the connectors and tasks of the departed workers remain unassigned.  Defaults to 5 minutes.

**Type:** `integer`

### session_timeout_ms

**Title:** The timeout used to detect failures when using Kafka’s group management facilities

**Description:** The timeout in milliseconds used to detect failures when using Kafka’s group management facilities (defaults to 10000).

**Type:** `integer`

## kafka_rest

**Title:** Enable Kafka-REST service


**Type:** `boolean`

## kafka_version

**Title:** Kafka major version


**Type:** `string,null`

## schema_registry

**Title:** Enable Schema-Registry service


**Type:** `boolean`

## kafka_rest_authorization

**Title:** Enable authorization in Kafka-REST service


**Type:** `boolean`

## kafka_rest_config

**Title:** Kafka REST configuration


**Type:** `object`

### producer_acks

**Title:** producer.acks

**Description:** The number of acknowledgments the producer requires the leader to have received before considering a request complete. If set to 'all' or '-1', the leader will wait for the full set of in-sync replicas to acknowledge the record.

**Type:** `string`

### producer_compression_type

**Title:** producer.compression.type

**Description:** Specify the default compression type for producers. This configuration accepts the standard compression codecs ('gzip', 'snappy', 'lz4', 'zstd'). It additionally accepts 'none' which is the default and equivalent to no compression.

**Type:** `string`

### producer_linger_ms

**Title:** producer.linger.ms

**Description:** Wait for up to the given delay to allow batching records together

**Type:** `integer`

### producer_max_request_size

**Title:** producer.max.request.size

**Description:** The maximum size of a request in bytes. Note that Kafka broker can also cap the record batch size.

**Type:** `integer`

### consumer_enable_auto_commit

**Title:** consumer.enable.auto.commit

**Description:** If true the consumer's offset will be periodically committed to Kafka in the background

**Type:** `boolean`

### consumer_request_max_bytes

**Title:** consumer.request.max.bytes

**Description:** Maximum number of bytes in unencoded message keys and values by a single request

**Type:** `integer`

### consumer_request_timeout_ms

**Title:** consumer.request.timeout.ms

**Description:** The maximum total time to wait for messages for a request if the maximum number of messages has not yet been reached

**Type:** `integer`

### name_strategy

**Title:** name.strategy

**Description:** Name strategy to use when selecting subject for storing schemas

**Type:** `string`

### name_strategy_validation

**Title:** name.strategy.validation

**Description:** If true, validate that given schema is registered under expected subject name by the used name strategy when producing messages.

**Type:** `boolean`

### simpleconsumer_pool_size_max

**Title:** simpleconsumer.pool.size.max

**Description:** Maximum number of SimpleConsumers that can be instantiated per broker

**Type:** `integer`

## tiered_storage

**Title:** Tiered storage configuration


**Type:** `object`

### enabled

**Title:** Enabled

**Description:** Whether to enable the tiered storage functionality

**Type:** `boolean`

## schema_registry_config

**Title:** Schema Registry configuration


**Type:** `object`

### topic_name

**Title:** topic_name

**Description:** The durable single partition topic that acts as the durable log for the data. This topic must be compacted to avoid losing data due to retention policy. Please note that changing this configuration in an existing Schema Registry / Karapace setup leads to previous schemas being inaccessible, data encoded with them potentially unreadable and schema ID sequence put out of order. It's only possible to do the switch while Schema Registry / Karapace is disabled. Defaults to `_schemas`.

**Type:** `string`

### leader_eligibility

**Title:** leader_eligibility

**Description:** If true, Karapace / Schema Registry on the service nodes can participate in leader election. It might be needed to disable this when the schemas topic is replicated to a secondary cluster and Karapace / Schema Registry there must not participate in leader election. Defaults to `true`.

**Type:** `boolean`

## aiven_kafka_topic_messages

**Title:** Allow access to read Kafka topic messages in the Aiven Console and REST API.


**Type:** `boolean`

    