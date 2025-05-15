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

:::note
Aiven for Metrics is not currently available on Azure or Google Cloud Marketplace.
:::

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
Integrate Aiven for Metrics with other Aiven services, such as OpenSearch for advanced
queries or Grafana for visualization, or connect it with another Aiven for Metrics
service for comprehensive monitoring. Set up integrations using the
[Aiven Console](https://console.aiven.io/) or
[Aiven CLI](https://github.com/aiven/aiven-client).

For instructions, see
[create service integrations](/docs/platform/howto/create-service-integration).
