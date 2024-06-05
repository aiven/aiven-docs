---
title: Rename your AWS custom cloud in Aiven
sidebar_label: Rename custom clouds
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";

Change the name of your [custom cloud](/docs/platform/concepts/byoc).

## About renaming custom clouds

With the [BYOC feature enabled](/docs/platform/howto/byoc/enable-byoc), you can
[create custom clouds](/docs/platform/howto/byoc/create-custom-cloud) in your Aiven
organizations. While
[setting up a custom cloud](/docs/platform/howto/byoc/create-custom-cloud) on the Aiven
platform, you specify the cloud name as a part of the initial custom
cloud's configuration. Later, you can come back to the **Rename**
setting in your cloud's page in the [Aiven
Console](https://console.aiven.io/) and update the name you initially
specified.

## Prerequisites

-   [Super admin](/docs/platform/howto/make-super-admin) role for your Aiven organization
-   At least one
    [custom cloud created](/docs/platform/howto/byoc/create-custom-cloud) in your Aiven organization
-   Access to the [Aiven Console](https://console.aiven.io/)

## Rename your cloud

1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your organization.
1.  Click **Admin** in the top navigation, and click <ConsoleLabel name="bringyourowncloud"/>
    in the sidebar.
1.  In the **Bring your own cloud** view, select a desired cloud.
1.  On the selected cloud's page, click <ConsoleLabel name="actions"/> > **Rename**.
1.  In the **Rename custom cloud** window, enter a new name, and click **Rename**.

## Related pages

-   [About bring your own cloud (BYOC)](/docs/platform/concepts/byoc)
-   [Enable bring your own cloud (BYOC)](/docs/platform/howto/byoc/enable-byoc)
-   [Create a custom cloud in Aiven](/docs/platform/howto/byoc/create-custom-cloud)
-   [Assign a project to your custom cloud](/docs/platform/howto/byoc/assign-project-custom-cloud)
-   [Add customer's contact information for your custom cloud](/docs/platform/howto/byoc/add-customer-info-custom-cloud)
-   [Tag custom cloud resources](/docs/platform/howto/byoc/tag-custom-cloud-resources)
-   [Use tiered storage in custom clouds](/docs/platform/howto/byoc/use-byoc-tiered-storage)
