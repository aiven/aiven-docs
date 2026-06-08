---
title: Enable Data APIs
sidebar_label: Enable Data APIs
description: Expose an Aiven for PostgreSQL database as REST endpoints.
---

import LimitedBadge from "@site/src/components/Badges/LimitedBadge";

Enable Data APIs to expose a database in your Aiven for PostgreSQL® service as REST endpoints.

## Prerequisites

To enable Data APIs, you need the following:

- <LimitedBadge/> access to Data APIs. To request access,
  [contact Aiven](https://aiven.io/contact).
- An Aiven for PostgreSQL service that runs inside a
  [VPC](/docs/platform/concepts/vpcs). Data APIs can only be deployed for services in a
  VPC.
- Permission to manage the Aiven for PostgreSQL service, such as the **Admin**,
  **Operator**, or **Developer** role.
- An identity provider (IdP) that issues JWTs and publishes a
  [JWKS URL](/docs/products/postgresql/howto/data-apis/authentication) over HTTPS. Auth0,
  Okta, and Microsoft Entra ID are common options.

## Enable a REST API

1. In the [Aiven Console](https://console.aiven.io/login), open your Aiven for PostgreSQL
   service.
1. Click **REST API**.
1. In **Select database**, select the database to expose.
1. In **JWKS URL**, enter the JWKS URL of your IdP. The URL must use HTTPS. The REST API
   uses this URL to verify the token in each request.
1. Optional: In **Audience**, enter the API identifier configured in your IdP.
1. Click **Enable REST API**.

A dialog tracks the deployment through the following steps:

- **Creating database roles**: Aiven creates the roles the REST API uses.
- **Deploying PostgREST service**: Aiven builds and deploys the application.
- **REST API ready**: The endpoints are available.

Deployment takes a few minutes. The status shows **Deploying** and changes to **Running**
when the application is healthy. While the API deploys, you can preview the available
endpoints.

For details on the JWKS URL and audience fields, see
[Configure authentication](/docs/products/postgresql/howto/data-apis/authentication).

## Next steps

- [Configure authentication](/docs/products/postgresql/howto/data-apis/authentication) and
  authorization for the REST API.
- [Call the REST endpoints](/docs/products/postgresql/howto/data-apis/use-endpoints) with
  code snippets.
- [Manage your REST APIs](/docs/products/postgresql/howto/data-apis/manage), including
  exposing more databases and turning off an API.
