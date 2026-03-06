---
title: Manage Aiven for MySQL® versions
sidebar_label: Manage version
---

import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Aiven for MySQL® supports multiple versions of MySQL running concurrently in the platform. Choose a version that best fits your needs and upgrade your service when ready.

## Multi-version support

Starting from version 8.4, Aiven for MySQL supports
[two latest upstream MySQL versions](/docs/platform/reference/eol-for-major-versions#aiven-for-mysql)
at a time. Both versions are generally available and can be selected when creating a new
service or upgrading an existing service.

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

- Your Aiven for MySQL service is running.
- Target version to upgrade to is
  [available for manual upgrade](/docs/products/mysql/howto/manage-mysql-version#available-or-upcoming-upgrades).
- You can use one of the following tools to upgrade:
  - [Aiven Console](https://console.aiven.io/)
  - [Aiven CLI](/docs/tools/cli)
  - [Aiven API](/docs/tools/api)
  - [Aiven Provider for Terraform](/docs/tools/terraform)
  - [Aiven Operator for Kubernetes®](/docs/tools/kubernetes)

## Upgrade your service

<Tabs groupId="method">
<TabItem value="console" label="Console" default>

1. In the [Aiven Console](https://console.aiven.io/), go to your MySQL service.
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
avn service update SERVICE_NAME -c mysql_version="N.N"
```

Parameters:

- `SERVICE_NAME`: Name of your service
- `N.N`: Target service version to upgrade to, for example `9.0`

</TabItem>
<TabItem value="api" label="API">

Call the [ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
endpoint to set `mysql_version`:

```bash
curl --request PUT \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME \
  --header 'Authorization: Bearer BEARER_TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
    "user_config": {
      "mysql_version": "N.N"
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
[`aiven_mysql`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/mysql)
resource to set
[`mysql_version`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/mysql#mysql_version-1):

```hcl
resource "aiven_mysql" "example" {
  project      = var.PROJECT_NAME
  cloud_name   = "CLOUD_NAME"
  plan         = "PLAN_NAME"
  service_name = "SERVICE_NAME"

  mysql_user_config {
    mysql_version = "N.N"
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
[MySQL](https://aiven.github.io/aiven-operator/resources/mysql.html)
resource to set
[`mysql_version`](https://aiven.github.io/aiven-operator/resources/mysql.html#spec.userConfig.mysql_version-property):

```yaml
apiVersion: aiven.io/v1alpha1
kind: MySQL
metadata:
  name: SERVICE_NAME
spec:
  authSecretRef:
    name: aiven-token
    key: token

  connInfoSecretTarget:
    name: mysql-connection

  project: PROJECT_NAME
  cloudName: CLOUD_NAME
  plan: PLAN_NAME

  userConfig:
    mysql_version: "N.N"
```

Apply the updated configuration:

```bash
kubectl apply -f mysql-service.yaml
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

When creating an Aiven for MySQL service:

- **Default version**: The platform uses the latest stable version by default.
- **Explicit selection**: You can specify a version using the `mysql_version` parameter.
- **Version availability**: Only versions in `available` state can be selected.

Example (CLI):

```bash
avn service create SERVICE_NAME \
  --service-type mysql \
  --plan PLAN_NAME \
  --cloud CLOUD_NAME \
  -c mysql_version="N.N"
```

Parameters:

- `SERVICE_NAME`: Name of your service
- `PLAN_NAME`: Service plan
- `CLOUD_NAME`: Cloud region identifier
- `N.N`: Service version, for example `8.1`

<RelatedPages/>

[Service maintenance](/docs/platform/concepts/maintenance-window)
