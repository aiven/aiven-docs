---
title: Manage billing groups
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"


With [billing groups](/docs/platform/concepts/billing-groups-overview) you can set up billing profiles to be used across all the projects in an organization. A consolidated [invoice](/docs/platform/howto/use-billing-groups) is created for each billing group.

You must be a [super admin](/docs/platform/howto/make-super-admin) to access this
feature in the Aiven Console.

## Create a billing group

1.  In the organization, click **Billing** > <ConsoleLabel name="billinggroups"/>.
1.  Click **Create billing group**.
1.  Enter the billing details.
1.  Optional: Select the projects to assign to this billing group.
1.  Click **Create billing group**.

## Rename a billing group

1.  In the organization, click **Billing** > <ConsoleLabel name="billinggroups"/>.
1.  Find the billing group to rename, click <ConsoleLabel name="actions"/> > **Rename**.
1.  Enter the new name and click **Rename**.

## Update your billing information

To change the payment card, address, billing contacts, or other billing
details:

1.  In the organization, click **Billing** > <ConsoleLabel name="billinggroups"/>.
1.  Select the name of the billing group to update.
1.  On the **Billing information** tab, click **Edit** to update the
    details for that section.
1. Click **Save**.

## Assign projects to a billing group

1.  In the organization, click **Billing** > <ConsoleLabel name="billinggroups"/>.
1.  Select the billing group to assign projects to.
1.  On the **Projects** tab, click **Assign projects**.
1.  Select the projects to assign to the billing group and click **Assign**.

## Move a project to another billing group

1.  In the organization, click **Billing** > <ConsoleLabel name="billinggroups"/>.
1.  Select the billing group that the project is assigned to.
1.  On the **Projects** tab, find the project to move.
1.  Click <ConsoleLabel name="actions"/> and select the billing group
    to move it to.

## Delete a billing group

1.  In the organization, click **Billing** > <ConsoleLabel name="billinggroups"/>.
1.  Select the billing group to delete.
1.  On the **Projects** tab, move all projects to a different billing group.
1.  Click <ConsoleLabel name="actions"/> at the top of the page.
1.  Click **Delete** and **Confirm**.
