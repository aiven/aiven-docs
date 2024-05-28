
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
      <b>cassandra</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">cassandra configuration values</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>batch_size_warn_threshold_in_kb</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>1000000</code>
            </div>
          </p>
          <p class="title">batch_size_warn_threshold_in_kb</p>
          <div class="description">Log a warning message on any multiple-partition batch size exceeding this value.5kb per batch by default.Caution should be taken on increasing the size of this thresholdas it can lead to node instability.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>batch_size_fail_threshold_in_kb</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>1000000</code>
            </div>
          </p>
          <p class="title">batch_size_fail_threshold_in_kb</p>
          <div class="description">Fail any multiple-partition batch exceeding this value. 50kb (10x warn threshold) by default.</div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>datacenter</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Cassandra datacenter name</p>
          <div class="description">Name of the datacenter to which nodes of this service belong. Can be set only when creating the service.</div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>migrate_sstableloader</b>&nbsp;<code class="type">boolean</code>
    </p>
    <p class="title">Migration mode for the sstableloader utility</p>
    <div class="description">Sets the service into migration mode enabling the sstableloader utility to be used to upload Cassandra data files. Available only on service create.</div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>service_to_join_with</b>&nbsp;<code class="type">string</code>
    </p>
    <p class="title">Name of the service to form a bigger cluster with</p>
    <div class="description">When bootstrapping, instead of creating a new Cassandra cluster try to join an existing one from another service. Can only be set on service creation.</div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>cassandra_version</b>&nbsp;<code class="type">string,null</code>
    </p>
    <p class="title">Cassandra version</p>
    <div class="description"></div>
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
      <b>public_access</b>&nbsp;<code class="type">object</code>
    </p>
    <p class="title">Allow access to selected service ports from the public Internet</p>
    <div class="description"></div>
    <table class="service-param-children">
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
<tr>
  <td>
    <p class="name">
      <b>service_to_fork_from</b>&nbsp;<code class="type">string,null</code>
    </p>
    <p class="title">Name of another service to fork from. This has effect only when a new service is being created.</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>project_to_fork_from</b>&nbsp;<code class="type">string,null</code>
    </p>
    <p class="title">Name of another project to fork a service from. This has effect only when a new service is being created.</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>backup_hour</b>&nbsp;<code class="type">integer,null</code>
        <div class="constraints">
            max: <code>23</code>
        </div>
    </p>
    <p class="title">The hour of day (in UTC) when backup for the service is started. New backup is only started if previous backup has already completed.</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>backup_minute</b>&nbsp;<code class="type">integer,null</code>
        <div class="constraints">
            max: <code>59</code>
        </div>
    </p>
    <p class="title">The minute of an hour when backup for the service is started. New backup is only started if previous backup has already completed.</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
</table>
    