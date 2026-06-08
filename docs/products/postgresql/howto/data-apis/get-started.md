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
- Permission to manage the Aiven for PostgreSQL service in the
  [Aiven Console](https://console.aiven.io/login).
- An identity provider (IdP) that issues JWTs and exposes a
  [JWKS URL](/docs/products/postgresql/howto/data-apis/authentication). Auth0, Okta, and
  Microsoft Entra ID are common options.

## Enable a REST API

1. In the [Aiven Console](https://console.aiven.io/login), open your Aiven for PostgreSQL
   service.
1. Click **REST API**.
1. In the **Database** list, select the database to expose.
1. In the **JWKS URL** field, enter the JWKS URL of your IdP. The REST API uses this URL to
   verify the token in each request.
1. Optional: In the **Audience** field, enter the audience value that tokens must match.
1. Click **Enable REST API**.

The REST API starts deploying, and its status shows **Rebuilding**. When the application is
healthy, the status changes to **Running**, and you can call the endpoints. You can preview
the available endpoints while the API is still deploying.

For details on the JWKS URL and audience fields, see
[Configure authentication](/docs/products/postgresql/howto/data-apis/authentication).

## Next steps

- [Configure authentication](/docs/products/postgresql/howto/data-apis/authentication) for
  the REST API.
- [Call the REST endpoints](/docs/products/postgresql/howto/data-apis/use-endpoints) with
  code snippets.
- [Manage your REST APIs](/docs/products/postgresql/howto/data-apis/manage), including
  exposing more databases and disabling an API.
