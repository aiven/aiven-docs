---
title: Configure authentication for Data APIs
sidebar_label: Authentication
description: Configure JWKS-based authentication and PostgreSQL role authorization for Data APIs.
---

Data APIs verify every request against the JSON Web Tokens (JWTs) issued by your own identity provider (IdP).

You keep control of authentication. Your IdP issues the tokens, and the REST API validates
them against the public keys at your JWKS URL. Aiven does not store or issue end-user
credentials.

## Authentication flow

1. A client authenticates with your IdP and receives a signed JWT.
1. The client sends a request to a REST endpoint with the token in the `Authorization`
   header as a bearer token.
1. The REST API fetches your IdP's public keys from the JWKS URL and verifies the token
   signature. If you set an audience, the API also checks the `aud` claim.
1. The REST API runs the query in your Aiven for PostgreSQL® database with the privileges
   of the role named in the token.

## Configure the JWKS URL

The _JSON Web Key Set (JWKS) URL_ is the endpoint where your IdP publishes the public keys
used to verify token signatures. Enter this URL when you
[enable the REST API](/docs/products/postgresql/howto/data-apis/get-started). The URL is
required and must use HTTPS.

The URL format depends on your IdP. The following are common patterns:

- **Auth0**: `https://TENANT_NAME.us.auth0.com/.well-known/jwks.json`
- **Okta**: `https://OKTA_DOMAIN/oauth2/default/v1/keys`
- **Microsoft Entra ID**: `https://login.microsoftonline.com/TENANT_ID/discovery/v2.0/keys`

Replace `TENANT_NAME`, `OKTA_DOMAIN`, and `TENANT_ID` with the values from your IdP. For
the exact URL, see your IdP's documentation. The token issuer (`iss` claim) is derived from
the JWKS URL.

Because the REST API reads the keys from the JWKS URL, key rotation is automatic. When your
IdP rotates its signing keys, the API picks up the new keys from the same URL. You don't
need to update any configuration in the Aiven Console.

## Configure the audience

The _audience_ identifies the intended recipient of a token, such as a specific tenant or
application. The audience is optional. When you set it, the REST API rejects any token
whose `aud` claim doesn't match the value you configured.

To use audience validation, set the same audience value in your IdP and in the **Audience**
field when you enable the REST API.

## Authorize requests with PostgreSQL roles

Data APIs use standard PostgreSQL roles and table privileges for authorization. The REST API
runs each request with a PostgreSQL role and the database enforces that role's privileges.

### Default access

When you enable a REST API, Aiven creates a `web_anon` role and grants it `SELECT` on the
existing tables in the `public` schema. Requests that don't include a valid token run with
the `web_anon` role.

As a result, the tables in the `public` schema are readable through the base URL by default.
To restrict anonymous reads, revoke the privileges from `web_anon`:

```sql
REVOKE SELECT ON ALL TABLES IN SCHEMA public FROM web_anon;
```

### Role-based access with tokens

To run requests with a specific role, include a `role` claim in the token, set to the name
of a PostgreSQL role:

1. Connect to your database and create a role with the privileges to expose:

   ```sql
   CREATE ROLE api_reader NOLOGIN;
   GRANT USAGE ON SCHEMA public TO api_reader;
   GRANT SELECT, INSERT ON products TO api_reader;
   ```

1. Configure your IdP to include a `role` claim in its tokens, set to the role name, such as
   `api_reader`.

When a request includes a token with the `role` claim, the REST API runs the query with that
role. A request with the `api_reader` role can read and insert rows in `products`, but a
delete returns an error because the role lacks the `DELETE` privilege.

:::tip
Grant each role only the privileges it needs. The token controls which role runs the query,
and PostgreSQL enforces the privileges of that role.
:::
