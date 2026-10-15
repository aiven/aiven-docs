---
title: Upgrade the Aiven for Grafana® service version
sidebar_label: Upgrade service version
---

import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Aiven for Grafana® supports multiple Grafana major versions running concurrently in the platform. Choose a version that best fits your needs and upgrade your service when ready.

## Supported Grafana versions

From version 12, Aiven for Grafana supports two major upstream Grafana versions at a
time:

- The latest major version that is stable on the Aiven Platform.
- The previous major version, which continues to receive patch updates for its last
  minor version.

You can select either version when you create a service or upgrade an existing service.
If you do not select a version, the default is the version Aiven currently sets as the
default for new services, which is not always the latest available version.

Aiven for Grafana versions are major versions. You select the major version, and Aiven
applies minor and patch updates to it during your service's maintenance window. See the
supported versions in the
[Aiven for Grafana version reference](/docs/platform/reference/eol-for-major-versions#aiven-for-grafana).

## Before you upgrade

### Changes made since the last backup

:::warning
Upgrading restores your service from its most recent backup, so any changes made after
that backup are lost. This includes dashboards, data sources, and alert rules created or
edited in that window.
:::

Aiven for Grafana backs up your service every hour. To keep the window as small as
possible, start the upgrade shortly after a backup, and avoid editing your service
between the backup and the upgrade.

### Available or upcoming upgrades

Track upgrades for your service via:

- [Aiven Console](https://console.aiven.io): Service <ConsoleLabel name="overview"/>
  page > **Maintenance** section > List of available mandatory and optional upgrades
- Email: notifications for automated upgrades

### Upstream breaking changes

A Grafana major version can change or remove behavior that your dashboards, data
sources, alert rules, or plugins depend on. Before you upgrade, read the
[Grafana upgrade guide](https://grafana.com/docs/grafana/latest/upgrade-guide/) for the
target version and check your service against it.

Aiven performs the internal database migration that a major version upgrade requires, so
you don't need to prepare or reclaim space in the service database yourself. Focus your
review on the changes that affect your own content, for example:

- Plugins that the target version no longer supports.
- Data source UIDs that the target version rejects. From Grafana 12, a UID can contain
  only letters, numbers, and dashes. Non-compliant data sources are rejected, and
  dashboards and alert rules that reference them must be repointed to a replacement data
  source.
- Configuration options that the target version removes.

### Downgrade restriction

Downgrading to a previous version is not supported. Grafana migrates its database
forward when it starts and never migrates it back, so an older Grafana cannot start on a
database that a newer version has already migrated.

As a result, Aiven rejects the following:

- Updating a service to an earlier `grafana_version` than it currently runs.
- Forking a service to an earlier `grafana_version` than the source service runs.

There is no way to return a service to an earlier version after you upgrade it, so test
the upgrade on a fork before you upgrade a service you depend on:

1. [Fork your service](/docs/products/grafana/howto/fork-service) to the same version it
   currently runs.
1. Upgrade the fork to the target version.
1. Check your dashboards, data sources, alert rules, and plugins on the fork.
1. Upgrade your original service once the fork looks correct, and delete the fork.

### Prerequisites for upgrade

Before upgrading your service:

- **Test in a fork**: The upgrade
  [cannot be reversed](/docs/products/grafana/howto/grafana-version-upgrade#downgrade-restriction),
  so verify the target version on a fork first.
- **Time the upgrade**: Changes made since the last backup are
  [lost when you upgrade](/docs/products/grafana/howto/grafana-version-upgrade#changes-made-since-the-last-backup).

To upgrade your service version, check that:

- Your Aiven for Grafana service is running.
- Target version to upgrade to is
  [available for manual upgrade](/docs/products/grafana/howto/grafana-version-upgrade#available-or-upcoming-upgrades).
- You can use one of the following tools to upgrade:
  - [Aiven Console](https://console.aiven.io/)
  - [Aiven CLI](/docs/tools/cli)
  - [Aiven API](/docs/tools/api)
  - [Aiven Provider for Terraform](/docs/tools/terraform)
  - [Aiven Operator for Kubernetes®](/docs/tools/kubernetes)

## Upgrade your service

<Tabs groupId="method">
<TabItem value="console" label="Console" default>

1. In the [Aiven Console](https://console.aiven.io/), go to your Grafana service.
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
avn service update SERVICE_NAME -c grafana_version="N"
```

Parameters:

- `SERVICE_NAME`: Name of your service
- `N`: Target major version to upgrade to, for example `12`

</TabItem>
<TabItem value="api" label="API">

Call the [ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
endpoint to set `grafana_version`:

```bash
curl --request PUT \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME \
  --header 'Authorization: Bearer BEARER_TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
    "user_config": {
      "grafana_version": "N"
    }
  }'
```

Parameters:

- `PROJECT_NAME`: Name of your project
- `SERVICE_NAME`: Name of your service
- `BEARER_TOKEN`: Your API authentication token
- `N`: Target major version to upgrade to, for example `12`

</TabItem>
<TabItem value="terraform" label="Terraform">

Use the
[`aiven_grafana`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/grafana)
resource to set
[`grafana_version`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/grafana#grafana_version-1):

```hcl
resource "aiven_grafana" "example" {
  project      = var.PROJECT_NAME
  cloud_name   = "CLOUD_NAME"
  plan         = "PLAN_NAME"
  service_name = "SERVICE_NAME"

  grafana_user_config {
    grafana_version = "N"
  }
}
```

Parameters:

- `PROJECT_NAME`: Name of your project
- `CLOUD_NAME`: Cloud region identifier
- `PLAN_NAME`: Service plan
- `SERVICE_NAME`: Name of your service
- `N`: Target major version to upgrade to, for example `12`

</TabItem>
<TabItem value="kubernetes" label="Kubernetes">

Use the
[Grafana](https://aiven.github.io/aiven-operator/resources/grafana.html)
resource to set
[`grafana_version`](https://aiven.github.io/aiven-operator/resources/grafana.html#spec.userConfig.grafana_version-property):

```yaml
apiVersion: aiven.io/v1alpha1
kind: Grafana
metadata:
  name: SERVICE_NAME
spec:
  authSecretRef:
    name: aiven-token
    key: token

  connInfoSecretTarget:
    name: grafana-connection

  project: PROJECT_NAME
  cloudName: CLOUD_NAME
  plan: PLAN_NAME

  userConfig:
    grafana_version: "N"
```

Apply the updated configuration:

```bash
kubectl apply -f grafana-service.yaml
```

Parameters:

- `PROJECT_NAME`: Name of your project
- `SERVICE_NAME`: Name of your service
- `CLOUD_NAME`: Cloud region identifier
- `PLAN_NAME`: Service plan
- `N`: Target major version to upgrade to, for example `12`

</TabItem>
</Tabs>

## Version selection for new services

When creating an Aiven for Grafana service:

- **Default version**: Aiven sets a default major version for new services. This is not
  always the latest available version.
- **Explicit selection**: You can specify a version using the `grafana_version`
  parameter.
- **Version availability**: Only versions that are available on the Aiven Platform can be
  selected.

Example (CLI):

```bash
avn service create SERVICE_NAME \
  --service-type grafana \
  --plan PLAN_NAME \
  --cloud CLOUD_NAME \
  -c grafana_version="N"
```

Parameters:

- `SERVICE_NAME`: Name of your service
- `PLAN_NAME`: Service plan
- `CLOUD_NAME`: Cloud region identifier
- `N`: Major version, for example `12`

<RelatedPages/>

- [Aiven for Grafana® version lifecycle](/docs/products/grafana/reference/version-lifecycle)
- [Maintenance and updates for your Aiven for Grafana® service](/docs/products/grafana/howto/maintenance-updates)
- [Fork your Aiven for Grafana® service](/docs/products/grafana/howto/fork-service)
