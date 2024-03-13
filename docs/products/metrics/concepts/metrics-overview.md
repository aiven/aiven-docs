---
title: Aiven for Metrics® overview
---

Aiven for Metrics®, powered by Thanos, simplifies managing and analyzing large volumes of metrics data for businesses of all sizes. It offers a scalable, reliable, and efficient service suitable for businesses of all sizes. This service simplifies the management of large-scale metrics systems, allowing organizations to focus on deriving insights from their data.

## Key components

Aiven for Metrics incorporates several core Thanos components:

- **Thanos Metrics Query**: Allows users to query and visualize metrics from real-time
  and historical data sources, aggregating data from various sources for a unified view.
- **Thanos Receiver**: Handles metrics ingestion into the system, acting as a receiver
  for Prometheus remote write requests to enable real-time metrics collection.
- **Thanos Metric Store**: Interfaces with object storage to provide access to historical
  data, ensuring scalable and reliable long-term storage.
- **Thanos Metrics Compact**: Enhances storage usage and query efficiency by compacting
  and downsampling data stored in object storage, improving performance and
  reducing costs.
- **Object Storage**: Serves as the primary storage solution, offering a durable and
  scalable way to store extensive amounts of metric data.

## Unified cluster architecture

Aiven for Metrics combines these components into a cohesive cluster architecture.
This setup ensures a seamless data flow from ingestion (via Thanos Metrics Receive) to
long-term storage (in object storage through Thanos Metrics Store) and efficient querying
(through Thanos Metrics Query). The Thanos Compact component optimizes data storage and
retrieval processes in the background, keeping the system efficient and cost-effective.

## Benefits of Aiven for Metrics

- **Centralized monitoring**: Query and analyze metrics from multiple Prometheus
  servers and clusters through a global query view, simplifying monitoring
  across your infrastructure.
- **Unlimited retention and scalability**: With scalable object storage solutions,
  you can store unlimited metric data for any duration.
- **Prometheus compatibility**: Aiven for Metrics is compatible with Prometheus,
  allowing you to seamlessly use familiar tools like Grafana.
- **Cost-effective and efficient**: Downsampling and compacting data reduces storage
  needs and improves query performance, resulting in greater efficiency and cost savings.
- **Simplified operations**: Reduce the complexity of your metrics system with a managed
  service that provides a pre-configured and optimized Thanos setup.

## Related pages

- [Thanos documentation](https://thanos.io/v0.34/thanos/getting-started.md/)
