---
title: Connect DataHub to services
limited: true
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";

Add connectors to your DataHub service to ingest data.

## Connect Aiven services

1. In your DataHub service, click <ConsoleLabel name="datahubconnectors"/>.
1. Click **Add connectors**.
1. Select services from projects in your organization and organizational units.
1. Click **Add connectors**.

A [service user](/docs/platform/howto/create_new_service_user) is created in
each connected service to give DataHub read access to the service.

To view connected services in the DataHub UI, click **Data Sources**.

## Connect external services to DataHub

You can add external data sources to your DataHub service to allow it to automatically
ingest metadata from them. You can add connectors through the
[DataHub UI](https://docs.datahub.com/docs/ui-ingestion)
or the [DataHub CLI](https://docs.datahub.com/docs/metadata-ingestion/cli-ingestion).

:::important
Store sensitive information like passwords and API keys used for connectors in DataHub
[Secrets](https://docs.datahub.com/docs/ui-ingestion#managing-sensitive-information-with-secrets).
:::

## Remove an Aiven service connector

To remove an Aiven service connector:

1. In your DataHub service, click <ConsoleLabel name="datahubconnectors"/>.
1. Find the connector and click <ConsoleLabel name="actions"/> > **Remove**.
1. To confirm, click **Remove**.

To remove an external service connector, use the
[DataHub UI](https://docs.datahub.com/docs/ui-ingestion)
or the [DataHub CLI](https://docs.datahub.com/docs/metadata-ingestion/cli-ingestion).
