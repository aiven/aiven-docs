---
title: Connect to Aiven for Apache Kafka® with Kafka REST
sidebar_label: Connect with Kafka REST
keywords: [kafka, kafka rest, rest api, quick connect, producer, consumer, karapace]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";

Use **Quick connect** to produce and consume messages with the Apache Kafka®
REST API for Aiven for Apache Kafka®. The guided flow helps you select or create
a topic, select a service user, and copy generated `curl` commands.

## Prerequisites

- A running [Aiven for Apache Kafka® service](/docs/products/kafka/get-started/create-kafka-service).
- [Kafka REST enabled](/docs/products/kafka/karapace/howto/enable-karapace) on
  the service.
- `curl` installed in your terminal.

## Open Quick connect

1. In the [Aiven Console](https://console.aiven.io/), open your Aiven for Apache
   Kafka service.
1. On the service <ConsoleLabel name="overview"/> page, in the **Set up your
   stream** section, click **Quick connect**.
1. At the top of the page, click **Kafka REST** in the language selector.

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

## Step 2: Set up authentication

Kafka REST authenticates using the service user's username and password.

1. Select a service user:
   - Select an existing service user from the list.
   - To create one, click **Create new service user**, enter a username, and
     click **Add service user**.
1. Check the permission status shown for the selected user:
   - If the user has all the required permissions, the granted permissions are
     shown. To change them, click **Manage access in ACLs**.
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

1. Copy the generated command for producing a message and run it in your
   terminal.

   A successful request returns the message partition and offset.
1. Copy the generated command for creating a consumer and run it in your
   terminal.

   The response includes `base_uri`. Copy this value to use in the subscribe and
   consume commands.

   :::warning
   Generated Kafka REST snippets include the service user password in plaintext.
   Store the commands securely, and do not commit them to source control.
   :::

1. Paste the `base_uri` value without `https://` into the field in Quick
   connect.
1. Copy and run the generated command for subscribing the consumer to the topic.

   A successful request returns HTTP status `204`.
1. Copy and run the generated command for consuming messages.

   Returns messages waiting to be consumed.

After you run the generated commands, use the **Preview the messages in the
console** link to inspect the data sent to the Kafka topic.
