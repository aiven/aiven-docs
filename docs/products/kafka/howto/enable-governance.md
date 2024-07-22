---
title: Enable governance for Aiven for Apache Kafka®
---
import ConsoleLabel from "@site/src/components/ConsoleIcons"

Enable governance in Aiven for Apache Kafka® to establish a secure and compliant framework to manage your Aiven for Apache Kafka clusters efficiently.

## Prerequisites

- This is a [limited availability feature](/docs/platform/concepts/beta_services). To try
  it out, contact the sales team at [sales@aiven.io](mailto:sales@aiven.io).
- You need [super admin](/docs/platform/howto/make-super-admin) permissions to
enable governance.

## Enable governance

1. Access the [Aiven Console](https://console.aiven.io/) and click **Admin**.
1. In the organization administration page, Click <ConsoleLabel name="Apache Kafka governance"/>.
1. Click **Enable governance**.
1. Select or create a user group to manage topics. This group is the default group and
   owns all topics in the organization.
   - If no user group exists, click **Create new user group**.
     - Enter the group name and description.
     - Assign users to this group by searching for their name or email.
     - Click **Create group**.
   - Select the created user group.
1. Click **Next**.
1. Define resource visibility for the topic catalog.
1. Select **Project** or **Organization** visibility.

   - **Project**: Users can view Apache Kafka resources in the topic catalog if they
     are project members.
   - **Organization**: Users can view all Apache Kafka resources of the organization in
     the topic catalog, regardless of individual project access.
1. Click **Next** to continue.
1. Set global default topic configurations:
   - Click **Keep defaults**. Review the default values on the confirmation window.
   - Click **Enable governance**.
   - Alternatively, enter your desired global default topic configurations.
   - Click **Enable governance** to apply your changes.

### Impact of enabling governance

- **Existing topics**:
  - The default owner you selected is assigned to all existing topics.
  - Ownership details are be visible in the topic catalog.
  - Users can still claim ownership of individual topics.
  - You can also update the default owner as needed.

- **Topic creation workflow**:
  - Direct topic creation is replaced by a structured request-and-approval process.
  - This ensures all topics align with your organization's data management policies.

## Disable governance

1. In the organization, click **Admin**.
1. Click **Apache Kafka governance**.
1. Expand **Governance is enabled for your organization**.
1. Click **Disable**.

### Impact of disabling governance

- Existing ownership assigned to the topics remains unchanged.
- Re-enabling governance later preserves the ownership settings from the last time it
  was disabled.
- Topics claimed by specific groups retain their ownership.
- If you select a different user group when re-enabling governance, topics under the
  previous default group are assigned to the new default governance group.

## Related pages

- [Aiven for Apache Kafka® governance overview](/docs/products/kafka/concepts/governance-overview)
