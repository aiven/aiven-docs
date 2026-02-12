---
title: Upgrade Aiven for OpenSearch®
sidebar_label: Upgrade version
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RelatedPages from "@site/src/components/RelatedPages";

Aiven for OpenSearch® allows you to choose the version that best fits your needs and upgrade when ready.

## Multi-version: how it works

- Aiven for OpenSearch supports the
  [two latest upstream OpenSearch major versions](/docs/platform/reference/eol-for-major-versions#aiven-for-opensearch).
- When Aiven releases a new minor version within a major version, it decommissions
  the previous minor version after six months, giving you time to test and migrate.
- Patch version upgrades are automatic. For example, Aiven upgrades 3.3.1 to 3.3.2.

### Default version

When
[creating an Aiven for OpenSearch service](/docs/products/opensearch/get-started#create-an-aiven-for-opensearch-service),
you can select the starting version. See all available versions in
[Versions of Aiven-managed services and tools](/docs/platform/reference/eol-for-major-versions#aiven-for-opensearch).

### Voluntary manual upgrades

Except for a few [specific cases](/docs/products/opensearch/howto/os-version-upgrade#mandatory-automatic-upgrades),
upgrades are voluntary and require
[your action](/docs/products/opensearch/howto/os-version-upgrade#upgrade-your-service).

- Upgrading between minor versions of the **same major version**:
  [upgrade](/docs/products/opensearch/howto/os-version-upgrade#upgrade-your-service)
  directly to the target version.
- Upgrading between minor versions of two **different major versions**:
  1. [Upgrade](/docs/products/opensearch/howto/os-version-upgrade#upgrade-your-service)
     to the latest major version.
  1. [Upgrade](/docs/products/opensearch/howto/os-version-upgrade#upgrade-your-service)
     to a minor version of the latest major version.

### Mandatory automatic upgrades

Although mandatory upgrades don't require your action, you can still
[run](/docs/products/opensearch/howto/os-version-upgrade#upgrade-your-service) them
yourself as soon as they become
[available](/docs/products/opensearch/howto/os-version-upgrade#available-or-upcoming-upgrades).
Otherwise, they are applied automatically during the
[maintenance window](/docs/platform/concepts/maintenance-window#maintenance-window).

- **Version patches**: `major.minor.patch1` > `major.minor.patch2`, for example,
  `2.19.1` > `2.19.2`
  - Scheduled and applied during your
    [maintenance window](/docs/platform/concepts/maintenance-window#maintenance-window)
  - Possible after any voluntary manual minor version upgrade to ensure the patch version
    consistency between the cluster nodes
- Cluster node version upgrades after **node replacements** in disaster recovery scenarios
  to ensure the version consistency between the cluster nodes
- Upgrades due to
  **[versions reaching end-of-life](/docs/platform/reference/eol-for-major-versions#aiven-for-opensearch)**
  on the Aiven Platform

## Before you start

### Available or upcoming upgrades

Track upgrades for your service via:

- [Aiven Console](https://console.aiven.io): Service <ConsoleLabel name="overview"/>
  page > the **Maintenance** section > List of available mandatory and optional upgrades
- Email: notifications for automated upgrades

### Downgrade restriction

Downgrades are not supported: You cannot revert to a previous version or change to a lower

### Prerequisites for upgrade

To upgrade your service version, check that:

- Your Aiven for OpenSearch service is running.
- Target version to upgrade to is available for
  [manual upgrade](/docs/products/opensearch/howto/os-version-upgrade#available-or-upcoming-upgrades).
- You can use one of the following tools to upgrade:
  - [Aiven Console](https://console.aiven.io/)
  - [Aiven CLI](/docs/tools/cli)
  - [Aiven API](/docs/tools/api)
  - [Aiven Provider for Terraform](/docs/tools/terraform)
  - [Aiven Operator for Kubernetes®](/docs/tools/kubernetes)

## Upgrade your service

<Tabs groupId="group1">
<TabItem value="gui" label="Console" default>

1. In the [Aiven Console](https://console.aiven.io), go to your service.
1. On the <ConsoleLabel name="overview"/> page, go to the **Maintenance** section.
1. Click <ConsoleLabel name="actions"/> > **Upgrade version**.
1. Select a version to upgrade to, and click **Upgrade**.

</TabItem>
<TabItem value="cli" label="CLI" >

1. Optional: Check available service versions using the
   [avn service versions](https://aiven.io/docs/tools/cli/service-cli#avn-service-versions)
   command.
1. Upgrade the service version using the
   [avn service update](https://aiven.io/docs/tools/cli/service-cli#avn-cli-service-update)
   command. Replace placeholders `PROJECT_NAME`, `SERVICE_NAME`, and `NEW_VERSION` as
   needed.

   ```bash
   avn service update --project PROJECT_NAME SERVICE_NAME -c service_version=NEW_VERSION
   ```

</TabItem>

<TabItem value="api" label="API" >

Call the [ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
endpoint to set `service_version`. Replace placeholders `PROJECT_NAME`, `SERVICE_NAME`,
`API_TOKEN`, and `NEW_VERSION` as needed.

```bash {7}
curl --request PUT \
     --url "https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME" \
     --header "Authorization: Bearer API_TOKEN" \
     --header "Content-Type: application/json" \
     --data '{
       "user_config": {
         "service_version": "NEW_VERSION"
       }
     }'
```

</TabItem>

<TabItem value="tf" label="Terraform">

Use the
[`aiven_opensearch`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/opensearch)
resource to set
[`opensearch_version`](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/opensearch#opensearch_version-1).

</TabItem>
<TabItem value="k8s" label="Kubernetes">

Use the
[OpenSearch](https://aiven.github.io/aiven-operator/resources/opensearch.html)
resource to set
[`opensearch_version`](https://aiven.github.io/aiven-operator/resources/opensearch.html#spec.userConfig.opensearch_version-property).

</TabItem>
</Tabs>

<RelatedPages/>

- [Control maintenance updates with upgrade pipelines](/docs/platform/howto/controlled-upgrade)
- [Service maintenance](/docs/platform/concepts/maintenance-window)
