---
title: Connect to Aiven for PostgreSQL®
sidebar_label: Connect to service
---

import RelatedPages from "@site/src/components/RelatedPages";

Connect to your Aiven for PostgreSQL® service, and manage [connection pooling](/docs/products/postgresql/howto/manage-pool) and [connection limits](/docs/products/postgresql/connection-management).

## Choose how to connect

You can connect your clients directly to the PostgreSQL server, or through a pooled
connection. Both paths require TLS; see [Connect to Aiven for PostgreSQL®
services](/docs/products/postgresql/howto/list-code-samples) for the supported
`sslmode` values.

- **Direct connections** count individually against your service's
  [`max_connections`](/docs/products/postgresql/reference/pg-connection-limits) limit.
  Choose them for administration, migrations, and applications that keep a small,
  stable number of long-lived connections open.
- **Pooled connections** let many more clients share that same limit. Choose them
  when many application instances or short-lived connections would otherwise
  exhaust `max_connections`.

You can use both connection types for the same service at the same time.

<RelatedPages/>

- [Connect to Aiven for PostgreSQL®
  services](/docs/products/postgresql/howto/list-code-samples)
- [Manage connection pooling](/docs/products/postgresql/howto/manage-pool)
- [Connection management](/docs/products/postgresql/connection-management)
