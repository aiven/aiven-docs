---
title: Get resource IDs
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

Resource IDs like organzation ID or user ID can be useful for working with the developer tools. You can get the IDs for resources in the [Aiven Console](https://console.aiven.io/).

To access the IDs in the **Admin** part of the Console, you must be an
[organization admin](/docs/platform/concepts/permissions#organization-roles-and-permissions)

## Get an organization ID

Go to <ConsoleLabel name="userinformation"/> > <ConsoleLabel name="Organizations"/>.

You can see the ID for each organization you were invited to or are a member of.

## Get an organizational unit ID

1. Click **Admin**.
1. Click <ConsoleLabel name="organization"/>.
1. In the list of **Organizational units**, get the **ID**.

## Get a user ID

1. Click **Admin**.
1. Click <ConsoleLabel name="users"/>.
1. Get the user ID from the URL. User IDs start with `u` and are usually at the
   end of the URL. For example, the user ID is `u1abc2345678` in the following URL:
   `https://console.aiven.io/account/a1f23bcdef4a/admin/users/u1abc2345678`

## Get an application user ID

1. Click **Admin**.
1. Click <ConsoleLabel name="applicationusers"/>.
1. Find the application user and get its **User ID**.

## Get a group ID

1. Click **Admin**.
1. Click <ConsoleLabel name="groups"/>.
1. Get the group ID from the URL. Group IDs start with `ug` and are usually at the
   end of the URL. For example, the user ID is `ug1a2bc3d45e6` in the following URL:
   `https://console.aiven.io/account/a1f23bcdef4a/admin/groups/ug1a2bc3d45e6`

## Get a billing group ID

1. Click **Billing**.
1. Click <ConsoleLabel name="billinggroups"/>.

The ID is under the billing group names.
