---
title: avn service
---

Full list of commands for `avn service`.

## Manage service details

Commands for managing Aiven services via `avn` commands.

### `avn service acl`

Manages the Aiven for Apache Kafka® ACL entries.

More information on `acl-add`, `acl-delete` and `acl-list` can be found
in [the dedicated page](/docs/tools/cli/service/acl).

### `avn service backup-list`

Retrieves the list of backups for a certain service.

| Parameter      | Information             |
| -------------- | ----------------------- |
| `service_name` | The name of the service |

**Example:** Retrieve the list of backups for the service
`grafana-25c408a5`.

```
avn service backup-list grafana-25c408a5
```

An example of `service backup-list` output:

```text
BACKUP_NAME                     BACKUP_TIME           DATA_SIZE  STORAGE_LOCATION
==============================  ====================  =========  ===================
grafana-20220614T140308137245Z  2022-06-14T14:03:08Z  774144     google-europe-west3
```

### `avn service ca get` {#avn_service_ca_get}

Retrieves the project CA that the selected service belongs to.

| Parameter           | Information                                            |
| ------------------- | ------------------------------------------------------ |
| `service_name`      | The name of the service                                |
| `--target-filepath` | The file path used to store the CA certificate locally |

**Example:** Retrieve the CA certificate for the project where the
service named `kafka-doc` belongs and store it under `/tmp/ca.pem`.

```
avn service ca get kafka-doc --target-filepath /tmp/ca.pem
```

### `avn service cli`

Opens the appropriate interactive shell, such as `psql` or `redis-cli`,
to the given service. Supported only for Aiven for PostgreSQL®, Aiven
for Redis®*.

| Parameter      | Information             |
| -------------- | ----------------------- |
| `service_name` | The name of the service |

**Example:** Open a new `psql` shell connecting to an Aiven for
PostgreSQL® service named `pg-doc`.

```
avn service cli pg-doc
```

### `avn service connection-info`

Retrieves the connection information for Aiven for Apache Kafka®, Aiven
for PostgreSQL® and Aiven for Redis®\* in a variety of formats.

More information on `connection-info` can be found in
[the dedicated page](service/connection-info).

### `avn service connection-pool`

Manages the
[PgBouncer connection pool](/docs/products/postgresql/concepts/pg-connection-pooling) for a given PostgreSQL® service.

More information on `connection-pool-add`, `connection-pool-delete`,
`connection-pool-list` and `connection-pool-update` can be found in
[the dedicated page](service/connection-pool).

### `avn service connector`

Set of commands for managing Aiven for Apache Kafka® Connect connectors.

More information on `connector available`, `connector create`,
`connector delete`, `connector list`, `connector pause`,
`connector restart`, `connector restart-task`, `connector resume`,
`connector schema`, `connector status` and `connector update` can be
found in the [dedicated page](service/connector).

### `avn service create` {#avn-cli-service-create}

Creates a new service.

| Parameter                         | Information                                                                                                                                                                                                                                 |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `service_name`                    | The name of the service                                                                                                                                                                                                                     |
| `--service-type`                  | The type of service; the [service types command](/docs/tools/cli/service-cli#avn-cli-service-type) has the available values                                                                                                                 |
| `--plan`                          | Aiven subscription plan name; check [avn_service_plan](/docs/tools/cli/service-cli#avn-service-plan) for more information                                                                                                                   |
| `--cloud`                         | The cloud region name; check [avn-cloud-list](/docs/tools/cli/cloud#avn-cloud-list) for more information                                                                                                                                    |
| `--disk-space-gib`                | Total amount of disk space for data storage (GiB)                                                                                                                                                                                           |
| `--no-fail-if-exists`             | The create command will not fail if a service with the same name already exists                                                                                                                                                             |
| `--project-vpc-id`                | Id of the project VPC where to include the created service. The cloud of the project's VPC must match the service's cloud                                                                                                                   |
| `--no-project-vpc`                | Stops the service to be included in the project VPC even if one is available in the selected cloud                                                                                                                                          |
| `--enable-termination-protection` | Enables termination protection for the service                                                                                                                                                                                              |
| `-c KEY=VALUE`                    | Any additional configuration settings for your service; check our documentation for more information, or use the [service types command](/docs/tools/cli/service-cli#avn-cli-service-type) which has a verbose mode that shows all options. |

**Example:** Create a new Aiven for Kafka® service named `kafka-demo` in
the region `google-europe-west3` with:

-   the `business-4` plan
-   Kafka Connect enabled
-   600 GiB of total storage capacity

```
avn service create kafka-demo             \
  --service-type kafka                    \
  --cloud google-europe-west3             \
  --plan business-4                       \
  -c kafka_connect=true                   \
  --disk-space-gib 600
```

### `avn service credentials-reset`

Resets the service credentials. More information on user password change
is provided in the [dedicated page](/docs/tools/cli/service/user).

| Parameter      | Information             |
| -------------- | ----------------------- |
| `service_name` | The name of the service |

**Example:** Reset the credentials of a service named `kafka-demo`.

```
avn service credentials-reset kafka-demo
```

### `avn service current-queries`

List current service connections/queries for an Aiven for PostgreSQL®,
Aiven for MySQL or Aiven for Redis®\* service.

| Parameter      | Information             |
| -------------- | ----------------------- |
| `service_name` | The name of the service |

**Example:** List the queries running for a service named `pg-demo`.

```
avn service current-queries pg-demo
```

### `avn service database`

Manages databases within an Aiven for PostgreSQL®, or Aiven for MySQL.

More information on `database-add`, `database-delete` and
`database-list` can be found in
[the dedicated page](service/database).

### `avn service es-acl`

Manages rules to OpenSearch® ACL and extended ACL configuration.

More information on `es-acl-add`, `es-acl-del`, `es-acl-disable`,
`es-acl-enable`, `es-acl-extended-disable`, `es-acl-extended-enable` and
`es-acl-extended-list` can be found in
[the dedicated page](service/es-acl).

### `avn service flink`

Manages Aiven for Apache Flink® tables and jobs.

More info on `flink create-application`, `flink list-applications`,
`flink get-application`, `flink update-application`,
`flink delete-application`, `flink create-application-version`,
`flink validate-application-version`, `flink get-application-version`,
`flink delete-application-version`,
`flink list-application-deployments`,
`flink get-application-deployment`,
`flink create-application-deployment`,
`flink delete-application-deployment`,
`flink stop-application-deployment`,
`flink cancel-application-deployment` can be found in
[the dedicated page](service/flink).

### `avn service get` {#avn_service_get}

Retrieves a single service details.

| Parameter      | Information                 |
| -------------- | --------------------------- |
| `service_name` | The name of the service     |
| `--format`     | Format of the output string |

**Example:** Retrieve the `pg-demo` service details in the
`'{service_name} {service_uri}'` format.

```
avn service get pg-demo --format '{service_name} {service_uri}'
```

**Example:** Retrieve the `pg-demo` full service details in JSON format.

```
avn service get pg-demo --json
```

### `avn service index`

Manages OpenSearch® service indexes.
[the dedicated page](/docs/tools/cli/service/service-index).

### `avn service integration`

Manages Aiven internal and external services integrations.

More information on `integration-delete`, `integration-endpoint-create`,
`integration-endpoint-delete`, `integration-endpoint-list`,
`integration-endpoint-types-list`, `integration-endpoint-update`,
`integration-list`, `integration-types-list` and `integration-update`
can be found in
[the dedicated page](service/integration).

### `avn service keypair get`

Service keypair commands. The use cases for this command are limited to
accessing the keypair for an Aiven for Apache Cassandra® service that
was started in `migration mode`. For more information about this, see
[](https://help.aiven.io/en/articles/3147884-using-sstableloader-to-migrate-your-existing-cassandra-cluster-to-aiven)

| Parameter         | Information                                                                 |
| ----------------- | --------------------------------------------------------------------------- |
| `service_name`    | The name of the service                                                     |
| `keypair`         | The name of the keypair. Options are `cassandra_migrate_sstableloader_user` |
| `--key-filepath`  | The location to download the key to                                         |
| `--cert-filepath` | The location to download the certificate to                                 |

**Example:** Retrieve the keypair, and save them to the `/tmp`
directory, for an Aiven for Apache Cassandra® service, called
`test-cass`, that was started in migration mode.

```
avn service keypair get --key-filepath /tmp/keyfile --cert-filepath /tmp/certfile test-cass cassandra_migrate_sstableloader_user
```

The output of this command results in 2 files (`keyfile` and `certfile`)
saved to the `/tmp` directory.

### `avn service list`

Lists services within an Aiven project.

| Parameter      | Information             |
| -------------- | ----------------------- |
| `service_name` | The name of the service |

**Example:** Retrieve all the services running in the currently selected
project.

```
avn service list
```

An example of `service list` output:

```text
SERVICE_NAME        SERVICE_TYPE  STATE    CLOUD_NAME           PLAN         CREATE_TIME           UPDATE_TIME
==================  ============  =======  ===================  ===========  ====================  ====================
cassandra-28962a5b  cassandra     RUNNING  google-europe-west3  business-16  2021-09-27T10:18:19Z  2021-09-27T10:25:58Z
os-24a6d6db         opensearch    RUNNING  google-europe-west3  business-4   2021-09-27T10:18:04Z  2021-09-27T10:23:31Z
kafka-2134          kafka         RUNNING  google-europe-west3  business-4   2021-09-27T08:48:35Z  2021-09-27T11:20:55Z
mysql-12f7628c      mysql         RUNNING  google-europe-west3  business-4   2021-09-27T10:18:09Z  2021-09-27T10:23:02Z
pg-123456           pg            RUNNING  google-europe-west3  business-4   2021-09-27T07:41:04Z  2021-09-27T10:56:19Z
```

**Example:** Retrieve all the services with name `demo-pg` running in
the project named `mytestproject`.

```
avn service list demo-pg --project mytestproject
```

### `avn service logs`

Retrieves the selected service logs.

| Parameter      | Information             |
| -------------- | ----------------------- |
| `service_name` | The name of the service |

**Example:** Retrieve the logs for the service named `pg-demo`.

```
avn service logs pg-demo
```

### `avn service m3`

Manages
[Aiven for M3 namespaces](/docs/products/m3db/concepts/namespaces-aggregation).

More information on `namespace create`, `namespace delete`,
`namespace list`, `namespace update` can be found in
[the dedicated page](service/m3).

### `avn service maintenance-start`

Starts the service maintenance updates.

:::warning
Maintenance updates do not typically cause any noticeable impact on the
service in use but may sometimes cause a short period of lower
performance or downtime which shall not exceed 1 hour.
:::

| Parameter      | Information             |
| -------------- | ----------------------- |
| `service_name` | The name of the service |

**Example:** Start the maintenance updates for the service named
`pg-demo`.

```
avn service maintenance-start pg-demo
```

:::note
If there are no updates available, the command will show a
`service is up to date, maintenance not required` message.
:::

### `avn service metrics`

Retrieves the metrics for a defined service in Google chart compatible
format. The list of service metrics includes:

-   `cpu_usage`: CPU usage percentage
-   `disk_usage`: Disk space usage percentage
-   `disk_ioread`: Disk reads IOPS
-   `disk_iowrites`: Disk writes IOPS
-   `load_average`: 5 min CPU load average
-   `mem_usage`: Memory usage percentage
-   `net_receive`: Network traffic received in bytes/s
-   `net_send`: Network traffic transmitted in bytes/s

| Parameter      | Information                                                                                                                                                                                                          |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `service_name` | The name of the service                                                                                                                                                                                              |
| `--period`     | The time period to retrieve the metrics for (possible values `hour`, `day`, `week`, `month`, `year`); the time period is relative to the current date and time, for example, `hour` will retrieve metrics for the last hour. |

:::note
The **granularity** of retrieved data changes based on the `--period`
flag:

-   `hour`: 30 seconds
-   `day`: 5 minutes
-   `week`: 30 minutes
-   `month`: 3 hours
-   `year`: 1 day
:::

**Example:** Retrieve the daily metrics for the service named `pg-demo`.

```
avn service metrics pg-demo --period day
```

### `avn service migration-status` {#avn-cli-service-migration-status}

Get migration status

### `avn service plans` {#avn-service-plan}

Lists the service plans available in a selected project for a defined
service type.

| Parameter        | Information                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `--service-type` | The type of service, check [avn-cli-service-type](/docs/tools/cli/service-cli#avn-cli-service-type) for more information |
| `--cloud`        | The cloud region                                                                                                         |
| `--monthly`      | To show the monthly price estimate                                                                                       |

**Example:** List the service plans available for a PostgreSQL® service
in the `google-europe-west3` region.

```
avn service plans --service-type pg --cloud google-europe-west3
```

An example of `service plans` output:

```text
pg:hobbyist                    $0.034/h  Hobbyist (1 CPU, 2 GB RAM, 8 GB disk)
pg:startup-4                   $0.136/h  Startup-4 (1 CPU, 4 GB RAM, 80 GB disk)
pg:startup-8                   $0.267/h  Startup-8 (2 CPU, 8 GB RAM, 175 GB disk)
...
pg:premium-360                $36.027/h  Premium-360 (96 CPU, 384 GB RAM, 3000 GB disk) 3-node high availability set
pg:premium-512                $43.836/h  Premium-512 (128 CPU, 512 GB RAM, 3000 GB disk) 3-node high availability set
pg:premium-896                $72.329/h  Premium-896 (224 CPU, 896 GB RAM, 3000 GB disk) 3-node high availability set
```

### `avn service privatelink`

Manages Aiven privatelink connections for AWS and Azure.

More information on `privatelink availability`, `privatelink aws` and
`privatelink azure` can be found in
[the dedicated page](service/privatelink).

### `avn service queries`

Lists the service connections/queries statistics for an Aiven for
PostgreSQL® or Aiven for MySQL. The list of queries data points
retrievable includes:

-   the `public.pg_stat_statements` columns (see the [documentation for
    these statistics
    columns](https://www.postgresql.org/docs/current/pgstatstatements.html))
    for Aiven for PostgreSQL services.
-   the `performance_schema.events_statements_summary_by_digest` (refer
    to [documentation on the events information from the performance
    schema](https://dev.mysql.com/doc/refman/8.0/en/performance-schema-statement-summary-tables.html))
    for Aiven for MySQL services.

A description of the retrieved columns for Aiven for PostgreSQL can be
found in the dedicated [PostgreSQL
documentation](https://www.postgresql.org/docs/current/pgstatstatements.html)
.

| Parameter      | Information                                                                                        |
| -------------- | -------------------------------------------------------------------------------------------------- |
| `service_name` | The name of the service                                                                            |
| `--format`     | The format string for output defining the query metrics to retrieve, for example, `'{calls} {total_time}'` |

**Example:** List the queries for an Aiven for PostgreSQL service named
`pg-demo` including the query blurb, number of calls and both total and
mean execution time.

```
avn service queries pg-demo --format '{query},{calls},{total_time},{mean_time}'
```

### `avn service queries-reset`

Resets service connections/queries statistics for an Aiven for
PostgreSQL® or Aiven for MySQL service. Resetting query statistics could
be useful to measure database behaviour in a precise point in time or
after a change has been deployed.

| Parameter      | Information             |
| -------------- | ----------------------- |
| `service_name` | The name of the service |

**Example:** Reset the queries for a service named `pg-demo`.

```
avn service queries-reset pg-demo
```

### `avn service schema`

Service Schema commands

### `avn service schema-registry-acl`

Manages
[Aiven for Apache Kafka® Karapace schema registry authorization](/docs/products/kafka/concepts/schema-registry-authorization).

More information on `schema-registry-acl-add`,
`schema-registry-acl-delete`, `schema-registry-acl-list` can be found in
[the dedicated page](service/schema-registry-acl).

### `avn service sstableloader`

Service `sstableloader` commands

### `avn service tags`

Manage service tags.

More information on `tags list`, `tags replace` and `tags update` can be
found in [the dedicated page](service/tags).

### `avn service task-create`

Create a service task

| Parameter              | Information                                                                                    |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| `service_name`         | The name of the service                                                                        |
| `--project`            | Project name (defaults to `None`)                                                              |
| `--operation`          | Task operation (default: `upgrade_check`, possible values: `migration_check`, `upgrade_check`) |
| `--target-version`     | Upgrade target version (used for PostgreSQL) (possible values: `11`, `12`, `13`, `14`)         |
| `--source-service-uri` | Migration: source URI for migration                                                            |
| `--ignore-dbs`         | Migration: comma-separated list of databases to be ignored (MySQL only)                        |
| `--format`             | Format string for output, for example, `{name} {retention_hours}`                                      |
| `--json`               | Raw JSON output                                                                                |

**Example:** Create a migration task to migrate a MySQL database to
Aiven to the service `mysql` in project `myproj`

```
avn service task-create --operation migration_check --source-service-uri mysql://user:password@host:port/databasename --project myproj mysql
```

An example `avn service task-create` output:

```text
TASK_TYPE              SUCCESS  TASK_ID
=====================  =======  ====================================
mysql_migration_check  null     e2df7736-66c5-4696-b6c9-d33a0fc4cbed
```

### `avn service task-get`

Get details for a single task for your service

| Parameter      | Information                                               |
| -------------- | --------------------------------------------------------- |
| `service_name` | The name of the service                                   |
| `--project`    | Project name (defaults to `None`)                         |
| `--task-id`    | The task ID to check                                      |
| `--format`     | Format string for output, for example, `{name} {retention_hours}` |
| `--json`       | Raw JSON output                                           |

**Example:** Check the status of your migration task with id
`e2df7736-66c5-4696-b6c9-d33a0fc4cbed` for the service named `mysql` in
the `myproj` project

```
avn service task-get --task-id e2df7736-66c5-4696-b6c9-d33a0fc4cbed --project myproj mysql
```

An example `avn service task-get` ouput:

```text
TASK_TYPE              SUCCESS  TASK_ID                               RESULT
=====================  =======  ====================================  ====================================================================================
mysql_migration_check  true     e2df7736-66c5-4696-b6c9-d33a0fc4cbed  All pre-checks passed successfully, preferred migration method will be [Replication]
```

### `avn service terminate` {#avn-cli-service-terminate}

Permanently deletes a service.

:::warning
The `terminate` command deletes the service and the associated data. The
data is not recoverable. To temporarily shut down the service use the
[service update command](/docs/tools/cli/service-cli#avn-cli-service-update): `avn service update SERVICE_NAME --power-off`
:::

| Parameter      | Information                                     |
| -------------- | ----------------------------------------------- |
| `service_name` | The name of the service                         |
| `--force`      | Force the action without requiring confirmation |

**Example:** Terminate the service named `demo-pg`.

```
avn service terminate demo-pg
```

:::note
To avoid accidental service deletion, enable the termination protection
during service [creation](/docs/tools/cli/service-cli#avn-cli-service-create) or [update](/docs/tools/cli/service-cli#avn-cli-service-update) by using the `--enable-termination-protection` flag
:::

### `avn service topic`

Manages Aiven for Apache Kafka® topics.

More information on `topic-create`, `topic-delete`, `topic-list` and
`topic-update` can be found in
[the dedicated page](service/topic).

### `avn service types` {#avn-cli-service-type}

Lists the Aiven service types available in a project.

**Example:** Retrieve all the services types available in the currently
selected project.

```
avn service types
```

An example of `service types` output:

```text
SERVICE_TYPE       DESCRIPTION
=================  ===================================================================================
cassandra          Cassandra - Distributed NoSQL data store
elasticsearch      Elasticsearch - Search & Analyze Data in Real Time
grafana            Grafana - Metrics Dashboard
kafka              Kafka - High-Throughput Distributed Messaging System
kafka_connect      Kafka Connect - Kafka Connect service
kafka_mirrormaker  Kafka MirrorMaker - Kafka MirrorMaker service
m3aggregator       M3 Aggregator - Aggregates metrics and provides downsampling
m3db               M3DB - Distributed time series database
mysql              MySQL - Relational Database Management System
opensearch         OpenSearch - Search & Analyze Data in Real Time, derived from Elasticsearch v7.10.2
pg                 PostgreSQL - Object-Relational Database Management System
redis              Redis - In-Memory Data Structure Store
```

The service types command in verbose mode also shows all the
configuration options for each type of service:

```
avn service types -v
```

You might find it helpful to pipe the output to `less` since there are a
large number of options available and the command output is long.

### `avn service update` {#avn-cli-service-update}

Updates the settings for an Aiven service.

| Parameter                          | Information                                                                                                                                                    |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `service_name`                     | The name of the service                                                                                                                                        |
| `--cloud`                          | The name of the cloud region where to deploy the service. See [avn-cloud-list](/docs/tools/cli/cloud#avn-cloud-list).                                          |
| `-c KEY=VALUE`                     | Apply a configuration setting. Run `avn service types -v` to view available values.                                                                            |
| `--disk-space-gib`                 | Total amount of disk space for data storage (GiB)                                                                                                              |
| `--plan`                           | Aiven subscription plan name. See [avn_service_plan](/docs/tools/cli/service-cli#avn-service-plan).                                                            |
| `--power-on`                       | Power on the service                                                                                                                                           |
| `--power-off`                      | Power off the service                                                                                                                                          |
| `--maintenance-dow`                | Set the automatic maintenance window's day of the week (possible values `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`, `sunday`, `never`) |
| `--maintenance-time`               | Set the automatic maintenance window's start time (`HH:MM:SS`)                                                                                                 |
| `--enable-termination-protection`  | Enable termination protection                                                                                                                                  |
| `--disable-termination-protection` | Disable termination protection                                                                                                                                 |
| `--project-vpc-id`                 | The ID of the project VPC to use for the service. The cloud of the project's VPC must match the service's cloud.                                               |
| `--no-project-vpc`                 | The service will not use any VPC                                                                                                                               |
| `--force`                          | Force the action without requiring confirmation                                                                                                                |

**Example:** Update the service named `demo-pg`, move it to
`azure-germany-north` region and enable termination protection.

```
avn service update demo-pg        \
  --cloud azure-germany-north     \
  --enable-termination-protection
```

**Example:** Update the service named `big-service` to scale it down to
the `Business-4` plan.

```
avn service update big-service        \
  --plan business-4
```

**Example:** Update the service named `secure-database` to only accept
connections from the range `10.0.1.0/24` and the IP `10.25.10.12`.

```
avn service update secure-database \
  -c ip_filter=10.0.1.0/24,10.25.10.1/32
```

:::note
There is no whitespace between the IP addresses and comma in the
command.
:::

**Example:** Update the Kafka version of the service named
`kafka-service`.

```
avn service update \
  kafka-service -c kafka_version=X.X
```

:::note
This also works for other service types. To see a full list of
configuration parameters, have a look at `avn service types -v`
:::

### `avn service user`

Manages Aiven users and credentials.

More information on `user-create`, `user-creds-acknowledge`,
`user-creds-download`, `user-delete`, `user-get`,
`user-kafka-java-creds`, `user-list`, `user-password-reset` and
`user-set-access-control` can be found in
[the dedicated page](/docs/tools/cli/service/user).

### `avn service versions`

For each service, lists the versions available together with:

-   `STATE`: if the version is `available` or `unavailable`
-   `AVAILABILITY_START_TIME` and `AVAILABILITY_END_TIME`: Period in
    which the specific version is available
-   `AIVEN_END_OF_LIFE_TIME`: Aiven deprecation date for the specific
    version
-   `UPSTREAM_END_OF_LIFE_TIME`: Upstream deprecation date for the
    specific version
-   `TERMINATION_TIME`: Termination time of the active instances
-   `END_OF_LIFE_HELP_ARTICLE_URL`: URL to \"End of Life\" documentation

**Example:** List all service versions.

```
avn service versions
```

An example of `service versions` output:

```text
SERVICE_TYPE   MAJOR_VERSION  STATE        AVAILABILITY_START_TIME  AVAILABILITY_END_TIME  AIVEN_END_OF_LIFE_TIME  UPSTREAM_END_OF_LIFE_TIME  TERMINATION_TIME  END_OF_LIFE_HELP_ARTICLE_URL
=============  =============  ===========  =======================  =====================  ======================  =========================  ================  ====================================================================================================
cassandra      3.11           available    2018-11-08T00:00:00Z     null                   null                    null                       null              null
OpenSearch     7              unavailable  2020-08-27T00:00:00Z     2021-09-23T00:00:00Z   2022-03-23T00:00:00Z    null                       null              https://help.aiven.io/en/articles/5424825
OpenSearch     7.10           unavailable  2021-02-22T00:00:00Z     2021-09-23T00:00:00Z   2022-03-23T00:00:00Z    null                       null              https://help.aiven.io/en/articles/5424825
OpenSearch     7.9            unavailable  2020-08-27T00:00:00Z     2021-09-23T00:00:00Z   2022-03-23T00:00:00Z    null                       null              https://help.aiven.io/en/articles/5424825
kafka          2.3            unavailable  2019-09-05T00:00:00Z     2021-08-13T00:00:00Z   2021-08-13T00:00:00Z    null                       null              https://help.aiven.io/en/articles/4472730-eol-instructions-for-aiven-for-kafka
kafka          2.4            unavailable  2019-10-21T00:00:00Z     2021-08-13T00:00:00Z   2021-08-13T00:00:00Z    null                       null              https://help.aiven.io/en/articles/4472730-eol-instructions-for-aiven-for-kafka
...
pg             12             available    2019-11-18T00:00:00Z     2024-05-14T00:00:00Z   2024-11-14T00:00:00Z    2024-11-14T00:00:00Z       null              https://help.aiven.io/en/articles/2461799-how-to-perform-a-postgresql-in-place-major-version-upgrade
pg             13             available    2021-02-15T00:00:00Z     2025-05-13T00:00:00Z   2025-11-13T00:00:00Z    2025-11-13T00:00:00Z       null              https://help.aiven.io/en/articles/2461799-how-to-perform-a-postgresql-in-place-major-version-upgrade
pg             9.6            unavailable  2016-09-29T00:00:00Z     2021-05-11T00:00:00Z   2021-11-11T00:00:00Z    2021-11-11T00:00:00Z       null              https://help.aiven.io/en/articles/2461799-how-to-perform-a-postgresql-in-place-major-version-upgrade
```

### `avn service wait`

Waits for the service to reach the `RUNNING` state

| Parameter      | Information             |
| -------------- | ----------------------- |
| `service_name` | The name of the service |

**Example:** Wait for the service named `pg-doc` to reach the `RUNNING`
state.

```
avn service wait pg-doc
```

------------------------------------------------------------------------

*Elasticsearch is a trademark of Elasticsearch B.V., registered in the
U.S. and in other countries.*
