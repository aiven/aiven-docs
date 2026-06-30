---
title: Enable Aiven for PostgreSQL® Data API
sidebar_label: Enable Data API
description: Expose an Aiven for PostgreSQL database as REST endpoints.
limited: true
---

import LimitedBadge from "@site/src/components/Badges/LimitedBadge";

Enable Data API to expose a database in your Aiven for PostgreSQL® service as REST endpoints.

## Prerequisites

To enable Data API, you need the following:

- <LimitedBadge/> access to Data API. To request access,
  [contact Aiven](https://aiven.io/contact).
- A running Aiven for PostgreSQL service deployed inside a
  [VPC](/docs/platform/concepts/vpcs). Data API can only be deployed for services in a VPC.
- Data API available for your service's plan and cloud. If it isn't, the Aiven Console shows
  **The data API is not available for your service**.
- Permission to manage the Aiven for PostgreSQL service, such as the **Admin**,
  **Operator**, or **Developer** role.
- An identity provider (IdP) that issues JWTs and publishes a
  [JWKS URL](/docs/products/postgresql/howto/data-api/authentication) over HTTPS. Auth0,
  Okta, and Microsoft Entra ID are common options.

## Enable Data API for a database

1. In the [Aiven Console](https://console.aiven.io/login), open your Aiven for PostgreSQL
   service.
1. Click **Data** > **Data API**.
1. In the **Database** list, select the database to expose.
1. Click **Set up API**.
1. In the **Data API** dialog, under **Identity provider**, configure the following:
   - **JWKS URL**: Enter the HTTPS URL where your IdP publishes its public keys.
   - **Audience**: Enter the API identifier configured in your IdP.
1. Click **Enable API**.

:::tip
You can also start setup from the service **Overview** page by clicking
**Enable data API**.
:::

Data API starts deploying, and the service status shows **Building**. When the application
is healthy, the status changes to **Running** and the endpoints become available. While the
service is still being provisioned, setup is unavailable and the Aiven Console shows
**Set up your data API** with a note that the service is still being provisioned.

For details on the JWKS URL and audience fields, see
[Configure authentication](/docs/products/postgresql/howto/data-api/authentication).

## Next steps

- [Configure authentication](/docs/products/postgresql/howto/data-api/authentication) and
  authorization for the Data API.
- [Call the endpoints](/docs/products/postgresql/howto/data-api/use-endpoints) with code
  snippets.
- [Manage your Data API](/docs/products/postgresql/howto/data-api/manage), including
  exposing more databases and turning off the API.
