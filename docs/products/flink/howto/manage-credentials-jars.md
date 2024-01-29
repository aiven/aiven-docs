---
title: Credential management for JAR applications
---

Aiven for Apache Flink® provides a secure and convenient way to manage credentials for both internal and external integrations using the `AVN_CREDENTIALS_DIR` environment variable. By centralizing credentials in this directory, you can ensure that your applications access sensitive information securely and in compliance with your organization's security policies.

## Prerequisites

- Active Aiven for Apache Flink service
- [Integration with services like Aiven for Apache Kafka or PostgreSQL](/docs/products/flink/howto/create-integration)
- [JAR application for Aiven for Apache Flink](/docs/products/flink/howto/create-jar-application)

## Credential Provisioning

Aiven manages the `AVN_CREDENTIALS_DIR` environment variable within its service environment. This variable points to the directory where credentials for integrated services like Apache Kafka or PostgreSQL are stored. This setup simplifies access for users while abstracting the complexities of internal storage.

When configuring an integration with a managed Aiven service, such as Aiven for Apache Kafka or Aiven for PostgreSQL, Aiven automatically generates the necessary credentials. These credentials are stored in a JSON file, which is named using the service's unique `integration_id`. For instance, if the `integration_id` of your Kafka service is `my_kafka_service`, the credentials file will be named `my_kafka_service.json`. This file is located in a directory that your Aiven for Apache Flink® application can access. You can find this file in the path `/AVN_CREDENTIALS_DIR/my_kafka_service.json`.

## Access credentials in JAR applications

### Step 1. Locate credentials file

To access the credentials for any service integrations, such as Apache Kafka or Aiven for PostgreSQL®, use its unique `integration_id`. You can find this `integration_id` in the [integration list](/docs/tools/cli/service/integration#avn-service-integration-list). Aiven stores the credentials in a JSON file named after this identifier.

For example, if your service's `integration_id` is `my_kafka_service`, you'll find the credentials in a file named `my_kafka_service.json` at `/AVN_CREDENTIALS_DIR/my_kafka_service.json`.

### Step 2. Read and parse JSON file

In your Aiven for Apache Flink JAR application, you will need to implement the code to read and parse the credentials file. This process involves extracting necessary details like connection strings, usernames, passwords, and other configuration data required for connecting to the integrated service.

## Example: Parsing credentials in JAR applications

### Scenario 1: Integration with Aiven for Apache Kafka

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

**Java application example**

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

In this scenario:

- The file named `my-kafka-service.json` contains the credentials in JSON format necessary for connecting to the Aiven for Apache Kafka service.
- The Java code demonstrates how to construct the path to the credentials file dynamically. This is achieved by using the `myKafkaSource` argument, which should be provided when running the application. This approach allows flexibility and avoids hardcoding the file name.
- The application reads and parses the JSON file to extract critical configuration details such as `bootstrap_servers` (the Kafka server address) and `security_protocol` (the communication protocol for security).
- These extracted details are then used to configure a Kafka source within the Flink application. This configuration is crucial for establishing a proper connection to the Kafka service and handling data according to the service's specifications.

#### Configuring myKafkaSource

##### For Command Line Execution

Run the `KafkaCredentialsReader` application with the Kafka source specified using the `--myKafkaSource` argument.

```bash
  java KafkaCredentialsReader --myKafkaSource=my-kafka-service
```

Replace `my-kafka-service` with the integration ID of your Aiven for Apache Kafka service.

The application uses `ParameterTool` to parse this argument:

```bash
  ParameterTool parameters = ParameterTool.fromArgs(args);
```

##### For Aiven Console deployment

When deploying your application through the [Aiven Console](https://console.aiven.io/), you can also specify the `myKafkaSource` in the **Program Arguments** section. For example, in the Create new deployment dialog, locate the Program args field. Enter `myKafkaSource=<INTEGRATION_ID>` in this field, replacing `INTEGRATION_ID` with the actual [integration ID](/docs/tools/cli/service/integration#avn_service_integration_list) For more information, see [Creating a JAR application on Aiven for Apache Flink](/docs/products/flink/howto/create-jar-application).

### Scenario 2: Integration with Avien for PostgreSQL

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

In this scenario, the application parses the PostgreSQL connection string to extract the username, password, host, port, and database.

### Scenario 3: External or self-hosted Apache Kafka integration with SASL_SSL\*

When integrating with an external Apache Kafka service using SASL_SSL, the credentials file will be structured based on the configuration details you specify for your external Apache Kafka integration. The credentials JSON structure is as follows:

**Credentials JSON Structure:**

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

:::note The structure of this JSON file corresponds to the configuration settings you established when creating an external Apache Kafka integration with Aiven for Apache Kafka service. This includes essential details such as bootstrap servers, security protocol, and SASL_SSL settings. :::

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
            ("org.apache.kafka.common.security.scram.ScramLoginModule required username=\"%s\" password=\"%s\";", (String) saslSslConfig.get("sasl_username
"), (String) saslSslConfig.get("sasl_password")));
            // Additional Kafka configuration
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

In this scenario:

- The file named `external-kafka-service.json` contains credentials in JSON format for connecting to an external Kafka service that employs the SASL_SSL security protocol.
- The Java code demonstrates how to read the file, parse the JSON content, and extract key details, including SASL and SSL configurations.
- These details are then used to configure a Kafka client within the Flink application, e nsuring secure communication with the external Kafka service.

## Related page

- For additional information on integrating external or self-hosted Apache Kafka with Aiven for Apache Flink, see [Integrate Aiven for Apache Flink® with Apache Kafka®](/docs/products/flink/howto/ext-kafka-flink-integration)
