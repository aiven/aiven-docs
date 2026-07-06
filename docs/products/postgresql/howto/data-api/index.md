---
title: Data API for Aiven for PostgreSQL®
sidebar_label: Data API
keywords: ["Data API", "REST API", "PostgREST", "REST endpoints", "JWT", "JWKS", "identity provider"]
limited: true
---

import LimitedBadge from "@site/src/components/Badges/LimitedBadge";
import DocCardList from "@theme/DocCardList";

Data API turns your Aiven for PostgreSQL® database into a backend by exposing its tables as secure REST endpoints, without backend code.

:::note
Data API is a <LimitedBadge/> feature.
To request access, [contact Aiven](https://aiven.io/contact).
:::

Data API appears in your service's left sidebar in the Aiven Console, next to
**PG Studio**. It auto-generates an API directly from your database schema, powered by
[PostgREST](https://postgrest.org).

## What Data API offers

Data API provides the following:

- **Instant REST endpoints**: Expose a database as REST endpoints from the Aiven Console,
  without writing or hosting an API server.
- **Schema-driven endpoints**: Each table gets endpoints for the `GET`, `POST`, `PATCH`,
  and `DELETE` methods, based on your database schema.
- **Ready-to-use code snippets**: Copy `curl`, JavaScript, or Python snippets for each
  endpoint.
- **Authentication with your identity provider**: Authenticate requests with the JSON Web
  Tokens (JWTs) issued by your own identity provider (IdP) and verified against your JWKS
  URL.
- **Authorization with PostgreSQL roles**: Control access with standard PostgreSQL roles
  and table privileges.

## How it works

When you enable Data API for a database, Aiven deploys a managed application that runs
PostgREST alongside your service and connects it to the selected database. PostgREST reads
the database schema and publishes a REST endpoint for each table. By default, endpoints are
published for the `public` schema. To access tables in other schemas, include the
`Accept-Profile` header with the schema name in your requests.
Clients call these endpoints over HTTPS and authenticate with a bearer token.

Each database that you expose runs as an independent application with its own status and
base URL. You can enable Data API for more than one database in the same service.

## Limitations

- Data API must be available for your service's plan and cloud.
- Each Data API serves one database. To expose more databases, enable Data API for each one
  separately.
- Each Data API uses a single identity provider, set by one JWKS URL. Multiple identity
  providers per service aren't supported.
- Endpoints reflect the database schema captured when you enable Data API. They don't
  refresh automatically when the schema changes, but you can refresh the schema cache from
  the Aiven Console.

## Related pages

<DocCardList />
