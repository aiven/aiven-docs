---
title: Set spend limits
early: true
---

import RequirementsPanel from "@site/src/components/RequirementsPanel";
import ConsoleLabel from "@site/src/components/ConsoleIcons";

Set spend limits to control AI gateway costs. You can set a cap at the organization level and override it for specific keys and users.

If the limit is reached, all API calls are blocked until the limit resets
at the end of the reset period. Requests that were already accepted
before the limit was reached finish and are charged. Setting a limit to $0 USD
refuses every request.

## Multi-level budgets

You can set spend limits at different levels:

- **Organization spend limit**: This caps the total spend of all keys in the
   organization.
- **Project spend limit**: This caps the total spend of all keys in a project.
- **Default spend limit per API key**: This caps the spend of each API key that doesn't
   have a custom limit set.
- **Default spend limit per user**: This caps the spend of each user for all the keys
   they own, if the user doesn't have a custom limit set.

Custom limits can be set for individual keys and users. Keys and users that don't have
a custom limit inherit their spend limit from the organization and project-level settings.

## Set an organization spend limit

<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: ['`role:organization:admin`'],
    },
  ]}
/>

1. In your organization click **Admin**.
1. Click **AI gateway**.
1. Click **Configure**.
1. Enter the **Spend limit** for the organization, API keys, or users.
1. Select the **Reset period**.
1. Click **Save changes**.

## Set a project spend limit

<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: ['`role:organization:admin`'],
    },
  ]}
/>

1. In your organization click **Admin**.
1. Click **AI gateway**.
1. Find the project and click <ConsoleLabel name="actions"/> > **Change spend limit**.
1. Enter the **Spend limit**.
1. In the **Daily spend limit** and **Monthly spend limit**,
   select the organization default or custom.
   Organization admin can also select **Unlimited**. This allows the project spend to
   exceed the organization-level spend limit.
1. Click **Save changes**.

## Set the spend limit for an API key

<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: ['`project:ai_gateway_keys:write`', '`role:organization:admin`'],
    },
  ]}
/>

You can override the organization spend limit by setting the spend limit
for a specific key. Only users with the `role:organization:admin` role can set
a spend limit that exceeds the organization-level setting.

1. In your organization click **Admin**.
1. Click **AI gateway**.
1. Find the key and click <ConsoleLabel name="actions"/> > **Change spend limit**.
1. Enter the **Spend limit**.
1. In the **Daily spend limit** and **Monthly spend limit**,
   select the organization default or custom.
   Organization admin can also select **Unlimited**. This allows the key spend to
   exceed the organization-level spend limit.
1. Click **Save changes**.
