---
title: Connect services to Aiven Runtime
sidebar_label: Connect services
limited: true
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";

Connect your deployed application to [Aiven services](/docs/products/services).
You can connect an existing Aiven for Apache Kafka®, Aiven for PostgreSQL®,
Aiven for OpenSearch®, or Aiven for Valkey™ service.

You can also define integrations when you create your application
by using [Compose files](/docs/products/apps/manifest-files/compose-files).

## Connect an Aiven service

1. In your project, click <ConsoleLabel name="runtime"/>.
1. Open your application.
1. In the **Connected services** section, click **Connect service**.
1. Select the service to connect.
1. Click **Connect**.

## Connect a Karapace schema registry

To connect services that are integrated with your application
to a Karapace schema registry:

- Connect the application to the Aiven for Apache Kafka® service.
- Add the schema registry connection details as environment variables.

### Prerequisites

- An Aiven for Apache Kafka® service
   with the [Karapace schema registry enabled](/docs/products/kafka/karapace/howto/enable-karapace).
- [The connection details](/docs/products/kafka/howto/use-schema-registry-in-java#get-connection-details)
    for the schema registry.

### Connect a schema registry during application creation

1. In your project, click <ConsoleLabel name="runtime"/>.
1. Click **Deploy application**.
1. Select or connect your **GitHub account**.
1. Select your **Account**, **Repository**, and **Branch**.
1. Click **Next**.
1. Select your manifest file and click **Scan**. Aiven Runtime automatically detects
   what applications and services are needed.
1. On the Kafka service, click
   <ConsoleLabel name="swapruntimeservices"/>.
1. Select the Kafka service you created and click **Apply**.
1. To configure the integration with the schema registry,
   click <ConsoleLabel name="editappintegrationconfig"/>
   and add the connection details as environment variables.
1. To deploy the application, click **Deploy**.

### Connect a schema registry to an existing application

1. In your project, click <ConsoleLabel name="runtime"/>.
1. Open your application.
1. In the **Environment variables** section, click **Edit**.
1. On the **Variables** tab, add the connection details as environment variables.
1. Click **Save**.

## Disconnect an Aiven service

1. In your project, click <ConsoleLabel name="runtime"/>.
1. Open your application.
1. In the **Connected services** section, find the service to disconnect.
1. Click <ConsoleLabel name="Actions"/> > **Disconnect service**.
1. Click **Disconnect** to confirm.

## Apply database schema changes

Aiven Runtime does not automatically support pre-deploy commands or one-off task execution.
To run database schema migrations, you can do one of the following:

- **Run migrations at container startup**: You can update the `CMD` or entrypoint of your
   Containerfile or Dockerfile so that the database schema changes are applied
   every time the container starts up.

- **Run migrations in CI/CD before deploying**: If you use a CI/CD pipeline, you can
  run migrations as a pipeline step before
  [deployment](/docs/products/apps/deploy-apps#redeploy-an-application).
