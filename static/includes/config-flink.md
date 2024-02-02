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

## flink_version

**Title:** Flink major version


**Type:** `string,null`

## number_of_task_slots

**Title:** Flink taskmanager.numberOfTaskSlots

**Description:** Task slots per node. For a 3 node plan, total number of task slots is 3x this value

**Type:** `integer`

## privatelink_access

**Title:** Allow access to selected service components through Privatelink


**Type:** `object`

### flink

**Title:** Enable flink


**Type:** `boolean`

### prometheus

**Title:** Enable prometheus


**Type:** `boolean`

    