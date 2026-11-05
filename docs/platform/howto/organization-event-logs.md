---
title: Event logs
---

import RequirementsPanel from "@site/src/components/RequirementsPanel";

Aiven consolidates all event logs for an organization into centralized event logs.
This lets you view all events across your organization's units and projects in one place.
Events include information on the action, who performed the action, the date and time,
and the target resource. The target can be the organization, a unit, project, or service.
You can filter by user, organizational unit, project, service, billing group, and
time range.

Logs are retained for 30 days.

<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: ['`organization:event_logs:read`', '`role:organization:admin`'],
    },
  ]}
/>

## View organization event logs

1. Click **Admin**.
1. Click **Event logs**.

## Download organization event logs

To download a CSV file of your organization's event logs:

1. Click **Admin**.
1. Click **Event logs**.
1. Click **Export logs**.
