---
title: Manage billing groups
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"

To view and update your billing groups in the [Aiven Console](https://console.aiven.io/) go to the organization and click **Billing**.

:::info
You must be a [super admin](/docs/platform/howto/make-super-admin) to access this feature.
:::

## Rename billing groups

1.  On the **Billing** page, find the billing group that to
    rename.
1.  Click <ConsoleLabel name="actions"/> > **Rename**.
1.  Enter the new name and click **Rename**.

## Update your billing information

To change the payment card, address, billing contacts, or other billing
details:

1.  Select the name of the billing group that to update.
1.  On the **Billing information** tab click **Edit** to update the
    details for that section.

## Assign projects to a billing group

1.  Select the name of the billing group that to assign
    projects to.
1.  On the **Projects** tab, click **Assign projects**.
1.  Select the projects to assign to the billing group and click
    **Assign**.

:::note
Assigning a project that is already assigned to another billing group
will unassign it from that billing group.
:::

## Move a project to another billing group

1.  Select the name of the billing group.
1.  On the **Projects** tab, find the project that to move.
1.  Click the three dots for that project and select the billing group
    to move it to.

## Delete billing groups

1.  Select the name of the billing group that to delete.
1.  On the **Projects** tab, confirm that no projects are assigned to
    this billing group. If there are projects listed, move them to a
    different billing group.
1.  Click the three dots next to the current accumulated monthly bill
    amount.
1.  Select **Delete** and **Confirm**.

You are taken back to the Billing page.
