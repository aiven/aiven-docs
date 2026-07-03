To set the maintenance window for your service:

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. In the Aiven Console, open your service.
1. On the <ConsoleLabel name="overview"/> page, scroll to the **Maintenance** section.
1. Click <ConsoleLabel name="actions"/> > **Change maintenance window**.
1. Set the day and time, then click **Save changes**.

</TabItem>
<TabItem value="terraform" label="Terraform">

Use the `maintenance_window_dow` and `maintenance_window_time` attributes in
[your Aiven service resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs).

</TabItem>
</Tabs>

## Periodic infrastructure updates

Maintenance updates are scheduled automatically for services with nodes
active for 180 days and more.

:::important
Periodic infrastructure updates are mandatory for all the services
except for those with maintenance disabled.
:::
