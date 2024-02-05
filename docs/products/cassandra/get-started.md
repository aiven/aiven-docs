---
title: Get started with Aiven for Apache Cassandra®
sidebar_labels: Get started
---

Start using Aiven for Apache Cassandra® by creating a service either in the [Aiven Console](https://console.aiven.io/) or with the [Aiven CLI](/docs/tools/cli).

## Create a service in the console

1.  Log in to the [Aiven Console](https://console.aiven.io/).

1.  [Create an Aiven for Apache Cassandra® service](/docs/platform/howto/create_new_service).

    Once the service is ready, its status changes to **Running**, which typically takes a
    couple of minutes, depending on your selected cloud provider and region.

## Create a service with the Aiven CLI

To create a service using the
[Aiven CLI](https://github.com/aiven/aiven-client), decide on the service plan, cloud
provider, and region for your new service and run the `avn service create` command.

```bash
avn service create demo-cassandra       \
   --service-type cassandra             \
   --cloud CLOUD_AND_REGION             \
   --plan PLAN                          \
   --project PROJECT_NAME
```

:::note

- To preview the full list of default flags, run `avn service create -h`.
- To list the type-specific options, run `avn service types -v`.

:::
