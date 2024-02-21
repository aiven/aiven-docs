---
title: Configure properties for Apache Kafka® toolbox
---

The [open source Apache Kafka® code](https://kafka.apache.org/downloads)
includes a series of tools under the `bin` directory that can be useful
to manage and interact with an Aiven for Apache Kafka® service. Before
using the tools, you need to configure a file pointing to a Java
keystore and truststore which contain the required certificates for
authentication.

:::note
There are no restrictions on the file name, but make sure to use the
correct name when performing CLI operations. In the examples below
we'll name the file `configuration.properties`.
:::

## Define the configuration file

1.  Create the Java keystore and truststore for your Aiven for Apache
    Kafka® service using the
    [dedicated Aiven CLI command](/docs/tools/cli/service/user#avn_service_user_kafka_java_creds).
2.  Create a `configuration.properties` file pointing to the keystore
    and truststore with the following entries:

-   `security.protocol`: security protocol, SSL for the default TLS
    security settings
-   `ssl.keystore.type`: keystore type, `PKCS12` for the keystore
    generated with the
    [dedicated Aiven CLI command](/docs/tools/cli/service/user#avn_service_user_kafka_java_creds)
-   `ssl.keystore.location`: keystore location on the file system
-   `ssl.keystore.password`: keystore password
-   `ssl.truststore.type`: truststore type
-   `ssl.truststore.location`: truststore location on the file system
-   `ssl.truststore.password`: truststore password
-   `ssl.key.password`: keystore password

:::tip
The `avn service user-kafka-java-creds`
[Aiven CLI command](/docs/tools/cli/service/user#avn_service_user_kafka_java_creds) accepts a `--password` parameter setting the same password
for the truststore, keystore and key
:::

An example of the `configuration.properties` content is the following:

```
security.protocol=SSL
ssl.protocol=TLS
ssl.keystore.type=PKCS12
ssl.keystore.location=client.keystore.p12
ssl.keystore.password=changeit
ssl.key.password=changeit
ssl.truststore.location=client.truststore.jks
ssl.truststore.password=changeit
ssl.truststore.type=JKS
```
