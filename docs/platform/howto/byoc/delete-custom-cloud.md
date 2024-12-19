---
title: Delete a custom cloud
sidebar_label: Delete custom clouds
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Delete a [custom cloud](/docs/platform/concepts/byoc) so that it's no longer available in your Aiven organization, units, or projects.

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
<TabItem value="1" label="Aiven Console" default>
-   You have at least one
    [custom cloud created](/docs/platform/howto/byoc/create-cloud/create-custom-cloud) in your Aiven
    organization.
-   You have no running services that use a custom cloud to be deleted.
-   You have access to the [Aiven Console](https://console.aiven.io/).
-   You have the [organization admin](/docs/platform/concepts/permissions#organization-roles-and-permissions)
    role in your Aiven organization.
</TabItem>
<TabItem value="2" label="Aiven CLI">
-   You have at least one
    [custom cloud created](/docs/platform/howto/byoc/create-cloud/create-custom-cloud) in your Aiven
    organization.
-   You have no running services that use a custom cloud to be deleted.
-   You have the [Aiven CLI client](/docs/tools/cli) installed.
-   You have the [organization admin](/docs/platform/concepts/permissions#organization-roles-and-permissions)
    role in your Aiven organization.
</TabItem>
</Tabs>

## Delete your cloud

<Tabs groupId="group1">
<TabItem value="1" label="Aiven Console" default>
1.  Log in to the [Aiven Console](https://console.aiven.io/), and go to your organization.
1.  Click **Admin** in the top navigation, and click <ConsoleLabel name="bringyourowncloud"/>
    in the sidebar.
1.  In the **Bring your own cloud** view, select a cloud.
1.  On the selected cloud's page, click <ConsoleLabel name="actions"/> > **Delete**.
1.  Click **Delete** in the **Warning** window.
</TabItem>
<TabItem value="2" label="Aiven CLI">
Use the [avn byoc delete](/docs/tools/cli/byoc#avn-byoc-delete) command to delete your
custom cloud.

```bash
avn byoc delete                               \
  --organization-id "ORGANIZATION_IDENTIFIER" \
  --byoc-id "CUSTOM_CLOUD_IDENTIFIER"
```

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
When running `terraform destroy`, add `-var-file=FILE_NAME.tfvars` as an option.
:::

## Related pages

-   [View the status of a custom cloud](/docs/platform/howto/byoc/view-custom-cloud-status)
-   [Bring your own cloud networking and security](/docs/platform/howto/byoc/networking-security)
