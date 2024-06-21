---
title: Tag custom cloud resources
sidebar_label: Tag resources
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"

Custom cloud tags propagate to resources on the Aiven platform and in your own cloud infrastructure. Tagging allows resource categorization, which simplifies governance, cost allocation, and system performance review.

:::important
Since the tags propagate to your own cloud infrastructure, the contents and total number
of the tags need to stay within limits imposed by your cloud provider.
:::

## Types of tagging

You can tag your custom cloud resources by:

- [Service tagging](#service-tagging), affecting Aiven service nodes and VMs
- [Infrastructure tagging](#infrastructure-tagging), affecting all taggable BYOC infrastructure
  components

## Tagging service nodes and VMs{#service-tagging}

If you add a tag to a BYOC service, all the service nodes and VMs inherit this tag, and
the tag propagates to your own cloud infrastructure.

### Prerequisites

<Tabs groupId="group1">
<TabItem value="1" label="AWS" default>
-   At least one
    [custom cloud created](/docs/platform/howto/byoc/create-custom-cloud) in your Aiven
    organization.
-   Access to the [Aiven Console](https://console.aiven.io/)
</TabItem>
<TabItem value="2" label="GCP">
-   At least one
    [custom cloud created](/docs/platform/howto/byoc/create-custom-cloud) in your Aiven
    organization.
-   Access to the [Aiven Console](https://console.aiven.io/)
</TabItem>
<TabItem value="3" label="Azure & OCI">
-   At least one
    [custom cloud created](/docs/platform/howto/byoc/create-custom-cloud) in your Aiven
    organization.
</TabItem>
</Tabs>

### Tag service nodes and VMs

<Tabs groupId="group1">
<TabItem value="1" label="AWS" default>
[Create a resource tag](/docs/platform/howto/tag-resources) for a BYOC service the
same way you create it for a regular Aiven-managed service. The only extra step tagging a
BYOC service is adding prefix `byoc_resource_tag` to the tag key.

For instructions on how to add, update, remove, or list service tags, see
[Use resource tags](/docs/platform/howto/tag-resources), where you also find limits and
limitations that apply to service tags and tagging.

For example, to label all VMs running a particular BYOC service with the tag that has
`my-cost-center` as a key and `12345` as a value, create a resource tag for this service
with key `byoc_resource_tag:my-cost-center` and value `12345`.
</TabItem>
<TabItem value="2" label="GCP">
[Create a resource tag](/docs/platform/howto/tag-resources) for a BYOC service the
same way you create it for a regular Aiven-managed service. The only extra step tagging a
BYOC service is adding prefix `byoc_resource_tag` to the tag key.

For instructions on how to add, update, remove, or list service tags, see
[Use resource tags](/docs/platform/howto/tag-resources), where you also find limits and
limitations that apply to service tags and tagging.

For example, to label all VMs running a particular BYOC service with the tag that has
`my-cost-center` as a key and `12345` as a value, create a resource tag for this service
with key `byoc_resource_tag:my-cost-center` and value `12345`.
</TabItem>
<TabItem value="3" label="Azure & OCI">
Reach out to your account team to add or update tags for services hosted in your custom cloud.
</TabItem>
</Tabs>

## Tagging infrastructure components{#infrastructure-tagging}

<Tabs groupId="group1">
<TabItem value="1" label="AWS" default>
You can define a set of tags for each taggable infrastructure component created by the
Terraform infrastructure template (for example, VPCs, subnets, or security groups). You
can manage the tags using the [Aiven CLI client](/docs/tools/cli) or directly in the
variable file used to run the Terraform infrastructure template.
</TabItem>
<TabItem value="2" label="GCP">
You can define a set of tags for each taggable infrastructure component created by the
Terraform infrastructure template (for example, VPCs, subnets, or security groups). You
can manage the tags using the [Aiven CLI client](/docs/tools/cli) or directly in the
variable file used to run the Terraform infrastructure template.
</TabItem>
<TabItem value="3" label="Azure & OCI">
Reach out to your account team to add or update infrastructure tags for your custom cloud.
</TabItem>
</Tabs>

:::important
Any change to infrastructure tags requires reapplying the Terraform template.
:::

### Limitations

- Tag keys are in lower case and can include ASCII alphanumeric printable English
  characters. Punctuation characters other than dashes (between words) are not allowed.
- Do not use tag keys that start with `aiven`.
- Do not change the tags that the Terraform template applies by default.

### Before you start

<Tabs groupId="group1">
<TabItem value="1" label="AWS" default>
-   You have at least one
    [custom cloud created](/docs/platform/howto/byoc/create-custom-cloud) in your Aiven
    organization.
-   You have the [Aiven CLI client](/docs/tools/cli) installed.
</TabItem>
<TabItem value="2" label="GCP">
-   You have at least one
    [custom cloud created](/docs/platform/howto/byoc/create-custom-cloud) in your Aiven
    organization.
-   You have the [Aiven CLI client](/docs/tools/cli) installed.
</TabItem>
<TabItem value="3" label="Azure & OCI">
-   You have at least one
    [custom cloud created](/docs/platform/howto/byoc/create-custom-cloud) in your Aiven
    organization.
</TabItem>
</Tabs>

### Manage infrastructure tags

<Tabs groupId="group1">
<TabItem value="1" label="AWS" default>
Use the
[avn byoc update](/docs/tools/cli/byoc#avn-byoc-update) command to add or update
infrastructure tags for your custom cloud.
</TabItem>
<TabItem value="2" label="GCP">
Use the
[avn byoc update](/docs/tools/cli/byoc#avn-byoc-update) command to add or update
infrastructure tags for your custom cloud.
</TabItem>
<TabItem value="3" label="Azure & OCI">
Reach out to your account team to add or update infrastructure tags for your custom cloud.
</TabItem>
</Tabs>

## Related pages

-   [About bring your own cloud (BYOC)](/docs/platform/concepts/byoc)
-   [Enable the bring your own cloud (BYOC) feature](/docs/platform/howto/byoc/enable-byoc)
-   [Create a custom cloud in Aiven](/docs/platform/howto/byoc/create-custom-cloud)
-   [Enable your AWS custom cloud in Aiven organizations, units, or projects](/docs/platform/howto/byoc/assign-project-custom-cloud)
-   [Add customer's contact information for your custom cloud](/docs/platform/howto/byoc/add-customer-info-custom-cloud)
-   [Rename your custom cloud](/docs/platform/howto/byoc/rename-custom-cloud)
