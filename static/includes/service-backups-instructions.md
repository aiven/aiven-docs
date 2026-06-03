import ConsoleLabel from "@site/src/components/ConsoleIcons";

To edit the backup schedule for your service:

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. In your service, click <ConsoleLabel name="backups"/>.
1. Click <ConsoleLabel name="actions"/> > **Configure backup settings**.
1. Click **Add configuration options**.
1. Add `backup_hour` and `backup_minute`, and set their values.
1. Click **Save configuration**.

</TabItem>
<TabItem value="terraform" label="Terraform">

Use the `backup_hour` and `backup_minute` attributes in
[your service resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs)
to set the start time for backups.

</TabItem>
</Tabs>

If a backup was recently made, it can take another backup cycle before the new backup
time takes effect.
