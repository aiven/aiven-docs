---
title: Organization event logs
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RequirementsPanel from "@site/src/components/RequirementsPanel";
import RelatedPages from "@site/src/components/RelatedPages";

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

## Export organization event logs

You can download a CSV file of the last 30 days of your organization's event logs.
The filters you apply to the event logs are also applied to the downloaded file.

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. Click **Admin**.
1. Click **Event logs**.
1. Click **Export logs**.

</TabItem>
<TabItem value="api" label="API">

Call the
[OrganizationEventLogsDownload](https://api.aiven.io/doc/#tag/Organizations/operation/OrganizationEventLogsDownload)
endpoint.

```bash
curl --request POST \
  --url https://api.aiven.io/v1/organization/ORGANIZATION_ID/event-logs/download \
  --header 'Authorization: Bearer BEARER_TOKEN' \
  --header 'content-type: application/json' \
  --output event-logs.csv \
  --data '
    {
      "from_time": "FROM_TIME",
      "to_time": "TO_TIME",
      "asset_filters": {
        "project_id": "PROJECT_ID"
      }
    }
  '
```

Where:

- `ORGANIZATION_ID` is the ID of your organization.
- `BEARER_TOKEN` is your [authentication token](/docs/platform/howto/create_authentication_token).
- `FROM_TIME` is the start of the time range in ISO 8601 UTC format, for example
  `2026-06-15T10:00:00Z`. Defaults to 30 days before the current time.
- `TO_TIME` is the end of the time range in ISO 8601 UTC format. If not specified, no
  upper time bound is applied.
- `PROJECT_ID` is the name of a project to filter by.

All request body fields are optional. To export all events from the last 30 days,
send an empty JSON object as the request body.

To filter the exported logs, use the following fields in the request body:

- `asset_filters`: Filter by `actor`, `actor_user_id`, `billing_group_id`, `project_id`,
  `service_id`, or `unit_id`.
- `event_types`: An array of event types to include, for example `["organization_create", "unit_create"]`.

</TabItem>
</Tabs>

<RelatedPages/>

- [View and export project event logs](/docs/platform/howto/view-project-logs)
