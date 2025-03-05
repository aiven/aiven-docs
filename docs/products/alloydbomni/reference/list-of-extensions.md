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
- Most of superuser-only and untrusted extensions listed in `pg_available_extensions`
  cannot be installed.

  - To list superuser-only and untrusted extensions **available for installation**, run

    ```sql
    SELECT *
    FROM pg_available_extension_versions
    WHERE name = ANY(string_to_array(current_setting('extwlist.extensions'), ','));
    ```

  - To list all superuser-only and untrusted extensions, run

    ```sql
    SELECT name, version
    FROM pg_available_extension_versions
    WHERE superuser AND NOT trusted
    ```

## List of extensions

<!-- vale off -->

### Data types

-   [citext](https://www.postgresql.org/docs/current/citext.html): Data
    type for case-insensitive character strings
-   [cube](https://www.postgresql.org/docs/current/cube.html): Data type
    for multidimensional cubes
-   [hstore](https://www.postgresql.org/docs/current/hstore.html): Data
    type for storing sets of (key, value) pairs
-   [ip4r](https://github.com/RhodiumToad/ip4r): Provides data types for IPv4/v6 addresses,
    and address ranges, plus index support
-   [isn](https://www.postgresql.org/docs/current/isn.html): Data types
    for international product numbering standards
-   [ltree](https://www.postgresql.org/docs/current/ltree.html): Data
    type for hierarchical tree-like structures
-   [pgvector](https://github.com/pgvector/pgvector): Type for vector
    similarity search; `PG13 and newer`
-   [postgresql-hll](https://github.com/citusdata/postgresql-hll): Type for storing
    `hyperloglog` data; `PG11 and newer`
-   [uuid-ossp](https://www.postgresql.org/docs/current/uuid-ossp.html):
    Generate universally unique identifiers (UUIDs)

### Search and text handling

-   [bloom](https://www.postgresql.org/docs/current/bloom.html): Bloom
    access method - signature file based index
-   [btree_gin](https://www.postgresql.org/docs/current/btree-gin.html):
    Support for indexing common data types in GIN
-   [btree_gist](https://www.postgresql.org/docs/current/btree-gist.html):
    Support for indexing common data types in GiST
-   [dict_int](https://www.postgresql.org/docs/current/dict-int.html):
    Text search dictionary template for integers
-   [fuzzystrmatch](https://www.postgresql.org/docs/current/fuzzystrmatch.html):
    Determine similarities and distance between strings
-   [pg_bigm](https://pgbigm.osdn.jp/pg_bigm_en-1-2.html): Provides full text search
    capability in PostgreSQL using 2-gram (bigram) indexes for faster full text searches
-   [pg_similarity](https://github.com/eulerto/pg_similarity): Support
    similarity queries; `PG13 and newer`
-   [pg_trgm](https://www.postgresql.org/docs/current/pgtrgm.html): Text
    similarity measurement and index searching based on trigrams
-   [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html):
    Cryptographic functions
-   [unaccent](https://www.postgresql.org/docs/current/unaccent.html):
    Text search dictionary that removes accents

### Auditing

-   [tcn](https://www.postgresql.org/docs/current/tcn.html): Triggered
    change notifications

### Geographical features

-   [earthdistance](https://www.postgresql.org/docs/current/earthdistance.html):
    Calculate great-circle distances on the surface of the Earth

### Procedural language

- [plpgsql](https://www.postgresql.org/docs/current/plpgsql.html):
  PL/pgSQL procedural language
- [plproxy](https://plproxy.github.io/): Procedural language handler that allows remote
  procedure calls among PostgreSQL databases
- [plv8](https://plv8.github.io/): Provides a procedural language for enabling JavaScript

### Connectivity

-   [dblink](https://www.postgresql.org/docs/current/contrib-dblink-function.html):
    Connect to other AlloyDB Omni databases from within a database
-   [postgres_fdw](https://www.postgresql.org/docs/current/postgres-fdw.html):
    Foreign-data wrapper for remote AlloyDB Omni servers

### Utilities

- [amcheck](https://www.postgresql.org/docs/current/amcheck.html): Tools to verify table
  and index consistency
- [auto_explain](https://www.postgresql.org/docs/current/auto-explain.html): Log execution
  plans of slow queries
- [autoinc](https://www.postgresql.org/docs/17/contrib-spi.html#CONTRIB-SPI-AUTOINC):
  Function for autoincrementing fields that stores the next value of a sequence into an
  integer field
- [google_columnar_engine](https://cloud.google.com/alloydb/docs/reference/columnar-engine-flags):
  Adds support for
  [the columnar engine](https://cloud.google.com/alloydb/docs/columnar-engine/about)
- [google_db_advisor](https://cloud.google.com/alloydb/docs/use-index-advisor): Provides
  the index advisor, which recommends indexes to speed up query processing
- [google_ml_integration](https://cloud.google.com/alloydb/docs/ai/invoke-predictions):
  Allows interacting with Vertex AI, registering AI model endpoints, generating embeddings,
  and invoking predictions within your SQL environment
- [hypopg](https://github.com/HypoPG/hypopg): Adds support for hypothetical (virtual)
  indexes
- [insert_username](https://www.postgresql.org/docs/current/contrib-spi.html#CONTRIB-SPI-INSERT-USERNAME):
  Functions for tracking who changed a table
- [intagg](https://www.postgresql.org/docs/current/intagg.html).
  Integer aggregator and enumerator (obsolete).
- [intarray](https://www.postgresql.org/docs/current/intarray.html):
  Functions, operators, and index support for 1-D arrays of integers
- [lo](https://www.postgresql.org/docs/current/lo.html): Large Object
  maintenance
- [moddatetime](https://www.postgresql.org/docs/current/contrib-spi.html#CONTRIB-SPI-MODDATETIME):
  Functions for tracking last modification time
- [pageinspect](https://www.postgresql.org/docs/current/pageinspect.html):
  Inspect the contents of database pages at a low level
- [pg_buffercache](https://www.postgresql.org/docs/current/pgbuffercache.html):
  Examine the shared buffer cache
- [pg_freespacemap](https://www.postgresql.org/docs/15/pgfreespacemap.html): Examines the
  free space map (FSM)
- [pg_hint_plan](https://github.com/ossc-db/pg_hint_plan#readme): Enables you to improve
  PostgreSQL execution plans using hints, which are simple descriptions in SQL comments
- [pg_partman](https://github.com/pgpartman/pg_partman): Extension to
  manage partitioned tables by time or ID
- [pg_prewarm](https://www.postgresql.org/docs/current/pgprewarm.html):
  Prewarm relation data, `PG11 and newer`
- [pg_proctab](https://gitlab.com/pg_proctab/pg_proctab): Enables you to use pg_top with
  AlloyDB, and generate reports from the operating system process table
- [pg_repack](https://pgxn.org/dist/pg_repack/1.4.6/): Reorganize
  tables in AlloyDB Omni databases with minimal locks
- [pg_stat_statements](https://www.postgresql.org/docs/current/pgstatstatements.html):
  Track planning and execution statistics of all SQL statements
  executed
- [pg_visibility](https://www.postgresql.org/docs/15/pgvisibility.html): Provides a way to
  examine the visibility map (VM) and the page-level visibility information of a table
- [pgfincore](https://github.com/klando/pgfincore): Functions to manage pages in operating
  system disk cache memory from PostgreSQL
- [pgrowlocks](https://www.postgresql.org/docs/current/pgrowlocks.html):
  Show row-level locking information
- [pgstattuple](https://www.postgresql.org/docs/current/pgstattuple.html):
  Show tuple-level statistics
- [pgtap](https://pgtap.org/): Provides a unit testing framework for PostgreSQL, written
  in PL/pgSQL and PL/SQL
- [pgtt](https://github.com/darold/pgtt#readme): Adds support for global temporary tables
  to your databases
- [prefix](https://github.com/dimitri/prefix): Provides prefix-matching and index support
- [refint](https://www.postgresql.org/docs/current/contrib-spi.html#CONTRIB-SPI-REFINT):
  Functions for implementing referential integrity
- [sslinfo](https://www.postgresql.org/docs/current/sslinfo.html):
  Information about SSL certificates
- [tablefunc](https://www.postgresql.org/docs/current/tablefunc.html):
  Functions that manipulate whole tables, including `crosstab`
- [temporal_tables](https://pgxn.org/dist/temporal_tables/): Provides support for temporal
  tables recording the period of time for which a row is valid
- [tsm_system_rows](https://www.postgresql.org/docs/current/tsm-system-rows.html):
  TABLESAMPLE method which accepts number of rows as a limit
- [tsm_system_time](https://www.postgresql.org/docs/current/tsm-system-time.html):
  TABLESAMPLE method which accepts time in milliseconds as a limit

<!-- vale off -->
