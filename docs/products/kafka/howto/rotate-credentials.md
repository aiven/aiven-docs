---
title: Rotate credentials for an Apache Kafka subscription
sidebar_label: Rotate credentials
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Rotate credentials for an Apache Kafka subscription to replace outdated credentials and maintain secure, approved access.
The request must be approved by another member of the owner group before new
credentials can be downloaded.

## Prerequisites

You must be a member of the **owner group** of the access to rotate.

## Request a credential rotation

1. In the [Aiven Console](https://console.aiven.io/), go to
   **Tools > Apache Kafka governance operations**.
1. In the sidebar, click <ConsoleLabel name="Streaming catalog"/> > **Access overview**.
1. In the **Access overview** page, locate the service user for which you need
   credentials.
1. Click <ConsoleLabel name="actions"/> > **Request credential rotation**.
1. In the **Request credential rotation** dialog, enter a message for the approvers.
1. Click **Submit**.

### What happens after you submit a rotation request

- The request is sent to the **owner group** for approval.
- The request must be approved by another member of the owner group.
- After approval:
  - New credentials are generated for the service user associated with the subscription.
  - The requester is notified when credentials are ready.
  - The requester can download the credentials from the request details.
- Only one active rotation request is allowed per access at a time.

## Approve a credential rotation

1. Go to **Tools > Apache Kafka governance operations**.
1. In sidebar, click **Approvals**.
1. Find the request with type **Rotate credentials**.
1. Click the request to view details.
1. Click **Approve** or **Decline**.

:::note
Another member of the owner group must approve the request.
:::

## View and download credentials

After your request is approved, you can download the new credentials.

1. Open the request from the email notification or go to
   **Tools > Apache Kafka governance operations**.
1. In the sidebar, click <ConsoleLabel name="streamingcatalog" /> > **Access overview**.
1. Locate the service user related to your request.
1. Click <ConsoleLabel name="actions" /> > **Review credentials**.
1. In the confirmation dialog, click **Show credentials**.
1. In the **Save service user credentials** dialog:
   - Click **Show** next to each field to reveal the credentials.
   - Click **Copy** next to each field to copy credentials.
   - Click **Download credentials** to save them.

:::warning
Credentials can only be viewed once. Make sure to save them securely.
:::

<RelatedPages/>

[Request access to an Apache Kafka topic](/docs/products/kafka/howto/request-access-topic)
