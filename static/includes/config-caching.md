## additional_backup_regions

**Title:** Additional Cloud Regions for Backup Replication


**Type:** `array`

## ip_filter

**Title:** IP filter

**Description:** Allow incoming connections from CIDR address block, e.g. '10.20.0.0/16'

**Type:** `array`

## service_log

**Title:** Service logging

**Description:** Store logs for the service so that they are available in the HTTP API and console.

**Type:** `boolean,null`

## static_ips

**Title:** Static IP addresses

**Description:** Use static public IP addresses

**Type:** `boolean`

## migration

**Title:** Migrate data from existing server


**Type:** `object,null`

### host

**Title:** Hostname or IP address of the server where to migrate data from


**Type:** `string`

### port

**Title:** Port number of the server where to migrate data from


**Type:** `integer`

### password

**Title:** Password for authentication with the server where to migrate data from


**Type:** `string`

### ssl

**Title:** The server where to migrate data from is secured with SSL


**Type:** `boolean`

### username

**Title:** User name for authentication with the server where to migrate data from


**Type:** `string`

### dbname

**Title:** Database name for bootstrapping the initial connection


**Type:** `string`

### ignore_dbs

**Title:** Comma-separated list of databases, which should be ignored during migration (supported by MySQL and PostgreSQL only at the moment)


**Type:** `string`

### method

**Title:** The migration method to be used (currently supported only by Redis, Dragonfly, MySQL and PostgreSQL service types)


**Type:** `string`

## private_access

**Title:** Allow access to selected service ports from private networks


**Type:** `object`

### prometheus

**Title:** Allow clients to connect to prometheus with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations


**Type:** `boolean`

### redis

**Title:** Allow clients to connect to redis with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations


**Type:** `boolean`

## privatelink_access

**Title:** Allow access to selected service components through Privatelink


**Type:** `object`

### prometheus

**Title:** Enable prometheus


**Type:** `boolean`

### redis

**Title:** Enable redis


**Type:** `boolean`

## public_access

**Title:** Allow access to selected service ports from the public Internet


**Type:** `object`

### prometheus

**Title:** Allow clients to connect to prometheus from the public internet for service nodes that are in a project VPC or another type of private network


**Type:** `boolean`

### redis

**Title:** Allow clients to connect to redis from the public internet for service nodes that are in a project VPC or another type of private network


**Type:** `boolean`

## recovery_basebackup_name

**Title:** Name of the basebackup to restore in forked service


**Type:** `string`

## redis_maxmemory_policy

**Title:** Redis maxmemory-policy


**Type:** `string,null`

## redis_pubsub_client_output_buffer_limit

**Title:** Pub/sub client output buffer hard limit in MB

**Description:** Set output buffer limit for pub / sub clients in MB. The value is the hard limit, the soft limit is 1/4 of the hard limit. When setting the limit, be mindful of the available memory in the selected service plan.

**Type:** `integer`

## redis_number_of_databases

**Title:** Number of Redis databases

**Description:** Set number of Redis databases. Changing this will cause a restart of the Redis service.

**Type:** `integer`

## redis_io_threads

**Title:** Redis IO thread count

**Description:** Set Redis IO thread count. Changing this will cause a restart of the Redis service.

**Type:** `integer`

## redis_lfu_log_factor

**Title:** Counter logarithm factor for volatile-lfu and allkeys-lfu maxmemory-policies


**Type:** `integer`

## redis_lfu_decay_time

**Title:** LFU maxmemory-policy counter decay time in minutes


**Type:** `integer`

## redis_ssl

**Title:** Require SSL to access Redis


**Type:** `boolean`

## redis_timeout

**Title:** Redis idle connection timeout in seconds


**Type:** `integer`

## redis_notify_keyspace_events

**Title:** Set notify-keyspace-events option


**Type:** `string`

## redis_persistence

**Title:** Redis persistence

**Description:** When persistence is 'rdb', Redis does RDB dumps each 10 minutes if any key is changed. Also RDB dumps are done according to backup schedule for backup purposes. When persistence is 'off', no RDB dumps and backups are done, so data can be lost at any moment if service is restarted for any reason, or if service is powered off. Also service can't be forked.

**Type:** `string`

## redis_acl_channels_default

**Title:** Default ACL for pub/sub channels used when Redis user is created

**Description:** Determines default pub/sub channels' ACL for new users if ACL is not supplied. When this option is not defined, all_channels is assumed to keep backward compatibility. This option doesn't affect Redis configuration acl-pubsub-default.

**Type:** `string`

## redis_version

**Title:** Redis major version


**Type:** `string,null`

## service_to_fork_from

**Title:** Name of another service to fork from. This has effect only when a new service is being created.


**Type:** `string,null`

## project_to_fork_from

**Title:** Name of another project to fork a service from. This has effect only when a new service is being created.


**Type:** `string,null`

    