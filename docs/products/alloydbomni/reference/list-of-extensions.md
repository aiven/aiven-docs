---
title: Extensions for Aiven for AlloyDB Omni
sidebar_label: Extensions
---

Aiven for AlloyDB Omni extensions enhance capabilities of your service by adding advanced
functionalities such as performance optimizations or additional data types.

## List supported extensions

To list the extensions and their details, such as extension version numbers,
connect to your service and run:

```sql
SELECT *
FROM pg_available_extensions;
```

## Limitations

- Some extensions have dependencies and need to be created in a predetermined order.
- Some extensions require resetting the client connection before they are fully available.

## Supported extensions

Aiven for AlloyDB Omni supports
[AlloyDB for PostgreSQL extensions](https://cloud.google.com/alloydb/docs/reference/extensions)
with [a few exceptions](/docs/products/alloydbomni/reference/list-of-extensions#exceptions-unsupported-extensions).

## Exceptions: unsupported extensions

Aiven for AlloyDB Omni **does NOT support** the following extensions:

- `address_standardizer_data_us`
- `address_standardizer`
- `anon`
- `pageinspect`
- `pg_bigm`
- `pg_cron`
- `pg_proctab`
- `pg_squeeze`
- `pg_wait_sampling`
- `pgaudit`
- `pgfincore`
- `pglogical`
- `postgis_raster`
- `postgis_sfcgal`
- `postgis_tiger_geocoder`
- `postgis_topology`
- `postgis`
