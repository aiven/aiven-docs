---
title: Service management for Aiven for PostgreSQL®
sidebar_label: Service management
---

import RelatedPages from "@site/src/components/RelatedPages";

Manage the lifecycle of your Aiven for PostgreSQL® service, including power state, naming, tags, forks, cloud region, users, and advanced parameters.

## Effect on availability

- **[Migrating](/docs/products/postgresql/howto/migrate-cloud-region)** to a
  different cloud provider or region happens without downtime, unlike most other
  lifecycle actions in this list.
- **[Powering off](/docs/products/postgresql/howto/power-cycle-service)** a service
  releases its compute entirely, unlike a restart triggered by an advanced parameter
  change, which keeps the service allocated throughout. You can't power a service on
  or off with Terraform, since its `state` attribute is read-only there; use the
  console or the Aiven CLI instead.
- **[Forking](/docs/products/postgresql/howto/fork-service)** and
  **[renaming](/docs/products/postgresql/howto/rename-service)** a service both
  create a running service from the latest backup. Renaming forks under a new name
  and deletes the original, so it depends on having a backup even though its own
  instructions don't mention one.
- Some [advanced parameters](/docs/products/postgresql/reference/advanced-params),
  such as `max_connections`, restart the service when you change them, unlike
  migrating, forking, or renaming.

<RelatedPages/>

- [Power on/off and delete your Aiven for PostgreSQL®
  service](/docs/products/postgresql/howto/power-cycle-service)
- [Fork your Aiven for PostgreSQL®
  service](/docs/products/postgresql/howto/fork-service)
- [Migrate to a different cloud provider or
  region](/docs/products/postgresql/howto/migrate-cloud-region)
- [Advanced parameters for Aiven for
  PostgreSQL®](/docs/products/postgresql/reference/advanced-params)
