---
title: Integrate Aiven for Apache Kafka® Connect with PostgreSQL using Debezium with mutual TLS
---

Integrate Aiven for Apache Kafka Connect with PostgreSQL using Debezium with mutual TLS (mTLS) to enhance security with mutual authentication.

This configuration establishes a secure and efficient data synchronization channel
between Aiven for Apache Kafka Connect and a PostgreSQL database.

## Prerequisites

Before you begin, ensure you have the following:

- Access to an Aiven for Apache Kafka service with
  [Apache Kafka Connect](/docs/products/kafka/kafka-connect/howto/enable-connect)
  enabled.
- Administrative access to a PostgreSQL database with SSL enabled.
- The following SSL certificates and keys obtained from your PostgreSQL database:
  - SSL client certificate: The public certificate for client authentication.
  - SSL root certificate: The certificate of the Certificate Authority (CA) that signed
    the servers' and clients' certificates.
  - SSL client key: The client's private key is used to encrypt the data sent to the
    server.
  For additional details, see
  [Certificate requirements](/docs/platform/concepts/tls-ssl-certificates#certificate-requirements).

### For CloudSQL PostgreSQL databases

If you're integrating with a CloudSQL database, perform these additional steps only if
they are not already configured:

- **IP whitelisting**: Whitelist Aiven's IP addresses to allow connections
  from Apache Kafka Connect to reach your CloudSQL database.
- **Configure WAL and logical decoding**:
  - To capture database change events, `set cloudsql.logical_decoding` to `on`.
  - To configure the Write-Ahead Log (WAL) for logical replication, set
    `cloudsql.enable_pglogical` to` on`.
  - Restart the CloudSQL instance to apply changes.
- **Activate the `pgoutput` extension**: In your
  CloudSQL instance, enable the extension Debezium uses for logical decoding:

  ```SQL
  CREATE EXTENSION pgoutput;
  ```

- **Verify SSL certificates**: After whitelisting IPs, ensure your SSL configuration is
  correct by testing the database connection:

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

- **Set Debezium output plugin**: Use `pgoutput` or `decoderbufs` as the `plugin.name` in
  your Debezium connector for logical decoding.

    :::note
      Starting with Debezium 2.5, the `wal2json` plugin is deprecated. You can use
      either `pgoutput` or `decoderbufs` as the recommended replacement plugin.
    :::

## Variables

The following table lists the variables for the configuration steps. Replace them with
your actual environment values in the provided code snippets:

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

1. Verify your existing Aiven for Apache Kafka service is active and accessible.
   If you don't have one, create an Apache Kafka cluster using this command:

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

1. Create an Apache Kafka Connect service and configure it to communicate with your
   Aiven for Apache Kafka service:

    ```bash
    avn service create <kafka_connect_name> \
      --service-type kafka_connect \
      --cloud <cloud_provider_and_region> \
      --plan <plan> \
      --project $PROJECT
    ```

1. Create an external PostgreSQL integration endpoint to represent your PostgreSQL
   database. Use the following JSON configuration and replace the placeholders:

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

1. Retrieve endpoint ID of the integration endpoint you just created using this command:

   ```bash
   INTEGRATION_ENDPOINT_ID=$(
	   avn service integration-endpoint-list --project $PROJECT \
	   | grep external_postgresql \
	   | awk '{print $1}'
	  )
   ```

1. Connect PostgreSQL endpoint to Apache Kafka Connect:

   ```bash
   avn service integration-create \
     --project $PROJECT \
     --integration-type kafka_connect_postgresql \
     --source-endpoint-id $INTEGRATION_ENDPOINT_ID \
     --dest-service <kafka_connect_name>
   ```

1. Create the Debezium connector configuration to monitor your PostgreSQL database.
   Replace the placeholders with your PostgreSQL and Apache Kafka Connect information:

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

   where,

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
    - `transforms` and `transforms.unwrap.type`: he data transformations.
      `ExtractNewRecordState` extracts the latest data state. These transformations are
      optional and should be used based on your specific requirements.

## Verification

Confirm the following after completing the setup:

1. Apache Kafka Connect establishes a secure SSL connection with the PostgreSQL database.
1. Apache Kafka topics exist as expected, whether created automatically or manually.
1. Data is correctly streaming into topics using the naming pattern
   `{connector_name}.{database_name}.{table_name}`.

## Limitations

- The process of delivering SSL keys to Apache Kafka Connect is asynchronous.
  Therefore, a delay of approximately five minutes may occur from the creation of
  the integration to the operational use of the keys.
- The Apache Kafka setup does not support mutual authentication in `verify-full` SSL mode.
  However, the `verify-ca` mode is secure since the Certificate Authority (CA) is
  specific to the instance.
- For CloudSQL PostgreSQL databases, ensure logical decoding and the `pgoutput` extension
  are enabled for replication compatibility.
- As of Debezium 2.5, `wal2json` is deprecated. It is recommended to use `pgoutput`
  or `decoderbufs` for WAL output plugins.
