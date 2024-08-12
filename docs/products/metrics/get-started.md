---
title: Get started with Aiven for Metrics
sidebar_label: Get started
keywords: [quick start]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CreateService from "@site/static/includes/create-service-console.md"
import Help from "@site/static/includes/cli-help.md"

Get started with Aiven for Metrics by creating your service using the [Aiven Console](https://console.aiven.io/) or [Aiven CLI](https://github.com/aiven/aiven-client).

## Create a service

<Tabs groupId="setup">
<TabItem value="Console" label="Console" default>

<CreateService serviceType="Thanos Metrics"/>

</TabItem>
<TabItem value="CLI" label="CLI">

The [Aiven CLI](https://github.com/aiven/aiven-client) provides a simple and
efficient way to create an Aiven for Metrics service. If you prefer
creating a new service from the CLI:

1. Determine the service plan, cloud provider, and region to
   use for your Aiven for Metrics service.
1. Run the following command to create an Aiven for Metrics service named
   metrics-demo:

   ```bash
   avn service create metrics-demo   \
    --service-type thanos            \
    --cloud aws-europe-west1         \
    --plan startup-4                 \
    --project dev-sandbox
   ```

<Help />

</TabItem>
</Tabs>

## Create service integrations

Integrate Aiven for Metrics with other Aiven services, including OpenSearch for
advanced queries and Grafana for visualization, or with another Aiven for Metrics
service for comprehensive monitoring. The [Aiven Console](https://console.aiven.io/)
and [Aiven CLI](https://github.com/aiven/aiven-client) offer straightforward integration setup.

For instructions, see [create service integrations](/docs/platform/howto/create-service-integration).
