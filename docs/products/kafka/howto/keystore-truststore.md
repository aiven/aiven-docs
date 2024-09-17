---
title: Configure Java SSL keystore and truststore to access Apache Kafka®
---

Aiven for Apache Kafka® utilises TLS (SSL) to secure the traffic between its services and client applications.
This means that clients must be
configured with the right tools to be able to communicate with the Aiven
services.

Keystores and truststores are password-protected files accessible by the
client that interacts with the service. To create these files:

## Access service certificates

1.  Log in to [Aiven Console](https://console.aiven.io/) and select your
    Apache Kafka service.

1.  Download the **Access Key**, **Access Certificate**, and **CA
    Certificate**. The files _service.key_, _service.cert_, and
    _ca.pem_ are necessary.

## Create the keystore

-   Use the `openssl` utility to create a keystore using the downloaded
    `service.key` and `service.cert`:

    ```bash
    openssl pkcs12 -export      \
      -inkey service.key        \
      -in service.cert          \
      -out client.keystore.p12  \
      -name service_key
    ```

    :::note
    Ensure the keystore format is `PKCS12`, the default since Java 9.
    :::

-   Set a password for the keystore and key when prompted.

## Create the truststore

-   In the directory containing the certificates, use the `keytool`
    utility to create a truststore with the `ca.pem` file:

    ```bash
    keytool -import            \
      -file ca.pem             \
      -alias CA                \
      -keystore client.truststore.jks
    ```

-   When prompted, enter a password for the truststore and confirm trust
    in the CA certificate.

## Resulting configuration files

The process generates two files: _client.keystore.p12_ (keystore) and
_client.truststore.jks_ (truststore). These files are ready for client
configuration.

:::tip
Use the [Aiven CLI](/docs/tools/cli)
command `avn service user-kafka-java-creds` to automate keystore and
truststore creation. For more information, see
[`avn service user-kafka-java-creds`](/docs/tools/cli/service/user#avn_service_user_kafka_java_creds).
:::
