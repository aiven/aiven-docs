---
title: Delete a custom cloud
sidebar_label: Delete custom clouds
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Delete a [custom cloud](/docs/platform/concepts/byoc) so that it's no longer available in your Aiven organization, units, or projects.

## About deleting custom clouds

After deleting a custom cloud, the data co-hosted in this cloud will no
longer be available from the Aiven platform. Before deleting your custom
cloud, make sure there are no active services using this cloud.

### Impact on your Aiven resources

The deletion impacts mostly resources on the Aiven site, such as cloud
configuration files.

### Impact on your remote cloud resources

A bastion service and the corresponding compute instance are deleted as a
consequence of your custom cloud's removal. As for resources created
when applying the Terraform template to create the custom cloud, they
are not removed after deleting the custom cloud. Unless you've removed
them earlier, you're advised to do that after deleting your cloud.

## Prerequisites

<Tabs groupId="group1">
<TabItem value="1" label="AWS" default>
-   At least one
    [custom cloud created](/docs/platform/howto/byoc/create-custom-cloud) in your Aiven
    organization.
-   No running services that use a custom cloud to be deleted
-   Depending on the dev tool to use, you have:
    - Access to the [Aiven Console](https://console.aiven.io/) or
    - [Aiven CLI client](/docs/tools/cli) installed
</TabItem>
<TabItem value="2" label="GCP">
-   At least one
    [custom cloud created](/docs/platform/howto/byoc/create-custom-cloud) in your Aiven
    organization.
-   No running services that use a custom cloud to be deleted
-   You have the [Aiven CLI client](/docs/tools/cli) installed.
</TabItem>
<TabItem value="3" label="Azure & OCI">
-   At least one
    [custom cloud created](/docs/platform/howto/byoc/create-custom-cloud) in your Aiven
    organization.
-   No running services that use a custom cloud to be deleted
</TabItem>
</Tabs>

## Delete your cloud

<Tabs groupId="group1">
<TabItem value="1" label="AWS" default>
1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your organization.
1.  Click **Admin** in the top navigation, and click <ConsoleLabel name="bringyourowncloud"/>
    in the sidebar.
1.  In the **Bring your own cloud** view, select a cloud.
1.  On the selected cloud's page, click <ConsoleLabel name="actions"/> > **Delete**.
1.  Click **Delete** in the **Warning** window.
</TabItem>
<TabItem value="2" label="GCP">
Use the [avn byoc delete](/docs/tools/cli/byoc#avn-byoc-delete) command to delete your
custom cloud.
</TabItem>
<TabItem value="3" label="Azure & OCI">
Reach out to your account team to request deleting your custom cloud.
</TabItem>
</Tabs>

:::important
Remember to remove the resources created in your remote cloud account when
applying the Terraform template to create the custom cloud. They are not
removed automatically after deleting the cloud. Unless you've removed
them earlier, use the `terraform destroy` command to delete them. See
the guidelines on how to use the `destroy` command in [Command:
destroy](https://developer.hashicorp.com/terraform/cli/commands/destroy).
:::

:::note
When running `terraform destroy`, add `-var-file=FILE_NAME.vars` as an option.
:::

## Related pages

-   [About bring your own cloud (BYOC)](/docs/platform/concepts/byoc)
-   [Enable bring your own cloud (BYOC)](/docs/platform/howto/byoc/enable-byoc)
-   [Create a custom cloud in Aiven](/docs/platform/howto/byoc/create-custom-cloud)
-   [Assign a project to your custom cloud](/docs/platform/howto/byoc/assign-project-custom-cloud)
-   [Add customer's contact information for your custom cloud](/docs/platform/howto/byoc/add-customer-info-custom-cloud)
-   [Tag custom cloud resources](/docs/platform/howto/byoc/tag-custom-cloud-resources)
