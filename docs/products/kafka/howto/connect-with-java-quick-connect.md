---
title: Connect with Java using the service wizard
sidebar_label: Connect using the wizard
---

Use Quick connect to set up a Java client for Aiven for Apache Kafka®.
The step-by-step process helps you create a topic, configure authentication, define a
schema, and download ready-to-use client code.

## Prerequisites

- An active [Aiven for Apache Kafka® service](/docs/products/kafka/get-started)
- Java development environment with [Maven](https://maven.apache.org/install.html) or [Gradle](https://docs.gradle.org/current/userguide/installation.html)

Step 1: Open Quick connect and select Java

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

## Step 3: Choose an authentication method

1. Choose one of the following:

   - **Client certificate (mTLS)**: Recommended for secure environments.
   -  **SASL/SCRAM**: Use for flexible access control with user credentials.
1. Click **Next**.

## Step 4: Set up schema and access

The next steps depend on the authentication method you selected.

- **Client certificate (mTLS):**

  1. Select a schema format: **Avro**, **JSON Schema**, or **Protobuf**.
  1. Upload a schema, use the sample, or modify the sample to activate **Create schema**.
  1. If using **Protobuf**:
     1. Select a reference schema.
     1. Choose a version and assign a reference name.
     1. Update if needed, then click **Add reference**.
  1. Click **Create schema**.

- **SASL/SCRAM:**

  1. Select an existing service user, or click **Create new service user**.
  1. Click **Grant access**.

     :::note
     You cannot modify or remove permissions after they are granted. To revoke access,
     delete the user’s ACL permissions.
     :::
  1. Select a schema format: **Avro**, **JSON Schema**, or **Protobuf**.
  1. Upload a schema, use the sample schema, or modify the sample to activate **Create schema**.
  1. If using **Protobuf**, you can also reference an existing schema, choose a version, and provide a reference name.
  1. Click **Create schema**.

## Step 5: Connect your client

1. Download the required certificates:

   - For **mTLS**, download the **CA certificate** and the **service certificate and
     access key**.
   - For **SASL/SCRAM**, download the **CA certificate**.
1. Review the generated Java **producer** and **consumer** code snippets.
1. Copy the code snippet or download the client template files.
1. Click **Done** to complete the setup.
