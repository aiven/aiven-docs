---
title: Connect to Aiven for Apache Kafka® with Java
sidebar_label: Connect with Java
keywords: [kafka, java, quick connect, producer, consumer, mtls, sasl]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";

Use **Quick connect** to set up a Java client for Aiven for Apache Kafka®.
The guided flow helps you choose or create a topic, choose an authentication
method, grant permissions, and copy generated producer and consumer code.

## Prerequisites

- A running [Aiven for Apache Kafka® service](/docs/products/kafka/get-started/create-kafka-service).
- A Java development environment with [Maven](https://maven.apache.org/install.html).

## Open Quick connect

1. In the [Aiven Console](https://console.aiven.io/), open your Aiven for Apache
   Kafka service.
1. On the service <ConsoleLabel name="overview"/> page, in the **Set up your
   stream** section, click **Quick connect**.
1. At the top of the page, click **Java** in the language selector.

## Step 1: Set up a topic

Topics organize and store the events that you stream to Apache Kafka.

1. In **Topic name**, do one of the following:
   - Choose an existing topic.
   - Click **Create new topic**, enter a name, and create the topic. The new
     topic becomes the topic for the next steps.

   :::note
   If your service has **Diskless topics** enabled, you can create a **Classic**
   or **Diskless** topic, or choose an existing topic of either type. You can't
   change the topic type after creation. For more information, see
   [Create Apache Kafka® topics](/docs/products/kafka/howto/create-topic).
   :::

## Step 2: Set up an authentication method

1. Choose an authentication method:

   - **SASL**: Recommended. Use SASL/SCRAM-SHA-256 for username and
     password authentication.

     SASL is enabled by default for new Aiven for Apache Kafka® services. For
     existing services, check whether SASL is enabled. If **Enable SASL**
     appears, click **Enable SASL**, then continue.
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
**Download template** is an optional shortcut for when you want no local setup.
The ZIP file includes ready-to-run producer and consumer code, certificates, and
dependencies, so you can verify the connection using the included `README.md`
without a Java project or build tool. If you already have a Java project, copy
the snippet from the **Producer** or **Consumer** tab.
:::

1. Under **Prerequisites**, add the
   [Kafka clients dependency](https://mvnrepository.com/artifact/org.apache.kafka/kafka-clients)
   from your preferred artifact repository.

1. Under **Downloads**, download the certificate files for your authentication
   method:

   - For **SASL**, click **Download CA certificate**.
   - For **Client certificate**, click **Download CA certificate** and
     **Download service certificate and access key**.

   The generated snippet loads the PEM files directly. You don't need to create
   a truststore.

1. Click the **Producer** or **Consumer** tab to view the generated producer or
   consumer code.

   :::warning
   For SASL, code snippets include the service user password in plaintext.
   Store the code securely, and do not commit it to source control.
   :::

1. Copy the code.

After you add the code to your project, update the certificate file paths to
match where you saved the files, then run your producer or consumer to start
streaming events.
