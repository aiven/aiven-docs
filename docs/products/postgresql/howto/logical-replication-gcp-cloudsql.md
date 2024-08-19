---
title: Enable logical replication on Google Cloud SQL
---

If you have not enabled logical replication on Google Cloud SQL PostgreSQL® already, set the `cloudsql.logical_decoding` parameter to `On`:

1.  Set the logical replication parameter for your Cloud SQL PostgreSQL®
    database.

    ![Cloud SQL PostgreSQL flags](/images/content/products/postgresql/migrate-cloudsql-flags.png)

1.  Authorize the Aiven for PostgresSQL® IP to connect to Cloud SQL,
    using the network CIDR.

    ![Cloud SQL PostgreSQL network](/images/content/products/postgresql/migrate-cloudsql-network.png)

1.  Set replication role to PostgreSQL user (or the user will be used
    for migration) in Cloud SQL PostgreSQL:

    ```sql
    ALTER ROLE postgres REPLICATION;
    ```
