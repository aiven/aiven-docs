
<!-- vale off -->
import Link from '@docusaurus/Link'

<table className="service-param">
  <tbody>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="compression_type" to="#compression_type">
                  <strong>compression_type</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="string">string</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>enum: <code>gzip,snappy,lz4,zstd,uncompressed,producer</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Specify the final compression type for a given topic. This configuration accepts the standard compression codecs (&#x27;gzip&#x27;, &#x27;snappy&#x27;, &#x27;lz4&#x27;, &#x27;zstd&#x27;). It additionally accepts &#x27;uncompressed&#x27; which is equivalent to no compression; and &#x27;producer&#x27; which means retain the original compression codec set by the producer.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="min_insync_replicas" to="#min_insync_replicas">
                  <strong>min_insync_replicas</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>1</code></li>
                  <li>max: <code>7</code></li>
              </ul>
            </div>

              <div className="description">
                <p>When a producer sets acks to &#x27;all&#x27; (or &#x27;-1&#x27;), this configuration specifies the minimum number of replicas that must acknowledge a write for the write to be considered successful. If this minimum cannot be met, then the producer will raise an exception (either NotEnoughReplicas or NotEnoughReplicasAfterAppend). When used together, min.insync.replicas and acks allow you to enforce greater durability guarantees. A typical scenario would be to create a topic with a replication factor of 3, set min.insync.replicas to 2, and produce with acks of &#x27;all&#x27;. This will ensure that the producer raises an exception if a majority of replicas do not receive a write.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="delete_retention_ms" to="#delete_retention_ms">
                  <strong>delete_retention_ms</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>0</code></li>
                  <li>max: <code>9223372036854775807</code></li>
              </ul>
            </div>

              <div className="description">
                <p>The amount of time to retain delete tombstone markers for log compacted topics. This setting also gives a bound on the time in which a consumer must complete a read if they begin from offset 0 to ensure that they get a valid snapshot of the final stage (otherwise delete tombstones may be collected before they complete their scan).</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="file_delete_delay_ms" to="#file_delete_delay_ms">
                  <strong>file_delete_delay_ms</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>0</code></li>
                  <li>max: <code>9223372036854775807</code></li>
              </ul>
            </div>

              <div className="description">
                <p>The time to wait before deleting a file from the filesystem.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="flush_messages" to="#flush_messages">
                  <strong>flush_messages</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>0</code></li>
                  <li>max: <code>9223372036854775807</code></li>
              </ul>
            </div>

              <div className="description">
                <p>This setting allows specifying an interval at which we will force an fsync of data written to the log. For example if this was set to 1 we would fsync after every message; if it were 5 we would fsync after every five messages. In general we recommend you not set this and use replication for durability and allow the operating system&#x27;s background flush capabilities as it is more efficient.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="flush_ms" to="#flush_ms">
                  <strong>flush_ms</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>0</code></li>
                  <li>max: <code>9223372036854775807</code></li>
              </ul>
            </div>

              <div className="description">
                <p>This setting allows specifying a time interval at which we will force an fsync of data written to the log. For example if this was set to 1000 we would fsync after 1000 ms had passed. In general we recommend you not set this and use replication for durability and allow the operating system&#x27;s background flush capabilities as it is more efficient.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="index_interval_bytes" to="#index_interval_bytes">
                  <strong>index_interval_bytes</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>0</code></li>
                  <li>max: <code>9223372036854775807</code></li>
              </ul>
            </div>

              <div className="description">
                <p>This setting controls how frequently Kafka adds an index entry to its offset index. The default setting ensures that we index a message roughly every 4096 bytes. More indexing allows reads to jump closer to the exact position in the log but makes the index larger. You probably don&#x27;t need to change this.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="local_retention_bytes" to="#local_retention_bytes">
                  <strong>local_retention_bytes</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>-2</code></li>
                  <li>max: <code>9223372036854775807</code></li>
              </ul>
            </div>

              <div className="description">
                <p>This configuration controls the maximum bytes tiered storage will retain segment files locally before it will discard old log segments to free up space. If set to -2, the limit is equal to overall retention time. If set to -1, no limit is applied but it&#x27;s possible only if overall retention is also -1.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="local_retention_ms" to="#local_retention_ms">
                  <strong>local_retention_ms</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>-2</code></li>
                  <li>max: <code>9223372036854775807</code></li>
              </ul>
            </div>

              <div className="description">
                <p>This configuration controls the maximum time tiered storage will retain segment files locally before it will discard old log segments to free up space. If set to -2, the time limit is equal to overall retention time. If set to -1, no time limit is applied but it&#x27;s possible only if overall retention is also -1.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="max_compaction_lag_ms" to="#max_compaction_lag_ms">
                  <strong>max_compaction_lag_ms</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>0</code></li>
                  <li>max: <code>9223372036854775807</code></li>
              </ul>
            </div>

              <div className="description">
                <p>The maximum time a message will remain ineligible for compaction in the log. Only applicable for logs that are being compacted.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="max_message_bytes" to="#max_message_bytes">
                  <strong>max_message_bytes</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>0</code></li>
                  <li>max: <code>9223372036854775807</code></li>
              </ul>
            </div>

              <div className="description">
                <p>The largest record batch size allowed by Kafka (after compression if compression is enabled). If this is increased and there are consumers older than 0.10.2, the consumers&#x27; fetch size must also be increased so that the they can fetch record batches this large. In the latest message format version, records are always grouped into batches for efficiency. In previous message format versions, uncompressed records are not grouped into batches and this limit only applies to a single record in that case.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="message_timestamp_after_max_ms" to="#message_timestamp_after_max_ms">
                  <strong>message_timestamp_after_max_ms</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>0</code></li>
                  <li>max: <code>9223372036854775807</code></li>
              </ul>
            </div>

              <div className="description">
                <p>The maximum difference allowed between the timestamp when a broker receives a message and the timestamp specified in the message. If message.timestamp.type&#x3D;CreateTime, a message will be rejected if the difference in timestamp exceeds this threshold. Applies only for messages with timestamps later than the broker&#x27;s timestamp. </p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="message_timestamp_before_max_ms" to="#message_timestamp_before_max_ms">
                  <strong>message_timestamp_before_max_ms</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>0</code></li>
                  <li>max: <code>9223372036854775807</code></li>
              </ul>
            </div>

              <div className="description">
                <p>The maximum difference allowed between the timestamp when a broker receives a message and the timestamp specified in the message. If message.timestamp.type&#x3D;CreateTime, a message will be rejected if the difference in timestamp exceeds this threshold. Applies only for messages with timestamps earlier than the broker&#x27;s timestamp. </p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="message_timestamp_type" to="#message_timestamp_type">
                  <strong>message_timestamp_type</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="string">string</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>enum: <code>CreateTime,LogAppendTime</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Define whether the timestamp in the message is message create time or log append time.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="min_compaction_lag_ms" to="#min_compaction_lag_ms">
                  <strong>min_compaction_lag_ms</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>0</code></li>
                  <li>max: <code>9223372036854775807</code></li>
              </ul>
            </div>

              <div className="description">
                <p>The minimum time a message will remain uncompacted in the log. Only applicable for logs that are being compacted.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="preallocate" to="#preallocate">
                  <strong>preallocate</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="boolean">boolean</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
              </ul>
            </div>

              <div className="description">
                <p>True if we should preallocate the file on disk when creating a new log segment.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="retention_bytes" to="#retention_bytes">
                  <strong>retention_bytes</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>-1</code></li>
                  <li>max: <code>9223372036854775807</code></li>
              </ul>
            </div>

              <div className="description">
                <p>This configuration controls the maximum size a partition (which consists of log segments) can grow to before we will discard old log segments to free up space if we are using the &#x27;delete&#x27; retention policy. By default there is no size limit only a time limit. Since this limit is enforced at the partition level, multiply it by the number of partitions to compute the topic retention in bytes.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="retention_ms" to="#retention_ms">
                  <strong>retention_ms</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>0</code></li>
                  <li>max: <code>259200000</code></li>
              </ul>
            </div>

              <div className="description">
                <p>This configuration controls the maximum time we will retain a log before we will discard old log segments to free up space if we are using the &#x27;delete&#x27; retention policy. This represents an SLA on how soon consumers must read their data. If set to -1, no time limit is applied.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="segment_bytes" to="#segment_bytes">
                  <strong>segment_bytes</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>14</code></li>
                  <li>max: <code>9223372036854775807</code></li>
              </ul>
            </div>

              <div className="description">
                <p>This configuration controls the segment file size for the log. Retention and cleaning is always done a file at a time so a larger segment size means fewer files but less granular control over retention. Setting this to a very low value has consequences, and the Aiven management plane ignores values less than 10 megabytes.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="segment_index_bytes" to="#segment_index_bytes">
                  <strong>segment_index_bytes</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>0</code></li>
                  <li>max: <code>9223372036854775807</code></li>
              </ul>
            </div>

              <div className="description">
                <p>This configuration controls the size of the index that maps offsets to file positions. We preallocate this index file and shrink it only after log rolls. You generally should not need to change this setting.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="segment_jitter_ms" to="#segment_jitter_ms">
                  <strong>segment_jitter_ms</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>0</code></li>
                  <li>max: <code>9223372036854775807</code></li>
              </ul>
            </div>

              <div className="description">
                <p>The maximum random jitter subtracted from the scheduled segment roll time to avoid thundering herds of segment rolling</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="segment_ms" to="#segment_ms">
                  <strong>segment_ms</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>1</code></li>
                  <li>max: <code>9223372036854775807</code></li>
              </ul>
            </div>

              <div className="description">
                <p>This configuration controls the period of time after which Kafka will force the log to roll even if the segment file isn&#x27;t full to ensure that retention can delete or compact old data. Setting this to a very low value has consequences, and the Aiven management plane ignores values less than 10 seconds.</p>
              </div>
        </td>
      </tr>
  </tbody>
</table>
