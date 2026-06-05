---
title: Manage billing and shipping addresses
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"

Create addresses in the billing section of the Aiven Platform and use them as billing and shipping addresses in your billing groups.

You must have the `organization:billing:write`
[permission](/docs/platform/concepts/permissions#organization-roles-and-permissions)
to create and manage billing addresses.

## Create an address

1.  In the organization, click **Billing**.
1.  Click <ConsoleLabel name="billingaddress"/>.
1.  Click **Create address**.
1.  Enter the address details and click **Create address**.
1.  Optional: Select the billing groups to assign the address to
    and click **Assign address**.
    :::note
    The address is added as both the billing and shipping address for the billing groups.
    You can [change the billing or shipping address](/docs/platform/howto/use-billing-groups#update-a-billing-group)
    in the billing groups.
    :::

## Update an address

1.  In the organization, click **Billing**.
1.  Click <ConsoleLabel name="billingaddress"/>.
1.  Find the address and click **Edit**.
1.  Edit the address and click **Save changes**.

## Assign addresses to a billing group

To assign an address as a billing or shipping address for a billing group,
[edit the billing group](/docs/platform/howto/use-billing-groups#update-a-billing-group).

## Delete an address

You cannot delete an address that is assigned to a billing group. To delete an address
that is assigned to a billing group,
[assign a different address to the billing group](/docs/platform/howto/use-billing-groups#update-a-billing-group).

1.  In the organization, click **Billing**.
1.  Click <ConsoleLabel name="billingaddress"/>.
1.  Find the address and click **Delete**.
