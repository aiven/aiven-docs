---
title: Service management for Aiven for Valkey™
sidebar_label: Service management
---

import RelatedPages from "@site/src/components/RelatedPages";

Manage the lifecycle of your Aiven for Valkey™ service, including power state, naming,
tags, forks, cloud region, users, and advanced parameters.

## Forking underpins most lifecycle changes

Aiven for Valkey™ doesn't support every lifecycle change in place. You can't rename a
service after creation, so renaming works by forking the service under a new name and
deleting the original. A fork is an independent copy created from the service's latest
backup. This same mechanism lets you create a test or development copy, or move a
service to a different plan or cloud region without touching the original.

## Things to know

- Forking, and therefore renaming, requires at least one existing backup. If a
  service's `valkey_persistence` advanced parameter is set to `off`, the service takes
  no backups, so it can't be forked. In that mode, powering off or restarting the
  service also loses all its data because nothing is saved to disk.
- Service integrations aren't copied when you fork a service, and cross-project
  forking works only within the same organization.
- Powering off a service keeps its in-memory data only if a backup exists, and
  restores that data from the latest backup when you power the service back on.
- Aiven disables commands that change server configuration or state directly, such as
  `CONFIG`, `ACL`, `SHUTDOWN`, `BGSAVE`, and `MONITOR`. Use the Aiven Console, Aiven
  CLI, Aiven API, or Terraform for the equivalent actions, such as changing advanced
  parameters.

<RelatedPages/>

- [Power on/off and delete your Aiven for Valkey™
  service](/docs/products/valkey/howto/power-cycle-service)
- [Rename your Aiven for Valkey™ service](/docs/products/valkey/howto/rename-service)
- [Tag your Aiven for Valkey™ service](/docs/products/valkey/howto/tag-service)
- [Fork your Aiven for Valkey™ service](/docs/products/valkey/howto/fork-service)
- [Change the cloud or region for your Aiven for Valkey™
  service](/docs/products/valkey/howto/change-cloud-region)
- [Manage Aiven for Valkey™ service
  users](/docs/products/valkey/howto/manage-service-users)
- [Advanced parameters for Aiven for
  Valkey™](/docs/products/valkey/reference/advanced-params)
- [Restricted commands in Aiven for
  Valkey™](/docs/products/valkey/reference/restricted-commands)
