---
title: Get started with Aiven for Dragonfly®
sidebar_label: Get started
---

Get started with Aiven for Dragonfly by creating your service using the [Aiven Console](https://console.aiven.io/) or [Aiven CLI](https://github.com/aiven/aiven-client).

import Note from "@site/static/includes/dragonflysla-note.md"

<Note/>

## Create a service using the Aiven Console

1.  Log in to the [Aiven Console](https://console.aiven.io/).
1.  [Create a Dragonfly service](/docs/platform/howto/create_new_service).

Once the service is ready, the status changes to *Running*. Depending on
your selected cloud provider and region, this generally takes a couple
of minutes.

## Create a service using the Aiven CLI

[Aiven CLI](https://github.com/aiven/aiven-client) provides a simple and
efficient way to create an Aiven for Dragonfly® service. If you prefer
launching a new service from the CLI, follow these steps:


1.  Determine the service plan, cloud provider, and region to
    use for your Dragonfly service.

1.  Run the following command to create Dragonfly service named
    dragonfly-demo:

```text
avn service create dragonfly-demo   \
    --service-type dragonfly                 \
    --cloud google-europe-north1             \
    --plan startup-4                         \
    --project dev-sandbox
```

:::note
There are additional options available to you, which you can view by
running the following commands:

-   For a full list of default flags: `avn service create -h`
-   For type-specific options: `avn service types -v`

:::

## Create service integrations

Integrate Aiven for Dragonfly® with other Aiven services or third-party tools using the
integration wizard available on the [Aiven Console](https://console.aiven.io/) or
[Aiven CLI](https://github.com/aiven/aiven-client).
Learn how to [create service integrations](/docs/platform/howto/create-service-integration).

## Connect to Aiven for Dragonfly

Learn how to connect to Aiven for Dragonfly using different programming
languages:

-   [redis-cli](/docs/products/dragonfly/howto/connect-redis-cli)
-   [Go](/docs/products/dragonfly/howto/connect-go)
-   [Node](/docs/products/dragonfly/howto/connect-node)
-   [Python](/docs/products/dragonfly/howto/connect-python)

## Limitations at General Availability (GA)

As Aiven for Dragonfly transitions to General Availability (GA), the focus is to deliver
the most valuable features based on feedback. Currently, automatic migration of Users,
Access Control Lists (ACLs), and service configurations from Redis to Aiven for Dragonfly
is not supported.

What this means:

- **Service configurations:** If you’ve customized your Redis service with
specific settings, you must manually apply these settings to Dragonfly. Automatic
transfer of these custom configurations is not available during the initial phase of GA.

## Explore other resources

-   Learn about how Aiven for Dragonfly supports
    [high availability](/docs/products/dragonfly/concepts/ha-dragonfly).
-   Migrate data from
    [Aiven for Redis®* to Aiven for Dragonfly](/docs/products/dragonfly/howto/migrate-aiven-redis-df-console).
-   Migrate data from
    [external Dragonfly to Aiven for Dragonfly](/docs/products/dragonfly/howto/migrate-ext-redis-df-console).
