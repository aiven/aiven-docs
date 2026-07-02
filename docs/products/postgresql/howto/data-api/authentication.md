---
title: Configure authentication for Aiven for PostgreSQL® Data API
sidebar_label: Authentication
description: Authenticate Data API requests with JWTs from your own identity provider, and authorize with PostgreSQL roles.
limited: true
---

import LimitedBadge from "@site/src/components/Badges/LimitedBadge";

Data API authenticates every request with a bearer token in the `Authorization` header. The
token is a JWT issued by your own identity provider (IdP) and verified against your JWKS URL.
The token carries a role, and your Aiven for PostgreSQL® database enforces that role's
privileges.

:::note
Data API is a <LimitedBadge/> feature.
:::

## Authenticate with your identity provider

End users authenticate with the JWTs issued by your IdP. You provide your JWKS URL when you
[enable Data API](/docs/products/postgresql/howto/data-api/get-started), and Data API
verifies each token against the public keys at that URL.

:::note
Data API uses one identity provider per database, set by a single JWKS URL. You can update
the JWKS URL or audience later from the **Data API** page in the Aiven Console.
:::

### Configure the JWKS URL

The _JSON Web Key Set (JWKS) URL_ is the endpoint where your IdP publishes the public keys
used to verify token signatures. The URL is required and must use HTTPS.

The URL format depends on your IdP. The following are common patterns:

- **Auth0**: `https://TENANT_NAME.us.auth0.com/.well-known/jwks.json`
- **Okta**: `https://OKTA_DOMAIN/oauth2/default/v1/keys`
- **Microsoft Entra ID**: `https://login.microsoftonline.com/TENANT_ID/discovery/v2.0/keys`

Replace `TENANT_NAME`, `OKTA_DOMAIN`, and `TENANT_ID` with the values from your IdP. For the
exact URL, see your IdP's documentation.

:::note
Data API checks that the JWKS URL uses HTTPS, but doesn't verify that it's reachable when
you save it. Make sure the URL is correct and publicly reachable, or token verification
fails.
:::

Because Data API reads the keys from the JWKS URL, key rotation is automatic. When your IdP
rotates its signing keys, Data API picks up the new keys from the same URL. You don't need
to update any configuration in the Aiven Console. Data API refreshes the keys periodically,
about every 12 hours, so allow time for new keys to take effect and keep the previous keys
valid during the overlap.

### Configure the audience

The _audience_ identifies the intended recipient of a token, such as a specific API or
tenant. Set the same audience value in your IdP and in the **Audience** field when you
enable Data API. Data API rejects any token whose `aud` claim doesn't match.

## Authorize requests with PostgreSQL roles

Data API uses standard PostgreSQL roles and table privileges for authorization. You create
the roles and grant the privileges, and the token carries a `role` claim that names the role
to use. PostgreSQL then enforces that role's privileges.

:::note
If a token doesn't include a `role` claim, the request runs as the default `web_anon` role,
which has no privileges. Include a `role` claim in every token that needs to access data.
:::

### Create a role and grant privileges

Connect to your database and create a role with the privileges to expose:

```sql
-- Create the role
CREATE ROLE api_worker NOLOGIN;

-- Grant schema access
GRANT USAGE ON SCHEMA public TO api_worker;

-- Grant table and sequence privileges
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO api_worker;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO api_worker;

-- Link the role to the PostgREST authenticator
GRANT api_worker TO authenticator;
```

Adjust the granted privileges to match what each role should be able to do. A role with
`SELECT` only can read data, while a leaked token for that role can't modify it.

### Add the role to your IdP tokens

Configure your IdP to include a `role` claim in its tokens, set to the PostgreSQL role name,
such as `api_worker`. The following example adds the claim in Auth0:

1. In Auth0, go to **Actions** > **Library**, then click **Create Action** >
   **Build from Scratch**.
1. Name the action, set the trigger to **Machine to Machine**, and add the following code:

   ```javascript
   exports.onExecuteCredentialsExchange = async (event, api) => {
     // Replace 'api_worker' with the name of your PostgreSQL role
     api.accessToken.setCustomClaim('role', 'api_worker');
   };
   ```

1. Click **Save Draft**, then **Deploy**.
1. Go to **Actions** > **Triggers**, click **Credentials Exchange**, and add the action to
   the flow between **Start** and **Complete**.
1. Click **Apply**.

When requesting a token, include the audience parameter so the IdP issues a token valid for
Data API.

:::tip
Grant each role only the privileges it needs. The token controls which role runs the query,
and PostgreSQL enforces the privileges of that role.
:::
