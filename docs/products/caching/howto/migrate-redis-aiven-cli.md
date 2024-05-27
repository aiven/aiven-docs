---
title: Migrate from Redis®* to Aiven for Caching using the CLI
---

Move your data from a source, standalone Redis®* data store to an Aiven-managed Caching service. The migration process first attempts to use the `replication` method, and if it fails, it switches to `scan`.

Create an Aiven for Caching service and migrate data from AWS ElastiCache Redis. The Aiven project
name is `test`, and the service name for the target Aiven for Caching is `redis`.

:::important
Migrating from Google Cloud Memorystore for Redis is not currently
supported.

The version of the source Redis service cannot be higher than the version
of the target Aiven for Caching service.
:::

## Prerequisites

- A target [Aiven for Caching](/docs/products/caching/get-started) service.
- The hostname, port, and password of the source Redis service.
- The source Redis service secured with SSL, which is the default for migration.
- Publicly accessible source Redis service or a service with a VPC peering between the
  private networks. The migration process requires VPC ID and the cloud name.

:::note
AWS ElastiCache for Redis instances cannot have public IP addresses and
require project VPC and peering connection.
:::

## Create a service and perform the migration

1.  Check the Aiven configuration options and connection details

    - To view Aiven configuration options, enter:

      ```bash
      avn service types -v

      ...
      Service type 'redis' options:
      ...
      Remove migration
        => --remove-option migration
      Hostname or IP address of the server where to migrate data from
        => -c migration.host=<string>
      Password for authentication with the server where to migrate data from
        => -c migration.password=<string>
      Port number of the server where to migrate data from
        => -c migration.port=<integer>
      The server where to migrate data from is secured with SSL
        => -c migration.ssl=<boolean>  (default=True)
      User name for authentication with the server where to migrate data from
        => -c migration.username=<string>
      ```

    - For the VPC information, enter:

        ```bash
        avn vpc list --project test

        PROJECT_VPC_ID                        CLOUD_NAME     ...
        ====================================  =============
        40ddf681-0e89-4bce-bd89-25e246047731  aws-eu-west-1
        ```

        :::note
        Note the hostname, port, and password of the source Redis service, as well as
        the VPC ID and cloud name. You need these details to complete the migration.
        :::

1.  Create the Aiven for Caching service and start the migration. If you do not have
    a service already, create one with:

    ```bash
    avn service create --project test -t redis -p hobbyist --cloud aws-eu-west-1 --project-vpc-id 40ddf681-0e89-4bce-bd89-25e246047731 -c migration.host="master.jappja-redis.kdrxxz.euw1.cache.amazonaws.com" -c migration.port=6379 -c migration.password=<password> redis
    ```

    :::tip
    You can skip specifying the project-vpc-id and cloud if the source Redis server is
    publicly accessible.
    :::

1.  Check the migration status:

    ```bash
    avn service migration-status --project test redis

    STATUS  METHOD  ERROR
    ======  ======  =====
    done    scan    null
    ```

    :::note
    Status can be one of `done`, `failed` or `running`. In case of
    failure, the error contains the error message:

    ```bash
    avn service migration-status --project test redis

    STATUS  METHOD  ERROR
    ======  ======  ================
    failed  scan    invalid password
    ```
    :::

## Migrate to an existing Aiven for Caching service

To update an existing service, run:

```bash
avn service update --project test -c migration.host="master.jappja-redis.kdrxxz.euw1.cache.amazonaws.com" -c migration.port=6379 -c migration.password=<password> redis
```

## Remove migration from configuration

Migration is one-time operation. Once completed and the status is `done`, you cannot
restart the same migration. To perform the migration again, first remove the existing
configuration and reconfigure the settings to initiate a new migration:

```bash
avn service update --project test --remove-option migration redis
```
