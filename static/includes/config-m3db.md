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

## limits

**Title:** M3 limits


**Type:** `object`

### query_series

**Title:** The maximum number of series fetched in single query.


**Type:** `integer`

### query_docs

**Title:** The maximum number of docs fetched in single query.


**Type:** `integer`

### query_require_exhaustive

**Title:** Require exhaustive result

**Description:** When query limits are exceeded, whether to return error or return partial results.

**Type:** `boolean`

### max_recently_queried_series_disk_bytes_read

**Title:** The maximum number of disk bytes that can be read in a given lookback period.


**Type:** `integer`

### max_recently_queried_series_blocks

**Title:** The maximum number of blocks that can be read in a given lookback period.


**Type:** `integer`

### max_recently_queried_series_lookback

**Title:** The lookback period for 'max_recently_queried_series_blocks' and 'max_recently_queried_series_disk_bytes_read'.


**Type:** `string`

## m3

**Title:** M3 specific configuration options


**Type:** `object`

### tag_options

**Title:** M3 Tag Options


**Type:** `object`

## m3coordinator_enable_graphite_carbon_ingest

**Title:** Enable Graphite ingestion using Carbon plaintext protocol

**Description:** Enables access to Graphite Carbon plaintext metrics ingestion. It can be enabled only for services inside VPCs. The metrics are written to aggregated namespaces only.

**Type:** `boolean`

## private_access

**Title:** Allow access to selected service ports from private networks


**Type:** `object`

### m3coordinator

**Title:** Allow clients to connect to m3coordinator with a DNS name that always resolves to the service's private IP addresses. Only available in certain network locations


**Type:** `boolean`

## public_access

**Title:** Allow access to selected service ports from the public Internet


**Type:** `object`

### m3coordinator

**Title:** Allow clients to connect to m3coordinator from the public internet for service nodes that are in a project VPC or another type of private network


**Type:** `boolean`

## additional_backup_regions

**Title:** Additional Cloud Regions for Backup Replication


**Type:** `array`

## m3_version

**Title:** M3 major version (deprecated, use m3db_version)


**Type:** `string,null`

## m3db_version

**Title:** M3 major version (the minimum compatible version)


**Type:** `string,null`

## namespaces

**Title:** List of M3 namespaces


**Type:** `array`

## rules

**Title:** M3 rules


**Type:** `object`

### mapping

**Title:** List of M3 mapping rules


**Type:** `array`

## service_to_fork_from

**Title:** Name of another service to fork from. This has effect only when a new service is being created.


**Type:** `string,null`

## project_to_fork_from

**Title:** Name of another project to fork a service from. This has effect only when a new service is being created.


**Type:** `string,null`

    