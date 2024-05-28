
<!-- vale off -->
<table class="service-param">
  <thead>
    <tr><th>Parameter</th></tr>
  </thead><tr>
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
      <b>kafka_connect</b>&nbsp;<code class="type">object</code>
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
      <b>private_access</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">Allow access to selected service ports from private networks</p>
    <div class="description"></div>
    <table class="service-param-children">
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
            <b>prometheus</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow clients to connect to prometheus with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
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
            <b>kafka_connect</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Enable kafka_connect</p>
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
            <b>kafka_connect</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow clients to connect to kafka_connect from the public internet for service nodes that are in a project VPC or another type of private network</p>
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
</table>
  </td>
</tr>
</table>
    