---
title: Scale Aiven for DataHub services
sidebar_label: Scale DataHub services
limited: true
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RequirementsPanel from "@site/src/components/RequirementsPanel";

Scale your Aiven for DataHub service by changing its service plan to optimize costs.

<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: ['Manage services', 'Operator', 'Project admin'],
    },
  ]}
/>

1. In your project, click <ConsoleLabel name="services"/>.
1. Open your DataHub service.
1. In the **Cloud and network** section,
   click <ConsoleLabel name="actions"/> > **Change cloud or deployment model**.
1. In the **Plan** section, select a new plan.
1. Optional: Select a different **Cloud** provider or region.
1. Click **Change**.
