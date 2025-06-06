---
title: Upgrade from Aiven for Caching to Aiven for Valkey™
sidebar_label: Upgrade to Aiven for Valkey™
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons"
import RelatedPages from "@site/src/components/RelatedPages";

Upgrade your Aiven for Caching service to Aiven for Valkey using the Aiven Console or Aiven API.
The process retains configurations, users, and data without disrupting your service.

## Prerequisites

- Ensure your Aiven for Caching service is running **version 7.2**. Upgrade to 7.2 if
  needed.
- To upgrade using the Aiven API, ensure you have an
  [Aiven API token](/docs/platform/howto/create_authentication_token) with the
  necessary permissions.
- To upgrade using the
  [Aiven Operator for Kubernetes®](https://aiven.github.io/aiven-operator/installation/prerequisites.html),
  ensure your version is 0.15.0 or later and you have an
  [Aiven API token](/docs/platform/howto/create_authentication_token) with the
  necessary permissions.

## What to expect during the upgrade

- **No new service created**: The upgrade changes the type of the existing service.
- **No service disruption**: The upgrade occurs without interruption. The service
  is recycled, and the nodes are replaced, but your service continues to
  operate during the process.
- **DNS updates**: DNS names update to new hosts during the upgrade. This might
  cause brief delays as the changes take effect, but the service remains available.
- **Automatic configuration transfer**: All Aiven for Caching configurations are
  automatically updated to work with Aiven for Valkey. No manual changes are needed.

:::note
After you upgrade to Aiven for Valkey, you cannot revert to Aiven for Caching.
:::

## Upgrade service

<Tabs groupId="method">
<TabItem value="console" label="Aiven Console">

1. Access the [Aiven Console](https://console.aiven.io/) and select your
   **Aiven for Caching** service.
1. Click <ConsoleLabel name="service settings"/>.
1. Go to **Service management** section, and
   click <ConsoleLabel name="actions"/> > **Upgrade to Valkey**.
1. On the confirmation window, review the upgrade process guidelines, and click
   **Confirm upgrade**.

After confirming, the **Service status** changes to **Rebalancing** in the
**Service settings** screen. This indicates that the upgrade is in progress. The nodes
are recycled, and your service continues to operate as the upgrade completes.

</TabItem>
<TabItem value="api" label="Aiven API">

1. To upgrade the service to Aiven for Valkey using the API, run:

   ```bash
   curl -X PATCH \
     -H "Authorization: <AIVEN_TOKEN>" \
     -H "Content-Type: application/json" \
     --data '{"service_type": "valkey"}' \
     https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME/service_type

   ```

   Replace `AIVEN_TOKEN`, `PROJECT_NAME`, and `SERVICE_NAME` with your actual values.

1. Confirm the upgrade by checking the service details with this command:

   ```bash
   curl -X GET \
     -H "Authorization: <AIVEN_TOKEN>" \
     "https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME"
   ```

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
      ```

      Expected output:

      ```txt
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

<RelatedPages/>

Learn how to [update Terraform configuration and state after upgrading to Valkey™](https://registry.terraform.io/providers/aiven/aiven/latest/docs/guides/update-deprecated-resources#update-aiven_redis-resources-after-valkey-upgrade).
