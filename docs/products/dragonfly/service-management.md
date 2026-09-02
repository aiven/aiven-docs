---
title: Service management for Aiven for Dragonfly®
sidebar_label: Service management
---

import RelatedPages from "@site/src/components/RelatedPages";

Manage high availability, eviction policy, Redis compatibility, version lifecycle, and
advanced parameters for your Aiven for Dragonfly® service.

## What's configurable and what Aiven manages

Aiven manages the operational side of your Aiven for Dragonfly service, including node
provisioning, failover, replication, and cluster topology. You manage a smaller set of
options, such as memory eviction behavior, network access, and SSL requirements, through
the service's advanced parameters.

## Things to know

- **Failover depends on your plan.** Startup plans run a single node with no automatic
  failover. Business and Premium plans run 2 or 3 nodes with automatic failover to a
  standby. Custom plans use a node configuration you agree with Aiven.
- **Eviction is off by default.** `cache_mode` starts turned off, so a service can raise
  out-of-memory errors after it reaches its `maxmemory` limit.
- **Backups depend on your persistence setting.** Aiven backs up your data
  automatically unless you turn off persistence. With persistence off, you can't fork
  the service, and the service loses data if it restarts or powers off.
- **Some Redis administrative commands are unavailable.** Aiven manages cluster
  topology, replication, and node configuration for you, so some administrative Redis
  commands aren't available to you.

<RelatedPages/>

- [High availability in Aiven for
  Dragonfly®](/docs/products/dragonfly/concepts/ha-dragonfly)
- [Data eviction policy in Aiven for
  Dragonfly](/docs/products/dragonfly/howto/eviction-policy-df)
- [RedisJSON v2 syntax
  compatibility](/docs/products/dragonfly/howto/compatibility-redisjson)
- [Advanced parameters for Aiven for
  Dragonfly®](/docs/products/dragonfly/reference/advanced-params)
