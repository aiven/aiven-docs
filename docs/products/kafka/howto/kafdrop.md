---
title: Use Kafdrop Web UI with Aiven for Apache Kafka®
---
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

[Kafdrop](https://github.com/obsidiandynamics/kafdrop) is a web UI for Apache Kafka® to monitor clusters, view topics and consumer groups, and integrate with the Schema Registry.
It supports Avro, JSON, and Protobuf.

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io/)
- Aiven CLI
- Docker installed. For Mac M1 chip users, ensure Docker is version 4.26.1 or lower to
  avoid compatibility issues

## Retrieve SSL certificate files

Aiven for Apache Kafka uses TLS security by default. To retrieve the necessary
SSL certificates, do one of the following:

- [Download the certificates](/docs/platform/concepts/tls-ssl-certificates#download-ca-certificates)
  manually from the service <ConsoleLabel name="overview"/> page in the
  [Aiven Console](https://console.aiven.io/).
- Use the [Aiven CLI command](/docs/tools/cli/service/user#avn_service_user_creds_download).

## Set up a Kafdrop configuration file

Kafdrop supports both
[SASL and SSL authentication methods](/docs/products/kafka/concepts/auth-types). This
example uses SSL, which requires a keystore and truststore.

1. Follow
   [keystore and truststore](/docs/products/kafka/howto/keystore-truststore)
   to create the necessary files.
1. Create a Kafdrop configuration file named `kafdrop.properties` with the following
   content. Replace `KEYSTORE_PWD` and `TRUSTSTORE_PWD` with your keystore and
   truststore passwords:

    ```plaintext
    security.protocol=SSL
    ssl.keystore.password=KEYSTORE_PWD
    ssl.keystore.type=PKCS12
    ssl.truststore.password=TRUSTSTORE_PWD
    ```

## Run Kafdrop on Docker

To run Kafdrop in a Docker or Podman container, use the following command.
Replace `KAFKA_SERVICE_URI` with your Aiven for Apache Kafka® service URI from
the <ConsoleLabel name="overview"/> page in the
[Aiven Console](https://console.aiven.io/). Replace `client.truststore.jks` and
`client.keystore.p12` with your keystore and truststore file names:

```sh
docker run -d --rm -p 9000:9000 \
  -e KAFKA_BROKERCONNECT=KAFKA_SERVICE_URI \
  -e KAFKA_PROPERTIES="$(cat kafka/kafdrop.properties | base64)" \
  -e KAFKA_TRUSTSTORE="$(cat kafka/client.truststore.jks | base64)" \
  -e KAFKA_KEYSTORE="$(cat kafka/client.keystore.p12 | base64)" \
  obsidiandynamics/kafdrop
```

For users with a Mac M1 chip, add the `--platform linux/amd64` flag to the command:

```sh
docker run --platform linux/amd64 -d --rm -p 9000:9000 \
  -e KAFKA_BROKERCONNECT=KAFKA_SERVICE_URI \
  -e KAFKA_PROPERTIES="$(cat kafka/kafdrop.properties | base64)" \
  -e KAFKA_TRUSTSTORE="$(cat kafka/client.truststore.jks | base64)" \
  -e KAFKA_KEYSTORE="$(cat kafka/client.keystore.p12 | base64)" \
  obsidiandynamics/kafdrop
```

:::note
Docker versions above 4.26.1 have known issues on Mac M1 chips. We recommend using
Docker version 4.26.1 or lower.
:::

If you need Kafdrop to deserialize Avro messages using the
[Karapace](https://github.com/aiven/karapace) schema registry, add the following
two lines to the `docker run` command:

```sh
-e SCHEMAREGISTRY_AUTH="avnadmin:SCHEMA_REGISTRY_PWD"   \
-e SCHEMAREGISTRY_CONNECT="https://SCHEMA_REGISTRY_URI" \
```

Replace `SCHEMA_REGISTRY_PWD` with the schema registry password and
`SCHEMA_REGISTRY_URI` with the schema registry URI available on the
<ConsoleLabel name="overview"/> page in the [Aiven Console](https://console.aiven.io/).

## Access Kafdrop

After Kafdrop starts, you can access it at `localhost:9000`:

![Kafdrop in action](/images/content/products/kafka/kafdrop.gif)

With Kafdrop, you can perform the following tasks over an Aiven for Apache Kafka®
service:

- View and search topics
- Create and delete topics
- View brokers
- View messages
