---
title: Manage customer contacts for a custom cloud
sidebar_label: Update customer contacts
---

import {ConsoleIcon} from "@site/src/components/ConsoleIcons"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";

Update the list of customer contacts for your [custom cloud](/docs/platform/concepts/byoc).

With the [BYOC feature enabled](/docs/platform/howto/byoc/enable-byoc), you can
[create custom clouds](/docs/platform/howto/byoc/create-custom-cloud) in your Aiven
organizations. While
[creating a custom cloud](/docs/platform/howto/byoc/create-custom-cloud), you add at least
the **Admin** contact so that the Aiven team can reach out to them if needed. You can change
the provided contacts any time later by following
[Update the contacts list](#update-the-contacts-list).

:::important
While you can add multiple different customer contacts for your custom cloud, **Admin** is
a mandatory role that is always required as a primary support contact.
:::

## Prerequisites

<Tabs groupId="group1">
<TabItem value="1" label="Aiven Console" default>
-   At least one
    [custom cloud created](/docs/platform/howto/byoc/create-custom-cloud) in your Aiven
    organization
-   Access to the [Aiven Console](https://console.aiven.io/)
-   [Super admin](/docs/platform/howto/make-super-admin) role in your Aiven
    organization
</TabItem>
<TabItem value="2" label="Aiven CLI">
-   At least one
    [custom cloud created](/docs/platform/howto/byoc/create-custom-cloud) in your Aiven
    organization
-   [Aiven CLI client](/docs/tools/cli) installed
-   [Super admin](/docs/platform/howto/make-super-admin) role in your Aiven
    organization
</TabItem>
</Tabs>

## Update the contacts list

<Tabs groupId="group1">
<TabItem value="1" label="Aiven Console" default>
1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your organization.
1.  Click **Admin** in the top navigation, and click <ConsoleLabel name="bringyourowncloud"/>
    in the sidebar.
1.  In the **Bring your own cloud** view, select a cloud.
1.  On the selected cloud's page, click <ConsoleLabel name="actions"/> > **Customer contact**.
1.  In the **Customer contact** window, select a new contact's role
    from the menu, enter the email address, and click <ConsoleIcon name="plus"/> to add
    the provided contact's details.
1.  When you're done adding all the contacts, select **Save changes**.
</TabItem>
<TabItem value="2" label="Aiven CLI">
Use the
[avn byoc update](/docs/tools/cli/byoc#avn-byoc-update)
command to edit the list of individuals from your organization to be contacted by the Aiven
team if needed.

    ```bash
    avn byoc update                               \
      --organization-id "ORGANIZATION_IDENTIFIER" \
      --byoc-id "CUSTOM_CLOUD_IDENTIFIER"         \
      '
        {
          "contact_emails": [
            {
              "email": "EMAIL_ADDRESS",
              "real_name": "John Doe",
              "role": "Admin"
            }
          ]
        }
      '
    ```

</TabItem>
</Tabs>

## Related pages

-   [About bring your own cloud](/docs/platform/concepts/byoc)
-   [Bring your own cloud networking and security](/docs/platform/howto/byoc/networking-security)
-   [Enable bring your own cloud (BYOC)](/docs/platform/howto/byoc/enable-byoc)
-   [Create a custom cloud in Aiven](/docs/platform/howto/byoc/create-custom-cloud)
-   [Assign a project to your custom cloud](/docs/platform/howto/byoc/assign-project-custom-cloud)
-   [Rename a custom cloud](/docs/platform/howto/byoc/rename-custom-cloud)
-   [Download an infrastructure template and a variables file](/docs/platform/howto/byoc/download-infrastructure-template)
-   [Tag custom cloud resources](/docs/platform/howto/byoc/tag-custom-cloud-resources)
-   [Storing data in custom clouds](/docs/platform/howto/byoc/store-data)
-   [Delete a custom cloud](/docs/platform/howto/byoc/delete-custom-cloud)
