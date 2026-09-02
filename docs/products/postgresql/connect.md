---
title: Connect to Aiven for PostgreSQL®
sidebar_label: Connect to service
---

import RelatedPages from "@site/src/components/RelatedPages";

Connect to your Aiven for PostgreSQL® service, and manage connection pooling and connection limits.

## Choose how to connect

You can connect your clients directly to the PostgreSQL server, or through a PgBouncer
connection pool.

- **Direct connections** each use a dedicated backend process on the server, and count
  against your service's [`max_connections`
  limit](/docs/products/postgresql/reference/pg-connection-limits). Use direct
  connections for administration, migrations, and applications that keep a small,
  stable number of long-lived connections open.
- **Pooled connections** go through PgBouncer, which reuses a smaller set of backend
  connections across many more clients. Use pooling when many application instances or
  short-lived connections would otherwise exhaust `max_connections`.

You can use both connection types for the same service at the same time.

## Before you connect

- Connection pooling isn't available on every plan tier, so confirm your plan
  supports it before you rely on it.
- Every connection method requires TLS. See [Connect to Aiven for PostgreSQL®
  services](/docs/products/postgresql/howto/list-code-samples) for the supported
  `sslmode` values.

<RelatedPages/>

- [Connect to Aiven for PostgreSQL®
  services](/docs/products/postgresql/howto/list-code-samples)
- [Manage connection pooling](/docs/products/postgresql/howto/manage-pool)
- [Connection management](/docs/products/postgresql/connection-management)
