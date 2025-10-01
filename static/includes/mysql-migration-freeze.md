:::warning
To avoid conflicts and replication issues during migration, follow these guidelines:

-   Do not write to any tables in the target database that are being
    processed by the migration tool.
-   Do not change the replication configuration of the source database
    manually. Don't modify `binlog_format` or reduce
    `max_connections`.
-   Do not make database changes that can disrupt or prevent the
    connection between the source database and the target database. Do
    not change the source database's listen address and do not modify
    or enable firewalls on the databases.

:::
