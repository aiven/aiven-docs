---
title: Manage secrets and environment variables for Aiven Runtime
sidebar_label: Manage secrets and variables
---

import ConsoleLabel from "@site/src/components/ConsoleIcons"

Environment variables and secrets let you configure your application at runtime instead of embedding settings and sensitive information into your code.
You can use them to pass information like API keys and database connection details to the
application. This keeps sensitive data safe and makes it easy to adjust how your
application behaves in different setups.

Aiven Runtime also automatically exposes connection details as
environment variables for connected data services.

## Manage secrets and environment variables for an application

When you edit secrets and environment variables, Aiven
redeploys your application with the new configuration. It deploys the same commit
from your Git branch that was deployed previously. To deploy the latest commit,
you can manually [redeploy your app](/docs/products/runtime/deploy-apps#redeploy-an-application).

1. In your project, click <ConsoleLabel name="runtime"/>.
1. Open your application.
1. On the **Overview** page, go to **Environment variables**.
1. Click **Edit**.
1. To add a secret, on the **Secrets** tab, click **Add secret**.
   To add an environment variable, on the **Variables** tab, click **Add variable**.
1. Click **Save**.

## Integrated service environment variables

During application creation, you can select a Compose, Containerfile, or Dockerfile
manifest to scan. For Compose files, Aiven detects supported data service images,
and suggests Aiven services and integrations. If an environment variable in the Compose
file points to one of those detected data services, Aiven uses that variable name.
Otherwise, if you listed the service in the `depends_on` property of the Compose file,
a default environment variable name is suggested.

The environment variables are required for the integrations,
but you can customize the variable names.

### Default environment variables

The following environment variables are added by default:

|         Service         |            Key            |               Value                |
| ----------------------- | ------------------------- | ---------------------------------- |
| Aiven for PostgreSQL®   | `DATABASE_URL`            | The complete service URI.          |
| Aiven for Valkey™       | `VALKEY_URL`              | The complete service URI.          |
| Aiven for OpenSearch®   | `OPENSEARCH_URI`          | The complete service URI.          |
| Aiven for Apache Kafka® | `KAFKA_BOOTSTRAP_SERVERS` | The service connection address.    |
| Aiven for Apache Kafka® | `KAFKA_SECURITY_PROTOCOL` | Set to `SSL`.                      |
| Aiven for Apache Kafka® | `KAFKA_ACCESS_KEY`        | The access key.                    |
| Aiven for Apache Kafka® | `KAFKA_ACCESS_CERT`       | The access certificate.            |
| Aiven for Apache Kafka® | `KAFKA_CA_CERT`           | The trusted CA certificate bundle. |

### Credential formats

Each service type supports one credential format. PostgreSQL, Valkey, and OpenSearch
provide a complete connection URI. Separate host, port, username, and password
variables are not supported. Kafka credentials use the five separate variables
listed in the table.

Review integration suggestions before deployment. If your application expects a different
format, update it to consume the supplied connection URI or Kafka variables. For example,
if an application expects separate `PGHOST` and `PGPASSWORD` variables, update it to use
`DATABASE_URL` instead.
