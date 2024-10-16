
<!-- vale off -->
<table className="service-param">
  <thead>
    <tr><th>Parameter</th></tr>
  </thead>
  <tbody>    <tr>
      <td>
        <div className="param"><p className="name" id="custom_domain"><a href="#custom_domain"><strong>custom_domain</strong></a></p><p><code className="type">string,null</code></p></div>
        <p className="title">Custom domain</p>
        <div className="description"><p>Serve the web frontend using a custom CNAME pointing to the Aiven DNS name</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="ip_filter"><a href="#ip_filter"><strong>ip_filter</strong></a></p><p><code className="type">array</code></p></div><div className="constraints"><ul><li>default: <code>0.0.0.0/0</code></li></ul></div>
        <p className="title">IP filter</p>
        <div className="description"><p>Allow incoming connections from CIDR address block, e.g. '10.20.0.0/16'</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="service_log"><a href="#service_log"><strong>service_log</strong></a></p><p><code className="type">boolean,null</code></p></div>
        <p className="title">Service logging</p>
        <div className="description"><p>Store logs for the service so that they are available in the HTTP API and console.</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="static_ips"><a href="#static_ips"><strong>static_ips</strong></a></p><p><code className="type">boolean</code></p></div>
        <p className="title">Static IP addresses</p>
        <div className="description"><p>Use static public IP addresses</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="single_zone"><a href="#single_zone"><strong>single_zone</strong></a></p><p><code className="type">object</code></p></div>
        <p className="title">Single-zone configuration</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="single_zone_enabled"><a href="#single_zone_enabled"><strong>single_zone.enabled</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Enabled</p>
              <div className="description"><p>Whether to allocate nodes on the same Availability Zone or spread across zones available. By default service nodes are spread across different AZs. The single AZ support is best-effort and may temporarily allocate nodes in different AZs e.g. in case of capacity limitations in one AZ.</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="private_access"><a href="#private_access"><strong>private_access</strong></a></p><p><code className="type">object</code></p></div>
        <p className="title">Allow access to selected service ports from private networks</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="private_access_kafka"><a href="#private_access_kafka"><strong>private_access.kafka</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to kafka with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="private_access_kafka_connect"><a href="#private_access_kafka_connect"><strong>private_access.kafka_connect</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to kafka_connect with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="private_access_kafka_rest"><a href="#private_access_kafka_rest"><strong>private_access.kafka_rest</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to kafka_rest with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="private_access_prometheus"><a href="#private_access_prometheus"><strong>private_access.prometheus</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to prometheus with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="private_access_schema_registry"><a href="#private_access_schema_registry"><strong>private_access.schema_registry</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to schema_registry with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="public_access"><a href="#public_access"><strong>public_access</strong></a></p><p><code className="type">object</code></p></div>
        <p className="title">Allow access to selected service ports from the public Internet</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="public_access_kafka"><a href="#public_access_kafka"><strong>public_access.kafka</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to kafka from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="public_access_kafka_connect"><a href="#public_access_kafka_connect"><strong>public_access.kafka_connect</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to kafka_connect from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="public_access_kafka_rest"><a href="#public_access_kafka_rest"><strong>public_access.kafka_rest</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to kafka_rest from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="public_access_prometheus"><a href="#public_access_prometheus"><strong>public_access.prometheus</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to prometheus from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="public_access_schema_registry"><a href="#public_access_schema_registry"><strong>public_access.schema_registry</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to schema_registry from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="privatelink_access"><a href="#privatelink_access"><strong>privatelink_access</strong></a></p><p><code className="type">object</code></p></div>
        <p className="title">Allow access to selected service components through Privatelink</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="privatelink_access_jolokia"><a href="#privatelink_access_jolokia"><strong>privatelink_access.jolokia</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Enable jolokia</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="privatelink_access_kafka"><a href="#privatelink_access_kafka"><strong>privatelink_access.kafka</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Enable kafka</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="privatelink_access_kafka_connect"><a href="#privatelink_access_kafka_connect"><strong>privatelink_access.kafka_connect</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Enable kafka_connect</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="privatelink_access_kafka_rest"><a href="#privatelink_access_kafka_rest"><strong>privatelink_access.kafka_rest</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Enable kafka_rest</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="privatelink_access_prometheus"><a href="#privatelink_access_prometheus"><strong>privatelink_access.prometheus</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Enable prometheus</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="privatelink_access_schema_registry"><a href="#privatelink_access_schema_registry"><strong>privatelink_access.schema_registry</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Enable schema_registry</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="letsencrypt_sasl_privatelink"><a href="#letsencrypt_sasl_privatelink"><strong>letsencrypt_sasl_privatelink</strong></a></p><p><code className="type">boolean,null</code></p></div>
        <p className="title">Use Letsencrypt CA for Kafka SASL via Privatelink</p>
        <div className="description"><p>Use Letsencrypt CA for Kafka SASL via Privatelink</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="kafka"><a href="#kafka"><strong>kafka</strong></a></p><p><code className="type">object</code></p></div><div className="constraints"><ul><li>default: <code>[object Object]</code></li></ul></div>
        <p className="title">Kafka broker configuration values</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_compression_type"><a href="#kafka_compression_type"><strong>kafka.compression_type</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">compression.type</p>
              <div className="description"><p>Specify the final compression type for a given topic. This configuration accepts the standard compression codecs ('gzip', 'snappy', 'lz4', 'zstd'). It additionally accepts 'uncompressed' which is equivalent to no compression; and 'producer' which means retain the original compression codec set by the producer.(Default: producer)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_group_initial_rebalance_delay_ms"><a href="#kafka_group_initial_rebalance_delay_ms"><strong>kafka.group_initial_rebalance_delay_ms</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>300000</code></li></ul></div>
              <p className="title">group.initial.rebalance.delay.ms</p>
              <div className="description"><p>The amount of time, in milliseconds, the group coordinator will wait for more consumers to join a new group before performing the first rebalance. A longer delay means potentially fewer rebalances, but increases the time until processing begins. The default value for this is 3 seconds. During development and testing it might be desirable to set this to 0 in order to not delay test execution time. (Default: 3000 ms (3 seconds))</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_group_min_session_timeout_ms"><a href="#kafka_group_min_session_timeout_ms"><strong>kafka.group_min_session_timeout_ms</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>60000</code></li></ul></div>
              <p className="title">group.min.session.timeout.ms</p>
              <div className="description"><p>The minimum allowed session timeout for registered consumers. Longer timeouts give consumers more time to process messages in between heartbeats at the cost of a longer time to detect failures. (Default: 6000 ms (6 seconds))</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_group_max_session_timeout_ms"><a href="#kafka_group_max_session_timeout_ms"><strong>kafka.group_max_session_timeout_ms</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>1800000</code></li></ul></div>
              <p className="title">group.max.session.timeout.ms</p>
              <div className="description"><p>The maximum allowed session timeout for registered consumers. Longer timeouts give consumers more time to process messages in between heartbeats at the cost of a longer time to detect failures. Default: 1800000 ms (30 minutes)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_connections_max_idle_ms"><a href="#kafka_connections_max_idle_ms"><strong>kafka.connections_max_idle_ms</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1000</code></li><li>max: <code>3600000</code></li></ul></div>
              <p className="title">connections.max.idle.ms</p>
              <div className="description"><p>Idle connections timeout: the server socket processor threads close the connections that idle for longer than this. (Default: 600000 ms (10 minutes))</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_max_incremental_fetch_session_cache_slots"><a href="#kafka_max_incremental_fetch_session_cache_slots"><strong>kafka.max_incremental_fetch_session_cache_slots</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1000</code></li><li>max: <code>10000</code></li></ul></div>
              <p className="title">max.incremental.fetch.session.cache.slots</p>
              <div className="description"><p>The maximum number of incremental fetch sessions that the broker will maintain. (Default: 1000)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_message_max_bytes"><a href="#kafka_message_max_bytes"><strong>kafka.message_max_bytes</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>100001200</code></li></ul></div>
              <p className="title">message.max.bytes</p>
              <div className="description"><p>The maximum size of message that the server can receive. (Default: 1048588 bytes (1 mebibyte + 12 bytes))</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_offsets_retention_minutes"><a href="#kafka_offsets_retention_minutes"><strong>kafka.offsets_retention_minutes</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>2147483647</code></li></ul></div>
              <p className="title">offsets.retention.minutes</p>
              <div className="description"><p>Log retention window in minutes for offsets topic (Default: 10080 minutes (7 days))</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_log_cleaner_delete_retention_ms"><a href="#kafka_log_cleaner_delete_retention_ms"><strong>kafka.log_cleaner_delete_retention_ms</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>315569260000</code></li></ul></div>
              <p className="title">log.cleaner.delete.retention.ms</p>
              <div className="description"><p>How long are delete records retained? (Default: 86400000 (1 day))</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_log_cleaner_min_cleanable_ratio"><a href="#kafka_log_cleaner_min_cleanable_ratio"><strong>kafka.log_cleaner_min_cleanable_ratio</strong></a></p><p><code className="type">number</code></p></div><div className="constraints"><ul><li>min: <code>0.2</code></li><li>max: <code>0.9</code></li></ul></div>
              <p className="title">log.cleaner.min.cleanable.ratio</p>
              <div className="description"><p>Controls log compactor frequency. Larger value means more frequent compactions but also more space wasted for logs. Consider setting log.cleaner.max.compaction.lag.ms to enforce compactions sooner, instead of setting a very high value for this option. (Default: 0.5)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_log_cleaner_max_compaction_lag_ms"><a href="#kafka_log_cleaner_max_compaction_lag_ms"><strong>kafka.log_cleaner_max_compaction_lag_ms</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>30000</code></li><li>max: <code>9223372036854776000</code></li></ul></div>
              <p className="title">log.cleaner.max.compaction.lag.ms</p>
              <div className="description"><p>The maximum amount of time message will remain uncompacted. Only applicable for logs that are being compacted. (Default: 9223372036854775807 ms (Long.MAX_VALUE))</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_log_cleaner_min_compaction_lag_ms"><a href="#kafka_log_cleaner_min_compaction_lag_ms"><strong>kafka.log_cleaner_min_compaction_lag_ms</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>9223372036854776000</code></li></ul></div>
              <p className="title">log.cleaner.min.compaction.lag.ms</p>
              <div className="description"><p>The minimum time a message will remain uncompacted in the log. Only applicable for logs that are being compacted. (Default: 0 ms)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_log_cleanup_policy"><a href="#kafka_log_cleanup_policy"><strong>kafka.log_cleanup_policy</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">log.cleanup.policy</p>
              <div className="description"><p>The default cleanup policy for segments beyond the retention window (Default: delete)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_log_flush_interval_messages"><a href="#kafka_log_flush_interval_messages"><strong>kafka.log_flush_interval_messages</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>9223372036854776000</code></li></ul></div>
              <p className="title">log.flush.interval.messages</p>
              <div className="description"><p>The number of messages accumulated on a log partition before messages are flushed to disk (Default: 9223372036854775807 (Long.MAX_VALUE))</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_log_flush_interval_ms"><a href="#kafka_log_flush_interval_ms"><strong>kafka.log_flush_interval_ms</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>9223372036854776000</code></li></ul></div>
              <p className="title">log.flush.interval.ms</p>
              <div className="description"><p>The maximum time in ms that a message in any topic is kept in memory (page-cache) before flushed to disk. If not set, the value in log.flush.scheduler.interval.ms is used (Default: null)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_log_index_interval_bytes"><a href="#kafka_log_index_interval_bytes"><strong>kafka.log_index_interval_bytes</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>104857600</code></li></ul></div>
              <p className="title">log.index.interval.bytes</p>
              <div className="description"><p>The interval with which Kafka adds an entry to the offset index (Default: 4096 bytes (4 kibibytes))</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_log_index_size_max_bytes"><a href="#kafka_log_index_size_max_bytes"><strong>kafka.log_index_size_max_bytes</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1048576</code></li><li>max: <code>104857600</code></li></ul></div>
              <p className="title">log.index.size.max.bytes</p>
              <div className="description"><p>The maximum size in bytes of the offset index (Default: 10485760 (10 mebibytes))</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_log_local_retention_ms"><a href="#kafka_log_local_retention_ms"><strong>kafka.log_local_retention_ms</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>-2</code></li><li>max: <code>9223372036854776000</code></li></ul></div>
              <p className="title">log.local.retention.ms</p>
              <div className="description"><p>The number of milliseconds to keep the local log segments before it gets eligible for deletion. If set to -2, the value of log.retention.ms is used. The effective value should always be less than or equal to log.retention.ms value. (Default: -2)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_log_local_retention_bytes"><a href="#kafka_log_local_retention_bytes"><strong>kafka.log_local_retention_bytes</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>-2</code></li><li>max: <code>9223372036854776000</code></li></ul></div>
              <p className="title">log.local.retention.bytes</p>
              <div className="description"><p>The maximum size of local log segments that can grow for a partition before it gets eligible for deletion. If set to -2, the value of log.retention.bytes is used. The effective value should always be less than or equal to log.retention.bytes value. (Default: -2)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_log_message_downconversion_enable"><a href="#kafka_log_message_downconversion_enable"><strong>kafka.log_message_downconversion_enable</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">log.message.downconversion.enable</p>
              <div className="description"><p>This configuration controls whether down-conversion of message formats is enabled to satisfy consume requests. (Default: true)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_log_message_timestamp_type"><a href="#kafka_log_message_timestamp_type"><strong>kafka.log_message_timestamp_type</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">log.message.timestamp.type</p>
              <div className="description"><p>Define whether the timestamp in the message is message create time or log append time. (Default: CreateTime)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_log_message_timestamp_difference_max_ms"><a href="#kafka_log_message_timestamp_difference_max_ms"><strong>kafka.log_message_timestamp_difference_max_ms</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>9223372036854776000</code></li></ul></div>
              <p className="title">log.message.timestamp.difference.max.ms</p>
              <div className="description"><p>The maximum difference allowed between the timestamp when a broker receives a message and the timestamp specified in the message (Default: 9223372036854775807 (Long.MAX_VALUE))</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_log_preallocate"><a href="#kafka_log_preallocate"><strong>kafka.log_preallocate</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">log.preallocate</p>
              <div className="description"><p>Should pre allocate file when create new segment? (Default: false)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_log_retention_bytes"><a href="#kafka_log_retention_bytes"><strong>kafka.log_retention_bytes</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>-1</code></li><li>max: <code>9223372036854776000</code></li></ul></div>
              <p className="title">log.retention.bytes</p>
              <div className="description"><p>The maximum size of the log before deleting messages (Default: -1)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_log_retention_hours"><a href="#kafka_log_retention_hours"><strong>kafka.log_retention_hours</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>-1</code></li><li>max: <code>2147483647</code></li></ul></div>
              <p className="title">log.retention.hours</p>
              <div className="description"><p>The number of hours to keep a log file before deleting it (Default: 168 hours (1 week))</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_log_retention_ms"><a href="#kafka_log_retention_ms"><strong>kafka.log_retention_ms</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>-1</code></li><li>max: <code>9223372036854776000</code></li></ul></div>
              <p className="title">log.retention.ms</p>
              <div className="description"><p>The number of milliseconds to keep a log file before deleting it (in milliseconds), If not set, the value in log.retention.minutes is used. If set to -1, no time limit is applied. (Default: null, log.retention.hours applies)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_log_roll_jitter_ms"><a href="#kafka_log_roll_jitter_ms"><strong>kafka.log_roll_jitter_ms</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>9223372036854776000</code></li></ul></div>
              <p className="title">log.roll.jitter.ms</p>
              <div className="description"><p>The maximum jitter to subtract from logRollTimeMillis (in milliseconds). If not set, the value in log.roll.jitter.hours is used (Default: null)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_log_roll_ms"><a href="#kafka_log_roll_ms"><strong>kafka.log_roll_ms</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>9223372036854776000</code></li></ul></div>
              <p className="title">log.roll.ms</p>
              <div className="description"><p>The maximum time before a new log segment is rolled out (in milliseconds). (Default: null, log.roll.hours applies (Default: 168, 7 days))</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_log_segment_bytes"><a href="#kafka_log_segment_bytes"><strong>kafka.log_segment_bytes</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>10485760</code></li><li>max: <code>1073741824</code></li></ul></div>
              <p className="title">log.segment.bytes</p>
              <div className="description"><p>The maximum size of a single log file (Default: 1073741824 bytes (1 gibibyte))</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_log_segment_delete_delay_ms"><a href="#kafka_log_segment_delete_delay_ms"><strong>kafka.log_segment_delete_delay_ms</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>3600000</code></li></ul></div>
              <p className="title">log.segment.delete.delay.ms</p>
              <div className="description"><p>The amount of time to wait before deleting a file from the filesystem (Default: 60000 ms (1 minute))</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_auto_create_topics_enable"><a href="#kafka_auto_create_topics_enable"><strong>kafka.auto_create_topics_enable</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">auto.create.topics.enable</p>
              <div className="description"><p>Enable auto-creation of topics. (Default: true)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_min_insync_replicas"><a href="#kafka_min_insync_replicas"><strong>kafka.min_insync_replicas</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>7</code></li></ul></div>
              <p className="title">min.insync.replicas</p>
              <div className="description"><p>When a producer sets acks to 'all' (or '-1'), min.insync.replicas specifies the minimum number of replicas that must acknowledge a write for the write to be considered successful. (Default: 1)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_num_partitions"><a href="#kafka_num_partitions"><strong>kafka.num_partitions</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>1000</code></li></ul></div>
              <p className="title">num.partitions</p>
              <div className="description"><p>Number of partitions for auto-created topics (Default: 1)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_default_replication_factor"><a href="#kafka_default_replication_factor"><strong>kafka.default_replication_factor</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>10</code></li></ul></div>
              <p className="title">default.replication.factor</p>
              <div className="description"><p>Replication factor for auto-created topics (Default: 3)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_replica_fetch_max_bytes"><a href="#kafka_replica_fetch_max_bytes"><strong>kafka.replica_fetch_max_bytes</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1048576</code></li><li>max: <code>104857600</code></li></ul></div>
              <p className="title">replica.fetch.max.bytes</p>
              <div className="description"><p>The number of bytes of messages to attempt to fetch for each partition . This is not an absolute maximum, if the first record batch in the first non-empty partition of the fetch is larger than this value, the record batch will still be returned to ensure that progress can be made. (Default: 1048576 bytes (1 mebibytes))</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_replica_fetch_response_max_bytes"><a href="#kafka_replica_fetch_response_max_bytes"><strong>kafka.replica_fetch_response_max_bytes</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>10485760</code></li><li>max: <code>1048576000</code></li></ul></div>
              <p className="title">replica.fetch.response.max.bytes</p>
              <div className="description"><p>Maximum bytes expected for the entire fetch response. Records are fetched in batches, and if the first record batch in the first non-empty partition of the fetch is larger than this value, the record batch will still be returned to ensure that progress can be made. As such, this is not an absolute maximum. (Default: 10485760 bytes (10 mebibytes))</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_max_connections_per_ip"><a href="#kafka_max_connections_per_ip"><strong>kafka.max_connections_per_ip</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>256</code></li><li>max: <code>2147483647</code></li></ul></div>
              <p className="title">max.connections.per.ip</p>
              <div className="description"><p>The maximum number of connections allowed from each ip address (Default: 2147483647).</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_producer_purgatory_purge_interval_requests"><a href="#kafka_producer_purgatory_purge_interval_requests"><strong>kafka.producer_purgatory_purge_interval_requests</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>10</code></li><li>max: <code>10000</code></li></ul></div>
              <p className="title">producer.purgatory.purge.interval.requests</p>
              <div className="description"><p>The purge interval (in number of requests) of the producer request purgatory (Default: 1000).</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_sasl_oauthbearer_expected_audience"><a href="#kafka_sasl_oauthbearer_expected_audience"><strong>kafka.sasl_oauthbearer_expected_audience</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">sasl.oauthbearer.expected.audience</p>
              <div className="description"><p>The (optional) comma-delimited setting for the broker to use to verify that the JWT was issued for one of the expected audiences. (Default: null)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_sasl_oauthbearer_expected_issuer"><a href="#kafka_sasl_oauthbearer_expected_issuer"><strong>kafka.sasl_oauthbearer_expected_issuer</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">sasl.oauthbearer.expected.issuer</p>
              <div className="description"><p>Optional setting for the broker to use to verify that the JWT was created by the expected issuer.(Default: null)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_sasl_oauthbearer_jwks_endpoint_url"><a href="#kafka_sasl_oauthbearer_jwks_endpoint_url"><strong>kafka.sasl_oauthbearer_jwks_endpoint_url</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">sasl.oauthbearer.jwks.endpoint.url</p>
              <div className="description"><p>OIDC JWKS endpoint URL. By setting this the SASL SSL OAuth2/OIDC authentication is enabled. See also other options for SASL OAuth2/OIDC. (Default: null)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_sasl_oauthbearer_sub_claim_name"><a href="#kafka_sasl_oauthbearer_sub_claim_name"><strong>kafka.sasl_oauthbearer_sub_claim_name</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">sasl.oauthbearer.sub.claim.name</p>
              <div className="description"><p>Name of the scope from which to extract the subject claim from the JWT.(Default: sub)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_socket_request_max_bytes"><a href="#kafka_socket_request_max_bytes"><strong>kafka.socket_request_max_bytes</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>10485760</code></li><li>max: <code>209715200</code></li></ul></div>
              <p className="title">socket.request.max.bytes</p>
              <div className="description"><p>The maximum number of bytes in a socket request (Default: 104857600 bytes).</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_transaction_state_log_segment_bytes"><a href="#kafka_transaction_state_log_segment_bytes"><strong>kafka.transaction_state_log_segment_bytes</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1048576</code></li><li>max: <code>2147483647</code></li></ul></div>
              <p className="title">transaction.state.log.segment.bytes</p>
              <div className="description"><p>The transaction topic segment bytes should be kept relatively small in order to facilitate faster log compaction and cache loads (Default: 104857600 bytes (100 mebibytes)).</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_transaction_remove_expired_transaction_cleanup_interval_ms"><a href="#kafka_transaction_remove_expired_transaction_cleanup_interval_ms"><strong>kafka.transaction_remove_expired_transaction_cleanup_interval_ms</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>600000</code></li><li>max: <code>3600000</code></li></ul></div>
              <p className="title">transaction.remove.expired.transaction.cleanup.interval.ms</p>
              <div className="description"><p>The interval at which to remove transactions that have expired due to transactional.id.expiration.ms passing (Default: 3600000 ms (1 hour)).</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_transaction_partition_verification_enable"><a href="#kafka_transaction_partition_verification_enable"><strong>kafka.transaction_partition_verification_enable</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">transaction.partition.verification.enable</p>
              <div className="description"><p>Enable verification that checks that the partition has been added to the transaction before writing transactional records to the partition. (Default: true)</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="kafka_authentication_methods"><a href="#kafka_authentication_methods"><strong>kafka_authentication_methods</strong></a></p><p><code className="type">object</code></p></div>
        <p className="title">Kafka authentication methods</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_authentication_methods_certificate"><a href="#kafka_authentication_methods_certificate"><strong>kafka_authentication_methods.certificate</strong></a></p><p><code className="type">boolean</code></p></div><div className="constraints"><ul><li>default: <code>true</code></li></ul></div>
              <p className="title">Enable certificate/SSL authentication</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_authentication_methods_sasl"><a href="#kafka_authentication_methods_sasl"><strong>kafka_authentication_methods.sasl</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Enable SASL authentication</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="kafka_sasl_mechanisms"><a href="#kafka_sasl_mechanisms"><strong>kafka_sasl_mechanisms</strong></a></p><p><code className="type">object</code></p></div>
        <p className="title">Kafka SASL mechanisms</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_sasl_mechanisms_plain"><a href="#kafka_sasl_mechanisms_plain"><strong>kafka_sasl_mechanisms.plain</strong></a></p><p><code className="type">boolean</code></p></div><div className="constraints"><ul><li>default: <code>true</code></li></ul></div>
              <p className="title">Enable PLAIN mechanism</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_sasl_mechanisms_scram_sha_256"><a href="#kafka_sasl_mechanisms_scram_sha_256"><strong>kafka_sasl_mechanisms.scram_sha_256</strong></a></p><p><code className="type">boolean</code></p></div><div className="constraints"><ul><li>default: <code>true</code></li></ul></div>
              <p className="title">Enable SCRAM-SHA-256 mechanism</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_sasl_mechanisms_scram_sha_512"><a href="#kafka_sasl_mechanisms_scram_sha_512"><strong>kafka_sasl_mechanisms.scram_sha_512</strong></a></p><p><code className="type">boolean</code></p></div><div className="constraints"><ul><li>default: <code>true</code></li></ul></div>
              <p className="title">Enable SCRAM-SHA-512 mechanism</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="follower_fetching"><a href="#follower_fetching"><strong>follower_fetching</strong></a></p><p><code className="type">object</code></p></div>
        <p className="title">Enable follower fetching</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="follower_fetching_enabled"><a href="#follower_fetching_enabled"><strong>follower_fetching.enabled</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Enabled</p>
              <div className="description"><p>Whether to enable the follower fetching functionality</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="kafka_connect"><a href="#kafka_connect"><strong>kafka_connect</strong></a></p><p><code className="type">boolean</code></p></div>
        <p className="title">Enable Kafka Connect service</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="kafka_connect_config"><a href="#kafka_connect_config"><strong>kafka_connect_config</strong></a></p><p><code className="type">object</code></p></div>
        <p className="title">Kafka Connect configuration values</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_connect_config_connector_client_config_override_policy"><a href="#kafka_connect_config_connector_client_config_override_policy"><strong>kafka_connect_config.connector_client_config_override_policy</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">Client config override policy</p>
              <div className="description"><p>Defines what client configurations can be overridden by the connector. Default is None</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_connect_config_consumer_auto_offset_reset"><a href="#kafka_connect_config_consumer_auto_offset_reset"><strong>kafka_connect_config.consumer_auto_offset_reset</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">Consumer auto offset reset</p>
              <div className="description"><p>What to do when there is no initial offset in Kafka or if the current offset does not exist any more on the server. Default is earliest</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_connect_config_consumer_fetch_max_bytes"><a href="#kafka_connect_config_consumer_fetch_max_bytes"><strong>kafka_connect_config.consumer_fetch_max_bytes</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1048576</code></li><li>max: <code>104857600</code></li></ul></div>
              <p className="title">The maximum amount of data the server should return for a fetch request</p>
              <div className="description"><p>Records are fetched in batches by the consumer, and if the first record batch in the first non-empty partition of the fetch is larger than this value, the record batch will still be returned to ensure that the consumer can make progress. As such, this is not a absolute maximum.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_connect_config_consumer_isolation_level"><a href="#kafka_connect_config_consumer_isolation_level"><strong>kafka_connect_config.consumer_isolation_level</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">Consumer isolation level</p>
              <div className="description"><p>Transaction read isolation level. read_uncommitted is the default, but read_committed can be used if consume-exactly-once behavior is desired.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_connect_config_consumer_max_partition_fetch_bytes"><a href="#kafka_connect_config_consumer_max_partition_fetch_bytes"><strong>kafka_connect_config.consumer_max_partition_fetch_bytes</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1048576</code></li><li>max: <code>104857600</code></li></ul></div>
              <p className="title">The maximum amount of data per-partition the server will return.</p>
              <div className="description"><p>Records are fetched in batches by the consumer.If the first record batch in the first non-empty partition of the fetch is larger than this limit, the batch will still be returned to ensure that the consumer can make progress. </p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_connect_config_consumer_max_poll_interval_ms"><a href="#kafka_connect_config_consumer_max_poll_interval_ms"><strong>kafka_connect_config.consumer_max_poll_interval_ms</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>2147483647</code></li></ul></div>
              <p className="title">The maximum delay between polls when using consumer group management</p>
              <div className="description"><p>The maximum delay in milliseconds between invocations of poll() when using consumer group management (defaults to 300000).</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_connect_config_consumer_max_poll_records"><a href="#kafka_connect_config_consumer_max_poll_records"><strong>kafka_connect_config.consumer_max_poll_records</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>10000</code></li></ul></div>
              <p className="title">The maximum number of records returned by a single poll</p>
              <div className="description"><p>The maximum number of records returned in a single call to poll() (defaults to 500).</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_connect_config_offset_flush_interval_ms"><a href="#kafka_connect_config_offset_flush_interval_ms"><strong>kafka_connect_config.offset_flush_interval_ms</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>100000000</code></li></ul></div>
              <p className="title">The interval at which to try committing offsets for tasks</p>
              <div className="description"><p>The interval at which to try committing offsets for tasks (defaults to 60000).</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_connect_config_offset_flush_timeout_ms"><a href="#kafka_connect_config_offset_flush_timeout_ms"><strong>kafka_connect_config.offset_flush_timeout_ms</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>2147483647</code></li></ul></div>
              <p className="title">Offset flush timeout</p>
              <div className="description"><p>Maximum number of milliseconds to wait for records to flush and partition offset data to be committed to offset storage before cancelling the process and restoring the offset data to be committed in a future attempt (defaults to 5000).</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_connect_config_producer_batch_size"><a href="#kafka_connect_config_producer_batch_size"><strong>kafka_connect_config.producer_batch_size</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>5242880</code></li></ul></div>
              <p className="title">The batch size in bytes the producer will attempt to collect for the same partition before publishing to broker</p>
              <div className="description"><p>This setting gives the upper bound of the batch size to be sent. If there are fewer than this many bytes accumulated for this partition, the producer will 'linger' for the linger.ms time waiting for more records to show up. A batch size of zero will disable batching entirely (defaults to 16384).</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_connect_config_producer_buffer_memory"><a href="#kafka_connect_config_producer_buffer_memory"><strong>kafka_connect_config.producer_buffer_memory</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>5242880</code></li><li>max: <code>134217728</code></li></ul></div>
              <p className="title">The total bytes of memory the producer can use to buffer records waiting to be sent to the broker</p>
              <div className="description"><p>The total bytes of memory the producer can use to buffer records waiting to be sent to the broker (defaults to 33554432).</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_connect_config_producer_compression_type"><a href="#kafka_connect_config_producer_compression_type"><strong>kafka_connect_config.producer_compression_type</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">The default compression type for producers</p>
              <div className="description"><p>Specify the default compression type for producers. This configuration accepts the standard compression codecs ('gzip', 'snappy', 'lz4', 'zstd'). It additionally accepts 'none' which is the default and equivalent to no compression.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_connect_config_producer_linger_ms"><a href="#kafka_connect_config_producer_linger_ms"><strong>kafka_connect_config.producer_linger_ms</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>5000</code></li></ul></div>
              <p className="title">Wait for up to the given delay to allow batching records together</p>
              <div className="description"><p>This setting gives the upper bound on the delay for batching: once there is batch.size worth of records for a partition it will be sent immediately regardless of this setting, however if there are fewer than this many bytes accumulated for this partition the producer will 'linger' for the specified time waiting for more records to show up. Defaults to 0.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_connect_config_producer_max_request_size"><a href="#kafka_connect_config_producer_max_request_size"><strong>kafka_connect_config.producer_max_request_size</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>131072</code></li><li>max: <code>67108864</code></li></ul></div>
              <p className="title">The maximum size of a request in bytes</p>
              <div className="description"><p>This setting will limit the number of record batches the producer will send in a single request to avoid sending huge requests.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_connect_config_scheduled_rebalance_max_delay_ms"><a href="#kafka_connect_config_scheduled_rebalance_max_delay_ms"><strong>kafka_connect_config.scheduled_rebalance_max_delay_ms</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>600000</code></li></ul></div>
              <p className="title">The maximum delay of rebalancing connector workers</p>
              <div className="description"><p>The maximum delay that is scheduled in order to wait for the return of one or more departed workers before rebalancing and reassigning their connectors and tasks to the group. During this period the connectors and tasks of the departed workers remain unassigned. Defaults to 5 minutes.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_connect_config_session_timeout_ms"><a href="#kafka_connect_config_session_timeout_ms"><strong>kafka_connect_config.session_timeout_ms</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>2147483647</code></li></ul></div>
              <p className="title">The timeout used to detect failures when using Kafka’s group management facilities</p>
              <div className="description"><p>The timeout in milliseconds used to detect failures when using Kafka’s group management facilities (defaults to 10000).</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="kafka_connect_secret_providers"><a href="#kafka_connect_secret_providers"><strong>kafka_connect_secret_providers</strong></a></p><p><code className="type">array</code></p></div>
        <p className="title">Kafka Connect secret providers</p>
        <div className="description"><p>Configure external secret providers in order to reference external secrets in connector configuration. Currently Hashicorp Vault (provider: vault, auth_method: token) and AWS Secrets Manager (provider: aws, auth_method: credentials) are supported. Secrets can be referenced in connector config with $\{&lt;provider_name&gt;:&lt;secret_path&gt;:&lt;key_name&gt;\}</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="kafka_rest"><a href="#kafka_rest"><strong>kafka_rest</strong></a></p><p><code className="type">boolean</code></p></div>
        <p className="title">Enable Kafka-REST service</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="kafka_version"><a href="#kafka_version"><strong>kafka_version</strong></a></p><p><code className="type">string,null</code></p></div>
        <p className="title">Kafka major version</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="schema_registry"><a href="#schema_registry"><strong>schema_registry</strong></a></p><p><code className="type">boolean</code></p></div>
        <p className="title">Enable Schema-Registry service</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="kafka_rest_authorization"><a href="#kafka_rest_authorization"><strong>kafka_rest_authorization</strong></a></p><p><code className="type">boolean</code></p></div>
        <p className="title">Enable authorization in Kafka-REST service</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="kafka_rest_config"><a href="#kafka_rest_config"><strong>kafka_rest_config</strong></a></p><p><code className="type">object</code></p></div>
        <p className="title">Kafka REST configuration</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_rest_config_producer_acks"><a href="#kafka_rest_config_producer_acks"><strong>kafka_rest_config.producer_acks</strong></a></p><p><code className="type">string</code></p></div><div className="constraints"><ul><li>default: <code>1</code></li></ul></div>
              <p className="title">producer.acks</p>
              <div className="description"><p>The number of acknowledgments the producer requires the leader to have received before considering a request complete. If set to 'all' or '-1', the leader will wait for the full set of in-sync replicas to acknowledge the record.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_rest_config_producer_compression_type"><a href="#kafka_rest_config_producer_compression_type"><strong>kafka_rest_config.producer_compression_type</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">producer.compression.type</p>
              <div className="description"><p>Specify the default compression type for producers. This configuration accepts the standard compression codecs ('gzip', 'snappy', 'lz4', 'zstd'). It additionally accepts 'none' which is the default and equivalent to no compression.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_rest_config_producer_linger_ms"><a href="#kafka_rest_config_producer_linger_ms"><strong>kafka_rest_config.producer_linger_ms</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>5000</code></li></ul></div>
              <p className="title">producer.linger.ms</p>
              <div className="description"><p>Wait for up to the given delay to allow batching records together</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_rest_config_producer_max_request_size"><a href="#kafka_rest_config_producer_max_request_size"><strong>kafka_rest_config.producer_max_request_size</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>2147483647</code></li><li>default: <code>1048576</code></li></ul></div>
              <p className="title">producer.max.request.size</p>
              <div className="description"><p>The maximum size of a request in bytes. Note that Kafka broker can also cap the record batch size.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_rest_config_consumer_enable_auto_commit"><a href="#kafka_rest_config_consumer_enable_auto_commit"><strong>kafka_rest_config.consumer_enable_auto_commit</strong></a></p><p><code className="type">boolean</code></p></div><div className="constraints"><ul><li>default: <code>true</code></li></ul></div>
              <p className="title">consumer.enable.auto.commit</p>
              <div className="description"><p>If true the consumer's offset will be periodically committed to Kafka in the background</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_rest_config_consumer_request_max_bytes"><a href="#kafka_rest_config_consumer_request_max_bytes"><strong>kafka_rest_config.consumer_request_max_bytes</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>671088640</code></li><li>default: <code>67108864</code></li></ul></div>
              <p className="title">consumer.request.max.bytes</p>
              <div className="description"><p>Maximum number of bytes in unencoded message keys and values by a single request</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_rest_config_consumer_request_timeout_ms"><a href="#kafka_rest_config_consumer_request_timeout_ms"><strong>kafka_rest_config.consumer_request_timeout_ms</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1000</code></li><li>max: <code>30000</code></li><li>default: <code>1000</code></li></ul></div>
              <p className="title">consumer.request.timeout.ms</p>
              <div className="description"><p>The maximum total time to wait for messages for a request if the maximum number of messages has not yet been reached</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_rest_config_name_strategy"><a href="#kafka_rest_config_name_strategy"><strong>kafka_rest_config.name_strategy</strong></a></p><p><code className="type">string</code></p></div><div className="constraints"><ul><li>default: <code>topic_name</code></li></ul></div>
              <p className="title">name.strategy</p>
              <div className="description"><p>Name strategy to use when selecting subject for storing schemas</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_rest_config_name_strategy_validation"><a href="#kafka_rest_config_name_strategy_validation"><strong>kafka_rest_config.name_strategy_validation</strong></a></p><p><code className="type">boolean</code></p></div><div className="constraints"><ul><li>default: <code>true</code></li></ul></div>
              <p className="title">name.strategy.validation</p>
              <div className="description"><p>If true, validate that given schema is registered under expected subject name by the used name strategy when producing messages.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="kafka_rest_config_simpleconsumer_pool_size_max"><a href="#kafka_rest_config_simpleconsumer_pool_size_max"><strong>kafka_rest_config.simpleconsumer_pool_size_max</strong></a></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>10</code></li><li>max: <code>250</code></li><li>default: <code>25</code></li></ul></div>
              <p className="title">simpleconsumer.pool.size.max</p>
              <div className="description"><p>Maximum number of SimpleConsumers that can be instantiated per broker</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="tiered_storage"><a href="#tiered_storage"><strong>tiered_storage</strong></a></p><p><code className="type">object</code></p></div>
        <p className="title">Tiered storage configuration</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="tiered_storage_enabled"><a href="#tiered_storage_enabled"><strong>tiered_storage.enabled</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">Enabled</p>
              <div className="description"><p>Whether to enable the tiered storage functionality</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="schema_registry_config"><a href="#schema_registry_config"><strong>schema_registry_config</strong></a></p><p><code className="type">object</code></p></div>
        <p className="title">Schema Registry configuration</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name" id="schema_registry_config_topic_name"><a href="#schema_registry_config_topic_name"><strong>schema_registry_config.topic_name</strong></a></p><p><code className="type">string</code></p></div>
              <p className="title">topic_name</p>
              <div className="description"><p>The durable single partition topic that acts as the durable log for the data. This topic must be compacted to avoid losing data due to retention policy. Please note that changing this configuration in an existing Schema Registry / Karapace setup leads to previous schemas being inaccessible, data encoded with them potentially unreadable and schema ID sequence put out of order. It's only possible to do the switch while Schema Registry / Karapace is disabled. Defaults to `_schemas`.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="schema_registry_config_leader_eligibility"><a href="#schema_registry_config_leader_eligibility"><strong>schema_registry_config.leader_eligibility</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">leader_eligibility</p>
              <div className="description"><p>If true, Karapace / Schema Registry on the service nodes can participate in leader election. It might be needed to disable this when the schemas topic is replicated to a secondary cluster and Karapace / Schema Registry there must not participate in leader election. Defaults to `true`.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="schema_registry_config_schema_reader_strict_mode"><a href="#schema_registry_config_schema_reader_strict_mode"><strong>schema_registry_config.schema_reader_strict_mode</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">schema_reader_strict_mode</p>
              <div className="description"><p>If enabled, causes the Karapace schema-registry service to shutdown when there are invalid schema records in the `_schemas` topic. Defaults to `false`.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name" id="schema_registry_config_retriable_errors_silenced"><a href="#schema_registry_config_retriable_errors_silenced"><strong>schema_registry_config.retriable_errors_silenced</strong></a></p><p><code className="type">boolean</code></p></div>
              <p className="title">retriable_errors_silenced</p>
              <div className="description"><p>If enabled, kafka errors which can be retried or custom errors specified for the service will not be raised, instead, a warning log is emitted. This will denoise issue tracking systems, i.e. sentry. Defaults to `true`.</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name" id="aiven_kafka_topic_messages"><a href="#aiven_kafka_topic_messages"><strong>aiven_kafka_topic_messages</strong></a></p><p><code className="type">boolean</code></p></div>
        <p className="title">Allow access to read Kafka topic messages in the Aiven Console and REST API.</p>
        
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
    