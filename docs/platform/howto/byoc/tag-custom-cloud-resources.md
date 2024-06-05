---
title: Tag custom cloud resources
sidebar_label: Tag resources
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"

Custom cloud tags propagate to resources on the Aiven platform and in your own cloud infrastructure. Tagging allows resource categorization, which simplifies governance, cost allocation, and system performance review.

## Types of tagging

You can tag your custom cloud resources by:

- [Service tagging](#service-tagging), affecting Aiven service nodes and VMs
- [Infrastructure tagging](#infrastructure-tagging), affecting all taggable BYOC infrastructure
  components

## Prerequisites

-   [Super admin](/docs/platform/howto/make-super-admin) role for your Aiven organization
-   At least one
    [custom cloud created](/docs/platform/howto/byoc/create-custom-cloud) in your Aiven
    organization
-   Access to [Aiven Console](https://console.aiven.io/)

:::important
Since the tags propagate to your own cloud infrastructure, the contents and total number
of the tags need to stay within limits imposed by your cloud provider.
:::

## Tag service nodes and VMs{#service-tagging}

If you add a tag to a BYOC service, all the service nodes and VMs inherit this tag, and
the tag propagates to your own cloud infrastructure.

To [create a resource tag](/docs/platform/howto/tag-resources) for a BYOC service,
add prefix `byoc_resource_tag` to the tag key. Otherwise, see
[Use resource tags](/docs/platform/howto/tag-resources) for instructions on how to add,
update, remove, or list service tags. See the same for limits and limitations that apply
to service tags and tagging.

For example, to label all VMs running a particular BYOC service with the tag that has
`my-cost-center` as a key and `12345` as a value, create a resource tag for this service
with key `byoc_resource_tag:my-cost-center` and value `12345`.

## Tag infrastructure components{#infrastructure-tagging}

You can define a set of tags for each taggable infrastructure component created by the
Terraform infrastructure template (for example, VPCs, subnets, or security groups). You
can manage the tags using the Aiven Console or directly in the variable file used to run
the Terraform infrastructure template.

:::important
Any change to infrastructure tags requires reapplying the Terraform template.
:::

### Limitations

- Tag keys are in lower case and can include ASCII alphanumeric printable English
  characters. Punctuation characters other than dashes (between words) are not allowed.
- Do not use tag keys that start with `aiven`.
- Do not change the tags that the Terraform template applies by default.

### Add infrastructure tags

1. Log in to the [Aiven Console](https://console.aiven.io/), and go to your organization.
1. Click **Admin** in the top navigation, and click **Bring your own cloud** in the sidebar.
1. Select a custom cloud to tag.
1. Click <ConsoleLabel name="actions"/> > **Add tags**.
1. Define key-value pairs for a desired number of tags, and click **Save**.
1. Apply the Terraform template with the updated variable file.

### Edit infrastructure tags

1. Log in to the [Aiven Console](https://console.aiven.io/), and go to your organization.
1. Click **Admin** in the top navigation, and click **Bring your own cloud** in the sidebar.
1. Select a custom cloud to tag.
1. Click <ConsoleLabel name="actions"/> > **Edit tags**.
1. Change the key or the value of a tag or remove a tag, and click **Save**.
1. Apply the Terraform template with the updated variable file.

## Related pages

-   [About bring your own cloud (BYOC)](/docs/platform/concepts/byoc)
-   [Enable the bring your own cloud (BYOC) feature](/docs/platform/howto/byoc/enable-byoc)
-   [Create a custom cloud in Aiven](/docs/platform/howto/byoc/create-custom-cloud)
-   [Enable your AWS custom cloud in Aiven organizations, units, or projects](/docs/platform/howto/byoc/assign-project-custom-cloud)
-   [Add customer's contact information for your custom cloud](/docs/platform/howto/byoc/add-customer-info-custom-cloud)
-   [Rename your custom cloud](/docs/platform/howto/byoc/rename-custom-cloud)
-   [Use tiered storage in custom clouds](/docs/platform/howto/byoc/use-byoc-tiered-storage)
