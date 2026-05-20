import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Power off a service

When you power off a service:

- All virtual machines are removed from the public cloud.
- The service configuration is stored on the Aiven Platform.
- If there are no backups, all service data is lost.
- If the service has time-based or point in time
  recovery backups, the backups remain on the Aiven Platform.

Services powered off for more than 180 days are automatically deleted.

<Tabs groupId="sync">
<TabItem value="Console" label="Console" default>

1. In your project, click <ConsoleLabel name="services"/>.
1. To power off a service, click <ConsoleLabel name="actions"/> >
   **Power off service**.

</TabItem>
<TabItem value="CLI" label="CLI">

To power off a service, run:

   ```bash
   avn service update SERVICE_NAME --power-off
   ```

</TabItem>
</Tabs>

## Power on a service

When you power on a service:

-   New virtual machines are created on the service's public cloud.
-   The service starts with the stored configuration parameters.
-   The latest time-based backup is restored.
-   Maintenance updates are automatically applied.
-   If a point in time recovery backup is available, the database transaction logs
    are replayed to recover the service data to a specific point in time.

The restoration takes from a few minutes to a few hours, depending on
the network bandwidth, the disk IOPS allocated to the service, and the size of the backup.

<Tabs groupId="sync">
<TabItem value="Console" label="Console" default>

1. In your project, click <ConsoleLabel name="services"/>.
1. To power on a service, click <ConsoleLabel name="actions"/> >
   **Power on service**.

</TabItem>
<TabItem value="CLI" label="CLI">

To power on a service, run:

   ```bash
   avn service update SERVICE_NAME --power-on
   ```

To see when the service is running, run:

   ```bash
   avn service wait SERVICE_NAME
   ```

</TabItem>
</Tabs>
