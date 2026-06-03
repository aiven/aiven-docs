import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";

## Fork from a specific point in time

<Tabs groupId="group1">
<TabItem value="Console" label="Console" default>

1. In your service, click <ConsoleLabel name="backups"/> in the sidebar.
1. Click **Fork & restore**.
1. Choose the point in time to fork from.
1. Enter a name, and choose the cloud and plan.
1. Click **Create fork**.

</TabItem>
<TabItem value="CLI" label="CLI">

Add the `--recovery-target-time` parameter to the
[create service command](https://aiven.io/docs/tools/cli/service-cli#avn-cli-service-create)
and set it to a time between the first and latest available backups.

</TabItem>
<TabItem value="API" label="API">

Set the `recovery_target_time` parameter in the `user_config` property of the
[`ServiceCreate` endpoint](https://api.aiven.io/doc/#tag/Service/operation/ServiceCreate)
to a time between the first and latest available backups.

</TabItem>
<TabItem value="terraform" label="Terraform">

Set the `recovery_target_time` attribute in the user config of your service
resource to a time between the first and latest available backups.

More information on the service resources and their configuration options
are available in the
[Terraform documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs).

</TabItem>
</Tabs>
