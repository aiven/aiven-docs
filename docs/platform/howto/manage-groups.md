---
title: Manage groups of users
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';

Create groups of users in your organization to make it easier to manage access to your organization's resources.

You can [grant permissions](/docs/platform/howto/manage-permissions) to groups
for projects, giving them the right level of access to the project and its services.

## Create a group

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1.  Click <ConsoleLabel name="userinformation"/> > **Admin**.
1.  Click <ConsoleLabel name="groups"/>.
1.  Click **Create group**.
1.  Enter a unique name for the group. You can also enter a description.
1.  Optional: To assign users to the group, click the toggle and choose
    the users to add.
1.  Click **Create group**.

</TabItem>
<TabItem value="terraform" label="Terraform">

<TerraformSample filename='resources/aiven_organization_user_group/resource.tf' />

More information on this resource and its configuration options are available in the [Terraform documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/organization_user_group).

</TabItem>
</Tabs>

## Add users to a group

You can only add users that are
[part of your organization](/docs/platform/howto/manage-org-users) to your groups.

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1.  Click <ConsoleLabel name="userinformation"/> > **Admin**.
1.  Click <ConsoleLabel name="groups"/>.
1.  Select the group to add users to.
1.  Click **Add users**.
1.  Choose the users to add.
1.  Click **Add users**.

</TabItem>
<TabItem value="terraform" label="Terraform">

<TerraformSample filename='resources/aiven_organization_user_group_member/resource.tf' />

More information on this resource and its configuration options are available in the [Terraform documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/organization_user_group_member).

</TabItem>
</Tabs>

## Rename a group

1.  Click <ConsoleLabel name="userinformation"/> > **Admin**.
1.  Click <ConsoleLabel name="groups"/>.
1.  Find the group to rename and
    click <ConsoleLabel name="actions"/> > **Rename**.
1.  Enter the new name and click **Save changes**.

## Remove a group

When you remove a group, the users in that group will lose access to any
resources the group has permissions for unless they are part of another
group with that access.

1.  Click <ConsoleLabel name="userinformation"/> > **Admin**.
1.  Click <ConsoleLabel name="groups"/>.
1.  Find the group to remove and
    click <ConsoleLabel name="actions"/> > **Remove** and confirm.
