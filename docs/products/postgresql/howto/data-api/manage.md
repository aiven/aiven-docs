---
title: Manage Aiven for PostgreSQL® Data API
sidebar_label: Manage Data API
description: Check status, expose more databases, and turn off the Data API.
limited: true
---

import LimitedBadge from "@site/src/components/Badges/LimitedBadge";

After you enable Data API, you can monitor it, expose more databases, and turn it off for a database you no longer need.

:::note
Data API is a <LimitedBadge/> feature.
:::

To manage Data API, open your Aiven for PostgreSQL® service in the
[Aiven Console](https://console.aiven.io/login) and click **Connect** > **Data API**.

## Check the status

Each database that you expose runs as an independent application with its own status, shown
on the **Data API** page:

- **API building**: The application is deploying or applying a change. Setup and requests
  might not succeed yet.
- **API running**: The application is healthy and serving requests.
- **Error**: The deployment failed. For next steps, see [Troubleshooting](#troubleshooting).

## Expose more databases

A Data API serves one database. To expose another database in the same service, select it in
the **Database** list and set up Data API for it. Each database keeps its own status, API
URL, and authentication settings.

## Rotate identity provider keys

Key rotation is automatic. Data API reads your IdP's public keys from the JWKS URL and picks
up rotated keys from the same URL. For more information, see
[Configure the JWKS URL](/docs/products/postgresql/howto/data-api/authentication#configure-the-jwks-url).

## Change authentication settings

To change the JWKS URL or audience, open the **Data API** page and select the database. Next
to **JWKS URL** or **Audience**, click the edit icon, enter the new value, and save. You
don't need to turn off Data API to update these settings.

## Refresh the schema cache

Endpoints reflect the database schema captured when you enable Data API. They don't refresh
automatically when the schema changes. To pick up new or changed tables, click
**Refresh cache** on the **Data API** page. This updates the PostgREST schema cache without
restarting the service.

## Turn off Data API

Turn off Data API to stop serving endpoints for a database. Select the database, then turn
off its Data API. The endpoints stop responding after the application is removed. Turning off
Data API doesn't change the data in your database.

## Troubleshooting

### Data API is not available for the service

Data API must be available for your service's plan and cloud. If it isn't, the Aiven Console
shows **The data API is not available for your service**.

### The service is still being provisioned

Setup is unavailable while the service is still being provisioned. Wait until the service is
**Running**, then enable Data API.

### The deployment fails

If the application can't be deployed, the status changes to **Error**. Turn off Data API,
confirm that the service meets the
[prerequisites](/docs/products/postgresql/howto/data-api/get-started#prerequisites), and
enable it again.

### Endpoints don't reflect schema changes

Endpoints reflect the database schema captured when you enabled Data API, and don't refresh
automatically when the schema changes. To pick up new or changed tables, click
**Refresh cache** on the **Data API** page. For more information, see
[Refresh the schema cache](#refresh-the-schema-cache).
