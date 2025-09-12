---
title: Connect to Aiven for Apache Kafka® with Java using Quick connect
sidebar_label: Quick connect
---

Use quick connect to set up a Java client for Aiven for Apache Kafka®.
The step-by-step process helps you create a topic, configure authentication, define a
schema, and download ready-to-use client code.

## Prerequisites

- An active [Aiven for Apache Kafka® service](/docs/products/kafka/get-started)
- Java development environment with [Maven](https://maven.apache.org/install.html) or [Gradle](https://docs.gradle.org/current/userguide/installation.html)

## Step 1: Open quick connect and select Java

1. In the [Aiven Console](https://console.aiven.io/), select your Aiven for Apache Kafka
   service.
1. To open Quick connect, do one of the following:

   - In the **Set up your stream** section, click **Quick connect**.
   - In the **Connection information** section, click **Quick connect**.
1. On the **Select programming language** screen, select **Java**, then click **Next**.

## Step 2: Create a topic

Topics organize and store the events you stream to Apache Kafka.

1. Select an existing topic or click **Create new topic**. If you create a topic, it is
   auto-selected for the next steps.
1. Click **Next**.

## Step 3: Select an authentication method

1. Choose one of the following:

   - **Client certificate (mTLS)**: Recommended for secure environments.
   -  **SASL/SCRAM**: Use for flexible access control with user credentials.
1. Click **Next**.

## Step 4: Set up schema and access

The next steps depend on the authentication method you selected.

- If you selected **Client certificate (mTLS):**

  1. Select a schema format: **Avro**, **JSON Schema**, or **Protobuf**.
  1. Upload a schema or modify the sample schema.
  1. If using **Protobuf**, you can also add schema references:
     1. Select an existing schema.
     1. In the **Add a schema reference** screen, enter a reference name and select a
        version.
     1. In the schema editor, modify the schema if needed.
     1. Click **Add reference**.
  1. Click **Create schema**.

- If you selected **SASL/SCRAM:**

  1. Select an existing service user, or click **Create new service user**.
  1. Click **Grant access**.

     :::note
     - If you use the `avnadmin` user, permissions are granted by default and cannot be
       changed.
     - For new service users, you can grant additional permissions later (for example,
       add consume access if only produce was given).
     - Once a permission is granted, it cannot be removed. To take away access, delete
       the user’s ACL permissions.
     :::

  1. Select a schema format: **Avro**, **JSON Schema**, or **Protobuf**.
  1. Upload a schema or modify the sample schema.
  1. If using **Protobuf**, you can also add schema references:
     1. Select an existing schema.
     1. In the **Add a schema reference** screen, enter a reference name and select a version.
     1. In the schema editor, modify the schema if needed.
     1. Click **Add reference**.
  1. Click **Create schema**.

## Step 5: Connect your client

1. Download the required certificates:

   - For **mTLS**, download the **CA certificate** and the **service certificate and
     access key**.
   - For **SASL/SCRAM**, download the **CA certificate**.
1. Review the generated Java **producer** and **consumer** code snippets.
1. Copy the code snippets or download the client template files.
1. Click **Done** to complete the setup.
