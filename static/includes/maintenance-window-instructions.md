import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

To set the maintenance window for your service:

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. In the Aiven Console, open your service.
1. In the **Maintenance** section, click
   <ConsoleLabel name="actions"/> > **Change maintenance window**.
1. Set the day and time.
1. Click **Save changes**.

</TabItem>
<TabItem value="terraform" label="Terraform">

Use the `maintenance_window_dow` and `maintenance_window_time` attributes in
[your Aiven service resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs).

</TabItem>
</Tabs>
