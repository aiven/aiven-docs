---
title: Project event logs
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import {ConsoleIcon} from "@site/src/components/ConsoleIcons";
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

To export logs:

1. In the project, click <ConsoleLabel name="logs"/>.
1. Click **Export logs**.

<RelatedPages/>
- [View and export organization logs](/docs/platform/howto/organization-event-logs)
