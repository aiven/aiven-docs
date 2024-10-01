---
title: Aiven for Metrics
---

Aiven for Metrics, powered by Thanos, simplifies the management and analysis of large volumes of metrics data. The service is scalable, reliable, and efficient, suitable for organizations of all sizes.
This service simplifies the management of large-scale metrics systems, allowing
organizations to focus on deriving insights from their data.

## Key components

Aiven for Metrics includes several core Thanos components:

- **Thanos Metrics Query**: Enables users to query and visualize metrics from real-time
  and historical data sources, aggregating data from various sources for a unified view.
- **Thanos Metrics Receiver**: Handles metrics ingestion into the system, acting as a receiver
  for Prometheus remote write requests to enable real-time metrics collection.
- **Thanos Metrics Store**: Interfaces with object storage to provide access to historical
  data, ensuring scalable and reliable long-term storage.
- **Thanos Metrics Compact**: Enhances storage usage and query efficiency by compacting
  and downsampling data stored in object storage, improving performance and
  reducing costs.
- **Thanos Query Frontend**: Caches query results and splits large queries into
  smaller sub-queries for efficient execution across multiple Thanos Query instances.

## Unified cluster architecture

Aiven for Metrics combines these components into a cohesive cluster architecture.
This setup ensures a seamless data flow from ingestion (via Thanos Metrics Receive) to
long-term storage (in object storage through Thanos Metrics Store) and efficient querying
(through Thanos Metrics Query). The Thanos Compact component optimizes data storage and
retrieval processes in the background, keeping the system efficient and cost-effective.

Aiven for Metrics combines these components into a cohesive cluster architecture,
enhancing metrics management:

- **Data collection and storage**: Thanos Metrics Receivers collect metrics in real-time
  and store them in object storage after the Time Series Database (TSDB) block is full,
  typically every 2 hours.

- **Query processing**: The Thanos Query Frontend receives requests and optimizes
  load distribution by forwarding requests to Thanos Metrics Query. Depending on
  the query's time range, this component retrieves real-time data from
  Thanos Metrics Receivers or historical data from the Thanos Metrics Store,
  directly querying object storage. To maintain data integrity, the system
  removes duplicate samples received from multiple Thanos Metric Receivers.
  After processing, Thanos Metrics Query responds to the
  Query Frontend, which caches the results to speed up future queries before
  delivering them to the client.

## Benefits of Aiven for Metrics

- **Centralized monitoring**: Query and analyze metrics from multiple Prometheus
  servers and clusters through a unified query view, simplifying monitoring
  across your infrastructure.
- **Unlimited retention and scalability**: With scalable object storage solutions,
  you can store unlimited metric data for any duration.
- **Prometheus compatibility**: Aiven for Metrics is compatible with Prometheus,
  allowing you to seamlessly use familiar tools like Grafana.
- **Cost-effective and efficient**: Downsampling and compacting data reduces storage
  needs and improves query performance, resulting in greater efficiency and cost savings.
- **Simplified operations**: Reduce the complexity of your metrics system with a managed
  service that provides a pre-configured and optimized Thanos setup.

## Limitations

- Aiven for Metrics is not currently available on Azure or Google Cloud Marketplace.

## Related pages

- [Thanos documentation](https://thanos.io/v0.34/thanos/getting-started.md/)
