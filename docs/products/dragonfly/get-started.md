---
title: Get started with Aiven for Dragonfly®
sidebar_label: Get started
keywords: [quick start]
---

import CreateService from "@site/static/includes/create-service-console.md"
import DragonflyLimitations from '@site/static/includes/dragonfly-limitations.md';
import Note from "@site/static/includes/dragonflysla-note.md"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Help from "@site/static/includes/cli-help.md"

Get started with Aiven for Dragonfly by creating your service using the [Aiven Console](https://console.aiven.io/) or [Aiven CLI](https://github.com/aiven/aiven-client).

<Note/>

## Create an Aiven for Dragonfly® service

<Tabs groupId="group1">
<TabItem value="Console" label="Console" default>

<CreateService serviceType="Dragonfly"/>

</TabItem>
<TabItem value="CLI" label="CLI">

Use [Aiven CLI](/docs/tools/cli) to create your service:

1. Determine the service plan, cloud provider, and region to
   use for your Aiven for Dragonfly service.

1. Run the following command to create Aiven for Dragonfly service named
   dragonfly-demo:

   ```bash
   avn service create dragonfly-demo   \
    --service-type dragonfly           \
    --cloud google-europe-north1       \
    --plan startup-4                   \
    --project dev-sandbox
   ```

<Help/>

</TabItem>
</Tabs>

## Create service integrations

Integrate Aiven for Dragonfly® with other Aiven services or third-party tools using the
integration wizard available on the [Aiven Console](https://console.aiven.io/) or
[Aiven CLI](https://github.com/aiven/aiven-client).
Learn how to [create service integrations](/docs/platform/howto/create-service-integration).

## Connect to Aiven for Dragonfly

Learn how to connect to Aiven for Dragonfly using different programming
languages:

- [redis-cli](/docs/products/dragonfly/howto/connect-redis-cli)
- [Go](/docs/products/dragonfly/howto/connect-go)
- [Node](/docs/products/dragonfly/howto/connect-node)
- [Python](/docs/products/dragonfly/howto/connect-python)

<DragonflyLimitations />

## Explore other resources

- Learn about how Aiven for Dragonfly supports
  [high availability](/docs/products/dragonfly/concepts/ha-dragonfly).
- Migrate data from
  [Aiven for Caching to Aiven for Dragonfly](/docs/products/dragonfly/howto/migrate-aiven-caching-df-console).
- Migrate data from
  [external Dragonfly to Aiven for Dragonfly](/docs/products/dragonfly/howto/migrate-ext-redis-df-console).
