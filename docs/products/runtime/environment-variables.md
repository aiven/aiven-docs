---
title: Integrated service environment variables
---

Aiven Runtime provides connection details as environment variables for each connected service.
It scans Compose, Containerfile, and Dockerfile manifests during application creation.
It detects supported data services in Compose files and connects them to your application.
It reads existing variable names when they include supported connection values. If it
doesn't find a supported connection value, it suggests conventional variable names based on
relationships defined in the `depends_on` property of the Compose file.

## Default variables

The following variables are suggested by default. You can customize the variable names.

|         Service         |         Variable          |            Description             |
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
