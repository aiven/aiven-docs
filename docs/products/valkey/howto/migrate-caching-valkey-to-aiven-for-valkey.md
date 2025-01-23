---
title: Migrate Aiven for Caching or Valkey to Aiven for Valkey™
---
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";
import ConsoleIcon from "@site/src/components/non-swizzled/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Migrate your Aiven for Caching or Valkey databases to Aiven for Valkey™ using the Aiven Console migration tool.

## Prerequisites

Before starting the migration process, ensure the following:

- A target [Aiven for Valkey service](/docs/products/valkey/get-started).
- Source database details:
  - **Hostname or connection string**: The public hostname, connection string, or
    IP address used to connect to the database.
  - **Port**: The port used to connect to the database.
  - **Username**: The username with sufficient permissions to access the data.
  - **Password**: The password used to connect to the database.
- Firewall rules updated or temporarily disabled to allow traffic between source and
  target databases.
- A source Aiven for Caching or Valkey service secured with SSL.
- A publicly accessible source Aiven for Caching or Valkey service or one with a VPC peering
  connection between private networks. You'll need the VPC ID and cloud name.
- Depending on what tool to use for the migration:
  - Access to the [Aiven Console](https://console.aiven.io/)
  - [Aiven Operator for Kubernetes®](https://aiven.github.io/aiven-operator/installation/prerequisites.html)
    installed

:::note
The migration does not include service user accounts or commands in progress.
:::

## Migrate a database

<Tabs groupId="group1">
<TabItem value="gui" label="Aiven Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/) and select the
   Aiven for Valkey service for your migration.
1. Go to <ConsoleLabel name="service settings"/> from the sidebar.
1. Scroll to <ConsoleLabel name="actions"/> > **Migrate database** to start the
   migration.
1. Follow the wizard to guide you through the migration process:

   1. **Configure**

      In the migration wizard, review the prerequisites and click **Get started** to begin.

   1. **Validate**

      In the migration screen, enter the connection details:

      - Hostname
      - Port
      - Username
      - Password

      Select **SSL encryption recommended** for a secure connection, and click **Run check**.

      The [Aiven Console](https://console.aiven.io/) validates the database configurations. If
      any errors occur, follow the on-screen instructions to resolve them and rerun the check.

   1. **Migrate**

      Once validation is complete, click **Start migration** to begin migrating data to
      Aiven for Valkey.

   1. **Replicate**

      While the migration is in progress:

      - You can close the migration wizard and monitor the progress later from the
        <ConsoleIcon name="overview"/> page.
      - To stop the migration, click **Stop migration** in the migration progress window.
        Data already transferred to Aiven for Valkey is preserved.

      To prevent conflicts during replication:

      - Do not create or delete databases on the source service.
      - Avoid network or configuration changes that might disrupt the connection between source
        and target databases, such as firewall modifications.

      If the migration fails, resolve the issue and click **Start over**.

   1. **Close and complete the migration**

      After the migration, select one of the following:

      - **Stop replication**: If no further synchronization is needed, and you are ready
        to switch to Aiven for Valkey after testing.
      - **Keep replicating**: If continuous data synchronization is needed. Avoid system
        updates or configuration changes during active replication to  prevent unintended
        migrations.

      :::note
      When replication is active, Aiven for Valkey ensures your data stays in sync by
      continuously synchronizing new writes from the source database.
      :::

</TabItem>
<TabItem value="k8" label="Aiven Operator for Kubernetes®">

:::note[Before you start]

- Note that your changes can force the recreation of the affected resources.
- See
[Aiven Operator for Kubernetes configuration options for Valkey](https://aiven.github.io/aiven-operator/api-reference/valkey.html).

:::

Update the resource using the Aiven Operator for Kubernetes:

1. [Get authenticated and authorized](https://aiven.github.io/aiven-operator/authentication.html).
1. Update file `valkey-sample.yaml`:

   - Add `service_log: true` and `terminationProtection: true`.
   - Update `maintenanceWindowDow: sunday` and `maintenanceWindowTime: 22:00:00`.

   ```yaml
   apiVersion: aiven.io/v1alpha1
   kind: Valkey
   metadata:
     name: valkey-sample
   spec:
     authSecretRef:
       name: aiven-token
       key: token

     connInfoSecretTarget:
       name: valkey-secret

     userConfig:
       migrate_sstableloader: true
       service_log: true

     project: PROJECT_NAME
     cloudName: google-europe-west1
     plan: startup-4

     maintenanceWindowDow: sunday
     maintenanceWindowTime: 22:00:00
     terminationProtection: true
   ```

1. Update the service by applying the configuration:

   ```shell
   kubectl apply -f valkey-sample.yaml
   ```

1. Review the resource you updated with the following command:

   ```shell
   kubectl describe valkey.aiven.io valkey-sample
   ```

The resource can stay in the `REBUILDING` state for a couple of minutes. Once the state
changes to `RUNNING`, you are ready to access it.

</TabItem>
</Tabs>
