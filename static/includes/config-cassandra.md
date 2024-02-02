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

## cassandra

**Title:** cassandra configuration values


**Type:** `object`

### batch_size_warn_threshold_in_kb

**Title:** batch_size_warn_threshold_in_kb

**Description:** Log a warning message on any multiple-partition batch size exceeding this value.5kb per batch by default.Caution should be taken on increasing the size of this thresholdas it can lead to node instability.

**Type:** `integer`

### batch_size_fail_threshold_in_kb

**Title:** batch_size_fail_threshold_in_kb

**Description:** Fail any multiple-partition batch exceeding this value. 50kb (10x warn threshold) by default.

**Type:** `integer`

### datacenter

**Title:** Cassandra datacenter name

**Description:** Name of the datacenter to which nodes of this service belong. Can be set only when creating the service.

**Type:** `string`

## migrate_sstableloader

**Title:** Migration mode for the sstableloader utility

**Description:** Sets the service into migration mode enabling the sstableloader utility to be used to upload Cassandra data files. Available only on service create.

**Type:** `boolean`

## service_to_join_with

**Title:** Name of the service to form a bigger cluster with

**Description:** When bootstrapping, instead of creating a new Cassandra cluster try to join an existing one from another service. Can only be set on service creation.

**Type:** `string`

## cassandra_version

**Title:** Cassandra version


**Type:** `string,null`

## private_access

**Title:** Allow access to selected service ports from private networks


**Type:** `object`

### prometheus

**Title:** Allow clients to connect to prometheus with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations


**Type:** `boolean`

## public_access

**Title:** Allow access to selected service ports from the public Internet


**Type:** `object`

### prometheus

**Title:** Allow clients to connect to prometheus from the public internet for service nodes that are in a project VPC or another type of private network


**Type:** `boolean`

## service_to_fork_from

**Title:** Name of another service to fork from. This has effect only when a new service is being created.


**Type:** `string,null`

## project_to_fork_from

**Title:** Name of another project to fork a service from. This has effect only when a new service is being created.


**Type:** `string,null`

## backup_hour

**Title:** The hour of day (in UTC) when backup for the service is started. New backup is only started if previous backup has already completed.


**Type:** `integer,null`

## backup_minute

**Title:** The minute of an hour when backup for the service is started. New backup is only started if previous backup has already completed.


**Type:** `integer,null`

    