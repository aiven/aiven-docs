---
title: Manage Data API
sidebar_label: Manage Data API
description: Check status, expose more databases, and turn off the Data API.
---

After you enable Data API, you can monitor it, expose more databases, and turn it off for a database you no longer need.

To manage Data API, open your Aiven for PostgreSQL® service in the
[Aiven Console](https://console.aiven.io/login) and click **Data** > **Data API**.

## Check the status

Each database that you expose runs as an independent application with its own status:

- **Building**: The application is deploying or applying a change. Setup and requests might
  not succeed yet.
- **Running**: The application is healthy and serving requests.
- **Error**: The deployment failed. For next steps, see [Troubleshooting](#troubleshooting).

## Expose more databases

A Data API serves one database. To expose another database in the same service, select it in
the **Database** list and set up Data API for it. Each database keeps its own status, API
URL, and authentication settings.

## Rotate credentials

- **API key**: Regenerate the key from **Connection info**. Regenerating invalidates the
  previous key, so update any clients that use it.
- **Identity provider keys**: Key rotation is automatic. Data API reads your IdP's public
  keys from the JWKS URL and picks up rotated keys from the same URL. For more information,
  see [Configure the JWKS URL](/docs/products/postgresql/howto/data-apis/authentication#configure-the-jwks-url).

## Turn off Data API

Turn off Data API to stop serving endpoints for a database. Select the database, then turn
off its Data API. The endpoints stop responding after the application is removed. Turning off
Data API doesn't change the data in your database.

## Troubleshooting

### Data API is not available for the service

Data API must be available for your service's plan and cloud. If it isn't, the Aiven Console
shows **The Data API is not available for your service**. Data API also requires the service
to run inside a [VPC](/docs/platform/concepts/vpcs). For more information, see
[Manage project VPCs](/docs/platform/howto/manage-project-vpc).

### The service is still building

Setup is unavailable while the service is building. Wait until the service is **Running**,
then enable Data API.

### The deployment fails

If the application can't be deployed, the status changes to **Error**. Turn off Data API,
confirm that the service meets the
[prerequisites](/docs/products/postgresql/howto/data-apis/get-started#prerequisites), and
enable it again.
