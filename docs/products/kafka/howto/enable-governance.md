---
title: Enable governance for Aiven for Apache Kafka®
sidebar_label: Enable governance
limited: true
---
import ConsoleLabel from "@site/src/components/ConsoleIcons"


Enable governance in Aiven for Apache Kafka® to establish a secure and compliant framework to manage your Aiven for Apache Kafka clusters efficiently.

By default, governance applies to the organization level, and admins can manually
select specific services to be governed through the Apache Kafka governance settings.

## Impact of enabling governance

- **Existing topics**:
  - The default group will own all existing Apache Kafka resources.
  - Ownership details for Apache Kafka resources are visible in the
    [Apache Kafka topic catalog](/docs/products/kafka/concepts/topic-catalog-overview).
  - Users from different groups can still claim ownership of individual resources.

- **Topic creation workflow**:
  - There is no impact on existing topics.
  - You can continue to [create topics](/docs/products/kafka/howto/create-topic) in your
    Aiven for Apache Kafka service. Governance adds a request-and-approval process for
    claiming topic ownership from the Apache Kafka topic catalog.
  - All topics align with your organization's data management policies.

## Prerequisites

- This is a [limited availability feature](/docs/platform/concepts/beta_services). To try
  it out, contact the [sales team](http://aiven.io/contact).
- You must be an
  [organization admin](/docs/platform/concepts/permissions#organization-roles-and-permissions)
  to enable governance.

:::note
**Application token requirements**: The [application token](/docs/platform/concepts/authentication-tokens)
needs at least **developer rights** to the project when using the Aiven Console for governance.
If all resources are created through Terraform, ownership is automatically assigned,
and the token's permissions won't be an issue.
:::

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
    updated. Existing topics are not be affected by these changes.
    :::

## Select services for governance

Select the Aiven for Apache Kafka services to include in governance. Topics from these
services become visible in the Topic Catalog, allowing users to claim ownership of
existing topics.

1. On the **Administration** page, click <ConsoleLabel name="governance"/>.
1. In the **Governed services** section, click **Change**.
1. In the **Select services for governance** dialog, select the services.
1. Click **Save**.

## Select the governance method

You can manage governance for Aiven for Apache Kafka® service using either the
Aiven Console or the Terraform Provider.

Depending on your workflow, choose between:

- **Aiven Console**: Manage governance tasks visually through the Aiven Console. View
  and claim ownership of resources in the Topic Catalog.
- **Terraform Provider**: Automate governance with the Terraform Provider. It integrates
  with GitOps workflows and allows governance management across multiple projects.

:::note
When using Terraform, all governance actions must be performed through Terraform. The
Aiven Console allows you to view requests but does not support operations such as
approving or declining them.
:::

1. On the **Administration** page, click <ConsoleLabel name="governance"/>.
1. In the **Governance method** section, click **Change**.
1. In the **Select governance method** dialog, choose either **Aiven Console** or **Terraform**.

   :::warning
   Switching from the Aiven Console to the Terraform method results in losing any pending requests.
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



## Related pages

- [Aiven for Apache Kafka® governance overview](/docs/products/kafka/concepts/governance-overview)
- [Project member roles and permissions](/docs/platform/concepts/permissions)
