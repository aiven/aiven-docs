---
title: Add or remove customer contacts for your custom cloud
sidebar_label: Update customer contacts
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";

Update the list of customer contacts for your [custom cloud](/docs/platform/concepts/byoc).

## About updating customer contacts

With the [BYOC feature enabled](/docs/platform/howto/byoc/enable-byoc), you can
[create custom clouds](/docs/platform/howto/byoc/create-custom-cloud) in your Aiven
organizations. While
[setting up a custom cloud](/docs/platform/howto/byoc/create-custom-cloud) on the Aiven
platform, you add at least the **Admin** contact as a part of the initial custom
cloud's configuration. Later, you can come back to the the **Customer contact**
setting in your cloud's page in [Aiven Console](https://console.aiven.io/) and update the
contacts list you initially created for your cloud.

:::important
While you can add multiple different customer contacts for your custom cloud, **Admin** is
a mandatory role that is always required as a primary support contact.
:::

## Prerequisites

-   [Super admin](/docs/platform/howto/make-super-admin) role for your Aiven organization
-   At least one
    [custom cloud created](/docs/platform/howto/byoc/create-custom-cloud) in your Aiven organization
-   Access to the [Aiven Console](https://console.aiven.io/)

## Update the contacts list

1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your organization.
1.  Click **Admin** in the top navigation, and click <ConsoleLabel name="bringyourowncloud"/>
    in the sidebar.
1.  In the **Bring your own cloud** view, select a desired cloud.
1.  On the selected cloud's page, click <ConsoleLabel name="actions"/> > **Customer contact**.
1.  In the **Customer contact** window, select a new contact's role
    from the menu, enter the email address, and click **+** to
    add the provided contact's details.
1.  When you're done adding all the contacts, click **Save changes**.

## Related pages

-   [About bring your own cloud (BYOC)](/docs/platform/concepts/byoc)
-   [Enable the bring your own cloud (BYOC) feature](/docs/platform/howto/byoc/enable-byoc)
-   [Create a custom cloud in Aiven](/docs/platform/howto/byoc/create-custom-cloud)
-   [Assign a project to your custom cloud](/docs/platform/howto/byoc/assign-project-custom-cloud)
-   [Tag custom cloud resources](/docs/platform/howto/byoc/tag-custom-cloud-resources)
-   [Use tiered storage in custom clouds](/docs/platform/howto/byoc/use-byoc-tiered-storage)
-   [Rename your custom cloud](/docs/platform/howto/byoc/rename-custom-cloud)
