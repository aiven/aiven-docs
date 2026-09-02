---
title: Migrate to Aiven for Dragonfly®
sidebar_label: Migrate
---

import RelatedPages from "@site/src/components/RelatedPages";

Migrate to Aiven for Dragonfly® from Aiven for Caching, Aiven for Valkey™, or an
external Redis®* or Valkey service.

## Choose your migration path

Which migration guide you follow depends on where your source database runs.

- Migrate from Aiven for Caching or Aiven for Valkey when Aiven already manages your
  source service. The Aiven Console migration tool reuses that service's connection
  details automatically, so you only select the project and service to migrate from.
- Migrate from an external Redis or Valkey service when your source runs outside Aiven,
  for example on your own infrastructure or with another cloud provider. You provide the
  hostname, port, username, and password yourself, and you might need a VPC peering
  connection if the source isn't reachable over the public internet.

## Things to know before you migrate

- **Check API compatibility first.** Dragonfly closely mirrors the Redis API, but some
  commands differ, especially in newer Redis and Valkey versions. Review the [Dragonfly
  API compatibility
  documentation](https://www.dragonflydb.io/docs/command-reference/compatibility) before
  you migrate.
- **User accounts and configuration don't transfer automatically.** Migration doesn't
  include service users, access control lists, or custom service configuration.
  Recreate these manually on Aiven for Dragonfly after migration.
- **Migration runs as replication.** Once you start a migration, Aiven streams data from
  the source in real time and the target Dragonfly service stays read-only. When the
  initial sync completes, you choose whether to keep replicating from the source or stop
  it and switch over.

<RelatedPages/>

- [Migrate from Aiven for Caching or Aiven for Valkey™ to Aiven for
  Dragonfly](/docs/products/dragonfly/howto/migrate-aiven-caching-df-console)
- [Migrate from external Redis®* or Valkey to Aiven for
  Dragonfly](/docs/products/dragonfly/howto/migrate-ext-redis-df-console)
