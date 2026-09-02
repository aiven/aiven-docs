---
title: Migrate to Aiven for Dragonfly®
sidebar_label: Migrate
---

import RelatedPages from "@site/src/components/RelatedPages";

Migrate to Aiven for Dragonfly® from [Aiven for Caching or Aiven for
Valkey™](/docs/products/dragonfly/howto/migrate-aiven-caching-df-console), or from an
[external Redis®* or Valkey
service](/docs/products/dragonfly/howto/migrate-ext-redis-df-console).

## Choose your migration path

Which migration guide you follow depends on where your source database runs.

- Choose the Aiven for Caching or Aiven for Valkey path when Aiven already manages your
  source service. You only select the project and service to migrate from.
- Choose the external Redis or Valkey path when your source runs outside Aiven, for
  example on your own infrastructure or with another cloud provider. You enter its
  connection details yourself, including a VPC peering connection if the source isn't
  reachable over the public internet.

## Things to know before you migrate

- **Check API compatibility first.** Dragonfly closely mirrors the Redis API, but some
  commands differ, especially in newer Redis and Valkey versions. Review the [Dragonfly
  API compatibility
  documentation](https://www.dragonflydb.io/docs/command-reference/compatibility) before
  you migrate.
- **Migration runs as replication either way.** Once you start a migration, Aiven
  streams data from the source in real time and the target Dragonfly service stays
  read-only. When the initial sync completes, you choose whether to keep replicating
  from the source or stop it and switch over.

<RelatedPages/>

- [Migrate from Aiven for Caching or Aiven for Valkey™ to Aiven for
  Dragonfly](/docs/products/dragonfly/howto/migrate-aiven-caching-df-console)
- [Migrate from external Redis®* or Valkey to Aiven for
  Dragonfly](/docs/products/dragonfly/howto/migrate-ext-redis-df-console)
