---
title: OpenSearch® vs Elasticsearch
sidebar_label: OS vs ES
---

import RelatedPages from "@site/src/components/RelatedPages";

OpenSearch® is the open-source version of the Elasticsearch project, which has [a restrictive license](https://www.elastic.co/blog/licensing-change). Third parties cannot offer Elasticsearch as a service.

The community (including Aiven) joined
forces to create and maintain OpenSearch based on the last open source
licensed releases of both Elasticsearch and Kibana (v7.10.2).

Version 1.0 release of OpenSearch should be very similar to the
Elasticsearch release that it is based on, and Aiven encourages all
customers to upgrade at their earliest convenience. This is to ensure
that your platforms can continue to receive upgrades in the future.

To start exploring Aiven for OpenSearch®, see
[Get Started with Aiven for OpenSearch®](/docs/products/opensearch/get-started).

To assess an existing Elasticsearch cluster and see how it maps to Aiven for OpenSearch
before moving it, run the
[Elasticsearch to Aiven for OpenSearch Migration Checker](https://aiven.io/tools/elasticsearch-to-aiven-migration-checker).
The checker reports compatibility findings, a service plan recommendation, and list
pricing for a comparable cluster on Aiven for OpenSearch.

<RelatedPages/>

- [Migrate Elasticsearch data to Aiven for OpenSearch®](/docs/products/opensearch/howto/migrating_elasticsearch_data_to_aiven)
- [Upgrade Elasticsearch clients to OpenSearch®](/docs/products/opensearch/howto/upgrade-clients-to-opensearch)
- [Aiven for OpenSearch® limitations](/docs/products/opensearch/reference/opensearch-limitations)
