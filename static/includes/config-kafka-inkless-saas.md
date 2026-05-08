
<!-- vale off -->
import Link from '@docusaurus/Link'

<table className="service-param">
  <tbody>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="backup_interval_hours" to="#backup_interval_hours">
                  <strong>backup_interval_hours</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer,null">integer,null</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>3</code></li>
                  <li>max: <code>24</code></li>
                  <li>enum: <code>3,4,6,8,12,24,null</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Interval in hours between automatic backups. Minimum value is 3 hours. Must be a divisor of 24 (3, 4, 6, 8, 12, 24).  (Applicable to ACU plans only)</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="backup_retention_days" to="#backup_retention_days">
                  <strong>backup_retention_days</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer,null">integer,null</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>1</code></li>
                  <li>max: <code>30</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Number of days to retain automatic backups. Backups older than this value will be automatically deleted. (Applicable to ACU plans only)</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="custom_domain" to="#custom_domain">
                  <strong>custom_domain</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="string,null">string,null</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>maxLength: <code>255</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Serve the web frontend using a custom CNAME pointing to the Aiven DNS name. When you set a custom domain for a service deployed in a VPC, the service certificate is only created for the public-* hostname and the custom domain.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="ip_filter" to="#ip_filter">
                  <strong>ip_filter</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="array[string,object]">array[string,object]</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>maxItems: <code>8000</code></li>
                  <li>default: <code>0.0.0.0/0,::/0</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Allow incoming connections from CIDR address block, e.g. &#x27;10.20.0.0/16&#x27;</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="ip_filter.[0].description" to="#ip_filter.[0].description">
                  <strong>ip_filter.[0].description</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="string">string</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>maxLength: <code>1024</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Description for IP filter list entry</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="ip_filter.[0].network" to="#ip_filter.[0].network">
                  <strong>ip_filter.[0].network</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="string">string</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>maxLength: <code>43</code></li>
              </ul>
            </div>

              <div className="description">
                <p>CIDR address block</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="service_log" to="#service_log">
                  <strong>service_log</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="boolean,null">boolean,null</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
              </ul>
            </div>

              <div className="description">
                <p>Store logs for the service so that they are available in the HTTP API and console.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="static_ips" to="#static_ips">
                  <strong>static_ips</strong>
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
                <p>Use static public IP addresses</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="single_zone" to="#single_zone">
                  <strong>single_zone</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="object">object</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
              </ul>
            </div>

              <div className="description">
                <p>Single-zone configuration</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="single_zone.enabled" to="#single_zone.enabled">
                  <strong>single_zone.enabled</strong>
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
                <p>Whether to allocate nodes on the same Availability Zone or spread across zones available. By default service nodes are spread across different AZs. The single AZ support is best-effort and may temporarily allocate nodes in different AZs e.g. in case of capacity limitations in one AZ.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="single_zone.availability_zone" to="#single_zone.availability_zone">
                  <strong>single_zone.availability_zone</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="string">string</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>maxLength: <code>40</code></li>
              </ul>
            </div>

              <div className="description">
                <p>The availability zone to use for the service. This is only used when enabled is set to true. If not set the service will be allocated in random AZ.The AZ is not guaranteed, and the service may be allocated in a different AZ if the selected AZ is not available. Zones will not be validated and invalid zones will be ignored, falling back to random AZ selection. Common availability zones include: AWS (euc1-az1, euc1-az2, euc1-az3), GCP (europe-west1-a, europe-west1-b, europe-west1-c), Azure (germanywestcentral/1, germanywestcentral/2, germanywestcentral/3).</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="private_access" to="#private_access">
                  <strong>private_access</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="object">object</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
              </ul>
            </div>

              <div className="description">
                <p>Allow access to selected service ports from private networks</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="private_access.kafka" to="#private_access.kafka">
                  <strong>private_access.kafka</strong>
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
                <p>Allow clients to connect to kafka with a DNS name that always resolves to the service&#x27;s private IP addresses. Only available in certain network locations</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="private_access.kafka_connect" to="#private_access.kafka_connect">
                  <strong>private_access.kafka_connect</strong>
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
                <p>Allow clients to connect to kafka_connect with a DNS name that always resolves to the service&#x27;s private IP addresses. Only available in certain network locations</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="private_access.kafka_rest" to="#private_access.kafka_rest">
                  <strong>private_access.kafka_rest</strong>
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
                <p>Allow clients to connect to kafka_rest with a DNS name that always resolves to the service&#x27;s private IP addresses. Only available in certain network locations</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="private_access.prometheus" to="#private_access.prometheus">
                  <strong>private_access.prometheus</strong>
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
                <p>Allow clients to connect to prometheus with a DNS name that always resolves to the service&#x27;s private IP addresses. Only available in certain network locations</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="private_access.schema_registry" to="#private_access.schema_registry">
                  <strong>private_access.schema_registry</strong>
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
                <p>Allow clients to connect to schema_registry with a DNS name that always resolves to the service&#x27;s private IP addresses. Only available in certain network locations</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="public_access" to="#public_access">
                  <strong>public_access</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="object">object</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
              </ul>
            </div>

              <div className="description">
                <p>Allow access to selected service ports from the public Internet</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="public_access.kafka" to="#public_access.kafka">
                  <strong>public_access.kafka</strong>
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
                <p>Allow clients to connect to kafka from the public internet for service nodes that are in a project VPC or another type of private network</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="public_access.kafka_connect" to="#public_access.kafka_connect">
                  <strong>public_access.kafka_connect</strong>
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
                <p>Allow clients to connect to kafka_connect from the public internet for service nodes that are in a project VPC or another type of private network</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="public_access.kafka_rest" to="#public_access.kafka_rest">
                  <strong>public_access.kafka_rest</strong>
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
                <p>Allow clients to connect to kafka_rest from the public internet for service nodes that are in a project VPC or another type of private network</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="public_access.prometheus" to="#public_access.prometheus">
                  <strong>public_access.prometheus</strong>
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
                <p>Allow clients to connect to prometheus from the public internet for service nodes that are in a project VPC or another type of private network</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="public_access.schema_registry" to="#public_access.schema_registry">
                  <strong>public_access.schema_registry</strong>
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
                <p>Allow clients to connect to schema_registry from the public internet for service nodes that are in a project VPC or another type of private network</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="privatelink_access" to="#privatelink_access">
                  <strong>privatelink_access</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="object">object</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
              </ul>
            </div>

              <div className="description">
                <p>Allow access to selected service components through Privatelink</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="privatelink_access.jolokia" to="#privatelink_access.jolokia">
                  <strong>privatelink_access.jolokia</strong>
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
                <p>Enable jolokia</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="privatelink_access.kafka" to="#privatelink_access.kafka">
                  <strong>privatelink_access.kafka</strong>
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
                <p>Enable kafka</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="privatelink_access.kafka_connect" to="#privatelink_access.kafka_connect">
                  <strong>privatelink_access.kafka_connect</strong>
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
                <p>Enable kafka_connect</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="privatelink_access.kafka_rest" to="#privatelink_access.kafka_rest">
                  <strong>privatelink_access.kafka_rest</strong>
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
                <p>Enable kafka_rest</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="privatelink_access.prometheus" to="#privatelink_access.prometheus">
                  <strong>privatelink_access.prometheus</strong>
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
                <p>Enable prometheus</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="privatelink_access.schema_registry" to="#privatelink_access.schema_registry">
                  <strong>privatelink_access.schema_registry</strong>
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
                <p>Enable schema_registry</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="letsencrypt_sasl" to="#letsencrypt_sasl">
                  <strong>letsencrypt_sasl</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="boolean,null">boolean,null</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
              </ul>
            </div>

              <div className="description">
                <p>Use a Let&#x27;s Encrypt certificate authority (CA) for Kafka SASL authentication. (Default: False)</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="letsencrypt_sasl_privatelink" to="#letsencrypt_sasl_privatelink">
                  <strong>letsencrypt_sasl_privatelink</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="boolean,null">boolean,null</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
              </ul>
            </div>

              <div className="description">
                <p>Use a Let&#x27;s Encrypt certificate authority (CA) for Kafka SASL authentication via Privatelink. (Default: False)</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka" to="#kafka">
                  <strong>kafka</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="object">object</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>default: <code>[object Object]</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Kafka broker configuration values</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka.message_max_bytes" to="#kafka.message_max_bytes">
                  <strong>kafka.message_max_bytes</strong>
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
                <p>The maximum size of message that the server can receive. (Default: 1048588 bytes (1 mebibyte + 12 bytes))</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka.log_local_retention_ms" to="#kafka.log_local_retention_ms">
                  <strong>kafka.log_local_retention_ms</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>900000</code></li>
              </ul>
            </div>

              <div className="description">
                <p>The number of milliseconds to keep the local log segments before it gets eligible for deletion. If set to -2, the value of log.retention.ms is used. The effective value should always be less than or equal to log.retention.ms value. (Default: -2)</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka.log_local_retention_bytes" to="#kafka.log_local_retention_bytes">
                  <strong>kafka.log_local_retention_bytes</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>5368709120</code></li>
              </ul>
            </div>

              <div className="description">
                <p>The maximum size of local log segments that can grow for a partition before it gets eligible for deletion. If set to -2, the value of log.retention.bytes is used. The effective value should always be less than or equal to log.retention.bytes value. (Default: -2)</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka.log_retention_bytes" to="#kafka.log_retention_bytes">
                  <strong>kafka.log_retention_bytes</strong>
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
                <p>The maximum size of the log before deleting messages (Default: -1)</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka.log_retention_hours" to="#kafka.log_retention_hours">
                  <strong>kafka.log_retention_hours</strong>
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
                <p>The number of hours to keep a log file before deleting it. Use -1 for unlimited retention or 1 or higher. Setting 0 is invalid and prevents Kafka from starting. (Default: 168 hours, or 1 week)</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka.log_retention_ms" to="#kafka.log_retention_ms">
                  <strong>kafka.log_retention_ms</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>range: <code>60000</code> - <code>9223372036854775807</code></li>
                  <li>min: <code>-1</code></li>
              </ul>
            </div>

              <div className="description">
                <p>The number of milliseconds to keep a log file before deleting it (in milliseconds), If not set, the value in log.retention.minutes is used. If set to -1, no time limit is applied. (Default: null, log.retention.hours applies)</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka.auto_create_topics_enable" to="#kafka.auto_create_topics_enable">
                  <strong>kafka.auto_create_topics_enable</strong>
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
                <p>Enable auto-creation of topics. (Default: false)</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka.num_partitions" to="#kafka.num_partitions">
                  <strong>kafka.num_partitions</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>1</code></li>
                  <li>max: <code>2048</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Number of partitions for auto-created topics (Default: 1)</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka.default_replication_factor" to="#kafka.default_replication_factor">
                  <strong>kafka.default_replication_factor</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>1</code></li>
                  <li>max: <code>3</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Replication factor for auto-created topics (Default: 3)</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka.sasl_oauthbearer_expected_audience" to="#kafka.sasl_oauthbearer_expected_audience">
                  <strong>kafka.sasl_oauthbearer_expected_audience</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="string">string</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
              </ul>
            </div>

              <div className="description">
                <p>The (optional) comma-delimited setting for the broker to use to verify that the JWT was issued for one of the expected audiences. (Default: null)</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka.sasl_oauthbearer_expected_issuer" to="#kafka.sasl_oauthbearer_expected_issuer">
                  <strong>kafka.sasl_oauthbearer_expected_issuer</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="string">string</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
              </ul>
            </div>

              <div className="description">
                <p>Optional setting for the broker to use to verify that the JWT was created by the expected issuer.(Default: null)</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka.sasl_oauthbearer_jwks_endpoint_url" to="#kafka.sasl_oauthbearer_jwks_endpoint_url">
                  <strong>kafka.sasl_oauthbearer_jwks_endpoint_url</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="string">string</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
              </ul>
            </div>

              <div className="description">
                <p>OIDC JWKS endpoint URL. By setting this the SASL SSL OAuth2/OIDC authentication is enabled. See also other options for SASL OAuth2/OIDC. (Default: null)</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_authentication_methods" to="#kafka_authentication_methods">
                  <strong>kafka_authentication_methods</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="object">object</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
              </ul>
            </div>

              <div className="description">
                <p>Kafka authentication methods</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_authentication_methods.certificate" to="#kafka_authentication_methods.certificate">
                  <strong>kafka_authentication_methods.certificate</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="boolean">boolean</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>default: <code>true</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Enable certificate/SSL authentication</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_authentication_methods.sasl" to="#kafka_authentication_methods.sasl">
                  <strong>kafka_authentication_methods.sasl</strong>
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
                <p>Enable SASL authentication</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_sasl_mechanisms" to="#kafka_sasl_mechanisms">
                  <strong>kafka_sasl_mechanisms</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="object">object</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
              </ul>
            </div>

              <div className="description">
                <p>Kafka SASL mechanisms</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_sasl_mechanisms.plain" to="#kafka_sasl_mechanisms.plain">
                  <strong>kafka_sasl_mechanisms.plain</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="boolean">boolean</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>default: <code>true</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Enable PLAIN mechanism</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_sasl_mechanisms.scram_sha_256" to="#kafka_sasl_mechanisms.scram_sha_256">
                  <strong>kafka_sasl_mechanisms.scram_sha_256</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="boolean">boolean</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>default: <code>true</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Enable SCRAM-SHA-256 mechanism</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_sasl_mechanisms.scram_sha_512" to="#kafka_sasl_mechanisms.scram_sha_512">
                  <strong>kafka_sasl_mechanisms.scram_sha_512</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="boolean">boolean</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>default: <code>true</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Enable SCRAM-SHA-512 mechanism</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="follower_fetching" to="#follower_fetching">
                  <strong>follower_fetching</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="object">object</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
              </ul>
            </div>

              <div className="description">
                <p>Enable follower fetching</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="follower_fetching.enabled" to="#follower_fetching.enabled">
                  <strong>follower_fetching.enabled</strong>
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
                <p>Whether to enable the follower fetching functionality</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect" to="#kafka_connect">
                  <strong>kafka_connect</strong>
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
                <p>Enable Kafka Connect service</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_config" to="#kafka_connect_config">
                  <strong>kafka_connect_config</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="object">object</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
              </ul>
            </div>

              <div className="description">
                <p>Kafka Connect configuration values</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_config.prefer_ipv6_address_enable" to="#kafka_connect_config.prefer_ipv6_address_enable">
                  <strong>kafka_connect_config.prefer_ipv6_address_enable</strong>
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
                <p>When enabled, connectors will automatically resolve IPv6 addresses from external server names configured with dual-stack.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_config.connector_client_config_override_policy" to="#kafka_connect_config.connector_client_config_override_policy">
                  <strong>kafka_connect_config.connector_client_config_override_policy</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="string">string</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>enum: <code>None,All</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Defines what client configurations can be overridden by the connector. Default is None</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_config.consumer_auto_offset_reset" to="#kafka_connect_config.consumer_auto_offset_reset">
                  <strong>kafka_connect_config.consumer_auto_offset_reset</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="string">string</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>enum: <code>earliest,latest</code></li>
              </ul>
            </div>

              <div className="description">
                <p>What to do when there is no initial offset in Kafka or if the current offset does not exist any more on the server. Default is earliest</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_config.consumer_fetch_max_bytes" to="#kafka_connect_config.consumer_fetch_max_bytes">
                  <strong>kafka_connect_config.consumer_fetch_max_bytes</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>1048576</code></li>
                  <li>max: <code>104857600</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Records are fetched in batches by the consumer, and if the first record batch in the first non-empty partition of the fetch is larger than this value, the record batch will still be returned to ensure that the consumer can make progress. As such, this is not a absolute maximum.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_config.consumer_isolation_level" to="#kafka_connect_config.consumer_isolation_level">
                  <strong>kafka_connect_config.consumer_isolation_level</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="string">string</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>enum: <code>read_uncommitted,read_committed</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Transaction read isolation level. read_uncommitted is the default, but read_committed can be used if consume-exactly-once behavior is desired.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_config.consumer_max_partition_fetch_bytes" to="#kafka_connect_config.consumer_max_partition_fetch_bytes">
                  <strong>kafka_connect_config.consumer_max_partition_fetch_bytes</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>1048576</code></li>
                  <li>max: <code>104857600</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Records are fetched in batches by the consumer.If the first record batch in the first non-empty partition of the fetch is larger than this limit, the batch will still be returned to ensure that the consumer can make progress. </p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_config.consumer_max_poll_interval_ms" to="#kafka_connect_config.consumer_max_poll_interval_ms">
                  <strong>kafka_connect_config.consumer_max_poll_interval_ms</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>1</code></li>
                  <li>max: <code>2147483647</code></li>
              </ul>
            </div>

              <div className="description">
                <p>The maximum delay in milliseconds between invocations of poll() when using consumer group management (defaults to 300000).</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_config.consumer_max_poll_records" to="#kafka_connect_config.consumer_max_poll_records">
                  <strong>kafka_connect_config.consumer_max_poll_records</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>1</code></li>
                  <li>max: <code>10000</code></li>
              </ul>
            </div>

              <div className="description">
                <p>The maximum number of records returned in a single call to poll() (defaults to 500).</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_config.offset_flush_interval_ms" to="#kafka_connect_config.offset_flush_interval_ms">
                  <strong>kafka_connect_config.offset_flush_interval_ms</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>1</code></li>
                  <li>max: <code>100000000</code></li>
              </ul>
            </div>

              <div className="description">
                <p>The interval at which to try committing offsets for tasks (defaults to 60000).</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_config.offset_flush_timeout_ms" to="#kafka_connect_config.offset_flush_timeout_ms">
                  <strong>kafka_connect_config.offset_flush_timeout_ms</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>1</code></li>
                  <li>max: <code>2147483647</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Maximum number of milliseconds to wait for records to flush and partition offset data to be committed to offset storage before cancelling the process and restoring the offset data to be committed in a future attempt (defaults to 5000).</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_config.producer_batch_size" to="#kafka_connect_config.producer_batch_size">
                  <strong>kafka_connect_config.producer_batch_size</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>0</code></li>
                  <li>max: <code>5242880</code></li>
              </ul>
            </div>

              <div className="description">
                <p>This setting gives the upper bound of the batch size to be sent. If there are fewer than this many bytes accumulated for this partition, the producer will &#x27;linger&#x27; for the linger.ms time waiting for more records to show up. A batch size of zero will disable batching entirely (defaults to 16384).</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_config.producer_buffer_memory" to="#kafka_connect_config.producer_buffer_memory">
                  <strong>kafka_connect_config.producer_buffer_memory</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>5242880</code></li>
                  <li>max: <code>134217728</code></li>
              </ul>
            </div>

              <div className="description">
                <p>The total bytes of memory the producer can use to buffer records waiting to be sent to the broker (defaults to 33554432).</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_config.producer_compression_type" to="#kafka_connect_config.producer_compression_type">
                  <strong>kafka_connect_config.producer_compression_type</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="string">string</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>enum: <code>gzip,snappy,lz4,zstd,none</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Specify the default compression type for producers. This configuration accepts the standard compression codecs (&#x27;gzip&#x27;, &#x27;snappy&#x27;, &#x27;lz4&#x27;, &#x27;zstd&#x27;). It additionally accepts &#x27;none&#x27; which is the default and equivalent to no compression.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_config.producer_linger_ms" to="#kafka_connect_config.producer_linger_ms">
                  <strong>kafka_connect_config.producer_linger_ms</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>0</code></li>
                  <li>max: <code>5000</code></li>
              </ul>
            </div>

              <div className="description">
                <p>This setting gives the upper bound on the delay for batching: once there is batch.size worth of records for a partition it will be sent immediately regardless of this setting, however if there are fewer than this many bytes accumulated for this partition the producer will &#x27;linger&#x27; for the specified time waiting for more records to show up. Defaults to 0.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_config.producer_max_request_size" to="#kafka_connect_config.producer_max_request_size">
                  <strong>kafka_connect_config.producer_max_request_size</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>131072</code></li>
                  <li>max: <code>67108864</code></li>
              </ul>
            </div>

              <div className="description">
                <p>This setting will limit the number of record batches the producer will send in a single request to avoid sending huge requests.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_config.scheduled_rebalance_max_delay_ms" to="#kafka_connect_config.scheduled_rebalance_max_delay_ms">
                  <strong>kafka_connect_config.scheduled_rebalance_max_delay_ms</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>0</code></li>
                  <li>max: <code>600000</code></li>
              </ul>
            </div>

              <div className="description">
                <p>The maximum delay that is scheduled in order to wait for the return of one or more departed workers before rebalancing and reassigning their connectors and tasks to the group. During this period the connectors and tasks of the departed workers remain unassigned. Defaults to 5 minutes.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_config.session_timeout_ms" to="#kafka_connect_config.session_timeout_ms">
                  <strong>kafka_connect_config.session_timeout_ms</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>1</code></li>
                  <li>max: <code>2147483647</code></li>
              </ul>
            </div>

              <div className="description">
                <p>The timeout in milliseconds used to detect failures when using Kafka’s group management facilities (defaults to 10000).</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_plugin_versions" to="#kafka_connect_plugin_versions">
                  <strong>kafka_connect_plugin_versions</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="array[object]">array[object]</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
              </ul>
            </div>

              <div className="description">
                <p>The plugin selected by the user</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_plugin_versions.[0].plugin_name" to="#kafka_connect_plugin_versions.[0].plugin_name">
                  <strong>kafka_connect_plugin_versions.[0].plugin_name</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="string">string</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>maxLength: <code>128</code></li>
              </ul>
            </div>

              <div className="description">
                <p>The name of the plugin</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_plugin_versions.[0].version" to="#kafka_connect_plugin_versions.[0].version">
                  <strong>kafka_connect_plugin_versions.[0].version</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="string">string</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>maxLength: <code>128</code></li>
              </ul>
            </div>

              <div className="description">
                <p>The version of the plugin</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_secret_providers" to="#kafka_connect_secret_providers">
                  <strong>kafka_connect_secret_providers</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="array[object]">array[object]</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
              </ul>
            </div>

              <div className="description">
                <p>Configure external secret providers in order to reference external secrets in connector configuration. Currently Hashicorp Vault (provider: vault, auth_method: token) and AWS Secrets Manager (provider: aws, auth_method: credentials) are supported. Secrets can be referenced in connector config with &lt;provider_name&gt;:&lt;secret_path&gt;:&lt;key_name&gt;</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_secret_providers.[0].name" to="#kafka_connect_secret_providers.[0].name">
                  <strong>kafka_connect_secret_providers.[0].name</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="string">string</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
              </ul>
            </div>

              <div className="description">
                <p>Name of the secret provider. Used to reference secrets in connector config.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_secret_providers.[0].vault" to="#kafka_connect_secret_providers.[0].vault">
                  <strong>kafka_connect_secret_providers.[0].vault</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="object">object</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>required: <code>auth_method,address</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Vault secret provider configuration</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_secret_providers.[0].vault.auth_method" to="#kafka_connect_secret_providers.[0].vault.auth_method">
                  <strong>kafka_connect_secret_providers.[0].vault.auth_method</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="string">string</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>enum: <code>token</code></li>
              </ul>
            </div>

              <div className="description">
                <p>An enumeration.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_secret_providers.[0].vault.address" to="#kafka_connect_secret_providers.[0].vault.address">
                  <strong>kafka_connect_secret_providers.[0].vault.address</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="string">string</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>maxLength: <code>65536</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Address of the Vault server</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_secret_providers.[0].vault.engine_version" to="#kafka_connect_secret_providers.[0].vault.engine_version">
                  <strong>kafka_connect_secret_providers.[0].vault.engine_version</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>enum: <code>1,2</code></li>
              </ul>
            </div>

              <div className="description">
                <p>An enumeration.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_secret_providers.[0].vault.prefix_path_depth" to="#kafka_connect_secret_providers.[0].vault.prefix_path_depth">
                  <strong>kafka_connect_secret_providers.[0].vault.prefix_path_depth</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
              </ul>
            </div>

              <div className="description">
                <p>Prefix path depth of the secrets Engine. Default is 1. If the secrets engine path has more than one segment it has to be increased to the number of segments.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_secret_providers.[0].vault.token" to="#kafka_connect_secret_providers.[0].vault.token">
                  <strong>kafka_connect_secret_providers.[0].vault.token</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="string">string</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>maxLength: <code>256</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Token used to authenticate with vault and auth method &#x60;token&#x60;.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_secret_providers.[0].vault.server_pem" to="#kafka_connect_secret_providers.[0].vault.server_pem">
                  <strong>kafka_connect_secret_providers.[0].vault.server_pem</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="string">string</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>maxLength: <code>4096</code></li>
              </ul>
            </div>

              <div className="description">
                <p>PEM encoded certificate of the Vault server. Required if the vault server uses a self-signed certificate.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_secret_providers.[0].aws" to="#kafka_connect_secret_providers.[0].aws">
                  <strong>kafka_connect_secret_providers.[0].aws</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="object">object</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>required: <code>auth_method,region</code></li>
              </ul>
            </div>

              <div className="description">
                <p>AWS secret provider configuration</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_secret_providers.[0].aws.auth_method" to="#kafka_connect_secret_providers.[0].aws.auth_method">
                  <strong>kafka_connect_secret_providers.[0].aws.auth_method</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="string">string</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>enum: <code>credentials</code></li>
              </ul>
            </div>

              <div className="description">
                <p>An enumeration.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_secret_providers.[0].aws.access_key" to="#kafka_connect_secret_providers.[0].aws.access_key">
                  <strong>kafka_connect_secret_providers.[0].aws.access_key</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="string">string</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>maxLength: <code>128</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Access key used to authenticate with aws</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_secret_providers.[0].aws.secret_key" to="#kafka_connect_secret_providers.[0].aws.secret_key">
                  <strong>kafka_connect_secret_providers.[0].aws.secret_key</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="string">string</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>maxLength: <code>128</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Secret key used to authenticate with aws</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_secret_providers.[0].aws.region" to="#kafka_connect_secret_providers.[0].aws.region">
                  <strong>kafka_connect_secret_providers.[0].aws.region</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="string">string</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>maxLength: <code>64</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Region used to lookup secrets with AWS SecretManager</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_secret_providers.[0].env" to="#kafka_connect_secret_providers.[0].env">
                  <strong>kafka_connect_secret_providers.[0].env</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="object">object</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>required: <code>secrets</code></li>
              </ul>
            </div>

              <div className="description">
                <p>ENV secret provider configuration</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_connect_secret_providers.[0].env.secrets" to="#kafka_connect_secret_providers.[0].env.secrets">
                  <strong>kafka_connect_secret_providers.[0].env.secrets</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="object">object</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
              </ul>
            </div>

              <div className="description">
                <p>Key/value map of secrets for ENV secret provider</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_diskless" to="#kafka_diskless">
                  <strong>kafka_diskless</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="object">object</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>required: <code>enabled</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Kafka Diskless configuration values</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_diskless.enabled" to="#kafka_diskless.enabled">
                  <strong>kafka_diskless.enabled</strong>
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
                <p>Whether to enable the Diskless functionality</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="inkless" to="#inkless">
                  <strong>inkless</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="object">object</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>required: <code>enabled</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Inkless configuration values</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="inkless.enabled" to="#inkless.enabled">
                  <strong>inkless.enabled</strong>
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
                <p>Whether to enable the Inkless functionality</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="sasl_oauthbearer_allowed_urls" to="#sasl_oauthbearer_allowed_urls">
                  <strong>sasl_oauthbearer_allowed_urls</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="array[string]">array[string]</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
              </ul>
            </div>

              <div className="description">
                <p>List of allowed URLs for SASL OAUTHBEARER authentication. Only HTTPS URLs are allowed for security reasons.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="gcp_auth_allowed_urls" to="#gcp_auth_allowed_urls">
                  <strong>gcp_auth_allowed_urls</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="array[string]">array[string]</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
              </ul>
            </div>

              <div className="description">
                <p>Allow-list of HTTPS URLs used to validate GCP credential_source requests for Kafka Connect.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_rest" to="#kafka_rest">
                  <strong>kafka_rest</strong>
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
                <p>Enable Kafka-REST service</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_version" to="#kafka_version">
                  <strong>kafka_version</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="string,null">string,null</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>enum: <code>3.8,3.9,4.0,4.1</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Kafka major version</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="schema_registry" to="#schema_registry">
                  <strong>schema_registry</strong>
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
                <p>Enable Schema-Registry service</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_rest_authorization" to="#kafka_rest_authorization">
                  <strong>kafka_rest_authorization</strong>
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
                <p>Enable authorization in Kafka-REST service</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_rest_config" to="#kafka_rest_config">
                  <strong>kafka_rest_config</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="object">object</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
              </ul>
            </div>

              <div className="description">
                <p>Kafka REST configuration</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_rest_config.producer_acks" to="#kafka_rest_config.producer_acks">
                  <strong>kafka_rest_config.producer_acks</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="string">string</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>enum: <code>all,-1,0,1</code></li>
                  <li>default: <code>1</code></li>
              </ul>
            </div>

              <div className="description">
                <p>The number of acknowledgments the producer requires the leader to have received before considering a request complete. If set to &#x27;all&#x27; or &#x27;-1&#x27;, the leader will wait for the full set of in-sync replicas to acknowledge the record.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_rest_config.producer_compression_type" to="#kafka_rest_config.producer_compression_type">
                  <strong>kafka_rest_config.producer_compression_type</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="string">string</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>enum: <code>gzip,snappy,lz4,zstd,none</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Specify the default compression type for producers. This configuration accepts the standard compression codecs (&#x27;gzip&#x27;, &#x27;snappy&#x27;, &#x27;lz4&#x27;, &#x27;zstd&#x27;). It additionally accepts &#x27;none&#x27; which is the default and equivalent to no compression.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_rest_config.producer_linger_ms" to="#kafka_rest_config.producer_linger_ms">
                  <strong>kafka_rest_config.producer_linger_ms</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>0</code></li>
                  <li>max: <code>5000</code></li>
                  <li>default: <code>0</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Wait for up to the given delay to allow batching records together</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_rest_config.producer_max_request_size" to="#kafka_rest_config.producer_max_request_size">
                  <strong>kafka_rest_config.producer_max_request_size</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>0</code></li>
                  <li>max: <code>2147483647</code></li>
                  <li>default: <code>1048576</code></li>
              </ul>
            </div>

              <div className="description">
                <p>The maximum size of a request in bytes. Note that Kafka broker can also cap the record batch size.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_rest_config.consumer_enable_auto_commit" to="#kafka_rest_config.consumer_enable_auto_commit">
                  <strong>kafka_rest_config.consumer_enable_auto_commit</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="boolean">boolean</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>default: <code>true</code></li>
              </ul>
            </div>

              <div className="description">
                <p>If true the consumer&#x27;s offset will be periodically committed to Kafka in the background</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_rest_config.consumer_idle_disconnect_timeout" to="#kafka_rest_config.consumer_idle_disconnect_timeout">
                  <strong>kafka_rest_config.consumer_idle_disconnect_timeout</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>0</code></li>
                  <li>max: <code>2147483647</code></li>
                  <li>default: <code>0</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Specifies the maximum duration (in seconds) a client can remain idle before it is deleted. If a consumer is inactive, it will exit the consumer group, and its state will be discarded. A value of 0 (default) indicates that the consumer will not be disconnected automatically due to inactivity.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_rest_config.consumer_request_max_bytes" to="#kafka_rest_config.consumer_request_max_bytes">
                  <strong>kafka_rest_config.consumer_request_max_bytes</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>0</code></li>
                  <li>max: <code>671088640</code></li>
                  <li>default: <code>67108864</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Maximum number of bytes in unencoded message keys and values by a single request</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_rest_config.consumer_request_timeout_ms" to="#kafka_rest_config.consumer_request_timeout_ms">
                  <strong>kafka_rest_config.consumer_request_timeout_ms</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>1000</code></li>
                  <li>max: <code>30000</code></li>
                  <li>enum: <code>1000,15000,30000</code></li>
                  <li>default: <code>1000</code></li>
              </ul>
            </div>

              <div className="description">
                <p>The maximum total time to wait for messages for a request if the maximum number of messages has not yet been reached</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_rest_config.name_strategy" to="#kafka_rest_config.name_strategy">
                  <strong>kafka_rest_config.name_strategy</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="string">string</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>enum: <code>topic_name,record_name,topic_record_name</code></li>
                  <li>default: <code>topic_name</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Name strategy to use when selecting subject for storing schemas</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_rest_config.name_strategy_validation" to="#kafka_rest_config.name_strategy_validation">
                  <strong>kafka_rest_config.name_strategy_validation</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="boolean">boolean</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>default: <code>true</code></li>
              </ul>
            </div>

              <div className="description">
                <p>If true, validate that given schema is registered under expected subject name by the used name strategy when producing messages.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="kafka_rest_config.simpleconsumer_pool_size_max" to="#kafka_rest_config.simpleconsumer_pool_size_max">
                  <strong>kafka_rest_config.simpleconsumer_pool_size_max</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="integer">integer</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>min: <code>10</code></li>
                  <li>max: <code>250</code></li>
                  <li>default: <code>25</code></li>
              </ul>
            </div>

              <div className="description">
                <p>Maximum number of SimpleConsumers that can be instantiated per broker</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="tiered_storage" to="#tiered_storage">
                  <strong>tiered_storage</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="object">object</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
              </ul>
            </div>

              <div className="description">
                <p>Tiered storage configuration</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="tiered_storage.enabled" to="#tiered_storage.enabled">
                  <strong>tiered_storage.enabled</strong>
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
                <p>Whether to enable the tiered storage functionality</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="schema_registry_config" to="#schema_registry_config">
                  <strong>schema_registry_config</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="object">object</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
              </ul>
            </div>

              <div className="description">
                <p>Schema Registry configuration</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="schema_registry_config.topic_name" to="#schema_registry_config.topic_name">
                  <strong>schema_registry_config.topic_name</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="string">string</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                  <li>maxLength: <code>249</code></li>
              </ul>
            </div>

              <div className="description">
                <p>The durable single partition topic that acts as the durable log for the data. This topic must be compacted to avoid losing data due to retention policy. Please note that changing this configuration in an existing Schema Registry / Karapace setup leads to previous schemas being inaccessible, data encoded with them potentially unreadable and schema ID sequence put out of order. It&#x27;s only possible to do the switch while Schema Registry / Karapace is disabled. Defaults to &#x60;_schemas&#x60;.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="schema_registry_config.leader_eligibility" to="#schema_registry_config.leader_eligibility">
                  <strong>schema_registry_config.leader_eligibility</strong>
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
                <p>If true, Karapace / Schema Registry on the service nodes can participate in leader election. It might be needed to disable this when the schemas topic is replicated to a secondary cluster and Karapace / Schema Registry there must not participate in leader election. Defaults to &#x60;true&#x60;.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="schema_registry_config.schema_reader_strict_mode" to="#schema_registry_config.schema_reader_strict_mode">
                  <strong>schema_registry_config.schema_reader_strict_mode</strong>
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
                <p>If enabled, causes the Karapace schema-registry service to shutdown when there are invalid schema records in the &#x60;_schemas&#x60; topic. Defaults to &#x60;false&#x60;.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="schema_registry_config.retriable_errors_silenced" to="#schema_registry_config.retriable_errors_silenced">
                  <strong>schema_registry_config.retriable_errors_silenced</strong>
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
                <p>If enabled, kafka errors which can be retried or custom errors specified for the service will not be raised, instead, a warning log is emitted. This will denoise issue tracking systems, i.e. sentry. Defaults to &#x60;true&#x60;.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="aiven_kafka_topic_messages" to="#aiven_kafka_topic_messages">
                  <strong>aiven_kafka_topic_messages</strong>
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
                <p>Allow access to read Kafka topic messages in the Aiven Console and REST API.</p>
              </div>
        </td>
      </tr>
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="enable_ipv6" to="#enable_ipv6">
                  <strong>enable_ipv6</strong>
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
                <p>Register AAAA DNS records for the service, and allow IPv6 packets to service ports</p>
              </div>
        </td>
      </tr>
  </tbody>
</table>
