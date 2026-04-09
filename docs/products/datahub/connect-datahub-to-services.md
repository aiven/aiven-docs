---
title: Connect DataHub to services
limited: true
---

Add connectors to your DataHub service to ingest data.

## Aiven service connectors

During the limited availability stage, you can use Aiven's
[DataHub Connector Wizard](https://019d6c50-619d-7eda-b96f-88f140e6fceb-3000.eur-1.aiven.app)
to more easily connect your Aiven services to DataHub. The wizard supports
Aiven for PostgreSQL®, Aiven for MySQL, Aiven for Apache Kafka®, and Aiven for ClickHouse®.

### Prerequisites

- An [Aiven token](/docs/platform/howto/create_authentication_token).
- A [DataHub personal access tokens (PAT)](https://docs.datahub.com/docs/authentication/).
- Supported services that are running and are in projects you have access to.

### Connect Aiven services

1. Open the
   [DataHub Connector Wizard](https://019d6c50-619d-7eda-b96f-88f140e6fceb-3000.eur-1.aiven.app).

1. In the **Aiven** section, enter your Aiven **API token**.

1. Click **Test**.

1. In the Aiven Console, go to your DataHub service.

1. In the **DataHub resources** section, open the Aiven App that ends in `-gms`.

1. In the **Connection information** section, copy the **Application URL**.

1. In the DataHub Connector Wizard, in **DataHub** section,
   paste the **URL** you copied from the Aiven Console

1. Enter your DataHub **Token**.

1. Click **Test**.

1. Click **Connect**.

1. Choose services to add. You can select multiple services across different projects.

1. Click **Add to DataHub**.

1. Optional: Enable recurring schedule for automatic updates.

1. Click **Create with schedule** or **Create connectors**.

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
