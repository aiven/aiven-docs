---
title: Backup to another region for Aiven services
sidebar_label: Backup to another region
limited: true
---

import BtarConcepts from "@site/static/includes/btar-concepts.md";
import BtarInstructions from "@site/static/includes/btar-instructions.md";
import RelatedPages from "@site/src/components/RelatedPages";

Copy service backups to a secondary region for disaster recovery, and manage, fork from, or delete that secondary backup.

<BtarConcepts/>

## Supported services

BTAR is available for the following services. The Aiven Console supports BTAR for some of
them; for the rest, use the Aiven CLI, the Aiven API, Terraform, or the Aiven Kubernetes
Operator.

| Service | Configure with |
| ------- | -------------- |
| [Aiven for PostgreSQL®](/docs/products/postgresql/howto/backup-to-another-region) | Console, CLI, API, Terraform, Kubernetes Operator |
| [Aiven for OpenSearch®](/docs/products/opensearch/howto/backup-to-another-region) | Console, CLI, API, Terraform, Kubernetes Operator |
| [Aiven for MySQL](/docs/products/mysql/howto/backup-to-another-region) | Console, CLI, API, Terraform, Kubernetes Operator |
| [Aiven for Valkey™](/docs/products/valkey/howto/backup-to-another-region) | CLI, API, Terraform, Kubernetes Operator |
| [Aiven for Grafana®](/docs/products/grafana/howto/backup-to-another-region) | CLI, API, Terraform, Kubernetes Operator |

<BtarInstructions/>

<RelatedPages/>

- [Service backups](/docs/platform/concepts/service_backups)
- [Track service restore progress using the API](/docs/platform/howto/restore_progress_updates)
