---
title: Service backups
---

import ServiceBackupsConcepts from "@site/static/includes/service-backups-concepts.md";
import EditBackupSchedule from "@site/static/includes/service-backups-instructions.md";
import RelatedPages from "@site/src/components/RelatedPages";

Learn how Aiven backs up your services automatically, where backups are stored, and how to change your backup schedule.

All Aiven services, except for Aiven for Apache Kafka®, have automatic encrypted backups.

<ServiceBackupsConcepts/>

## Access to backups

Backups are encrypted and not available for download, but you can create your own
backups with the appropriate tooling:

-   [PostgreSQL®](https://www.postgresql.org/docs/current/app-pgdump.html):
    `pgdump`
-   [MySQL®](https://dev.mysql.com/doc/refman/8.4/en/mysqldump.html):
    `mysqldump`
-   [OpenSearch®](https://github.com/elasticsearch-dump/elasticsearch-dump):
    `elasticdump`
-   [Valkey™](https://valkey.io/topics/cli/): `valkey-cli`

## Edit the backup schedule

<EditBackupSchedule/>

<RelatedPages/>

- [Track service restore progress using the API](/docs/platform/howto/restore_progress_updates)
- [Backup to another region](/docs/platform/concepts/backup-to-another-region)
