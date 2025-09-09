---
title: Upgrade Aiven for OpenSearch®
sidebar_label: Upgrade
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"
import RelatedPages from "@site/src/components/RelatedPages";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Aiven for OpenSearch® supports multiple versions, allowing you to choose the version that best fits your needs and upgrade when ready.

## Default version

When
[creating a Aiven for OpenSearch service](/docs/products/opensearch/get-started#create-an-aiven-for-opensearch-service),
you can select the starting version. See
available options in
[Versions of Aiven services and tools](/docs/platform/reference/eol-for-major-versions#aiven-for-opensearch).

## Multi-version support

Aiven for OpenSearch supports multiple minor and major versions. Upgrades are voluntary
and requires
[your action](/docs/products/opensearch/howto/os-version-upgrade#upgrade-your-service-version)
except the following mandatory updates, which are run automatically:

- Version patches applied during your maintenance window: `majorX.minorY.patch1` to
  `majorX.minorY.patch2`
- Cluster upgrade as a result of a node replacement in a disaster recovery scenario (to
  have all the cluster nodes running the same version)
- Upgrades as a result of versions reaching end-of-life and being deprecated on the Aiven
  Platform

Tracking the upgrade status is possible thanks to:

- Service <ConsoleLabel name="overview"/> page > the **Maintenance** section > List of
  available updates (mandatory or optional)
- Email notifications for automated updates

## Before you start

:::warning
Downgrades are not supported: You cannot revert to a previous version or change to a lower
one.
:::

- Upgrading between minor versions of the **same major version**: upgrade directly to the
  target version.
- Upgrading between minor versions of two **different major versions**:
  1. Upgrade to the latest major version.
  1. Upgrade to a minor version of the latest major version.

## Upgrade your service version

<Tabs groupId="group1">
<TabItem value="gui" label="Console" default>

1. In the [Aiven Console](https://console.aiven.io), go to your service.
1. On the <ConsoleLabel name="overview"/> page, go to the **Maintenance** section.
1. Click <ConsoleLabel name="actions"/> > **Upgrade version**.
1. Select a version to upgrade to, and click **Upgrade**.

</TabItem>
<TabItem value="tf" label="Terraform">

Use the
[aiven_opensearch](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/opensearch)
resource to set
[opensearch_version](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/opensearch#opensearch_version-1).

</TabItem>
<TabItem value="k8s" label="Kubernetes">

Use the
[OpenSearch](https://aiven.github.io/aiven-operator/resources/opensearch.html)
resource to set
[opensearch_version](https://aiven.github.io/aiven-operator/resources/opensearch.html#spec.userConfig.opensearch_version-property).

</TabItem>
</Tabs>



## FAQ

**Q: Will I be automatically upgraded to 2.19?**
A: No, upgrades between minor versions are voluntary.

**Q: How do I know if an upgrade is mandatory?**
A: The maintenance widget and email notifications will inform you.

**Q: What happens if I don’t run a mandatory upgrade?**
A: Mandatory updates are applied automatically during the maintenance window.

**Q: Can I downgrade my OpenSearch version?**
A: No, downgrades are not supported.

**Q: I am currently on version 2.17. How do I upgrade to 2.19?**
A: Use the “Upgrade version” button in the “Maintenance” section of the service overview screen.

**Q: I am currently on version 1.3. How do I upgrade to 2.19?**
A: Use the “Upgrade version” button in the “Maintenance” section of the service overview screen. You can skip 2.17 and upgrade directly to 2.19. For future major versions, you may need to upgrade stepwise.

**Q: I am using the Aiven Terraform operator. Do I need to update/modify anything?**
A: If you want to use 2.19, set `opensearch_version` to `"2.19"` in your Terraform configuration.

**Q: Does this new multi-version support differ from what Aiven supports as default for the other services?**
A: It may differ in details, such as not allowing downgrades. Once your service is on 2.19, you cannot revert to an earlier version.

**Q: Are there any forced upgrades?**
A: Yes, patch version updates are mandatory and applied automatically. If a node is lost and replaced, the cluster may be upgraded to ensure all nodes run the same version.


## Upgrade best practices

- If you are on 2.17, you can upgrade directly to 2.19.
- If you are on 1.3, you can skip 2.17 and upgrade directly to 2.19.
- For future major versions (e.g., 3), you may need to upgrade to the latest major version
  before upgrading further.

<RelatedPages/>

- [Service maintenance, updates and upgrades](/docs/platform/concepts/maintenance-window)
