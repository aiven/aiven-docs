---
title: Configure the ENV secret provider
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Configure and use the ENV secret provider in Aiven for Apache Kafka® Connect services.

## Prerequisites

- [Aiven for Apache Kafka service with Apache Kafka Connect](/docs/products/kafka/kafka-connect/get-started)
  set up and running.
- [Aiven CLI](/docs/tools/cli).
- [Aiven Terraform Provider](https://registry.terraform.io/providers/aiven/aiven/latest/docs)
  installed.

:::note
The ENV secret provider is not yet available in the Aiven Console.
:::

## Configure the secret provider

Configure the ENV secret provider in your Aiven for Apache Kafka Connect service to
store and reference secrets in `user_config`.

<Tabs groupId="secret-config">
<TabItem value="api" label="API" default>

Use the [ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate)
API to update your service configuration. Add the ENV secret provider configuration to
`user_config` with the following API request:

```sh
curl --request PUT \
  --url https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME \
  --header 'Authorization: Bearer AIVEN_API_TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
    "user_config": {
      "secret_providers": [
        {
          "name": "db_credentials",
          "env": {
            "secrets": {
              "db_password": "DB_PASSWORD_VALUE"
            }
          }
        }
      ]
    }
  }'
```

Parameters:

- `name`: Name of the secret provider, for example `db_credentials`.
- `env.secrets`: Map of secret keys and values stored in `user_config`.
- `db_password`: Secret key that you use later in connector configuration.

</TabItem>
<TabItem value="terraform" label="Terraform">

Configure the ENV secret provider using Terraform. Add this configuration to your
`main.tf` file, or create a dedicated file for secret providers:

```hcl
resource "aiven_kafka_connect" "kafka_connect" {
  project      = var.project_name
  cloud_name   = var.cloud_name
  plan         = var.plan
  service_name = var.service_name

  kafka_connect_user_config {
    secret_providers {
      name = "db_credentials"
      env {
        secrets = {
          db_password = var.db_password
        }
      }
    }
  }
}
```

Parameters:

- `name`: Name of the secret provider, for example `db_credentials`.
- `env.secrets`: Map of secret keys and values.
- `db_password`: Terraform variable containing the secret value.

</TabItem>
<TabItem value="cli" label="CLI">

Add the ENV secret provider using the [Aiven CLI](/docs/tools/cli):

```sh
avn service update SERVICE_NAME \
  -c secret_providers='[
    {
      "name": "db_credentials",
      "env": {
        "secrets": {
          "db_password": "DB_PASSWORD_VALUE"
        }
      }
    }
  ]'
```

Parameters:

- `SERVICE_NAME`: Name of your Aiven for Apache Kafka service.
- `name`: Name of the secret provider, for example `db_credentials`.
- `env.secrets`: Map of secret keys and values.

</TabItem>
</Tabs>

## Reference secrets in connector configurations

Reference secrets in connector configuration values using the provider name and secret
key.
Use the syntax `${PROVIDER_NAME:SECRET_KEY}`.

Example values:

- **Provider name**: `db_credentials`
- **Secret key**: `db_password`
- **Secret reference**: `${db_credentials:db_password}`

### JDBC sink connector

Example JDBC sink connector configuration that references a secret from the ENV secret
provider.

```json
{
  "name": "jdbc-sink-connector",
  "connector.class": "io.aiven.connect.jdbc.JdbcSinkConnector",
  "connection.url": "jdbc:postgresql://DB_HOST:5432/DB_NAME?user=DB_USER&password=${db_credentials:db_password}&ssl=require",
  "topics": "YOUR_TOPIC",
  "auto.create": true
}
```

### JDBC source connector

Example JDBC source connector configuration that references a secret from the ENV secret
provider.

```json
{
  "name": "jdbc-source-connector",
  "connector.class": "io.aiven.connect.jdbc.JdbcSourceConnector",
  "connection.url": "jdbc:postgresql://DB_HOST:5432/DB_NAME?ssl=require",
  "connection.user": "DB_USER",
  "connection.password": "${db_credentials:db_password}",
  "mode": "incrementing",
  "incrementing.column.name": "id",
  "table.whitelist": "YOUR_TABLE",
  "topic.prefix": "jdbc_"
}
```

## Security behavior

The ENV secret provider stores secrets in encrypted form at rest. The service decrypts
secrets in memory only when a connector resolves them at runtime.
