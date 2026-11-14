---
title: Use credits
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"
import RequirementsPanel from "@site/src/components/RequirementsPanel";

Use credits to pay for your Aiven services by adding them to a billing group. All projects assigned to the billing group automatically use its credits for the costs of the projects and the services within the projects.

<RequirementsPanel
	items={[
		{
			label: 'Permissions',
			values: ['`organization:billing:write`', '`role:organization:admin`'],
		},
	]}
/>

To add credits to a billing group:

1. Click **Billing**.
1. Click <ConsoleLabel name="billinggroups"/>.
1. Find the billing group and click **Details**.
1. On the **Credits** tab, enter the credit code and click **Claim credits**.
