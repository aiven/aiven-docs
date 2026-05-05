
<!-- vale off -->
import Link from '@docusaurus/Link'

<table className="service-param">
  <tbody>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="cleanup_policy" to="#cleanup_policy">
                  <strong>cleanup_policy</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="string">string</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>enum: <code>compact,delete</code></li>
              </ul>
            </div>

              <div className="description">
                <p>The retention policy to use on old segments. Possible values include &#x27;delete&#x27;, &#x27;compact&#x27;, or a comma-separated list of them. The default policy (&#x27;delete&#x27;) will discard old segments when their retention time or size limit has been reached. The &#x27;compact&#x27; setting will enable log compaction on the topic.</p>
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
                  <li>min: <code>60000</code></li>
                  <li>max: <code>604800000</code></li>
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
                  <li>max: <code>20971520</code></li>
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
                  <li>min: <code>0</code></li>
                  <li>max: <code>2</code></li>
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
                <Link id="unclean_leader_election_enable" to="#unclean_leader_election_enable">
                  <strong>unclean_leader_election_enable</strong>
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
                <p>Indicates whether to enable replicas not in the ISR set to be elected as leader as a last resort, even though doing so may result in data loss.</p>
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
                  <li>range: <code>-1</code> or between <code>60000</code> and <code>9223372036854775807</code></li>
                  <li>min: <code>-1</code></li>
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
                <Link id="diskless_enable" to="#diskless_enable">
                  <strong>diskless_enable</strong>
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
                <p>Indicates whether diskless should be enabled. This is only available for BYOC services with Diskless feature enabled.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="remote_storage_enable" to="#remote_storage_enable">
                  <strong>remote_storage_enable</strong>
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
                <p>Indicates whether tiered storage should be enabled. This is only available for services with Tiered Storage feature enabled.</p>
              </div>
        </td>
      </tr>
  </tbody>
</table>
