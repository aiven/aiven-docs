---
title: Use Kpow with Aiven for Apache Kafka®
---

[Kpow by Factor House](https://factorhouse.io/kpow) is a popular Web UI for Apache Kafka® that allows you to monitor a cluster, view topics and consumer groups, produce and consume data with integration into the Schema Registry.

## Prerequisites

To connect Kpow to Aiven for Apache Kafka®, create a
[Java keystore and truststore containing the service SSL certificates][keystore].

Kpow uses a [set of Apache Kafka
topics](https://docs.kpow.io/installation/minimum-acl-permissions) to
store the working information. You can either
[create the topics manually](/docs/products/kafka/howto/create-topic) or enable the
[automatic creation of topics](/docs/products/kafka/howto/create-topics-automatically) for the Aiven for Apache Kafka service.

Also collect the following information for Apache Kafka and Kpow:

:::tip
If you create a Kpow trial, you should receive all the `KPOW` related
parameters in the welcome email, scrolling down to the relevant
**Certificates** section.
:::

-   `APACHE_KAFKA_HOST`: The Aiven for Apache Kafka hostname
-   `APACHE_KAFKA_PORT`: The Aiven for Apache Kafka port
-   `KEYSTORE_FILE_NAME`: The name of the Java keystore containing the
    Aiven for Apache Kafka SSL certificates
-   `SSL_KEYSTORE_PASSWORD`: The password used to secure the Java
    keystore
-   `SSL_KEY_PASSWORD`: The password used to secure the Java key. If you
    created the keystore according to [Java keystore and truststore][keystore], this will be
    the same as the Java keystore password
-   `SSL_TRUSTSTORE_LOCATION`: The password used to secure the Java
    truststore
-   `SSL_TRUSTSTORE_PASSWORD`: The password used to secure the Java
    truststore
-   `SSL_STORE_FOLDER`: The absolute path of the folder containing both
    the truststore and keystore
-   `KPOW_LICENSE_ID`: Kpow license ID
-   `KPOW_LICENSE_CODE`: Kpow license code
-   `KPOW_LICENSEE`: Kpow licensee
-   `KPOW_LICENSE_EXPIRY_DATE`: Kpow license expiry date
-   `KPOW_LICENSE_SIGNATURE`: Kpow license signature

## Retrieve Aiven for Apache Kafka® SSL certificate files

Aiven for Apache Kafka® by default enables TLS security. Downloaded the
certificates from the service overview page in the Aiven console, or via
the
[dedicated Aiven CLI command](/docs/tools/cli/service/user#avn_service_user_creds_download).

## Set up a Kpow configuration file

Kpow supports both
[SASL and SSL authentication methods](../concepts/auth-types). The following example shows the SSL version which requires
a keystore and truststore that can be created following the
[dedicated documentation](keystore-truststore).

Once the keystore and truststore are created, define a Kpow
configuration file named `kpow.env` with the following content,
replacing the `APACHE_KAFKA_HOST`, `APACHE_KAFKA_PORT`,
`KPOW_LICENSE_ID`, `KPOW_LICENSE_CODE`, `KPOW_LICENSEE`,
`KPOW_LICENSE_EXPIRY_DATE`, `KPOW_LICENSE_SIGNATURE`,
`SSL_KEYSTORE_FILE_NAME`, `SSL_KEYSTORE_PASSWORD`, `SSL_KEY_PASSWORD`,
`SSL_TRUSTSTORE_FILE_NAME` and `SSL_TRUSTSTORE_PASSWORD` with the the
respective values taken from the prerequisites section:

```
BOOTSTRAP=APACHE_KAFKA_HOST:APACHE_KAFKA_PORT
LICENSE_ID=KPOW_LICENSE_ID
LICENSE_CODE=KPOW_LICENSE_CODE
LICENSEE=KPOW_LICENSEE
LICENSE_EXPIRY=KPOW_LICENSE_EXPIRY_DATE
LICENSE_SIGNATURE=KPOW_LICENSE_SIGNATURE
SECURITY_PROTOCOL=SSL
SSL_KEYSTORE_LOCATION=/ssl/SSL_KEYSTORE_FILE_NAME
SSL_KEYSTORE_PASSWORD=SSL_KEYSTORE_PASSWORD
SSL_KEY_PASSWORD=SSL_KEY_PASSWORD
SSL_TRUSTSTORE_LOCATION=/ssl/SSL_TRUSTSTORE_FILE_NAME
SSL_TRUSTSTORE_PASSWORD=SSL_TRUSTSTORE_PASSWORD
```

:::warning
don't remove the `/ssl/` prefix before the keystore and truststore
setting, the `SSL_STORE_FOLDER` local folder containing the keystore and
truststore will be mapped to the `/ssl/` folder during the docker
instance creation.
:::

The full list of configuration parameters is available at the [dedicated
Kpow page](https://docs.kpow.io/config/environment-variables).

## Run Kpow on Docker

You can run Kpow in a Docker/Podman container with the following
command, by replacing the `SSL_STORE_FOLDER` with the name of the folder
containing the Java keystore and truststore:

```
docker run -p 3000:3000 -m2G \
    -v SSL_STORE_FOLDER:/ssl \
    --env-file ./kpow.env factorhouse/kpow-ee:latest
```

## Use Kpow

Once Kpow starts, access the interface at `localhost:3000`.

![Kpow in action](/images/content/products/kafka/kpow.jpg)

You can perform the following tasks with Kpow over an Aiven for Apache
Kafka® service:

-   View and search topics
-   Create and delete topics
-   View brokers
-   Produce and consume messages

[keystore]: /docs/products/kafka/howto/keystore-truststore
