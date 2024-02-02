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

## project_to_fork_from

**Title:** Name of another project to fork a service from. This has effect only when a new service is being created.


**Type:** `string,null`

## private_access

**Title:** Allow access to selected service ports from private networks


**Type:** `object`

### clickhouse

**Title:** Allow clients to connect to clickhouse with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations


**Type:** `boolean`

### clickhouse_https

**Title:** Allow clients to connect to clickhouse_https with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations


**Type:** `boolean`

### clickhouse_mysql

**Title:** Allow clients to connect to clickhouse_mysql with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations


**Type:** `boolean`

### prometheus

**Title:** Allow clients to connect to prometheus with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations


**Type:** `boolean`

## privatelink_access

**Title:** Allow access to selected service components through Privatelink


**Type:** `object`

### clickhouse

**Title:** Enable clickhouse


**Type:** `boolean`

### clickhouse_https

**Title:** Enable clickhouse_https


**Type:** `boolean`

### clickhouse_mysql

**Title:** Enable clickhouse_mysql


**Type:** `boolean`

### prometheus

**Title:** Enable prometheus


**Type:** `boolean`

## public_access

**Title:** Allow access to selected service ports from the public Internet


**Type:** `object`

### clickhouse

**Title:** Allow clients to connect to clickhouse from the public internet for service nodes that are in a project VPC or another type of private network


**Type:** `boolean`

### clickhouse_https

**Title:** Allow clients to connect to clickhouse_https from the public internet for service nodes that are in a project VPC or another type of private network


**Type:** `boolean`

### clickhouse_mysql

**Title:** Allow clients to connect to clickhouse_mysql from the public internet for service nodes that are in a project VPC or another type of private network


**Type:** `boolean`

### prometheus

**Title:** Allow clients to connect to prometheus from the public internet for service nodes that are in a project VPC or another type of private network


**Type:** `boolean`

## service_to_fork_from

**Title:** Name of another service to fork from. This has effect only when a new service is being created.


**Type:** `string,null`

    