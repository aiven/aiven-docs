---
title: Copy data from one ClickHouse® server to another
---

You can copy data from one ClickHouse® server to another using the
`remoteSecure()` function.

## Prerequisites

Details of the source (remote) server

-   Hostname
-   Port
-   Username
-   Password

## Copy data

1.  From your target server(s), use the `remoteSecure()`
    function to select data from the source server.

    ```shell
    SELECT * FROM remoteSecure('HOSTNAME:PORT', db.remote_engine_table, 'USERNAME', 'PASSWORD') LIMIT 3;
    ```

1.  Insert the selected data into the target server.

    ```shell
    INSERT INTO [db.]table [(c1, c2, c3)] SELECT ...
    ```

    For details on how to configure and use the INSERT query, see
    [Inserting the Results of
    SELECT](https://clickhouse.com/docs/en/sql-reference/statements/insert-into/#inserting-the-results-of-select).

Your data has been copied from the remote (source) server to the new
(target) server.
