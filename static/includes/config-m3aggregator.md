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

## m3_version

**Title:** M3 major version (deprecated, use m3aggregator_version)


**Type:** `string,null`

## m3aggregator_version

**Title:** M3 major version (the minimum compatible version)


**Type:** `string,null`

    