---
title: View project logs
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import {ConsoleIcon} from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";
import RequirementsPanel from "@site/src/components/RequirementsPanel";

Monitor activity in your Aiven projects with the project event log.

<RequirementsPanel
	items={[
		{
			label: 'Permissions',
			values: ['`project:event_logs:read`', '`role:project:admin`', '`role:project:manager`', '`role:organization:admin`'],
		},
	]}
/>

To view the logs for a project:

1.  Click <ConsoleLabel name="Projects"/> and choose a project.
1.  Click **Event log**.

<RelatedPages/>
- [View organization and unit logs](/docs/platform/howto/organization-event-logs)
