---
title: Power on/off a service
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import StaticIp from "@site/static/includes/static-ip-cost-warning.md";
import AutoDelete from "@site/static/includes/auto-delete-poweredoff.md";
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

Controlling when to power on and off your Aiven services allows you to control the use of resources and save credits.
Idle resources are released and only the necessary data is kept after a power-off.
The impact on the service is different depending on the service type and plan.

Aiven service power off and power on can be done on [Aiven
Console](https://console.aiven.io) or through
[Aiven CLI](/docs/platform/concepts/service-power-cycle).

## Power off a service

:::warning[Kafka services]
- For Kafka services with backups: Topic configuration, schemas and connectors are all
  backed up, but not the data in topics. All topic data is lost on power off.

- For Kafka services without backups: Topic configurations including all
  topic data is lost on power off.
:::

<Tabs groupId="sync">
<TabItem value="Console" label="Console" default>

1. From your project, on the left-side menu, click <ConsoleLabel name="services"/>.
1. For each the service to power, click <ConsoleLabel name="actions"/> >
   **Power off service**

</TabItem>
<TabItem value="CLI" label="CLI">

1. Run:

   ```bash
   avn service update <your service name> --power-off
   ```

</TabItem>
</Tabs>

Whenever a service is powered off:

- All virtual machines of the service are **removed** from the
  public cloud.
- The service information and configuration are stored on Aiven
  Platform. All service data is lost if there's no backup available.
- If the service has **time-based** or **PITR (point in time
  recovery)** backups, the backups are kept on the Aiven Platform.

  See [Backups at Aiven][backup].

:::important
<AutoDelete/>
:::

:::note
<StaticIp/>

To remove static IP addresses, see
[Manage static IP addresses](/docs/platform/concepts/static-ips).
:::

When a service is powered off, you can [delete it](#delete-service).

## Power on a service

<Tabs groupId="sync">
<TabItem value="Console" label="Console" default>

1. From your project, on the left-side menu, click <ConsoleLabel name="services"/>.
1. For each the service to power, click <ConsoleLabel name="actions"/> >
   **Power on service**

</TabItem>
<TabItem value="CLI" label="CLI">

When you're ready to continue using the service run the command to
power it on.

1. Run:

   ```bash
   avn service update <your service name> --power-on
   ```

1. Use the `wait` command to see when the service is running:

   ```bash
   avn service wait <your service name>
   ```

</TabItem>
</Tabs>

When a service is powered on:

-   New virtual machines are created on the service's specified public cloud.
-   The service starts with the stored configuration parameters.
-   The latest time-based [backup][backup] is restored.
    The restoration takes from a few minutes
    to a few hours, depending on:
    - The network bandwidth
    - Disk IOPS allocated to the service plan
    - The size of the backup.

    Smaller plans with larger backups take longer time than bigger plans with smaller backups.

    Contact the [support team](mailto:support@aiven.io) to inquire about the progress.

-   If PITR backup is available, the database transaction log (for example,
    `WAL` for PostgreSQL®, `binlog` for MySQL) are replayed to
    recover the service data to a specific point in time.

:::note
Maintenance updates are automatically applied when a service is powered
on as new virtual machines are created for the service to run on.
:::

## Delete a service {#delete-service}

You can only delete powered-off services. This action cannot be undone.

<Tabs groupId="sync">
<TabItem value="Console" label="Console" default>

1.  From your project, on the left-side menu, click <ConsoleLabel name="services"/>.
1.  On the **Services** page, use the search bar to locate a specific
    powered off service or the filter to display a list of services with
    status **Powered off**.
1.  Click the service to display its details.
1.  On the top-right corner, click <ConsoleLabel name="actions"/> >
    **Delete service** and confirm.

</TabItem>
<TabItem value="CLI" label="CLI">

1. Run:

   ```bash
   avn service terminate <your service name>
   ```

</TabItem>
</Tabs>

## Related pages

- [Backups at Aiven][backup]

[backup]: /docs/platform/concepts/service_backups
