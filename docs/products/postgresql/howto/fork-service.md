---
title: Fork your Aiven for PostgreSQL® service
sidebar_label: Fork a service
---

import ForkConcepts from "@site/static/includes/fork-service-concepts.md";
import ForkInstructions from "@site/static/includes/fork-service-instructions.md";
import ForkPitr from "@site/static/includes/fork-service-pitr-instructions.md";
import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons";

Fork your Aiven for PostgreSQL® service to create an independent copy for testing,
debugging, or development without affecting the original service.

<ForkConcepts/>

When you fork a service, its configuration, databases, service users, and connection
pools are copied to the new service.

## Limitations

- You can only fork services that have at least one
  [backup](/docs/products/postgresql/concepts/pg-backups).
- Service integrations are not copied to the fork.
- Cross-project forking is supported only within the same organization.

<ForkInstructions/>

<ForkPitr backupsNav={<>in the <ConsoleLabel name="backups"/> section, click <b>Backup management</b></>}/>

<RelatedPages/>

- [Aiven for PostgreSQL® backups](/docs/products/postgresql/concepts/pg-backups)
- [Rename your Aiven for PostgreSQL® service](/docs/products/postgresql/howto/rename-service)
