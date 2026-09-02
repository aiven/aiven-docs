---
title: Service management for Aiven for PostgreSQL®
sidebar_label: Service management
---

import RelatedPages from "@site/src/components/RelatedPages";

Manage the lifecycle of your Aiven for PostgreSQL® service, including power state, naming, tags, forks, cloud region, users, and advanced parameters.

## Effect on availability

- **Migrating** to a different cloud provider or region happens without downtime. New
  nodes sync in the target location, and only after that sync completes does the
  migration decommission the old ones. The service endpoint doesn't change.
- **Powering off** stops the service and removes its virtual machines. Powering it
  back on restores the latest backup, which can take minutes to hours depending on
  the backup size.
- **Forking** and **renaming** a service, which forks it under a new name and deletes
  the original, both create a running service from the latest backup.
- Some advanced parameters, such as `max_connections`, restart the service when you
  change them. Check the restart indicator on each parameter before you change it.

## Before you start

- You can only fork a service that has at least one backup. Service integrations
  aren't copied to the fork, and cross-project forking works only within the same
  organization.
- Tag keys must be unique within a service, start with a letter, and can include
  letters, numbers, dashes, and underscores, up to 64 characters. Tag values are
  limited to 64 UTF-8 characters.
- You can't power a service on or off with Terraform. The `state` attribute is
  read-only there, so use the console or the Aiven CLI instead.

<RelatedPages/>

- [Power on/off and delete your Aiven for PostgreSQL®
  service](/docs/products/postgresql/howto/power-cycle-service)
- [Rename your Aiven for PostgreSQL®
  service](/docs/products/postgresql/howto/rename-service)
- [Tag your Aiven for PostgreSQL® service](/docs/products/postgresql/howto/tag-service)
- [Fork your Aiven for PostgreSQL®
  service](/docs/products/postgresql/howto/fork-service)
- [Migrate to a different cloud provider or
  region](/docs/products/postgresql/howto/migrate-cloud-region)
- [Manage Aiven for PostgreSQL® service
  users](/docs/products/postgresql/howto/manage-service-users)
- [Advanced parameters for Aiven for
  PostgreSQL®](/docs/products/postgresql/reference/advanced-params)
