---
title: Troubleshoot out-of-shared-memory errors
sidebar_label: Connection problems
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

## Root cause

A common reason for this issue is a session stuck in the `idle in transaction` state. Such
a session may hold on to locks and memory resources indefinitely, eventually leading to
memory exhaustion.

## Identify the problem

Confirm using Grafana (If available)

Inspect the metric for Oldest query age / Longest running query. A value like 16.7 hours
indicates an open transaction that’s been running too long and likely causing memory exhaustion.

## Why this happens

There are two typical causes:

### Application-level exception handling

- The application opens a transaction with BEGIN
- Executes a query
- Throws an unhandled exception while processing the result
- The application thread hangs, but keeps the connection open

PostgreSQL backend waits indefinitely, holding the transaction open

### Missing cleanup logic

Applications may not implement proper transaction timeouts or cleanup routines

## Prevent the `out of shared memory` issue

Set idle_in_transaction_session_timeout in PostgreSQL to automatically terminate sessions
stuck in this state. Default is 24 hours. You may reduce it to something like 5 minutes in
your user config.

Implement connection timeouts and error handling in your application logic, monitor
long-running queries and transactions using PostgreSQL metrics

If you continue to experience issues or need assistance configuring these settings, feel
free to contact our support team.
