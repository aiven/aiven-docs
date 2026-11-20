---
title: Backup to another region for Aiven services
sidebar_label: Backup to another region
---

import BtarConcepts from "@site/static/includes/btar-concepts.md";
import BtarInstructions from "@site/static/includes/btar-instructions.md";
import Card from "@site/src/components/Card";
import GridContainer from "@site/src/components/GridContainer";
import RelatedPages from "@site/src/components/RelatedPages";

Copy service backups to a secondary region for disaster recovery, and manage, fork from, or delete that secondary backup.

<BtarConcepts/>

## Supported services

BTAR is available for the following services. Add and manage a secondary backup region in
the [Aiven Console](https://console.aiven.io), the [Aiven CLI](/docs/tools/cli), the
[Aiven API](/docs/tools/api), the
[Aiven Provider for Terraform](/docs/tools/terraform), or the
[Aiven Operator for Kubernetes®](/docs/tools/kubernetes).

<GridContainer>
  <Card
    to="/docs/products/postgresql/howto/backup-to-another-region"
    hideIcon
    titleHighlight="#6F64FF"
    title="Aiven for PostgreSQL®"
    description="Copy your PostgreSQL service backups to a secondary region."
  />
  <Card
    to="/docs/products/opensearch/howto/backup-to-another-region"
    hideIcon
    titleHighlight="#59D2F4"
    title="Aiven for OpenSearch®"
    description="Copy your OpenSearch service backups to a secondary region."
  />
</GridContainer>

<BtarInstructions/>

<RelatedPages/>

- [Service backups](/docs/platform/concepts/service_backups)
- [Service pricing](/docs/platform/concepts/service-pricing)
- [Track service restore progress using the API](/docs/platform/howto/restore_progress_updates)
