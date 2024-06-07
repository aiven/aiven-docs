---
title: Create dictionaries in Aiven for ClickHouse®
sidebar_label: Create dictionary
---

Create dictionaries in Aiven for ClickHouse® to accelerate queries for better efficiency and performance.

## Dictionaries in Aiven for ClickHouse

A dictionary is a key -> attribute mapping useful for low latent lookup queries, when you
often access reference lists to retrieve attributes from a key. Dictionary data resides
fully in memory and is accessed using functions, which are faster than regular SQL queries.
Dictionaries can be an efficient replacement for regular tables in your JOIN clauses.

Aiven for ClickHouse supports
[backup and restore](/docs/products/clickhouse/concepts/disaster-recovery#backup-and-restore)
for dictionaries. Also, dictionaries in Aiven for ClickHouse are automatically replicated
on all service nodes.

Read more on dictionaries in the
[upstream ClickHouse documentation](https://clickhouse.com/docs/en/sql-reference/dictionaries).

## Prerequisites

- Aiven for ClickHouse service created
- SQL client installed
- Dictionary source available
- Credentials integration for remote ClickHouse, PostgreSQL®, or MySQL® if to be used as
  sources

## Limitations

- TLS connections supported only (no non-TLS allowed)
- In Aiven for ClickHouse, you run queries with the `avnadmin` user by default (as opposed
  to running queries in the upstream ClickHouse, where you use the `default` user).

### Supported layouts

Aiven for ClickHouse supports the same
[layouts that the upstream ClickHouse supports](https://clickhouse.com/docs/en/sql-reference/dictionaries#ways-to-store-dictionaries-in-memory)
with two exceptions,`ssd_cache` and `complex_key_ssd_cache`, which are not supported.

### Supported sources

- HTTP(s)
- Upstream/remote ClickHouse
- Aiven for ClickHouse
- Upstream/remote MySQL®
- Aiven for MySQL
- Upstream/remote PostgreSQL®
- Aiven for PostgreSQL

## Create a dictionary

To create a dictionary with specified structure (attributes), source, layout, and lifetime,
use the following syntax:

```sgl
CREATE [OR REPLACE] DICTIONARY [IF NOT EXISTS] [db.]dictionary_name
(
    key1 type1  [DEFAULT|EXPRESSION expr1] [IS_OBJECT_ID],
    key2 type2  [DEFAULT|EXPRESSION expr2],
    attr1 type2 [DEFAULT|EXPRESSION expr3] [HIERARCHICAL|INJECTIVE],
    attr2 type2 [DEFAULT|EXPRESSION expr4] [HIERARCHICAL|INJECTIVE]
)
PRIMARY KEY key1, key2
SOURCE(SOURCE_NAME([param1 value1 ... paramN valueN]))
LAYOUT(LAYOUT_NAME([param_name param_value]))
LIFETIME({MIN min_val MAX max_val | max_val})
SETTINGS(setting_name = setting_value, setting_name = setting_value, ...)
COMMENT 'Comment'
```

## Examples
