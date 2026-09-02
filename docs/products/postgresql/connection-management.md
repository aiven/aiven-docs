---
title: Connection management for Aiven for PostgreSQL®
sidebar_label: Connection management
---

import RelatedPages from "@site/src/components/RelatedPages";

Manage connection limits, idle connections, and TLS versions for your Aiven for PostgreSQL® service.

## How these settings interact

TCP keep-alive timeouts and `idle_in_transaction_session_timeout` protect against
different problems. Keep-alive settings detect a client that has gone away at the
network level, using the server-side `tcp_keepalives_idle`, `tcp_keepalives_count`,
and `tcp_keepalives_interval` parameters. They don't detect a client that's still
connected but has left a transaction open. A session stuck `idle in transaction`
holds its connection, locks, and memory indefinitely until
`idle_in_transaction_session_timeout` closes it, and enough stuck sessions can
exhaust shared memory and make the service unavailable.

## Before you troubleshoot a connection issue

- Check whether you're near your plan's `max_connections` limit before investigating
  further. The limit scales with plan size.
- Confirm clients use `scram-sha-256` password encryption and `TLSv1.2` or later.
  Aiven deprecated MD5 password encryption and TLS versions before `TLSv1.2`.
- If the service becomes unresponsive with repeated `out of shared memory` errors,
  look for sessions stuck `idle in transaction` before adjusting connection limits.

<RelatedPages/>

- [Connection limits per plan for Aiven for
  PostgreSQL®](/docs/products/postgresql/reference/pg-connection-limits)
- [Keep-alive connections parameters](/docs/products/postgresql/reference/idle-connections)
- [Use of deprecated TLS
  versions](/docs/products/postgresql/reference/use-of-deprecated-tls-versions)
- [Verify the Aiven for PostgreSQL® password encryption
  method](/docs/products/postgresql/troubleshooting/pg-password-encryption-upgrade)
- [Troubleshoot out-of-shared-memory
  errors](/docs/products/postgresql/troubleshooting/troubleshooting-fatal-out-of-shared-mem)
