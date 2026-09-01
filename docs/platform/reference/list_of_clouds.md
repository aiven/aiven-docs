---
title: Available cloud regions
sidebar_label: Cloud regions
---
<!-- vale off -->
import LimitedBadge from "@site/src/components/Badges/LimitedBadge";
import RelatedPages from "@site/src/components/RelatedPages";

A reference list of the default available cloud regions.

The list of available clouds can differ per project. Not
all Aiven services are available in all cloud vendors and regions.

import Clouds from "@site/static/includes/clouds-list.md";

<Clouds/>

## OVHcloud availability

OVHcloud is generally available to Aiven customers, the same as the other cloud
providers in this list. Supported service types on OVHcloud include Aiven for
PostgreSQL®, Aiven for MySQL, Aiven for Apache Kafka®, Aiven for OpenSearch®, Aiven
for ClickHouse®, Aiven for Valkey™, Aiven for Metrics, and Aiven for Grafana®.
Pricing for these services on OVHcloud is the same as on other supported cloud
providers.

Availability zone (AZ) support on OVHcloud is limited to specific regions. For
details, see [Availability zones](/docs/platform/concepts/availability-zones).

<RelatedPages/>

-   [Availability zones](/docs/platform/concepts/availability-zones)
-   [Migrate service to another cloud or region](/docs/platform/howto/migrate-services-cloud-region)
-   [Aiven for Metrics](/docs/products/metrics)
