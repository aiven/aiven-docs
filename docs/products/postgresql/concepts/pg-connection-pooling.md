---
title: Connection pooling
---

Connection pooling in Aiven for PostgreSQL® services allows you to maintain very large numbers of connections to a database while minimizing the consumption of server resources.

## About connection pooling

Aiven for PostgreSQL connection pooling uses
[PgBouncer](https://www.pgbouncer.org/) to manage the database
connection.

Unlike when you connect directly to the PostgreSQL® server, each client
connection does not require a separate backend process on the server.
PgBouncer automatically inserts the client queries and only uses a
limited number of actual backend connections, leading to lower resource
usage on the server and better total performance.

## Maximum number of client connections

How many client connections your service can handle depends on the RAM size that your
service plan supports.

- Each gigabyte of RAM allows 500 connections.
- Minimum number of client connections per service is 5000.
- Maximum number of client connections per service is 50000.

### Calculate `max_client_connections`

Use the following formula to calculate how many client connections your service can handle:

$$min(max(n * 500, 5000), 50000)$$

Where:

- `n` is the number of RAM GB that a service plan supports.
- $$n * 500$$ is `intermedia_max_connections`.
- $$5000 \leq intermedia\_max\_connections \leq 50000$$

  - If `intermedia_max_connections` is less than 5000, lower bound 5000 applies.
  - If `intermedia_max_connections` is greater than 50000, upper bound 50000 applies.

### Examples

- Startup-4 service plan (4 GB RAM)

  $$n = 4$$

  $$n * 500 = 2000$$

  $$min(max(2000, 5000), 50000) = 5000$$

  For a startup-4 machine, `pgbouncer_max_client_connections` is 5000.

- Business-16 service plan (16 GB RAM)

  $$n = 16$$

  $$n * 500 = 8000$$

  $$min(max(8000, 5000), 50000) = 8000$$

  For a business-16 machine, `pgbouncer_max_client_connections` is 8000.

- Business-120 service plan (120 GB RAM)

  $$n = 120$$

  $$n * 500 = 60000$$

  $$min(max(60000, 5000), 50000) = 50000$$

  For a business-120 machine, `pgbouncer_max_client_connections` is 50000.

## Connection pooling benefits

A high number of backend connections can become a problem with
PostgreSQL, as the resource cost per connection is quite high due to how
PostgreSQL manages client connections. PostgreSQL creates a separate
backend process for each connection, and the unnecessary memory usage
caused by the processes will start affecting the total throughput of the
system at some point. Moreover, if each connection is very active, the
performance can be affected by the high number of parallel executing
tasks.

It makes sense to have enough connections so that each CPU core on the
server has something to do (each connection can only utilise a single
CPU core), but a hundred connections per CPU core may be too much. All
this is workload-specific, but often a good number of connections to
have is roughly 3-5 times the CPU core count. Aiven enforces
[connection limits](/docs/products/postgresql/reference/pg-connection-limits) to avoid
overloading the PostgreSQL database.

:::note
Since 9.6, PostgreSQL offers parallelization support enabling to [run
queries in
parallel](https://www.postgresql.org/docs/current/parallel-query.html)
on multiple CPU cores.
:::

Without a connection pooler, the database connections are handled
directly by PostgreSQL backend processes, with one process per
connection:

```mermaid
graph LR
        pg_client_1(PG client) <-.->|Client establishing a new connection| postmaster
        pg_client_2(PG client) ---> pg_backend_1(PG Backend 1)
        pg_client_3(PG client) ---> pg_backend_2(PG Backend 2)
        pg_client_4(PG client) ---> pg_backend_3(PG Backend 3)
        pg_client_5(PG client) --->|Existing client connections| pg_backend_4(PG Backend 4)
        pg_client_6(PG client) ---> pg_backend_5(PG Backend 5)
        pg_client_7(PG client) ---> pg_backend_6(PG Backend 6)

subgraph PostgreSQL server
    postmaster & pg_backend_1 & pg_backend_2 & pg_backend_3 & pg_backend_4 & pg_backend_5 & pg_backend_6
end

subgraph Clients
    pg_client_1 & pg_client_2 & pg_client_3 & pg_client_4 & pg_client_5 & pg_client_6 & pg_client_7
end
```

Adding a PgBouncer pooler that utilizes fewer backend connections frees
up server resources for more important uses, such as disk caching:

```mermaid
graph LR
        pg_client_1(PG client) <-.->|Client establishing a new connection| pgbouncer
        pg_client_2(PG client) ---> pgbouncer
        pg_client_3(PG client) ---> pgbouncer
        pg_client_4(PG client) ---> pgbouncer
        pg_client_5(PG client) --->|Existing client connections| pgbouncer
        pg_client_6(PG client) ---> pgbouncer
        pg_client_7(PG client) ---> pgbouncer
        pgbouncer --> postmaster
        pgbouncer --> pg_backend_1(PG Backend 1)
        pgbouncer --> pg_backend_2(PG Backend 2)
        pgbouncer --> pg_backend_3(PG Backend 3)
        pgbouncer --> pg_backend_4(PG Backend 4)

subgraph PostgreSQL server
    pgbouncer
    postmaster & pg_backend_1 & pg_backend_2 & pg_backend_3 & pg_backend_4
end

subgraph Clients
    pg_client_1 & pg_client_2 & pg_client_3 & pg_client_4 & pg_client_5 & pg_client_6 & pg_client_7
end
```

Instead of having dedicated connections per client, now PgBouncer
manages the connections assignment optimising them based on client
request and settings like the pooling modes.

:::tip
Many frameworks and libraries (ORMs, Django, Rails, etc.) support
client-side pooling, which solves much the same problem. However, when
there are many distributed applications or devices accessing the same
database, a server-side solution is a better approach.
:::

## Connection pooling modes {#pooling-modes}

Aiven for PostgreSQL supports three different operational pool modes:
`transaction`, `session` and `statement`.

-   The default and recommended setting option is `transaction` pooling
    mode allows each client connection to take their turn in using a
    backend connection for the duration of a single transaction. After
    the transaction is committed, the backend connection is returned
    back into the pool and the next waiting client connection gets to
    reuse the same connection immediately. In practice, this provides
    quick response times for queries as long as the typical execution
    times for transactions are not excessively long. This is the most
    commonly used PgBouncer mode and also the default pooling mode in
    Aiven for PostgreSQL.

:::warning
Several PostgreSQL features, described in the [official PgBouncer
features page](https://www.pgbouncer.org/features), are known to be
**broken** by the default transaction-based pooling and **must not be
used by the application when in this mode**.

You must carefully consider the design of the client applications
connecting to PgBouncer, otherwise the application may not work as
expected.
:::

-   The `session` pooling mode means that once a client connection is
    granted access to a PostgreSQL server-side connection, it can hold
    it until the client disconnects from the pooler. After this, the
    server connection is added back onto the connection pooler's free
    connection list to wait for its next client connection. Client
    connections are accepted (at TCP level), but their queries only
    proceed once another client disconnects and frees up its backend
    connection back into the pool. This mode can be helpful in some
    cases for providing a wait queue for incoming connections while
    keeping the server memory usage low, but is of limited use under
    most common scenarios due to the slow recycling of the backend
    connections.
-   The `statement` operational pooling mode, similar to the
    `transaction` pool mode, except that instead of allowing a full
    transaction to run, it cycles the server-side connections after each
    and every database statement (`SELECT`, `INSERT`, `UPDATE`, `DELETE`
    statements, etc.). Transactions containing multiple SQL statements
    are not allowed in this mode. This mode is sometimes used, for
    example when running specialised sharding frontend proxies.
