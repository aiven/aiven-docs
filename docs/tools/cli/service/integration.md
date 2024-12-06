---
title: avn service integration
---

A full list of commands for `avn service integration`.

## Manage Aiven internal and external integrations

### `avn service integration-create` {#avn_service_integration_create}

Creates a new service integration.

|       Parameter        |                                        Information                                        |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| `--integration-type`   | The [integration type](/docs/tools/cli/service/integration#avn_service_integration_types) |
| `--source-service`     | The integration source service                                                            |
| `--dest-service`       | The integration destination service                                                       |
| `--source-endpoint-id` | The integration source endpoint ID                                                        |
| `--dest-endpoint-id`   | The integration destination endpoint ID                                                   |
| `--user-config-json`   | The integration parameters as JSON string or path to file preceded by `@`               |
| `-c KEY=VALUE`         | The custom configuration settings.                                                        |

:::tip
Endpoint IDs are used when creating an integration with external
services. To get an integration endpoint ID use the
[dedicated endpoint list](/docs/tools/cli/service/integration#avn_service_integration_endpoint_list) command.
:::

:::note
Both the `--user-config-json` and `-c` flags provide a way to customise
the service integration using different methods. Only one of the flags are
allowed per command. When using both in the same command, an error is
shown:

```text
ERROR   command failed: UserError: -c (user config) and --user-config-json parameters
cannot be used at the same time
```

:::

**Example:** Create a `kafka_logs` service integration to send the
logs of the service named `demo-pg` to an Aiven for Kafka service named
`demo-kafka` in the topic `test_log`.

```bash
avn service integration-create            \
  --integration-type kafka_logs           \
  --source-service demo-pg                \
  --dest-service demo-kafka               \
  -c 'kafka_topic=test_log'
```

### `avn service integration-delete`

Deletes a service integration.

|    Parameter     |             Information             |
| ---------------- | ----------------------------------- |
| `integration-id` | The ID of the integration to delete |

**Example:** Delete the integration with id
`8e752fa9-a0c1-4332-892b-f1757390d53f`.

```bash
avn service integration-delete 8e752fa9-a0c1-4332-892b-f1757390d53f
```

### `avn service integration-endpoint-create` {#avn_service_integration_endpoint_create}

Creates an external service integration endpoint.

| Parameter            | Information                                                                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `--endpoint-name`    | The name of the endpoint                                                                                                                        |
| `--endpoint-type`    | The [endpoint type](/docs/tools/cli/service/integration#avn%20service%20integration%20endpoint%20types)  |
| `--user-config-json` | The endpoint configuration in JSON format or as path to a file preceded by `@`                                                                |
| `-c KEY=VALUE`       | The custom configuration settings.                                                                                                              |

**Example:** Create an external Apache Kafka® endpoint named
`demo-ext-kafka`.

```bash
avn service integration-endpoint-create --endpoint-name demo-ext-kafka \
    --endpoint-type external_kafka  \
    --user-config-json  '{"bootstrap_servers":"servertest:123","security_protocol":"PLAINTEXT"}'
```

:::note
For more examples of creating external Apache Kafka® endpoints, see [Integrate Aiven for Apache Flink® with Apache Kafka®](/docs/products/flink/howto/ext-kafka-flink-integration#step-4-create-an-external-apache-kafka-endpoint).
:::

**Example:** Create an external Loggly endpoint named `Loggly-ext`.

```bash
avn service integration-endpoint-create         \
  --endpoint-name Loggly-ext                    \
  -d loggly -t rsyslog                          \
  -c server=logs-01.loggly.com                  \
  -c port=6514                                  \
  -c format=rfc5424                             \
  -c tls=true                                   \
  -c sd='TOKEN@NNNNN TAG="tag-of-your-choice"'  \
  -c ca='loggly-tls-cert'
```

### `avn service integration-endpoint-delete`

Deletes a service integration endpoint.

|   Parameter   |           Information            |
| ------------- | -------------------------------- |
| `endpoint-id` | The ID of the endpoint to delete |

**Example:** Delete the endpoint with ID
`97590813-4a58-4c0c-91fd-eef0f074873b`.

```bash
avn service integration-endpoint-delete 97590813-4a58-4c0c-91fd-eef0f074873b
```

### `avn service integration-endpoint-list` {#avn_service_integration_endpoint_list}

Lists all service integration endpoints available in a selected project.

**Example:** Lists all service integration endpoints available in the
selected project.

```bash
avn service integration-endpoint-list
```

An example of `avn service integration-endpoint-list` output:

```text
ENDPOINT_ID                           ENDPOINT_NAME     ENDPOINT_TYPE
====================================  ================  ==============
97590813-4a58-4c0c-91fd-eef0f074873b  datadog instance  datadog
821e0144-1503-42db-aa9f-b4aa34c4af6b  demo-ext-kafka    external_kafka
```

### `avn service integration-endpoint-types-list` {#avn service integration endpoint types}

Lists all available integration endpoint types for given project.

**Example:** Lists all service integration endpoint types available in
the selected project.

```bash
avn service integration-endpoint-types-list
```

An example of `avn service integration-endpoint-types-list` output:

```text
TITLE                                        ENDPOINT_TYPE                    SERVICE_TYPES
===========================================  ===============================  =====================================================================================================================================================================================================================
Send service metrics to Datadog              datadog                          cassandra, elasticsearch, kafka, kafka_connect, kafka_mirrormaker, mysql, pg, redis
Send service logs to AWS CloudWatch          external_aws_cloudwatch_logs     alerta, alertmanager, cassandra, clickhouse, elasticsearch, flink, grafana, kafka, kafka_connect, kafka_mirrormaker, m3aggregator, m3coordinator, m3db, mysql, opensearch, pg, redis, sw
Send service metrics to AWS CloudWatch       external_aws_cloudwatch_metrics  cassandra, elasticsearch, kafka, kafka_connect, kafka_mirrormaker, mysql, pg, redis
Send service logs to external Elasticsearch  external_elasticsearch_logs      alerta, alertmanager, cassandra, clickhouse, elasticsearch, flink, grafana, kafka, kafka_connect, kafka_mirrormaker, m3aggregator, m3coordinator, m3db, mysql, opensearch, pg, redis, sw
Send service logs to Google Cloud Logging    external_google_cloud_logging    alerta, alertmanager, cassandra, clickhouse, elasticsearch, flink, grafana, kafka, kafka_connect, kafka_mirrormaker, m3aggregator, m3coordinator, m3db, mysql, opensearch, pg, redis, sw
Integrate external Kafka cluster             external_kafka                   alerta, alertmanager, cassandra, clickhouse, elasticsearch, flink, grafana, kafka, kafka_connect, kafka_mirrormaker, kafka_mirrormaker, m3aggregator, m3coordinator, m3db, mysql, opensearch, pg, redis, sw
Integrate external Schema Registry           external_schema_registry         kafka
Access JMX metrics via Jolokia               jolokia                          kafka, kafka_connect, kafka_mirrormaker
Send service metrics to Prometheus           prometheus                       cassandra, elasticsearch, kafka, kafka_connect, kafka_mirrormaker, mysql, pg, redis
Send service logs to remote syslog           rsyslog                          alerta, alertmanager, cassandra, clickhouse, elasticsearch, flink, grafana, kafka, kafka_connect, kafka_mirrormaker, m3aggregator, m3coordinator, m3db, mysql, opensearch, pg, redis, sw
Send service metrics to SignalFX             signalfx                         kafka
```

### `avn service integration-endpoint-update`

Updates a service integration endpoint.

|      Parameter       |                                   Information                                    |
| -------------------- | -------------------------------------------------------------------------------- |
| `endpoint-id`        | The ID of the endpoint                                                           |
| `--user-config-json` | The endpoint configuration in JSON format or as path to a file preceded by `@` |
| `-c KEY=VALUE`       | The custom configuration settings.                                               |

**Example:** Update an external Apache Kafka® endpoint with id
`821e0144-1503-42db-aa9f-b4aa34c4af6b`.

```bash
avn service integration-endpoint-update 821e0144-1503-42db-aa9f-b4aa34c4af6b \
    --user-config-json  '{"bootstrap_servers":"servertestABC:123","security_protocol":"PLAINTEXT"}'
```

### `avn service integration-list` {#avn_service_integration_list}

Lists the integrations defined for a selected service.

|   Parameter    |       Information       |
| -------------- | ----------------------- |
| `service_name` | The name of the service |

**Example:** List all integrations for the service named `demo-pg`.

```bash
avn service integration-list demo-pg
```

An example of `account service integration-list` output:

```text
SERVICE_INTEGRATION_ID                SOURCE        DEST        INTEGRATION_TYPE  ENABLED  ACTIVE  DESCRIPTION
====================================  ============  ==========  ================  =======  ======  ============================================================
0e431dab-175a-4029-b417-d74a6437af1a  demo-grafana  demo-pg     dashboard         true     true    Provide a datasource for Grafana service
(integration not enabled)             demo-grafana  demo-pg     datasource        false    false   Provide a datasource for Grafana service (without dashboard)
(integration not enabled)             demo-kafka    demo-pg     metrics           false    false   Receive service metrics from service
8e752fa9-a0c1-4332-892b-f1757390d53f  demo-pg       demo-kafka  kafka_logs        true     true    Send logs to Kafka
(integration not enabled)             demo-pg       demo-pg     metrics           false    false   Send service metrics to M3 or PostgreSQL service
```

### `avn service integration-types-list` {#avn_service_integration_types}

Lists all available integration types for given project.

**Example:** List all integration types for the currently selected
project.

```bash
avn service integration-types-list
```

An example of `account service integration-types-list` output:

```text
INTEGRATION_TYPE                 DEST_DESCRIPTION                                                      DEST_SERVICE_TYPE                SOURCE_DESCRIPTION                                          SOURCE_SERVICE_TYPES
===============================  ====================================================================  ===============================  ==========================================================  ==================================================================================================================================================================================================
alertmanager                     Runs alert rules against time series databases and sends to Opsgenie  alertmanager                     Provide a datasource for Alertmanager service               m3coordinator
datadog                          Receive service metrics from service                                  datadog                          Send service metrics to Datadog endpoint                    cassandra, elasticsearch, kafka, kafka_connect, kafka_mirrormaker, mysql, pg, redis
datasource                       Provide a datasource for Grafana service (without dashboard)          elasticsearch                    Grafana datasource                                          grafana
datasource                       Provide a datasource for Kafka Connect service                        alerta                           Kafka Connect datasource                                    kafka, kafka_connect
datasource                       Provide a datasource for PostgreSQL service                           pg                               PostgreSQL datasource                                       pg
datasource                       Provide a datasource for Elasticsearch service                        elasticsearch                    Elasticsearch datasource                                    elasticsearch
...
schema_registry_proxy            Proxy Schema Registry requests                                        kafka                                                                                        external_schema_registry
signalfx                         Receive service metrics from service                                  signalfx                         Send service metrics to SignalFX                            kafka
```

### `avn service integration-update` {#avn service integration-update}

Updates an existing service integration.

|      Parameter       |                                 Information                                 |
| -------------------- | --------------------------------------------------------------------------- |
| `integration_id`     | The ID of integration                                                       |
| `--user-config-json` | The integration parameters as JSON string or path to file (preceded by `@`) |
| `-c KEY=VALUE`       | The custom configuration settings.                                          |

**Example:** Update the service integration with ID
`8e752fa9-a0c1-4332-892b-f1757390d53f` changing the Aiven for Kafka
topic storing the logs to `test_pg_log`.

```bash
avn service integration-update 8e752fa9-a0c1-4332-892b-f1757390d53f \
  -c 'kafka_topic=test_pg_log'
```

import ElasticSearch from "@site/static/includes/trademark-elasticsearch.md"

<ElasticSearch/>
