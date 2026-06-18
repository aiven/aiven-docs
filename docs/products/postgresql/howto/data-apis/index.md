---
title: Data API for Aiven for PostgreSQL®
sidebar_label: Data API
keywords: ["Data API", "REST API", "PostgREST", "REST endpoints", "JWT", "JWKS", "identity provider", "API key"]
early: true
---

import EarlyBadge from "@site/src/components/Badges/EarlyBadge";
import DocCardList from "@theme/DocCardList";

Data API turns your Aiven for PostgreSQL® database into a backend by exposing its tables as secure REST endpoints, without backend code.

:::note
Data API is an <EarlyBadge/> feature.
To request access, [contact Aiven](https://aiven.io/contact).
:::

Data API appears under the **Data** section of your service's left sidebar in the Aiven
Console. It auto-generates an API directly from your database schema, powered by
[PostgREST](https://postgrest.org).

## What Data API offers

Data API provides the following:

- **Instant REST endpoints**: Expose a database as REST endpoints from the Aiven Console,
  without writing or hosting an API server.
- **Schema-driven endpoints**: Each table gets endpoints for the `GET`, `POST`, `PATCH`,
  and `DELETE` methods, based on your database schema.
- **Ready-to-use code snippets**: Copy `curl`, JavaScript, or Python snippets for each
  endpoint.
- **Flexible authentication**: Authenticate requests with an API key from the Aiven
  Console, or with the JSON Web Tokens (JWTs) issued by your own identity provider (IdP).
- **Authorization with PostgreSQL roles**: Control access with standard PostgreSQL roles
  and table privileges.

## How it works

When you enable Data API for a database, Aiven deploys a managed application that runs
PostgREST alongside your service and connects it to the selected database. PostgREST reads
the database schema and publishes a REST endpoint for each table in the `public` schema.
Clients call these endpoints over HTTPS and authenticate with a bearer token.

Each database that you expose runs as an independent application with its own status and
base URL. You can enable Data API for more than one database in the same service.

## Limitations

- The Aiven for PostgreSQL service must run inside a
  [VPC](/docs/platform/concepts/vpcs).
- Data API must be available for your service's plan and cloud.
- Each Data API serves one database. To expose more databases, enable Data API for each one
  separately.
- Each Data API uses a single identity provider, set by one JWKS URL. Multiple identity
  providers per service aren't supported.
- Endpoints reflect the database schema captured when you enable Data API. They don't
  refresh automatically when the schema changes.
- To change the authentication settings, turn off Data API and enable it again. You can't
  update them in place.

## Related pages

<DocCardList />
