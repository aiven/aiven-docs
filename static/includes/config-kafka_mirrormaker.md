
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
      <b>kafka_mirrormaker</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">Kafka MirrorMaker configuration values</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>refresh_topics_enabled</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Refresh topics and partitions</p>
          <div class="description">Whether to periodically check for new topics and partitions. Defaults to 'true'.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>refresh_topics_interval_seconds</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>9223372036854776000</code>
            </div>
          </p>
          <p class="title">Frequency of topic and partitions refresh</p>
          <div class="description">Frequency of topic and partitions refresh in seconds. Defaults to 600 seconds (10 minutes).</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>refresh_groups_enabled</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Refresh consumer groups</p>
          <div class="description">Whether to periodically check for new consumer groups. Defaults to 'true'.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>refresh_groups_interval_seconds</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>9223372036854776000</code>
            </div>
          </p>
          <p class="title">Frequency of group refresh</p>
          <div class="description">Frequency of consumer group refresh in seconds. Defaults to 600 seconds (10 minutes).</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>sync_group_offsets_enabled</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Sync consumer group offsets</p>
          <div class="description">Whether to periodically write the translated offsets of replicated consumer groups (in the source cluster) to __consumer_offsets topic in target cluster, as long as no active consumers in that group are connected to the target cluster</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>sync_group_offsets_interval_seconds</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>9223372036854776000</code>
            </div>
          </p>
          <p class="title">Frequency of consumer group offset sync</p>
          <div class="description">Frequency at which consumer group offsets are synced (default: 60, every minute)</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>emit_checkpoints_enabled</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Emit consumer group offset checkpoints</p>
          <div class="description">Whether to emit consumer group offset checkpoints to target cluster periodically (default: true)</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>emit_checkpoints_interval_seconds</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>9223372036854776000</code>
            </div>
          </p>
          <p class="title">Frequency of consumer group offset checkpoints</p>
          <div class="description">Frequency at which consumer group offset checkpoints are emitted (default: 60, every minute)</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>sync_topic_configs_enabled</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Sync remote topics</p>
          <div class="description">Whether to periodically configure remote topics to match their corresponding upstream topics.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>tasks_max_per_cpu</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>4</code>
            </div>
          </p>
          <p class="title">Maximum number of MirrorMaker tasks (of each type) per service CPU</p>
          <div class="description">'tasks.max' is set to this multiplied by the number of CPUs in the service.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>offset_lag_max</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                max: <code>9223372036854776000</code>
            </div>
          </p>
          <p class="title">Maximum offset lag before it is resynced</p>
          <div class="description">How out-of-sync a remote partition can be before it is resynced.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>groups</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Comma-separated list of consumer groups to replicate</p>
          <div class="description">Consumer groups to replicate. Supports comma-separated group IDs and regexes.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>groups_exclude</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Comma-separated list of group IDs and regexes to exclude from replication</p>
          <div class="description">Exclude groups. Supports comma-separated group IDs and regexes. Excludes take precedence over includes.</div>
        </td>
      </tr>
</table>
  </td>
</tr>
</table>
    