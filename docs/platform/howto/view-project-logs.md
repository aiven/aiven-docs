---
title: Project event logs
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import {ConsoleIcon} from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RelatedPages from "@site/src/components/RelatedPages";
import RequirementsPanel from "@site/src/components/RequirementsPanel";

Monitor activity in your Aiven projects with the project event logs, which show all activity in the project and its services. Event logs are retained for 30 days.

<RequirementsPanel
	items={[
		{
			label: 'Permissions',
			values: ['`project:event_logs:read`', '`role:project:admin`', '`role:project:manager`', '`role:organization:admin`'],
		},
	]}
/>

## View project event logs

1.  Click <ConsoleLabel name="Projects"/> and choose a project.
1.  Click **Event log**.

## Export project event logs

You can download a CSV file of the last 30 days of your project's event logs.
The filters you apply to the event logs are also applied to the downloaded file.

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. In the project, click <ConsoleLabel name="logs"/>.
1. Click **Export logs**.

</TabItem>
<TabItem value="api" label="API">

Call the
[ProjectEventLogsDownload](https://api.aiven.io/doc/#tag/Organizations/operation/ProjectEventLogsDownload)
endpoint.

```bash
curl --request POST \
  --url https://api.aiven.io/v1/organization/ORGANIZATION_ID/project/PROJECT_ID/event-logs/download \
  --header 'Authorization: Bearer BEARER_TOKEN' \
  --header 'content-type: application/json' \
  --output event-logs.csv \
  --data '
    {
      "from_time": "FROM_TIME",
      "to_time": "TO_TIME",
      "asset_filters": {
        "service_id": "SERVICE_NAME"
      }
    }
  '
```

Where:

- `ORGANIZATION_ID` is the ID of the organization that the project belongs to.
- `PROJECT_ID` is the name of your project.
- `BEARER_TOKEN` is your [authentication token](/docs/platform/howto/create_authentication_token).
- `FROM_TIME` is the start of the time range in ISO 8601 UTC format, for example
  `2026-06-15T10:00:00Z`. Defaults to 30 days before the current time.
- `TO_TIME` is the end of the time range in ISO 8601 UTC format. If not specified, no
  upper time bound is applied.
- `SERVICE_NAME` is the name of a service to filter by.

All request body fields are optional. To export all events from the last 30 days,
send an empty JSON object as the request body.

To filter the exported logs, use the following fields in the request body:

- `asset_filters`: Filter by `actor`, `actor_user_id`, or `service_id`.
- `event_types`: An array of event types to include, for example `["service_create", "service_update"]`.

</TabItem>
</Tabs>

<RelatedPages/>
- [View and export organization logs](/docs/platform/howto/organization-event-logs)
