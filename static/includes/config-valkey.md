
<!-- vale off -->
<table class="service-param">
  <thead>
    <tr><th>Parameter</th></tr>
  </thead><tr>
  <td>
    <p class="name">
      <b>additional_backup_regions</b>&nbsp;<code class="type">array</code>
    </p>
    <p class="title">Additional Cloud Regions for Backup Replication</p>
    <div class="description"></div>
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
      <b>migration</b>&nbsp;<code class="type">object,null</code>
    </p>
    <p class="title">Migrate data from existing server</p>
    <div class="description"></div>
    <table class="service-param-children">
      <tr>
        <td>
          <p class="name">
            <b>host</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Hostname or IP address of the server where to migrate data from</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>port</b>&nbsp;<code class="type">integer</code>
            <div class="constraints">
                min: <code>1</code>
                max: <code>65535</code>
            </div>
          </p>
          <p class="title">Port number of the server where to migrate data from</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>password</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Password for authentication with the server where to migrate data from</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>ssl</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">The server where to migrate data from is secured with SSL</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>username</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">User name for authentication with the server where to migrate data from</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>dbname</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Database name for bootstrapping the initial connection</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>ignore_dbs</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">Comma-separated list of databases, which should be ignored during migration (supported by MySQL and PostgreSQL only at the moment)</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>method</b>&nbsp;<code class="type">string</code>
          </p>
          <p class="title">The migration method to be used (currently supported only by Redis, Dragonfly, MySQL and PostgreSQL service types)</p>
          <div class="description"></div>
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
            <b>prometheus</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow clients to connect to prometheus with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>redis</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow clients to connect to redis with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations</p>
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
            <b>prometheus</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Enable prometheus</p>
          <div class="description"></div>
        </td>
      </tr>
      <tr>
        <td>
          <p class="name">
            <b>redis</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Enable redis</p>
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
      <tr>
        <td>
          <p class="name">
            <b>redis</b>&nbsp;<code class="type">boolean</code>
          </p>
          <p class="title">Allow clients to connect to redis from the public internet for service nodes that are in a project VPC or another type of private network</p>
          <div class="description"></div>
        </td>
      </tr>
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>recovery_basebackup_name</b>&nbsp;<code class="type">string</code>
    </p>
    <p class="title">Name of the basebackup to restore in forked service</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>redis_maxmemory_policy</b>&nbsp;<code class="type">string,null</code>
    </p>
    <p class="title">Redis maxmemory-policy</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>redis_pubsub_client_output_buffer_limit</b>&nbsp;<code class="type">integer</code>
        <div class="constraints">
            min: <code>32</code>
            max: <code>512</code>
        </div>
    </p>
    <p class="title">Pub/sub client output buffer hard limit in MB</p>
    <div class="description">Set output buffer limit for pub / sub clients in MB. The value is the hard limit, the soft limit is 1/4 of the hard limit. When setting the limit, be mindful of the available memory in the selected service plan.</div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>redis_number_of_databases</b>&nbsp;<code class="type">integer</code>
        <div class="constraints">
            min: <code>1</code>
            max: <code>128</code>
        </div>
    </p>
    <p class="title">Number of Redis databases</p>
    <div class="description">Set number of Redis databases. Changing this will cause a restart of the Redis service.</div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>redis_io_threads</b>&nbsp;<code class="type">integer</code>
        <div class="constraints">
            min: <code>1</code>
            max: <code>32</code>
        </div>
    </p>
    <p class="title">Redis IO thread count</p>
    <div class="description">Set Redis IO thread count. Changing this will cause a restart of the Redis service.</div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>redis_lfu_log_factor</b>&nbsp;<code class="type">integer</code>
        <div class="constraints">
            max: <code>100</code>
        </div>
    </p>
    <p class="title">Counter logarithm factor for volatile-lfu and allkeys-lfu maxmemory-policies</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>redis_lfu_decay_time</b>&nbsp;<code class="type">integer</code>
        <div class="constraints">
            min: <code>1</code>
            max: <code>120</code>
        </div>
    </p>
    <p class="title">LFU maxmemory-policy counter decay time in minutes</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>redis_ssl</b>&nbsp;<code class="type">boolean</code>
    </p>
    <p class="title">Require SSL to access Redis</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>redis_timeout</b>&nbsp;<code class="type">integer</code>
        <div class="constraints">
            max: <code>31536000</code>
        </div>
    </p>
    <p class="title">Redis idle connection timeout in seconds</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>redis_notify_keyspace_events</b>&nbsp;<code class="type">string</code>
    </p>
    <p class="title">Set notify-keyspace-events option</p>
    <div class="description"></div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>redis_persistence</b>&nbsp;<code class="type">string</code>
    </p>
    <p class="title">Redis persistence</p>
    <div class="description">When persistence is 'rdb', Redis does RDB dumps each 10 minutes if any key is changed. Also RDB dumps are done according to the backup schedule for backup purposes. When persistence is 'off', no RDB dumps or backups are done, so data can be lost at any moment if the service is restarted for any reason, or if the service is powered off. Also, the service can't be forked.</div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>redis_acl_channels_default</b>&nbsp;<code class="type">string</code>
    </p>
    <p class="title">Default ACL for pub/sub channels used when Redis user is created</p>
    <div class="description">Determines default pub/sub channels' ACL for new users if ACL is not supplied. When this option is not defined, all_channels is assumed to keep backward compatibility. This option doesn't affect Redis configuration acl-pubsub-default.</div>
    <table class="service-param-children">
</table>
  </td>
</tr>
<tr>
  <td>
    <p class="name">
      <b>redis_version</b>&nbsp;<code class="type">string,null</code>
    </p>
    <p class="title">Redis major version</p>
    <div class="description"></div>
    <table class="service-param-children">
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
</table>
    