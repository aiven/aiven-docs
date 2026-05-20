---
title: Configure Azure Key Vault
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Configure and use [Azure Key Vault](https://learn.microsoft.com/en-us/azure/key-vault/general/overview) as a secret provider in Aiven for Apache Kafka® Connect services.

## Prerequisites

- [Aiven for Apache Kafka service with Apache Kafka Connect](/docs/products/kafka/kafka-connect/get-started)
  set up and running.
- [Aiven CLI](/docs/tools/cli).
- [Aiven Terraform Provider](https://registry.terraform.io/providers/aiven/aiven/latest/docs)
  installed.
- Azure Key Vault with the following:
  - A [service principal](https://learn.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal)
    with access to the Key Vault.
  - The service principal's client ID, tenant ID, and client secret.

:::note
The integration with Azure Key Vault is not yet available on the Aiven Console.
:::

:::important
Secrets stored in Azure Key Vault must have an expiration date set. Secrets without
an expiration date cause the connector to restart continuously.
:::

## Configure secret providers

Set up Azure Key Vault in your Aiven for Apache Kafka Connect service to manage and
access sensitive information.

<Tabs groupId="secret-config">
<TabItem value="api" label="API" default>

Use the [ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
API to update your service configuration. Add the Azure Key Vault configuration
to the `user_config` using the following API request:

```sh
curl --request PUT \
  --url https://api.aiven.io/v1/project/{PROJECT_NAME}/service/{SERVICE_NAME} \
  --header 'Authorization: Bearer YOUR_BEARER_TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
    "user_config": {
      "secret_providers": [
        {
          "name": "azure",
          "azure": {
            "auth_method": "credentials",
            "client_id": "your-azure-client-id",
            "tenant_id": "your-azure-tenant-id",
            "secret": "your-azure-client-secret"
          }
        }
      ]
    }
  }'
```

Parameters:

- `url`: API endpoint for updating the service configuration. Replace
  `PROJECT_NAME` and `SERVICE_NAME` with your project and service names.
- `Authorization`: Token used for authentication. Replace `YOUR_BEARER_TOKEN` with your
  [Aiven API token](/docs/platform/howto/create_authentication_token).
- `Content-Type`: Specifies that the request body is in JSON format.
- `auth_method`: Authentication method used by Azure Key Vault. Set to `credentials`.
- `client_id`: Azure service principal client ID.
- `tenant_id`: Azure service principal tenant ID.
- `secret`: Azure service principal client secret.

</TabItem>
<TabItem value="terraform" label="Terraform">

Configure Azure Key Vault using Terraform. Add this configuration to your `main.tf`
file, or optionally create a `secrets.tf` file to manage secret providers:

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
        name = "azure"
        azure {
          auth_method = "credentials"
          client_id   = var.azure_client_id
          tenant_id   = var.azure_tenant_id
          secret      = var.azure_client_secret
        }
      }
    }
   }
   ```

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

    variable "azure_client_id" {
      description = "Azure service principal client ID"
      type        = string
     }

    variable "azure_tenant_id" {
      description = "Azure service principal tenant ID"
      type        = string
     }

    variable "azure_client_secret" {
      description = "Azure service principal client secret"
      type        = string
      sensitive   = true
     }
   ```

1. Provide variable values in a `terraform.tfvars` file:

   ```hcl
    aiven_api_token     = "YOUR_AIVEN_API_TOKEN"
    project_name        = "YOUR_PROJECT_NAME"
    azure_client_id     = "your-azure-client-id"
    azure_tenant_id     = "your-azure-tenant-id"
    azure_client_secret = "your-azure-client-secret"
   ```

Parameters:

- `project_name`: Name of your Aiven project.
- `cloud_name`: Cloud provider and region for hosting Aiven for Apache Kafka Connect
  service. Replace with the appropriate region, for example `azure-westeurope`.
- `plan`: Service plan for Aiven for Apache Kafka Connect service.
- `service_name`: Name of your Aiven for Kafka Connect service in Aiven.
- `auth_method`: Authentication method used by Azure Key Vault. Set to `credentials`.
- `client_id`: Azure service principal client ID.
- `tenant_id`: Azure service principal tenant ID.
- `secret`: Azure service principal client secret.
- `aiven_api_token`: API token for authentication. Replace with your Aiven API token to
  manage resources.

</TabItem>
<TabItem value="cli" label="CLI">

Add Azure Key Vault using the [Aiven CLI](/docs/tools/cli):

```bash
avn service update SERVICE_NAME \
  -c secret_providers='[
    {
      "name": "azure",
      "azure": {
        "auth_method": "credentials",
        "client_id": "your-azure-client-id",
        "tenant_id": "your-azure-tenant-id",
        "secret": "your-azure-client-secret"
      }
    }
  ]'

```

Parameters:

- `SERVICE_NAME`: Name of your Aiven Kafka service.
- `name`: Name of the secret provider. In this case, `azure`.
- `auth_method`: Authentication method used by Azure Key Vault. Set to `credentials`.
- `client_id`: Azure service principal client ID.
- `tenant_id`: Azure service principal tenant ID.
- `secret`: Azure service principal client secret.

</TabItem>
</Tabs>

## Reference secrets in connector configurations

You can use secrets stored in Azure Key Vault with any connector. The format for
referencing secrets is:

```text
${PROVIDER_NAME:VAULT_NAME.vault.azure.net:SECRET_NAME}
```

Parameters:

- `PROVIDER_NAME`: Name of your secret provider configuration, such as `azure`.
- `VAULT_NAME.vault.azure.net`: Your Azure Key Vault hostname without `https://`.
- `SECRET_NAME`: Name of the secret in Azure Key Vault.

The examples below show how to configure secrets for JDBC connectors, but you can
follow the same steps for other connectors.

### JDBC sink connector

<Tabs groupId="secret-config">
<TabItem value="api" label="API" default>

Configure a JDBC sink connector using the API with secrets referenced from
Azure Key Vault.

```sh
curl --request POST \
  --url https://api.aiven.io/v1/project/{PROJECT_NAME}/service/{SERVICE_NAME}/connectors \
  --header 'Authorization: Bearer YOUR_BEARER_TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "YOUR_CONNECTOR_NAME",
    "connector.class": "io.aiven.connect.jdbc.JdbcSinkConnector",
    "connection.url": "jdbc:{DATABASE_TYPE}://{HOST}:{PORT}/{DATABASE_NAME}?user=${azure:your-vault.vault.azure.net:db-username}&password=${azure:your-vault.vault.azure.net:db-password}&ssl=require",
    "topics": "YOUR_TOPIC",
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
  `PORT`, `DATABASE_NAME`, and the username and password retrieved from Azure Key Vault.
- `topics`: Apache Kafka topic where the data can be sent.
- `auto.create`: If `true`, the connector automatically creates the table in the
  target database if it does not exist.

</TabItem>
<TabItem value="terraform" label="Terraform">

Configure a JDBC sink connector using the Aiven Terraform Provider with secrets
referenced from Azure Key Vault. Add this configuration to your `main.tf` file,
or optionally create a dedicated `connectors.tf` file for managing Apache Kafka
connectors:

```hcl
resource "aiven_kafka_connector" "jdbc_sink_connector" {
  project        = var.project_name
  service_name   = aiven_kafka_connect.kafka_connect.service_name
  connector_name = "jdbc-sink-connector"

  config = {
    "connector.class"      = "io.aiven.connect.jdbc.JdbcSinkConnector"
    "connection.url"       = "jdbc:postgresql://{HOST}:{PORT}/{DATABASE_NAME}?user=$${azure:your-vault.vault.azure.net:db-username}&password=$${azure:your-vault.vault.azure.net:db-password}&ssl=require"
    "topics"               = "your-topic"
    "auto.create"          = "true"
  }
}
```

Parameters:

- `project`: Name of your Aiven project.
- `service_name`: Name of the Aiven for Apache Kafka service where the
  connector is to be created.
- `connector_name`: Name for your JDBC sink connector.
- `connector.class`: Java class that implements the connector. For JDBC sink
  connectors, use `"io.aiven.connect.jdbc.JdbcSinkConnector"`.
- `connection.url`: JDBC URL for your database. Replace
  `{HOST}`, `{PORT}`, and `{DATABASE_NAME}` with your actual database details.
   The username and password are retrieved from Azure Key Vault
   using `${azure:your-vault.vault.azure.net:db-username}` and
   `${azure:your-vault.vault.azure.net:db-password}`.
- `topics`: Apache Kafka topics that the connector consumes data from.
- `auto.create`: If `true`, the connector automatically creates the table in the
  target database if it does not exist.

</TabItem>
<TabItem value="cli" label="CLI">

Configure a JDBC sink connector using the Aiven CLI with secrets referenced
from Azure Key Vault.

```bash
avn service connector create SERVICE_NAME '{
  "name": "jdbc-sink-connector",
  "connector.class": "io.aiven.connect.jdbc.JdbcSinkConnector",
  "connection.url": "jdbc:{DATABASE_TYPE}://{HOST}:{PORT}/{DATABASE_NAME}?user=${azure:your-vault.vault.azure.net:db-username}&password=${azure:your-vault.vault.azure.net:db-password}&ssl=require",
  "topics": "your-topic",
  "auto.create": true
}'
```

Parameters:

- `SERVICE_NAME`: Name of your Aiven for Apache Kafka service.
- `name`: Name of the connector.
- `connector.class`: Specifies the connector class to use, in this case,
  `io.aiven.connect.jdbc.JdbcSinkConnector`.
- `connection.url`: JDBC connection URL with placeholders for `DATABASE_TYPE`, `HOST`,
  `PORT`, `DATABASE_NAME`, and the username and password retrieved from Azure Key Vault.
- `topics`: Apache Kafka topic where the data can be sent.
- `auto.create`: If `true`, the connector automatically creates the table in the
  target database if it does not exist.

</TabItem>
</Tabs>

### JDBC source connector

<Tabs groupId="secret-config">
<TabItem value="api" label="API" default>

Configure a JDBC source connector using the API with secrets referenced from
Azure Key Vault.

```sh
curl -X POST https://api.aiven.io/v1/project/{PROJECT_NAME}/service/{SERVICE_NAME}/connectors \
  -H "Authorization: Bearer YOUR_BEARER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
        "name": "your-source-connector-name",
        "connector.class": "io.aiven.connect.jdbc.JdbcSourceConnector",
        "connection.url": "jdbc:{DATABASE_TYPE}://{HOST}:{PORT}/{DATABASE_NAME}?ssl=require",
        "connection.user": "${azure:your-vault.vault.azure.net:db-username}",
        "connection.password": "${azure:your-vault.vault.azure.net:db-password}",
        "incrementing.column.name": "id",
        "mode": "incrementing",
        "table.whitelist": "your-table",
        "topic.prefix": "your-prefix_",
        "auto.create": "true"
      }'
```

Parameters:

- `PROJECT_NAME`: Name of your Aiven project.
- `SERVICE_NAME`: Name of your Aiven for Apache Kafka service.
- `name`: Name of the connector.
- `connector.class`: Specifies the connector class to use, in this case,
  `io.aiven.connect.jdbc.JdbcSourceConnector`.
- `connection.url`: JDBC connection URL with placeholders for `DATABASE_TYPE`, `HOST`,
  `PORT`, and `DATABASE_NAME`.
- `connection.user`: Database username retrieved from Azure Key Vault.
- `connection.password`: Database password retrieved from Azure Key Vault.
- `incrementing.column.name`: Column used for incrementing mode.
- `mode`: Mode of operation, in this case, `incrementing`.
- `table.whitelist`: Tables to include.
- `topic.prefix`: Prefix for Apache Kafka topics.
- `auto.create`: If `true`, the connector automatically creates the table in
  the target database if it does not exist.

</TabItem>
<TabItem value="terraform" label="Terraform">

Configure a JDBC source connector using the Aiven Terraform Provider with secrets
referenced from Azure Key Vault. Add this configuration to your `main.tf` file,
or optionally create a dedicated `connectors.tf` file for managing Apache Kafka
connectors:

```hcl
resource "aiven_kafka_connector" "jdbc_source_connector" {
  project        = var.project_name
  service_name   = aiven_kafka_connect.kafka_connect.service_name
  connector_name = "jdbc-source-connector"

  config = {
    "connector.class"          = "io.aiven.connect.jdbc.JdbcSourceConnector"
    "connection.url"           = "jdbc:postgresql://{HOST}:{PORT}/{DATABASE_NAME}?ssl=require"
    "connection.user"          = "$${azure:your-vault.vault.azure.net:db-username}"
    "connection.password"      = "$${azure:your-vault.vault.azure.net:db-password}"
    "incrementing.column.name" = "id"
    "mode"                     = "incrementing"
    "table.whitelist"          = "your-table"
    "topic.prefix"             = "your-prefix_"
    "auto.create"              = "true"
  }
}
```

Parameters:

- `project`: Name of your Aiven project.
- `service_name`: Name of the Aiven for Apache Kafka service where the connector
  is to be created.
- `connector_name`: Name for your JDBC source connector.
- `connector.class`: Java class that implements the connector. For JDBC source
  connectors, use `"io.aiven.connect.jdbc.JdbcSourceConnector"`.
- `connection.url`: JDBC URL for your database. Replace `{HOST}`, `{PORT}`, and
 `{DATABASE_NAME}` with your actual database details.
- `connection.user`: Username for connecting to the database, retrieved from
  Azure Key Vault.
- `connection.password`: Password for connecting to the database, retrieved
  from Azure Key Vault.
- `incrementing.column.name`: Name of the column used for incrementing mode,
  typically a primary key column.
- `mode`: Mode of operation for the connector. `incrementing` mode reads data
  incrementally based on the specified column.
- `table.whitelist`: List of tables that the connector includes when reading data from
  the database.
- `topic.prefix`: Prefix that the connector adds to the Kafka topic names it
  produces data to.
- `auto.create`: If set to `true`, the connector automatically creates the target table
  in the database if it does not exist.

</TabItem>
<TabItem value="cli" label="CLI">

Configure a JDBC source connector using the Aiven CLI with secrets referenced from
Azure Key Vault.

```bash
avn service connector create SERVICE_NAME '{
  "name": "jdbc-source-connector",
  "connector.class": "io.aiven.connect.jdbc.JdbcSourceConnector",
  "connection.url": "jdbc:{DATABASE_TYPE}://{HOST}:{PORT}/{DATABASE_NAME}?ssl=require",
  "connection.user": "${azure:your-vault.vault.azure.net:db-username}",
  "connection.password": "${azure:your-vault.vault.azure.net:db-password}",
  "incrementing.column.name": "id",
  "mode": "incrementing",
  "table.whitelist": "your-table",
  "topic.prefix": "your-prefix_",
  "auto.create": true
}'
```

Parameters:

- `SERVICE_NAME`: Name of your Aiven for Apache Kafka service.
- `name`: Name of the connector.
- `connector.class`: Specifies the connector class to use, in this case,
  `io.aiven.connect.jdbc.JdbcSourceConnector`.
- `connection.url`: JDBC connection URL with placeholders for `DATABASE_TYPE`, `HOST`,
  `PORT`, and `DATABASE_NAME`.
- `connection.user`: Database username retrieved from Azure Key Vault.
- `connection.password`: Database password retrieved from Azure Key Vault.
- `incrementing.column.name`: Column used for incrementing mode.
- `mode`: Mode of operation, in this case, `incrementing`.
- `table.whitelist`: Tables to include.
- `topic.prefix`: Prefix for Apache Kafka topics.
- `auto.create`: If `true`, the connector automatically creates the table in
  the target database if it does not exist.

</TabItem>
</Tabs>
