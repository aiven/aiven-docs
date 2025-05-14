---
title: Manage billing and shipping addresses
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"

Create addresses in the billing section of the Aiven Platform and use them as billing and shipping addresses in your billing groups.

You must be an
[organization admin](/docs/platform/concepts/permissions#organization-roles-and-permissions)
to access this feature in the Aiven Console.

## Create an address

1.  In the organization, click **Billing**.
1.  Click **Addresses**.
1.  Click **Create address**.
1.  Enter the address details and click **Create address**.
1.  Optional: Assign the address to your billing groups.
    :::note
    The address is added as both the billing and shipping address for the billing group.
    You can [change the billing or shipping address](#assign-addresses-to-a-billing-group)
    in the billing group.

## Update an address

1.  In the organization, click **Billing**.
1.  Click **Addresses**.
1.  In the address to update, click **Edit**.
1.  Edit the address and click **Save changes**.

## Assign addresses to a billing group

1.  In the organization, click **Billing**.
1.  Click **Billing groups**.
1.  Select the name of the billing group and click the **Billing information** tab.
1.  In the **Company addresses** section, click **Edit**.
1.  Select an address for the billing address or shipping address.
    :::note
    The shipping address is used to calculate [tax](/docs/platform/concepts/tax-information).

1.  Click **Save**.

## Delete an address

You cannot delete an address that you assigned to a billing group. To delete an address
that is used for a billing group
[assign a different address](#assign-addresses-to-a-billing-group).

1.  In the organization, click **Billing**.
1.  Click **Addresses**.
1.  In the address to update, click **Delete**.
