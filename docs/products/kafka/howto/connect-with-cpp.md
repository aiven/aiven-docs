---
title: Connect to Aiven for Apache Kafka® with C++
sidebar_label: Connect with C++
keywords: [kafka, cpp, c++, quick connect, producer, consumer, mtls, sasl, librdkafka]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";

Use **Quick connect** to set up a C++ client for Aiven for Apache Kafka®.
The guided flow helps you choose or create a topic, choose an authentication method,
grant permissions, and copy generated producer and consumer code.

## Prerequisites

- A running [Aiven for Apache Kafka® service](/docs/products/kafka/get-started/create-kafka-service).
- A C++ development environment.
- The [`librdkafka`](https://github.com/confluentinc/librdkafka) and
  `librdkafka-devel` packages.

## Open Quick connect

1. In the [Aiven Console](https://console.aiven.io/), open your Aiven for Apache
   Kafka service.
1. On the service <ConsoleLabel name="overview"/> page, in the **Set up your
   stream** section, click **Quick connect**.
1. At the top of the page, click **C++** in the language selector.

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
   - **SASL**: Recommended. Use SASL/SCRAM-SHA-256 for simple
     username and password authentication.

     If SASL is not enabled on your service, an option to enable SASL appears
     under the **SASL** authentication method. Click **Enable SASL**, then
     continue.
   - **Client certificate**: Use certificate-based authentication with mTLS
     instead of a password.

1. Choose a service user:
   - Choose an existing service user from the list.
   - To create one, click **Create new service user**, enter a username, and
     click **Add service user**.
1. Check the permission status shown for the selected user:
   - If the user has all the required permissions, the granted permissions are
     shown (for example, `read, write`). To change them, click **Manage
     access in ACLs**.
   - If the user has some or no permissions, click **Grant permissions**. Choose
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
a local C++ project. The ZIP file includes ready-to-run producer and consumer
code, certificates, and dependencies. To run it, follow the included `README.md`.
If you already have a C++ project, copy the snippet from the **Producer** or
**Consumer** tab.
:::

1. Under **Prerequisites**, install `librdkafka` and `librdkafka-devel`.

   For installation instructions, open **librdkafka on GitHub**.
1. Under **Downloads**, download the certificate files for your authentication
   method:

   - For **SASL**, click **Download CA certificate (ca.pem)**.
   - For **Client certificate**, download **CA certificate (ca.pem)**,
     **service certificate (service.cert)**, and **service key (service.key)**.

   The generated snippet loads the certificates directly, so you don't need to
   create a truststore.

1. Click the **Producer** or **Consumer** tab to view the generated producer or
   consumer code.
1. Copy the generated code into `producer.cpp` or `consumer.cpp`.
1. Compile and run the producer or consumer using the generated command:

   ```bash
   gcc -o producer.o -Wall -lrdkafka producer.cpp && ./producer.o
   ```

   ```bash
   gcc -o consumer.o -Wall -lrdkafka consumer.cpp && ./consumer.o
   ```

   :::warning
   For SASL, copied snippets include the service user password in plaintext.
   Store the code securely, and do not commit it to source control.
   :::

After you add the code to your project, update the certificate file paths to
match where you saved the files, then run your producer or consumer to start
streaming events.
