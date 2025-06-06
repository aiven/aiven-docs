---
title: Change a service plan
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"
import RelatedPages from "@site/src/components/RelatedPages"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Adjust the plan of your services at any time to scale your services as needed and optimize costs.
You can also [adjust disk storage][storage] without changing your plan.

:::important

- Downgrading to a plan with fewer VMs is not supported.
- Changing a service plan triggers a node recycle, service rebuilding, and pending
  maintenance updates, if any.

:::

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. In your project, click <ConsoleLabel name="services"/> and open a service.
1. On the left-side menu, click <ConsoleLabel name="service settings"/>.
1. In the **Service plan** section, click <ConsoleLabel name="actions"/> >
   **Change plan**.
1. In the **Change service plan** dialog, choose the new service plan and tier.
1. Click **Change**.

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

:::note
When you perform a service upgrade or downgrade horizontally, include all additional disks
the service uses. For example, when switching from `Startup-4` to `Business-4` or from
`Business-4` to `Startup-4`, include all the additional disks available for this service.
:::

<!-- vale off -->

<RelatedPages/>

- [Adjust disk storage][storage]
- [Scale disks storage automatically](/docs/platform/howto/disk-autoscaler)

[storage]: /docs/platform/howto/add-storage-space
