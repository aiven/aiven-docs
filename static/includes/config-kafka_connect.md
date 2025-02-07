
<!-- vale off -->
import Link from '@docusaurus/Link'

<table className="service-param">
  <thead>
    <tr><th>Parameter</th></tr>
  </thead>
  <tbody>    <tr>
      <td>
        <div className="param"><p className="name"><Link id="ip_filter"/><Link to="#ip_filter"><strong>ip_filter</strong></Link></p><p><code className="type">array</code></p></div><div className="constraints"><ul><li>default: <code>0.0.0.0/0</code></li></ul></div>
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
        <div className="param"><p className="name"><Link id="service_log"/><Link to="#service_log"><strong>service_log</strong></Link></p><p><code className="type">boolean,null</code></p></div>
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
        <div className="param"><p className="name"><Link id="static_ips"/><Link to="#static_ips"><strong>static_ips</strong></Link></p><p><code className="type">boolean</code></p></div>
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
        <div className="param"><p className="name"><Link id="kafka_connect"/><Link to="#kafka_connect"><strong>kafka_connect</strong></Link></p><p><code className="type">object</code></p></div>
        <p className="title">Kafka Connect configuration values</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="kafka_connect_connector_client_config_override_policy"/><Link to="#kafka_connect_connector_client_config_override_policy"><strong>kafka_connect.connector_client_config_override_policy</strong></Link></p><p><code className="type">string</code></p></div>
              <p className="title">Client config override policy</p>
              <div className="description"><p>Defines what client configurations can be overridden by the connector. Default is None</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="kafka_connect_consumer_auto_offset_reset"/><Link to="#kafka_connect_consumer_auto_offset_reset"><strong>kafka_connect.consumer_auto_offset_reset</strong></Link></p><p><code className="type">string</code></p></div>
              <p className="title">Consumer auto offset reset</p>
              <div className="description"><p>What to do when there is no initial offset in Kafka or if the current offset does not exist any more on the server. Default is earliest</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="kafka_connect_consumer_fetch_max_bytes"/><Link to="#kafka_connect_consumer_fetch_max_bytes"><strong>kafka_connect.consumer_fetch_max_bytes</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1048576</code></li><li>max: <code>104857600</code></li></ul></div>
              <p className="title">The maximum amount of data the server should return for a fetch request</p>
              <div className="description"><p>Records are fetched in batches by the consumer, and if the first record batch in the first non-empty partition of the fetch is larger than this value, the record batch will still be returned to ensure that the consumer can make progress. As such, this is not a absolute maximum.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="kafka_connect_consumer_isolation_level"/><Link to="#kafka_connect_consumer_isolation_level"><strong>kafka_connect.consumer_isolation_level</strong></Link></p><p><code className="type">string</code></p></div>
              <p className="title">Consumer isolation level</p>
              <div className="description"><p>Transaction read isolation level. read_uncommitted is the default, but read_committed can be used if consume-exactly-once behavior is desired.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="kafka_connect_consumer_max_partition_fetch_bytes"/><Link to="#kafka_connect_consumer_max_partition_fetch_bytes"><strong>kafka_connect.consumer_max_partition_fetch_bytes</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1048576</code></li><li>max: <code>104857600</code></li></ul></div>
              <p className="title">The maximum amount of data per-partition the server will return.</p>
              <div className="description"><p>Records are fetched in batches by the consumer.If the first record batch in the first non-empty partition of the fetch is larger than this limit, the batch will still be returned to ensure that the consumer can make progress. </p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="kafka_connect_consumer_max_poll_interval_ms"/><Link to="#kafka_connect_consumer_max_poll_interval_ms"><strong>kafka_connect.consumer_max_poll_interval_ms</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>2147483647</code></li></ul></div>
              <p className="title">The maximum delay between polls when using consumer group management</p>
              <div className="description"><p>The maximum delay in milliseconds between invocations of poll() when using consumer group management (defaults to 300000).</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="kafka_connect_consumer_max_poll_records"/><Link to="#kafka_connect_consumer_max_poll_records"><strong>kafka_connect.consumer_max_poll_records</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>10000</code></li></ul></div>
              <p className="title">The maximum number of records returned by a single poll</p>
              <div className="description"><p>The maximum number of records returned in a single call to poll() (defaults to 500).</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="kafka_connect_offset_flush_interval_ms"/><Link to="#kafka_connect_offset_flush_interval_ms"><strong>kafka_connect.offset_flush_interval_ms</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>100000000</code></li></ul></div>
              <p className="title">The interval at which to try committing offsets for tasks</p>
              <div className="description"><p>The interval at which to try committing offsets for tasks (defaults to 60000).</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="kafka_connect_offset_flush_timeout_ms"/><Link to="#kafka_connect_offset_flush_timeout_ms"><strong>kafka_connect.offset_flush_timeout_ms</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>2147483647</code></li></ul></div>
              <p className="title">Offset flush timeout</p>
              <div className="description"><p>Maximum number of milliseconds to wait for records to flush and partition offset data to be committed to offset storage before cancelling the process and restoring the offset data to be committed in a future attempt (defaults to 5000).</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="kafka_connect_producer_batch_size"/><Link to="#kafka_connect_producer_batch_size"><strong>kafka_connect.producer_batch_size</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>5242880</code></li></ul></div>
              <p className="title">The batch size in bytes the producer will attempt to collect for the same partition before publishing to broker</p>
              <div className="description"><p>This setting gives the upper bound of the batch size to be sent. If there are fewer than this many bytes accumulated for this partition, the producer will 'linger' for the linger.ms time waiting for more records to show up. A batch size of zero will disable batching entirely (defaults to 16384).</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="kafka_connect_producer_buffer_memory"/><Link to="#kafka_connect_producer_buffer_memory"><strong>kafka_connect.producer_buffer_memory</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>5242880</code></li><li>max: <code>134217728</code></li></ul></div>
              <p className="title">The total bytes of memory the producer can use to buffer records waiting to be sent to the broker</p>
              <div className="description"><p>The total bytes of memory the producer can use to buffer records waiting to be sent to the broker (defaults to 33554432).</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="kafka_connect_producer_compression_type"/><Link to="#kafka_connect_producer_compression_type"><strong>kafka_connect.producer_compression_type</strong></Link></p><p><code className="type">string</code></p></div>
              <p className="title">The default compression type for producers</p>
              <div className="description"><p>Specify the default compression type for producers. This configuration accepts the standard compression codecs ('gzip', 'snappy', 'lz4', 'zstd'). It additionally accepts 'none' which is the default and equivalent to no compression.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="kafka_connect_producer_linger_ms"/><Link to="#kafka_connect_producer_linger_ms"><strong>kafka_connect.producer_linger_ms</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>5000</code></li></ul></div>
              <p className="title">Wait for up to the given delay to allow batching records together</p>
              <div className="description"><p>This setting gives the upper bound on the delay for batching: once there is batch.size worth of records for a partition it will be sent immediately regardless of this setting, however if there are fewer than this many bytes accumulated for this partition the producer will 'linger' for the specified time waiting for more records to show up. Defaults to 0.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="kafka_connect_producer_max_request_size"/><Link to="#kafka_connect_producer_max_request_size"><strong>kafka_connect.producer_max_request_size</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>131072</code></li><li>max: <code>67108864</code></li></ul></div>
              <p className="title">The maximum size of a request in bytes</p>
              <div className="description"><p>This setting will limit the number of record batches the producer will send in a single request to avoid sending huge requests.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="kafka_connect_scheduled_rebalance_max_delay_ms"/><Link to="#kafka_connect_scheduled_rebalance_max_delay_ms"><strong>kafka_connect.scheduled_rebalance_max_delay_ms</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>600000</code></li></ul></div>
              <p className="title">The maximum delay of rebalancing connector workers</p>
              <div className="description"><p>The maximum delay that is scheduled in order to wait for the return of one or more departed workers before rebalancing and reassigning their connectors and tasks to the group. During this period the connectors and tasks of the departed workers remain unassigned. Defaults to 5 minutes.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="kafka_connect_session_timeout_ms"/><Link to="#kafka_connect_session_timeout_ms"><strong>kafka_connect.session_timeout_ms</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>2147483647</code></li></ul></div>
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
        <div className="param"><p className="name"><Link id="secret_providers"/><Link to="#secret_providers"><strong>secret_providers</strong></Link></p><p><code className="type">array</code></p></div>
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
        <div className="param"><p className="name"><Link id="plugin_versions"/><Link to="#plugin_versions"><strong>plugin_versions</strong></Link></p><p><code className="type">array</code></p></div>
        <p className="title">Kafka Connect plugins</p>
        <div className="description"><p>The plugin selected by the user</p></div>
        <table className="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="private_access"/><Link to="#private_access"><strong>private_access</strong></Link></p><p><code className="type">object</code></p></div>
        <p className="title">Allow access to selected service ports from private networks</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="private_access_kafka_connect"/><Link to="#private_access_kafka_connect"><strong>private_access.kafka_connect</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to kafka_connect with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="private_access_prometheus"/><Link to="#private_access_prometheus"><strong>private_access.prometheus</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to prometheus with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="privatelink_access"/><Link to="#privatelink_access"><strong>privatelink_access</strong></Link></p><p><code className="type">object</code></p></div>
        <p className="title">Allow access to selected service components through Privatelink</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="privatelink_access_jolokia"/><Link to="#privatelink_access_jolokia"><strong>privatelink_access.jolokia</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Enable jolokia</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="privatelink_access_kafka_connect"/><Link to="#privatelink_access_kafka_connect"><strong>privatelink_access.kafka_connect</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Enable kafka_connect</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="privatelink_access_prometheus"/><Link to="#privatelink_access_prometheus"><strong>privatelink_access.prometheus</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Enable prometheus</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div className="param"><p className="name"><Link id="public_access"/><Link to="#public_access"><strong>public_access</strong></Link></p><p><code className="type">object</code></p></div>
        <p className="title">Allow access to selected service ports from the public Internet</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="public_access_kafka_connect"/><Link to="#public_access_kafka_connect"><strong>public_access.kafka_connect</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to kafka_connect from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="public_access_prometheus"/><Link to="#public_access_prometheus"><strong>public_access.prometheus</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Allow clients to connect to prometheus from the public internet for service nodes that are in a project VPC or another type of private network</p>
              
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
    