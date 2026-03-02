---
title: Manage billing groups
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"

Costs associated with services and features in an Aiven project are charged to the payment method assigned to its [billing group](/docs/platform/concepts/billing-and-payment#billing-groups).

Billing groups store billing information that you can use across different projects
in your organization. An [invoice](/docs/platform/howto/use-billing-groups)
is created for each billing group.

## Create a billing group

You must be an
[organization admin](/docs/platform/concepts/permissions#organization-roles-and-permissions)
to access this feature in the Aiven Console.

1.  In the organization, click **Billing**.
1.  Click <ConsoleLabel name="billinggroups"/>.
1.  Click **Create billing group**.
1.  Enter a name.
1.  Choose [addresses](/docs/platform/howto/manage-billing-addresses), a payment method,
    and a currency.
1.  Optional: Enter your VAT ID.
1.  Optional: Enter **Billing contact emails** for people that Aiven can email about
    billing issues.
1.  Enter **Invoice emails** for your monthly PDF invoices.
1.  Click **Create billing group**.

## Update a billing group

You must be an
[organization admin](/docs/platform/concepts/permissions#organization-roles-and-permissions)
to access this feature in the Aiven Console.

To change the billing group name, payment method, addresses, VAT ID, contact emails,
or other billing details:

1.  In the organization, click **Billing**.
1.  Click <ConsoleLabel name="billinggroups"/>.
1.  Find the billing group to update, and click **Edit**.
1.  Edit the billing group details and click **Save changes**.

## Assign a billing group to a project

You can assign any billing group in your organization to a project. To assign
a billing group from another organization, you have to
[move the project to that organization](/docs/platform/howto/manage-project#move-a-project).

You must be an organization admin or have the manage projects
[permission](/docs/platform/concepts/permissions#organization-roles-and-permissions)
to access this feature in the Aiven Console.

1.  In the project, click **Settings**.
1.  In the **Project settings** section, choose a billing group to assign the project to.
1.  Click **Save changes**.

## Delete a billing group

To delete a billing group, move all projects assigned to it to a
different billing group first.

You must be an
[organization admin](/docs/platform/concepts/permissions#organization-roles-and-permissions)
to access this feature in the Aiven Console.

1.  In the organization, click **Billing**.
1.  Click <ConsoleLabel name="billinggroups"/>.
1.  Find the billing group to delete and click **Details**.
1.  To move the assigned projects, on the **Projects** tab,
    click <ConsoleLabel name="Actions"/> > **Change billing group**.
1.  To delete the billing group, click <ConsoleLabel name="actions"/>
    at the top of the page.
1.  Click <ConsoleLabel name="delete"/>.
