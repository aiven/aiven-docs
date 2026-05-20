import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Use tags to add metadata to Aiven services to categorize them or run custom logic on them.
Typical uses include:

- Tagging for governance to deploy services with specific tags only.
- Tagging for internal cost reporting, ownership, allocation and accountability.

A tag is a key/value pair:

- **Key**: A case-sensitive string that starts with a letter and consists
  of letters, numbers, dashes and underscores.
  The maximum length for a key is 64 characters.
- **Value**: A string value limited to 64 UTF-8 characters.

Within a service, the tag keys must be unique.

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
