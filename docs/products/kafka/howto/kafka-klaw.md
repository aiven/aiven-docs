---
title: Connect Aiven for Apache Kafka® with Klaw
---

import RelatedPages from "@site/src/components/RelatedPages";

[Klaw](https://www.klaw-project.io/) is an open-source, web-based data governance toolkit for managing Apache Kafka® topics, ACLs, schemas, and connectors.
It provides a self-service interface where teams can request Kafka configuration changes
without administrator intervention.

## Prerequisites

- [Aiven for Apache Kafka® service](/docs/products/kafka/get-started/create-kafka-service)
- [Klaw cluster](https://www.klaw-project.io/docs/quickstart)
- [Java keystore and truststore containing the service SSL certificates](/docs/products/kafka/howto/keystore-truststore)

## Connect Aiven for Apache Kafka to Klaw

To connect your Aiven for Apache Kafka cluster to Klaw:

1. Log in to the **Klaw web interface**.
1. Click **Environments**, then click **Clusters**.
1. On the **Clusters** page, click **Add Cluster**.
1. Enter the following details:
    - **Cluster type**: Select **Kafka**.
    - **Cluster name**: Enter a name for the cluster.
    - **Protocol**: Select the protocol used by your Kafka service.

      :::note
      Depending on the protocol selected,
      [configure Klaw application.properties file](/docs/products/kafka/howto/kafka-klaw#klaw-application-properties-configs)
      to enable connection between Aiven for Apache Kafka and Klaw clusters.

      :::

    - **Kafka flavor**: Select **Aiven for Apache Kafka®**.
    - **Project name**: Select your Aiven project.
    - **Bootstrap server**: Enter the **Service URI** for your Kafka service
      (available on the **Overview page** in the **Connection information** section
      in the Aiven Console).
    - **Service name**: Enter the Kafka service name as defined in the [Aiven Console](https://console.aiven.io/).

1. Click **Save**.
1. Add the cluster to an environment:
   - Click **Environments**, then select **Environments** from the drop-down menu.
   - Click **Add Environment** and provide the following:
     - **Environment Name:** Select environment from the drop-down list.

       :::note
       To learn more, see [Clusters and
       environments](https://www.klaw-project.io/docs/Concepts/clusters-environments)
       in Klaw documentation.
       :::

     - **Select Cluster:** Choose the cluster you added. The bootstrap server and
       protocol fields are populated automatically.
     - **Default Partitions:** Enter the number of partitions required (default is 2).
     - **Maximum Partitions:** Enter the maximum number of partitions (default is 2).
     - **Default Replication factor:** Enter the required replication factor (default is
       1).
     - **Max Replication factor:** Enter the maximum replication factor (default is 1).
     - **Topic prefix (optional)**: Enter a topic prefix if needed.
     - **Tenant:** The value is set to default Tenant.

       :::note
       Klaw is multi-tenant by default. Each tenant manages topics with
       their own teams in isolation. Every tenant has its own set of
       Apache Kafka® environments, and users of one tenant cannot
       view/access topics, or ACLS from other tenants. It provides
       isolation avoiding any security breach. For this topic, I have
       used the default tenant configuration. For more information, see
       [Klaw documentation](https://www.klaw-project.io/docs/getstarted#configure-the-cluster-to-sync).
       :::

1. Click **Save**.

If the connection is successful, the **Environments** page shows
a **blue thumbs-up icon**. If it fails, a **red thumbs-down icon** appears. Check the
authentication protocol settings.
See [Configure Klaw application.properties file](#klaw-application-properties-configs)
for troubleshooting.

## Configure the Klaw `application.properties` file {#klaw-application-properties-configs}

[Klaw](https://www.klaw-project.io/) is a Spring Boot application that uses
the `application.properties` file to configure application-level settings such as
secret keys, authentication protocols, and Kafka cluster connection details.

To connect Aiven for Apache Kafka® to Klaw, you must configure additional properties
in the `application.properties` file, including the Kafka protocol and bootstrap server.

By default, the file is located in the following directories:

- `klaw/cluster-api/src/main/resources`
- `klaw/core/src/main/resources`

If Klaw is running in a Kubernetes environment, the file path inside the pod may
vary depending on your deployment method. You can override the file location
using the `spring.config.location` property:

```text
-Dspring.config.location=/mnt/config/application.properties
```

Review your deployment manifest or use `kubectl exec` to inspect the pod and
determine the `application.properties` file location.

### Secret key configuration

Set the value of `klaw.clusterapi.access.base64.secret` with a secret
key in the form of a Base64 encoded string in the
`application.properties` file located in the following paths:

- `klaw/cluter-api/src/main/resources`
- `klaw/core/src/main/resources`

### Configure authentication protocol

You can connect Aiven for Apache Kafka® using either of the following
authentication protocols:

- `PLAINTEXT`
- `SSL`, `SASL PLAIN`, `SASL SSL`
- `SASL SSL (GSSAPI / Kerberos)`, `SASL_SSL (SCRAM SHA 256/512)`

:::note
If you are using `PLAINTEXT`, you do not need to perform any additional
configuration.
:::

#### Configure SASL authentication

To use SSL as the authentication protocol to connect the Apache Kafka®
cluster to Klaw:

##### Retrieve SSL certificate files

Aiven for Apache Kafka uses TLS encryption by default. Download the required
certificate files from the service overview page in the Aiven Console or from
the [Aiven CLI page](/docs/tools/cli/service/user#avn_service_user_kafka_java_creds).

After downloading the certificates, ensure that you have configured
the [Java SSL keystore and truststore](/docs/products/kafka/howto/keystore-truststore).
Move the following files into a directory accessible to Klaw:

- `client.keystore.p12`
- `client.truststore.jks`

You will reference these files in the `application.properties` configuration.

##### Configure SSL properties

After retrieving the SSL certificate files and configuring the SSL
keystore and truststore, update the `application.properties` file to enable SSL
for your Kafka cluster.

1. In the **Klaw web interface**, go to **Clusters** and copy the **Cluster ID**.
1. Open the `application.properties` file located in the
   `klaw/cluster-api/src/main/resources` directory.
1. Configure the SSL properties to connect to Apache Kafka clusters by
   editing the following lines:

   ```text
    klawssl.kafkassl.keystore.location=client.keystore.p12
    klawssl.kafkassl.keystore.pwd=klaw1234
    klawssl.kafkassl.key.pwd=klaw1234
    klawssl.kafkassl.truststore.location=client.truststore.jks
    klawssl.kafkassl.truststore.pwd=klaw1234
    klawssl.kafkassl.keystore.type=pkcs12
    klawssl.kafkassl.truststore.type=JKS
   ```

   - Replace every instance of `klawssl` with the **Cluster ID** you used when adding
     the Kafka cluster in the Klaw web interface.
   - Replace `client.keystore.p12` with the full path to your keystore file.
   - Replace `client.truststore.jks` with the full path to your truststore file.
   - Replace the sample password values (`klaw1234`) with the actual passwords
     configured for your keystore and truststore.
   - Save the `application.properties` file.

 The following is an example of an `application.properties` file
 configured with Klaw Cluster ID, keystore, and truststore paths and
 passwords.

 ```text
 demo_cluster.kafkassl.keystore.location=/Users/demo.user/Documents/Klaw/demo-certs/client.keystore.p12
 demo_cluster.kafkassl.keystore.pwd=Aiventest123!
 demo_cluster.kafkassl.key.pwd=Aiventest123!
 demo_cluster.kafkassl.truststore.location=/Users/demo.user/Documents/Klaw/demo-certs/client.truststore.jks
 demo_cluster.kafkassl.truststore.pwd=Aiventest123!
 demo_cluster.kafkassl.keystore.type=pkcs12
 demo_cluster.kafkassl.truststore.type=JKS
 ```

 :::note
 To add multiple SSL configurations, copy the configuration block and update the
 Cluster ID, file paths, and passwords for each cluster.
 :::

#### Connect using SASL protocols

To use SASL-based authentication methods such as `SASL_PLAIN`, `SASL_SSL/PLAIN`,
`SASL_SSL/GSSAPI` or `SASL_SSL/OAUTHBEARER`, update the `application.properties` file:

- Locate the lines starting with `acc1.kafkasasl.jaasconfig.`
- Uncomment the relevant lines
- Enter the required values for your SASL configuration
- Save the updated `application.properties` file

<RelatedPages/>

- [Klaw documentation](https://www.klaw-project.io/docs).
- [Klaw GitHub project repository](https://github.com/aiven/klaw)
