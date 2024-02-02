## custom_domain

**Title:** Custom domain

**Description:** Serve the web frontend using a custom CNAME pointing to the Aiven DNS name

**Type:** `string,null`

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

### influxdb

**Title:** Allow clients to connect to influxdb with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations


**Type:** `boolean`

## privatelink_access

**Title:** Allow access to selected service components through Privatelink


**Type:** `object`

### influxdb

**Title:** Enable influxdb


**Type:** `boolean`

## public_access

**Title:** Allow access to selected service ports from the public Internet


**Type:** `object`

### influxdb

**Title:** Allow clients to connect to influxdb from the public internet for service nodes that are in a project VPC or another type of private network


**Type:** `boolean`

## recovery_basebackup_name

**Title:** Name of the basebackup to restore in forked service


**Type:** `string`

## influxdb

**Title:** influxdb.conf configuration values


**Type:** `object`

### query_log_enabled

**Title:** Whether queries should be logged before execution. May log sensitive data contained within a query.


**Type:** `boolean`

### log_queries_after

**Title:** The maximum duration in seconds before a query is logged as a slow query. Setting this to 0 (the default) will never log slow queries.


**Type:** `integer`

### max_row_limit

**Title:** The maximum number of rows returned in a non-chunked query. Setting this to 0 (the default) allows an unlimited number to be returned.


**Type:** `integer`

### max_select_buckets

**Title:** The maximum number of `GROUP BY time()` buckets that can be processed in a query. Setting this to 0 (the default) allows an unlimited number to be processed.


**Type:** `integer`

### max_select_point

**Title:** The maximum number of points that can be processed in a SELECT statement. Setting this to 0 (the default) allows an unlimited number to be processed.


**Type:** `integer`

### query_timeout

**Title:** The maximum duration in seconds before a query is killed. Setting this to 0 (the default) will never kill slow queries.


**Type:** `integer`

### max_connection_limit

**Title:** Maximum number of connections to InfluxDB. Setting this to 0 (default) means no limit. If using max_connection_limit, it is recommended to set the value to be large enough in order to not block clients unnecessarily.


**Type:** `integer`

## service_to_fork_from

**Title:** Name of another service to fork from. This has effect only when a new service is being created.


**Type:** `string,null`

## project_to_fork_from

**Title:** Name of another project to fork a service from. This has effect only when a new service is being created.


**Type:** `string,null`

    