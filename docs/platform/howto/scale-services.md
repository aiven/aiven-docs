---
title: Change a service plan
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"

Adjust the plan of your services at any time to scale your services as needed and optimize costs.
You can also [adjust disk storage][storage] without changing your plan.

1. In your project, click <ConsoleLabel name="services"/> and open a service.
1. On the left-side menu, click <ConsoleLabel name="service settings"/>.
1. In the **Service plan** section, click <ConsoleLabel name="actions"/> >
   **Change plan**.
1. In the **Change service plan** dialog, choose the new service plan and tier.
1. Click **Change**.

Your service's state becomes **Rebuilding** and remains accessible. When the
state switches to **Running**, your new service plan is active.

:::note

- You can also use the
  [service update CLI](/docs/tools/cli/service-cli#avn-cli-service-update) to
  scale your service plan via the [Aiven CLI](/docs/tools/cli).
- When you perform a service upgrade or downgrade horizontally,
  remember to include all additional disks the service uses. For
  example, when switching from `Startup-4` to `Business-4` or from
  `Business-4` to `Startup-4`, include all the additional disks
  available for this service.

:::
<!-- vale off -->
## Related pages

- [Adjust disk storage][storage]
- [Adjust disks storage automatically](/docs/platform/howto/disk-autoscaler)

[storage]: /docs/platform/howto/add-storage-space
