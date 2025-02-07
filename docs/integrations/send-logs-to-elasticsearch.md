---
title: Send logs to Elasticsearch®
sidebar_label: Elasticsearch
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

You can store logs from one of your Aiven services in an external Elasticsearch service.

Collect these values for the connection:

|         Variable         |                           Description                            |
|--------------------------|------------------------------------------------------------------|
| `ELASTICSEARCH_USER`     | User name to access the Elasticsearch service.                   |
| `ELASTICSEARCH_PASSWORD` | Password to access the Elasticsearch service.                    |
| `ELASTICSEARCH_HOST`     | HTTPS service host of your external Elasticsearch service.       |
| `ELASTICSEARCH_PORT`     | Port to use for the connection.                                  |
| `CA_CERTIFICATE`         | CA certificate in PEM structure, if necessary.                   |
| `CONNECTION_NAME`        | Name of this external connection to be used with Aiven services. |

## Create external Elasticsearch integration

Start by setting up an external service integration for Elasticsearch.

1.  Log in to the [Aiven Console](https://console.aiven.io/).
1.  In the project,  click <ConsoleLabel name="integration endpoints"/>.
1.  Select **External Elasticsearch** from the list.
1.  Select **Add new endpoint**.
1.  Set a preferred endpoint name, we'll call it `CONNECTION_NAME`
    later.
1.  In the connection URL field set the connection string in a format
    `https://ELASTICSEARCH_USER:ELASTICSEARCH_PASSWORD@ELASTICSEARCH_HOST:ELASTICSEARCH_PORT`,
    using your own values for those parameters.
1.  Set desired index prefix, that doesn't overlap with any of already
    existing indexes in your Elasticsearch service.
1.  Optional: Add the body of your CA certificate in PEM format.
1.  Click **Create**.

## Send service logs to Elasticsearch

1.  Click **Services** and open a a service.
1.  On the sidebar, click <ConsoleLabel name="integrations"/>.
1.  Select **Elasticsearch Logs** from the list.
1.  Select the **Endpoint name** and click **Enable**.

:::note
Logs are split per day with index name consisting of your desired index
prefix and a date in a format year-month-day, for example
`logs-2022-08-30`.
:::

:::note
You can also set up the integration using Aiven CLI and the following
commands:

- [avn service integration-endpoint-create](/docs/tools/cli/service/integration#avn_service_integration_endpoint_create)
- [avn service integration-endpoint-list](/docs/tools/cli/service/integration#avn_service_integration_endpoint_list)
- [avn service integration-create](/docs/tools/cli/service/integration#avn_service_integration_create)

:::

:::warning
Integration are not available on Hobbyist plans. To enable
integrations, select at least a startup plan.
:::
