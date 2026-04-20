---
title: Services
sidebar_label: Overview
---

import Card from "@site/src/components/Card";
import GridContainer from "@site/src/components/GridContainer";
import ClickHouse from "@site/static/images/logos/clickhouse.svg";
import Dragonfly from "@site/static/images/logos/dragonfly.svg";
import Opensearch from "@site/static/images/logos/Opensearch.svg";
import Flink from "@site/static/images/logos/flink.svg";
import Grafana from "@site/static/images/logos/Grafana.svg";
import Kafka from "@site/static/images/logos/Apache Kafka.svg";
import MySQL from "@site/static/images/logos/MySQL.svg";
import PG from "@site/static/images/logos/PostgreSQL.svg";
import Valkey from "@site/static/images/logos/Valkey.svg";
import Metrics from "@site/static/images/logos/Metrics.svg";
import DataHub from "@site/static/images/logos/DataHub.svg";

Deploy fully managed and scalable open source data technologies as individual services and advanced data pipelines in minutes.

## Streaming

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

## Databases

<GridContainer>
  <Card
    to="/docs/products/postgresql"
    iconComponent={PG}
    title="Aiven for PostgreSQL®"
    description="The object-relational database with exentions and Aiven's AI capabilities."
  />
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
    to="/docs/products/valkey"
    iconComponent={Valkey}
    title="Aiven for Valkey™"
    description="An in-memory NoSQL database with a small footprint and high performance."
  />
  <Card
    to="/docs/products/mysql"
    iconComponent={MySQL}
    title="Aiven for MySQL®"
    description="The relational database with all the integrations you need."
  />
  <Card
    to="/docs/products/dragonfly"
    iconComponent={Dragonfly}
    title="Aiven for Dragonfly"
    description="A scalable in-memory data store for high-performance."
  />
  <Card
    to="/docs/products/metrics"
    iconComponent={Metrics}
    title="Aiven for Metrics"
    description="Fully managed Thanos metrics – a cost-effective, open source Prometheus solution."
  />
  <Card
    to="/docs/products/grafana"
    iconComponent={Grafana}
    title="Aiven for Grafana®"
    description="Create dashboards and observe your data."
  />
</GridContainer>

## Managed apps

<GridContainer>
  <Card
    to="/docs/products/datahub"
    iconComponent={DataHub}
    title="Aiven for DataHub"
    description="Unified governance tool for data discovery, documentation, and lineage."
  />
</GridContainer>
