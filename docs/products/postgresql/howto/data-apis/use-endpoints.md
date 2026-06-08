---
title: Call the Data APIs endpoints
sidebar_label: Use endpoints
description: View REST endpoints, copy code snippets, and call your data over HTTPS.
---

After you enable Data APIs for a database, you can browse the available endpoints and call them over HTTPS.

## View available endpoints

1. In the [Aiven Console](https://console.aiven.io/login), open your Aiven for PostgreSQL®
   service.
1. Click **REST API**.
1. Select the database with the REST API enabled.

The Aiven Console lists the endpoints grouped by schema and table. Each table and view
provides endpoints for the following methods:

- `GET`: Read rows.
- `POST`: Insert rows.
- `PATCH`: Update rows.
- `DELETE`: Delete rows.

The available methods for each request depend on the privileges granted to the role in your
token. For details, see
[Authorize requests with PostgreSQL roles](/docs/products/postgresql/howto/data-apis/authentication#authorize-requests-with-postgresql-roles).

## Find the base URL

The Aiven Console shows the base URL for the REST API. All endpoints are relative to this
base URL. For example, a `products` table in the `public` schema is available at the
`/products` path under the base URL.

## Copy a code snippet

For each endpoint, the Aiven Console provides ready-to-use snippets:

1. Select the table and the method to call.
1. Select **curl**, **JavaScript**, or **Python**.
1. Copy the snippet.
1. Replace the placeholder token with a JWT from your identity provider.

## Call an endpoint

Send the JWT issued by your identity provider in the `Authorization` header as a bearer
token. The following examples use `REST_API_BASE_URL` for the base URL and `JWT_TOKEN` for
the token.

Read all rows from the `products` table:

```bash
curl "https://REST_API_BASE_URL/products" \
  -H "Authorization: Bearer JWT_TOKEN"
```

Filter rows with query parameters. For example, return products with a price below 10:

```bash
curl "https://REST_API_BASE_URL/products?price=lt.10" \
  -H "Authorization: Bearer JWT_TOKEN"
```

Insert a row:

```bash
curl "https://REST_API_BASE_URL/products" \
  -H "Authorization: Bearer JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "Notebook", "price": 9.99}'
```

For the full query syntax, including filtering, ordering, and pagination, see the
[PostgREST documentation](https://postgrest.org/en/stable/references/api.html).

## Use the OpenAPI specification

Data APIs generate an OpenAPI specification from your database schema. Use it to explore the
API or to generate client code. The specification reflects the current schema and the tables
that the requesting role can access.
