---
title: Set spend limits
early: true
---

import RequirementsPanel from "@site/src/components/RequirementsPanel";
import {ConsoleIcon} from "@site/src/components/ConsoleIcons"

Set spend limits to control AI gateway costs. You can set a cap at the organization level
and override it for specific keys.

If the limit is reached, all API calls are blocked
until the limit resets at the end of the reset period.

<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: ['`role:organization:admin`'],
    },
  ]}
/>

## Set an organization spend limit

1. In your organization click **Admin**.
1. Click **AI gateway**.
1. Click **Configure**.
1. Enter the **Spend limit**.
1. Select the **Reset period**.
1. Click **Save changes**.

## Set the spend limit for an API key

You can override the organization spend limit by setting the spend limit
for a specific key:

1. In your organization click **Admin**.
1. Click **AI gateway**.
1. Find the key and click <ConsoleIcon name="actions"/> > **Change spend limit**.
1. Enter the **Spend limit**.
1. Select the **Reset period**.
1. Click **Save changes**.
