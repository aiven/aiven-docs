
<!-- vale off -->
<table class="service-param">
  <thead>
    <tr><th>Parameter</th></tr>
  </thead><tr>
  <td>
    <p class="name">
      <b>custom_domain</b>&nbsp;<code class="type">string,null</code>
    </p>
    <p class="title">Custom domain</p>
    <div class="description">Serve the web frontend using a custom CNAME pointing to the Aiven DNS name</div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>ip_filter</b>&nbsp;<code class="type">array</code>
    </p>
    <p class="title">IP filter</p>
    <div class="description">Allow incoming connections from CIDR address block, e.g. '10.20.0.0/16'</div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>service_log</b>&nbsp;<code class="type">boolean,null</code>
    </p>
    <p class="title">Service logging</p>
    <div class="description">Store logs for the service so that they are available in the HTTP API and console.</div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>static_ips</b>&nbsp;<code class="type">boolean</code>
    </p>
    <p class="title">Static IP addresses</p>
    <div class="description">Use static public IP addresses</div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>private_access</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">Allow access to selected service ports from private networks</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>kafka</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow clients to connect to kafka with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>kafka_connect</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow clients to connect to kafka_connect with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>kafka_rest</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow clients to connect to kafka_rest with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>prometheus</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow clients to connect to prometheus with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>schema_registry</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow clients to connect to schema_registry with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
          <div class="description"></div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>public_access</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">Allow access to selected service ports from the public Internet</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>kafka</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow clients to connect to kafka from the public internet for service nodes that are in a project VPC or another type of private network</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>kafka_connect</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow clients to connect to kafka_connect from the public internet for service nodes that are in a project VPC or another type of private network</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>kafka_rest</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow clients to connect to kafka_rest from the public internet for service nodes that are in a project VPC or another type of private network</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>prometheus</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow clients to connect to prometheus from the public internet for service nodes that are in a project VPC or another type of private network</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>schema_registry</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow clients to connect to schema_registry from the public internet for service nodes that are in a project VPC or another type of private network</p>
          <div class="description"></div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>privatelink_access</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">Allow access to selected service components through Privatelink</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>jolokia</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Enable jolokia</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>kafka</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Enable kafka</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>kafka_connect</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Enable kafka_connect</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>kafka_rest</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Enable kafka_rest</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>prometheus</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Enable prometheus</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>schema_registry</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Enable schema_registry</p>
          <div class="description"></div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>letsencrypt_sasl_privatelink</b>&nbsp;<code class="type">boolean,null</code>
    </p>
    <p class="title">Use Letsencrypt CA for Kafka SASL via Privatelink</p>
    <div class="description">Use Letsencrypt CA for Kafka SASL via Privatelink</div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>kafka</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">Kafka broker configuration values</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>compression_type</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">compression.type</p>
          <div class="description">Specify the final compression type for a given topic. This configuration accepts the standard compression codecs ('gzip', 'snappy', 'lz4', 'zstd'). It additionally accepts 'uncompressed' which is equivalent to no compression; and 'producer' which means retain the original compression codec set by the producer.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>group_initial_rebalance_delay_ms</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>300000</code>
            </div>
          </p>
          <p class="title">group.initial.rebalance.delay.ms</p>
          <div class="description">The amount of time, in milliseconds, the group coordinator will wait for more consumers to join a new group before performing the first rebalance. A longer delay means potentially fewer rebalances, but increases the time until processing begins. The default value for this is 3 seconds. During development and testing it might be desirable to set this to 0 in order to not delay test execution time.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>group_min_session_timeout_ms</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>60000</code>
            </div>
          </p>
          <p class="title">group.min.session.timeout.ms</p>
          <div class="description">The minimum allowed session timeout for registered consumers. Longer timeouts give consumers more time to process messages in between heartbeats at the cost of a longer time to detect failures.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>group_max_session_timeout_ms</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>1800000</code>
            </div>
          </p>
          <p class="title">group.max.session.timeout.ms</p>
          <div class="description">The maximum allowed session timeout for registered consumers. Longer timeouts give consumers more time to process messages in between heartbeats at the cost of a longer time to detect failures.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>connections_max_idle_ms</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1000</code>
                max: <code>3600000</code>
            </div>
          </p>
          <p class="title">connections.max.idle.ms</p>
          <div class="description">Idle connections timeout: the server socket processor threads close the connections that idle for longer than this.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>max_incremental_fetch_session_cache_slots</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1000</code>
                max: <code>10000</code>
            </div>
          </p>
          <p class="title">max.incremental.fetch.session.cache.slots</p>
          <div class="description">The maximum number of incremental fetch sessions that the broker will maintain.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>message_max_bytes</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>100001200</code>
            </div>
          </p>
          <p class="title">message.max.bytes</p>
          <div class="description">The maximum size of message that the server can receive.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>offsets_retention_minutes</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>2147483647</code>
            </div>
          </p>
          <p class="title">offsets.retention.minutes</p>
          <div class="description">Log retention window in minutes for offsets topic</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>log_cleaner_delete_retention_ms</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>315569260000</code>
            </div>
          </p>
          <p class="title">log.cleaner.delete.retention.ms</p>
          <div class="description">How long are delete records retained?</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>log_cleaner_min_cleanable_ratio</b>&nbsp;<code class="type">number</code>
            <div class="constraints">
                min: <code>0.2</code>
                max: <code>0.9</code>
            </div>
          </p>
          <p class="title">log.cleaner.min.cleanable.ratio</p>
          <div class="description">Controls log compactor frequency. Larger value means more frequent compactions but also more space wasted for logs. Consider setting log.cleaner.max.compaction.lag.ms to enforce compactions sooner, instead of setting a very high value for this option.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>log_cleaner_max_compaction_lag_ms</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>30000</code>
                max: <code>9223372036854776000</code>
            </div>
          </p>
          <p class="title">log.cleaner.max.compaction.lag.ms</p>
          <div class="description">The maximum amount of time message will remain uncompacted. Only applicable for logs that are being compacted</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>log_cleaner_min_compaction_lag_ms</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>9223372036854776000</code>
            </div>
          </p>
          <p class="title">log.cleaner.min.compaction.lag.ms</p>
          <div class="description">The minimum time a message will remain uncompacted in the log. Only applicable for logs that are being compacted.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>log_cleanup_policy</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">log.cleanup.policy</p>
          <div class="description">The default cleanup policy for segments beyond the retention window</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>log_flush_interval_messages</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>9223372036854776000</code>
            </div>
          </p>
          <p class="title">log.flush.interval.messages</p>
          <div class="description">The number of messages accumulated on a log partition before messages are flushed to disk</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>log_flush_interval_ms</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>9223372036854776000</code>
            </div>
          </p>
          <p class="title">log.flush.interval.ms</p>
          <div class="description">The maximum time in ms that a message in any topic is kept in memory before flushed to disk. If not set, the value in log.flush.scheduler.interval.ms is used</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>log_index_interval_bytes</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>104857600</code>
            </div>
          </p>
          <p class="title">log.index.interval.bytes</p>
          <div class="description">The interval with which Kafka adds an entry to the offset index</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>log_index_size_max_bytes</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1048576</code>
                max: <code>104857600</code>
            </div>
          </p>
          <p class="title">log.index.size.max.bytes</p>
          <div class="description">The maximum size in bytes of the offset index</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>log_local_retention_ms</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>-2</code>
                max: <code>9223372036854776000</code>
            </div>
          </p>
          <p class="title">log.local.retention.ms</p>
          <div class="description">The number of milliseconds to keep the local log segments before it gets eligible for deletion. If set to -2, the value of log.retention.ms is used. The effective value should always be less than or equal to log.retention.ms value.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>log_local_retention_bytes</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>-2</code>
                max: <code>9223372036854776000</code>
            </div>
          </p>
          <p class="title">log.local.retention.bytes</p>
          <div class="description">The maximum size of local log segments that can grow for a partition before it gets eligible for deletion. If set to -2, the value of log.retention.bytes is used. The effective value should always be less than or equal to log.retention.bytes value.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>log_message_downconversion_enable</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">log.message.downconversion.enable</p>
          <div class="description">This configuration controls whether down-conversion of message formats is enabled to satisfy consume requests. </div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>log_message_timestamp_type</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">log.message.timestamp.type</p>
          <div class="description">Define whether the timestamp in the message is message create time or log append time.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>log_message_timestamp_difference_max_ms</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>9223372036854776000</code>
            </div>
          </p>
          <p class="title">log.message.timestamp.difference.max.ms</p>
          <div class="description">The maximum difference allowed between the timestamp when a broker receives a message and the timestamp specified in the message</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>log_preallocate</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">log.preallocate</p>
          <div class="description">Should pre allocate file when create new segment?</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>log_retention_bytes</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>-1</code>
                max: <code>9223372036854776000</code>
            </div>
          </p>
          <p class="title">log.retention.bytes</p>
          <div class="description">The maximum size of the log before deleting messages</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>log_retention_hours</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>-1</code>
                max: <code>2147483647</code>
            </div>
          </p>
          <p class="title">log.retention.hours</p>
          <div class="description">The number of hours to keep a log file before deleting it</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>log_retention_ms</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>-1</code>
                max: <code>9223372036854776000</code>
            </div>
          </p>
          <p class="title">log.retention.ms</p>
          <div class="description">The number of milliseconds to keep a log file before deleting it (in milliseconds), If not set, the value in log.retention.minutes is used. If set to -1, no time limit is applied.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>log_roll_jitter_ms</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>9223372036854776000</code>
            </div>
          </p>
          <p class="title">log.roll.jitter.ms</p>
          <div class="description">The maximum jitter to subtract from logRollTimeMillis (in milliseconds). If not set, the value in log.roll.jitter.hours is used</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>log_roll_ms</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>9223372036854776000</code>
            </div>
          </p>
          <p class="title">log.roll.ms</p>
          <div class="description">The maximum time before a new log segment is rolled out (in milliseconds).</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>log_segment_bytes</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>10485760</code>
                max: <code>1073741824</code>
            </div>
          </p>
          <p class="title">log.segment.bytes</p>
          <div class="description">The maximum size of a single log file</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>log_segment_delete_delay_ms</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>3600000</code>
            </div>
          </p>
          <p class="title">log.segment.delete.delay.ms</p>
          <div class="description">The amount of time to wait before deleting a file from the filesystem</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>auto_create_topics_enable</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">auto.create.topics.enable</p>
          <div class="description">Enable auto creation of topics</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>min_insync_replicas</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>7</code>
            </div>
          </p>
          <p class="title">min.insync.replicas</p>
          <div class="description">When a producer sets acks to 'all' (or '-1'), min.insync.replicas specifies the minimum number of replicas that must acknowledge a write for the write to be considered successful.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>num_partitions</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>1000</code>
            </div>
          </p>
          <p class="title">num.partitions</p>
          <div class="description">Number of partitions for autocreated topics</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>default_replication_factor</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>10</code>
            </div>
          </p>
          <p class="title">default.replication.factor</p>
          <div class="description">Replication factor for autocreated topics</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>replica_fetch_max_bytes</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1048576</code>
                max: <code>104857600</code>
            </div>
          </p>
          <p class="title">replica.fetch.max.bytes</p>
          <div class="description">The number of bytes of messages to attempt to fetch for each partition (defaults to 1048576). This is not an absolute maximum, if the first record batch in the first non-empty partition of the fetch is larger than this value, the record batch will still be returned to ensure that progress can be made.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>replica_fetch_response_max_bytes</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>10485760</code>
                max: <code>1048576000</code>
            </div>
          </p>
          <p class="title">replica.fetch.response.max.bytes</p>
          <div class="description">Maximum bytes expected for the entire fetch response (defaults to 10485760). Records are fetched in batches, and if the first record batch in the first non-empty partition of the fetch is larger than this value, the record batch will still be returned to ensure that progress can be made. As such, this is not an absolute maximum.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>max_connections_per_ip</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>256</code>
                max: <code>2147483647</code>
            </div>
          </p>
          <p class="title">max.connections.per.ip</p>
          <div class="description">The maximum number of connections allowed from each ip address (defaults to 2147483647).</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>producer_purgatory_purge_interval_requests</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>10</code>
                max: <code>10000</code>
            </div>
          </p>
          <p class="title">producer.purgatory.purge.interval.requests</p>
          <div class="description">The purge interval (in number of requests) of the producer request purgatory(defaults to 1000).</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>sasl_oauthbearer_expected_audience</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">sasl.oauthbearer.expected.audience</p>
          <div class="description">The (optional) comma-delimited setting for the broker to use to verify that the JWT was issued for one of the expected audiences.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>sasl_oauthbearer_expected_issuer</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">sasl.oauthbearer.expected.issuer</p>
          <div class="description">Optional setting for the broker to use to verify that the JWT was created by the expected issuer.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>sasl_oauthbearer_jwks_endpoint_url</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">sasl.oauthbearer.jwks.endpoint.url</p>
          <div class="description">OIDC JWKS endpoint URL. By setting this the SASL SSL OAuth2/OIDC authentication is enabled. See also other options for SASL OAuth2/OIDC. </div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>sasl_oauthbearer_sub_claim_name</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">sasl.oauthbearer.sub.claim.name</p>
          <div class="description">Name of the scope from which to extract the subject claim from the JWT. Defaults to sub.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>socket_request_max_bytes</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>10485760</code>
                max: <code>209715200</code>
            </div>
          </p>
          <p class="title">socket.request.max.bytes</p>
          <div class="description">The maximum number of bytes in a socket request (defaults to 104857600).</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>transaction_state_log_segment_bytes</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1048576</code>
                max: <code>2147483647</code>
            </div>
          </p>
          <p class="title">transaction.state.log.segment.bytes</p>
          <div class="description">The transaction topic segment bytes should be kept relatively small in order to facilitate faster log compaction and cache loads (defaults to 104857600 (100 mebibytes)).</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>transaction_remove_expired_transaction_cleanup_interval_ms</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>600000</code>
                max: <code>3600000</code>
            </div>
          </p>
          <p class="title">transaction.remove.expired.transaction.cleanup.interval.ms</p>
          <div class="description">The interval at which to remove transactions that have expired due to transactional.id.expiration.ms passing (defaults to 3600000 (1 hour)).</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>transaction_partition_verification_enable</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">transaction.partition.verification.enable</p>
          <div class="description">Enable verification that checks that the partition has been added to the transaction before writing transactional records to the partition</div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>kafka_authentication_methods</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">Kafka authentication methods</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>certificate</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Enable certificate/SSL authentication</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>sasl</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Enable SASL authentication</p>
          <div class="description"></div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>kafka_connect</b>&nbsp;<code class="type">boolean</code>
    </p>
    <p class="title">Enable Kafka Connect service</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>kafka_connect_config</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">Kafka Connect configuration values</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>connector_client_config_override_policy</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Client config override policy</p>
          <div class="description">Defines what client configurations can be overridden by the connector. Default is None</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>consumer_auto_offset_reset</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Consumer auto offset reset</p>
          <div class="description">What to do when there is no initial offset in Kafka or if the current offset does not exist any more on the server. Default is earliest</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>consumer_fetch_max_bytes</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1048576</code>
                max: <code>104857600</code>
            </div>
          </p>
          <p class="title">The maximum amount of data the server should return for a fetch request</p>
          <div class="description">Records are fetched in batches by the consumer, and if the first record batch in the first non-empty partition of the fetch is larger than this value, the record batch will still be returned to ensure that the consumer can make progress. As such, this is not a absolute maximum.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>consumer_isolation_level</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Consumer isolation level</p>
          <div class="description">Transaction read isolation level. read_uncommitted is the default, but read_committed can be used if consume-exactly-once behavior is desired.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>consumer_max_partition_fetch_bytes</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1048576</code>
                max: <code>104857600</code>
            </div>
          </p>
          <p class="title">The maximum amount of data per-partition the server will return.</p>
          <div class="description">Records are fetched in batches by the consumer.If the first record batch in the first non-empty partition of the fetch is larger than this limit, the batch will still be returned to ensure that the consumer can make progress. </div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>consumer_max_poll_interval_ms</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>2147483647</code>
            </div>
          </p>
          <p class="title">The maximum delay between polls when using consumer group management</p>
          <div class="description">The maximum delay in milliseconds between invocations of poll() when using consumer group management (defaults to 300000).</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>consumer_max_poll_records</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>10000</code>
            </div>
          </p>
          <p class="title">The maximum number of records returned by a single poll</p>
          <div class="description">The maximum number of records returned in a single call to poll() (defaults to 500).</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>offset_flush_interval_ms</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>100000000</code>
            </div>
          </p>
          <p class="title">The interval at which to try committing offsets for tasks</p>
          <div class="description">The interval at which to try committing offsets for tasks (defaults to 60000).</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>offset_flush_timeout_ms</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>2147483647</code>
            </div>
          </p>
          <p class="title">Offset flush timeout</p>
          <div class="description">Maximum number of milliseconds to wait for records to flush and partition offset data to be committed to offset storage before cancelling the process and restoring the offset data to be committed in a future attempt (defaults to 5000).</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>producer_batch_size</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>5242880</code>
            </div>
          </p>
          <p class="title">The batch size in bytes the producer will attempt to collect for the same partition before publishing to broker</p>
          <div class="description">This setting gives the upper bound of the batch size to be sent. If there are fewer than this many bytes accumulated for this partition, the producer will 'linger' for the linger.ms time waiting for more records to show up. A batch size of zero will disable batching entirely (defaults to 16384).</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>producer_buffer_memory</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>5242880</code>
                max: <code>134217728</code>
            </div>
          </p>
          <p class="title">The total bytes of memory the producer can use to buffer records waiting to be sent to the broker</p>
          <div class="description">The total bytes of memory the producer can use to buffer records waiting to be sent to the broker (defaults to 33554432).</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>producer_compression_type</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">The default compression type for producers</p>
          <div class="description">Specify the default compression type for producers. This configuration accepts the standard compression codecs ('gzip', 'snappy', 'lz4', 'zstd'). It additionally accepts 'none' which is the default and equivalent to no compression.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>producer_linger_ms</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>5000</code>
            </div>
          </p>
          <p class="title">Wait for up to the given delay to allow batching records together</p>
          <div class="description">This setting gives the upper bound on the delay for batching: once there is batch.size worth of records for a partition it will be sent immediately regardless of this setting, however if there are fewer than this many bytes accumulated for this partition the producer will 'linger' for the specified time waiting for more records to show up. Defaults to 0.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>producer_max_request_size</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>131072</code>
                max: <code>67108864</code>
            </div>
          </p>
          <p class="title">The maximum size of a request in bytes</p>
          <div class="description">This setting will limit the number of record batches the producer will send in a single request to avoid sending huge requests.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>scheduled_rebalance_max_delay_ms</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>600000</code>
            </div>
          </p>
          <p class="title">The maximum delay of rebalancing connector workers</p>
          <div class="description">The maximum delay that is scheduled in order to wait for the return of one or more departed workers before rebalancing and reassigning their connectors and tasks to the group. During this period the connectors and tasks of the departed workers remain unassigned. Defaults to 5 minutes.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>session_timeout_ms</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>2147483647</code>
            </div>
          </p>
          <p class="title">The timeout used to detect failures when using Kafka’s group management facilities</p>
          <div class="description">The timeout in milliseconds used to detect failures when using Kafka’s group management facilities (defaults to 10000).</div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>kafka_connect_secret_providers</b>&nbsp;<code class="type">array</code>
    </p>
    <p class="title">Kafka Connect secret providers</p>
    <div class="description">Configure external secret providers in order to reference external secrets in connector configuration. Currently Hashicorp Vault (provider: vault, auth_method: token) and AWS Secrets Manager (provider: aws, auth_method: credentials) are supported. Secrets can be referenced in connector config with $\{&lt;provider_name&gt;:&lt;secret_path&gt;:&lt;key_name&gt;\}</div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>kafka_rest</b>&nbsp;<code class="type">boolean</code>
    </p>
    <p class="title">Enable Kafka-REST service</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>kafka_version</b>&nbsp;<code class="type">string,null</code>
    </p>
    <p class="title">Kafka major version</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>schema_registry</b>&nbsp;<code class="type">boolean</code>
    </p>
    <p class="title">Enable Schema-Registry service</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>kafka_rest_authorization</b>&nbsp;<code class="type">boolean</code>
    </p>
    <p class="title">Enable authorization in Kafka-REST service</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>kafka_rest_config</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">Kafka REST configuration</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>producer_acks</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">producer.acks</p>
          <div class="description">The number of acknowledgments the producer requires the leader to have received before considering a request complete. If set to 'all' or '-1', the leader will wait for the full set of in-sync replicas to acknowledge the record.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>producer_compression_type</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">producer.compression.type</p>
          <div class="description">Specify the default compression type for producers. This configuration accepts the standard compression codecs ('gzip', 'snappy', 'lz4', 'zstd'). It additionally accepts 'none' which is the default and equivalent to no compression.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>producer_linger_ms</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>5000</code>
            </div>
          </p>
          <p class="title">producer.linger.ms</p>
          <div class="description">Wait for up to the given delay to allow batching records together</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>producer_max_request_size</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>2147483647</code>
            </div>
          </p>
          <p class="title">producer.max.request.size</p>
          <div class="description">The maximum size of a request in bytes. Note that Kafka broker can also cap the record batch size.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>consumer_enable_auto_commit</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">consumer.enable.auto.commit</p>
          <div class="description">If true the consumer's offset will be periodically committed to Kafka in the background</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>consumer_request_max_bytes</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>671088640</code>
            </div>
          </p>
          <p class="title">consumer.request.max.bytes</p>
          <div class="description">Maximum number of bytes in unencoded message keys and values by a single request</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>consumer_request_timeout_ms</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1000</code>
                max: <code>30000</code>
            </div>
          </p>
          <p class="title">consumer.request.timeout.ms</p>
          <div class="description">The maximum total time to wait for messages for a request if the maximum number of messages has not yet been reached</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>name_strategy</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">name.strategy</p>
          <div class="description">Name strategy to use when selecting subject for storing schemas</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>name_strategy_validation</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">name.strategy.validation</p>
          <div class="description">If true, validate that given schema is registered under expected subject name by the used name strategy when producing messages.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>simpleconsumer_pool_size_max</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>10</code>
                max: <code>250</code>
            </div>
          </p>
          <p class="title">simpleconsumer.pool.size.max</p>
          <div class="description">Maximum number of SimpleConsumers that can be instantiated per broker</div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>tiered_storage</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">Tiered storage configuration</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>enabled</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Enabled</p>
          <div class="description">Whether to enable the tiered storage functionality</div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>schema_registry_config</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">Schema Registry configuration</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>topic_name</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">topic_name</p>
          <div class="description">The durable single partition topic that acts as the durable log for the data. This topic must be compacted to avoid losing data due to retention policy. Please note that changing this configuration in an existing Schema Registry / Karapace setup leads to previous schemas being inaccessible, data encoded with them potentially unreadable and schema ID sequence put out of order. It's only possible to do the switch while Schema Registry / Karapace is disabled. Defaults to `_schemas`.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>leader_eligibility</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">leader_eligibility</p>
          <div class="description">If true, Karapace / Schema Registry on the service nodes can participate in leader election. It might be needed to disable this when the schemas topic is replicated to a secondary cluster and Karapace / Schema Registry there must not participate in leader election. Defaults to `true`.</div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>aiven_kafka_topic_messages</b>&nbsp;<code class="type">boolean</code>
    </p>
    <p class="title">Allow access to read Kafka topic messages in the Aiven Console and REST API.</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
</table>
