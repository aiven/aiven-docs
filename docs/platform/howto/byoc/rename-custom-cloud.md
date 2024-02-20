---
title: Rename your AWS custom cloud in Aiven
---

Change the name of your
[custom cloud](/docs/platform/concepts/byoc).

:::important
Custom cloud configuration in Aiven is an
[early availability feature](/docs/platform/concepts/beta_services). You cover the costs associated with building and
maintaining your custom cloud: payments for your integrated AWS
infrastructure and Aiven services within the custom cloud.
:::

## About renaming custom clouds

With the BYOC feature enabled, you can
[create custom clouds](/docs/platform/howto/byoc/create-custom-cloud) in your Aiven organizations. While
[setting up a custom cloud in Aiven](/docs/platform/howto/byoc/create-custom-cloud), you specify its name, which is a part of the initial custom
cloud's configuration. Later, you can come back to the **Rename**
setting in your cloud's page in [Aiven
Console](https://console.aiven.io/) and update the name you initially
specified.

## Prerequisites

-   Administrator's role for your Aiven organization
-   At least one
    [custom cloud created](/docs/platform/howto/byoc/create-custom-cloud) in your Aiven organization
-   Access to [Aiven Console](https://console.aiven.io/)

## Rename your cloud

1.  Log in to [Aiven Console](https://console.aiven.io/) as an
    administrator.
2.  Select the organization you want to use from the dropdown menu in
    the top right corner.
3.  From the top navigation bar, select **Admin**.
4.  From the left sidebar, select **Bring your own cloud**.
5.  In the **Bring your own cloud** view, select one of the clouds
    available on the list.
6.  In the selected cloud's page, use the ellipsis (**...**) menu in
    the top right corner to select **Rename**.
7.  In the **Rename custom cloud** window, enter a new name into the
    **Custom cloud name** field and select **Rename**.

The name of your custom cloud has been updated.

## Check it out

You can preview the updated name of your cloud by taking the following
steps:

1.  Log in to [Aiven Console](https://console.aiven.io/) as an
    administrator.
2.  Select the organization you want to use from the dropdown menu in
    the top right corner.
3.  From the top navigation bar, select **Admin**.
4.  From the left sidebar, select **Bring your own cloud**.
5.  In the **Bring your own cloud** view, see the list of the available
    clouds and identify the cloud with the name you updated.

## Related pages

-   [Bring your own cloud](/docs/platform/concepts/byoc)
-   [Create a custom cloud in Aiven](/docs/platform/howto/byoc/create-custom-cloud)
-   [Assign a project to your custom cloud](/docs/platform/howto/byoc/assign-project-custom-cloud)
-   [Add customer's contact information for your custom cloud](/docs/platform/howto/byoc/add-customer-info-custom-cloud)
