---
title: Manage Data APIs
sidebar_label: Manage Data APIs
description: Check status, expose more databases, and turn off a REST API.
---

After you enable Data APIs, you can monitor each REST API, expose more databases, and turn off an API you no longer need.

To manage your REST APIs, open your Aiven for PostgreSQL® service in the
[Aiven Console](https://console.aiven.io/login) and click **REST API**.

## Check the status of a REST API

Each database that you expose runs as an independent application with its own status. Select
the database in **Target database** to see its status:

- **Deploying**: The application is deploying or applying a change. You can preview the
  endpoints, but requests might not succeed.
- **Running**: The application is healthy and serving requests.
- **Error**: The deployment failed. For next steps, see [Troubleshooting](#troubleshooting).

## Expose more databases

A REST API serves one database. To expose another database in the same service:

1. Click **+ Add database**.
1. Select an available database.
1. Click **Enable**.

Each database keeps its own status, base URL, and authentication settings.

## Rotate signing keys

Key rotation is automatic. The REST API reads your identity provider's public keys from the
JWKS URL, so it picks up rotated keys from the same URL without any change in the Aiven
Console. For more information, see
[Configure the JWKS URL](/docs/products/postgresql/howto/data-apis/authentication#configure-the-jwks-url).

## Turn off a REST API

Turn off a REST API to stop serving endpoints for a database:

1. In **Target database**, select the database with the REST API to turn off.
1. Click the disable icon (**Disable REST API for this database**).

The endpoints stop responding after the application is removed. Turning off a REST API
doesn't change the data in your database.

## Troubleshooting

### The service is not in a VPC

Data APIs can only be deployed for an Aiven for PostgreSQL service that runs inside a
[VPC](/docs/platform/concepts/vpcs). If the service isn't in a VPC, the Aiven Console reports
the requirement before deployment. Move the service to a VPC, then enable the REST API. For
more information, see [Manage project VPCs](/docs/platform/howto/manage-project-vpc).

### The deployment fails or times out

If the application can't be deployed, the status changes to **Error**. The deployment also
stops if it doesn't complete within 30 minutes. Turn off the REST API, confirm that the
service meets the [prerequisites](/docs/products/postgresql/howto/data-apis/get-started#prerequisites),
and enable it again.
