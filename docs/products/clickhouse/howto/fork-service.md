---
title: Fork your Aiven for ClickHouse® service
sidebar_label: Fork a service
---

import ForkConcepts from "@site/static/includes/fork-service-concepts.md";
import ForkInstructions from "@site/static/includes/fork-service-instructions.md";
import RelatedPages from "@site/src/components/RelatedPages";

Fork your Aiven for ClickHouse® service to create an independent copy for testing,
debugging, or development without affecting the original service.

<ForkConcepts/>

When you fork a service, its configuration, databases, tables, and access entities are
copied to the new service.

## Limitations

- You can only fork services that have at least one
  [backup](/docs/products/clickhouse/concepts/disaster-recovery#service-backup).
- Service integrations are not copied to the fork.
- Cross-project forking is supported only within the same organization.
- Point-in-time recovery is not supported. You can restore only to a daily backup state.
- You cannot fork Aiven for ClickHouse services to a fewer number of nodes.
  Reducing the number of nodes is only possible by
  [switching the service plan](/docs/platform/howto/scale-services) from **Business** to
  **Startup** on a running service.

<ForkInstructions/>

Once the new fork service is running, you can set up your application's connection
settings to point to this new fork service.

<RelatedPages/>

- [Schedule Aiven for ClickHouse® backups](/docs/products/clickhouse/howto/configure-backup)
- [Restore an Aiven for ClickHouse® backup](/docs/products/clickhouse/howto/restore-backup)
- [Rename your Aiven for ClickHouse® service](/docs/products/clickhouse/howto/rename-service)
