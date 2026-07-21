---
title: Call the Aiven for PostgreSQL® Data API endpoints
sidebar_label: Use endpoints
description: Find your API URL and call your database over HTTPS with bearer token authentication.
limited: true
---

import LimitedBadge from "@site/src/components/Badges/LimitedBadge";
import ConsoleLabel from "@site/src/components/ConsoleIcons";

After you enable Data API for a database, you can find your API URL and call your endpoints over HTTPS.

:::note
Data API is a <LimitedBadge/> feature.
:::

## Find the base URL

1. In the [Aiven Console](https://console.aiven.io/login), open your Aiven for PostgreSQL®
   service.
1. Click <ConsoleLabel name="connect"/> > **Data API**.
1. Select the database with Data API enabled.

The **Data API** page shows the **API URL** for the database. All endpoints are relative to
the API URL. For example, a `products` table is available at the `/products` path under the
API URL.

## Call an endpoint

Send the bearer token in the `Authorization` header. The following examples use
`REST_API_BASE_URL` for the API URL and `TOKEN` for the JWT issued by your IdP.

Read rows from the `products` table and select specific columns:

```bash
curl "https://REST_API_BASE_URL/products?select=id,name,price" \
  -H "Authorization: Bearer TOKEN"
```

Insert a row:

```bash
curl -X POST "https://REST_API_BASE_URL/products" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"name": "Notebook", "price": 9.99}'
```

Update a row that matches a filter:

```bash
curl -X PATCH "https://REST_API_BASE_URL/products?id=eq.1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"price": 12.99}'
```

For the full query syntax, including filtering, ordering, and pagination, see the
[PostgREST documentation](https://postgrest.org/en/stable/references/api.html).
