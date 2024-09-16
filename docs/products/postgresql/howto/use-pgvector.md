---
title: Enable and use pgvector on Aiven for PostgreSQL®
sidebar_label: Enable and use pgvector
---

The [pgvector extension](/docs/products/postgresql/concepts/pgvector) allows you to perform the vector similarity search and use embedding techniques directly in Aiven for PostgreSQL.

## Prerequisites

-   Aiven account
-   Aiven for PostgreSQL service running on PostgreSQL 13 or newer
    PostgreSQL versions
-   psql and a psql CLI client
-   Vector embeddings generated (for example, with the [OpenAI
    API](https://platform.openai.com/docs/api-reference/embeddings/create)
    client)

## Enable pgvector

Run the CREATE EXTENSION statement from a client such as psql connected
to your service. This is needed for each database to perform
the similarity search on.

1.  [Connect to your Aiven for PostgreSQL service](/docs/products/postgresql/howto/list-code-samples) using, for example, the psql client (CLI).

1.  Connect to your database.

    ```bash
    \c database-name
    ```

1.  Run the CREATE EXTENSION statement.

    ```bash
    CREATE EXTENSION vector;
    ```

## Store embeddings

1.  Create a table to store the generated vector embeddings. Use the
    CREATE TABLE SQL command, adjusting the dimensions as needed.

    ```bash
    CREATE TABLE items (id bigserial PRIMARY KEY, embedding vector(3));
    ```

    :::note
    As a result, the `items` table is created. The table includes the
    `embedding` column, which can store vectors with three dimensions.
    :::

1.  Run the INSERT statement to store the embeddings generated with, for
    example, the [OpenAI
    API](https://platform.openai.com/docs/api-reference/embeddings/create)
    client.

    ```bash
    INSERT INTO items (embedding) VALUES ('[1,2,3]'), ('[4,5,6]');
    ```

    :::note
    As a result, two new rows are inserted into the `items` table with
    the provided embeddings.
    :::

## Perform similarity search

To calculate similarity, run the SELECT statements using the built-in
vector operators.

```bash
SELECT * FROM items ORDER BY embedding <-> '[3,1,2]' LIMIT 5;
```

:::note
As a result, the query computes the L2 distance between the selected
vector and the vectors stored in the `items` table, arrange the results
based on the calculated distance, and outputs its top five nearest
neighbors (most similar items).
:::

:::note[Operators for calculating similarity]
-   `<->` - Euclidean distance (L2 distance)
-   `<#>` - negative inner product
-   `<=>` - cosine distance
:::

## Add indices

You can add an index on the vector column to use the *approximate*
nearest neighbor search (instead of the default the *exact* nearest
neighbor search). This can improve query performance with an ignorable
cost on recall. Add an index is possible for all distance functions (L2
distance, cosine distance, inner product).

To add an index, run a query similar to the following:

```bash
CREATE INDEX ON items USING ivfflat (embedding vector_l2_ops) WITH (lists = 100);
```

:::note
As a result, the index is added to the `embedding` column for the L2
distance function.
:::

## Disable pgvector

To stop the pgvector extension and remove it from a database, run the
following SQL command:

```bash
DROP EXTENSION vector;
```

## Related pages

-   [pgvector for AI-powered search in Aiven for PostgreSQL®](/docs/products/postgresql/concepts/pgvector)
-   [pgvector README on
    GitHub](https://github.com/pgvector/pgvector/blob/master/README.md)
