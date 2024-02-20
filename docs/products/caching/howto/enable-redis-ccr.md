---
title: Enable cross-cluster replication in Aiven for Redis®*
sidebar_label: Enable CCR
pro: true
---
[Aiven for Redis cross-cluster replication (CCR)](/docs/products/redis/concepts/redis-ccr) feature enables data replication from a primary to a replica service, ensuring high availability and disaster recovery. Learn how to enable CCR for your Aiven for Redis service, verify data replication, and manage failovers.


## Prerequisites

- This feature requires `[Pro Platform](/docs/platform/concepts/pro-platform)`.
- An Aiven account and API token
- [Aiven CLI tool](https://github.com/aiven/aiven-client)
- Two Aiven for Redis services within your Aiven project: one designated as the *primary*
  and the other as the *replica*

## Enable CCR via API

To enable CCR for your Aiven for Redis service via API, follow these steps:

1. **Create the primary service:** Start by creating your primary Aiven for Redis service.
   This service acts as the primary (leader) in the replication setup. Use the
   following Aiven API call to create the service:

   ```shell
      curl -X POST https://api.aiven.io/v1/project/PROJECT_NAME/service \
      -H "Content-Type: application/json" \
      -H "Authorization: bearer YOUR_AUTH_TOKEN" \
      -d '{
         "cloud": "CLOUD_NAME",
         "plan": "business-4",
         "service_name": "PRIMARY_SERVICE_NAME",
         "service_type": "redis",
         "project": "PROJECT_NAME"
         }'
   ```

    Replace the placeholders with your actual values:

    - `PROJECT_NAME`: The name of your project.
    - `YOUR_AUTH_TOKEN`: Your API authentication token.
    - `CLOUD_NAME`: The name of the cloud you want to use.
    - `PRIMARY_SERVICE_NAME`: The name you want to give to your primary service.
    - `YOUR_AUTH_TOKEN`: Your API authentication token.

1. **Confirm primary service backups:** Before creating a replica service, verify that
   your primary Aiven for Redis service has a backup.
   [Configuring backups](/docs/platform/concepts/service_backups#aiven-for-redis)
   is essential to ensure data consistency and integrity for replication.

1. **Create the replica service:** Next, create the Aiven for Redis service that acts as
   the replica. Specify the primary service as the source for replication using the
   following API call:

   ```shell
    curl -X POST https://api.aiven.io/v1/project/PROJECT_NAME/service \
    -H "Content-Type: application/json" \
    -H "Authorization: bearer YOUR_AUTH_TOKEN" \
    -d '{
        "cloud": "CLOUD_NAME",
        "plan": "startup-4",
        "service_name": "REPLICA_SERVICE_NAME",
        "service_type": "redis",
        "project": "PROJECT_NAME",
        "service_integrations": [
         {
          "integration_type": "read_replica",
          "source_service_name": "PRIMARY_SERVICE_NAME"
         }
         ]
        }'
   ```

    Replace the placeholders with your actual values:

    - `PROJECT_NAME`: The name of your project.
    - `YOUR_AUTH_TOKEN`: Your API authentication token.
    - `CLOUD_NAME`: The name of the cloud you want to use.
    - `REPLICA_SERVICE_NAME`: The name you want to give to your replica service.
    - `PRIMARY_SERVICE_NAME`: The name of your primary service.

## Enable CCR via CLI

You can also use the Aiven CLI to enable CCR for your Aiven for Redis service.

1. **Create the primary service**: Execute the command below to create the primary
   (leader) Aiven for Redis service:

   ```bash
    avn service create <replica-service-name> --project <project-name> -t redis --plan startup-4 --cloud <cloud-name> \
    --service-integration source_service=<main-service-name>,integration_type=read_replica
   ```

   Replace the placeholders with your actual values:

   - `PRIMARY_SERVICE_NAME`: The name of your primary service.
   - `PROJECT_NAME`: The name of your project.
   - `CLOUD_NAME`: The name of the cloud you want to use.

1. **Confirm primary service backups:** Before creating a replica service, verify that
   your primary Aiven for Redis service has a backup.
   [Configuring backups](/docs/platform/concepts/service_backups#aiven-for-redis) is
   essential to ensure data consistency and integrity for replication.

1. **Create the replica service:** Use the following CLI command to create the replica
   service with the correct replication settings:

   ```bash
    avn service create REPLICA_SERVICE_NAME --project PROJECT_NAME -t redis --plan startup-4 --cloud CLOUD_NAME \
    --service-integration source_service=PRIMARY_SERVICE_NAME,integration_type=read_replica
   ```

   Replace the placeholders with your actual values:

   - `REPLICA_SERVICE_NAME`: The name you want to give to your replica service.
   - `PROJECT_NAME`: The name of your project.
   - `CLOUD_NAME`: The name of the cloud you want to use.
   - `PRIMARY_SERVICE_NAME`: The name of your primary service.

## Verify data replication

After setting up the replica, ensure that data entered into the primary Aiven for Redis
service is successfully replicated to the replica service.

## Manage failover

If the primary service fails, Aiven automatically promotes the replica service to the
new primary. Update your application's connection details to connect to this new primary
service to maintain smooth operations.
