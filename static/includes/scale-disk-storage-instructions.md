import ConsoleLabel from "@site/src/components/ConsoleIcons"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Prerequisites

You cannot add or remove storage when service nodes are in the
rebuilding state, for example, during a maintenance update or a
service upgrade.

If you are removing disk storage:

-   Make sure the data in your service does not exceed your service's
    allocated storage. If it does, you will not be able to remove the additional storage.
-   Plan for the time it takes to rebuild the service. The time it takes
    depends on the service.


<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. In your service, click <ConsoleLabel name="service settings"/>.
1. In the **Service plan** section, click <ConsoleLabel name="actions"/> >
   **Manage additional storage**.
1. Change the disk storage.

   :::note
   - The price shown for the additional storage includes backup costs.

   - You can only remove storage that you previously added using this
     feature. To downgrade further, you can
     [change your service plan](/docs/platform/howto/scale-services).
   :::

1. Click **Save Changes**.

</TabItem>
<TabItem value="cli" label="CLI">

Use [Aiven CLI](/docs/tools/cli) to add or remove additional storage using
[`avn service update`](/docs/tools/cli/service-cli#avn-cli-service-update) with the
`--disk-space-gib` flag to specify the total disk space to provide to your service.

For example, if your service has a 80-GiB disk and you would like to add
an extra 10-GiB disk, use:

```bash
avn service update --disk-space-gib 90 --project PROJECT_NAME SERVICE_NAME
```

:::note

-  When you perform a horizontal service upgrade or downgrade,
   remember to include all additional disks the service uses.

   For example, when switching from `Startup-4` to `Business-4` or from
   `Business-4` to `Startup-4`, include all the additional disks
   available for this service.

-  When you fork an existing service, include all additional disks the service uses.

:::

</TabItem>
<TabItem value="terraform" label="Terraform">

Use the `additional_disk_space` attribute in
[your Aiven service resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs).

</TabItem>
</Tabs>

If you added storage, the additional storage is available immediately.
If you removed additional storage, the service nodes go through a rolling restart.
Depending on the service type and configuration, there might be a short downtime for
services with no HA capabilities.

:::note
Storage optimization is performed at the next maintenance update after a
change to the storage size. Due to cloud provider limitations, there is
a limit on how many times storage can be increased between two
maintenance updates. When this limit is reached, perform a
maintenance update for performance optimization. Plan increases to avoid reaching
this limit.
:::
