---
title: Use resource tags
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"
import RelatedPages from "@site/src/components/RelatedPages"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Use tags to add metadata to Aiven resources to categorize them or run custom logic on them. Tags can be attached to projects and services.

Typical uses include:

- Tagging for governance to deploy services with specific tags only.
- Tagging for internal cost reporting, ownership, allocation and accountability.

A tag is a key/value pair, where:

- **key**: A case-sensitive string that much match
  `[A-Za-z0-9_-]` and start with a letter. The maximum
  length for a key is 64 characters.
- **value**: A string value limited to 64 UTF-8 characters.

Within a resource, the tag keys must be unique.

## Add tags to resources in Aiven Console

### Add tags to projects

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. In the project, click <ConsoleLabel name="projectsettings"/>.
1. In the **Tags** section, click **Project** or **Billing**.
   - Billing tags are returned in the invoice API and displayed on PDF
     invoices for the project.
   - Project tags are returned for resources in the API and displayed
     in the list of projects.
1. Click **Add tags**.
1. Enter a key and value for each tag.
1. Click **Save changes**.

</TabItem>
<TabItem value="terraform" label="Terraform">

To add billing and project tags, use the `tag` attribute in
[your `aiven_project` resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/project#nestedblock--tag).
For billing tags, prefix the `key` with `billing:`. For example:
`key = "billing:PO"`.

</TabItem>
</Tabs>

### Add tags to services

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. In the service, click <ConsoleLabel name="service settings"/>.
1. In the **Service status** section, click
   <ConsoleLabel name="actions"/> > **Add service tags**.
1. Enter a key and value for each tag.
1. Click **Save changes**.

</TabItem>
<TabItem value="terraform" label="Terraform">

Use the `tag` attribute in
[your Aiven service resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs).

</TabItem>
</Tabs>

<RelatedPages/>

- [Create a service](/docs/platform/howto/create_new_service)
