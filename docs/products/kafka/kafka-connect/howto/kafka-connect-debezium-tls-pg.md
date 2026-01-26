---
title: Integrate Aiven for Apache Kafka® Connect with PostgreSQL using Debezium with mutual TLS
sidebar_label: Debezium PostgreSQL® source connector with mutual TLS
---

Integrate Aiven for Apache Kafka® Connect with PostgreSQL using Debezium with mutual TLS (mTLS) to enhance security with mutual authentication.

This configuration establishes a secure and efficient data synchronization channel
between Aiven for Apache Kafka® Connect and a PostgreSQL database.

## Prerequisites

- Access to an Aiven for Apache Kafka® and Aiven for Apache Kafka® Connect service.
- Administrative access to a PostgreSQL database with SSL enabled.
- The following SSL certificates and keys from your PostgreSQL database:
  - Client certificate: Public certificate for client authentication.
  - Root certificate: Certificate authority (CA) certificate used to sign the server
    and client certificates.
  - Client key: Private key for encrypting data sent to the server.

For additional details, see [Certificate requirements](/docs/platform/concepts/tls-ssl-certificates#certificate-requirements).

### For CloudSQL PostgreSQL databases

If you are using CloudSQL, complete these additional steps if they are not already
configured:

- **Allow Aiven IP addresses**: Whitelist Aiven IP addresses to enable connections
  from Apache Kafka Connect to your CloudSQL instance.

- **Enable WAL and logical decoding**:
  - Set `cloudsql.logical_decoding` to `on` to capture database change events.
  - Set `cloudsql.enable_pglogical` to `on` to configure the Write-Ahead Log (WAL)
    for logical replication.
  - Restart the CloudSQL instance to apply the changes.
- **Enable the `pgoutput` extension**
  In your CloudSQL instance, enable the extension that Debezium uses for logical decoding:

  ```SQL
  CREATE EXTENSION pgoutput;
  ```

- **Verify SSL configuration**: After whitelisting IP addresses, test the SSL
  connection to ensure your certificates are configured correctly:

  ```bash
  psql "sslmode=verify-ca \
    sslrootcert=server-ca.pem \
    sslcert=client-cert.pem \
    sslkey=client-key.pem \
    hostaddr=<YOUR_IP_ADDRESS> \
    port=5432 \
    user=<YOUR_USER> \
    dbname=<YOUR_DB_NAME>"
  ```

- **Set the Debezium output plugin**: Set the `plugin.name` field in the connector
  configuration to either `pgoutput` or `decoderbufs`.

  :::note
  Starting with Debezium 2.5, the `wal2json` plugin is deprecated. Use `pgoutput` or
  `decoderbufs` as the recommended replacement.
  :::

## Limitations

- The integration is not yet available in the Aiven Console. Use the Aiven CLI or Aiven
  API instead.
- A dedicated Aiven for Apache Kafka® Connect service is required. Enabling Kafka Connect
  within the same Aiven for Apache Kafka® service is not supported for this integration.
- The `kafka_connect_postgresql` integration type is not yet available in the Aiven
  Console.
- Delivering SSL keys to Aiven for Apache Kafka Connect is asynchronous. There may be a
  delay of up to five minutes between creating the integration and using the keys.
- Mutual authentication in `verify-full` SSL mode is not supported in the Apache Kafka
  setup. The `verify-ca` mode remains secure because the Certificate Authority (CA) is
  unique to the instance.
- For CloudSQL PostgreSQL databases, enable logical decoding and the `pgoutput`
  extension to ensure replication compatibility.

## Variables

Replace the placeholders in the following table with values from your environment. Use
these values in the configuration steps and code snippets.

|           Variable            |                    Description                     |
|-------------------------------|----------------------------------------------------|
| `<kafka_cluster_name>`        | Name of your Aiven for Apache Kafka service        |
| `<kafka_connect_name>`        | Name of your Apache Kafka Connect service          |
| `<cloud_provider_and_region>` | Your cloud provider and region identifier          |
| `<plan>`                      | Service plan for Apache Kafka/Apache Kafka Connect |
| `<project_name>`              | Name of your project in the Aiven platform         |
| `<integration_config>`        | JSON configuration for PostgreSQL endpoint         |
| `<integration_endpoint_id>`   | ID of the created PostgreSQL endpoint              |
| `<connector_config>`          | JSON configuration for Debezium connector          |

## Configure the integration

1. Verify that your Aiven for Apache Kafka® service is active and accessible. If you do
   not have a Kafka service, create one:

    ```bash
    avn service create <kafka_cluster_name> \
      --service-type kafka \
      --cloud <cloud_provider_and_region> \
      --plan <plan> \
      --project <project_name>
    ```

    :::note
    Ensure [topic auto-creation](/docs/products/kafka/howto/create-topics-automatically)
    is enabled to automatically generate required Apache Kafka topics. If disabled,
    manually create topics before starting the connector.
    :::

1. Verify that your Aiven for Apache Kafka® Connect service is active and accessible. If
   you do not have one, use the following command to create it and connect it to your
   Kafka service:

    ```bash
    avn service create <kafka_connect_name> \
      --service-type kafka_connect \
      --cloud <cloud_provider_and_region> \
      --plan <plan> \
      --project $PROJECT
    ```

1. Create an external PostgreSQL integration endpoint. This endpoint represents your
   PostgreSQL database. Replace the placeholders in the following JSON configuration:

   ```bash
    INTEGRATION_CONFIG=$(cat <<-END
    {
      "ssl_mode": "verify-ca",
      "host": "<postgresql_host>",
      "port": <postgresql_port>,
      "username": "<postgresql_user>",
      "ssl_client_certificate": "$(cat /path/to/your/client-cert.pem)",
      "ssl_root_cert": "$(cat /path/to/your/ca.pem)",
      "ssl_client_key": "$(cat /path/to/your/client-key.pem)",
      "password": my_password
    }
    END
    )

    avn service integration-endpoint-create \
	   --project $PROJECT \
	   --endpoint-name external_postgresql \
	   --user-config "$INTEGRATION_CONFIG"

   ```

1. Retrieve the ID of the external PostgreSQL integration endpoint:

   ```bash
   INTEGRATION_ENDPOINT_ID=$(
	   avn service integration-endpoint-list --project $PROJECT \
	   | grep external_postgresql \
	   | awk '{print $1}'
	  )
   ```

1. Integrate the Apache Kafka® Connect service with the external PostgreSQL endpoint:

   ```bash
   avn service integration-create \
     --project $PROJECT \
     --integration-type kafka_connect_postgresql \
     --source-endpoint-id $INTEGRATION_ENDPOINT_ID \
     --dest-service <kafka_connect_name>
   ```

1. Create the Debezium connector configuration to monitor your PostgreSQL database.
   Replace the placeholders with your PostgreSQL and Apache Kafka® Connect information:

   ```bash
   CONNECTOR_CONFIG=$(cat <<-END
   {
     "name": "debezium-postgres-connector",
     "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
     // Omitted as provided by external PostgreSQL integration:
     // "database.hostname", "database.port", "database.user", "database.password",
     // "database.dbname", "database.sslcert", "database.sslkey", "database.sslmode",
     // "database.sslrootcert"
     "database.server.name": "<kafka_connect_server_name>",
     "plugin.name": "pgoutput",
     "publication.name": "debezium_publication",
     "publication.autocreate.mode": "all_tables",
     "endpoint_id": "$INTEGRATION_ENDPOINT_ID",
     "topic.prefix": "my_prefix",
     // Topics will be named as "{prefix}.{database_name}.{table_name}"
     "database.tcpKeepAlive": "true",
     // Optional Transforms (uncomment if needed)
     //"transforms": "unwrap",
     //"transforms.unwrap.type": "io.debezium.transforms.ExtractNewRecordState"
   }
   END
   )

   avn service connector create \
     --project $PROJECT \
     --service <kafka_connect_name> \
     --config "$CONNECTOR_CONFIG"
   ```

   Parameters:

    - `name`: The connector instance name. For example, `debezium-postgres-connector`.
    - `connector.class`: The class of the PostgreSQL connector.
      For example, `io.debezium.connector.postgresql.PostgresConnector`.
    - `database.server.name`: The identifier for the database server within
      Apache Kafka Connect.
    - `plugin.name`: The PostgreSQL logical decoding plugin.
    - `publication.name`: The PostgreSQL publication for tracking database changes.
    - `publication.autocreate.mode`: If set to `all_tables`, it captures changes for
      all tables automatically.
    - `endpoint_id`: The unique ID for the PostgreSQL endpoint managed externally.
    - `topic.prefix`: The prefix for Kafka topics receiving database change events.
    - `database.tcpKeepAlive`: If set to `true`, it prevents database connection timeouts
      during inactivity.
    - `transforms` and `transforms.unwrap.type`: The data transformations.
      `ExtractNewRecordState` extracts the latest data state. These transformations are
      optional and should be used based on your specific requirements.

## Verification

After completing the setup, confirm the following:

1. Apache Kafka Connect establishes a secure SSL connection with the PostgreSQL database.
1. Apache Kafka topics exist as expected, whether created automatically or manually.
1. Data is streaming into topics using the naming pattern `{connector_name}.{database_name}.{table_name}`.
