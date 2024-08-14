---
title: Extensions on Aiven for PostgreSQL®
sidebar_label: Extensions
---

PostgreSQL® extensions allow you to extend the functionality by adding more capabilities to your Aiven for PostgreSQL.

:::important
Some extensions:

- Have dependencies and need to be created in a predetermined order.
- Require resetting the client connection before they are fully available.

:::

To list the extensions and their details, such as extension version numbers,
run `select * from pg_available_extensions` in your Aiven for PostgreSQL server.

:::note
Not all extensions listed in `pg_available_extensions` can be installed. See
[Superuser-only extensions](/docs/products/postgresql/reference/list-of-extensions#avn_superuser_only_extensions)
for more information.
:::

## Data types

<!-- vale off -->

-   [citext](https://www.postgresql.org/docs/current/citext). Data
    type for case-insensitive character strings.
-   [cube](https://www.postgresql.org/docs/current/cube). Data type
    for multidimensional cubes.
-   [hll](https://github.com/citusdata/postgresql-hll). Type for storing
    `hyperloglog` data. `PG11 and newer`
-   [hstore](https://www.postgresql.org/docs/current/hstore). Data
    type for storing sets of (key, value) pairs.
-   [isn](https://www.postgresql.org/docs/current/isn). Data types
    for international product numbering standards.
-   [ltree](https://www.postgresql.org/docs/current/ltree). Data
    type for hierarchical tree-like structures.
-   [pgvector](https://github.com/pgvector/pgvector). Type for vector
    similarity search. `PG13 and newer`
-   [seg](https://www.postgresql.org/docs/current/seg). Data type
    for representing line segments or floating-point intervals.
-   [timescaledb](https://github.com/timescale/timescaledb). Enables
    scalable inserts and complex queries for time-series data.
-   [unit](https://github.com/df7cb/postgresql-unit). SI units
    extension.
-   [uuid-ossp](https://www.postgresql.org/docs/current/uuid-ossp).
    Generate universally unique identifiers (UUIDs).

## Search and text handling

-   [bloom](https://www.postgresql.org/docs/current/bloom). Bloom
    access method - signature file based index.
-   [btree_gin](https://www.postgresql.org/docs/current/btree-gin).
    Support for indexing common data types in GIN.
-   [btree_gist](https://www.postgresql.org/docs/current/btree-gist).
    Support for indexing common data types in GiST.
-   [dict_int](https://www.postgresql.org/docs/current/dict-int).
    Text search dictionary template for integers.
-   [fuzzystrmatch](https://www.postgresql.org/docs/current/fuzzystrmatch).
    Determine similarities and distance between strings.
-   [pg_similarity](https://github.com/eulerto/pg_similarity). Support
    similarity queries. `PG13 and newer`
-   [pg_trgm](https://www.postgresql.org/docs/current/pgtrgm). Text
    similarity measurement and index searching based on trigrams.
-   [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto).
    Cryptographic functions.
-   [rum](https://github.com/postgrespro/rum). RUM index access method.
-   [unaccent](https://www.postgresql.org/docs/current/unaccent).
    Text search dictionary that removes accents.

## Auditing

-   [tcn](https://www.postgresql.org/docs/current/tcn). Triggered
    change notifications.

## Geographical features

-   [address_standardizer](https://postgis.net/docs/standardize_address).
    Used to parse an address into constituent elements. Generally used
    to support geocoding address normalization step.
-   [address_standardizer_data_us](https://postgis.net/docs/standardize_address).
    `Address standardizer` US dataset example.
-   [earthdistance](https://www.postgresql.org/docs/current/earthdistance).
    Calculate great-circle distances on the surface of the Earth.
-   [h3](https://github.com/zachasme/h3-pg). PostgreSQL bindings for H3, a hierarchical
    hexagonal geospatial indexing system.
-   [h3_postgis](https://github.com/zachasme/h3-pg). H3 PostGIS integration.
-   [pgrouting](https://github.com/pgRouting/pgrouting). Extends the
    PostGIS/PostgreSQL geospatial database to provide geospatial routing
    and other network analysis functionality.
-   [postgis](https://postgis.net/). PostGIS geometry and geography
    spatial types and functions.
-   [postgis_legacy](https://postgis.net/). Legacy functions for
    PostGIS.
-   [postgis_raster](https://postgis.net/docs/RT_reference).
    PostGIS raster types and functions.
-   [postgis_sfcgal](http://postgis.net/docs/reference#reference_sfcgal).
    PostGIS SFCGAL functions.
-   [postgis_tiger_geocoder](https://postgis.net/docs/Extras#Tiger_Geocoder).
    PostGIS tiger geocoder and reverse geocoder.
-   [postgis_topology](https://postgis.net/docs/Topology). PostGIS
    topology spatial types and functions.

## Procedural language

-   [plperl](https://www.postgresql.org/docs/current/plperl).
    PL/Perl procedural language.
-   [plpgsql](https://www.postgresql.org/docs/current/plpgsql).
    PL/pgSQL procedural language.

## Connectivity

-   [dblink](https://www.postgresql.org/docs/current/contrib-dblink-function).
    Connect to other PostgreSQL databases from within a database.
-   [postgres_fdw](https://www.postgresql.org/docs/current/postgres-fdw).
    Foreign-data wrapper for remote PostgreSQL servers.

## Utilities

-   [aiven_extras](https://github.com/aiven/aiven-extras). This
    extension is meant for use in environments where you want
    non-superusers to be able to use certain database features.
-   [bool_plperl](https://www.postgresql.org/docs/current/plperl-funcs).
    Transform between `bool` and `plperl`.
    `PG13 and newer`
-   [intagg](https://www.postgresql.org/docs/current/intagg).
    Integer aggregator and enumerator (obsolete).
-   [intarray](https://www.postgresql.org/docs/current/intarray).
    Functions, operators, and index support for 1-D arrays of integers.
-   [jsonb_plperl](https://www.postgresql.org/docs/current/datatype-json).
    Transform between `jsonb` and `plperl`.
-   [lo](https://www.postgresql.org/docs/current/lo). Large Object
    maintenance.
-   [pageinspect](https://www.postgresql.org/docs/current/pageinspect).
    Inspect the contents of database pages at a low level.
-   [pg_buffercache](https://www.postgresql.org/docs/current/pgbuffercache).
    Examine the shared buffer cache.
-   [pg_cron](https://github.com/citusdata/pg_cron). Job scheduler for
    PostgreSQL.
-   [pg_partman](https://github.com/pgpartman/pg_partman). Extension to
    manage partitioned tables by time or ID.
-   [pg_prewarm](https://www.postgresql.org/docs/current/pgprewarm).
    Prewarm relation data. `PG11 and newer`
-   [pg_prometheus](https://github.com/timescale/pg_prometheus).
    Prometheus metrics for PostgreSQL.
    `PG12 and earlier`
-   [pg_repack](https://pgxn.org/dist/pg_repack/1.4.6/). Reorganize
    tables in PostgreSQL databases with minimal locks.
-   [pg_stat_statements](https://www.postgresql.org/docs/current/pgstatstatements).
    Track planning and execution statistics of all SQL statements
    executed.
-   [pgrowlocks](https://www.postgresql.org/docs/current/pgrowlocks).
    Show row-level locking information.
-   [pgstattuple](https://www.postgresql.org/docs/current/pgstattuple).
    Show tuple-level statistics.
-   [sslinfo](https://www.postgresql.org/docs/current/sslinfo).
    Information about SSL certificates.
-   [tablefunc](https://www.postgresql.org/docs/current/tablefunc).
    Functions that manipulate whole tables, including `crosstab`.
-   [timetravel](https://www.postgresql.org/docs/6.3/c0503.htm).
    Functions for implementing time travel.
    `PG11 and earlier`
-   [tsm_system_rows](https://www.postgresql.org/docs/current/tsm-system-rows).
    TABLESAMPLE method which accepts number of rows as a limit.
-   [tsm_system_time](https://www.postgresql.org/docs/current/tsm-system-time).
    TABLESAMPLE method which accepts time in milliseconds as a limit.

## Superuser-only extensions {#avn_superuser_only_extensions}

The following extensions can only be installed by superusers, **and are
not generally available**.

-   [amcheck](https://www.postgresql.org/docs/current/amcheck).
    Functions for verifying relation integrity.
-   [autoinc](https://www.postgresql.org/docs/current/contrib-spi).
    Functions for auto-incrementing fields.
    `PG13 and newer`
-   [dict_xsyn](https://www.postgresql.org/docs/current/dict-xsyn).
    Text search dictionary template for extended synonym processing.
-   [file_fdw](https://www.postgresql.org/docs/current/file-fdw).
    Foreign-data wrapper for flat file access.
-   [hstore_plperl](https://www.postgresql.org/docs/current/hstore).
    Transform between `hstore` and `plperl`.
-   [insert_username](https://www.postgresql.org/docs/current/contrib-spi).
    Functions for tracking who changed a table.
-   [moddatetime](https://www.postgresql.org/docs/10/contrib-spi).
    Functions for tracking last modification time.
-   [old_snapshot](https://www.postgresql.org/docs/current/oldsnapshot).
    Utilities in support of old_snapshot_threshold.
    `PG14 only`
-   [pageinspect](https://www.postgresql.org/docs/current/pageinspect).
    Inspect the contents of database pages at a low level.
-   [pg_freespacemap](https://www.postgresql.org/docs/current/pgfreespacemap).
    Examine the free space map (FSM).
-   [pg_surgery](https://www.postgresql.org/docs/current/pgsurgery).
    Extension to perform surgery on a damaged relation.
    `PG14 only`
-   [pg_visibility](https://www.postgresql.org/docs/current/pgvisibility).
    Examine the visibility map (VM) and page-level visibility info.
-   [refint](https://www.postgresql.org/docs/current/contrib-spi).
    Functions for implementing referential integrity (obsolete).

<!-- vale off -->
