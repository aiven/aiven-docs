---
title: Troubleshoot PostGIS® upgrade issues
sidebar_label: PostGIS upgrade
---

import RelatedPages from "@site/src/components/RelatedPages";

Troubleshoot issues that block PostGIS® extension upgrades on Aiven for PostgreSQL® services, and complete the upgrade safely.

## Upgrade PostGIS® to 3.6 with topology columns

Upgrade PostGIS topology columns manually when an Aiven for PostgreSQL® service has `topology.topoelement` or `topology.topoelementarray` columns and a pre-flight check blocks the upgrade from a PostGIS version earlier than 3.6 to 3.6 or later.

This procedure applies only to services that store topology columns, which is a small
subset of PostGIS users. If your databases do not use topology columns, the standard
upgrade process applies and no manual steps are required.

### Why the upgrade is blocked

PostGIS 3.6.0 introduced a breaking change that affects user tables with
`topology.topoelement` or `topology.topoelementarray` columns.

In PostGIS 3.6.0, the base type of the `topology.topoelement` domain changed from
`integer[]` to `bigint[]`. The upgrade script then adds a CHECK constraint that
validates all existing data. When user tables store data in these columns, the
upgrade fails:

1. Existing data was stored as `integer[]`, using 4-byte integers per element.
1. After the domain change, PostgreSQL reinterprets the same byte data as `bigint[]`,
   using 8-byte integers.
1. Array element access returns incorrect values. For example, `ARRAY[1,2]` stored as
   `integer[]` reads as `ARRAY[1,0]` when interpreted as `bigint[]`.
1. The CHECK constraint validation fails, which blocks the extension upgrade.

The Aiven pre-flight check detects these columns and blocks the upgrade **before** any
changes are made to your service, so the service stays in a consistent state. The error
message lists the affected databases, schemas, tables, and columns, references upstream
issue #5983, and directs you to Aiven support. Use this procedure to prepare your
databases, with support assistance, before you retry the upgrade.

When the upgrade fails, you might see:

- `CheckViolation` errors during `ALTER EXTENSION postgis_topology UPDATE`.
- Error messages about invalid topology element references.
- An extension upgrade blocked with an error that mentions topology columns.

### Detect affected tables

Run the following query in each database to identify tables with topology columns:

```sql
SELECT
    n.nspname AS schema_name,
    c.relname AS table_name,
    a.attname AS column_name,
    a.atttypid::pg_catalog.regtype::text AS col_type
FROM pg_catalog.pg_attribute a
JOIN pg_catalog.pg_class c ON c.oid = a.attrelid
JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
WHERE a.attnum > 0
  AND NOT a.attisdropped
  AND c.relkind IN ('r', 'p')
  AND a.atttypid IN (
      pg_catalog.to_regtype('topology.topoelement'),
      pg_catalog.to_regtype('topology.topoelementarray')
  )
ORDER BY 1, 2, 3;
```

If the query returns any rows, the database requires the manual upgrade procedure. Keep
the output, because later steps reference the affected tables and columns.

### Prerequisites

- A maintenance window. Extension upgrades require exclusive locks on system catalogs.
- A database backup. Take a backup and test restoration before you start.
- The list of affected tables from the detection query.
- The `avnadmin` user, or a role that owns the affected tables and can run `ALTER TABLE`.
  Aiven for PostgreSQL does not provide superuser access; the `avnadmin` user has the
  required privileges.

### Upgrade procedure

Complete the following steps in order. When you use the bulk options, keep the same
session or connection across steps, because the bulk commands store state in a
temporary table.

#### Step 1: Detach topology columns

For each affected table, convert the column to its base array type:

```sql
-- For topology.topoelement columns:
ALTER TABLE schema_name.table_name
  ALTER COLUMN column_name TYPE integer[];

-- For topology.topoelementarray columns:
ALTER TABLE schema_name.table_name
  ALTER COLUMN column_name TYPE integer[][];
```

This detaches the column from the `topology.topoelement` domain type and converts it to
a plain PostgreSQL array, which prevents the CHECK constraint from firing during the
extension upgrade.

For example, if the detection query returned `public.parcels.topo_ref` with type
`topology.topoelement`:

```sql
ALTER TABLE public.parcels ALTER COLUMN topo_ref TYPE integer[];
```

To detach all affected columns in a single command, run the following block. It saves
the original domain-typed columns into a temporary `topology_columns_to_reattach` table
that Step 3 uses for reattachment:

```sql
DO $$
DECLARE
    rec RECORD;
    base_type text;
BEGIN
    CREATE TEMP TABLE IF NOT EXISTS topology_columns_to_reattach (
        schema_name text NOT NULL,
        table_name text NOT NULL,
        column_name text NOT NULL,
        col_type text NOT NULL
    ) ON COMMIT PRESERVE ROWS;

    TRUNCATE topology_columns_to_reattach;

    INSERT INTO topology_columns_to_reattach (schema_name, table_name, column_name, col_type)
    SELECT
        n.nspname AS schema_name,
        c.relname AS table_name,
        a.attname AS column_name,
        a.atttypid::pg_catalog.regtype::text AS col_type
    FROM pg_catalog.pg_attribute a
    JOIN pg_catalog.pg_class c ON c.oid = a.attrelid
    JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
    WHERE a.attnum > 0
      AND NOT a.attisdropped
      AND c.relkind IN ('r', 'p')
      AND a.atttypid IN (
          pg_catalog.to_regtype('topology.topoelement'),
          pg_catalog.to_regtype('topology.topoelementarray')
      );

    FOR rec IN
        SELECT
            schema_name,
            table_name,
            column_name,
            col_type
        FROM topology_columns_to_reattach
    LOOP
        base_type := CASE rec.col_type
            WHEN 'topology.topoelement' THEN 'integer[]'
            WHEN 'topology.topoelementarray' THEN 'integer[][]'
            ELSE NULL
        END;

        IF base_type IS NOT NULL THEN
            EXECUTE format(
                'ALTER TABLE %I.%I ALTER COLUMN %I TYPE %s',
                rec.schema_name,
                rec.table_name,
                rec.column_name,
                base_type
            );
        END IF;
    END LOOP;
END
$$;
```

#### Step 2: Upgrade the PostGIS extensions

Connect as the `avnadmin` user, which has the privileges to manage extensions, and
upgrade all PostGIS extensions:

```sql
ALTER EXTENSION postgis UPDATE;
ALTER EXTENSION postgis_topology UPDATE;

-- If installed:
ALTER EXTENSION postgis_tiger_geocoder UPDATE;
ALTER EXTENSION postgis_raster UPDATE;

-- Run PostGIS post-upgrade maintenance:
SELECT public.postgis_extensions_upgrade();
```

#### Step 3: Reattach topology columns

For each detached column, reattach it to the domain type with explicit casting:

```sql
-- For topology.topoelement columns:
ALTER TABLE schema_name.table_name
  ALTER COLUMN column_name TYPE topology.topoelement
  USING column_name::bigint[]::topology.topoelement;

-- For topology.topoelementarray columns:
ALTER TABLE schema_name.table_name
  ALTER COLUMN column_name TYPE topology.topoelementarray
  USING column_name::bigint[][]::topology.topoelementarray;
```

The `USING` clause casts the data in two steps:

1. `integer[]` to `bigint[]`. This widening cast expands each element from 4 to 8 bytes
   and is safe for all values.
1. `bigint[]` to `topology.topoelement`. This attaches the domain and applies CHECK
   constraint validation.

For example:

```sql
ALTER TABLE public.parcels
  ALTER COLUMN topo_ref TYPE topology.topoelement
  USING topo_ref::bigint[]::topology.topoelement;
```

To reattach all columns in a single command, run the following block. It uses the
`topology_columns_to_reattach` table created in Step 1:

```sql
DO $$
DECLARE
    rec RECORD;
    domain_type text;
    cast_type text;
BEGIN
    FOR rec IN
        SELECT
            schema_name,
            table_name,
            column_name,
            col_type
        FROM topology_columns_to_reattach
    LOOP
        domain_type := rec.col_type;
        cast_type := CASE rec.col_type
            WHEN 'topology.topoelement' THEN 'bigint[]'
            WHEN 'topology.topoelementarray' THEN 'bigint[][]'
            ELSE NULL
        END;

        IF cast_type IS NOT NULL THEN
            EXECUTE format(
                'ALTER TABLE %I.%I ALTER COLUMN %I TYPE %s USING %I::%s::%s',
                rec.schema_name,
                rec.table_name,
                rec.column_name,
                domain_type,
                rec.column_name,
                cast_type,
                domain_type
            );
        END IF;
    END LOOP;
END
$$;
```

#### Step 4: Repair TopoGeometry data

This step applies to PostGIS 3.6.1 or later. If you upgraded to PostGIS 3.6.1 or later,
run the repair function to fix any corrupt TopoGeometry element arrays:

```sql
-- Check whether the repair function is available:
SELECT proname FROM pg_proc
WHERE proname = 'fixcorrupttopogeometrycolumn';

-- If available, repair all topology layers:
SELECT topology.FixCorruptTopoGeometryColumn(
    schema_name,
    table_name,
    feature_column
)
FROM topology.layer;
```

The `FixCorruptTopoGeometryColumn()` function scans the feature column and rebuilds the
element arrays with correct topology references. PostGIS 3.6.1 introduced this function
to repair TopoGeometry element arrays affected by the `integer[]` and `bigint[]`
reinterpretation.

:::note
This step is optional for PostGIS 3.6.0, but required for PostGIS 3.6.1 or later if your
data uses TopoGeometry types rather than plain topology elements.
:::

### Verify the upgrade

After you complete the procedure, verify the results.

1. Confirm that all columns are restored. Re-run the detection query. It returns the
   same rows as before, with columns typed as `topology.topoelement` or
   `topology.topoelementarray`:

   ```sql
   SELECT
       n.nspname AS schema_name,
       c.relname AS table_name,
       a.attname AS column_name,
       a.atttypid::pg_catalog.regtype::text AS col_type
   FROM pg_catalog.pg_attribute a
   JOIN pg_catalog.pg_class c ON c.oid = a.attrelid
   JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
   WHERE a.attnum > 0
     AND NOT a.attisdropped
     AND c.relkind IN ('r', 'p')
     AND a.atttypid IN (
         pg_catalog.to_regtype('topology.topoelement'),
         pg_catalog.to_regtype('topology.topoelementarray')
     )
   ORDER BY 1, 2, 3;
   ```

1. Check data integrity. Sample the data to confirm that element arrays contain valid
   topology IDs:

   ```sql
   SELECT * FROM schema_name.table_name
   WHERE column_name IS NOT NULL
   LIMIT 10;
   ```

1. Validate the topology. If your data uses TopoGeometry types with registered
   topologies, run the following query. An empty result set indicates no topology
   errors:

   ```sql
   SELECT * FROM topology.ValidateTopology('your_topology_name');
   ```

### Troubleshooting

#### CheckViolation error during reattachment

**Symptom**: `ALTER TABLE ... TYPE topology.topoelement` fails with a CHECK constraint
violation.

**Cause**: The CHECK constraint in PostGIS 3.6 or later validates that element IDs exist
in the topology tables. If your data references deleted topology elements, reattachment
fails.

**Solution**: The solution depends on your PostGIS version.

- On PostGIS 3.6.1 or later, run `FixCorruptTopoGeometryColumn()` before you reattach
  the columns:

  ```sql
  SELECT topology.FixCorruptTopoGeometryColumn(
      schema_name,
      table_name,
      feature_column
  )
  FROM topology.layer
  WHERE schema_name = 'your_schema'
    AND table_name = 'your_table';
  ```

- On PostGIS 3.6.0, repair or remove the invalid references:

  ```sql
  -- Identify rows with invalid topology references:
  SELECT * FROM schema_name.table_name
  WHERE column_name IS NOT NULL
    AND NOT topology.IsValidTopoElement(column_name);

  -- Option A: Set invalid references to NULL:
  UPDATE schema_name.table_name
  SET column_name = NULL
  WHERE column_name IS NOT NULL
    AND NOT topology.IsValidTopoElement(column_name);

  -- Option B: Delete rows with invalid references, if acceptable:
  DELETE FROM schema_name.table_name
  WHERE column_name IS NOT NULL
    AND NOT topology.IsValidTopoElement(column_name);
  ```

#### Column left as integer[]

**Symptom**: After a failed upgrade attempt, columns are still typed as `integer[]`
instead of `topology.topoelement`.

**Cause**: A previous detach or reattach attempt failed and left the columns detached.

**Solution**: Follow Step 3 to reattach the columns. The procedure is idempotent, so
running it on columns that are already detached restores them correctly.

#### FixCorruptTopoGeometryColumn function does not exist

**Symptom**: `SELECT topology.FixCorruptTopoGeometryColumn(...)` fails with a function
does not exist error.

**Cause**: PostGIS 3.6.1 introduced this function. It is not available on PostGIS 3.6.0.

**Solution**: Choose one of the following options:

- Upgrade to PostGIS 3.6.1 or later. This is the recommended option.
- Skip Step 4 if your data does not use TopoGeometry types.
- Repair TopoGeometry element arrays manually using the PostGIS 3.6.0 API.

#### Permission denied for table

**Symptom**: `ALTER TABLE ... ALTER COLUMN` fails with a permission denied error.

**Cause**: The procedure requires ownership of the table, or the privileges of the
`avnadmin` user.

**Solution**: Run the commands as the table owner, the `avnadmin` user, or a role that
has `ALTER` privilege on the table.

<RelatedPages/>

- [Manage extensions](/docs/products/postgresql/howto/manage-extensions)
- [Supported extensions](/docs/products/postgresql/reference/list-of-extensions)
- [List of extensions for each version](/docs/products/postgresql/reference/list-of-extensions-for-each-version)
- [PostGIS issue #5983](https://github.com/postgis/postgis/issues/5983)
- [PostGIS 3.6.0 release notes](https://postgis.net/docs/release_notes.html)
- [PostGIS FixCorruptTopoGeometryColumn() documentation](https://postgis.net/docs/FixCorruptTopoGeometryColumn.html)
