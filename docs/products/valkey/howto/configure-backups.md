---
title: Aiven for Valkey™ service backups
sidebar_label: Service backups
---

import BackupsConcepts from "@site/static/includes/service-backups-concepts.md";
import EditBackupSchedule from "@site/static/includes/service-backups-instructions.md";
import RelatedPages from "@site/src/components/RelatedPages";

Learn how backups work for your Aiven for Valkey™ service and set the time when automatic
backups are taken.

## How backups work

<BackupsConcepts/>

## Configure the backup time

<EditBackupSchedule/>

:::note
When `backup_hour` is set, the backup frequency changes from 12 hours to 24 hours.
:::

<RelatedPages/>

- [Fork Aiven for Valkey™](/docs/products/valkey/howto/fork-service)
- [High availability](/docs/products/valkey/concepts/high-availability)
