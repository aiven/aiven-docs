---
title: Connect applications to Aiven services
limited: true
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Connect your deployed application to [Aiven for PostgreSQL®](/docs/products/postgresql) and [Aiven for Valkey™](/docs/products/valkey) services.

A [free plan](/docs/platform/concepts/free-plan) is available for both of these services.

:::note
Aiven Applications is in the
[limited availability](/docs/platform/concepts/beta_services#limited-availability-) stage.
:::

## Connect an Aiven service

You can connect Aiven services to an existing Aiven Applications application.
If you don't have an Aiven for PostgreSQL or Aiven for Valkey service,
[create one](/docs/platform/howto/create_new_service) first.

1. In your project, click **Applications**.
1. Select your application.
1. Click **Connect service**.
1. Select the  service to connect.
1. Click **Save**.

## Disconnect an Aiven service

1. In your project, click **Applications**.
1. Select your application.
1. In the **Connected services** section, find the service to disconnect.
1. Click <ConsoleLabel name="Actions"/> > **Disconnect service**.
1. Click **Disconnect** to confirm.

<RelatedPages/>

- [Migrate a PostgreSQL® database to Aiven for PostgreSQL®](/docs/products/postgresql/howto/migrate-db-to-aiven-via-console)
- [Aiven service management](/docs/platform/howto/list-service)
