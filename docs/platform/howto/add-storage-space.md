---
title: Adjust disk storage
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"

Use dynamic disk sizing (<abbr>DDS</abbr>) to scale your service by updating service disk storage, by a factor of 10 Gi, without upgrading your plan.

This operation does not disrupt your running service. You pay only for the
additional storage, not for the compute resources that are part of an upgraded
service plan.

:::note[Availability]
DDS is available for the following services:

- Aiven for Apache Kafka®
- Aiven for PostgreSQL®
- Aiven for MySQL®
- Aiven for OpenSearch®
- Aiven for Apache Cassandra®
- Aiven for Metrics®
- Aiven for M3DB®

DDS is not supported on custom plans.
:::

When you add storage to your service, the Aiven platform provisions the
extra disk space and dynamically adds it to your running instances. The
total amount of storage you can add to your service is based on your
service plan and the cloud provider.

In a clustered service such as Apache Cassandra or Apache Kafka, the
additional storage is equally divided between the nodes. In a shared
service, each node receives the total shared capacity of the added
storage.

## Limitations

- Maximum storage size depends on the plan and the service type. It
  can go as high as five times the base storage size of the plan.
- Due to cloud provider restrictions, there is a limit on how many
  times storage can be increased between two maintenance updates. If
  this limit is reached, perform a maintenance update for
  performance optimization.
- If there is an ongoing maintenance update, you cannot add storage
  until the update is completed.

It is unlikely that any performance degradation from additional disk
storage would be noticeable in your clients, but it is possible.

:::note[Pricing]

If you add storage when you create a service, the cost is included as
part of your service's total cost and is shown in the service summary.

The cost of adding storage to a running service is shown in [Aiven
Console](https://console.aiven.io/) when you add it. The total price you
see is the cost of the additional storage and any backups associated
with it. You can also see these storage usage costs in your invoices.

:::

## Update service storage via the console

You cannot add or remove storage when service nodes are in the
rebuilding state, for example, during a maintenance update or a
service upgrade.

:::note[Prerequisites]

If you are removing disk storage:

-   Make sure the data in your service does not exceed your service
    plan's allocated storage. If it does, you will not be able to
    remove the additional storage.
-   Plan for the time it takes to rebuild the service. The time it takes
    depends on the service.

:::

You can update storage to your running service in
[Aiven Console](https://console.aiven.io/) without interrupting the service:

1. In your project, click <ConsoleLabel name="services"/> and open a service.
1. On the sidebar, Click <ConsoleLabel name="service settings"/>.
1. In the **Service plan** section, click <ConsoleLabel name="actions"/> >
   **Change plan** > **Manage additional storage**.
1.  In the **Upgrade service storage** dialog, click **Change plan**
    choose the new service plan and tier or use the slider to adjust disk
    storage.

    :::note
    The price shown for the additional storage includes backup costs.
    :::

    :::note
    You can only remove storage that you previously added using this
    feature. To downgrade further, you can
    [change your service plan](/docs/platform/howto/scale-services).
    :::

1. Click **Save Changes**.

If you added storage, the additional storage is available for immediate use.
If you removed additional storage, the service nodes go through a rolling restart.
Depending on the service type and plan, there might be a short downtime for services with
no HA capabilities.

:::note
Storage optimization is performed at the next maintenance update after a
change to the storage size. Due to cloud provider limitations, there is
a limit on how many times storage can be increased between two
maintenance updates. When this limit is reached, perform a
maintenance update for performance optimization. Plan increases to avoid reaching this limit.
:::

## Update service storage via the CLI

You can use [Aiven CLI](/docs/tools/cli)
to add or remove additional storage by
[updating the service configuration](/docs/tools/cli/service-cli#avn-cli-service-update)
using command `avn service update` with flag
`--disk-space-gib`. Specify the value for the flag as the total disk
space that you need for your service. For example, if you use a
`Startup-4` plan with a 80-GiB disk by default and you would like to add
an extra 10-GiB disk, the value that the `--disk-space-gib` flag
requires is `90`.

```bash
avn service update --disk-space-gib 90 --project PROJECT_NAME SERVICE_NAME
```

:::note

-   When you perform a service upgrade or downgrade horizontally,
    remember to include all additional disks the service uses. For
    example, when switching from `Startup-4` to `Business-4` or from
    `Business-4` to `Startup-4`, include all the additional disks
    available for this service.
-   Similarly, when you fork an existing service, include all additional
    disks the service uses.

:::

## Related pages

- [Update service plan](/docs/platform/howto/scale-services)
- [Disk auto-scaler](/docs/platform/howto/disk-autoscaler)
