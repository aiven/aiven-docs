---
title: Migrate Aiven for Caching or Valkey to Aiven for Valkey™
---
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons";
import ConsoleIcon from "@site/src/components/non-swizzled/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Migrate your Aiven for Caching or Valkey databases to Aiven for Valkey™ using either the Aiven Console migration tool or the Aiven Operator for Kubernetes®.

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
- Depending on which tool to use for the migration:
  - [Aiven Console](https://console.aiven.io/)
  - [Aiven Operator for Kubernetes®](https://aiven.github.io/aiven-operator/installation/prerequisites.html)
    version later than 0.15.0 and the [Aiven API](/docs/tools/api)

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
:::tip
See
[Aiven Operator for Kubernetes configuration options for Valkey](https://aiven.github.io/aiven-operator/api-reference/valkey.html).
:::

1. Use the Aiven API to change the type of your service from `redis` to `valkey`: Call the
   [ServiceServiceTypeUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceServiceTypeUpdate)
   API endpoint, replacing `PROJECT_NAME` and `SERVICE_NAME` with meaningful values.

   ```bash {4}
   curl -X PATCH "https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME/service_type" \
   -H "Authorization: Bearer $AIVEN_TOKEN" \
   -H "Content-Type: application/json" \
   -d '{"service_type": "valkey"}'
   ```

1. [Get authenticated and authorized](https://aiven.github.io/aiven-operator/authentication.html)
   to use the Aiven Operator for Kubernetes.
1. In your service manifest file, here `redis-service.yaml`,  change `kind: Redis` to
   `kind: Valkey`:

   ```yaml {2}
   apiVersion: aiven.io/v1alpha1
   kind: Valkey
   metadata:
     name: SERVICE_NAME
   spec:
     project: PROJECT_NAME
     cloudName: CLOUD_AND_REGION_NAME
     plan: SERVICE_PLAN_NAME
   ```

1. Update the service by applying the configuration:

   ```bash
   kubectl apply -f redis-service.yaml
   ```

   This creates an Aiven for Valkey resource: a service managed by the Aiven Operator for
   Kubernetes.

1. In the Aiven for Redis manifest file, add `controllers.aiven.io/deletion-policy: Orphan`
   under `metadata` > `annotations`.

1. Delete the Aiven for Redis resource in Kubernetes:

   ```bash
   kubectl delete -f redis-service.yaml
   ```

:::important[handling secrets]

- After the migration, the connection secret of your new Aiven for Valkey service has
  prefixes `REDIS`. To update the secret, change the prefixes manually to `VALKEY`.
- If you set `connInfoSecretTargetDisabled` to `false` in the service manifest, no secret
  is created.
- The secret name is based on `connInfoSecretTarget`.

:::

</TabItem>
</Tabs>
