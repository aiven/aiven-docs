---
title: Connect to Aiven for Apache Kafka® with Klaw
sidebar_label: Connect with Klaw
keywords: [kafka, klaw, quick connect, governance, producer, consumer, mtls, sasl]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Use **Quick connect** to set up [Klaw](https://www.klaw-project.io/) for Aiven
for Apache Kafka®. The guided flow helps you choose or create a topic, choose an
authentication method, grant permissions, and copy the setup steps for Klaw.

## Prerequisites

- A running [Aiven for Apache Kafka® service](/docs/products/kafka/get-started/create-kafka-service).
- Access to an existing Klaw installation, or a local environment where you can
  install Klaw.
- Java `keytool` installed in your terminal.
- For client certificate authentication, OpenSSL installed in your terminal.

## Open Quick connect

1. In the [Aiven Console](https://console.aiven.io/), open your Aiven for Apache
   Kafka service.
1. On the service <ConsoleLabel name="overview"/> page, in the **Set up your
   stream** section, click **Quick connect**.
1. At the top of the page, click **Klaw**.

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
   - **SASL**: Recommended. Use SASL/SCRAM-SHA-256 for username and
     password authentication.

     SASL is enabled by default for new Aiven for Apache Kafka services. For
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
     shown (for example, `read, write`). To change them, click **Manage access
     in ACLs**.
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

1. Under **Downloads**, download the certificate files for your authentication
   method:

   - For **SASL**, click **Download CA certificate**.
   - For **Client certificate**, click **Download CA certificate**,
     **Download service certificate**, and **Download service access key**.

1. Create the certificate stores required by Klaw:

   - For **SASL**, use the generated `keytool` command to create
     `client.truststore.jks` from `ca.pem`.
   - For **Client certificate**, use the generated `openssl` command to create
     `client.keystore.p12`, then use the generated `keytool` command to create
     `client.truststore.jks`.

   When prompted, enter a password for the store. For the truststore, enter
   `yes` to trust the CA certificate.

1. Under **Klaw setup**, choose the tab that matches your setup:

   - **Existing Klaw installation**: Configure the existing installation by
     connecting Klaw Core and Klaw Cluster APIs, connecting Klaw to Aiven for
     Apache Kafka using SSL, and synchronizing topics from the cluster.
   - **New Klaw installation**: Install Klaw from source with Docker, then
     connect Klaw Core and Klaw Cluster APIs, connect Klaw to Aiven for Apache
     Kafka using SSL, and synchronize topics from the cluster.

<RelatedPages/>

- [Connect Aiven for Apache Kafka® with Klaw](/docs/products/kafka/howto/kafka-klaw)
- [Install Klaw with Docker](https://www.klaw-project.io/docs/getting-started/quickstart/)
- [Connect Klaw Core and Klaw Cluster APIs](https://www.klaw-project.io/docs/cluster-connectivity-setup/klaw-core-with-clusterapi/)
- [Connect Klaw with Aiven for Apache Kafka® using SSL](https://www.klaw-project.io/docs/cluster-connectivity-setup/aiven-kafka-cluster-ssl-protocol/)
- [Synchronize topics from the cluster](https://www.klaw-project.io/docs/cluster-management/kafka-cluster-sync/sync-topics-from-cluster/)
