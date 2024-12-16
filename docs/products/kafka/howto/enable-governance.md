---
title: Enable governance for Aiven for Apache Kafka®
sidebar_label: Enable governance
limited: true
---
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

Enable governance in Aiven for Apache Kafka® to establish a secure and compliant framework to manage your Aiven for Apache Kafka clusters efficiently.

## Impact of enabling governance

- **Existing topics**:
  - The selected default group is assigned as the owner of all existing Apache Kafka
    resources.
  - Ownership details for Apache Kafka resources are visible in the
    [Apache Kafka topic catalog](/docs/products/kafka/concepts/topic-catalog-overview).
  - Users from different groups can still claim ownership of individual resources.

- **Topic creation workflow**:
  - There is no impact on existing topics.
  - You can continue to [create topics](/docs/products/kafka/howto/create-topic) in your
    Aiven for Apache Kafka service. Governance in Aiven for Apache Kafka introduces an
    additional request-and-approval process to claim ownership of topics from the
    Apache Kafka topic catalog.
  - All topics align with your organization's data management policies.

## Prerequisites

- This is a [limited availability feature](/docs/platform/concepts/beta_services). To try
  it out, contact the sales team at [sales@aiven.io](mailto:sales@aiven.io).
- You must be an
  [organization admin](/docs/platform/concepts/permissions#organization-roles-and-permissions)
  to enable governance.

## Enable governance

1. Access the [Aiven Console](https://console.aiven.io/) and click **Admin**.
1. On the organization page, click <ConsoleLabel name="governance"/>.
1. Click **Enable governance**.
1. Select a user group to manage topics. This group is the default group and
   owns all topics in the organization.
   - If no user group exists, click **Create new user group**.
     1. Enter the group name and description.
     1. Click **Create group**.
     1. Select the created user group.
1. Click **Next**.
1. Define resource visibility for the Apache Kafka topic catalog.
1. Select **Project** or **Organization** visibility.

   - **Project**: Users can view Aiven for Apache Kafka resources in the Apache Kafka
     topic catalog if they are added to the project.
   - **Organization**: Users can view all Aiven for Apache Kafka resources across the
     organization in the Apache Kafka topic catalog, regardless of their access to
     individual projects.

1. Click **Next**.
1. Set global default topic configurations:
   - To use the default settings, click **Keep defaults** and review the default
     values on the confirmation window.
   - Click **Enable governance**.

   Alternatively, to customize:

   - Enter your global default topic configurations.
   - Click **Enable governance** to apply your changes.

    :::note
    Global topic configurations apply only to new topics created after the policies are
    updated. Existing topics are not be affected by these changes.
    :::

### Change the default user group

To change the default user group after enabling governance:

1. On the organization page, click <ConsoleLabel name="governance"/>.
1. Click **Change** next to **Default user group**.
1. Select a new user group from the list.
1. If no suitable group exists, [create a group](/docs/platform/howto/manage-groups#create-a-group)
   and select it.
1. Click **Save**.

### Update global topic configurations

To change global topic configurations after enabling governance:

1. On the organization page, click <ConsoleLabel name="governance"/>.
1. Click **Change** next to **Global default topic configurations**.
1. Update the global default topic configurations as needed.
1. Modify retention policies, partition strategies, or other settings.
1. Click **Save**.

## Disable governance

1. On the organization page, click <ConsoleLabel name="governance"/>.
1. Expand **Governance is enabled for your organization**.
1. Click **Disable**.

### Impact of disabling governance

- Existing ownership assigned to the Apache Kafka resources remains unchanged.
- Re-enabling governance later preserves the Apache Kafka resources ownership from
  the last time it was disabled.
- Apache Kafka resources claimed by specific groups retain their ownership.
- If you select a different user group when re-enabling governance,
  Apache Kafka resources under the previous default group are assigned to the
  new default governance group.

## Related pages
<!-- vale off -->
- [Aiven for Apache Kafka® governance overview](/docs/products/kafka/concepts/governance-overview)
- [Project member roles and permissions](/docs/platform/concepts/permissions)
