
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
        <div className="param"><p className="name"><Link id="kafka_mirrormaker"/><Link to="#kafka_mirrormaker"><strong>kafka_mirrormaker</strong></Link></p><p><code className="type">object</code></p></div>
        <p className="title">Kafka MirrorMaker configuration values</p>
        
        <table className="service-param-children">
          <tbody>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="kafka_mirrormaker_admin_timeout_ms"/><Link to="#kafka_mirrormaker_admin_timeout_ms"><strong>kafka_mirrormaker.admin_timeout_ms</strong></Link></p><p><code className="type">integer,null</code></p></div><div className="constraints"><ul><li>min: <code>30000</code></li><li>max: <code>1800000</code></li></ul></div>
              
              <div className="description"><p>Timeout for administrative tasks, e.g. detecting new topics, loading of consumer group and offsets. Defaults to 60000 milliseconds (1 minute).</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="kafka_mirrormaker_refresh_topics_enabled"/><Link to="#kafka_mirrormaker_refresh_topics_enabled"><strong>kafka_mirrormaker.refresh_topics_enabled</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Refresh topics and partitions</p>
              <div className="description"><p>Whether to periodically check for new topics and partitions. Defaults to 'true'.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="kafka_mirrormaker_refresh_topics_interval_seconds"/><Link to="#kafka_mirrormaker_refresh_topics_interval_seconds"><strong>kafka_mirrormaker.refresh_topics_interval_seconds</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>9223372036854776000</code></li></ul></div>
              <p className="title">Frequency of topic and partitions refresh</p>
              <div className="description"><p>Frequency of topic and partitions refresh in seconds. Defaults to 600 seconds (10 minutes).</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="kafka_mirrormaker_refresh_groups_enabled"/><Link to="#kafka_mirrormaker_refresh_groups_enabled"><strong>kafka_mirrormaker.refresh_groups_enabled</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Refresh consumer groups</p>
              <div className="description"><p>Whether to periodically check for new consumer groups. Defaults to 'true'.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="kafka_mirrormaker_refresh_groups_interval_seconds"/><Link to="#kafka_mirrormaker_refresh_groups_interval_seconds"><strong>kafka_mirrormaker.refresh_groups_interval_seconds</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>9223372036854776000</code></li></ul></div>
              <p className="title">Frequency of group refresh</p>
              <div className="description"><p>Frequency of consumer group refresh in seconds. Defaults to 600 seconds (10 minutes).</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="kafka_mirrormaker_sync_group_offsets_enabled"/><Link to="#kafka_mirrormaker_sync_group_offsets_enabled"><strong>kafka_mirrormaker.sync_group_offsets_enabled</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Sync consumer group offsets</p>
              <div className="description"><p>Whether to periodically write the translated offsets of replicated consumer groups (in the source cluster) to __consumer_offsets topic in target cluster, as long as no active consumers in that group are connected to the target cluster</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="kafka_mirrormaker_sync_group_offsets_interval_seconds"/><Link to="#kafka_mirrormaker_sync_group_offsets_interval_seconds"><strong>kafka_mirrormaker.sync_group_offsets_interval_seconds</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>9223372036854776000</code></li></ul></div>
              <p className="title">Frequency of consumer group offset sync</p>
              <div className="description"><p>Frequency at which consumer group offsets are synced (default: 60, every minute)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="kafka_mirrormaker_emit_checkpoints_enabled"/><Link to="#kafka_mirrormaker_emit_checkpoints_enabled"><strong>kafka_mirrormaker.emit_checkpoints_enabled</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Emit consumer group offset checkpoints</p>
              <div className="description"><p>Whether to emit consumer group offset checkpoints to target cluster periodically (default: true)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="kafka_mirrormaker_emit_checkpoints_interval_seconds"/><Link to="#kafka_mirrormaker_emit_checkpoints_interval_seconds"><strong>kafka_mirrormaker.emit_checkpoints_interval_seconds</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>9223372036854776000</code></li></ul></div>
              <p className="title">Frequency of consumer group offset checkpoints</p>
              <div className="description"><p>Frequency at which consumer group offset checkpoints are emitted (default: 60, every minute)</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="kafka_mirrormaker_sync_topic_configs_enabled"/><Link to="#kafka_mirrormaker_sync_topic_configs_enabled"><strong>kafka_mirrormaker.sync_topic_configs_enabled</strong></Link></p><p><code className="type">boolean</code></p></div>
              <p className="title">Sync remote topics</p>
              <div className="description"><p>Whether to periodically configure remote topics to match their corresponding upstream topics.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="kafka_mirrormaker_tasks_max_per_cpu"/><Link to="#kafka_mirrormaker_tasks_max_per_cpu"><strong>kafka_mirrormaker.tasks_max_per_cpu</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>min: <code>1</code></li><li>max: <code>8</code></li><li>default: <code>1</code></li></ul></div>
              <p className="title">Maximum number of MirrorMaker tasks (of each type) per service CPU</p>
              <div className="description"><p>'tasks.max' is set to this multiplied by the number of CPUs in the service.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="kafka_mirrormaker_offset_lag_max"/><Link to="#kafka_mirrormaker_offset_lag_max"><strong>kafka_mirrormaker.offset_lag_max</strong></Link></p><p><code className="type">integer</code></p></div><div className="constraints"><ul><li>max: <code>9223372036854776000</code></li></ul></div>
              <p className="title">Maximum offset lag before it is resynced</p>
              <div className="description"><p>How out-of-sync a remote partition can be before it is resynced.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="kafka_mirrormaker_groups"/><Link to="#kafka_mirrormaker_groups"><strong>kafka_mirrormaker.groups</strong></Link></p><p><code className="type">string</code></p></div>
              <p className="title">Comma-separated list of consumer groups to replicate</p>
              <div className="description"><p>Consumer groups to replicate. Supports comma-separated group IDs and regexes.</p></div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="param"><p className="name"><Link id="kafka_mirrormaker_groups_exclude"/><Link to="#kafka_mirrormaker_groups_exclude"><strong>kafka_mirrormaker.groups_exclude</strong></Link></p><p><code className="type">string</code></p></div>
              <p className="title">Comma-separated list of group IDs and regexes to exclude from replication</p>
              <div className="description"><p>Exclude groups. Supports comma-separated group IDs and regexes. Excludes take precedence over includes.</p></div>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
    