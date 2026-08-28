---
title: Maintenance updates for Aiven for DataHub
sidebar_label: Maintenance updates
limited: true
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import MaintenanceUpdates from "@site/static/includes/maintenance-updates.md";
import MaintenanceWindow from "@site/static/includes/maintenance-window-concepts.md";
import SetMaintWindow from "@site/static/includes/maintenance-window-instructions.md";
import RequirementsPanel from "@site/src/components/RequirementsPanel";

Manage maintenance updates and set the maintenance window for your
Aiven for DataHub service.

<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: ['Manage services', 'Maintain services', 'Operator', 'Project admin'],
    },
  ]}
/>

## Maintenance updates

<MaintenanceUpdates/>

## Maintenance windows

<MaintenanceWindow/>

### Set the maintenance window for a DataHub service

<SetMaintWindow/>

You cannot change the maintenance window of the DataHub resource services.
When you set the maintenance window for a DataHub service, the same window
is set for those Aiven Apps, and the Aiven for Apache Kafka®,
Aiven for OpenSearch® and Aiven for PostgreSQL® services.
