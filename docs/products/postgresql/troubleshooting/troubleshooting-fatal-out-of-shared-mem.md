---
title: Troubleshoot out-of-shared-memory errors
sidebar_label: Out of shared memory
---

Identify and resolve the `out of shared memory` issue caused by stuck sessions.

## Symptoms

If your Aiven for PostgreSQL® service becomes unavailable and you see repeated `FATAL: out
of shared memory` messages in the logs, it may indicate a blocking session, particularly
one that is in an `idle in transaction` state. Your Aiven for PostgreSQL logs might show
messages similar to the following:

```bash
2024-09-11T18:31:19.653257+0000 postgresql-13: pid=1031851,user=_db,db=_db FATAL: out of shared memory
pgbouncer_internal: login failed: FATAL: out of shared memory
```

This may prevent superuser connections.

## Identify the problem

Inspect the metric for `Oldest query age` / `Longest running query` in Grafana under the
PostgreSQL dashboard. Look for the **Query Statistics** panel or a similar section. A
value like `16.7 hours` indicates an open transaction that’s been running too long and
likely causing memory exhaustion.

## Causes

A common reason for the out-of-shared-memory issue is a session stuck in the `idle in
transaction` state. Such a session may hold on to locks and memory resources indefinitely,
eventually leading to memory exhaustion.

There are two typical causes of this problem:

- App-level exception handling

  1. The application opens a transaction with `BEGIN`.
  1. The application executes a query.
  1. The application throws an unhandled exception while processing the result.
  1. The application thread hangs but keeps the connection open.

  Aiven for PostgreSQL backend waits indefinitely, holding the transaction open.

- Missing cleanup logic

  Applications may not implement proper transaction timeouts or cleanup routines.

## Prevent the problem

- Set `idle_in_transaction_session_timeout` in Aiven for PostgreSQL to automatically
  terminate sessions stuck in this state. Default is `24 hours`. You may reduce it to
  `5 minutes` or so in your user config.
- Implement connection timeouts and error handling in your application logic, monitor
  long-running queries and transactions using PostgreSQL metrics.
