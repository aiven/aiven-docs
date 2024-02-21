---
title: Identify disk usage issues
---

Aiven for MySQL® is configured to use `innodb_file_per_table=ON`, which
means that an `.idb` file is generated per table containing its data and
indexes.

Over time, when a table receives a lot of inserts and deletions, the
amount of space it occupies on disk can become significantly larger than
the current data in the table. A classic example of this would be a
table containing jobs for a work queue in which rows are repeatedly
added to the end of the table and removed from the beginning. This
happens because InnoDB does not release the allocated space back to the
operating system automatically, in case the table grows larger in the
future, but this can cause problems. Since every other table exists in
its own `.idb` file, the allocated but unused space is unavailable for
the tables to grow. Since every other table exists in its own `.idb`
file, the allocated but unused space is unavailable for the tables to
grow.

## Find disk usage issues

To identify tables with significant allocated but unused space, you can
run the following query:

```shell
SELECT
  TABLES.TABLE_SCHEMA,
  TABLES.TABLE_NAME,
  (TABLES.DATA_LENGTH + TABLES.INDEX_LENGTH) / 1024 / 1024 AS "MB used (estimate)",
  TABLES.DATA_FREE / 1024 / 1024 AS "MB allocated but unused (estimate)",
  INNODB_TABLESPACES.FILE_SIZE / 1024 / 1024 AS "MB on disk"
FROM information_schema.TABLES
JOIN information_schema.INNODB_TABLESPACES ON (INNODB_TABLESPACES.NAME = TABLES.TABLE_SCHEMA || '/' || TABLES.TABLE_NAME)
WHERE INNODB_TABLESPACES.FILE_SIZE > 10 * 1024 * 1024
ORDER BY TABLES.DATA_FREE DESC;
```

The query results show if a table has significantly more allocated
unused space than used space.

:::note
By default, statistics in `information_schema.TABLES` are only updated
every 24 hours or whenever the `ANALYZE TABLE` command runs.
:::

## Related pages

See [reclaim disk space](/docs/products/mysql/howto/reclaim-disk-space) if you are having issues with full disk.
