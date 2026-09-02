---
title: Connection management for Aiven for PostgreSQL®
sidebar_label: Connection management
---

import RelatedPages from "@site/src/components/RelatedPages";

Manage connection limits, idle connections, and TLS versions for your Aiven for PostgreSQL® service.

## How these settings interact

[Keep-alive timeouts](/docs/products/postgresql/reference/idle-connections) and
`idle_in_transaction_session_timeout` guard against different problems, and one
doesn't substitute for the other. Keep-alives detect a client that has disconnected
at the network level. A client that's still connected, but has left a transaction
open, passes every keep-alive probe while it continues holding locks and memory, the
scenario covered in [Troubleshoot out-of-shared-memory
errors](/docs/products/postgresql/troubleshooting/troubleshooting-fatal-out-of-shared-mem).

## Before you troubleshoot a connection issue

- Determine whether you're near your plan's
  [`max_connections`](/docs/products/postgresql/reference/pg-connection-limits) limit
  before investigating further.
- Confirm clients use [`scram-sha-256` password
  encryption](/docs/products/postgresql/troubleshooting/pg-password-encryption-upgrade)
  and a [supported TLS
  version](/docs/products/postgresql/reference/use-of-deprecated-tls-versions).
- If the service becomes unresponsive with `out of shared memory` errors, look for
  stuck `idle in transaction` sessions before adjusting connection limits.

<RelatedPages/>

- [Connection limits per plan for Aiven for
  PostgreSQL®](/docs/products/postgresql/reference/pg-connection-limits)
- [Keep-alive connections parameters](/docs/products/postgresql/reference/idle-connections)
- [Verify the Aiven for PostgreSQL® password encryption
  method](/docs/products/postgresql/troubleshooting/pg-password-encryption-upgrade)
- [Troubleshoot out-of-shared-memory
  errors](/docs/products/postgresql/troubleshooting/troubleshooting-fatal-out-of-shared-mem)
