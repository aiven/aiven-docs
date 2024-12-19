---
title: Tag custom cloud resources
sidebar_label: Tag resources
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

Tagging allows resource categorization, which simplifies governance, cost allocation, and system performance review. Custom cloud tags propagate to resources on the Aiven platform and in your own cloud infrastructure.

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
<TabItem value="1" label="Aiven Console" default>
-   At least one
    [custom cloud created](/docs/platform/howto/byoc/create-cloud/create-custom-cloud) in your Aiven
    organization
-   Access to the [Aiven Console](https://console.aiven.io/)
-   [Organization admin](/docs/platform/concepts/permissions#organization-roles-and-permissions)
    role in your Aiven organization
</TabItem>
<TabItem value="2" label="Aiven CLI">
-   At least one
    [custom cloud created](/docs/platform/howto/byoc/create-cloud/create-custom-cloud) in your Aiven
    organization
-   [Aiven CLI client](/docs/tools/cli) installed
-   [Organization admin](/docs/platform/concepts/permissions#organization-roles-and-permissions)
    role in your Aiven organization
</TabItem>
</Tabs>

### Tag service nodes and VMs

<Tabs groupId="group1">
<TabItem value="1" label="Aiven Console" default>
[Create a resource tag for a BYOC service the same way you create it for a regular
Aiven-managed service](/docs/platform/howto/tag-resources#add-tags-to-services).
Ensure you use the `byoc_resource_tag` prefix in the tag key.

For example, to label all VMs running a particular BYOC service with the tag that has
`my-cost-center` as a key and `12345` as a value, create a resource tag for this service
with key `byoc_resource_tag:my-cost-center` and value `12345`.

For instructions on how to add, update, remove, or list service tags in the Aiven Console,
see [Use resource tags](/docs/platform/howto/tag-resources#add-tags-to-services), where
you also find limits and limitations that apply to service tags and tagging.
</TabItem>
<TabItem value="2" label="Aiven CLI">
For your BYOC service, [create tags using the Aiven CLI the same way you create it for a
regular Aiven-managed service](/docs/platform/howto/tag-resources#add-and-modify-service-tags).
Ensure you use the `byoc_resource_tag` prefix in the tag key.

```bash
avn service tags update SERVICE_NAME
  --add-tag byoc_resource_tag:business_unit=sales
  --add-tag byoc_resource_tag:env=smoke_test
```

For instructions on how to add, update, remove, or list service tags via Aiven CLI, see
[Use resource tags](/docs/platform/howto/tag-resources#add-and-modify-service-tags), where
you also find limits and limitations that apply to service tags and tagging.
</TabItem>
</Tabs>

## Tagging infrastructure components{#infrastructure-tagging}

You can define a set of tags for each taggable infrastructure component created by the
Terraform infrastructure template (for example, VPCs, subnets, or security groups). You
can manage the tags using the [Aiven CLI client](/docs/tools/cli) or directly in the
variable file used to run the Terraform infrastructure template.

:::note
Tagging GCP BYOC infrastructure uses
[Google labels](https://cloud.google.com/resource-manager/docs/labels-overview),
not [Google tags](https://cloud.google.com/resource-manager/docs/tags/tags-overview).
:::

### Limitations

- Tag keys are in lower case and can include ASCII alphanumeric printable English
  characters. Punctuation characters other than dashes (between words) are not allowed.
- Do not use tag keys that start with `aiven`.
- Do not change the tags that the Terraform template applies by default.

### Before you start

-   You have at least one
    [custom cloud created](/docs/platform/howto/byoc/create-cloud/create-custom-cloud) in your Aiven
    organization.
-   You have the [Aiven CLI client](/docs/tools/cli) installed.

### Manage infrastructure tags

Use the
[`avn byoc tags update`](/docs/tools/cli/byoc#avn-byoc-tags-update) command to add or update
infrastructure tags for your custom cloud. Pass the tags as an option.

```bash
avn byoc tags update                            \
    --organization-id "ORGANIZATION_IDENTIFIER" \
    --byoc-id "CUSTOM_CLOUD_IDENTIFIER"         \
    --add-tag TAG_KEY_A=TAG_VALUE_A             \
    --add-tag TAG_KEY_B=TAG_VALUE_B
```

:::important
Any change to infrastructure tags requires reapplying the Terraform template.
:::

## Related pages

-   [Bring your own cloud networking and security](/docs/platform/howto/byoc/networking-security)
-   [View the status of a custom cloud](/docs/platform/howto/byoc/view-custom-cloud-status)
-   [Manage services hosted in custom clouds](/docs/platform/howto/byoc/manage-byoc-service)
-   [Download an infrastructure template and a variables file](/docs/platform/howto/byoc/download-infrastructure-template)
