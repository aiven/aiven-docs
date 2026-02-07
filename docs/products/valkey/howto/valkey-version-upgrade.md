---
title: Upgrade Aiven for Valkey™
sidebar_label: Upgrade version
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Choose an Aiven for Valkey™ version that best fits your needs and upgrade your service when ready.

Aiven for Valkey supports multiple versions of Valkey running concurrently in the platform.
This guide explains how multi-version support works and how to upgrade your service to a
newer version.

## Multi-version support

Aiven for Valkey supports
[two latest upstream Valkey versions](/docs/platform/reference/eol-for-major-versions#aiven-for-valkey)
at a time. Both versions are generally available and can be selected when creating a new
service or upgrading an existing service. Multi-versioning is supported both for the
standalone service mode and the
[clustered service mode](/docs/products/valkey/concepts/valkey-cluster).

## Upgrade your service

### Prerequisites

Before upgrading your service:

- **Test in development**: Test the upgrade in a development environment first.
- **Backup your data**: Ensure you have recent backups (backups are automatic but verify they exist)

To upgrade your service version, check that:

- Your Aiven for Valkey service is running.
- Target version to upgrade to is available for manual upgrade.
- You can use one of the following tools to upgrade:
  - [Aiven Console](https://console.aiven.io/)
  - [Aiven CLI](/docs/tools/cli)
  - [Aiven API](/docs/tools/api)
  - [Aiven Provider for Terraform](/docs/tools/terraform)
  - [Aiven Operator for Kubernetes®](/docs/tools/kubernetes)

### Upgrade steps

<Tabs groupId="method">
<TabItem value="console" label="Console" default>

1. Go to your Valkey service in the Aiven Console.
1. Go to the **Service Settings** page.
1. Locate the **Version** section.
1. Click the desired target version from the dropdown.
1. Review the upgrade confirmation dialog.
1. Click **Upgrade** to start the process.

</TabItem>
<TabItem value="cli" label="CLI">

```bash
avn service update SERVICE_NAME -c valkey_version=9.0
```

Parameters:

- `SERVICE_NAME`: Name of your Valkey service.

</TabItem>
<TabItem value="terraform" label="Terraform">

```hcl
resource "aiven_valkey" "example" {
  project      = var.project_name
  cloud_name   = "google-us-east1"
  plan         = "business-4"
  service_name = "my-valkey"

  valkey_user_config {
    valkey_version = "9.0"
  }
}
```

</TabItem>
<TabItem value="api" label="API">

To upgrade your Valkey service via API, use the
[ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate) endpoint:

```bash
curl --request PUT \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME \
  -H 'Authorization: Bearer BEARER_TOKEN' \
  -H 'content-type: application/json' \
  --data '{"user_config": {"valkey_version": "9.0"}}'
```

Parameters:

- `PROJECT_NAME`: Name of your project.
- `SERVICE_NAME`: Name of your Valkey service.
- `BEARER_TOKEN`: Your API authentication token.

</TabItem>
<TabItem value="kubernetes" label="Kubernetes">

To upgrade your Valkey service using the Aiven Operator for Kubernetes, update the
`valkey_version` in your service specification:

```yaml
apiVersion: aiven.io/v1alpha1
kind: Valkey
metadata:
  name: my-valkey
spec:
  authSecretRef:
    name: aiven-token
    key: token

  connInfoSecretTarget:
    name: my-valkey-connection

  project: PROJECT_NAME
  cloudName: google-us-east1
  plan: business-4

  userConfig:
    valkey_version: "9.0"
```

Apply the updated configuration:

```bash
kubectl apply -f valkey-service.yaml
```

Parameters:

- `PROJECT_NAME`: Name of your project.

</TabItem>
</Tabs>

## Downgrade service versions

Downgrading to a previous version is not supported due to potential data format
incompatibilities. Always test upgrades in a non-production environment first.

To revert to a previous version:

1. Create a service with the desired version.
1. Restore data from a backup taken before the upgrade.
1. Update your application connection strings.

## Version selection for new services

When creating an Aiven for Valkey service:

- **Default version**: The platform uses the latest stable version by default.
- **Explicit selection**: You can specify a version using the `valkey_version` parameter.
- **Version availability**: Only versions in `available` state can be selected.

Example (CLI):

```bash
avn service create my-valkey \
  --service-type valkey \
  --plan business-4 \
  --cloud google-us-east1 \
  -c valkey_version=8.1
```
