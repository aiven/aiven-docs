---
title: Configure HashiCorp Vault
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Configure and use HashiCorp Vault as a secret provider in Aiven for Apache Kafka® Connect services.

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io/).
- Aiven for Apache Kafka service with Apache Kafka Connect set up and running.
  For setup instructions, see
  [Aiven for Apache Kafka with Kafka Connect documentation](https://aiven.io/docs/products/kafka/kafka-connect/get-started).
- [Aiven CLI](/docs/tools/cli).
- [HashiCorp Vault address and token](https://developer.hashicorp.com/vault/docs/concepts/tokens).

## Configure secret providers

Set up HashiCorp Vault in your Aiven for Apache Kafka Connect service to manage and
access sensitive information.

<Tabs groupId="config-methods">
<TabItem value="api" label="API" default>

Use the [ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
API to update your service configuration. Add the HashiCorp Vault configuration to
the `user_config` using the following API request:

```sh
curl --request PUT \
  --url https://api.aiven.io/v1/project/{PROJECT_NAME}/service/{SERVICE_NAME} \
  --header 'Authorization: Bearer YOUR_BEARER_TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
    "user_config": {
      "secret_providers": [
        {
          "name": "vault",
          "vault": {
            "auth_method": "token",
            "address": "https://vault.aiven.fi:8200/
            ",
            "token": "YOUR_VAULT_TOKEN"
          }
        }
      ]
    }
  }'
```

Parameters:

- `PROJECT_NAME`: Name of your Aiven project.
- `SERVICE_NAME`: Name of your Aiven Kafka service.
- `url`: API endpoint for updating service configuration. Replace `{project_name}` and
  `{service_name}` with your actual project and service names.
- `Authorization`: Header for authentication. Replace `YOUR_BEARER_TOKEN` with your
  actual  [Aiven API token](/docs/platform/howto/create_authentication_token).
- `Content-Type`: Specifies that the request body is in JSON format.
- `auth_method`: Authentication method used by HashiCorp Vault. In this case, it is token.
- `address`: Address of the HashiCorp Vault server.
- `token`: Your HashiCorp Vault token.

</TabItem>
<TabItem value="cli" label="CLI">

Configure HashiCorp Vault as a secret provider using [Aiven CLI](/docs/tools/cli):

```sh
avn service update SERVICE_NAME \
  -c secret_providers='[
    {
        "vault": {
            "auth_method": "token",
            "address": "https://vault.aiven.fi:8200/",
            "token": "YOUR_VAULT_TOKEN"
        },
        "name": "vault"
    }
  ]'
```

Parameters:

- `SERVICE_NAME`: Name of your Aiven Kafka service..
- `name`: Name of the secret provider. In this case, `vault`.
- `auth_method`: Authentication method used by HashiCorp Vault. In this case, it is
  `token`.
- `address`: Address of the HashiCorp Vault server.
- `token`: Your HashiCorp Vault token.

</TabItem>
</Tabs>

## Reference secrets in connector configurations

After configuring the secret providers, you can reference secrets in your
connector configurations.

### JDBC sink connector

<Tabs groupId="reference-secrets-sink">
<TabItem value="api" label="API" default>

Configure a JDBC sink connector using the API with secrets referenced from
HashiCorp Vault:

```sh
curl -X POST https://api.aiven.io/v1/project/{PROJECT_NAME}/service/{SERVICE_NAME}/connectors \
  -H "Authorization: Bearer YOUR_BEARER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
        "name": "your-connector-name",
        "connector.class": "io.aiven.connect.jdbc.JdbcSinkConnector",
        "connection.url": "jdbc:{DATABASE_TYPE}://{HOST}:{PORT}/{DATABASE_NAME}?user=${vault:PATH/TO/SECRET:USERNAME}&password=${vault:PATH/TO/SECRET:PASSWORD}&ssl=require",
        "topics": "your-topic",
        "auto.create": true
      }'
```

Parameters:

- `PROJECT_NAME`: Name of your Aiven project.
- `SERVICE_NAME`: Name of your Aiven Kafka service.
- `name`: Name of the connector.
- `connector.class`: Specifies the connector class to use, in this case,
  `io.aiven.connect.jdbc.JdbcSinkConnector`.
- `connection.url`: JDBC connection URL with placeholders for `DATABASE_TYPE`, `HOST`,
  `PORT`, `DATABASE_NAME`, and the username and password retrieved from HashiCorp Vault.
- `topics`: Apache Kafka topic where the data can be sent.
- `auto.create`: If `true`, the connector automatically creates the table in
  the target database if it does not exist.

</TabItem>
<TabItem value="cli" label="CLI">

Configure a JDBC sink connector using the Aiven CLI with secrets referenced from
HashiCorp Vault:

```bash
avn service connector create SERVICE_NAME '{
  "name": "jdbc-sink-connector",
  "connector.class": "io.aiven.connect.jdbc.JdbcSinkConnector",
  "connection.url": "jdbc:{DATABASE_TYPE}://{HOST}:{PORT}/{DATABASE_NAME}?user=${vault:PATH/TO/SECRET:USERNAME}&password=${vault:PATH/TO/SECRET:PASSWORD}&ssl=require",
  "topics": "your-topic",
  "auto.create": true

```

Parameters:

- `SERVICE_NAME`: Name of your Aiven Kafka service.
- `name`: Name of the connector.
- `connector.class`: Specifies the connector class to use, in this case,
  `io.aiven.connect.jdbc.JdbcSinkConnector`.
- `connection.url`: JDBC connection URL with placeholders for `DATABASE_TYPE`, `HOST`,
  `PORT`, `DATABASE_NAME`, and the username and password retrieved from HashiCorp Vault.
- `topics`: Apache Kafka topic where the data can be sent.
- `auto.create`: If `true`, the connector automatically creates the table in
  the target database if it does not exist.

</TabItem>
</Tabs>

### JDBC source connector

<Tabs groupId="reference-secrets-source">
<TabItem value="api" label="API" default>

Configure a JDBC source connector using the API with secrets referenced from
HashiCorp Vault:


```sh
curl -X POST https://api.aiven.io/v1/project/{PROJECT_NAME}/service/{SERVICE_NAME}/connectors \
  -H "Authorization: Bearer YOUR_BEARER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
        "name": "your-connector-name",
        "connector.class": "io.aiven.connect.jdbc.JdbcSourceConnector",
        "connection.url": "jdbc:{DATABASE_TYPE}://{HOST}:{PORT}/{DATABASE_NAME}?ssl=require",
        "connection.user": "${vault:PATH/TO/SECRET:USERNAME}",
        "connection.password": "${vault:PATH/TO/SECRET:PASSWORD}",
        "incrementing.column.name": "id",
        "mode": "incrementing",
        "table.whitelist": "your-table",
        "topic.prefix": "your-prefix_",
        "auto.create": true
      }'
```

Parameters:

- `PROJECT_NAME`: Name of your Aiven project.
- `SERVICE_NAME`: Name of your Aiven Kafka service.
- `name`: Name of the connector.
- `connector.class`: Specifies the connector class to use, in this case,
  `io.aiven.connect.jdbc.JdbcSinkConnector`.
- `connection.url`: JDBC connection URL with placeholders for `DATABASE_TYPE`, `HOST`,
  `PORT`, `DATABASE_NAME`, and the username and password retrieved from HashiCorp Vault.
- `connection.user`: Database username retrieved from HashiCorp Vault.
- `connection.password`: Database password retrieved from HashiCorp Vault.
- `incrementing.column.name`: Column used for incrementing mode.
- `mode`: Mode of operation, in this case, `incrementing`.
- `table.whitelist`: Tables to include.
- `topic.prefix`: Prefix for Apache Kafka topics.
- `auto.create`: If `true`, the connector automatically creates the table in
  the target database if it does not exist.

</TabItem>
<TabItem value="cli" label="CLI">

Configure a JDBC source connector using the Aiven CLI with secrets referenced
from HashiCorp Vault:

```bash
avn service connector create SERVICE_NAME '{
  "name": "jdbc-source-connector",
  "connector.class": "io.aiven.connect.jdbc.JdbcSourceConnector",
  "connection.url": "jdbc:{DATABASE_TYPE}://{HOST}:{PORT}/{DATABASE_NAME}?ssl=require",
  "connection.user": "${vault:PATH/TO/SECRET:USERNAME}",
  "connection.password": "${vault:PATH/TO/SECRET:PASSWORD}",
  "incrementing.column.name": "id",
  "mode": "incrementing",
  "table.whitelist": "your-table",
  "topic.prefix": "your-prefix_",
  "auto.create": true
}'

```

Parameters:

- `SERVICE_NAME`: Name of your Aiven Kafka service.
- `name`: Name of the connector.
- `connector.class`: Specifies the connector class to use, in this case,
  `io.aiven.connect.jdbc.JdbcSinkConnector`.
- `connection.url`: JDBC connection URL with placeholders for `DATABASE_TYPE`, `HOST`,
  `PORT`, `DATABASE_NAME`, and the username and password retrieved from HashiCorp Vault.
- `connection.user`: Database username retrieved from HashiCorp Vault.
- `connection.password`: Database password retrieved from HashiCorp Vault.
- `incrementing.column.name`: Column used for incrementing mode.
- `mode`: Mode of operation, in this case, `incrementing`.
- `table.whitelist`: Tables to include.
- `topic.prefix`: Prefix for Apache Kafka topics.
- `auto.create`: If `true`, the connector automatically creates the table in
  the target database if it does not exist.

</TabItem>
</Tabs>
