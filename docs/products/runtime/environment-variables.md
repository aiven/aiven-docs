---
title: Integrated service environment variables
---

Aiven Runtime exposes connection details as environment variables for connected data services.
During application creation, you can select a Compose, Containerfile, or Dockerfile
manifest to scan. For Compose files, Aiven detects supported data service images,
and suggests Aiven services and integrations. If an environment variable in the Compose
file points to one of those detected data services, Aiven uses that variable name.
Otherwise, if you listed the service in the `depends_on` property of the Compose file,
a default environment variable name is suggested.

The environment variables are required for the integrations,
but you can customize the variable names.

## Default environment variables

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

## Credential formats

Each service type supports one credential format. PostgreSQL, Valkey, and OpenSearch
provide a complete connection URI. Separate host, port, username, and password
variables are not supported. Kafka credentials use the five separate variables
listed in the table.

Review integration suggestions before deployment. If your application expects a different
format, update it to consume the supplied connection URI or Kafka variables. For example,
if an application expects separate `PGHOST` and `PGPASSWORD` variables, update it to use
`DATABASE_URL` instead.
