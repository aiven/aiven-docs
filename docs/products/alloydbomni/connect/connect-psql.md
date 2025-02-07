---
title: Connect with psql
early: true
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";

Connect to an Aiven for AlloyDB Omni database using `psql`, which is a command line tool useful for managing and querying your database.

## Prerequisites

- Aiven for AlloyDB Omni service running
- `psql` CLI client installed on your computer

## Connect to a service

Run:

```sql
psql 'SERVICE_URI'
```

Replace `SERVICE_URI` with the service URI available on the
<ConsoleLabel name="overview"/> page in the Aiven Console.

Expect output like:

```sql
psql (13.2, server 13.3)
SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, bits: 256, compression: off)
Type "help" for help.
```

## Verify the connection

To confirm that the connection is working, run:

```sql
select version();
```

Expect output like:

```text
version
--------------------------------------------------------------------------------------------
PostgreSQL 15.5 on x86_64-pc-linux-gnu, compiled by [...]
(1 row)
```
