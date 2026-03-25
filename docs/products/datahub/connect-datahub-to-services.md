---
title: Connect DataHub to services
limited: true
---

Add connectors to your DataHub service to ingest data.

## Connect Aiven services to DataHub

During the limited availability stage, you can use the
[Aiven to DataHub Connector app](https://github.com/Itsdarkhere/datahub_connection_wizard)
to more easily connect your Aiven services to DataHub. The app supports
Aiven for PostgreSQL®, Aiven for MySQL, Aiven for Apache Kafka®, and Aiven for ClickHouse®.

To connect your Aiven services, follow the
[usage instructions](https://github.com/Itsdarkhere/datahub_connection_wizard?tab=readme-ov-file#usage).

## Connect external services to DataHub

You can add external data sources to your DataHub service to allow it to automatically
ingest metadata from them. You can add connectors through the
[DataHub UI](https://docs.datahub.com/docs/ui-ingestion)
or the [DataHub CLI](https://docs.datahub.com/docs/metadata-ingestion/cli-ingestion).

:::important
Store sensitive information like passwords and API keys used for connectors in DataHub
[Secrets](https://docs.datahub.com/docs/ui-ingestion#managing-sensitive-information-with-secrets).
:::
