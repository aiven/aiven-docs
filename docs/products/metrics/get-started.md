---
title: Get started with Aiven for Metrics
sidebar_label: Get started
---

Get started with Aiven for Metrics by creating your service using the [Aiven Console](https://console.aiven.io/) or [Aiven CLI](https://github.com/aiven/aiven-client).

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Create a service

<Tabs groupId="setup">
<TabItem value="Console" label="Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/).
2. [Create a Metrics service](/docs/platform/howto/create_new_service).

Once the service is ready, the status changes to *Running*. Depending on
your selected cloud provider and region, this generally takes a couple
of minutes.

</TabItem>
<TabItem value="CLI" label="CLI">

The [Aiven CLI](https://github.com/aiven/aiven-client) provides a simple and
efficient way to create an Aiven for Metrics service. If you prefer
creating a new service from the CLI, follow these steps:

1. Determine the service plan, cloud provider, and region to
   use for your Aiven for Metrics service.
1. Run the following command to create an Aiven for Metrics service named
   metrics-demo:

```bash
avn service create metrics-demo   \
 --service-type thanos           \
 --cloud aws-europe-west1         \
 --plan startup-4                 \
 --project dev-sandbox
```

:::note
There are additional options available to you, which you can view by
running the following commands:

-  For a full list of default flags: `avn service create -h`
-  For type-specific options: `avn service types -v`

:::

 </TabItem>
</Tabs>

## Create service integrations

Integrate Aiven for Metrics with other Aiven services, including OpenSearch for
advanced queries and Grafana for visualization, or with another Aiven for Metrics
service for comprehensive monitoring. The [Aiven Console](https://console.aiven.io/)
and [Aiven CLI](https://github.com/aiven/aiven-client) offer straightforward integration setup.

For instructions, see [create service integrations](/docs/platform/howto/create-service-integration).
