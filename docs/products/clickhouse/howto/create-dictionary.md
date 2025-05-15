---
title: Create dictionaries in Aiven for ClickHouse®
sidebar_label: Create dictionaries
---

Create dictionaries in Aiven for ClickHouse® to accelerate queries for better efficiency and performance.

## Dictionaries in Aiven for ClickHouse

A dictionary is a key-attribute mapping useful for low latency lookup queries, when
often looking up attributes for a particular key. Dictionary data resides fully in memory,
which is why using a dictionary in JOINs is often much faster than using a MergeTree table.
Dictionaries can be an efficient replacement for regular tables in your JOIN clauses.

Aiven for ClickHouse supports
[backup and restore](/docs/products/clickhouse/concepts/disaster-recovery#backup-and-restore)
for dictionaries. Also, dictionaries in Aiven for ClickHouse are automatically replicated
to all service nodes.

Read more on dictionaries in the
[upstream ClickHouse documentation](https://clickhouse.com/docs/en/sql-reference/dictionaries).

## Prerequisites

- Aiven for ClickHouse service created
- SQL client installed
- [Dictionary source](/docs/products/clickhouse/howto/create-dictionary#supported-sources)
  available
- Credentials integration for remote ClickHouse, PostgreSQL®, or MySQL® if to be used as
  sources

## Limitations

- Only TLS connections supported
- If no host is specified in a dictionary with a ClickHouse source, the local host is
  assumed, and the dictionary is filled with data from a query against the local ClickHouse,
  for example:

  ```sql
  -- users table
  CREATE TABLE default.users
  (
      id UInt64,
      username String,
      email String,
      country String
  )
  ENGINE = MergeTree()
  ORDER BY id;
  CREATE DICTIONARY default.users_dictionary
  (
      id UInt64,
      username String,
      email String,
      country String
  )
  PRIMARY KEY id
  SOURCE(CLICKHOUSE(DB 'default' TABLE 'users'))
  LAYOUT(FLAT())
  LIFETIME(100);
  ```

  In Aiven for ClickHouse, to fill the dictionary the table users are queried with
  the permissions of the `avnadmin` user even if another user creates the dictionary.
  In upstream ClickHouse, the same is true except the `default` user is used.
- In Aiven for ClickHouse, setting
  [dictionaries_lazy_load](https://clickhouse.com/docs/en/operations/server-configuration-parameters/settings#dictionaries_lazy_load)
  is set to `true`, which means that errors with dictionary source parameters may only
  become apparent when the dictionary is loaded on the first use, rather than when it is created.

### Supported layouts

Aiven for ClickHouse supports the same
[layouts that the upstream ClickHouse supports](https://clickhouse.com/docs/en/sql-reference/dictionaries#ways-to-store-dictionaries-in-memory)
with two exceptions,`ssd_cache` and `complex_key_ssd_cache`, which are not supported.

### Supported sources

- HTTP(s)
- Remote ClickHouse
- Aiven for ClickHouse
- Remote MySQL®
- Aiven for MySQL
- Remote PostgreSQL®
- Aiven for PostgreSQL


## Create a dictionary

To create a dictionary with specified structure (attributes), source, layout, and lifetime,
use the following syntax:

```sql
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

### Speeding up `JOIN`s

1. Create tables in your ClickHouse database:

    ```sql
    CREATE TABLE users
    (
        id UInt64,
        username String,
        email String,
        country String
    )
    ENGINE = MergeTree()
    ORDER BY id;
    ```

    ```sql
    CREATE TABLE transactions
    (
        id UInt64,
        user_id UInt64,
        product_id UInt64,
        quantity Float64,
        price Float64
    )
    ENGINE = MergeTree()
    ORDER BY id;
    ```

1. Create a dictionary for the `users` table:

    ```sql
    CREATE DICTIONARY users_dictionary
    (
        id UInt64,
        username String,
        email String,
        country String
    )
    PRIMARY KEY id
    SOURCE(CLICKHOUSE(DB 'default' TABLE 'users'))
    LAYOUT(FLAT())
    LIFETIME(100);
    ```

    You can do the same using the `QUERY` parameter:

    ```sql
    CREATE DICTIONARY users_dictionary
    (
        id UInt64,
        username String,
        email String,
        country String
    )
    PRIMARY KEY id
    SOURCE(CLICKHOUSE(QUERY 'SELECT id, username, email, country FROM default.users'))
    LAYOUT(FLAT())
    LIFETIME(100);
    ```

`JOIN`s are much faster as the data is pre-indexed in memory.

```sql
SELECT
    t.id,
    u.username,
    t.product_id,
    t.quantity,
    t.price
FROM transactions AS t
ANY LEFT JOIN users_dictionary AS u
ON t.user_id = u.id;
```

### Caching data from an external database or URL


- Create a dictionary for the `pricing` table in your MySQL database using a composite key:

  ```sql
  CREATE DICTIONARY product_pricing
  (
      product_id UInt64,
      region String,
      price Float64 DEFAULT 0.0
  )
  PRIMARY KEY product_id, region_id
  SOURCE(MYSQL(NAME mysql_named_collection DB 'product_db' TABLE 'pricing'))
  LAYOUT(COMPLEX_KEY_HASHED())
  LIFETIME(MIN 600 MAX 900);
  ```

  This will periodically query MySQL and store the data in memory.

- Create a dictionary for the `pricing` table in your PostgreSQL database using the `FLAT`
  layout:

  ```sql
  CREATE DICTIONARY product_pricing
  (
      product_id UInt64,
      price Float64 DEFAULT 0.0
  )
  PRIMARY KEY product_id
  SOURCE(POSTGRESQL(NAME psql_named_collection DB 'product_db' SCHEMA 'schema' TABLE 'pricing'))
  LAYOUT(FLAT())
  LIFETIME(0);
  ```

  Because `LIFETIME` is `0`, it has to be manually refreshed as follows:

  ```sql
  SYSTEM RELOAD DICTIONARY product_pricing;
  ```


- Create a dictionary with `HTTP` as a source:

  ```sql
  CREATE DICTIONARY currency_rates
  (
      currency_code String,
      rate Float64 DEFAULT 1.0
  )
  PRIMARY KEY currency_code
  SOURCE(HTTP(URL 'https://example.com/currency_rates.csv' FORMAT CSV))
  LAYOUT(COMPLEX_KEY_HASHED())
  LIFETIME(100);
  ```


- Create a dictionary for the `users` table in a remote ClickHouse database using the `FLAT`
  layout:

  ```sql
  CREATE DICTIONARY users_dictionary_remote
  (
      id UInt64,
      username String,
      email String,
      country String
  )
  PRIMARY KEY id
  SOURCE(CLICKHOUSE(NAME remote_clickhouse_named_collection DB 'default' TABLE 'users'))
  LAYOUT(FLAT())
  LIFETIME(100);
  ```
