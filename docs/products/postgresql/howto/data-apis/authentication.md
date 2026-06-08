---
title: Configure authentication for Data APIs
sidebar_label: Authentication
description: Configure JWKS-based authentication and PostgreSQL role authorization for Data APIs.
---

Data APIs verify every request against the JSON Web Tokens (JWTs) issued by your own identity provider (IdP).

You keep control of authentication. Your IdP issues the tokens, and the REST API validates
them. Aiven does not store or issue end-user credentials.

## Authentication flow

1. A client authenticates with your IdP and receives a signed JWT.
1. The client sends a request to a REST endpoint with the token in the `Authorization`
   header as a bearer token.
1. The REST API fetches your IdP's public keys from the JWKS URL and verifies the token
   signature. If you set an audience, the API also checks the `aud` claim.
1. The REST API reads the role from the token and runs the query in your Aiven for
   PostgreSQL® database with that role's privileges.

## Configure the JWKS URL

The _JSON Web Key Set (JWKS) URL_ is the endpoint where your IdP publishes the public keys
used to verify token signatures. Enter this URL when you
[enable the REST API](/docs/products/postgresql/howto/data-apis/get-started).

The URL format depends on your IdP. The following are common patterns:

- **Auth0**: `https://TENANT_NAME.auth0.com/.well-known/jwks.json`
- **Okta**: `https://OKTA_DOMAIN/oauth2/default/v1/keys`
- **Microsoft Entra ID**: `https://login.microsoftonline.com/TENANT_ID/discovery/v2.0/keys`

Replace `TENANT_NAME`, `OKTA_DOMAIN`, and `TENANT_ID` with the values from your IdP. For
the exact URL, see your IdP's documentation.

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

Data APIs use standard PostgreSQL roles and table privileges for authorization. You define
the roles and grant the privileges. The REST API runs each request with the role named in
the token.

1. Connect to your database and create a role with the privileges to expose:

   ```sql
   CREATE ROLE api_reader NOLOGIN;
   GRANT USAGE ON SCHEMA public TO api_reader;
   GRANT SELECT ON ALL TABLES IN SCHEMA public TO api_reader;
   ```

1. Configure your IdP to include a `role` claim in the tokens it issues, set to the
   PostgreSQL role name, such as `api_reader`.

When a request arrives, the REST API sets the role from the token before running the query.
A request with the `api_reader` role can read the granted tables, but a write to a table
without `INSERT` privilege returns an error. To allow writes, grant the corresponding
`INSERT`, `UPDATE`, or `DELETE` privileges to the role.

:::tip
Grant only the privileges that each role needs. The token controls which role runs the
query, and PostgreSQL enforces the privileges of that role.
:::
