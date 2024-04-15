---
title: Get started with Aiven for Dragonfly®
sidebar_label: Get started
---
import DragonflyLimitations from '@site/static/includes/dragonfly-limitations.md';

Get started with Aiven for Dragonfly by creating your service using the [Aiven Console](https://console.aiven.io/) or [Aiven CLI](https://github.com/aiven/aiven-client).

import Note from "@site/static/includes/dragonflysla-note.md"

<Note/>

## Create a service using the Aiven Console

1. Log in to the [Aiven Console](https://console.aiven.io/).
1. [Create a Dragonfly service](/docs/platform/howto/create_new_service).

Once the service is ready, the status changes to *Running*. Depending on
your selected cloud provider and region, this generally takes a couple
of minutes.

## Create a service using the Aiven CLI

[Aiven CLI](https://github.com/aiven/aiven-client) provides a simple and
efficient way to create an Aiven for Dragonfly® service. If you prefer
creating a new service from the CLI, follow these steps:

1. Determine the service plan, cloud provider, and region to
   use for your Aiven for Dragonfly service.

1. Run the following command to create Aiven for Dragonfly service named
   dragonfly-demo:

```text
avn service create dragonfly-demo   \
 --service-type dragonfly                 \
 --cloud google-europe-north1             \
 --plan startup-4                         \
 --project dev-sandbox
```

:::note
View additional options by running the following commands:

- For a full list of default flags: `avn service create -h`
- For type-specific options: `avn service types -v`

:::

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
  [Aiven for Redis®* to Aiven for Dragonfly](/docs/products/dragonfly/howto/migrate-aiven-redis-df-console).
- Migrate data from
  [external Dragonfly to Aiven for Dragonfly](/docs/products/dragonfly/howto/migrate-ext-redis-df-console).
