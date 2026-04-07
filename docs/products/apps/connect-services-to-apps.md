---
title: Connect services to Aiven Apps
sidebar_label: Connect services
limited: true
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";

Connect your deployed application to [Aiven services](/docs/products/services).
You can connect an existing Aiven for Apache Kafka®, Aiven for PostgreSQL®,
Aiven for OpenSearch®, or Aiven for Valkey™ service.

## Connect an Aiven service

1. In your project, click **Applications**.
1. Open your application.
1. In the **Connected services** section, click **Connect service**.
1. Select the service to connect.
1. Click **Connect**.

## Disconnect an Aiven service

1. In your project, click **Applications**.
1. Open your application.
1. In the **Connected services** section, find the service to disconnect.
1. Click <ConsoleLabel name="Actions"/> > **Disconnect service**.
1. Click **Disconnect** to confirm.

## Apply database schema changes

Aiven Apps does not automatically support pre-deploy commands or one-off task execution.
To run database schema migrations, you can do one of the following:

- **Run migrations at container startup**: You can update the `CMD` or entrypoint of your
   Containerfile or Dockerfile so that the database schema changes are applied
   every time the container starts up.

- **Run migrations in CI/CD before deploying**: If you use a CI/CD pipeline, you can
  run migrations as a pipeline step before
  [deployment](/docs/products/apps/deploy-apps#redeploy-an-app).
