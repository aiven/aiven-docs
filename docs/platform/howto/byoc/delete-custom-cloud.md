---
title: Delete your AWS custom cloud in Aiven
sidebar_label: Delete custom clouds
---

Delete a [custom cloud](/docs/platform/concepts/byoc) so that it's no longer available in your Aiven organization, units, or projects.

## About deleting custom clouds

After deleting a custom cloud, the data co-hosted in this cloud will no
longer be available from the Aiven platform. Before deleting your custom
cloud, make sure there are no active services using this cloud.

### Impact on your Aiven resources

The deletion impacts mostly resources on the Aiven site, such as cloud
configuration files.

### Impact on your AWS account resources

A bastion service and the corresponding EC2 instance are deleted as a
consequence of your custom cloud's removal. As for resources created
when applying the Terraform template to create the custom cloud, they
are not removed after deleting your custom cloud. Unless you've removed
them earlier, you're advised to do that if deleting your cloud.

## Prerequisites

-   Administrator's role for your Aiven organization
-   At least one
    [custom cloud created](/docs/platform/howto/byoc/create-custom-cloud) in your Aiven organization
-   No running services that uses a custom cloud to be deleted
-   Access to [Aiven Console](https://console.aiven.io/)

## Delete your cloud

1.  Log in to [Aiven Console](https://console.aiven.io/) as an
    administrator.
1.  Select the organization you want to use from the dropdown menu in
    the top right corner.
1.  From the top navigation bar, select **Admin**.
1.  From the left sidebar, select **Bring your own cloud**.
1.  In the **Bring your own cloud** view, select one of the clouds
    available on the list.
1.  In the selected cloud's page, use the **Actions** menu in
    the top right corner to select **Delete**.
1.  Make sure you understand the impact and, if so, confirm that you
    want to delete the cloud by selecting **Delete** in the **Warning**
    window.

Your custom cloud has been deleted.

:::important
Remember to remove the resources created in your AWS account when
applying the Terraform template to create the custom cloud. They are not
removed automatically after deleting the cloud. Unless you've removed
them earlier, use the `terraform destroy` command to delete them. See
the guidelines on how to use the `destroy` command in [Command:
destroy](https://developer.hashicorp.com/terraform/cli/commands/destroy).
:::

## Verify the update

To ensure a cloud was successfully deleted:

1.  Log in to [Aiven Console](https://console.aiven.io/) as an
    administrator.
1.  Select the organization you want to use from the dropdown menu in
    the top right corner.
1.  From the top navigation bar, select **Admin**.
1.  From the left sidebar, select **Bring your own cloud**.
1.  In the **Bring your own cloud** view, see the list of the available
    clouds to make sure the cloud you intended to delete is actually
    gone.

## Related pages

-   [Bring your own cloud](/docs/platform/concepts/byoc)
-   [Enable bring your own cloud (BYOC)](/docs/platform/howto/byoc/enable-byoc)
-   [Create a custom cloud in Aiven](/docs/platform/howto/byoc/create-custom-cloud)
-   [Assign a project to your custom cloud](/docs/platform/howto/byoc/assign-project-custom-cloud)
-   [Add customer's contact information for your custom cloud](/docs/platform/howto/byoc/add-customer-info-custom-cloud)
