---
title: Manage Data APIs
sidebar_label: Manage Data APIs
description: Check status, expose more databases, and disable a REST API.
---

After you enable Data APIs, you can monitor each REST API, expose more databases, and disable an API you no longer need.

## Check the status of a REST API

Each database that you expose runs as an independent application with its own status. To
check the status, open your Aiven for PostgreSQL® service in the
[Aiven Console](https://console.aiven.io/login) and click **REST API**. The status values
include the following:

- **Rebuilding**: The application is deploying or applying a change. You can preview the
  endpoints, but requests might not succeed.
- **Running**: The application is healthy and serving requests.

## Expose more databases

A REST API serves one database. To expose another database in the same service, select the
database in the **REST API** view and enable a REST API for it. Each database keeps its own
status, base URL, and authentication settings.

## Rotate signing keys

Key rotation is automatic. The REST API reads your identity provider's public keys from the
JWKS URL, so when your identity provider rotates its signing keys, the API picks up the new
keys from the same URL. Tokens signed with a previous key remain valid until they expire, as
long as the key is still published at the JWKS URL. You don't need to change any
configuration in the Aiven Console. For more information, see
[Configure the JWKS URL](/docs/products/postgresql/howto/data-apis/authentication#configure-the-jwks-url).

## Disable a REST API

Disable a REST API to stop serving endpoints for a database:

1. In the [Aiven Console](https://console.aiven.io/login), open your Aiven for PostgreSQL
   service.
1. Click **REST API**.
1. Select the database with the REST API to disable.
1. Click **Disable**.

The endpoints stop responding after the application is removed. Disabling a REST API doesn't
change the data in your database.

## Troubleshooting

### The service is not in a VPC

Data APIs can only be deployed for an Aiven for PostgreSQL service that runs inside a
[VPC](/docs/platform/concepts/vpcs). If the service isn't in a VPC, the Aiven Console reports
the requirement before deployment. Move the service to a VPC, then enable the REST API. For
more information, see [Manage project VPCs](/docs/platform/howto/manage-project-vpc).
