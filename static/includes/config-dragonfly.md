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

## private_access

**Title:** Allow access to selected service ports from private networks


**Type:** `object`

### prometheus

**Title:** Allow clients to connect to prometheus with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations


**Type:** `boolean`

### dragonfly

**Title:** Allow clients to connect to dragonfly with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations


**Type:** `boolean`

## privatelink_access

**Title:** Allow access to selected service components through Privatelink


**Type:** `object`

### prometheus

**Title:** Enable prometheus


**Type:** `boolean`

### dragonfly

**Title:** Enable dragonfly


**Type:** `boolean`

## public_access

**Title:** Allow access to selected service ports from the public Internet


**Type:** `object`

### prometheus

**Title:** Allow clients to connect to prometheus from the public internet for service nodes that are in a project VPC or another type of private network


**Type:** `boolean`

### dragonfly

**Title:** Allow clients to connect to dragonfly from the public internet for service nodes that are in a project VPC or another type of private network


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

## recovery_basebackup_name

**Title:** Name of the basebackup to restore in forked service


**Type:** `string`

## dragonfly_ssl

**Title:** Require SSL to access Dragonfly


**Type:** `boolean`

## cache_mode

**Title:** Evict entries when getting close to maxmemory limit


**Type:** `boolean`

## service_to_fork_from

**Title:** Name of another service to fork from. This has effect only when a new service is being created.


**Type:** `string,null`

## project_to_fork_from

**Title:** Name of another project to fork a service from. This has effect only when a new service is being created.


**Type:** `string,null`

## dragonfly_persistence

**Title:** Dragonfly persistence

**Description:** When persistence is 'rdb', Dragonfly does RDB dumps every 10 minutes. Also, RDB dumps are done according to the backup schedule for backup purposes.  If 'persistence' is off,  no backups or RDB dumps are created, and data may be lost if the service restarts or shuts down. Additionally, the service can't be forked.

**Type:** `string`

    
