---
title: Billing reports
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import ConsoleIcon from "@site/src/components/ConsoleIcons";
import RequirementsPanel from "@site/src/components/RequirementsPanel";

Billing reports give you an overview of your organization's spending on the Aiven Platform.
It lets you filter and understand costs across projects, service types, cloud providers,
and more.


<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: ['`organization:billing:read`', '`organization:billing:write`'],
    },
  ]}
/>

The billing reports page includes the following features:

- **Current month**: The total costs, billable services, and support charges
  for the month.
- **Cost explorer**: Total costs and applied credits filtered by time range,
  billing group, cloud provider, project, service name, or service type.
- **Cost trends**: Daily cost chart
  grouped by billing group, project, service, cloud, or service type.
- **Details of charges**: A sortable line-item table with configurable columns
  for service, project, cloud, period, quantity, pricing, total, and more.

To view your organization's billing reports, go to
**Billing** > <ConsoleLabel name="billingreports"/>.
