---
title: Backup to another region for Aiven services
sidebar_label: Backup to another region
---

import BtarConcepts from "@site/static/includes/btar-concepts.md";
import BtarInstructions from "@site/static/includes/btar-instructions.md";
import RelatedPages from "@site/src/components/RelatedPages";

Copy service backups to a secondary region for disaster recovery, and manage, fork from, or delete that secondary backup.

<BtarConcepts/>

## Supported services

BTAR is available for the following services, at the release stage shown:

| Service | Availability | Configure with |
| ------- | ------------ | -------------- |
| [Aiven for PostgreSQL®](/docs/products/postgresql/howto/backup-to-another-region) | Generally available | Console, API, CLI, Terraform, Kubernetes Operator |
| [Aiven for OpenSearch®](/docs/products/opensearch/howto/backup-to-another-region) | Generally available | Console, API, CLI, Terraform, Kubernetes Operator |
| [Aiven for MySQL](/docs/products/mysql/howto/backup-to-another-region) | [Limited availability](/docs/platform/concepts/service-and-feature-releases#limited-availability-) | Console, API, CLI, Terraform, Kubernetes Operator |
| [Aiven for Valkey™](/docs/products/valkey/howto/backup-to-another-region) | [Limited availability](/docs/platform/concepts/service-and-feature-releases#limited-availability-) | API, CLI, Terraform, Kubernetes Operator |
| [Aiven for Grafana®](/docs/products/grafana/howto/backup-to-another-region) | [Limited availability](/docs/platform/concepts/service-and-feature-releases#limited-availability-) | API, CLI, Terraform, Kubernetes Operator |

<BtarInstructions/>

<RelatedPages/>

- [Service backups](/docs/platform/concepts/service_backups)
- [Service pricing](/docs/platform/concepts/service-pricing)
- [Track service restore progress using the API](/docs/platform/howto/restore_progress_updates)
