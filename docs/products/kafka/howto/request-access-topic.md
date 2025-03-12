---
title: Request access to an Apache Kafka topic
sidebar_label: Request access
---

import RelatedPages from "@site/src/components/RelatedPages";
import ConsoleLabel from "@site/src/components/ConsoleIcons";

Request access to an Apache Kafka topic in Aiven for Apache Kafka Governance to produce or consume messages using access control lists (ACLs).

## How access requests work

When you request access to an Apache Kafka topic, the following happens:

- A **service user** is created to authenticate and authorize access to the topic.
- A **Kafka-native ACL** is created to define the permissions.
- The request goes through an approval process before the credentials are available.

You can view the service user and ACLs in the following locations in the
[Aiven Console](https://console.aiven.io/):

- Select your **Aiven for Apache Kafka** service. In the sidebar,
  click <ConsoleLabel name="acl" /> or <ConsoleLabel name="serviceusers" />.
- Click **Tools** > **Apache Kafka governance operations**. In the sidebar,
  click <ConsoleLabel name="Streaming catalog" /> > **Access**.

## Prerequisites

[Governance](/docs/products/kafka/howto/enable-governance) enabled for your organization.

## Request access to a topic

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
       Only the **Literal** is supported. **Prefix** will be available later.
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

- The request is sent for approval and you receive a notification when the request
  is approved or rejected.
- To view and track requests, go to the
  [Group requests](/docs/products/kafka/howto/group-requests) page under
  **Governance operations**.
- If approved, you can view and download the credentials for authentication in
  <ConsoleLabel name="Streaming catalog"/> > Access overview.

## View and download service user credentials

After your request is approved, you can view and download the credentials for the
service user.

### Why credentials can be viewed once

For security reasons, access certificates and access keys are displayed only once. To
access credentials later or perform tasks like resetting credentials, go
to the **Aiven for Apache Kafka** service page > <ConsoleLabel name="serviceusers" />.
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
1. In the sidebar, click <ConsoleLabel name="Streaming catalog"/> > **Access**.
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
