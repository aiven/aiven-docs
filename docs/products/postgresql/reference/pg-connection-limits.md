---
title: Connection limits per plan for Aiven for PostgreSQL®
---

Aiven for PostgreSQL® instances limit the number of allowed connections
to make sure that the database is able to serve them all. The
`max_connections` setting varies according to the service plan as
follows:

| Plan                                                    | Max Connections |
| ------------------------------------------------------- | --------------- |
| Hobbyist (Google Cloud, DigitalOcean, and UpCloud only) | 25              |
| Startup/Business/Premium-4                              | 100             |
| Startup/Business/Premium-8                              | 200             |
| Startup/Business/Premium-16                             | 400             |
| Startup/Business/Premium-32                             | 800             |
| Startup/Business/Premium-64 and above                   | 1000            |

When several clients or client threads are connecting to the database,
Aiven recommends using
[connection pooling](/docs/products/postgresql/concepts/pg-connection-pooling) to limit the number of actual backend connections.
Connection pooling is available in all Aiven for PostgreSQL Startup,
Business, and Premium plans, and can be
[configured in the console](/docs/products/postgresql/howto/manage-pool).
