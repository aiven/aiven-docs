---
title: Restricted commands in Aiven for Valkey™
sidebar_label: Disabled commands
---

For optimal performance, stability, and security, Aiven for Valkey™ disables specific commands.

Commands you cannot use in Aiven for Valkey™ are the following:

-   `bgrewriteaof`: Initiates a background append-only file rewrite.
-   `cluster`: Manages Valkey cluster commands.
-   `command`: Provides details about all Valkey commands.
-   `debug`: Contains sub-commands for debugging Valkey.
-   `failover`: Manages manual failover of a master to a replica.
-   `migrate`: Atomically transfers a key from a Valkey instance to
    another one.
-   `role`: Returns the role of the instance in the context of
    replication.
-   `slaveof`: Makes the server a replica of another instance, or
    promotes it as master.
-   `acl`: Manages Valkey Access Control Lists.
-   `bgsave`: Creates a snapshot of the dataset into a dump file.
-   `config`: Alters the configuration of a running Valkey server.
-   `lastsave`: Returns the UNIX timestamp of the last successful save
    to disk.
-   `monitor`: Streams back every command processed by the Valkey server.
-   `replicaof`: Makes the server a replica of another instance.
-   `save`: Synchronously saves the dataset to disk.
-   `shutdown`: Synchronously saves the dataset to disk and shuts down the server.
