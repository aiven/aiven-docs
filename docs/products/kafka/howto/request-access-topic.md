---
title: Request access to an Apache Kafka topic
sidebar_label: Request access
---

import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Request access to an Apache Kafka topic in Aiven for Apache Kafka Governance to produce or consume messages using access control lists (ACLs).

## How access requests work

When you request access to an Apache Kafka topic, the following happens:

- A **service user** is created to authenticate and authorize access to the topic.
- A [Kafka-native ACL](/docs/products/kafka/concepts/acl#kafka-native-acl-capabilities)
  is created to define the permissions.
- The request goes through an approval process before the credentials are available.

You can view the service user and ACLs in the following locations in the
[Aiven Console](https://console.aiven.io/):

- Select your **Aiven for Apache Kafka** service. In the sidebar,
  click <ConsoleLabel name="acl" /> or <ConsoleLabel name="serviceusers" />.
- Click **Tools** > **Apache Kafka governance operations**. In the sidebar,
  click <ConsoleLabel name="streamingcatalog" /> > **Access**.

## Prerequisites

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

[Governance](/docs/products/kafka/howto/enable-governance) enabled for your organization

</TabItem>
<TabItem value="terraform" label="Terraform">

- [Terraform installed](https://www.terraform.io/downloads)
- A [personal token](https://docs.aiven.io/docs/platform/howto/create_authentication_token.html)
- A GitHub repository with [approval workflows configured](/docs/products/kafka/howto/terraform-governance-approvals)
- To use beta features of the Aiven Provider for Terraform, set:

  ```bash
  export PROVIDER_AIVEN_ENABLE_BETA=1

  ```

</TabItem>
</Tabs>

## Request access to a topic

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. In the [Aiven console](https://console.aiven.io/),
   click **Tools** > **Apache Kafka governance operations**.
1. In the sidebar, click <ConsoleLabel name="Streaming catalog"/> > **Topics**.
1. Click the topic you need access to.
1. In the Topic details panel, click **Request access**.
1. Fill in the **Request access** form:

   - **Project and service**: Auto-populated based on the selected topic.
   - **Service user**: Enter a username. If left blank, a name is generated automatically.
   - **Purpose description**: Describe the purpose of this service user.
   - **Access control list (ACL)**:
     - **Pattern type**: Auto-populated as **Literal**.

       :::note
       Only the **Literal** pattern type is supported. **Prefix** will be available later.
       :::

     - **Topic**: Auto-populated from the selected topic.
     - **Permission type**: Auto-populated as **Allow**.
     - **Operation**: Select **Read** or **Write**.
     - **Host**: Enter an IP address or use `*` to allow access from any host.
     - Optional: Click **Add another ACL** to define multiple ACLs.
   - **Approval information**:
     - **Service user owner**: Select the responsible team.
     - **Message for approval**: Provide details for review.

1. Click **Submit**.

After submitting:

- The request is sent for approval. To check the status, go to the
  [Group requests](/docs/products/kafka/howto/group-requests) page under
  **Governance operations**.
- If approved, you can view and download the credentials for authentication in
  <ConsoleLabel name="Streaming catalog"/> > **Access overview**.

</TabItem>
<TabItem value="terraform" label="Terraform">

Use the [`aiven_governance_access` resource](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/governance_access)
to request access to an Apache Kafka topic. The request is reviewed and approved in a
GitHub pull request before access is
granted.

<div style={{ marginTop: "1.25rem" }} />

### How it works

1. Define the request:

   - Use Terraform to define the service user, topic, and the required access control
     lists (ACLs).
   - Specify the `owner_user_group_id` to indicate the group responsible for approving
     the request.

     **Example Terraform configuration:**

     ```hcl
     resource "aiven_governance_access" "example" {
      organization_id = data.aiven_organization.main.id
      access_name     = "example-topic-access"
      access_type     = "KAFKA"

      access_data {
        project      = data.aiven_project.main.project
        service_name = aiven_kafka.main.service_name

        acls {
          resource_name   = "example-topic"
          resource_type   = "Topic"
          operation       = "Read"
          permission_type = "ALLOW"
          host            = "*"
        }
      }

      owner_user_group_id = aiven_organization_user_group.example.group_id
     }
     ```

   - Commit and push the configuration to a GitHub repository with governance approval
     workflows enabled.

1. Review and approve the request:

   - The request appears as a pull request in GitHub.
   - A GitHub Action checks the request:
     - The requester must belong to the group defined by `owner_user_group_id`.
     - An approval must come from another member of the same group.

     :::note
       To verify group membership, GitHub user IDs must be mapped to Aiven user IDs using
       the
       [`aiven_external_identity`](/docs/products/kafka/howto/terraform-governance-approvals#step-2-map-github-users-to-aiven-identities)
       resource.
        :::

   - If the request meets all governance rules, the workflow applies the configuration
     using `terraform apply`.
   - After the request is approved, Aiven creates the service user, applies the ACLs to
     the specified topic, and generates the credentials.

1. Download the credentials:

   After access is provisioned, download the credentials from the
   [Aiven Console](https://console.aiven.io/). For more details, see
   [View and download service user credentials](#view-and-download-credentials).

   :::note
   Credentials are not available in Terraform or GitHub Actions output.
   :::

</TabItem>
</Tabs>

## View and download credentials

After the request is approved, you can view and download the credentials for the
service user.

### Why credentials can be viewed once

For security reasons, access certificates and access keys are shown only once to limit
exposure and prevent unauthorized access. To access credentials later or perform tasks
like resetting credentials, go to the
**Aiven for Apache Kafka** service page > <ConsoleLabel name="serviceusers" />.
For more information, see [Manage service users](/docs/products/kafka/howto/add-manage-service-users#manage-users).

This approach:

- Prevents storing sensitive credentials in plain text, reducing the risk of unauthorized
  access.
- Encourages secure storage, as users must save access certificates and keys immediately
  after viewing them.
- Future updates will further improve credential security.

### Steps to view and download credentials

1. Access the [Aiven console](https://console.aiven.io/) and go to
   **Tools > Apache Kafka governance operations**.
1. In the sidebar, click <ConsoleLabel name="Streaming catalog"/> > **Access overview**.
1. In the **Access overview** page, locate the service user for which you need
   credentials.
1. Click <ConsoleLabel name="actions"/> > **View credentials**.
1. On the confirmation window, click **Show credentials**.

   :::warning
   - Credentials can only be viewed once and only by members of the service owner group.
   - Once credentials are viewed, they cannot be retrieved again from the
     **Access overview** page.
   :::

1. In the **Save service user credentials** window, click **Show** to reveal the
   password, access certificate, or access key. Click **Download credentials** to save
   all at once.


<RelatedPages/>

- [Manage approvals in the Aiven Console](/docs/products/kafka/howto/approvals)
