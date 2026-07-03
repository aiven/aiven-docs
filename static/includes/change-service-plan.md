import ConsoleLabel from "@site/src/components/ConsoleIcons"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Adjust the plan of your services at any time to scale your services as needed and
optimize costs.
If you can't find a suitable plan, you can
[request a custom plan](/docs/platform/concepts/service-pricing).

:::tip
If you plan to upgrade your service plan, do it immediately
after a full backup. This reduces the amount of incremental
changes that need to be applied on top of the base backup, which
speeds up the upgrade itself.
:::

:::important

- When changing a service plan, reserve an additional 25% of disk space. This requirement
  applies to upgrades and downgrades.
- Downgrading to a plan with fewer VMs is supported for Aiven for ClickHouse® only.
- Changing a service plan triggers a node recycle, service rebuilding, and any pending
  maintenance updates.

:::

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. In your service, click <ConsoleLabel name="servicesettings"/>.

1. In the **Service plan** section, click **Change plan**.

1. Select a plan that provides at least 125% of the current disk size and click
   **Change plan**.

</TabItem>
<TabItem value="terraform" label="Terraform">

Update the `plan` attribute in
[your Aiven service resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs).

</TabItem>
<TabItem value="cli" label="CLI">

To change a service plan in the Aiven CLI, use the
[`avn service update --plan <plan>`](/docs/tools/cli/service-cli#avn-cli-service-update)
command.

</TabItem>
</Tabs>

Your service's state becomes **Rebuilding** and remains accessible. When the
state switches to **Running**, your new service plan is active.
