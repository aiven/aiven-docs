---
title: Manage Aiven for PostgreSQL® Data API
sidebar_label: Manage Data API
description: Check status, expose more databases, and remove the Data API.
limited: true
---

import LimitedBadge from "@site/src/components/Badges/LimitedBadge";
import ConsoleLabel from "@site/src/components/ConsoleIcons";

After you enable Data API, you can monitor it, expose more databases, and remove it for a database you no longer need.

:::note
Data API is a <LimitedBadge/> feature.
:::

To manage Data API, open your Aiven for PostgreSQL® service in the
[Aiven Console](https://console.aiven.io/login) and click
<ConsoleLabel name="data"/> > **Data API**.

## Check the status

Each database that you expose runs as an independent
[Aiven Runtime application](/docs/products/aiven-apps). The **Data API** page shows
whether it's ready to use:

- While the application deploys, **API URL** shows **API building...**, and **Refresh
  cache** and the edit icons next to **JWKS URL** and **Audience** aren't available yet.
- Once the application is healthy and serving requests, **API URL** shows the real
  endpoint, and **Refresh cache** and the edit icons become available.
- If the deployment fails, an error message appears at the top of the page. For next
  steps, see [Troubleshooting](#troubleshooting).

## View the underlying Aiven Runtime app

After enabling Data API, the **Data API** page shows a **Runtime application** row with a
link to the dedicated app running PostgREST. Aiven deploys the app in the cloud and
region you chose when you set up Data API, and bills it separately. You can also find it
in your project's **Applications** list, tagged **Data API** for easy identification.

## Expose more databases

A Data API serves one database. To expose another database in the same service, select it
in the **Database** list and set up Data API for it. Each database keeps its own status,
API URL, and authentication settings.

## Rotate identity provider keys

Key rotation is automatic. Data API reads your IdP's public keys from the JWKS URL and
picks up rotated keys from the same URL. For more information, see
[Configure the JWKS URL](/docs/products/postgresql/howto/data-api/authentication#configure-the-jwks-url).

## Change authentication settings

To change the JWKS URL or audience, open the **Data API** page and select the database.
Next to **JWKS URL** or **Audience**, click the edit icon, enter the new value, and save.
A confirmation message confirms the update. You don't need to remove Data API to update
these settings, but the edit icons aren't available while the application is still
deploying.

## Refresh the schema cache

Endpoints reflect the database schema captured when you enable Data API. They don't refresh
automatically when the schema changes. To pick up new or changed tables, click
**Refresh cache** on the **Data API** page. **Refresh cache** is available only while the
application is running. A confirmation message confirms the refresh. Refreshing updates
the PostgREST schema cache without restarting the service.

## Remove Data API

Remove Data API to stop serving endpoints for a database. On the **Data API** page,
click the database, then click **Remove Data API**. In the **Delete Data API**
confirmation dialog, click **Delete**. The endpoints stop responding after the underlying
Aiven Runtime application is deleted.

Removing Data API doesn't change the data in your database, but it permanently deletes
the Data API configuration for that database. To turn Data API back on for the same
database, set up the JWKS URL and audience again.

:::note
If you delete the PostgreSQL service, Aiven also deletes all associated Data API apps.
The apps are no longer accessible from the **Applications** list or anywhere else.
:::

## Troubleshooting

### Data API is not available for the service

Data API must be available for your service's plan and cloud. If it isn't, the Aiven
Console shows **The data API is not available for your service**.

### The service is still being provisioned

Setup is unavailable while the service is still being provisioned. Wait until the service
is **Running**, then enable Data API.

### The deployment fails

If the deployment fails, the setup dialog shows an error message and you can try again
without losing your entered values. If the issue persists, confirm that the service meets
the [prerequisites](/docs/products/postgresql/howto/data-api/get-started#prerequisites),
then remove and re-enable Data API.

### The selected cloud, region, or plan isn't available

If you select a cloud, region, or plan that doesn't support the Aiven Runtime application,
the setup dialog shows an error message instead of failing partway through. Select a
different cloud, region, or plan and try again.

### Endpoints don't reflect schema changes

Endpoints reflect the database schema captured when you enabled Data API, and don't refresh
automatically when the schema changes. To pick up new or changed tables, click
**Refresh cache** on the **Data API** page. For more information, see
[Refresh the schema cache](#refresh-the-schema-cache).
