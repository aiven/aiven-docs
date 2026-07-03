---
title: Fork your Aiven for MySQL® service
sidebar_label: Fork a service
---

import ForkConcepts from "@site/static/includes/fork-service-concepts.md";
import ForkInstructions from "@site/static/includes/fork-service-instructions.md";
import ForkPitr from "@site/static/includes/fork-service-pitr-instructions.md";
import RelatedPages from "@site/src/components/RelatedPages";

Fork your Aiven for MySQL® service to create an independent copy for testing,
debugging, or development without affecting the original service.

<ForkConcepts/>

When you fork a service, its configuration, databases, and service users are copied to
the new service.

## Limitations

- You can only fork services that have at least one
  [backup](/docs/products/mysql/concepts/mysql-backups).
- Service integrations are not copied to the fork.
- Cross-project forking is supported only within the same organization.

<ForkInstructions/>

<ForkPitr/>

<RelatedPages/>

- [Understand MySQL backups](/docs/products/mysql/concepts/mysql-backups)
- [Rename your Aiven for MySQL® service](/docs/products/mysql/howto/rename-service)
