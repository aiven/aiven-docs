---
title: Connect services to Aiven Runtime
sidebar_label: Connect services
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import AppIntegrationLimitation from "@site/static/includes/runtime-app-integration-limitation.md";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Connect your deployed application to [Aiven services](/docs/products/services).
You can connect an existing Aiven for Apache Kafka®, Aiven for PostgreSQL®,
Aiven for OpenSearch®, or Aiven for Valkey™ service.

You can also define integrations when you create your application
by using [Compose files](/docs/products/runtime/manifest-files/compose-files).

<AppIntegrationLimitation/>

## Connect an Aiven service

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. In your project, click <ConsoleLabel name="runtime"/>.
1. Open your application.
1. In the **Connected services** section, click **Connect service**.
1. Select the service to connect.
1. Click **Connect**.

</TabItem>
<TabItem value="cli" label="CLI">

Use the `avn service integration-create` command. For example, to integrate
a PostgreSQL service with your application, run:

```bash
avn service integration-create \
  --project PROJECT_NAME \
  --integration-type application_service_credential \
  --source-service SERVICE_NAME \
  --dest-service APPLICATION_NAME \
  --user-config-json '{
    "service_type": "pg",
    "exposed_values": {
      "connection_string": {
        "environment_variable_key": "DATABASE_URL"
      }
    }
  }'
```
Where:
- `PROJECT_NAME` is the name of your Aiven project.
- `source-service` is the name of the data service to connect.
- `dest-service` is the name of your application.
- `service_type` is the type of data service. For example, `pg` for PostgreSQL.
- `environment_variable_key` is the environment variable your application reads for the
   connection URI. For other services, view the list of
   [default variables](/docs/products/runtime/secrets-and-variables#default-environment-variables).


</TabItem>
<TabItem value="api" label="API">

Use the
`POST /v1/project/{project}/integration` endpoint. For example, to integrate
an existing PostgreSQL service with an application:

```bash
curl -sS -X POST "https://api.aiven.io/v1/project/PROJECT_NAME/integration" \
  -H "Authorization: Bearer $AIVEN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "integration_type": "application_service_credential",
    "source_service": "prod-pg",
    "dest_service": "web-app",
    "user_config": {
      "service_type": "pg",
      "exposed_values": {
        "connection_string": {
          "environment_variable_key": "DATABASE_URL"
        }
      }
    }
  }'
```

Where:
- `PROJECT_NAME` is the name of your Aiven project.
- `source_service` is the name of the data service to integrate with your application.
- `dest_service` is the name of your application.
- `service_type` is the type of data service, for example `pg` for PostgreSQL.
- `environment_variable_key` is the environment variable your application reads for the
   connection URI. For other services, view the list of
   [default variables](/docs/products/runtime/secrets-and-variables#default-environment-variables).

</TabItem>
</Tabs>

## Connect a Karapace schema registry

To connect services that are integrated with your application
to a Karapace schema registry:

- Connect the application to the Aiven for Apache Kafka® service.
- Add the schema registry connection details as environment variables.

### Prerequisites

- An Aiven for Apache Kafka® service
   with the [Karapace schema registry enabled](/docs/products/kafka/karapace/howto/enable-karapace).
- [The connection details](/docs/products/kafka/howto/use-schema-registry-in-java#get-connection-details)
    for the schema registry.

### Connect a schema registry during application creation

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. In your project, click <ConsoleLabel name="runtime"/>.
1. Click **Deploy application**.
1. Select or connect your **GitHub account**.
1. Select your **Account**, **Repository**, and **Branch**.
1. Click **Next**.
1. Select your manifest file and click **Scan**. Aiven Runtime automatically detects
   what applications and services are needed.
1. On the Kafka service, click
   <ConsoleLabel name="swapruntimeservices"/>.
1. Select the Kafka service you created and click **Apply**.
1. To configure the integration with the schema registry,
   click <ConsoleLabel name="editappintegrationconfig"/>
   and add the connection details as environment variables.
1. To deploy the application, click **Deploy**.

</TabItem>
<TabItem value="cli" label="CLI">

When you create the application, [connect the Kafka service](#connect-an-aiven-service)
and include the schema registry details in `application.environment_variables`.

For example:

```bash
avn service create example-application \
  --project example-project \
  --service-type application \
  --plan startup-50-1024 \
  --cloud aws-eu-west-1 \
  --user-config-json '{
    "application": {
      "source": {
        "repository_url": "REPOSITORY_URL",
        "branch": "main",
        "build_path": "./",
        "containerfile_path": "Dockerfile"
      },
      "environment_variables": [
        {
          "key": "SCHEMA_REGISTRY_URL",
          "value": "SCHEMA_REGISTRY_URI",
          "kind": "variable"
        },
        {
          "key": "SCHEMA_REGISTRY_USER",
          "value": "SCHEMA_REGISTRY_USER",
          "kind": "variable"
        },
        {
          "key": "SCHEMA_REGISTRY_PASSWORD",
          "value": "SCHEMA_REGISTRY_PASSWORD",
          "kind": "secret"
        }
      ]
    }
  }'
```

Where: `SCHEMA_REGISTRY_URI`, `SCHEMA_REGISTRY_USER`, and `SCHEMA_REGISTRY_PASSWORD`
are the service URI, user, and password from the Kafka service Schema Registry
connection information.

</TabItem>
<TabItem value="api" label="API">

When you create the application, [connect the Kafka service](#connect-an-aiven-service)
and include the schema registry details in `user_config.application.environment_variables`.

For example:

```bash
curl -sS -X POST "https://api.aiven.io/v1/project/example-project/service" \
  -H "Authorization: Bearer $AIVEN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "service_name": "web-app",
    "service_type": "application",
    "plan": "startup-50-1024",
    "cloud": "aws-eu-west-1",
    "user_config": {
      "application": {
        "source": {
          "repository_url": "REPOSITORY_URL",
          "branch": "main",
          "build_path": "./",
          "containerfile_path": "Dockerfile"
        },
        "environment_variables": [
          {
            "key": "SCHEMA_REGISTRY_URL",
            "value": "SCHEMA_REGISTRY_URI",
            "kind": "variable"
          },
          {
            "key": "SCHEMA_REGISTRY_USER",
            "value": "SCHEMA_REGISTRY_USER",
            "kind": "variable"
          },
          {
            "key": "SCHEMA_REGISTRY_PASSWORD",
            "value": "SCHEMA_REGISTRY_PASSWORD",
            "kind": "secret"
          }
        ]
      }
    },
    "service_integrations": [
      {
        "integration_type": "application_service_credential",
        "source_service": "KAFKA_SERVICE_NAME",
        "user_config": {
          "service_type": "kafka",
          "exposed_values": {
            "bootstrap_servers": { "environment_variable_key": "KAFKA_BOOTSTRAP_SERVER" },
            "security_protocol": { "environment_variable_key": "KAFKA_SECURITY_PROTOCOL" },
            "access_key": { "environment_variable_key": "KAFKA_ACCESS_KEY" },
            "access_cert": { "environment_variable_key": "KAFKA_ACCESS_CERT" },
            "ca_cert": { "environment_variable_key": "KAFKA_CA_CERT" }
          }
        }
      }
    ]
  }'
```

Where:

- `KAFKA_SERVICE_NAME` is the connected Kafka service with Karapace enabled.
- `SCHEMA_REGISTRY_URI`, `SCHEMA_REGISTRY_USER`, and `SCHEMA_REGISTRY_PASSWORD`
  are the service URI, user, and password from the Kafka service
  Schema Registry connection information.

</TabItem>
</Tabs>

### Connect a schema registry to an existing application

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. In your project, click <ConsoleLabel name="runtime"/>.
1. Open your application.
1. In the **Environment variables** section, click **Edit**.
1. On the **Variables** tab, add the connection details as environment variables.
1. Click **Save**.

</TabItem>
<TabItem value="cli" label="CLI">

Use the `avn service update` command.

:::warning
This replaces the application's environment variables.
To keep the existing variables, include them in the `environment_variables` list.
To view a list of the existing environment variables, run
`avn service get APPLICATION_NAME`.
:::

For example:

```bash
avn service update example-application \
  --project example-project \
  -c 'application.environment_variables=[
    {
      "key": "SCHEMA_REGISTRY_URL",
      "value": "SCHEMA_REGISTRY_URI",
      "kind": "variable"
    },
    {
      "key": "SCHEMA_REGISTRY_USER",
      "value": "SCHEMA_REGISTRY_USER",
      "kind": "variable"
    },
    {
      "key": "SCHEMA_REGISTRY_PASSWORD",
      "value": "SCHEMA_REGISTRY_PASSWORD",
      "kind": "secret"
    }
  ]'
```

Where: `SCHEMA_REGISTRY_URI`, `SCHEMA_REGISTRY_USER`, and `SCHEMA_REGISTRY_PASSWORD`
are the service URI, user, and password from the Kafka service Schema Registry
connection information.

</TabItem>
<TabItem value="api" label="API">

Use the `PUT /v1/project/{project}/service/{service}` endpoint.

:::warning
This replaces the application's environment variables.
To keep the existing variables, include them in the `environment_variables` list.
To view a list of the existing environment variables, call
`GET /v1/project/{project}/service/{service}`.
:::

For example:

```bash
curl -sS -X PUT "https://api.aiven.io/v1/project/PROJECT_NAME/service/example-application" \
  -H "Authorization: Bearer $AIVEN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "user_config": {
      "application": {
        "environment_variables": [
          {
            "key": "SCHEMA_REGISTRY_URL",
            "value": "SCHEMA_REGISTRY_URI",
            "kind": "variable"
          },
          {
            "key": "SCHEMA_REGISTRY_USER",
            "value": "SCHEMA_REGISTRY_USER",
            "kind": "variable"
          },
          {
            "key": "SCHEMA_REGISTRY_PASSWORD",
            "value": "SCHEMA_REGISTRY_PASSWORD",
            "kind": "secret"
          }
        ]
      }
    }
  }'
```

Where: `SCHEMA_REGISTRY_URI`, `SCHEMA_REGISTRY_USER`, and `SCHEMA_REGISTRY_PASSWORD`
are the service URI, user, and password from the Kafka service Schema Registry
connection information.

</TabItem>
</Tabs>

### Connect from Node.js

Aiven Runtime provides the PostgreSQL connection URL in the configured
[environment variable](/docs/products/runtime/secrets-and-variables#default-environment-variables).

With `node-postgres`, enable libpq-compatible TLS behavior before using the generated URL:

```javascript
const { Client } = require("pg");

const databaseUrl = new URL(process.env.DATABASE_URL);
databaseUrl.searchParams.set("uselibpqcompat", "true");

const client = new Client({
  connectionString: databaseUrl.toString(),
});

await client.connect();
```

This produces a connection string equivalent to:

```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require&uselibpqcompat=true
```

:::note
`sslmode=require` encrypts the connection but does not verify the server certificate.
:::

Once Runtime generates `uselibpqcompat=true` itself, simplify the example to:

```javascript
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});
```

## Disconnect an Aiven service

<Tabs groupId="group1">
<TabItem value="console" label="Console">

1. In your project, click <ConsoleLabel name="runtime"/>.
1. Open your application.
1. In the **Connected services** section, find the service to disconnect.
1. Click <ConsoleLabel name="Actions"/> > **Disconnect service**.
1. Click **Disconnect** to confirm.

</TabItem>
<TabItem value="cli" label="CLI">

1. Get the integration ID for the connected service using
   the `service integration-list` command:

   ```bash
   avn service integration-list APPLICATION_NAME --project PROJECT_NAME
   ```

1. To remove the integration, run:

   ```bash
   avn service integration-remove APPLICATION_NAME SERVICE_INTEGRATION_ID --project PROJECT_NAME
   ```

</TabItem>
<TabItem value="api" label="API">

1. List integrations for the application and copy the `service_integration_id`
   for the `application_service_credential` integration to remove:

   ```bash
   curl -sS -X GET \
     "https://api.aiven.io/v1/project/PROJECT_NAME/service/APPLICATION_NAME/integration" \
     -H "Authorization: Bearer $AIVEN_TOKEN"
   ```

1. Delete the integration:

   ```bash
   curl -sS -X DELETE \
     "https://api.aiven.io/v1/project/PROJECT_NAME/integration/SERVICE_INTEGRATION_ID" \
     -H "Authorization: Bearer $AIVEN_TOKEN"
   ```

</TabItem>
</Tabs>

## Apply database schema changes

Aiven Runtime does not automatically support pre-deploy commands or one-off task execution.
To run database schema migrations, you can do one of the following:

- **Run migrations at container startup**: You can update the `CMD` or entrypoint of your
   Containerfile or Dockerfile so that the database schema changes are applied
   every time the container starts up.

- **Run migrations in CI/CD before deploying**: If you use a CI/CD pipeline, you can
  run migrations as a pipeline step before
  [deployment](/docs/products/runtime/deploy-apps#redeploy-an-application).
