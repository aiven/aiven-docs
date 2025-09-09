---
title: Upgrade Aiven for OpenSearch®
sidebar_label: Upgrade
---

Aiven for OpenSearch® supports multiple versions, allowing you to choose the version that best fits your needs and upgrade when ready.

## Default version

When creating a new Aiven for OpenSearch service, you can select the starting version. See
available options in
[Versions of Aiven services and tools](/docs/platform/reference/eol-for-major-versions#aiven-for-opensearch).

## Multi-Version Support

Aiven now supports minor OpenSearch 2 versions in the same way as major versions.
- No automatic upgrades between minor versions (e.g., 2.17 to 2.19).
- You can voluntarily upgrade to a newer minor or major version.
- Downgrades are not supported; once upgraded, you cannot revert to a previous version.

## How to Upgrade

### Using the Console

- Go to your service overview screen.
- In the **Maintenance** section, click the **Upgrade version** button.
- If you are on 2.17, you can upgrade directly to 2.19.
- If you are on 1.3, you can skip 2.17 and upgrade directly to 2.19.
- For future major versions (e.g., 3), you may need to upgrade to the latest major version before upgrading further.

### Using Terraform

- If you want to use OpenSearch 2.19, set `opensearch_version` to `"2.19"` in your Terraform configuration.
- If you want to stay on 2.17, no changes are needed.

## Mandatory Upgrades

- **Patch version updates** (e.g., 2.17.1 to 2.17.2) are mandatory and applied automatically during your maintenance window.
- If a node is lost and replaced, the cluster may be upgraded to ensure all nodes run the same version.
- OpenSearch 1 and 2 are End-of-Life (EOL); only OpenSearch 3 is officially supported. Outdated versions will eventually be deprecated.

## Notifications

- The **Maintenance widget** on your service overview page will indicate available updates (mandatory or optional).
- You will receive email notifications before any automated update is applied.

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
