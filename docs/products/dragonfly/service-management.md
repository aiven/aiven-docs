---
title: Service management for Aiven for Dragonfly®
sidebar_label: Service management
---

import RelatedPages from "@site/src/components/RelatedPages";

Manage [high availability](/docs/products/dragonfly/concepts/ha-dragonfly), [eviction
policy](/docs/products/dragonfly/howto/eviction-policy-df), [Redis
compatibility](/docs/products/dragonfly/howto/compatibility-redisjson), [version
lifecycle](/docs/products/dragonfly/reference/version-lifecycle), and [advanced
parameters](/docs/products/dragonfly/reference/advanced-params) for your Aiven for Dragonfly® service.

## What's configurable and what Aiven manages

Aiven manages the operational side of your Aiven for Dragonfly service, including node
provisioning, failover, replication, and cluster topology. You manage a smaller set of
options, such as memory eviction behavior, network access, and SSL requirements, through
the service's advanced parameters.

## Things to know

- **Backup and forking depend on a setting, not on your plan.** Aiven backs up your
  service by default. If you turn off persistence in the advanced parameters, backups
  stop, you can't [fork the service](/docs/platform/concepts/service-forking), and a
  restart or power-off loses data, regardless of how your plan handles failover.
- **Some administrative Redis commands are unavailable.** Aiven manages cluster
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
