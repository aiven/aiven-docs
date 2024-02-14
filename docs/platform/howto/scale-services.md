---
title: Scale your service
---

When creating a new Aiven service, you are not tied to a plan. Your services can be adjusted to better match your needs. Services can be moved to a higher or lower plan, and to a different tier.

1.  Log into the [Aiven Console](https://console.aiven.io/), select your
    project and select the service you want to scale.
2.  On the service page, click **Service settings** from the sidebar.
3.  In the **Service plan** section, click **Actions (\...)**.
4.  From the dropdown menu, click **Change plan**.
5.  In the **Change service plan** dialog, choose the new service plan
    and tier, if required.
6.  Click **Change**.

Your service is in the **Rebuilding** state. Once the rebuilding is over,
your new service plan will be active on your service. The service is
still accessible through the plan-change process.

:::note

-   You can also use the
    [dedicated service update function](/docs/tools/cli/service-cli#avn-cli-service-update) to scale your service plan via the
    [Aiven CLI](/docs/tools/cli).
-   When you perform a service upgrade or downgrade horizontally,
    remember to include all additional disks the service uses. For
    example, when switching from `Startup-4` to `Business-4` or from
    `Business-4` to `Startup-4`, include all the additional disks
    available for this service.

:::
