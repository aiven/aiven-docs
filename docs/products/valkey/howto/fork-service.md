---
title: Fork your Aiven for Valkey™ service
sidebar_label: Fork a service
---

import ForkConcepts from "@site/static/includes/fork-service-concepts.md";
import ForkInstructions from "@site/static/includes/fork-service-instructions.md";
import RelatedPages from "@site/src/components/RelatedPages";

Fork your Aiven for Valkey™ service to create an independent copy for testing,
debugging, or development without affecting the original service.

<ForkConcepts/>

When you fork a service, its configuration, data, and service users are copied to the
new service.

## Limitations

- You can only fork services that have at least one backup.
- Service integrations are not copied to the fork.
- Cross-project forking is supported only within the same organization.

<ForkInstructions/>

<RelatedPages/>

- [Aiven for Valkey™ service backups](/docs/products/valkey/howto/configure-backups)
- [Rename your Aiven for Valkey™ service](/docs/products/valkey/howto/rename-service)
