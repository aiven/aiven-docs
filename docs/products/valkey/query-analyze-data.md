---
title: Query and analyze data in Aiven for Valkey™
sidebar_label: Query and analyze data
---

import RelatedPages from "@site/src/components/RelatedPages";

Use Lua scripts and benchmark performance to query and analyze data in your Aiven for
Valkey™ service.

## Querying a key-value store

Aiven for Valkey™ has no query language like SQL. You read and write data with
key-based commands such as `GET`, `SET`, and `HGETALL`, so most application-level
querying logic lives in your client code rather than in the database. Analysis in this
context means measuring how the service performs under a workload, not running reports
against stored data.

Lua scripts extend what a single command can do. Instead of sending several commands
and combining the results in your application, you send a script that runs commands on
the server and returns one result. This keeps multi-step logic atomic and reduces round
trips between your application and the service.

## Things to know

- `EVAL`, `EVALSHA`, and `SCRIPT LOAD` are enabled by default, so no configuration is
  required to run Lua scripts.
- Outages caused by custom Lua scripts aren't covered by the service level agreement
  (SLA).
- `redis-benchmark` isn't supported because it depends on the `CONFIG` command, which
  Aiven for Valkey restricts. Use `memtier_benchmark` instead.

<RelatedPages/>

- [Lua scripts with Aiven for Valkey™](/docs/products/valkey/concepts/lua-scripts)
- [Benchmark Aiven for Valkey™ performance](/docs/products/valkey/howto/benchmark-performance)
