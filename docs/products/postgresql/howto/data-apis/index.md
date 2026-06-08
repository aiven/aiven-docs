---
title: Data APIs for Aiven for PostgreSQL®
sidebar_label: Data APIs
keywords: ["REST API", "PostgREST", "Data APIs", "REST endpoints", "JWT", "JWKS", "identity provider"]
limited: true
---

import LimitedBadge from "@site/src/components/Badges/LimitedBadge";
import DocCardList from "@theme/DocCardList";

Data APIs expose the tables in your Aiven for PostgreSQL® database as secure REST endpoints, without backend code.

:::note
Data APIs is a <LimitedBadge/> feature.
To request access, [contact Aiven](https://aiven.io/contact).
:::

Data APIs appears as **REST API** in your service menu, next to PG Studio.
The feature is powered by [PostgREST](https://postgrest.org), which generates a RESTful
API directly from your database schema. When your schema changes, the endpoints update to
match it.

## What Data APIs offers

Data APIs provides the following:

- **Instant REST endpoints**: Expose a database as REST endpoints from the Aiven Console,
  without writing or hosting an API server.
- **Schema-driven endpoints**: Each table gets endpoints for the `GET`, `POST`, `PATCH`,
  and `DELETE` methods, based on your database schema.
- **Ready-to-use code snippets**: Copy `curl`, JavaScript, or Python snippets for each
  endpoint.
- **Authentication with your own identity provider**: Verify requests against the JSON Web
  Tokens (JWTs) issued by your identity provider (IdP).
- **Authorization with PostgreSQL roles**: Control access with standard PostgreSQL roles
  and table privileges.

## How it works

When you enable Data APIs for a database, Aiven deploys a managed application that runs
PostgREST alongside your service and connects it to the selected database. PostgREST reads
the database schema and publishes a REST endpoint for each table in the `public` schema.
Clients call these endpoints over HTTPS and authenticate with a JWT issued by your IdP.

Each database that you expose runs as an independent application with its own status and
base URL. You can enable Data APIs for more than one database in the same service.

## Limitations

- The Aiven for PostgreSQL service must run inside a
  [VPC](/docs/platform/concepts/vpcs).
- Each REST API serves one database. To expose more databases, enable Data APIs for each
  one separately.

## Related pages

<DocCardList />
