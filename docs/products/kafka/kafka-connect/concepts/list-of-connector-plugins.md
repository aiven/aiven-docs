---
title: Available Apache Kafka® Connect connectors
sidebar_label: Available connectors
---

Discover a variety of connectors available for use with any Aiven for Apache Kafka® service with [Apache Kafka® Connect enabled](/docs/products/kafka/kafka-connect/howto/enable-connect).

## Source connectors

Source connectors enable the integration of data from an existing technology into an
Apache Kafka topic. The available source connectors include:

- [Couchbase](https://github.com/couchbase/kafka-connect-couchbase)
- [Debezium for MongoDB®](https://debezium.io/docs/connectors/mongodb/)
- [Debezium for MySQL](https://debezium.io/docs/connectors/mysql/)
- [Debezium for PostgreSQL®](/docs/products/kafka/kafka-connect/howto/debezium-source-connector-pg)
- [Debezium for SQL Server](https://debezium.io/docs/connectors/sqlserver/)
- [Debezium for PostgreSQL with TLS support](/docs/products/kafka/kafka-connect/howto/kafka-connect-debezium-tls-pg)
- [Debezium for PostgreSQL with node replacement](/docs/products/kafka/kafka-connect/howto/debezium-source-connector-pg-node-replacement)
- [Google Cloud Pub/Sub](https://github.com/googleapis/java-pubsub-group-kafka-connector/)
- [Google Cloud Pub/Sub Lite](https://github.com/googleapis/java-pubsub-group-kafka-connector/)
- [JDBC source for MySQL](/docs/products/kafka/kafka-connect/howto/jdbc-source-connector-mysql)
- [JDBC source for PostgreSQL](/docs/products/kafka/kafka-connect/howto/jdbc-source-connector-pg)
- [JDBC source for SQL Server](/docs/products/kafka/kafka-connect/howto/jdbc-source-connector-sql-server)
- [MongoDB Kafka Connector (Official)](https://www.mongodb.com/docs/kafka-connector/current/) (supports both source and sink functionality)
- [Stream Reactor Cassandra®](https://docs.lenses.io/5.1/connectors/sources/cassandrasourceconnector/)
- [Stream Reactor MQTT](https://docs.lenses.io/5.1/connectors/sources/mqttsourceconnector/)

## Sink connectors

Sink connectors enable the integration of data from an existing Apache Kafka topic to a
target technology. The available sink connectors include:

- [Amazon S3 sink connector](/docs/products/kafka/kafka-connect/howto/s3-sink-connector-aiven)
- [Azure Blob Storage sink connector](/docs/products/kafka/kafka-connect/howto/azure-blob-sink)
- [ClickHouse sink connector](https://github.com/ClickHouse/clickhouse-kafka-connect)
- [Confluent Amazon S3 sink](/docs/products/kafka/kafka-connect/howto/s3-sink-connector-confluent)
- [Couchbase®](https://github.com/couchbase/kafka-connect-couchbase)
- [Elasticsearch](/docs/products/kafka/kafka-connect/howto/elasticsearch-sink)
- [Google BigQuery](https://github.com/confluentinc/kafka-connect-bigquery)
- [Google Cloud Pub/Sub](https://github.com/googleapis/java-pubsub-group-kafka-connector/)
- [Google Cloud Pub/Sub Lite](https://github.com/googleapis/java-pubsub-group-kafka-connector/)
- [Google Cloud Storage](/docs/products/kafka/kafka-connect/howto/gcs-sink)
- [HTTP](https://github.com/aiven/http-connector-for-apache-kafka)
- [IBM MQ sink connector](/docs/products/kafka/kafka-connect/howto/ibm-mq-sink-connector)
- [InfluxDB sink connector](/docs/products/kafka/kafka-connect/howto/influx-sink)
- [JDBC sink](https://github.com/aiven/jdbc-connector-for-apache-kafka/blob/master/docs/sink-connector.md)
- [MongoDB sink (Lenses)](/docs/products/kafka/kafka-connect/howto/mongodb-sink-lenses)
- [OpenSearch®](/docs/products/kafka/kafka-connect/howto/opensearch-sink)
- [Snowflake](https://docs.snowflake.com/en/user-guide/kafka-connector)
- [Splunk](https://github.com/splunk/kafka-connect-splunk)
- [Stream Reactor Cassandra®](https://docs.lenses.io/5.1/connectors/sinks/cassandrasinkconnector/)
- [Stream Reactor InfluxDB®](https://docs.lenses.io/5.1/connectors/sinks/influxsinkconnector/)
- [Stream Reactor MongoDB®](https://docs.lenses.io/5.1/connectors/sinks/mongosinkconnector/)
- [Stream Reactor MQTT](https://docs.lenses.io/5.1/connectors/sinks/mqttsinkconnector/)
- [Stream Reactor Redis®\*](https://docs.lenses.io/5.1/connectors/sinks/redissinkconnector/)
- [S3 IAM Assume Role](/docs/products/kafka/kafka-connect/howto/s3-iam-assume-role)

## Preview connectors

![Preview icon next to an OpenSearch® Apache Kafka® Connect connector](/images/content/products/kafka/kafka-connect/preview-kafka-connect-connectors.png)

Some connectors have a preview tag. **Preview connectors are not covered by our SLA**,
so consider this before using them in production environments. Report bugs directly to
the code owner.

## Requesting new connectors

If there are connectors you'd like us to support, submit a support request. Your
feedback helps shape our roadmap. To request a new connector,
[create a support ticket](/docs/platform/howto/support#create-a-support-ticket).

Aiven evaluates new Apache Kafka Connect connectors based on:

- License compatibility
- Technical implementation
- Active repository maintenance

:::tip
When requesting connectors not on the pre-approved list, specify the target Aiven for
Apache Kafka service.
:::


------------------------------------------------------------------------

import ElasticSearch from "@site/static/includes/trademark-elasticsearch.md"

<ElasticSearch/>

import CouchBase from "@site/static/includes/trademark-couchbase.md"

<CouchBase/>
