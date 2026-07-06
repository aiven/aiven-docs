---
title: Connect to Aiven for Apache Kafka® with Java using Quick connect
sidebar_label: Connect with Java
keywords: [kafka, java, quick connect, producer, consumer, mtls, sasl]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Use **Quick connect** to set up a Java client for Aiven for Apache Kafka®.
The guided flow helps you select or create a topic, choose an authentication method,
grant permissions, and copy generated producer and consumer code.

## Prerequisites

- A running [Aiven for Apache Kafka® service](/docs/products/kafka/get-started/create-kafka-service).
- Java development environment with [Maven](https://maven.apache.org/install.html).

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

   - **SASL**: Recommended. Use SASL/SCRAM-SHA-256 for simple username and
     password authentication.

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

## Step 3: Set up a schema and copy the code snippets

1. Choose a schema format: **Avro**, **JSON Schema**, or **Protobuf**.
1. Upload a schema or modify the sample schema.
1. If using **Protobuf**, you can also add schema references:
   1. Choose an existing schema.
   1. In the **Add a schema reference** screen, enter a reference name and choose
      a version.
   1. In the schema editor, modify the schema if needed.
   1. Click **Add reference**.
1. Click **Create schema**.

:::tip
**Download template** is an optional shortcut for when you want no local setup.
The ZIP file includes ready-to-run producer and consumer code, certificates, and
dependencies, so you can verify the connection using the included `README.md`
without a Java project or build tool. If you already have a Java project, copy
the snippet from the **Producer** or **Consumer** tab.
:::

1. Under **Downloads**, download the certificate files for your authentication
   method:

   - For **SASL**, download the **CA certificate**.
   - For **Client certificate**, download the **CA certificate**, **service
     certificate**, and **service access key**.

   :::note
   For SASL, configure your client to trust Aiven's certificate authority, or
   CA. The sample producer code includes a `keytool` command to create a
   truststore:

   ```bash
   keytool -import -file ca.pem -alias AivenCA -keystore client.truststore.jks
   ```

   You only need to run the command if you are setting up the client manually.
   :::

1. Click the **Producer** or **Consumer** tab to view the generated producer or
   consumer code.
1. Copy the code.

   :::warning
   For SASL, code snippets include the service user password in plaintext.
   Store the code securely, and do not commit it to source control.
   :::

After you add the code to your project, update the certificate file paths to
match where you saved the files, then run your producer or consumer to start
streaming events.

<RelatedPages/>

- [Generate Java data classes from Avro schemas](/docs/products/kafka/howto/generate-avro-java-classes)
- [Generate Java data classes from Protobuf schemas](/docs/products/kafka/howto/generate-protobuf-java-classes)
- [Generate Java data classes from JSON schemas](/docs/products/kafka/howto/generate-json-java-classes)
