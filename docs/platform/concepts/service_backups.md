---
title: Service backups
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"
import AutoDelete from "@site/static/includes/auto-delete-poweredoff.md";
import EditBackUpSchedule from "@site/static/includes/edit-backup-schedule.md"
import Variables from "@site/static/variables.json"

Most services have automatic time-based backups that are encrypted and securely stored.

**Backed-up services:** All Aiven services, except for Apache Kafka® and M3
Aggregator/Coordinator.

**Backup location:** Backups are stored in the object storage of the cloud region
where the service is first created, for example, S3 for AWS or GCS for GCP.

## Display service backups

1. In the Aiven Console, open the service of your choice.
1. Click <ConsoleLabel name="backups"/>.

:::note
Backups are encrypted and not available for download.

If you change a service's cloud provider or an availability zone,
its backups are not migrated from their original location.
:::

## Service power-off/on backup policy

Whenever a service is powered on from a powered-off state, the latest available
backup is automatically restored.

:::note
<AutoDelete/>

See [Power a service on/off](/docs/platform/concepts/service-power-cycle).
:::

## Service backup deletion policy and service recovery

A service's backups are automatically deleted <strong>{Variables.backup_policy} days</strong> after the service's deletion date.

To recover a service, contact [support@aiven.io](mailto:support@aiven.io).

:::note
This operation may incur an additional cost to your project.
:::

## Access to backups

Backups are encrypted and not available for download, but you can create your own
backups with the appropriate tooling:

-   [PostgreSQL®](https://www.postgresql.org/docs/current/app-pgdump.html):
    `pgdump`
-   [MySQL®](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html):
    `mysqldump`
-   [Caching](https://redis.io/docs/connect/cli/#remote-backups-of-rdb-files):
    `redis-cli`
-   [Cassandra®](https://docs.datastax.com/en/cql-oss/3.1/cql/cql_reference/copy_r.html)
    `cqlsh`
-   [OpenSearch®](https://github.com/elasticsearch-dump/elasticsearch-dump):
    `elasticdump`

:::note
These tools are recommendations and are not intended
to create a snapshot of your Aiven service but to provide access to the
data.
:::

## Backup retention profile per service

<table>
  <thead>
    <tr>
      <th rowspan="2">Service type</th>
      <th colspan="4">Backup retention time based on service Plan</th>
    </tr>
    <tr>
      <th>Hobbyist</th>
      <th>Startup</th>
      <th>Business</th>
      <th>Premium</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Aiven for Apache Kafka®</td>
      <td>No backups</td>
      <td>No backups</td>
      <td>No backups</td>
      <td>No backups</td>
    </tr>
    <tr>
      <td>Aiven for PostgreSQL® / MySQL</td>
      <td>Single backup only for disaster recovery</td>
      <td>2 days with PITR</td>
      <td>14 days with PITR</td>
      <td>30 days with PITR</td>
    </tr>
    <tr>
      <td>Aiven for OpenSearch®</td>
      <td>Single backup only for disaster recovery</td>
      <td>Hourly backup for 24 hours and Daily backup for 3 days</td>
      <td>Hourly backup for 24 hours and Daily backup for 14 days</td>
      <td>Hourly backup for 24 hours and Daily backup for 30 days</td>
    </tr>
    <tr>
      <td>Aiven for Apache Cassandra®</td>
      <td>Plan not available</td>
      <td>Single day backup</td>
      <td>Single day backup</td>
      <td>Single day backup</td>
    </tr>
    <tr>
      <td>Aiven for Caching</td>
      <td>Single backup only for disaster recovery</td>
      <td>Backup every 12 hours up to 1 day</td>
      <td>Backup every 12 hours up to 3 days</td>
      <td>Backup every 12 hours up to 13 days</td>
    </tr>
    <tr>
      <td>Aiven for Apache Flink®</td>
      <td>Plan not available</td>
      <td>Hourly backup up to 2 hours</td>
      <td>Hourly backup up to 2 hours</td>
      <td>Plan not available</td>
    </tr>
    <tr>
      <td>Aiven for M3</td>
      <td>Plan not available</td>
      <td>Single day backup</td>
      <td>Daily backup up to 6 days</td>
      <td>Daily backup up to 13 days</td>
    </tr>
    <tr>
      <td>Aiven for M3 Aggregator / Coordinator</td>
      <td>Plan not available</td>
      <td>Plan not available</td>
      <td>No backups</td>
      <td>No backups</td>
    </tr>
    <tr>
      <td>Aiven for Grafana®</td>
      <td>Plan not available</td>
      <td>Backup every 1 hour up to 1 day</td>
      <td>Plan not available</td>
      <td>Plan not available</td>
    </tr>
    <tr>
      <td>Aiven for ClickHouse®</td>
      <td>Daily backups up to 2 days</td>
      <td>Daily backups up to 2 days</td>
      <td>Daily backups up to 14 days</td>
      <td>Daily backups up to 30 days</td>
    </tr>
  </tbody>
</table>

There are specific backup strategies for particular service types.

### Aiven for Apache Kafka®

Aiven for Apache Kafka is usually used as a transport tool for data
rather than a permanent store. Due to the way it stores data,
traditional backup strategies are not feasible. As a result, Aiven does
not perform backups for managed Apache Kafka services, and data
durability is determined by data replication across the cluster.

However, automatic backups for essential Apache Kafka® service
configurations are offered through
[configuration backups](/docs/products/kafka/concepts/configuration-backup), and
they come at no extra cost. If the Apache Kafka®
service is powered off/on or if any incidents lead to the cluster's
failure, the configuration backup facilitates restoring your Apache
Kafka® service to its previous state.

To back up data passing through Apache Kafka, we recommend using one of
the following tools:

- [MirrorMaker 2](/docs/products/kafka/kafka-mirrormaker) to replicate the data to
  another cluster, which can be
  an Aiven service or a Apache Kafka cluster on your own
  infrastructure.

  With MirrorMaker 2, the backup cluster operates as
  an independent Apache Kafka service. You can freely choose a zone
  for your backup service since it operates independently from the
  primary service.

  :::note
  MirrorMaker 2 provides tools for mapping between the source and
  target offset, so you don't need to make this calculation. For more
  details, see section *Offset Mapping* in
  [A look inside Kafka MirrorMaker 2](https://blog.cloudera.com/a-look-inside-kafka-mirrormaker-2/).
  :::

- Kafka Connect to backup the cluster, for instance, sinking data from
  Apache Kafka® to S3 via a
  [dedicated Aiven connector](/docs/products/kafka/kafka-connect/howto/s3-sink-prereq).

For more information, refer to:

- [Aiven for Apache Kafka® MirrorMaker 2](/docs/products/kafka/kafka-mirrormaker)
- Cloudera's [A look inside Kafka MirrorMaker 2](https://blog.cloudera.com/a-look-inside-kafka-mirrormaker-2/)
- [Configure AWS for an S3 sink connector](/docs/products/kafka/kafka-connect/howto/s3-sink-prereq)
- [Configuration Backups](/docs/products/kafka/concepts/configuration-backup)

### Aiven for PostgreSQL®

For Aiven for PostgreSQL, full daily backups are taken, and WAL segments
are constantly archived to the cloud object storage. In case of node
failure,

- For a business or premium plan, Aiven can reconstruct the latest
  state from a replica.
- For a startup plan, Aiven can reconstruct the latest state from the
  latest base backup and replay the latest WAL segments on top of
  that.

You can supplement this with a remote read-only replica service, which
you can run in a different cloud region or with another cloud provider
and promote to master if needed.

#### Edit the backup schedule

<EditBackUpSchedule/>

For more information, refer to:

- [PostgreSQL® backups](/docs/products/postgresql/concepts/pg-backups)
- [High availability](/docs/products/postgresql/concepts/high-availability)
- [Create and use read-only replicas](/docs/products/postgresql/howto/create-read-replica)

### Aiven for MySQL®

Aiven for MySQL databases are automatically backed up with full daily
backups and binary logs recorded continuously. All backups are encrypted
with the open source [myhoard](https://github.com/aiven/myhoard)
software. Myhoard uses [Percona XtraBackup](https://www.percona.com/)
internally for taking full (or incremental) snapshots for MySQL.

#### Edit the backup schedule

<EditBackUpSchedule/>

For more information, refer to [MySQL Backups](/docs/products/mysql/concepts/mysql-backups).

### Aiven for OpenSearch®

Aiven for OpenSearch databases are automatically backed up, encrypted,
and stored securely in the object storage. The backups are taken every
hour, and the retention period varies based on the service plan.

For more information, see:

- [OpenSearch backups](/docs/products/opensearch/concepts/backups)
- [How to restore an OpenSearch® backup](/docs/products/opensearch/howto/restore_opensearch_backup)

### Aiven for Apache Cassandra®

Aiven for Apache Cassandra backups are taken every 24 hours. You can choose when a
backup starts within the 24 hours and, for example, move the backup outside peak hours to
save resources. To configure the `backup_hour` and `backup_minute` settings, go to
the [Aiven Console](https://console.aiven.io) > your Aiven for Apache Cassandra service >
<ConsoleLabel name="backups"/> > <ConsoleLabel name="actions"/> > **Configure backup settings**.

:::note
The point-in-time recovery (PITR) feature is not available. To be notified once the PITR
feature is available for Aiven for Apache Cassandra, contact
[support@aiven.io](mailto:support@aiven.io).
:::

### Aiven for Caching

Aiven for Caching automatically backs up data every 12 hours and supports configurable
data persistence using Redis Database Backup (RDB).

#### Persistence settings

You can configure the `redis_persistence` settings from <ConsoleLabel name="actions"/> >
the **Configure backup settings** section on your <ConsoleLabel name="Backups"/> page
in the [Aiven Console](https://console.aiven.io).

- **Enabled (`rdb`)**: When you set `redis_persistence` to `rdb`, Aiven for Caching
  performs RDB dumps every 10 minutes whenever a key changes. These dumps provide
  additional data protection against Caching service incidents, limiting potential data
  loss to a maximum of 10 minutes. However, full backups are created only according to
  the backup schedule (every 12 hours) or when the service is shut down.
- **Disabled (`off`)**: When you set `redis_persistence` to `off`, Aiven for Caching
  stops all Redis RDB dumps and backups. If the service restarts or powers off for
  any reason, you may lose any data not yet backed up. Additionally, you cannot
  fork or replicate the service,
  which can affect potential scaling or disaster recovery plans.

  :::warning
  If you disable `redis_persistence`, the system immediately deletes all existing
  backups, preventing any data recovery from those backups. When you re-enable
  persistence, it starts a new backup cycle, but it won't restore any previously
  stored data.
  :::

:::note
The Append Only File (AOF) persistence method is not supported for the managed
Aiven for Caching service.
:::

### Aiven for ClickHouse®

Aiven for ClickHouse® provides automatic daily backups. The
[Astacus](https://github.com/aiven/astacus) backup manager for
distributed databases runs on all nodes to coordinate backups of cluster
databases.

Each file to be backed up is encrypted, compressed, and uploaded to an
object storage (Amazon S3 or Google Cloud Storage) in the same region.

Aiven for ClickHouse backups contain database lists, table schemas,
table content, and access entities (such as users or roles). They are
backed up incrementally: files already present in the object storage are
not re-uploaded and only changed parts are backed up.

:::note
Aiven for ClickHouse doesn't support so-called streaming backups: when
a service is powered off, all data written after the last backup gets
lost.

For more information about limitations on Aiven for ClickHouse
backups, see
[Aiven for ClickHouse limitations](/docs/products/clickhouse/reference/limitations).
:::

For more information on Aiven for ClickHouse backups, see
[Backup and restore](/docs/products/clickhouse/concepts/disaster-recovery).
