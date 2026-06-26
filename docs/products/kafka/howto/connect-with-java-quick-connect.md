---
title: Connect to Aiven for Apache Kafka® with Java
sidebar_label: Connect with Java
keywords: [kafka, java, quick connect, producer, consumer, mtls, sasl]
---

Use **Quick connect** to set up a Java client for Aiven for Apache Kafka®.
The guided flow helps you select or create a topic, choose an authentication method,
grant permissions, and copy the generated producer and consumer code.

## Prerequisites

- A running [Aiven for Apache Kafka® service](/docs/products/kafka/get-started/create-kafka-service).
- A Java development environment.
- A build tool, such as [Maven](https://maven.apache.org/install.html) or Gradle,
  to add the `kafka-clients` dependency.

## Open Quick connect

1. In the [Aiven Console](https://console.aiven.io/), open your Aiven for Apache
   Kafka service.
1. On the service **Overview** page, in the **Set up your stream** section,
   click **Quick connect**.
1. At the top of the page, select **Java** from the language selector.

## Step 1: Set up a topic

Topics organize and store the events that you stream to Apache Kafka.

1. In **Topic name**, do one of the following:
   - Select an existing topic.
   - Click **Create new topic**, enter a name, and create the topic. The new
     topic is selected automatically for the next steps.

   :::note
   If your service has **Diskless topics** enabled, you can create a **Classic**
   or **Diskless** topic, or select an existing topic of either type. For more
   information, see [Diskless topics overview](/docs/products/kafka/diskless/concepts/diskless-topic-overview).
   :::

## Step 2: Set up an authentication method

1. Select an authentication method:
   - **SASL**: Recommended. Use SASL/SCRAM-SHA-256 for simple
     username and password authentication.

     If SASL is not enabled on your service, an option to enable SASL appears
     under the **SASL** authentication method. Click **Enable SASL**, then
     continue.
   - **Client certificate**: Use certificate-based authentication with mTLS
     instead of a password.

1. Select a service user:
   - Select an existing service user from the list.
   - To create one, click **Create new service user**, enter a username, and
     click **Add service user**.
1. Check the permission status shown for the selected user:
   - If the user has all the required permissions, the panel shows the granted
     permissions (for example, `read, write`). To change them, click **Manage
     access in ACLs**.
   - If the user has some or no permissions, click **Grant permissions**. In the
     drawer, select **Produce**, **Consume**, or both, and click **Save**.
     Permissions the user already has are selected and cannot be removed in
     Quick connect.
     To remove them, click **Manage access in ACLs**.

   :::note
   The `avnadmin` user has permissions by default, and you cannot change them
   from Quick connect.

   For other service users, you can add permissions from Quick connect. To
   remove permissions,
   [delete the user's ACL entries](/docs/products/kafka/howto/manage-acls#delete-acl-entries).
   :::

## Step 3: Copy the code snippets

:::tip
**Download template** is an optional shortcut for when you want no local setup.
The ZIP file includes ready-to-run producer and consumer code, certificates, and
dependencies, so you can verify the connection using the included `README.md`
without a Java project or build tool. If you already have a Java project, copy
the snippet from the tabs below.
:::

1. Under **Prerequisites**, click **Add a dependency for Kafka-clients** to open
   the [`kafka-clients` package on Maven Central](https://mvnrepository.com/artifact/org.apache.kafka/kafka-clients),
   then add the dependency to your Java project.
1. Under **Downloads**, download the certificate files for your authentication
   method:

   - For **SASL**, download `ca.pem`.
   - For **Client certificate**, download `ca.pem` and `svc.pem`. The `svc.pem`
     file contains the service certificate and access key.

   The generated snippet loads `ca.pem` directly, so you do not need to create a
   truststore.

1. Select the **Producer** or **Consumer** tab to view the generated
   `Producer.java` or `Consumer.java` code.
1. Copy the code.

After you add the code to your project, update the certificate file paths to
match where you saved the files, then run your producer or consumer to start
streaming events.
