
<!-- vale off -->
<table class="service-param">
  <thead>
    <tr><th>Parameter</th></tr>
  </thead>
  <tbody>    <tr>
      <td>
        <div><p class="name"><p class="type"><strong>ip_filter</strong></p><code class="type">array</code></p><div class="constraints"><ul><li>default: <code>0.0.0.0/0</code></li></ul></div></div>
        <p class="title">IP filter</p>
        <div class="description"><p>Allow incoming connections from CIDR address block, e.g. '10.20.0.0/16'</p></div>
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div><p class="name"><p class="type"><strong>service_log</strong></p><code class="type">boolean,null</code></p></div>
        <p class="title">Service logging</p>
        <div class="description"><p>Store logs for the service so that they are available in the HTTP API and console.</p></div>
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div><p class="name"><p class="type"><strong>static_ips</strong></p><code class="type">boolean</code></p></div>
        <p class="title">Static IP addresses</p>
        <div class="description"><p>Use static public IP addresses</p></div>
        <table class="service-param-children">
          <tbody>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        <div><p class="name"><p class="type"><strong>kafka_mirrormaker</strong></p><code class="type">object</code></p></div>
        <p class="title">Kafka MirrorMaker configuration values</p>
        
        <table class="service-param-children">
          <tbody>
          <tr>
            <td>
              <div><p class="name"><p class="name"><strong>kafka_mirrormaker.refresh_topics_enabled</strong></p><code class="type">boolean</code></p></div>
              <p class="title">Refresh topics and partitions</p>
              <div class="description"><p>Whether to periodically check for new topics and partitions. Defaults to 'true'.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div><p class="name"><p class="name"><strong>kafka_mirrormaker.refresh_topics_interval_seconds</strong></p><code class="type">integer</code></p><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>9223372036854776000</code></li></ul></div></div>
              <p class="title">Frequency of topic and partitions refresh</p>
              <div class="description"><p>Frequency of topic and partitions refresh in seconds. Defaults to 600 seconds (10 minutes).</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div><p class="name"><p class="name"><strong>kafka_mirrormaker.refresh_groups_enabled</strong></p><code class="type">boolean</code></p></div>
              <p class="title">Refresh consumer groups</p>
              <div class="description"><p>Whether to periodically check for new consumer groups. Defaults to 'true'.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div><p class="name"><p class="name"><strong>kafka_mirrormaker.refresh_groups_interval_seconds</strong></p><code class="type">integer</code></p><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>9223372036854776000</code></li></ul></div></div>
              <p class="title">Frequency of group refresh</p>
              <div class="description"><p>Frequency of consumer group refresh in seconds. Defaults to 600 seconds (10 minutes).</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div><p class="name"><p class="name"><strong>kafka_mirrormaker.sync_group_offsets_enabled</strong></p><code class="type">boolean</code></p></div>
              <p class="title">Sync consumer group offsets</p>
              <div class="description"><p>Whether to periodically write the translated offsets of replicated consumer groups (in the source cluster) to __consumer_offsets topic in target cluster, as long as no active consumers in that group are connected to the target cluster</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div><p class="name"><p class="name"><strong>kafka_mirrormaker.sync_group_offsets_interval_seconds</strong></p><code class="type">integer</code></p><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>9223372036854776000</code></li></ul></div></div>
              <p class="title">Frequency of consumer group offset sync</p>
              <div class="description"><p>Frequency at which consumer group offsets are synced (default: 60, every minute)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div><p class="name"><p class="name"><strong>kafka_mirrormaker.emit_checkpoints_enabled</strong></p><code class="type">boolean</code></p></div>
              <p class="title">Emit consumer group offset checkpoints</p>
              <div class="description"><p>Whether to emit consumer group offset checkpoints to target cluster periodically (default: true)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div><p class="name"><p class="name"><strong>kafka_mirrormaker.emit_checkpoints_interval_seconds</strong></p><code class="type">integer</code></p><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>9223372036854776000</code></li></ul></div></div>
              <p class="title">Frequency of consumer group offset checkpoints</p>
              <div class="description"><p>Frequency at which consumer group offset checkpoints are emitted (default: 60, every minute)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div><p class="name"><p class="name"><strong>kafka_mirrormaker.sync_topic_configs_enabled</strong></p><code class="type">boolean</code></p></div>
              <p class="title">Sync remote topics</p>
              <div class="description"><p>Whether to periodically configure remote topics to match their corresponding upstream topics.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div><p class="name"><p class="name"><strong>kafka_mirrormaker.tasks_max_per_cpu</strong></p><code class="type">integer</code></p><div class="constraints"><ul><li>min: <code>1</code></li><li>max: <code>4</code></li><li>default: <code>1</code></li></ul></div></div>
              <p class="title">Maximum number of MirrorMaker tasks (of each type) per service CPU</p>
              <div class="description"><p>'tasks.max' is set to this multiplied by the number of CPUs in the service.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div><p class="name"><p class="name"><strong>kafka_mirrormaker.offset_lag_max</strong></p><code class="type">integer</code></p><div class="constraints"><ul><li>max: <code>9223372036854776000</code></li></ul></div></div>
              <p class="title">Maximum offset lag before it is resynced</p>
              <div class="description"><p>How out-of-sync a remote partition can be before it is resynced.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div><p class="name"><p class="name"><strong>kafka_mirrormaker.groups</strong></p><code class="type">string</code></p></div>
              <p class="title">Comma-separated list of consumer groups to replicate</p>
              <div class="description"><p>Consumer groups to replicate. Supports comma-separated group IDs and regexes.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div><p class="name"><p class="name"><strong>kafka_mirrormaker.groups_exclude</strong></p><code class="type">string</code></p></div>
              <p class="title">Comma-separated list of group IDs and regexes to exclude from replication</p>
              <div class="description"><p>Exclude groups. Supports comma-separated group IDs and regexes. Excludes take precedence over includes.</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
    