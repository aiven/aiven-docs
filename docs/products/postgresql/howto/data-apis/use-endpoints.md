---
title: Call the Data APIs endpoints
sidebar_label: Use endpoints
description: View REST endpoints, copy code snippets, and call your data over HTTPS.
---

After you enable Data APIs for a database, you can browse the available endpoints and call them over HTTPS.

## Find the base URL

1. In the [Aiven Console](https://console.aiven.io/login), open your Aiven for PostgreSQL®
   service.
1. Click **REST API**.
1. In **Target database**, select the database with the REST API enabled.

The **Connection Info** section shows the **Base URL** for the REST API. All endpoints are
relative to this base URL. For example, a `products` table is available at the `/products`
path under the base URL.

## View available endpoints

The Aiven Console lists the endpoints grouped by schema. Each row shows the table name, the
endpoint path, the available methods, and the primary key. Each table provides endpoints for
the following methods:

- `GET`: Read rows.
- `POST`: Insert rows.
- `PATCH`: Update rows.
- `DELETE`: Delete rows.

The methods that succeed for a request depend on the privileges of the role in the token.
For details, see
[Authorize requests with PostgreSQL roles](/docs/products/postgresql/howto/data-apis/authentication#authorize-requests-with-postgresql-roles).

## Copy a code snippet

Select a table to expand its code snippets:

1. Select the table to see its snippets.
1. Select the method to call.
1. Select the language: **curl**, **JavaScript**, or **Python**.
1. Click **Copy to clipboard**.
1. In the snippet, replace the placeholder token with a JWT from your identity provider.

## Call an endpoint

Send the JWT issued by your identity provider in the `Authorization` header as a bearer
token. The following examples use `REST_API_BASE_URL` for the base URL and `JWT_TOKEN` for
the token.

Read rows from the `products` table and select specific columns:

```bash
curl "https://REST_API_BASE_URL/products?select=id,name,price" \
  -H "Authorization: Bearer JWT_TOKEN"
```

Insert a row:

```bash
curl -X POST "https://REST_API_BASE_URL/products" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer JWT_TOKEN" \
  -d '{"name": "Notebook", "price": 9.99}'
```

Update a row that matches a filter:

```bash
curl -X PATCH "https://REST_API_BASE_URL/products?id=eq.1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer JWT_TOKEN" \
  -d '{"price": 12.99}'
```

For the full query syntax, including filtering, ordering, and pagination, see the
[PostgREST documentation](https://postgrest.org/en/stable/references/api.html).
