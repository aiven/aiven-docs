---
title: Services
sidebar_label: Overview
---

import Card from "@site/src/components/non-swizzled/Card";
import GridContainer from "@site/src/components/non-swizzled/GridContainer";
import Cassandra from "@site/static/images/logos/cassandra.svg";
import ClickHouse from "@site/static/images/logos/clickhouse.svg";
import Dragonfly from "@site/static/images/logos/dragonfly.svg";
import Opensearch from "@site/static/images/logos/opensearch.svg";
import Flink from "@site/static/images/logos/flink.svg";
import Grafana from "@site/static/images/logos/grafana.svg";
import Kafka from "@site/static/images/logos/kafka.svg";
import MySQL from "@site/static/images/logos/mysql.svg";
import PG from "@site/static/images/logos/pg.svg";
import Valkey from "@site/static/images/logos/valkey.svg";
import AlloyDBOmni from "@site/static/images/logos/alloydbomni.svg";

Use our fully managed services to stream, store, or serve your data. Deploy individual services and advanced data pipelines in minutes.

## Stream

<GridContainer>
  <Card
    to="/docs/products/kafka"
    iconComponent={Kafka}
    title="Aiven for Apache Kafka®"
    description="Build your streaming data pipelines."
  />
  <Card
    to="/docs/products/flink"
    iconComponent={Flink}
    title="Aiven for Apache Flink®"
    description="Control your event-driven applications and streaming analytics needs."
  />
</GridContainer>

## Store

<GridContainer>
  <Card
    to="/docs/products/postgresql"
    iconComponent={PG}
    title="Aiven for PostgreSQL®"
    description="The object-relational database with exentions and Aiven's AI capabilities."
  />
  <Card
    to="/docs/products/alloydbomni"
    iconComponent={AlloyDBOmni}
    title="Aiven for AlloyDB Omni"
    description="The high-performance PostgreSQL-compatible database with columnar engine and built-in AI capabilities"
  />
  <Card
    to="/docs/products/mysql"
    iconComponent={MySQL}
    title="Aiven for MySQL"
    description="The relational database with all the integrations you need."
  />
  <Card
    to="/docs/products/valkey"
    iconComponent={Valkey}
    title="Aiven for Valkey"
    description="An in-memory NoSQL database with a small footprint and high performance."
  />
  <Card
    to="/docs/products/dragonfly"
    iconComponent={Dragonfly}
    title="Aiven for Dragonfly"
    description="A scalable in-memory data store for high-performance."
  />
  <Card
    to="/docs/products/cassandra"
    iconComponent={Cassandra}
    title="Aiven for Apache Cassandra®"
    description="The distributed NoSQL database providing scalability, high availability, and excellent fault tolerance"
  />
</GridContainer>

## Serve

<GridContainer>
  <Card
    to="/docs/products/opensearch"
    iconComponent={Opensearch}
    title="Aiven for OpenSearch®"
    description="Explore and visualize your data with dashboard and plugins."
  />
  <Card
    to="/docs/products/clickhouse"
    iconComponent={ClickHouse}
    title="Aiven for ClickHouse®"
    description="The cloud data warehouse to generate real-time analytical data."
  />
  <Card
    to="/docs/products/grafana"
    iconComponent={Grafana}
    title="Aiven for Grafana®"
    description="Create dashboards and observe your data."
  />
</GridContainer>
