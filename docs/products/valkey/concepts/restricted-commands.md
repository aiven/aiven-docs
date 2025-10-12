---
title: Restricted Aiven for Valkey commands
---

To ensure the stability and security of the Valkey environment, the Aiven for Valkey service restricts certain commands.
This section aims to provide you with a list of disabled/restricted commands.

## Disabled commands

For optimal performance and security, Aiven for Valkey disables the following commands:

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

## Disabled eval commands

The following script evaluation commands in the Aiven for Valkey service are disabled.
If you require these commands to be enabled, contact Aiven support.

-   `eval`: Executes a Lua script server-side.
-   `eval_ro`: Read-only variant of the `eval` command.
-   `evalsha`: Executes a script cached on the server side by its SHA1
    digest.
-   `evalsha_ro`: Read-only variant of the `evalsha` command.
-   `fcall`: Calls a Valkey function.
-   `fcall_ro`: Read-only variant of the `fcall` command.
-   `function`: Manages Valkey functions.
-   `script`: Manages the script cache.
