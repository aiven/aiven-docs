---
title: Configure HashiCorp Vault
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Configure and use [HashiCorp Vault](https://developer.hashicorp.com/vault/docs) as a secret provider in Aiven for Apache Kafka® Connect services.

## Prerequisites

- Access to the [Aiven Console](https://console.aiven.io/).
- [Aiven for Apache Kafka service with Apache Kafka Connect](/docs/products/kafka/kafka-connect/get-started)
  set up and running.
- [Aiven CLI](/docs/tools/cli).
- [Aiven Terraform Provider](https://registry.terraform.io/providers/aiven/aiven/latest/docs)
  installed.
- [HashiCorp Vault address and token](https://developer.hashicorp.com/vault/docs/concepts/tokens).

:::note
The integration with HashiCorp Vault is not yet available on the Aiven Console.
:::

## Configure secret providers

Set up HashiCorp Vault in your Aiven for Apache Kafka Connect service to manage and
access sensitive information.

<Tabs groupId="secret-config">
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
  `{service_name}` with your project and service names.
- `Authorization`: Token used for authentication. Replace `YOUR_BEARER_TOKEN` with your
  [Aiven API token](/docs/platform/howto/create_authentication_token).
- `Content-Type`: Specifies that the request body is in JSON format.
- `auth_method`: Authentication method used by HashiCorp Vault. In this case, it is token.
- `address`: Address of the HashiCorp Vault server.
- `token`: Your HashiCorp Vault token.

</TabItem>
<TabItem value="terraform" label="Terraform">

Configure HashiCorp Vault using the Aiven Terraform Provider. Add this configuration to your `main.tf` file,
or optionally create a dedicated `vault.tf` file for managing secret providers:

1. Create the `main.tf` file for your resources:

   ```hcl
   terraform {
     required_providers {
       aiven = {
         source  = "aiven/aiven"
         version = ">=4.0.0, < 5.0.0"
       }
     }
   }

   provider "aiven" {
     api_token = var.aiven_api_token
   }

   resource "aiven_kafka_connect" "kafka_connect" {
     project      = var.project_name
     cloud_name   = "your-cloud-region"
     plan         = "startup-4"
     service_name = "kafka-connect"

     kafka_connect_user_config {
       secret_providers {
         name = "vault"
         vault {
           auth_method = "token"
           address     = "https://vault.aiven.fi:8200/"
           token       = var.vault_token
         }
       }
     }
   }

1. Declare variables in a `variables.tf` file:

   ```hcl
    variable "aiven_api_token" {
     description = "Aiven API token"
     type        = string
   }

   variable "project_name" {
     description = "Aiven project name"
     type        = string
   }

   variable "vault_token" {
     description = "HashiCorp Vault token"
     type        = string
     sensitive   = true
   }

1. Provide variable values in a `terraform.tfvars` file:

   ```hcl
   aiven_api_token = "YOUR_AIVEN_API_TOKEN"
   project_name    = "YOUR_PROJECT_NAME"
   vault_token     = "YOUR_VAULT_TOKEN"
   ```

Parameters:

- `project_name`: Name of your Aiven project.
- `cloud_name`: Cloud provider and region for hosting the Aiven for Apache Kafka
  service. Replace with the appropriate region. For example, `google-europe-west3`.
- `plan`: Service plan for the Aiven for Apache Kafka Connect service.
- `service_name`: Name of your Aiven for Apache Kafka Connect service.
- `auth_method`: Authentication method used by HashiCorp Vault. Set to `token`.
- `address`: URL address of the HashiCorp Vault server.
- `token`: Token used for authenticating with HashiCorp Vault.
- `aiven_api_token`: API token for authentication. Replace with your Aiven API token to
  manage resources.

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

You can use secrets stored in HashiCorp Vault with any connector. The examples below
show how to configure secrets for JDBC connectors, but you can follow the same steps
for other connectors.

### JDBC sink connector

<Tabs groupId="secret-config">
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
<TabItem value="terraform" label="Terraform">

Configure a JDBC sink connector using the Aiven Terraform Provider with secrets referenced
from HashiCorp Vault. Add this configuration to your `main.tf` file, or optionally create
a dedicated `vault.tf` file for managing secret providers:

```hcl
resource "aiven_kafka_connector" "jdbc_sink_connector" {
  project        = var.project_name
  service_name   = aiven_kafka_connect.kafka_connect.service_name
  connector_name = "jdbc-sink-connector"

  config = {
    "connector.class"      = "io.aiven.connect.jdbc.JdbcSinkConnector"
    "connection.url"       = "jdbc:postgresql://{HOST}:{PORT}/{DATABASE_NAME}?user=${vault:PATH/TO/SECRET:USERNAME}&password=${vault:PATH/TO/SECRET:PASSWORD}&ssl=require"
    "topics"               = "your-topic"
    "auto.create"          = "true"
  }
}
```

Parameters:

- `project`: Name of your Aiven project where the Kafka Connect service is located.
- `service_name`: Name of the Aiven for Kafka Connect service where the connector is
  to be created.
- `connector_name`: Name for your JDBC sink connector.
- `connector.class`: The Java class that implements the connector. For JDBC sink
  connectors, use `"io.aiven.connect.jdbc.JdbcSinkConnector"`.
- `connection.url`: The JDBC URL for your database. Replace `{HOST}`, `{PORT}`, and
  `{DATABASE_NAME}` with your actual database details. The username and password are
  retrieved from HashiCorp Vault using the `${vault:PATH/TO/SECRET:USERNAME}` and
  `${vault:PATH/TO/SECRET:PASSWORD}` syntax.
- `topics`: Apache Kafka topics that the connector consumes data from.
- `auto.create`: If `true`, the connector automatically creates the table in
  the target database if it does not exist.

</TabItem>
<TabItem value="cli" label="CLI">

Configure a JDBC sink connector using the Aiven CLI with secrets referenced from
HashiCorp Vault.

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

<Tabs groupId="secret-config">
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
<TabItem value="terraform" label="Terraform">

Configure a JDBC source connector using the Aiven Terraform Provider with secrets referenced from
HashiCorp Vault. Add this configuration to your `main.tf` file, or optionally
create a dedicated `connectors.tf` file for managing Apache Kafka connectors:

```hcl
resource "aiven_kafka_connector" "jdbc_source_connector" {
  project        = var.project_name
  service_name   = aiven_kafka_connect.kafka_connect.service_name
  connector_name = "jdbc-source-connector"

  config = {
    "connector.class"      = "io.aiven.connect.jdbc.JdbcSourceConnector"
    "connection.url"       = "jdbc:postgresql://{HOST}:{PORT}/{DATABASE_NAME}?ssl=require"
    "connection.user"      = "${vault:PATH/TO/SECRET:USERNAME}"
    "connection.password"  = "${vault:PATH/TO/SECRET:PASSWORD}"
    "incrementing.column.name" = "id"
    "mode"                 = "incrementing"
    "table.whitelist"      = "your-table"
    "topic.prefix"         = "your-prefix_"
    "auto.create"          = "true"
  }
}
```

Parameters:

- `project`: Name of your Aiven project where the Kafka Connect service is located.
- `service_name`: Name of the Kafka Connect service where the connector is to be created.
- `connector_name`: Name for your JDBC source connector.
- `connector.class`: The Java class that implements the connector. For JDBC source
  connectors, use `"io.aiven.connect.jdbc.JdbcSourceConnector"`.
- `connection.url`: The JDBC URL for your database. Replace `{HOST}`, `{PORT}`,
  and `{DATABASE_NAME}` with your actual database details. The username and password
  are retrieved from HashiCorp Vault using the `${vault:PATH/TO/SECRET:USERNAME}` and
  `${vault:PATH/TO/SECRET:PASSWORD}` syntax.
- `connection.user`: The username for connecting to the database, retrieved from
  HashiCorp Vault.
- `connection.password`: The password for connecting to the database, retrieved
  from HashiCorp Vault.
- `incrementing.column.name`: The name of the column that the connector will use
  for incrementing mode, typically a primary key column.
- `mode`: The mode of operation for the connector. `incrementing` mode reads data
  incrementally based on the specified column.
- `table.whitelist`: A list of tables that the connector includes when reading data from
  the database.
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
