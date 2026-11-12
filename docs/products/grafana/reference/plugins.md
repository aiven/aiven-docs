---
title: Plugins for Aiven for Grafana®
sidebar_label: Plugins
---

Aiven for Grafana includes several pre-installed plugins, updated regularly to ensure optimal performance.
For additional plugin requests, contact [Aiven support](mailto:support@aiven.io).
The available plugins depend on the Grafana version of the service.

## Panel plugins

| Plugin name | Description | Grafana versions | Links |
|---|---|---|---|
| Alert list | Allows you to display alerts on a dashboard. The list can be configured to show either the current state of your alerts or recent alert state changes | All | [Grafana](https://grafana.com/grafana/plugins/alertlist/), [Grafana Docs](https://grafana.com/docs/grafana/latest/panels-visualizations/visualizations/alert-list/) |
| Annotation list | Shows user annotations in Grafana database | All | [Grafana](https://grafana.com/grafana/plugins/ryantxu-annolist-panel/), [GitHub](https://github.com/grafana/grafana/tree/main/public/app/plugins/panel/annolist) |
| Bar chart | Graphs categorical data | All | [Grafana Docs](https://grafana.com/docs/grafana/latest/visualizations/bar-chart/) |
| Bar gauge | Reduces data fields to a single value and visualizes them as bar gauges | All | [Grafana Docs](https://grafana.com/docs/grafana/latest/visualizations/bar-gauge-panel/) |
| Candlestick | Displays price movements | All | [Grafana Docs](https://grafana.com/docs/grafana/latest/visualizations/candlestick/) |
| Clock | Displays the current time or countdown | All | [Grafana](https://grafana.com/grafana/plugins/grafana-clock-panel/), [GitHub](https://github.com/grafana/clock-panel) |
| Canvas | Provides extensible panel layouts for static and dynamic elements | All | [Grafana](https://grafana.com/grafana/plugins/canvas/) |
| D3 Gauge | Provides D3-based gauge visualizations | All | [Grafana](https://grafana.com/grafana/plugins/briangann-gauge-panel/), [GitHub](https://github.com/briangann/grafana-gauge-panel) |
| Dashboard list | Displays dynamic links to dashboards, filtered by tags or queries | All | [Grafana](https://grafana.com/grafana/plugins/dashlist/), [Grafana Docs](https://docs.grafana.org/reference/dashlist/) |
| Datagrid | Displays and edits data in a spreadsheet-like grid | 11, 12 | [Grafana Docs](https://grafana.com/docs/grafana/latest/panels-visualizations/visualizations/datagrid/) |
| Diagram | Creates flowcharts, sequence diagrams, and Gantt charts | All | [Grafana](https://grafana.com/grafana/plugins/jdbranham-diagram-panel/), [GitHub](https://github.com/jdbranham/grafana-diagram) |
| Flame graph | Visualizes profiling data as a flame graph | All | [Grafana Docs](https://grafana.com/docs/grafana/latest/panels-visualizations/visualizations/flame-graph/) |
| Gauge | Provides standard gauge visualizations | All | [Grafana](https://grafana.com/grafana/plugins/gauge), [Grafana Docs](https://grafana.com/docs/grafana/latest/panels-visualizations/visualizations/gauge/) |
| Geomap | Displays geographic data | All | [Grafana](https://grafana.com/grafana/plugins/geomap/), [Grafana Docs](https://grafana.com/docs/grafana/latest/visualizations/geomap/) |
| Graph | Provides a rich set of graphing options | 11 | [Grafana Docs](https://grafana.com/docs/grafana/next/panels-visualizations/visualizations/) |
| Heatmap | Displays histograms over time | All | [Grafana](https://grafana.com/grafana/plugins/heatmap-new/), [Grafana Docs](https://docs.grafana.org/features/panels/heatmap/) |
| Histogram | Creates histograms for time series data | All | [Grafana Docs](https://grafana.com/docs/grafana/latest/panels-visualizations/visualizations/histogram/) |
| Logs | Displays logs in a built-in panel | All | [Grafana Docs](https://grafana.com/docs/grafana-cloud/visualizations/panels-visualizations/visualizations/logs/) |
| News | Displays an RSS feed | All | [Grafana Docs](https://grafana.com/docs/grafana/latest/visualizations/news-panel/) |
| Node Graph | Visualizes node relationships | All | [Grafana Docs](https://grafana.com/docs/grafana/latest/visualizations/node-graph/) |
| Pie chart | Displays data as proportional slices of a pie or donut | All | [Grafana Docs](https://grafana.com/docs/grafana/latest/panels-visualizations/visualizations/pie-chart/) |
| Polystat | Displays multiple metrics as a grid of polygons | All | [Grafana](https://grafana.com/grafana/plugins/grafana-polystat-panel/) |
| Stat | Shows summary statistics for a single series | All | [Grafana Docs](https://docs.grafana.org/reference/singlestat/) |
| State timeline | Displays state changes over time | All | [Grafana Docs](https://grafana.com/docs/grafana/latest/visualizations/state-timeline/) |
| Status history | Displays the history of periodic status changes | All | [Grafana Docs](https://grafana.com/docs/grafana/latest/visualizations/status-history/) |
| Table | Visualizes data in time series, JSON, or annotation formats | All | [Grafana](https://grafana.com/grafana/plugins/table/) |
| Text | Displays markdown-formatted text | All | [Grafana](https://grafana.com/grafana/plugins/text/) |
| Time series | Displays time series data | All | [Grafana Docs](https://grafana.com/docs/grafana/latest/visualizations/time-series/) |
| Traces | Visualizes distributed traces | All | [Grafana Docs](https://grafana.com/docs/grafana/latest/panels-visualizations/visualizations/traces/) |
| Trend | Displays trends for data with numeric X values | All | [Grafana Docs](https://grafana.com/docs/grafana/latest/panels-visualizations/visualizations/trend/) |
| Worldmap Panel | Dashboards that use the Worldmap panel are automatically converted to Geomap | All | [Grafana Docs](https://grafana.com/docs/grafana/latest/panels-visualizations/visualizations/geomap/) |
| XY Chart | Visualizes X vs Y graphing for arbitrary data points | All | [Grafana](https://grafana.com/grafana/plugins/xychart/) |

## Data source plugins

| Plugin name | Description | Grafana versions | Links |
|---|---|---|---|
| Alertmanager | Integrates the built-in Alertmanager data source | All | [Grafana Docs](https://grafana.com/docs/grafana/latest/datasources/alertmanager/) |
| Altinity plugin for ClickHouse® | Integrates ClickHouse as a backend database. This is the community plugin `vertamedia-clickhouse-datasource` | All | [Grafana](https://grafana.com/grafana/plugins/vertamedia-clickhouse-datasource/), [GitHub](https://github.com/Altinity/clickhouse-grafana) |
| Azure Monitor | Monitors Azure resources | All | [Grafana](https://grafana.com/grafana/plugins/grafana-azure-monitor-datasource/), [GitHub](https://github.com/grafana/azure-monitor-datasource) |
| ClickHouse | Integrates the official ClickHouse data source | All | [Grafana](https://grafana.com/grafana/plugins/grafana-clickhouse-datasource/) |
| CloudWatch | Builds dashboards for CloudWatch metrics | All | [Grafana](https://grafana.com/grafana/plugins/cloudwatch/), [Grafana Docs](https://docs.grafana.org/datasources/cloudwatch/) |
| Elasticsearch | Visualizes logs or metrics stored in Elasticsearch | All | [Grafana](https://grafana.com/grafana/plugins/elasticsearch/), [Grafana Docs](https://docs.grafana.org/datasources/elasticsearch/) |
| GitHub | Visualizes GitHub API data in dashboards | All | [GitHub](https://github.com/grafana/github-datasource) |
| Google BigQuery | Integrates BigQuery as a backend database | All | [Grafana](https://grafana.com/grafana/plugins/grafana-bigquery-datasource/) |
| Google Sheets | Visualizes Google Sheets data | All | [Grafana](https://grafana.com/grafana/plugins/grafana-googlesheets-datasource/), [GitHub](https://github.com/grafana/google-sheets-datasource) |
| Graphite | Provides various metric functions and navigation | All | [Grafana](https://grafana.com/grafana/plugins/graphite/), [Grafana Docs](https://docs.grafana.org/datasources/graphite/) |
| Infinity | Queries data from JSON, CSV, XML, GraphQL, and HTML sources | All | [Grafana](https://grafana.com/grafana/plugins/yesoreyeram-infinity-datasource/) |
| InfluxDB® | Queries and visualizes InfluxDB data | All | [Grafana](https://grafana.com/grafana/plugins/influxdb/), [Grafana Docs](https://docs.grafana.org/datasources/influxdb/) |
| Instana | Visualizes Instana APM metrics | All | [Grafana](https://grafana.com/grafana/plugins/instana-datasource/), [GitHub](https://github.com/instana/instana-grafana-datasource) |
| Jaeger | Provides distributed tracing | All | [Grafana](https://grafana.com/grafana/plugins/jaeger/), [Grafana Docs](https://grafana.com/docs/grafana/latest/datasources/jaeger/) |
| Loki | Queries and visualizes logs from Loki | All | [Grafana](https://grafana.com/grafana/plugins/loki/), [Grafana Docs](https://grafana.com/docs/grafana/latest/datasources/loki/) |
| Microsoft SQL Server | Queries and visualizes data from Microsoft SQL Server | All | [Grafana](https://grafana.com/grafana/plugins/mssql/), [Grafana Docs](https://grafana.com/docs/grafana/latest/datasources/mssql/) |
| MySQL | Queries and visualizes data from MySQL databases | All | [Grafana](https://grafana.com/grafana/plugins/mysql/), [Grafana Docs](https://docs.grafana.org/features/datasources/mysql/) |
| OpenSearch® | Runs OpenSearch queries and visualizes metrics or logs | All | [Grafana](https://grafana.com/grafana/plugins/grafana-opensearch-datasource/) |
| OpenTSDB | Provides a scalable time series database | All | [Grafana](https://grafana.com/grafana/plugins/opentsdb/), [Grafana Docs](https://docs.grafana.org/datasources/opentsdb/) |
| Parca | Visualizes continuous profiling data from Parca | 11, 12 | [Grafana](https://grafana.com/grafana/plugins/parca/), [Grafana Docs](https://grafana.com/docs/grafana/latest/datasources/parca/) |
| PostgreSQL® | Queries and visualizes data from PostgreSQL databases | All | [Grafana](https://grafana.com/grafana/plugins/postgres/), [Grafana Docs](https://docs.grafana.org/features/datasources/postgres/) |
| Prometheus | Visualizes Prometheus time series data | All | [Grafana](https://grafana.com/grafana/plugins/prometheus/), [Grafana Docs](https://docs.grafana.org/datasources/prometheus/) |
| Prometheus AlertManager | Integrates Prometheus AlertManager API to create dashboards | All | [GitHub](https://github.com/camptocamp/grafana-prometheus-alertmanager-datasource) |
| Pyroscope | Visualizes continuous profiling data from Pyroscope | All | [Grafana](https://grafana.com/grafana/plugins/grafana-pyroscope-datasource/) |
| Stackdriver / Google Cloud Monitoring | Monitors data from Google Cloud Monitoring | All | [Grafana](https://grafana.com/grafana/plugins/grafana-stackdriver-datasource/), [Grafana Docs](https://grafana.com/docs/grafana/latest/datasources/google-cloud-monitoring/) |
| Tempo | Provides high-volume trace storage | All | [Grafana](https://grafana.com/grafana/plugins/tempo/), [Grafana Docs](https://grafana.com/docs/grafana/latest/datasources/tempo/) |
| TestData DB | Generates various forms of test data | All | [Grafana](https://grafana.com/grafana/plugins/grafana-testdata-datasource/), [Grafana Docs](https://grafana.com/docs/grafana/latest/datasources/testdata/) |
| Zipkin | Distributed tracing for visualizing microservices data | All | [Grafana](https://grafana.com/grafana/plugins/zipkin/), [Grafana Docs](https://grafana.com/docs/grafana/latest/datasources/zipkin/) |

## Other plugins

| Plugin name | Description | Grafana versions | Links |
|---|---|---|---|
| Grafana Image Renderer | Renders panels and dashboards to PNG images using a headless browser | 11, 12 | [Grafana](https://grafana.com/grafana/plugins/grafana-image-renderer/), [GitHub](https://github.com/grafana/grafana-image-renderer) |
| Logs Drilldown | Explores Loki logs without writing queries | 12, 13 | [Grafana](https://grafana.com/grafana/plugins/grafana-lokiexplore-app/) |
| Metrics Drilldown | Explores Prometheus-compatible metrics without writing queries | 12, 13 | [Grafana](https://grafana.com/grafana/plugins/grafana-metricsdrilldown-app/) |
| Profiles Drilldown | Explores Pyroscope profiling data without writing queries | 12, 13 | [Grafana](https://grafana.com/grafana/plugins/grafana-pyroscope-app/) |
| Synthetic Monitoring | Monitors availability and performance with synthetic checks | 11, 12 | [Grafana](https://grafana.com/grafana/plugins/grafana-synthetic-monitoring-app/) |
| Traces Drilldown | Explores Tempo traces without writing queries | 12, 13 | [Grafana](https://grafana.com/grafana/plugins/grafana-exploretraces-app/) |
| Zabbix | Provides a data source and a triggers panel for Zabbix metrics | All | [Grafana](https://grafana.com/grafana/plugins/alexanderzobnin-zabbix-app/), [GitHub](https://github.com/alexanderzobnin/grafana-zabbix) |

import ElasticSearch from "@site/static/includes/trademark-elasticsearch.md"

<ElasticSearch/>
