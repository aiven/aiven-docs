---
title: Connect to Aiven for Apache Kafka® with Go
sidebar_label: Connect with Go
keywords: [kafka, go, golang, quick connect, producer, consumer, mtls, sasl]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";

Use **Quick connect** to set up a Go client for Aiven for Apache Kafka®.
The guided flow helps you choose or create a topic, choose an authentication method,
grant permissions, and copy generated producer and consumer code.

## Prerequisites

- A running [Aiven for Apache Kafka® service](/docs/products/kafka/get-started/create-kafka-service).
- A Go development environment.
- The [`kafka-go`](https://github.com/segmentio/kafka-go) library.

## Open Quick connect

1. In the [Aiven Console](https://console.aiven.io/), open your Aiven for Apache
   Kafka service.
1. On the service <ConsoleLabel name="overview"/> page, in the **Set up your
   stream** section, click **Quick connect**.
1. At the top of the page, click **Go**.

## Step 1: Set up a topic

Topics organize and store the events that you stream to Apache Kafka.

1. In **Topic name**, do one of the following:
   - Choose an existing topic.
   - Click **Create new topic**, enter a name, and create the topic. The new
     topic is selected automatically for the next steps.

   :::note
   If your service has **Diskless topics** enabled, you can create a **Classic**
   or **Diskless** topic, or choose an existing topic of either type. You can't
   change the topic type after creation. For more information, see
   [Create Apache Kafka® topics](/docs/products/kafka/howto/create-topic).
   :::

## Step 2: Set up an authentication method

1. Choose an authentication method:
   - **SASL**: Recommended. Use SASL/SCRAM-SHA-512 for username and
     password authentication.

     Go code snippets use `SCRAM-SHA-512` for SASL authentication.

     SASL is enabled by default for new Aiven for Apache Kafka services. For
     existing services, check whether SASL is enabled. If **Enable SASL**
     appears, click **Enable SASL**, then continue.
   - **Client certificate**: Use certificate-based authentication with mTLS
     instead of a password.

1. Select a service user:
   - Select an existing service user from the list.
   - To create one, click **Create new service user**, enter a username, and
     click **Add service user**.
1. Check the permission status shown for the selected user:
   - If the user has all the required permissions, the granted permissions are
     shown (for example, `read, write`). To change them, click **Manage
     access in ACLs**.
   - If the user has some or no permissions, click **Grant permissions**. Select
     **Produce**, **Consume**, or both, and click **Save**.

   :::note
   The `avnadmin` user has permissions by default.

   For other service users, you can add permissions from Quick connect. To
   change or remove permissions, click **Manage access in ACLs**. For more
   information, see
   [Manage Apache Kafka® ACLs](/docs/products/kafka/howto/manage-acls#delete-acl-entries).
   :::

## Step 3: Copy the code snippets

:::tip
**Download template** is an optional shortcut for testing the connection without
a local Go environment. The ZIP file includes ready-to-run producer and consumer
code, certificates, and dependencies. To run it, follow the included `README.md`.
If you already have a Go project, copy the snippet from the **Producer** or
**Consumer** tab.
:::

1. Under **Prerequisites**, initialize a Go module and install the required
   libraries:

   ```bash
   go mod init <your-project-name>
   ```

   ```bash
   go get github.com/segmentio/kafka-go
   ```

   For **SASL**, also install the SCRAM package:

   ```bash
   go get github.com/segmentio/kafka-go/sasl/scram@v0.4.51
   ```

1. Under **Downloads**, download the certificate files for your authentication
   method:

   - For **SASL**, click **Download CA certificate**.
   - For **Client certificate**, click **Download CA certificate**,
     **Download service certificate**, and **Download service access key**.

   The generated snippet loads the certificates directly, so you don't need to
   create a truststore.

1. Click the **Producer** or **Consumer** tab to view the generated producer or
   consumer code.
1. Copy the code.

  :::warning
  For SASL, copied snippets include the service user password in plaintext.
  Store the code securely, and do not commit it to source control.
  :::

After you add the code to your project, update the certificate file paths to
match where you saved the files, then run your producer or consumer to start
streaming events.
