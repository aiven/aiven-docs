---
title: Build a REST API with Aiven for PostgreSQL® Data API
sidebar_label: Tutorial
description: Turn a table into REST endpoints, secure them with Auth0, and call them with a bearer token.
limited: true
---

import LimitedBadge from "@site/src/components/Badges/LimitedBadge";
import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Expose a table in Aiven for PostgreSQL® as REST endpoints, secure them with Auth0, and call them with a bearer token.

:::note
Data API access is <LimitedBadge/>.
To request access, [contact Aiven](https://aiven.io/contact).
:::

## Prerequisites

- <LimitedBadge/> access to Data API. To request access,
  [contact Aiven](https://aiven.io/contact).
- An Aiven for PostgreSQL service on a paid plan, with
  [Aiven Runtime](/docs/products/runtime) enabled for your project.
- The [`project:services:write`](/docs/platform/concepts/permissions) permission. If
  you don't have it, ask an admin to grant it.
- An [Auth0](https://auth0.com) account with an API and a Machine to Machine
  application authorized for it. You can use a different identity provider (IdP); see
  [Configure authentication](/docs/products/postgresql/howto/data-api/authentication)
  for other options.

## Step 1: Create a table

Connect to your database and create a table to expose through Data API:

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC(10,2) NOT NULL
);

INSERT INTO products (name, price) VALUES
    ('Pen', 1.99),
    ('Notebook', 9.99),
    ('Backpack', 49.99);
```

## Step 2: Create a role and grant privileges

Create a PostgreSQL role for Data API to use, and grant it to
`postgrest_authenticator`, the role Data API uses to connect to your database:

```sql
CREATE ROLE api_worker NOLOGIN;
GRANT USAGE ON SCHEMA public TO api_worker;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO api_worker;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO api_worker;
GRANT api_worker TO postgrest_authenticator;
```

For more information about the roles Data API creates automatically, see
[Authorize requests with PostgreSQL roles](/docs/products/postgresql/howto/data-api/authentication#authorize-requests-with-postgresql-roles).

## Step 3: Get your JWKS URL and audience from Auth0

Data API verifies request tokens against your IdP's JWKS URL. In Auth0:

1. Click **Settings** in the left sidebar and note your domain, for example
   `dev-example.us.auth0.com`.
1. Your JWKS URL is that domain with `/.well-known/jwks.json` appended, for example
   `https://dev-example.us.auth0.com/.well-known/jwks.json`.
1. Click **Applications** > **APIs**, then click your API.
1. On the **Settings** tab, copy the **Identifier** value. This is your audience.

## Step 4: Enable Data API

1. In the [Aiven Console](https://console.aiven.io/login), open your Aiven for
   PostgreSQL service.
1. Click <ConsoleLabel name="connect"/> > **Data API**.
1. In the **Database** list, select the database with the `products` table.
1. Click **Set up API**.
1. Enter the JWKS URL and audience from step 3.
1. Accept the recommended cloud and plan, or choose a custom one.
1. Click **Confirm and deploy**.
1. Wait for the status to change to **Running**.

For more information about this step, including cloud and plan options, see
[Enable Data API](/docs/products/postgresql/howto/data-api/get-started).

## Step 5: Add the role claim to Auth0 tokens

Data API reads the PostgreSQL role to use from a `role` claim in the token. Add this
claim to tokens issued for your Auth0 API with an Auth0 Action, as described in
[Add the role to your IdP tokens](/docs/products/postgresql/howto/data-api/authentication#add-the-role-to-your-idp-tokens).
Set the claim to `api_worker`, the role you created in step 2.

## Step 6: Get an access token

Request a token from Auth0 with the client credentials grant. Replace the placeholders
with your Auth0 domain and the client ID and secret of the Machine to Machine
application authorized for your API:

```bash
curl --request POST \
  --url "https://AUTH0_DOMAIN/oauth/token" \
  --header "Content-Type: application/json" \
  --data '{"client_id": "CLIENT_ID", "client_secret": "CLIENT_SECRET", "audience": "AUDIENCE", "grant_type": "client_credentials"}'
```

Replace the following:

- `AUTH0_DOMAIN`: your Auth0 domain from step 3.
- `CLIENT_ID` and `CLIENT_SECRET`: the credentials of the Machine to Machine
  application authorized for your API.
- `AUDIENCE`: the audience from step 3.

The response contains an `access_token` value. Use it as the bearer token in the
following step.

## Step 7: Call the endpoints

Find your API URL on the **Data API** page. Read the products, using the access
token from step 6 as `TOKEN`:

```bash
curl "https://REST_API_BASE_URL/products?select=id,name,price" \
  -H "Authorization: Bearer TOKEN"
```

Insert a product:

```bash
curl -X POST "https://REST_API_BASE_URL/products" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"name": "Marker", "price": 2.49}'
```

Filter the products with a price under 10:

```bash
curl "https://REST_API_BASE_URL/products?price=lt.10" \
  -H "Authorization: Bearer TOKEN"
```

Sort the products by price, descending:

```bash
curl "https://REST_API_BASE_URL/products?order=price.desc" \
  -H "Authorization: Bearer TOKEN"
```

For the full query syntax, including pagination and embedding related tables, see
[Call the endpoints](/docs/products/postgresql/howto/data-api/use-endpoints).

<RelatedPages/>

- [Enable Data API](/docs/products/postgresql/howto/data-api/get-started)
- [Configure authentication for Data API](/docs/products/postgresql/howto/data-api/authentication)
- [Call the Data API endpoints](/docs/products/postgresql/howto/data-api/use-endpoints)
- [Manage Data API](/docs/products/postgresql/howto/data-api/manage)
