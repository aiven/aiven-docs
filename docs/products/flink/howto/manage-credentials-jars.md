---
title: Credential management for JAR applications
---

Learn how to use the `AVN_CREDENTIALS_DIR` environment variable to securely manage credentials for custom JARs in Aiven for Apache Flink®.

## About credential management

[Custom JARs](/docs/products/flink/concepts/custom-jars) in Aiven for Apache Flink®
enable you to connect your Apache Flink jobs with Aiven's supported connectors and any
external systems you manage, which is essential for real-time stream processing.
Effectively managing credentials is critical to securing and ensuring compliant
access to these services.

Aiven for Apache Flink® securely manages credentials for your JAR applications using
the `AVN_CREDENTIALS_DIR` environment variable. This centralizes credentials for internal
and external integrations, ensuring policy-compliant and secure access
to sensitive information.

## Prerequisites

- An active Aiven for Apache Flink service
- [Integration with services: Aiven for Apache Kafka or PostgreSQL](/docs/products/flink/howto/create-integration)
  or external Apache kafka service
- Permission to create a [JAR application for Aiven for Apache Flink](/docs/products/flink/howto/create-jar-application)

## Credential provisioning

Aiven streamlines credential management for Aiven-managed and external services using
the `AVN_CREDENTIALS_DIR` environment variable. This variable points to a
directory with integrated service credentials, providing access for users while
abstracting the intricacies of internal storage.

:::note
You can have multiple credentials for multiple Apache Kafka services in
the same `AVN_CREDENTIALS_DIR` directory.
:::

Aiven automatically generates credentials for integrated services and stores them in JSON
files named by each service's `integration_id`. For example, credentials for an Apache
Kafka service with an `integration_id` such as `my_kafka_service` is stored in a
file named `my_kafka_service.json`. This file is in a directory your
Aiven for Apache Flink® application can access. The path to this folder
is `/AVN_CREDENTIALS_DIR/my_kafka_service.json`.

## Access credentials in JAR applications

1. Locate the credentials file

   1. Identify the `integration_id` of your service from the [integration list](/docs/tools/cli/service/integration#avn_service_integration_list).
   1. Retrieve the corresponding credentials file named `{integration_id}.json`
      located at `/AVN_CREDENTIALS_DIR/`. For example, if your service's `integration_id`
      is `my_kafka_service`, locate the credentials file `my_kafka_service.json` at `/AVN_CREDENTIALS_DIR/my_kafka_service.json`.

1. Read and parse the JSON file

   1. Implement the code within your Aiven for Apache Flink JAR application to read the
      JSON file.
   1. Extract essential details like connection strings, usernames, passwords, and
      security protocols from the JSON file.

## Example: Parsing credentials in JAR applications

Aiven for Apache Flink® enables connections to various data sources and sinks, allowing
you to create JAR applications. Managing credentials within these applications
is crucial for securing data access and ensuring compliance with data protection
standards. This section provides examples of how to parse credentials
to ensure data security.

### Example 1: Integration with Aiven for Apache Kafka

To connect to Aiven for Apache Kafka service, the credentials JSON structure is as follows:

```json
{
  "bootstrap_servers": "t-kafka-2137baed0dd94da2.aiven.local:15357",
  "integration_type": "kafka",
  "schema_registry_url": "https://t-kafka-2137baed0dd94da2-systest-project-test.avns.net:15361",
  "security_protocol": "PLAINTEXT",
  "service_name": "t-kafka-2137baed0dd94da2"
}
```

:::note
The JSON structure provided in the code snippet is specific to Aiven services and
may differ from standard Apache Kafka configuration formats.
:::

**Java application example:**

```java
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import java.io.FileReader;
import org.apache.flink.api.java.utils.ParameterTool;

public class KafkaCredentialsReader {

    public static void main(String[] args) {
        // Parse the command-line arguments to get the Kafka source name
        ParameterTool parameters = ParameterTool.fromArgs(args);
        String myKafkaSource = parameters.getRequired("myKafkaSource");

        // Construct the path to the credentials file dynamically
        String credentialsFilePath = System.getenv("AVN_CREDENTIALS_DIR") + "/" + myKafkaSource + ".json";

        JSONParser jsonParser = new JSONParser();

        try (FileReader reader = new FileReader(credentialsFilePath)) {
            // Parse the JSON file
            JSONObject kafkaJson = (JSONObject) jsonParser.parse(reader);

            // Extract necessary details
            String bootstrapServers = (String) kafkaJson.get("bootstrap_servers");
            String securityProtocol = (String) kafkaJson.get("security_protocol");

            // Configure Kafka source with the extracted details
            KafkaSource.builder()
                .setProperty("bootstrap.servers", bootstrapServers)
                .setProperty("security.protocol", securityProtocol)
                // Additional Kafka configuration as needed
                .build();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

In this example:

- The file named `my-kafka-service.json` contains the credentials in JSON format
  necessary for connecting to the Aiven for Apache Kafka service.
- The Java code shows a dynamic approach to constructing the path to the credentials file,
  using the `myKafkaSource` argument provided during application execution. This approach
  allows flexibility and avoids using fixed the file name.
- The application reads and parses the JSON file to extract configuration
  details such as `bootstrap_servers` (the Kafka server address) and `security_protocol`
  (the communication protocol for security).
- These extracted details can be used to configure Apache Kafka sources and sinks in
  Apache Flink applications. This configuration establishes a connection to the
  Apache Kafka service and handles data according to the service's specifications.

#### Configuration of  `myKafkaSource` for application deployment

The `myKafkaSource` argument is a dynamic runtime parameter that specifies which
Apache Kafka service your application connects to. This flexibility allows you to
switch between different Kafka services without recompiling the JAR file each time.
For example, you can replace a development Apache Kafka integration with a
production Apache Kafka integration using the same JAR.

##### Deploy via Aiven Console

When deploying your JAR application using the [Aiven Console](https://console.aiven.io/),
you can pass the `myKafkaSource` as **Program Arguments**.

1. [Create a JAR application](/docs/products/flink/howto/create-jar-application).
1. In the **Create new deployment** dialog look for the **Program args** field.
1. Insert the following syntax, replacing `integration_id` with the actual
   [integration ID](/docs/tools/cli/service/integration#avn_service_integration_list)
   of your Aiven for Apache Kafka service:

   ```text
   myKafkaSource=<INTEGRATION_ID>
   ```

##### Deploy via Java code

Using the `ParameterTool`, you can dynamically parse the `myKafkaSource` argument at
runtime in your JAR application. This approach lets you configure the
Apache Kafka service connection for your application without needing to
recompile the JAR file.

```java
ParameterTool parameters = ParameterTool.fromArgs(args);
String myKafkaSource = parameters.getRequired("myKafkaSource");
```

This code snippet shows how `ParameterTool` extracts the `myKafkaSource` value from the
command-line arguments. The extracted `myKafkaSource` specifies the integration ID of the
Apache Kafka service to be used by the application. Modifying this argument when running
the JAR allows you to switch between different Apache Kafka services
(For example, from a development environment to a production environment).

### Example 2: Integration with Aiven for PostgreSQL

To connect to Aiven for PostgreSQL service, the credentials JSON structure is as follows:

```JSON
{
    "integration_type": "pg",
    "service_name": "my-pg-test-1",
    "url": "postgres://PG_USERNAME:PG_PASSWORD@my-pg-test-1-my-project.aivencloud.com:12691/defaultdb?sslmode=require"
}
```

**Java application example:**

```java
import java.net.URI;
import java.net.URISyntaxException;

public class PostgreSQLCredentialsParser {

    public static void main(String[] args) {
        // Assuming 'pgJson' is a JSONObject containing the credentials
        try {
            URI uri = new URI(pgJson.get("url").toString());
            String[] userAndPassword = uri.getUserInfo().split(":");
            String user = userAndPassword[0];
            String password = userAndPassword[1];
            String host = uri.getHost();
            int port = uri.getPort();
            String database = uri.getPath().substring(1);

            // Use these details for your PostgreSQL connection
        } catch (URISyntaxException e) {
            e.printStackTrace(); // Handle invalid JDBC URL syntax
        }
    }
}
```

In this example, the application dynamically parses the PostgreSQL connection string to
extract the necessary connection parameters, including username, password, host, port,
and database name.

### Example 3: External or self-hosted Apache Kafka integration with SASL_SSL

When integrating with an external Apache Kafka service using `SASL_SSL`, the credentials
file is structured based on the configuration details you specify for your external
Apache Kafka integration. The following JSON structure represents the minimum required
for initial setup, serving as a foundational configuration. Additional parameters
may be necessary depending on your security requirements. The credentials JSON structure
is as follows:

```JSON
{
  "bootstrap_servers": "external-kafka-server:port",
  "security_protocol": "SASL_SSL",
  "sasl_ssl": {
    "sasl_mechanism": "SCRAM-SHA-256",
    "sasl_password": "secure_password",
    "sasl_username": "kafka_user",
    "ssl_ca_cert": "certificate content"
  }
}
```

:::note
The structure of this JSON file corresponds to the configuration settings you established
when creating an external Apache Kafka integration with Aiven for Apache Kafka service.
This includes essential details such as bootstrap servers, security protocol, and
SASL_SSL settings.
:::

**Java application example:**

```java
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import java.io.FileReader;

public class ExternalKafkaCredentialsReader {

    public static void main(String[] args) {
        String credentialsFilePath = System.getenv("AVN_CREDENTIALS_DIR") + "/external-kafka-service.json";
        JSONParser jsonParser = new JSONParser();

        try (FileReader reader = new FileReader(credentialsFilePath)) {
            JSONObject kafkaCredentials = (JSONObject) jsonParser.parse(reader);
            JSONObject saslSslConfig = (JSONObject) kafkaCredentials.get("sasl_ssl");

            // Configure Kafka properties for SASL_SSL
            Properties properties = new Properties();
            properties.setProperty("bootstrap.servers", (String) kafkaCredentials.get("bootstrap_servers"));
            properties.setProperty("security.protocol", (String) kafkaCredentials.get("security_protocol"));
            properties.setProperty("sasl.mechanism", (String) saslSslConfig.get("sasl_mechanism"));
            properties.setProperty("ssl.truststore.certificates", (String) saslSslConfig.get("ssl_ca_cert"));
            properties.setProperty("sasl.jaas.config", String.format
            ("org.apache.kafka.common.security.scram.ScramLoginModule required
            username=\"%s\" password=\"%s\";", (String) saslSslConfig.get("sasl_username
"), (String) saslSslConfig.get("sasl_password")));
            // Additional Kafka configuration
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

In this example:

- The file named `external-kafka-service.json` contains credentials in JSON format for
  connecting to an external Kafka service that employs the SASL_SSL security protocol.
- The Java code demonstrates how to read the file, parse the JSON content, and extract
  key details, including SASL and SSL configurations.
- These details are then used to configure a Kafka client within the Flink application,
  ensuring secure communication with the external Kafka service.

## Related page

   - For additional information on integrating external or self-hosted Apache Kafka with
     Aiven for Apache Flink, see
     [Integrate Aiven for Apache Flink® with Apache Kafka®](/docs/products/flink/howto/ext-kafka-flink-integration)
