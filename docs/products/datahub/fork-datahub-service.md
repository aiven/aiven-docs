---
title: Fork a DataHub service
limited: true
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";

Fork an Aiven for DataHub service to create a complete copy of it from its latest backups. This restores both its PostgreSQL metadata database and OpenSearch search index.
Both stores are restored to the latest backup available at or before
the recovery time you choose.
Forked services are independent and don't share resources with
or increase the load on the original service.

Common use cases for forking include:

- Creating a snapshot to analyze an issue.
- Creating a development copy of your production environment.
- Testing upgrades before applying them to production services.
- Creating an instance in a different cloud provider, region, or with a different plan.
- Renaming a service.

## Create a fork

1. In your DataHub service, click <ConsoleLabel name="servicesettings"/>.

1. In the **Service management** section,
   click <ConsoleLabel name="actions"/> > **Fork service**.
1. Optional: Edit the name and select a project.
1. Optional: Choose a different cloud and plan. By default,
   the same cloud and plan as the original service are selected.
1. Click **Create fork**.

To ensure that the forked service shows all the latest data,
[run the restore indices task](/docs/products/datahub/restore-datahub-indices) on it.
