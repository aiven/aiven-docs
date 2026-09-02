---
title: Service management for Aiven for Valkey™
sidebar_label: Service management
---

import RelatedPages from "@site/src/components/RelatedPages";

Manage the lifecycle of your Aiven for Valkey™ service, including power state, naming,
tags, forks, cloud region, users, and advanced parameters.

## Why some actions are connected

A few of these actions trace back to the same setting, even though nothing on their
own pages says so directly. [Forking](/docs/products/valkey/howto/fork-service)
a service requires a backup, and so does recovering cleanly from a [power
cycle](/docs/products/valkey/howto/power-cycle-service). Both ultimately depend on the
`valkey_persistence` [advanced
parameter](/docs/products/valkey/reference/advanced-params). Set it to `off` and the
service stops taking backups. Without a backup, forking is no longer possible, and a
power cycle or restart can wipe the service's data instead of restoring it.

Aiven also disables commands that change server configuration or state directly, such
as `CONFIG` and `SHUTDOWN`, documented as [restricted
commands](/docs/products/valkey/reference/restricted-commands). Use the Aiven Console,
Aiven CLI, Aiven API, or Terraform for the equivalent actions instead of running these
commands directly.

<RelatedPages/>

- [Power on/off and delete your Aiven for Valkey™
  service](/docs/products/valkey/howto/power-cycle-service)
- [Fork your Aiven for Valkey™ service](/docs/products/valkey/howto/fork-service)
- [Advanced parameters for Aiven for
  Valkey™](/docs/products/valkey/reference/advanced-params)
