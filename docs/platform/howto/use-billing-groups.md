---
title: Manage billing groups
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"

Costs associated with services and features in an Aiven project are charged to the payment method assigned to its [billing group](/docs/platform/concepts/billing-and-payment#billing-groups).

Billing groups let you set up billing profiles and use them across different projects
in your organization. A consolidated [invoice](/docs/platform/howto/use-billing-groups)
is created for each billing group.

You must be an
[organization admin](/docs/platform/concepts/permissions#organization-roles-and-permissions)
to access this feature in the Aiven Console.

## Create a billing group

1.  In the organization, click **Billing**.
1.  Click <ConsoleLabel name="billinggroups"/>.
1.  Click **Create billing group**.
1.  Enter a name for the billing group and click **Continue**.
1.  Enter the billing details. You can also copy these details from
    another billing group by selecting it from the list. Click
    **Continue**.
1.  Select the projects to add to this billing group. You
    can also skip this and add projects later. Click **Continue**.
1.  Check the information in the **Summary** step. To make changes to
    any section, click **Edit**.
1.  When you have confirmed everything is correct, click **Create**.

## Rename a billing group

1.  In the organization, click **Billing**.
1.  Find the billing group to rename, click <ConsoleLabel name="actions"/> > **Rename**.
1.  Enter the new name and click **Rename**.

## Update a billing group

To change the payment method, billing and shipping address, VAT ID,
billing contact emails, invoice emails, or other billing details:

1.  In the organization, click **Billing**.
1.  Select the name of the billing group to update.
1.  On the **Billing information** tab click **Edit** to update the
    details for that section.

## Assign projects to a billing group

You can assign a project to any billing group in your organization. To assign a project
to a billing group in another organization, you have to
[move the project to that organization](/docs/platform/howto/manage-project#move-a-project).

1.  In the organization, click **Billing**.
1.  Select the name of the billing group to assign projects to.
1.  On the **Projects** tab, click **Assign projects**.
1.  Select the projects to assign to the billing group and click **Assign**.

## Move a project to another billing group

1.  In the organization, click **Billing**.
1.  Click the name of the billing group.
1.  On the **Projects** tab, find the project to move.
1.  Click <ConsoleLabel name="actions"/> and select the billing group
    to move it to.

## Delete a billing group

1.  In the organization, click **Billing**.
1.  Click the name of the billing group to delete.
1.  On the **Projects** tab, move any projects to a different billing group.
1.  Click <ConsoleLabel name="actions"/> at the top of the page.
1.  Click **Delete** and **Confirm**.
