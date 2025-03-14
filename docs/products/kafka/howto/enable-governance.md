---
title: Enable governance for Aiven for Apache Kafka®
sidebar_label: Enable governance
limited: true
---

import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons"

Enable governance in Aiven for Apache Kafka® to create a secure and compliant framework to manage your Aiven for Apache Kafka services efficiently.

By default, governance applies at the organization level. Organization admin can manually
select specific services to govern through the Apache Kafka governance settings

## Impact of enabling governance

- **Existing topics**:
  - The default group owns all existing Apache Kafka resources.
  - Ownership details for Apache Kafka resources are visible in the
    [Apache Kafka topic catalog](/docs/products/kafka/concepts/topic-catalog-overview).
  - Users in different groups can request ownership of individual resources.

- **Topic creation workflow**:
  - Existing topics remain unaffected.
  - You can continue to [create topics](/docs/products/kafka/howto/create-topic) in your
    Aiven for Apache Kafka service. Governance adds a request-and-approval process for
    claiming topic ownership through the Apache Kafka topic catalog.
  - All topics align with your organization's data management policies.

## Prerequisites

- This is a [limited availability feature](/docs/platform/concepts/service-and-feature-releases). To try
  it out, contact the [sales team](http://aiven.io/contact).
- Ensure you have
  [super admin permissions](/docs/platform/howto/manage-permissions#make-users-super-admin)
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
1. Set global default topic configurations:
   - To use the default settings, click **Keep defaults** and review the default
     values on the confirmation window.
   - Click **Enable governance**.

   To customize the settings:

   - Enter your global default topic configurations.
   - Click **Enable governance** to apply your changes.

    :::note
    Global topic configurations apply only to new topics created after the policies are
    updated. Existing topics are not affected by these changes.
    :::

## Select services for governance

Choose which Aiven for Apache Kafka services to include in governance. Topics from
these services will appear in the Topic Catalog, allowing users to claim ownership of
existing topics.

1. On the **Administration** page, click <ConsoleLabel name="governance"/>.
1. In the **Governed services** section, click **Change**.
1. In the **Select services for governance** dialog, select the services.
1. Click **Save**.

## Select the governance method

You can manage governance for Aiven for Apache Kafka® service using either the
Aiven Console or the Aiven Terraform Provider.

Depending on your workflow, choose between:

- **Aiven Console**: Manage governance tasks visually through the Aiven Console. View
  and claim ownership of resources in the Topic Catalog. This method is selected by
  default.
- **Aiven Terraform Provider**: Automate governance with the Terraform Provider. It
  integrates with GitOps workflows and allows governance management across multiple
  projects.

:::note
When using the Terraform method, all governance actions must be performed through
Aiven Terraform Provider. The Aiven Console provides an audit log of created requests.
:::

1. On the **Administration** page, click <ConsoleLabel name="governance"/>.
1. In the **Governance method** section, click **Change**.
1. In the **Select governance method** dialog, choose either **Aiven Console** or
   **Terraform**.

   :::warning
   Switching from the Aiven Console to the Terraform method results in the loss
   of all pending requests.
   :::

1. Click **Save**.

## Change the default user group

To change the default user group after enabling governance:

1. On the **Administration** page, click <ConsoleLabel name="governance"/>.
1. Click **Change** next to **Default user group**.
1. Select a new user group from the list.
1. If no suitable group exists, [create a group](/docs/platform/howto/manage-groups#create-a-group)
   and select it.
1. Click **Save**.

## Update global topic configurations

To change global topic configurations after enabling governance:

1. On the **Administration** page, click <ConsoleLabel name="governance"/>.
1. Click **Change** next to **Global default topic configurations**.
1. Update the global default topic configurations as needed.
1. Modify retention policies, partition strategies, or other settings.
1. Click **Save**.

## Disable governance

1. On the **Administration** page, click <ConsoleLabel name="governance"/>.
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

<RelatedPages/>

- [Aiven for Apache Kafka® governance overview](/docs/products/kafka/concepts/governance-overview)
- [Project member roles and permissions](/docs/platform/concepts/permissions)
