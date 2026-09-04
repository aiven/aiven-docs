---
title: Enable Aiven for PostgreSQL® Data API
sidebar_label: Enable Data API
description: Expose an Aiven for PostgreSQL database as REST endpoints.
limited: true
---

import LimitedBadge from "@site/src/components/Badges/LimitedBadge";
import ConsoleLabel from "@site/src/components/ConsoleIcons";

Enable Data API to expose a database in your Aiven for PostgreSQL® service as REST endpoints.

## Prerequisites

To enable Data API, you need the following:

- <LimitedBadge/> access to Data API. To request access,
  [contact Aiven](https://aiven.io/contact).
- [Aiven Runtime](/docs/products/aiven-apps) enabled for your project, since Data API
  deploys as a Runtime application. If it isn't, the Aiven Console shows
  **Data API requires Aiven Runtime**.
- Data API available for your service's plan and cloud. If it isn't, the Aiven Console
  shows **The data API is not available for your service**.
- The `project:services:write` permission.
- An identity provider (IdP) that issues JWTs and publishes a
  [JWKS URL](/docs/products/postgresql/howto/data-api/authentication) over HTTPS. Auth0,
  Okta, and Microsoft Entra ID are common options.

## Enable Data API for a database

1. In the [Aiven Console](https://console.aiven.io/login), open your Aiven for PostgreSQL
   service.
1. Click <ConsoleLabel name="data"/> > **Data API**.
1. In the **Database** list, select the database to expose.
1. Click **Set up API**.
1. In the **Data API for [database]** dialog, configure the following:
   - Under **Identity provider**:
     - **JWKS URL**: Enter the HTTPS URL where your IdP publishes its public keys.
     - **Audience** (optional): Enter the API identifier configured in your IdP.
   - If Aiven has a recommendation for this service, choose a deployment mode under
     **Settings**:
     - **Recommended** (default): Deploys the underlying
       [Aiven Runtime application](/docs/products/aiven-apps) on the cheapest available paid
       plan, using the same cloud and region as your PostgreSQL service when possible,
       or the nearest available region otherwise.
     - **Custom**: Configure your own cloud, region, and plan under **Cloud and plan**.
   - Under **Cloud and plan**, shown when there's no recommendation or you choose
     **Custom**:
     - **Cloud**: Defaults to the same cloud and region as your PostgreSQL service. You
       can select a different cloud and region that supports the Aiven Runtime application.
     - **Plan**: Select a plan for the Aiven Runtime application. Free-tier plans aren't
       available for Data API, so choose a paid plan.
1. Review the **Summary** panel on the right, which shows the cloud, plan, and estimated
   monthly price for the Aiven Runtime application.
1. Click **Confirm and deploy**.

If the cloud, region, and plan you select don't support the Aiven Runtime application,
Data API shows an error message so that you can pick a different combination.

Data API starts deploying and the **Status** shows **Building**. When the app is healthy,
the status changes to **Running** and the endpoints become available. While the service is
still being provisioned, setup is unavailable and the Aiven Console shows
**Set up your data API** with a note that the service is still being provisioned.

For details on the JWKS URL and audience fields, see
[Configure authentication](/docs/products/postgresql/howto/data-api/authentication).

## Next steps

- [Configure authentication](/docs/products/postgresql/howto/data-api/authentication) and
  authorization for the Data API.
- [Call the endpoints](/docs/products/postgresql/howto/data-api/use-endpoints) with code
  snippets.
- [Manage your Data API](/docs/products/postgresql/howto/data-api/manage), including
  exposing more databases and removing the API.
