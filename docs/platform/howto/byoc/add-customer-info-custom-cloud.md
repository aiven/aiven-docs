---
title: Add or remove customer contacts for your AWS custom cloud in Aiven
sidebar_label: Update customer contacts
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";

Update the list of customer contacts for your [custom cloud](/docs/platform/concepts/byoc).

## About updating customer contacts

With the BYOC feature enabled, you can
[create custom clouds](/docs/platform/howto/byoc/create-custom-cloud) in your Aiven
organizations. While creating a custom cloud in Aiven, add at least the
**Admin** contact. Later, you can come back to the the **Customer contact**
setting in your cloud's page in [Aiven Console](https://console.aiven.io/) and update the
contacts list you initially created for your cloud.

:::important
While you can add multiple different customer contacts for your custom cloud, **Admin** is
a mandatory role that is always required as a primary support contact.
:::

## Prerequisites

-   Administrator's role for your Aiven organization
-   At least one
    [custom cloud created](/docs/platform/howto/byoc/create-custom-cloud) in your Aiven organization
-   Access to [Aiven Console](https://console.aiven.io/)

## Update the contacts list
<!-- vale off -->
1.  Log in to [Aiven Console](https://console.aiven.io/) as an
    administrator.

2.  Select the organization to use from the dropdown menu in
    the top right corner.

3.  From the top navigation bar, select **Admin**.

4.  From the left sidebar, select <ConsoleLabel name="bringyourowncloud"/>.

5.  In the **Bring your own cloud** view, select one of the clouds
    available on the list.

6.  In the selected cloud's page, click <ConsoleLabel name="actions"/> > **Customer contact**.

7.  In the **Customer contact** window, select a new contact's role
    from the dropdown menu, enter the email address, and select **+** to
    add the provided contact's details.

8.  When you're done adding all the contacts, select **Save changes**.

The list of contacts for your cloud has been updated.
<!-- vale off -->
## Verify the update

Preview the updated list of contacts:

1.  Log in to [Aiven Console](https://console.aiven.io/) as an
    administrator.
2.  Select the organization you want to use from the dropdown menu in
    the top right corner.
3.  From the top navigation bar, select **Admin**.
4.  From the left sidebar, select <ConsoleLabel name="bringyourowncloud"/>.
5.  In the **Bring your own cloud** view, select one of the clouds
    available on the list.
6.  In the selected cloud's page, click <ConsoleLabel name="actions"/> in
    the top right corner and select **Customer contact**.

## Related pages

-   [Bring your own cloud](/docs/platform/concepts/byoc)
-   [Create a custom cloud in Aiven](/docs/platform/howto/byoc/create-custom-cloud)
-   [Assign a project to your custom cloud](/docs/platform/howto/byoc/assign-project-custom-cloud)
-   [Rename your custom cloud](/docs/platform/howto/byoc/rename-custom-cloud)
