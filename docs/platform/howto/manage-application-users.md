---
title: Manage application users
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"
import {ConsoleIcon} from "@site/src/components/ConsoleIcons"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TerraformSample from '@site/src/components/CodeSamples/TerraformSample';

Application users give non-human users programmatic access to Aiven. You grant them access to organization resources using [roles and permissions](/docs/platform/concepts/permissions).

You must be an
[organization admin](/docs/platform/concepts/permissions#organization-roles-and-permissions)
to access this feature.

:::important
 Application users can be a security risk if not carefully managed and monitored. Follow
 [best practices](/docs/platform/concepts/application-users#security-best-practices) for
 mitigating these risks.
:::

## Create an application user

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1.  Click **Admin**.
1.  Click <ConsoleLabel name="application users"/>.
1.  Click **Create application user**.
1.  Enter a name and click **Create application user**.

</TabItem>
<TabItem value="terraform" label="Terraform">

<TerraformSample filename='resources/aiven_organization_application_user/resource.tf' />

More information on this resource and its configuration options are available in the
[Terraform documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/organization_application_user).

</TabItem>
</Tabs>

:::note
If you reach the limit of application users, you can request an increase by
[contacting Aiven support](/docs/platform/howto/support#create-a-support-ticket).
:::

## Create a token for an application user

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1.  Click **Admin**.
1.  Click <ConsoleLabel name="application users"/>.
1.  Find the user and click <ConsoleLabel name="actions"/> >
    <ConsoleLabel name="viewappuserprofile"/>.
1.  In the **Authentication tokens** section, click **Generate token**.
1.  Optional: Enter a description and session duration.
1.  Click **Generate token**.
1.  Click the **Copy** icon and save your token somewhere safe.

    :::important
    You cannot view the token after you close this window.
    :::

1.  Click **Close**.

</TabItem>
<TabItem value="terraform" label="Terraform">

<TerraformSample filename='resources/aiven_organization_application_user_token/resource.tf' />

More information on this resource and its configuration options are available in the
[Terraform documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/organization_application_user_token).

</TabItem>
</Tabs>

## Revoke a token for an application user

1.  Click **Admin** > <ConsoleLabel name="application users"/>.
1.  Find the user and click <ConsoleLabel name="actions"/> >
    <ConsoleLabel name="viewappuserprofile"/>.
1.  In the **Authentication tokens** section, click <ConsoleLabel name="actions"/>.
1.  Select **Revoke**.

## Check last activity of an application user

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1.  Click **Admin** > <ConsoleLabel name="application users"/>.
1.  Click the name of the application user.
1.  To see the date and time that each application token was last used,
   go to the **Authentication tokens** section.

</TabItem>
<TabItem value="terraform" label="Terraform">

Use the `last_activity_time` attribute in
[the `aiven_organization_user_list` data source](https://registry.terraform.io/providers/aiven/aiven/latest/docs/data-sources/organization_user_list#last_activity_time-1)
to check when one of the application user's tokens was last used.

</TabItem>
</Tabs>

## Delete an application user

1.  Click **Admin** > <ConsoleLabel name="application users"/>.
1.  Find the user and click <ConsoleLabel name="actions"/> >
<ConsoleIcon name="delete"/> **Delete**.
