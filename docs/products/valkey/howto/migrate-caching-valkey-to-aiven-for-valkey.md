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

1. [Get authenticated and authorized](https://aiven.github.io/aiven-operator/authentication.html)
   to use the Aiven Operator for Kubernetes.

1. Add the deletion policy annotation in the Aiven for Redis manifest.

   1. In the manifest file of your Aiven for Redis service, for example `redis-service.yaml`,
      add the deletion policy annotation: `controllers.aiven.io/deletion-policy: Orphan`.

      ```yaml {4,5}
      apiVersion: aiven.io/v1alpha1
      kind: Redis
      metadata:
        annotations:
          controllers.aiven.io/deletion-policy: Orphan
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

   1. Verify that the annotation has been applied:

      ```bash
      kubectl get redis SERVICE_NAME -o yaml | grep -m 1 Orphan
       controllers.aiven.io/deletion-policy: Orphan
      ```

1. Migrate your Aiven for Redis service in the Aiven API.

   Change the service type from `redis` to `valkey` by calling the
   [ServiceServiceTypeUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceServiceTypeUpdate)
   API endpoint, replacing `PROJECT_NAME` and `SERVICE_NAME` with meaningful values.

   ```bash {4}
   curl -X PATCH "https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME/service_type" \
   -H "Authorization: Bearer $AIVEN_TOKEN" \
   -H "Content-Type: application/json" \
   -d '{"service_type": "valkey"}'
   ```

1. Migrate your Aiven for Redis service in Kubernetes:

   1. Copy the content of the Aiven for Redis manifest file (`redis-service.yaml`) to a new
      Aiven for Valkey manifest file (`valkey-service.yaml`) with CLI:

      ```bash
      cp redis-service.yaml valkey-service.yaml
      ```

   1. Modify the new Aiven for Valkey manifest file (`valkey-service.yaml`):

      - Replace `kind: Redis` with `kind: Valkey`.
      - Add the `connInfoSecretTarget` object and the `name` property. Set `name` to the
        name of the secret for the new Aiven for Valkey resource.

      :::note
      By default, the secret for the new Aiven for Valkey resource gets the `VALKEY` prefix.
      To keep the `REDIS` prefix, add the `prefix: REDIS` property in the
      `connInfoSecretTarget` object.
      :::

      ```yaml {2,10,11,12}
      apiVersion: aiven.io/v1alpha1
      kind: Valkey
      metadata:
        name: SERVICE_NAME
      spec:
        authSecretRef:
          name: aiven-token
          key: token

        connInfoSecretTarget:
          name: NEW_VALKEY_SECRET
        # prefix: REDIS
      ```

   1. Create the Aiven for Valkey resource by applying the configuration:

      ```bash
      kubectl apply -f valkey-service.yaml
      ```

   1. Verify that the Aiven for Valkey secret has been created:

      ```bash
      kubectl get secrets
      ```

      Expected output:

      ```txt
      NAME               TYPE     DATA   AGE
      OLD_REDIS_SECRET   Opaque   NN     HHMMSS
      NEW_VALKEY_SECRET  Opaque   NN     HHMMSS
      ```

1. Update your applications to use the new Aiven for Valkey secret.

1. Delete your Aiven for Redis resource in Kubernetes:

   1. Run

      ```bash
      kubectl delete -f redis-service.yaml
      ```

      Expected output:

      ```txt
      redis.aiven.io "SERVICE_NAME" deleted
      ```

   1. Verify that the Aiven for Valkey secret persists and the Aiven for Redis secret is
      deleted:

      ```bash
      kubectl get secrets
      ```

      Expected output:

      ```txt
      NAME               TYPE     DATA   AGE
      NEW_VALKEY_SECRET  Opaque   NN     HHMMSS
      ```

</TabItem>
</Tabs>
