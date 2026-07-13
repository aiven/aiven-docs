---
title: Connect to Aiven for Apache Kafka® with command-line tools
sidebar_label: Connect with CLI
keywords: [kafka, cli, command line, quick connect, producer, consumer, mtls, sasl]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";

Use **Quick connect** to set up Apache Kafka® command-line tools for Aiven for
Apache Kafka®. The guided flow helps you select or create a topic, choose an
authentication method, grant permissions, and copy generated producer and
consumer commands.

## Prerequisites

- A running [Aiven for Apache Kafka® service](/docs/products/kafka/get-started/create-kafka-service).
- Python 3.7 or later and the `pip` package manager to install the
  [Aiven CLI](https://github.com/aiven/aiven-client).
- The Apache Kafka command-line tools. The `kafka-console-producer.sh` and
  `kafka-console-consumer.sh` scripts are included in the
  [Apache Kafka® binary downloads](https://kafka.apache.org/downloads) in the
  `bin` directory.

## Open Quick connect

1. In the [Aiven Console](https://console.aiven.io/), open your Aiven for Apache
   Kafka service.
1. On the service <ConsoleLabel name="overview"/> page, in the **Set up your
   stream** section, click **Quick connect**.
1. At the top of the page, select **CLI** in the language selector.

## Step 1: Set up a topic

Topics organize and store the events that you stream to Apache Kafka.

1. In **Topic name**, do one of the following:
   - Select an existing topic.
   - Click **Create new topic**, enter a name, and create the topic. The new
     topic is selected automatically for the next steps.

   :::note
   If your service has **Diskless topics** enabled, you can create a **Classic**
   or **Diskless** topic, or select an existing topic of either type. You can't
   change the topic type after creation. For more information, see
   [Create Apache Kafka® topics](/docs/products/kafka/howto/create-topic).
   :::

## Step 2: Set up an authentication method

1. Select an authentication method:
   - **SASL**: Recommended. Use SASL/SCRAM-SHA-256 for username and
     password authentication.

     SASL is enabled by default for new Aiven for Apache Kafka® services. For
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
     Permissions the user already has are selected and cannot be removed in
     Quick connect. To remove them, click **Manage access in ACLs**.

   :::note
   The `avnadmin` user has permissions by default, and you cannot change them
   from Quick connect.

   For other service users, you can add permissions from Quick connect, but you
   cannot remove them from Quick connect. To remove permissions,
   [remove ACL entries for the service user](/docs/products/kafka/howto/manage-acls#delete-acl-entries).
   :::

## Step 3: Copy the command snippets

1. Select the **Prerequisites** tab, install the Aiven CLI, and sign in to your
   Aiven account using the generated commands.
1. Download and extract the Apache Kafka command-line tools, then open the `bin`
   directory.

   To run Kafka commands from any directory, add the absolute path of the `bin`
   directory to your `PATH`.
1. Run the generated Aiven CLI command from your Kafka `bin` directory to
   download the service credentials.

   The command downloads the certificates to your Kafka `bin` directory. For
   SASL, the keystore file isn't required. For **Client certificate**, both the
   keystore and truststore files are needed. When you reference the truststore
   in `configuration.properties`, use its absolute path.
1. Create a `configuration.properties` file in your home directory and copy the
   generated configuration into it.

   If you move the certificate files or run Kafka commands from another
   directory, use absolute paths in `configuration.properties`.

   For a description of the configuration properties, see
   [Apache Kafka toolbox properties](/docs/products/kafka/howto/kafka-tools-config-file).

   :::warning
   For SASL, the configuration includes the service user password in plaintext.
   Store the file securely and do not commit it to source control.
   :::

1. Select the **Producer** tab, copy the generated
   `kafka-console-producer.sh` command, and run it from your Kafka `bin`
   directory.

   Type messages in the terminal and press Enter to send them to the topic.

1. Select the **Consumer** tab, copy the generated
   `kafka-console-consumer.sh` command, and run it from your Kafka `bin`
   directory to read messages from the topic.

After you start the producer and consumer, use the producer terminal to send
messages and the consumer terminal to read them.
