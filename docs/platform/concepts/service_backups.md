---
title: Backups at Aiven
---

On top of general rules for handling service backups in Aiven, there are
service-specific backup details, such as backup frequency and retention
period per service. Backup policies for service power-off/on and service
deletion are common for all the services, similarly as the backup access
policy.

## About backups at Aiven

All Aiven services, except for Apache Kafka® and M3
Aggregator/Coordinator, have time-based backups that are encrypted and
securely stored. Backups at Aiven are stored in the object storage of
the cloud region where the service is first created (for example, S3 for
AWS or GCS for GCP). You can check the location of your service's
backups in [Aiven Console](https://console.aiven.io/) \> your service's
homepage \> **Backups**.

The backup retention times vary based on the service and the selected
service plan.

Aiven takes service backups for managing purposes. These backups are
compressed and encrypted by the Aiven management platform and, as such,
are not available for download for any service type.

:::note
If you change a cloud provider or an availability zone for your service,
its backups are not migrated from their original location.
:::

## Service power-off/on backup policy

Whenever a service is powered on from a powered-off state, the latest
available backup is restored.

Services that have been powered off for more than 180 days are reviewed.
A notification email will be sent to you to provide time for taking
action before the service and backup are deleted as part of the
[periodic cleanup of powered-off services](/docs/platform/howto/cleanup-powered-off-services).

If you wish to keep the powered-off service for more than 180 days,
power on the service and then power it off again to avoid the routine
cleanup.

## Service backup deletion policy

For services that have been deleted for over 41 days, all the backups
are automatically deleted and, hence, no longer available.

## Access to backups

The Aiven platform takes care of all maintenance operations required for
running complex software at scale, allowing you to focus on using your
services. The open-source tools used for service backups can be
leveraged in your own infrastructure.

Since service backups are encrypted and stored in the object storage,
accessing them is not possible. If you do need to backup your service,
use the standard tooling for this service.

Recommended backup tools per service are as follows:

-   [PostgreSQL®](https://www.postgresql.org/docs/14/app-pgdump.html):
    `pgdump`
-   [MySQL®](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html):
    `mysqldump`
-   [Redis®\*](https://redis.io/docs/connect/cli/#remote-backups-of-rdb-files):
    `redis-cli`
-   [Cassandra®](https://docs.datastax.com/en/archived/cql/3.3/cql/cql_reference/cqlshCopy.html):
    `cqlsh`
-   [OpenSearch®](https://github.com/elasticsearch-dump/elasticsearch-dump):
    `elasticdump`

:::note
The listed backup tools are recommendations and are not intended
to create a snapshot of your Aiven service but to provide access to the
data.
:::

## Backup profile per service

Depending on the service plan, each service provides different backups
with different retention periods. Check out the hourly and daily backups
with the number of days of retention provided in the table.

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
      <td>Aiven for Redis®*</td>
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
[configuration backups](/docs/products/kafka/concepts/configuration-backup), and they come at no extra cost. If the Apache Kafka®
service is powered off/on or if any incidents lead to the cluster's
failure, the configuration backup facilitates restoring your Apache
Kafka® service to its previous state.

To back up data passing through Apache Kafka, we recommend using one of
the following tools:

-   [MirrorMaker 2](/docs/products/kafka/kafka-mirrormaker) to replicate the data to another cluster, which could be
    an Aiven service or a Apache Kafka cluster on your own
    infrastructure. With MirrorMaker 2, the backup cluster operates as
    an independent Apache Kafka service. You can freely choose a zone
    for your backup service since it operates independently from the
    primary service.

    :::note
    MirrorMaker 2 provides tools for mapping between the source and
    target offset, so you don\'t need to make this calculation. For more
    details, see section *Offset Mapping* in blog post [A look inside
    Kafka MirrorMaker
    2](https://blog.cloudera.com/a-look-inside-kafka-mirrormaker-2/).
    :::

-   Kafka Connect to backup the cluster, for instance, sinking data from
    Apache Kafka® to S3 via a
    [dedicated Aiven connector](/docs/products/kafka/kafka-connect/howto/s3-sink-prereq).

:::note[See also]
For more information, refer to

-   [Aiven for Apache Kafka® MirrorMaker 2](/docs/products/kafka/kafka-mirrormaker)
-   Cloudera's [A look inside Kafka MirrorMaker
    2](https://blog.cloudera.com/a-look-inside-kafka-mirrormaker-2/)
-   [Configure AWS for an S3 sink connector](/docs/products/kafka/kafka-connect/howto/s3-sink-prereq)
-   [Configuration Backups](/docs/products/kafka/concepts/configuration-backup)
:::

### Aiven for PostgreSQL®

For Aiven for PostgreSQL, full daily backups are taken, and WAL segments
are constantly archived to the cloud object storage. In case of node
failure,

-   For a business or premium plan, Aiven can reconstruct the latest
    state from a replica
-   For a startup plan, Aiven can reconstruct the latest state from the
    latest base backup and replay the latest WAL segments on top of
    that.

You can supplement this with a remote read-only replica service, which
you can run in a different cloud region or with another cloud provider
and promote to master if needed.

To shift the backup schedule to a new time, you can modify the backup
time configuration option in **Advanced configuration** in [Aiven
Console](https://console.aiven.io/) (the service's **Service settings**
page). If a recent backup has been taken, it may take another backup
cycle before the new backup time takes effect.

:::note[See also]
For more information, refer to

-   [PostgreSQL® backups](/docs/products/postgresql/concepts/pg-backups)
-   [High availability](/docs/products/postgresql/concepts/high-availability)
-   [Create and use read-only replicas](/docs/products/postgresql/howto/create-read-replica)
:::

### Aiven for MySQL®

Aiven for MySQL databases are automatically backed up with full daily
backups and binary logs recorded continuously. All backups are encrypted
with the open source [myhoard](https://github.com/aiven/myhoard)
software. Myhoard uses [Percona XtraBackup](https://www.percona.com/)
internally for taking full (or incremental) snapshots for MySQL.

To shift the backup schedule to a new time, you can modify the backup
time configuration option in **Advanced configuration** in [Aiven
Console](https://console.aiven.io/) (the service's **Service settings**
page). If a recent backup has been taken, it may take another backup
cycle before the new backup time takes effect.

:::note[See also]
For more information, refer to
[MySQL Backups](/docs/products/mysql/concepts/mysql-backups).
:::

### Aiven for OpenSearch®

Aiven for OpenSearch databases are automatically backed up, encrypted,
and stored securely in the object storage. The backups are taken every
hour, and the retention period varies based on the service plan.

:::note[See also]
For more information, refer to

-   [OpenSearch backups](/docs/products/opensearch/concepts/backups)
-   [How to restore an OpenSearch® backup](/docs/products/opensearch/howto/restore_opensearch_backup)
:::

### Aiven for Apache Cassandra®

Aiven for Apache Cassandra backups are taken every 24 hours. The
point-in-time recovery (PITR) feature is currently not available.

:::note
If you'd like to be notified once the PITR feature is available for
Cassandra, contact the Aiven support.
:::

### Aiven for Redis™\*

Aiven for Redis backups are taken every 12 hours.

For persistence, Aiven supports Redis Database Backup (RDB).

You can control the persistence feature using `redis_persistence` under
**Advanced configuration** in [Aiven Console](https://console.aiven.io/)
(the service's **Service settings** page):

-   When `redis_persistence` is set to `rdb`, Redis does RDB dumps every
    10 minutes if any key is changed. Also, RDB dumps are done according
    to the backup schedule for backup purposes.
-   When `redis_persistence` is `off`, no RDB dumps or backups are done,
    so data can be lost at any moment if the service is restarted for
    any reason or if the service is powered off. This also means the
    service can\'t be forked.

:::note
AOF persistence is currently not supported by Aiven for the managed
Redis service.
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
Aiven for ClickHouse doesn\'t support so-called streaming backups: when
a service is powered off, all data written after the last backup gets
lost. For more information about limitations on Aiven for ClickHouse
backups, see
[Aiven for ClickHouse limitations](/docs/products/clickhouse/reference/limitations).
:::

:::note[See also]
For more information on Aiven for ClickHouse backups, see
[Backup and restore](/docs/products/clickhouse/concepts/disaster-recovery).
:::
