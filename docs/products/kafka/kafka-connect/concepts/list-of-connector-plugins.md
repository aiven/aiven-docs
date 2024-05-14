---
title: List of available Apache Kafka® Connect connectors
---

The following connectors can be used in any Aiven for Apache Kafka®
services with Apache Kafka Connect enabled.

## Source connectors

Source connectors enable the integration of data from an existing
technology into an Apache Kafka topic. The following is the list of
available source connectors:

-   [Couchbase](https://github.com/couchbase/kafka-connect-couchbase)
-   [Official
    MongoDB®](https://www.mongodb.com/docs/kafka-connector/current/)
-   [Debezium for
    MongoDB®](https://debezium.io/docs/connectors/mongodb/)
-   [Debezium for MySQL](https://debezium.io/docs/connectors/mysql/)
-   [Debezium for PostgreSQL®](/docs/products/kafka/kafka-connect/howto/debezium-source-connector-pg)
-   [Debezium for SQL
    Server](https://debezium.io/docs/connectors/sqlserver/)
-   [Google Cloud
    Pub/Sub](https://github.com/googleapis/java-pubsub-group-kafka-connector/)
-   [Google Cloud Pub/Sub
    Lite](https://github.com/googleapis/java-pubsub-group-kafka-connector/)
-   [JDBC](https://github.com/aiven/jdbc-connector-for-apache-kafka/blob/master/docs/source-connector.md)
-   Schema Source
-   [Stream Reactor
    Cassandra®](https://docs.lenses.io/5.1/connectors/sources/cassandrasourceconnector/)
-   [Stream Reactor
    MQTT](https://docs.lenses.io/5.1/connectors/sources/mqttsourceconnector/)

## Sink connectors

Sink connectors enable the integration of data from an existing Apache
Kafka topic to a target technology. The following is the list of
available sink connectors:

-   [Aiven for Apache Kafka® S3 Sink Connector](/docs/products/kafka/kafka-connect/howto/s3-sink-connector-aiven)
-   [Confluent Amazon S3
    Sink](https://docs.aiven.io/docs/products/kafka/kafka-connect/howto/s3-sink-connector-confluent)
-   [Couchbase®](https://github.com/couchbase/kafka-connect-couchbase)
-   [OpenSearch®](/docs/products/kafka/kafka-connect/howto/opensearch-sink)
-   [Elasticsearch](/docs/products/kafka/kafka-connect/howto/elasticsearch-sink)
-   [Google
    BigQuery](https://github.com/confluentinc/kafka-connect-bigquery)
-   [Google Cloud
    Pub/Sub](https://github.com/googleapis/java-pubsub-group-kafka-connector/)
-   [Google Cloud Pub/Sub
    Lite](https://github.com/googleapis/java-pubsub-group-kafka-connector/)
-   [Google Cloud Storage](/docs/products/kafka/kafka-connect/howto/gcs-sink)
-   [HTTP](https://github.com/aiven/http-connector-for-apache-kafka)
-   [JDBC](https://github.com/aiven/jdbc-connector-for-apache-kafka/blob/master/docs/sink-connector.md)
-   [Official
    MongoDB®](https://docs.mongodb.com/kafka-connector/current/)
-   [Snowflake](https://docs.snowflake.net/manuals/user-guide/kafka-connector.html)
-   [Splunk](https://github.com/splunk/kafka-connect-splunk)
-   [Stream Reactor
    Cassandra®](https://docs.lenses.io/5.1/connectors/sinks/cassandrasinkconnector/)
-   [Stream Reactor
    InfluxDB®](https://docs.lenses.io/5.1/connectors/sinks/influxsinkconnector/)
-   [Stream Reactor
    MongoDB®](https://docs.lenses.io/5.1/connectors/sinks/mongosinkconnector/)
-   [Stream Reactor
    MQTT](https://docs.lenses.io/5.1/connectors/sinks/mqttsinkconnector/)
-   [Stream Reactor
    Redis®\*](https://docs.lenses.io/5.1/connectors/sinks/redissinkconnector/)

## Preview connectors

![Preview icon next to an OpenSearch® Apache Kafka® Connect connector](/images/content/products/kafka/kafka-connect/preview-kafka-connect-connectors.png)

Some of the available connectors have the tag next to the name.
**Preview connectors do not come under our SLA**, consider this before
using them for production purposes. Bugs should be reported to the code
owner directly.

## Requesting new connectors

If you know about new and interesting connectors you'd like us to
support, please open a support request about it to help us shaping the
future roadmap. You can request adding support of a new connector by
creating a support ticket. We will evaluate the requested connector and
might add support for it.

Aiven evaluation process for new Apache Kafka Connect connectors checks:

-   license compatibility
-   technical implementation
-   active repository maintenance

:::tip
When requesting connectors that are not on the pre-approved list through
a support ticket, specify the target Aiven for Apache Kafka service
you'd like to have it installed to.
:::

------------------------------------------------------------------------

import ElasticSearch from "@site/static/includes/trademark-elasticsearch.md"

<ElasticSearch/>

import CouchBase from "@site/static/includes/trademark-couchbase.md"

<CouchBase/>
