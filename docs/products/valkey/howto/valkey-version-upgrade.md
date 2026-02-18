---
title: Upgrade Aiven for Valkey™
sidebar_label: Upgrade version
---

import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Aiven for Valkey supports multiple versions of Valkey running concurrently in the platform. Choose a version that best fits your needs and upgrade your service when ready.

## Multi-version support

Aiven for Valkey supports
[two latest upstream Valkey versions](/docs/platform/reference/eol-for-major-versions#aiven-for-valkey)
at a time. Both versions are generally available and can be selected when creating a new
service or upgrading an existing service. Starting from version 9.0, multi-versioning is
supported both for the standalone service mode and the
[clustered service mode](/docs/products/valkey/concepts/valkey-cluster).

## Before you upgrade

### Available or upcoming upgrades

Track upgrades for your service via:

- [Aiven Console](https://console.aiven.io): Service <ConsoleLabel name="overview"/>
  page > **Maintenance** section > List of available mandatory and optional upgrades
- Email: notifications for automated upgrades

### Downgrade restriction

Downgrading to a previous version is not supported due to potential data format
incompatibilities. Always test upgrades in a non-production environment first.

To revert to a previous version:

1. Create a service with the desired version.
1. Restore data from a backup taken before the upgrade.
1. Update your application connection strings.

### Prerequisites for upgrade

Before upgrading your service:

- **Test in development**: Test the upgrade in a development environment first.
- **Backup your data**: Ensure you have recent backups. Backups are automatic, but verify
  they exist.

To upgrade your service version, check that:

- Your Aiven for Valkey service is running.
- Target version to upgrade to is
  [available for manual upgrade](/docs/products/valkey/howto/valkey-version-upgrade#available-or-upcoming-upgrades).
- You can use one of the following tools to upgrade:
  - [Aiven Console](https://console.aiven.io/)
  - [Aiven CLI](/docs/tools/cli)
  - [Aiven API](/docs/tools/api)
  - [Aiven Provider for Terraform](/docs/tools/terraform)
  - [Aiven Operator for Kubernetes®](/docs/tools/kubernetes)

## Upgrade your service

<Tabs groupId="method">
<TabItem value="console" label="Console" default>

1. In the [Aiven Console](https://console.aiven.io/), go to your Valkey service.
1. On the <ConsoleLabel name="overview"/> page, go to the **Maintenance** section.
1. Click <ConsoleLabel name="actions"/> > **Upgrade version**.
1. Select a version to upgrade to.

   :::warning
   When you click **Upgrade**:
   - The system applies the upgrade immediately.
   - You cannot downgrade the service to a previous version.
   :::

1. Click **Upgrade**.

</TabItem>
<TabItem value="cli" label="CLI">

Upgrade the service version using the
[avn service update](https://aiven.io/docs/tools/cli/service-cli#avn-cli-service-update)
command:

```bash
avn service update SERVICE_NAME -c valkey_version="N.N"
```

Parameters:

- `SERVICE_NAME`: Name of your service
- `N.N`: Target service version to upgrade to, for example `9.0`

</TabItem>
<TabItem value="api" label="API">

Call the [ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
endpoint to set `valkey_version`:

```bash
curl --request PUT \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME \
  --header 'Authorization: Bearer BEARER_TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
    "user_config": {
      "valkey_version": "N.N"
    }
  }'
```

Parameters:

- `PROJECT_NAME`: Name of your project
- `SERVICE_NAME`: Name of your service
- `BEARER_TOKEN`: Your API authentication token
- `N.N`: Target service version to upgrade to, for example `9.0`

</TabItem>
<TabItem value="terraform" label="Terraform">

Use the
[`aiven_valkey`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/valkey)
resource to set
[`valkey_version`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/valkey#valkey_version-1):

```hcl
resource "aiven_valkey" "example" {
  project      = var.PROJECT_NAME
  cloud_name   = "CLOUD_NAME"
  plan         = "PLAN_NAME"
  service_name = "SERVICE_NAME"

  valkey_user_config {
    valkey_version = "N.N"
  }
}
```

Parameters:

- `PROJECT_NAME`: Name of your project
- `CLOUD_NAME`: Cloud region identifier
- `PLAN_NAME`: Service plan
- `SERVICE_NAME`: Name of your service
- `N.N`: Target service version to upgrade to, for example `9.0`

</TabItem>
<TabItem value="kubernetes" label="Kubernetes">

Use the
[Valkey](https://aiven.github.io/aiven-operator/resources/valkey.html)
resource to set
[`valkey_version`](https://aiven.github.io/aiven-operator/resources/valkey.html#spec.userConfig.valkey_version-property):

```yaml
apiVersion: aiven.io/v1alpha1
kind: Valkey
metadata:
  name: SERVICE_NAME
spec:
  authSecretRef:
    name: aiven-token
    key: token

  connInfoSecretTarget:
    name: valkey-connection

  project: PROJECT_NAME
  cloudName: CLOUD_NAME
  plan: PLAN_NAME

  userConfig:
    valkey_version: "N.N"
```

Apply the updated configuration:

```bash
kubectl apply -f valkey-service.yaml
```

Parameters:

- `PROJECT_NAME`: Name of your project
- `SERVICE_NAME`: Name of your service
- `CLOUD_NAME`: Cloud region identifier
- `PLAN_NAME`: Service plan
- `N.N`: Target service version to upgrade to, for example `9.0`

</TabItem>
</Tabs>

## Version selection for new services

When creating an Aiven for Valkey service:

- **Default version**: The platform uses the latest stable version by default.
- **Explicit selection**: You can specify a version using the `valkey_version` parameter.
- **Version availability**: Only versions in `available` state can be selected.

Example (CLI):

```bash
avn service create SERVICE_NAME \
  --service-type valkey \
  --plan PLAN_NAME \
  --cloud CLOUD_NAME \
  -c valkey_version="N.N"
```

Parameters:

- `SERVICE_NAME`: Name of your service
- `PLAN_NAME`: Service plan
- `CLOUD_NAME`: Cloud region identifier
- `N.N`: Service version, for example `8.1`

<RelatedPages/>

[Service maintenance](/docs/platform/concepts/maintenance-window)
