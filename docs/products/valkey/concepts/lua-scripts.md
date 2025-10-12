---
title: Lua scripts with Aiven for Valkey
---

Learn how to leverage the built-in support for Lua scripting in Aiven for Valkey.

Aiven for Valkey has inbuilt support for running Lua scripts to perform various
actions directly on the Valkey server. Scripting is typically controlled
using the `EVAL`, `EVALSHA` and `SCRIPT LOAD` commands.

For all newly created Aiven for Valkey instances, `EVAL`, `EVALSHA` and
`SCRIPT LOAD` commands are enabled by default.

:::note
Any outage caused by customer usage, including custom scripts, is not
covered by the service SLA (Service Level Agreement).
:::

For more information about Redis scripting, check [Redis
documentation](https://redis.io/commands/eval).
